// Function to calculate similarity between two strings (0-1)
export const calculateSimilarity = (str1, str2) => {
    if (!str1 || !str2) return 0;

    const normalize = (s) => 
      s.toLowerCase()
       // Normalize special characters (æ → ae, etc.)
       .replace(/æ/g, 'ae')
       .replace(/œ/g, 'oe')
       // Remove accents/diacritics
       .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
       // Remove punctuation and extra spaces
       .replace(/[.,:;?!]/g, '').replace(/\s+/g, ' ').trim();
  
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
  
    if (normalized1 === normalized2) return 1;
    
    // Calculate Levenshtein distance (edit distance)
    const levenshteinDistance = (s, t) => {
      if (!s.length) return t.length;
      if (!t.length) return s.length;
      
      const arr = [];
      for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
          arr[i][j] = i === 0 
            ? j 
            : Math.min(
                arr[i - 1][j] + 1,
                arr[i][j - 1] + 1,
                arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
              );
        }
      }
      return arr[t.length][s.length];
    };
    
    const distance = levenshteinDistance(normalized1, normalized2);
    const maxLength = Math.max(normalized1.length, normalized2.length);
    
    // Return similarity score (0-1)
    return 1 - (distance / maxLength);
  };