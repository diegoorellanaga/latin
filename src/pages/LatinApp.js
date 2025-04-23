import React, { useState } from 'react';
import { Button, Card, Container, Form, Tooltip, OverlayTrigger,ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useText } from '../contexts/TextContext';
import { calculateSimilarity } from '../utils/utils';

const LatinApp = () => {

    const { text: t ,currentLanguage} = useText();

  const phrases = [
    {
      prompt: "In nōmine Patris, et Fīlii, et Spīritūs Sāncti. Amen. Introībo ad altāre Dei.",
      answer: "Ad Deum qui laetificat juventūtem meam",
      answer_transl:t.ans_1,
      translation: t.prompt_1
    },
    {
      prompt: "Jūdica me, Deus, et discerne causam meam de gente nōn sāncta: ab hōmine inīquō et dolōso ērue me.",
      answer: "Quia tū es, Deus, fortitūdo mea: Quāre me repulistī, et quare tristis incedō, dum affligit me inimīcus?",
      answer_transl:t.ans_2,
      translation: t.prompt_2
    },
    {
      prompt: "Ēmitte lūcem tuam et veritātem tuam; ipsa me dēdūxērunt et addūxērunt in montem sānctum tuum, et in tabernācula tua.",
      answer: "Et introībo ad altāre Dei: ad Deum qui laetificat juventūtem meam.",
      answer_transl:t.ans_3,
      translation: t.prompt_3
    },
    {
      prompt: "Confitébor tibi in cithāra, Deus, Deus meus: quare tristis es, ānima mea, et quare conturbāris me?",
      answer: "Spērā in Deō, quoniam adhūc confitébor illī: salūtāre vultus meī, et Deus meus.",
      answer_transl:t.ans_4,
      translation: t.prompt_4
    },
    {
      prompt: "Glōria Patri, et Fīliō, et Spīritūi Sānctō.",
      answer: "Sīcut erat in prīncipiō, et nunc, et semper: et in saecula saeculōrum. Amen.",
      answer_transl:t.ans_5,
      translation: t.prompt_5
    },
    {
      prompt: "Introībo ad altāre Dei.",
      answer: "Ad Deum, qui laetificat juventūtem meam.",
      answer_transl:t.ans_6,
      translation: t.prompt_6
    },
    {
      prompt: "Adjutōrium nostrum in nōmine Dominī",
      answer: "Qui fēcit caelum et terram.",
      answer_transl:t.ans_7,
      translation: t.prompt_7
    },
    {
        prompt: "Confiteor Deo omnipotenti, beātae Marīae semper Virgīnī, beātō Michaēlī Archangelō, beātō Joannī Baptistae, sānctīs Apostolīs Petrō et Paulō, omnibus Sānctīs, et vobis, frātrēs: quia peccāvī nimis cogitātiōne, verbō et opere: mea culpa, mea culpa, mea maxima culpa. Ideō precor beātam Marīam semper Virginem, beātum Michaēlem Archangelum, beātum Joannem Baptistam, sānctōs Apostolōs Petrum et Paulum, omnēs Sānctōs, et vōs, frātrēs, orāre prō mē ad Dominum Deum nostrum.",
        answer: "Miserēatur tuī omnipotēns Deus, et, dimissīs peccātīs tuīs, perdūcat tē ad vitam aeternam.",
        answer_transl:t.ans_8,
        translation: t.prompt_8
      },
      {
        prompt: "Amen",
        answer: "Confiteor Deo omnipotenti, beātae Marīae semper Virgīnī, beātō Michaēlī Archangelō, beātō Joannī Baptistae, sānctīs Apostolīs Petrō et Paulō, omnibus Sānctīs, et tibi, pater: quia peccāvī nimis cogitātiōne, verbō et opere: mea culpa, mea culpa, mea maxima culpa. Ideō precor beātam Marīam semper Virginem, beātum Michaēlem Archangelum, beātum Joannem Baptistam, sānctōs Apostolōs Petrum et Paulum, omnēs Sānctōs, et tē pater, orāre prō mē ad Dominum Deum nostrum.",
        answer_transl:t.ans_9,
        translation: t.prompt_9
      },
      {
        prompt: "Miserēatur vestrī omnipotēns Deus, et, dimissīs peccātīs vestrīs, perdūcat vōs ad vitam aeternam.",
        answer: "Amen",
        answer_transl:t.ans_10,
        translation: t.prompt_10
      },
      {
        prompt: "Indulgentiam, absolūtiōnem et remissiōnem peccātōrum nostrōrum tribuat nōbīs omnipotēns et misericors Dominus.",
        answer: "Amen",
        answer_transl:t.ans_11,
        translation: t.prompt_11
      },
      {
        prompt: "Deus, tū conversus vivificābīs nōs.",
        answer: "Et plēbs tua laetābitur in tē.",
        answer_transl:t.ans_12,
        translation: t.prompt_12
      },
      {
        prompt: "Ostende nōbīs, Domine, misericordiam tuam.",
        answer: "Et salūtāre tuum dā nōbīs.",
        answer_transl:t.ans_13,
        translation: t.prompt_13
      },
      {
        prompt: "Domine, exaudī ōrātiōnem meam.",
        answer: "Et clāmor meus ad tē veniat.",
        answer_transl:t.ans_14,
        translation: t.prompt_14
      },
      {
        prompt: "Dominus vōbīscum.",
        answer: "Et cum spīritū tuō.",
        answer_transl:t.ans_15,
        translation: t.prompt_15
      }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(phrases.length).fill(''));
  const [showAnswers, setShowAnswers] = useState(Array(phrases.length).fill(false));
  const [completedPhrases, setCompletedPhrases] = useState([]);
  const [scores, setScores] = useState(Array(phrases.length).fill(0));
  const [cardScores, setCardScores] = useState(Array(phrases.length).fill(0));

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);

    // Calculate and update score as user types
    const newScore = calculateSimilarity(value, phrases[index].answer);
    const newScores = [...scores];
    newScores[index] = newScore;
    setScores(newScores);

    const newScoresCard = calculateSimilarity(value, phrases[index].answer);
    const newScoresCards = [...cardScores];
    newScoresCards[index] = newScoresCard;
    setCardScores(newScoresCards);


  };

  // Helper function for score colors:
const getScoreColor = (score) => {
  if (score >= 0.9) return 'success';
  if (score >= 0.7) return 'info';
  if (score >= 0.5) return 'warning';
  return 'danger';
};

  const toggleAnswer = (index) => {
    const newShowAnswers = [...showAnswers];
    newShowAnswers[index] = !newShowAnswers[index];
    setShowAnswers(newShowAnswers);
  };

  const nextPhrase = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPhrase = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const completePhrase = (index) => {
    if (!completedPhrases.includes(index)) {
      setCompletedPhrases([...completedPhrases, index]);
    }
  };

  const WordWithTooltip = ({ word }) => {
    // Expanded dictionary with proper translations and accents
    const cleanWord = word.replace(/[.,:;?!]/g, '');
    const translation = t[cleanWord] || cleanWord;
    
    return (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{translation}</Tooltip>}
      >
        <span style={{ cursor: 'pointer', borderBottom: '1px dotted #999' }}>{word}</span>
      </OverlayTrigger>
    );
  };

  const renderWithTooltips = (text) => {
    return text.split(' ').map((word, i) => (
      <React.Fragment key={i}>
        <WordWithTooltip word={word} />
        {' '}
      </React.Fragment>
    ));
  };

    // Calculate total score percentage
    const totalScore = scores.reduce((sum, score) => sum + score, 0) / phrases.length;

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">{t.title_1}</h1>

      <div className="mb-4">
        <div className="d-flex justify-content-between mb-1">
          <span>{t.overallAccuracy}</span>
          <span>{Math.round(totalScore * 100)}%</span>
        </div>
        <ProgressBar now={totalScore * 100} variant="success" />
      </div>

      
      {phrases.map((phrase, index) => (
        <Card style={{visibility:index >= (currentIndex+1) ? "hidden":""}} key={index} className={`mb-4 ${index === currentIndex ? 'border-primary' : ''} ${completedPhrases.includes(index) ? 'border-success' : ''}`}>
          <Card.Header>
            <div className="d-flex justify-content-between">
      <span>Phrase {index + 1}</span>
      <span className={`badge bg-${getScoreColor(cardScores[index])}`}>
        {Math.round(cardScores[index] * 100)}%
      </span>
    </div>


          </Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>{t.prompt}</strong> {renderWithTooltips(phrase.prompt)}
            </Card.Text>
            <Card.Text>
              <strong>{t.translation}</strong> {phrase.translation}
            </Card.Text>
            
            <Form.Group className="mb-3">
              <Form.Label>{t.youranswer}</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={userAnswers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                disabled={index !== currentIndex}
              />
            </Form.Group>
            
            {showAnswers[index] && (
                <>
              <Card.Text className="mt-3">
                <strong>{t.correctanswer}</strong> {renderWithTooltips(phrase.answer)}
              </Card.Text>
              <Card.Text className="mt-3">
              <strong>{t.correctanswer}</strong> {phrase.answer_transl}
                
              </Card.Text>
              </>
            )}
            
            <div className="d-flex justify-content-between">
              <Button
                variant="primary"
                onClick={() => {
                  toggleAnswer(index);
                  completePhrase(index);
                }}
              >
                {showAnswers[index] ? t.hideanswer : t.showanswer}
              </Button>
              
              {index === currentIndex && (
                <div>
                  {index > 0 && (
                    <Button variant="outline-secondary" className="me-2" onClick={prevPhrase}>
                     {t.previous}
                    </Button>
                  )}
                  {index < phrases.length - 1 && (
                    <Button variant="outline-primary" onClick={nextPhrase}>
                      {t.next}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
      
      <div className="text-center mt-4">
        <p>Progress: {completedPhrases.length} of {phrases.length} phrases completed</p>
      </div>
    </Container>
  );
};

export default LatinApp;