import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from "styled-components";
import { themeConfig } from "@make-software/cspr-design";
import './index.css';
import {ClickProvider} from "./ClickContext.tsx";
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={themeConfig.light}>
          <ClickProvider>
              <App />
          </ClickProvider>
      </ThemeProvider>
  </StrictMode>
);
