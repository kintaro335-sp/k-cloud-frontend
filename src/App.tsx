import { Suspense } from 'react';
import { Loading } from './pages';
import Bar from './components/Bar';
import Routes from './routes';
// hooks
import useAuth from './hooks/useAuth';

function App() {
  const { init } = useAuth();
  return <Bar children={<Suspense fallback={<Loading />}>{init ? <Routes /> : <Loading />}</Suspense>} />;
}

export default App;
