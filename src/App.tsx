import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './style/main.scss';
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<AuthWrapper />} >

            <Route path='/test/:id' element={<TestPage />} />
            <Route path='/test/:id/result/' element={<ResultPage />}/>

            <Route path='/profile' element={<PrivateRoute />} >
              <Route path='/profile' element={<ProfilePage />} />
            </Route>  

            <Route path='/admin' element={<AdminPage />}/>
          </Route> 
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
