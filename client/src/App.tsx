import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Login from './pages/Login/Login';
import LandingPage from './pages/LandingPage/LandingPage';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { Navbar } from './components/Navbar/Navbar';
import Bookings from './pages/Bookings/Bookings';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SnackBarProvider>
            <AuthProvider>
              <SocketProvider>
                <CssBaseline />
                <Navbar />
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route path="/my-jobs" component={Bookings} />
                  <Route path="/profile/settings" component={Settings} />
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </SocketProvider>
            </AuthProvider>
          </SnackBarProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
