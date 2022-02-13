import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Center } from '@chakra-ui/react';
import { UserInfoProvider  } from './hooks/useUserInfo';
import BizCardList from './components/BizCardList';
import ApiKeyForm from './components/ApiKeyForm';
import Header from './components/Header';

const ListPage = () => {
  return (
    <>
      <Header />
      <BizCardList />
    </>
  );
};

const ApiKeyPage = () => {
  return (
    <Center>
      <ApiKeyForm />
    </Center>
  );
};

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <UserInfoProvider fallback={<ApiKeyPage />}>
          <Routes>
            <Route path="/" element={<ListPage />} />
          </Routes>
        </UserInfoProvider>
      </Router>
    </ChakraProvider>
  );
}
