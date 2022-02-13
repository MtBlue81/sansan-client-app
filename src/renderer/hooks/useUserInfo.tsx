import React, { useState, createContext, useCallback, useContext, useEffect } from 'react';
import { getApiKey, setApiKey as _setApiKey, fetchUserInfo } from '../service/api';
import type { UserInfo } from '../models/UserInfo';

const noop  = () => undefined;

const UserContext = createContext<{
  userInfo: UserInfo | null;
  apiKey?: string;
  updateApiKey: (apiKey: string) => void;
  clearUserInfo: VoidFunction;
}>({ userInfo: null, apiKey: '', updateApiKey: noop, clearUserInfo: noop });

const useUpdateUserInfo = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [candidate, setCandidate] = useState<string>(getApiKey() || '');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const update = useCallback(async (key) => {
    try {
      const res = await fetchUserInfo(key);
      _setApiKey(key)
      setApiKey(key);
      setUserInfo(res);
    } catch(e) {
      setUserInfo(null);
      throw(e);
    }
  }, []);

  useEffect(() =>{
    if (!candidate) return;
    update(candidate).catch(noop);
  }, [candidate])

  return {
    apiKey,
    userInfo,
    clearUserInfo: useCallback(() => {
      setCandidate('');
      setUserInfo(null);
    },[]),
    updateApiKey: async (key: string) => {
      setCandidate(key)
      await update(key);
    },
  } as const;
};

export const UserInfoProvider: React.FC<{
 fallback: React.ReactNode;
}> = ({ fallback, children }) => {
  const {userInfo, apiKey, updateApiKey, clearUserInfo } = useUpdateUserInfo();

  return (
    <UserContext.Provider
      value={{
        userInfo,
        updateApiKey,
        apiKey,
        clearUserInfo,
      }}
    >
      {userInfo ? children : fallback}
    </UserContext.Provider>
  );
};

export default () => useContext(UserContext);
