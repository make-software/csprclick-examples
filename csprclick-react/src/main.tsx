import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from "styled-components";
import { themeConfig } from "@make-software/cspr-design";

createRoot(document.getElementById('content')!).render(
  <StrictMode>
      <ThemeProvider theme={themeConfig.light}>
          <App />
      </ThemeProvider>
  </StrictMode>
);
