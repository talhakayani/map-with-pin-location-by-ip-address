/* eslint-disable no-restricted-globals */
import axios from 'axios';

self.onmessage = async function (event) {
  const ipData = event.data;

  const updatedContent = [];
  const urls = [];
  for (const nodeInfo of ipData) {
    urls.push({
      url: `http://${nodeInfo?.ip}:3008/api/file/node/status`,
      info: nodeInfo,
    });
  }

  await Promise.all(
    urls.map(async (nodeInfo) => {
      try {
        const response = await axios.get(nodeInfo?.url, { timeout: 3000 });
        updatedContent.push({
          ...nodeInfo?.info,
          isActive: response?.data?.isClusterOnline,
        });
      } catch (err) {
        updatedContent.push({
          ...nodeInfo?.info,
          isActive: false,
        });
      }
    })
  );

  self.postMessage(updatedContent);
  //   }, [delayInMiutes * 60 * 1000]);
};
