import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './style/index.scss';
// Redux  
import { Provider } from 'react-redux';
import { store } from './app/store';
// Pages
import ResultPage from './pages/ResultPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/Private/PrivateRoute';
import TestPage from './pages/TestPage';
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import AdminPage from "./pages/Admin/AdminPage";
import SignInPromo from "./pages/SignInPromo";
import DeveloperPage from "./pages/DeveloperPage";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactGA from 'react-ga';
import { useEffect } from "react";
const TRACKING_ID = "G-1XBNBWQR5V"; 
ReactGA.initialize(TRACKING_ID);


function App() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<AuthWrapper />} >
          
          {["/", "/sign-in"].map((path, index) => 
            <Route path={path} element={<SignInPromo />} key={index} />
          )}

            <Route path='/test/:id' element={<TestPage />} />
            <Route path='/test/:id/result' element={<ResultPage />}/>
            <Route path='/test/:id/answers' element={<TestPage />} />

            <Route path='/xtivka/:id' element={<TestPage />} />
           

            <Route path='/profile' element={<PrivateRoute />} >
              <Route path='/profile' element={<ProfilePage />} />
            </Route>  

            <Route path='/developer' element={<DeveloperPage />}/>
            {/* <Route path='/admin' element={<AdminPage />}/> */}
          </Route> 
        </Routes>
      </Router>
      <ToastContainer 
        style={{
          fontSize: '1.2rem',
        }}
        autoClose={2000}
      />
    </Provider>
  );
}

export default App;
