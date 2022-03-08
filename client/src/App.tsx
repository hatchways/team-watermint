import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
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
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Profile from './pages/Profile/Profile';

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
                  <ProtectedRoute path="/my-jobs" component={Bookings} />
                  <ProtectedRoute path="/profile/settings" component={Settings} />
                  <ProtectedRoute exact path="/profile/:id" component={Profile} />
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
