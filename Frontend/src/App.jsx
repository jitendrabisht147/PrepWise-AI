import Landing from './Pages/Landing'
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import StartInterview from './Pages/StartInterview'
import MockInterview from './Pages/MockInterview'
import Result from './Pages/Result'
import ProtectedRoute from './Components/ProtectedRoute'
import InterviewHistory from './Pages/InterviewHistory';
import InterviewDetails from './Pages/InterviewDetails';
import Profile from "./Pages/Profile";
import PracticeQuestions from "./Pages/PracticeQuestions";
import DashResults from "./Pages/DashResults";
import VerifyOTP from './Pages/VarifyOTP'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/startinterview' element={<StartInterview />} />
        <Route path='/mockinterview' element={<MockInterview />} />
        <Route path='/result' element={<Result />} />
        <Route path="/interviewhistory" element={<InterviewHistory />}/>
        <Route path="/interview-details/:id" element={<InterviewDetails />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/practicequestions" element={
        <ProtectedRoute>
            <PracticeQuestions />
        </ProtectedRoute>
    }/> 
    <Route path="/dashresults" element={
        <ProtectedRoute>
            <DashResults/>
        </ProtectedRoute>
    }/>
     <Route path="/verify-otp" element={<VerifyOTP/>} />
      </Routes>
    </>
  )
}

export default App
