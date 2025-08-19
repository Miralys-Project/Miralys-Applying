import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import './i18n';
import App from './App.tsx';
import { Background3D } from './components/Background3D.tsx';

// eslint-disable-next-line react-refresh/only-export-components
function Main() {
  return (
    <>
      <Background3D />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <StrictMode>
          <App />
        </StrictMode>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);
