import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Notices from './pages/Notices';
import LostFound from './pages/LostFound';
import Users from './pages/Users';
import Settings from './pages/Settings';

function App() {
  return (
    <ChakraProvider value={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="notices" element={<Notices />} />
            <Route path="lost-found" element={<LostFound />} />
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
