/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useEffect } from 'react';

import { UsedSpaceUserPie } from '../components/userstats'
// redux
import { useSelector } from '../redux/store';
import { setFilesStats } from '../redux/slices/userStats';
// api
import { getStatsFiles } from '../api/files';

export default function UserStats() {
  const { access_token } = useSelector((state) => state.session);

  useEffect(() => {
    async function fetchDataEffect() {
      const resp = await getStatsFiles(access_token);
      setFilesStats(resp);      
    }
    fetchDataEffect();
  }, []);

  return (
    <>
      <UsedSpaceUserPie />
    </>
  );
}
