
import { useSelector } from 'react-redux';
import './App.css';
import Home from './components/Home';
import { Route, Routes, Navigate } from 'react-router-dom';

import Logins from './components/Logins';
import Signup from './components/Signup';



function App() {
  const user = useSelector((state) => state.authReducer.authData)
  const authred = useSelector((state) => state.authReducer)
  const loading = useSelector((state) => state.authReducer.loading)
  const loader = useSelector((state) => state.postReducer.loading)
  return (

    <div className="App flex justify-center  bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 ">
      {loading || loader && (<div className="spinner-parent flex justify-center items-center bg-slate-600 fixed h-screen w-screen z-50 opacity-80">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" >Loading...</span >
        </div>
      </div>)}



      <Routes>
        <Route path='/' element={user ? <Navigate to='home' /> : <Navigate to="/login" />} />
        <Route path='/login' element={user?<Navigate to="../home" /> : <Logins/>} />
        <Route path='/signup' element={user? <Navigate to="../home" /> : <Signup />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to="../login" />} />
      </Routes>

    </div>
  );
}

export default App;
