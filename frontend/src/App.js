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

import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <AuthProvider>
            <Navbar />
            <Banner />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/notes' element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              } />
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              {/* Add these routes for the new pages */}
              <Route path='/videos' element={<div className="main-content"><h1>Videos Page</h1></div>} />
              <Route path='/audios' element={<div className="main-content"><h1>Audios Page</h1></div>} />
              <Route path='/about' element={<div className="main-content"><h1>About Us Page</h1></div>} />
            </Routes>
            <Footer />
          </AuthProvider>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;