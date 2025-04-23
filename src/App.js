import logo from './logo.svg';
import './App.css';
import LatinApp from './pages/LatinApp';
import { TextProvider } from './contexts/TextContext';
import MainLayout from './components/common/MainLayout'; // Add this import
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <TextProvider>


<BrowserRouter basename="/Latin">
        <Routes>
          {/* Wrap all routes that should use the layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LatinApp />} />
            {/* <Route path="/build" element={<BuilderPage />} />
            <Route path="/resumes/edit/:id" element={<ResumeEdit />} /> */}
          </Route>
          
          {/* Add more routes here if some shouldn't use the layout */}
        </Routes>
      </BrowserRouter>

      </TextProvider>
  );
}

export default App;
