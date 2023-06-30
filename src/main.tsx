import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';
// redux
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import FileUploadC from './contexts/FileUploadContext';
import AuthProvider from './contexts/AuthContext';
import Systemcontext from './contexts/SystemContext';
import FileSelectContext from './contexts/FileSelectContext';
import GalleryContext from './contexts/GalleryContext';
import ThemeP from './theme/ThemeP';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <FileSelectContext>
              <AuthProvider>
                <FileUploadC>
                  <Systemcontext>
                    <ThemeP>
                      <App />
                    </ThemeP>
                  </Systemcontext>
                </FileUploadC>
              </AuthProvider>
            </FileSelectContext>
          </BrowserRouter>
        </PersistGate>
      </ReduxProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
