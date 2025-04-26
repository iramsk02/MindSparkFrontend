import { useState } from 'react'
import './App.css'
// import Navbar from './Components/Navbar'
import Landing from './Pages/Landing'
import SignIn from './Pages/Signin'
import SignUp from './Pages/Sinup'
import { Route, Router, Routes } from 'react-router-dom'
import Courses from './Pages/Courses'
import Instructor from './Pages/Instructor'
import StudentDashboard from './Pages/StudentDashboard'
import LessonPage from './Pages/LessonPage'
import LeaderBoard from './Pages/LeaderBoard'
// import Errorroute from './Pages/Error'
import QuizPage from './Pages/QuizPage'
import QuizQnA from './Pages/QuizQnA'
import QuizResult from './Pages/QuizResult'
import InstructorDashboard from './Pages/InstructorDashboard'
import CreateCourse from './Pages/CreateCourse'
import CreateQuiz from './Pages/CreateQuiz'
import StudentProfile from './Pages/StudentProfile'
import ProfileSetup from './Pages/ProfileSetting'
import InstructorProfile from './Pages/InstructorsProfile'
import ErrorPage from './Pages/Error'
import GoogleProfileSetup from './Pages/GProfilesettings'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

<Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<Landing />}> </Route>
        <Route path='/Signin' element={<SignIn />}> </Route>
        <Route path='/Signup' element={<SignUp />}> </Route>
        <Route path='/StudentProfile' element={<StudentProfile />}> </Route>
        <Route path='/InstructorProfile' element={<InstructorProfile />}> </Route>
        <Route path='/ProfileSettings' element={<ProfileSetup />}> </Route>
        <Route path='/ProfileSetting' element={<GoogleProfileSetup />}> </Route>
        <Route path='/StudentDashboard' element={<StudentDashboard />}> </Route>
        <Route path='/Instructors' element={<Instructor />}> </Route>
        <Route path='/Courses' element={<Courses />}> </Route>
        <Route path='/Lesson/:id' element={<LessonPage />}> </Route>
        <Route path='/InstructorDashboard' element={<InstructorDashboard />}> </Route>
        <Route path='/Createcourse' element={<CreateCourse />}> </Route>
        <Route path='/Createquiz' element={<CreateQuiz />}> </Route>
        <Route path='/Leaderboard' element={<LeaderBoard />}> </Route>
        <Route path='/Quiz' element={<QuizPage />}> </Route>
        <Route path='/TakeQuiz/:id' element={<QuizQnA />}> </Route>
        <Route path='/Result' element={<QuizResult />}> </Route>
        <Route path='*' element={<ErrorPage />}> </Route>
      </Routes>


    </>
  )
}

export default App
