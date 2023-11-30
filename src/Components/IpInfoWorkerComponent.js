import React, { useEffect, useMemo } from 'react';
import STARTUP_DATA from '../Dataset/ipDataset.json';
console.log('file: IpInfoWorkerComponent.js:3 ~ STARTUP_DATA:', STARTUP_DATA);

function IpInfoWorkerComponent({ setIpData }) {
  const ipInfoWorker = useMemo(
    () => new Worker(new URL('../Workers/ipInfoWorker.js', import.meta.url)),
    []
  );
  console.log(
    'file: IpInfoWorkerComponent.js:9 ~ IpInfoWorkerComponent ~ ipInfoWorker:',
    ipInfoWorker
  );
  useEffect(() => {
    ipInfoWorker.postMessage(STARTUP_DATA);

    ipInfoWorker.onmessage = (event) => {
      console.log(
        'file: IpInfoWorkerComponent.js:18 ~ useEffect ~ event:',
        event?.data
      );
      //   if (event?.data) {
      setIpData(event?.data);
      //   }
    };
  }, []);

  return <div />;
}
export default IpInfoWorkerComponent;
