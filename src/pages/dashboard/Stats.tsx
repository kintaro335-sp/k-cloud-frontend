import { useEffect } from 'react';
import { Toolbar } from '@mui/material';
import { BackButton } from '../../components/atoms';
import { UsedSpacePie } from '../../components/dashboard/stats';
// redux
import { useSelector } from '../../redux/store';
import { setTotal, setUsed } from '../../redux/slices/stats';
// api
import { getusedSpace } from '../../api/admin';

export default function Stats() {
  const { access_token } = useSelector((state) => state.session);

  useEffect(() => {
    async function getusedSpaceEffect() {
      const result = await getusedSpace(access_token, true);
      setTotal(result.total);
      setUsed(result.used);
    }
    getusedSpaceEffect();
  }, [access_token]);

  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <UsedSpacePie />
    </>
  );
}
