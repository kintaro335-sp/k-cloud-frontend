import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// mui
import { Box, Card, CardContent } from '@mui/material';
import { FileInfo, FolderExplorer } from '../components/tokenview';
// redux
import { useSelector } from '../redux/store';
import { setInfo } from '../redux/slices/tokenview';
// api
import { getTokenInfoByUser } from '../api/sharedfiles';
import { isAxiosError } from 'axios';
import Loading from './Loading';

function ContainerSF({ children }: { children: JSX.Element }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function TokenView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { access_token } = useSelector((state) => state.session);
  const { info } = useSelector((state) => state.tokenview);

  useEffect(() => {
    async function getInfoEffect() {
      if (typeof id !== 'string') return;
      getTokenInfoByUser(id, access_token)
        .then((resp) => {
          setInfo(resp);
        })
        .catch((err) => {
          if (isAxiosError(err)) {
            if (err.response?.status === 404) {
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
