/* eslint-disable no-restricted-globals */
import axios from 'axios';

self.onmessage = async function (event) {
  const ipAddresses = event.data;
  console.log('file: ipInfoWorker.js:6 ~ ipAddresses:', ipAddresses);

  const ipData = [];

  const ipUrls = ipAddresses.map(
    (ip) => `https://ipinfo.io/${ip}?token=77385ae8bda792`
  );

  await Promise.all(
    ipUrls.map(async (ipUrl) => {
      try {
        const response = await axios.get(ipUrl);
        ipData.push(response?.data);
        // setIpData((prev) => [...prev, response?.data]);
      } catch (err) {
        console.error('file: ipInfoWorker.js:17 ~ ipUrls.map ~ err:', err);
      }
    })
  );

  console.log('ipData', ipData);
  self.postMessage(ipData);
};
