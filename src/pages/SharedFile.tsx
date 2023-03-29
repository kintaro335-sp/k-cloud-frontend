import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// mui
import { Box, Card, CardContent } from '@mui/material';
import { FileInfo, FolderExplorer } from '../components/sharedfile';
// redux
import { useSelector } from '../redux/store';
import { setInfo } from '../redux/slices/sharedfile';
// api
import { getTokenInfo } from '../api/sharedfiles';
import { isAxiosError } from 'axios';
import Loading from './Loading';

function ContainerSF({ children }: { children: JSX.Element }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function SharedFile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.sharedfile);

  useEffect(() => {
    async function getInfoEffect() {
      if (typeof id !== 'string') return;
      getTokenInfo(id)
        .then((resp) => {
          setInfo(resp);
        })
        .catch((err) => {
          if (isAxiosError(err)) {
            if (err.code === '404') {
              navigate('/404');
            }
          }
        });
    }
    getInfoEffect();
  }, [id]);

  if (info === null) {
    return <Loading />;
  }

  if (info.type === 'file') {
    return (
      <ContainerSF>
        <FileInfo />
      </ContainerSF>
    );
  }

  return (
    <ContainerSF>
      <FolderExplorer />
    </ContainerSF>
  );
}
