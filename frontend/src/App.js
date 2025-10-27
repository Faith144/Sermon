
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from './context/useAuth';
import PrivateRoute from './components/private_route'

import Login from './routes/Login'
import Home from './routes/Home'
import Notes from './routes/Notes';
import Register from './routes/Register';
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <AuthProvider>
          <Routes>
            <Route path='/login' element={ <Login /> }/>
              <Route path='/notes' element={<PrivateRoute> <Notes /> </PrivateRoute>} />
              <Route path='/' element={ <Home /> } />
              <Route path='/register' element={ <Register /> } />
            </Routes>
            </AuthProvider>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
