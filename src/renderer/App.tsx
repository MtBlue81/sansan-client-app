import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Center } from '@chakra-ui/react';
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
        <Routes>
          <Route path="/apiKey" element={<ApiKeyPage />} />
          <Route path="/" element={<ListPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
