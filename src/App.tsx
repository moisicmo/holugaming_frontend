import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';
import { Header } from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Box
            component="main"
            sx={{
              marginTop: { xs: '56px', md: '64px' },
            }}
          >
            <AppRouter />
          </Box>
          <Footer />
        </Provider>
      </BrowserRouter>
    </>

  )
}