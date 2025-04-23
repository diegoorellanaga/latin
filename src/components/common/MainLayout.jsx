// components/common/MainLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import { Container, Nav, Navbar, ButtonGroup, Button } from 'react-bootstrap';
import ApplicationLogo from './ApplicationLogo';
import { useText } from '../../contexts/TextContext';

const MainLayout = () => {
    const { text: t, changeLanguage, currentLanguage } = useText();

    const languages = [
        { code: 'en', flag: '🇬🇧', label: 'English' },
        { code: 'es', flag: '🇪🇸', label: 'Español' },
        { code: 'zh', flag: '🇨🇳', label: '中文' }
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header/Navbar */}
            <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                        <ApplicationLogo width={40} height={40} className="me-2" />
                        <span className="font-weight-bold">Latin</span>
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="main-navbar" />
                    
                    <Navbar.Collapse id="main-navbar">
                        <Nav className="ms-auto">
                            <ButtonGroup size="sm" className="language-switcher">
                                {languages.map((lang) => (
                                    <Button
                                        key={lang.code}
                                        variant={currentLanguage === lang.code ? 'primary' : 'outline-secondary'}
                                        onClick={() => changeLanguage(lang.code)}
                                        title={lang.label}
                                    >
                                        {lang.flag}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <main className="flex-grow-1 py-4">
                <Container>
                    <Outlet /> {/* This renders the child routes */}
                </Container>
            </main>
        </div>
    );
};

export default MainLayout;