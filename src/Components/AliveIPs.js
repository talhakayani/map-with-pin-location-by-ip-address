// WorkerComponent.js

import React, { useEffect, useMemo } from 'react';

const AliveIPsWorkerComponent = ({ ipData, setIpData }) => {
  const ipAliveWorker = useMemo(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      new Worker(new URL('../Workers/isIpAliveWorker.js', import.meta.url)),
    []
  );

  useEffect(() => {
    if (ipData?.length) {
      ipAliveWorker.postMessage(ipData);
    }
    ipAliveWorker.onmessage = (event) => {
      console.log('Respoonse frmm Event', event?.data);
      setIpData(event?.data);
    };
  }, [ipData?.length]);

  return <div />;
};

export default AliveIPsWorkerComponent;
