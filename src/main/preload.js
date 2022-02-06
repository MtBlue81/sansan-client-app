const { contextBridge, ipcRenderer } = require('electron');

const getErrorMessage =  (invokeMethod, e) => {
  const msg = e.message.replace(new RegExp(`^.*'${invokeMethod}':\s*`), '');
  return msg.trim();
}

const callIpcMethod = (invokeMethod, ...args) => {
  return ipcRenderer.invoke(invokeMethod, ...args).catch(e => {
    throw new Error(getErrorMessage(invokeMethod, e));
  });
}

contextBridge.exposeInMainWorld('electron', {
  sansanClient: {
    fetchBizCardList(...args) {
      return callIpcMethod('fetchBizCardList', ...args);
    },
    fetchBizCardImage(...args) {
      return callIpcMethod('fetchBizCardImage', ...args);
    },
  },
});
