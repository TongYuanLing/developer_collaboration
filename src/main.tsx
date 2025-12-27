import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'antd/dist/reset.css';
import {AppProvider} from "./context/AppContext.tsx";
import React from 'react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <AppProvider>
            <StyleSheetManager shouldForwardProp={isPropValid}>
                <App />
            </StyleSheetManager>
        </AppProvider>
    // </React.StrictMode>
)
