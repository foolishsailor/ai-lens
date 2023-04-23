import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css';

import AgentsControl from './pages/AgentsControl';

import store from './store';
import SocketProvider from './services/socket/socket';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <SocketProvider>
          <CssBaseline />
          <AgentsControl />
        </SocketProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
