import { ipcMain } from 'electron';
import https from 'https';
import type { IncomingMessage } from 'http';

const getError = (response: IncomingMessage) => {
  const { statusCode } = response;
  if (statusCode === 200) return;

  // Consume response data to free up memory
  response.resume();
  switch (statusCode) {
    case 404:
      return 'Not found';
    case 429:
      return 'Limit';
    case 401:
      return 'No auth';
    default:
      return 'Error';
  }
};

const request = (url: string, apiKey: string) => {
  return new Promise<IncomingMessage>((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          'X-Sansan-Api-Key': apiKey,
        },
      },
      (res) => {
        const error = getError(res);
        if (error) {
          reject(error);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const getData = (response: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    response.setEncoding('utf8');
    let rawData = '';
    response
      .on('data', (chunk) => {
        rawData += chunk;
      })
      .on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
  });
};

const getImageData = (response: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    const data: Buffer[] = [];
    response
      .on('data', (chunk: Buffer) => {
        data.push(chunk);
      })
      .on('end', () => {
        // at this point data is an array of Buffers
        // so Buffer.concat() can make us a new Buffer
        // of all of them together
        const buffer = Buffer.concat(data);
        resolve(buffer.toString('base64'));
      })
      .on('error', reject);
  });
};

export const createFetchBizCardListHandler = () => {
  ipcMain.handle(
    'fetchBizCardList',
    async (
      _,
      apiKey: string,
      { nextPageToken, limit }: FetchBizCardListOption = {}
    ) => {
      const params = new URLSearchParams();
      if (nextPageToken) {
        params.append('nextPageToken', nextPageToken);
      }
      if (limit) {
        params.append('limit', `${limit}`);
      }
      const res = await request(
        `https://api.sansan.com/v3.2/bizCards/search?${params.toString()}`,
        apiKey
      );
      return getData(res);
    }
  );
};

export const createFetchBizCardImageHandler = () => {
  ipcMain.handle('fetchBizCardImage', async (_, id: Id, apiKey: string) => {
    const res = await request(
      `https://api.sansan.com/v3.2/bizCards/${id}/image`,
      apiKey
    );
    return getImageData(res);
  });
};

export const createFetchUserInfoHandler = () => {
  ipcMain.handle('fetchUserInfo', async (_, apiKey: string) => {
    const res = await request(
      `https://api.sansan.com/v3.2/me`,
      apiKey
    );
    return getData(res);
  });
};

export default () => {
  createFetchBizCardListHandler();
  createFetchBizCardImageHandler();
  createFetchUserInfoHandler();
};
