import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// mui
import { Box } from '@mui/material';

// redux
import { useSelector } from '../redux/store';
import { setPath, setInfo } from '../redux/slices/sharedfile';
// api
import { getTokenInfo } from '../api/sharedfiles';
import { isAxiosError } from 'axios';

export default function SharedFile() {
  const { id } = useParams();
  const { info } = useSelector((state) => state.sharedfile);

  useEffect(() => {
    async function getInfoEffect() {
      if (typeof id !== 'string') return;
      getTokenInfo(id).then((resp) => {
        setInfo(resp);
      });
    }
    getInfoEffect();
  }, [id]);

  return <></>;
}
