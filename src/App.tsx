import { Suspense } from 'react';
import { Loading } from './pages';
import AuthProvider from './contexts/AuthContext';
import Bar from './components/Bar';
import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Bar />
        <Routes />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
