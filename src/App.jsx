import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';


import Login from './page/Login'
import Browse from './page/Browse'
import NotFound from './components/NotFound'
import AuthProvider  from './context/AuthProvider'
import SearchProvider from './context/SearchProvider';
import LanguageProvider from './context/LanguageProvider';

const router = createBrowserRouter([
  {
    path:'/',
    element : <Login/>
  },
  {
    path:'/browse',
    element : <Browse/>
  },
  {
    path:'*',
    element : <NotFound/>
  }
]);

const App = () => {
  return (
    <AuthProvider> 
      <LanguageProvider>
        <SearchProvider>
          <ToastContainer theme='dark'/>
          <RouterProvider router={router} />
        </SearchProvider>
      </LanguageProvider>
    </AuthProvider>
  )
};

export default App;
