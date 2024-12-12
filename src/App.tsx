import { RouterProvider } from 'react-router'
import routes from './routes/router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'draft-js/dist/Draft.css';
import 'react-quill/dist/quill.snow.css'
import './assets/scss/main.scss';
import { AuthProvider } from './app/utils/auth';


function App() {
  return <>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </>
}

export default App
