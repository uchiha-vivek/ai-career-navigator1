import { Route, Routes } from "react-router-dom"
 
import LandingPage from "./pages/landing-page"
import InterviewPreparation from "./pages/interview-prep"
import Feedback from "./pages/feedback-page"
import FeedbackForm from "./pages/feedback-form"
import FeedbackFormPage from "./pages/feedback-form"
import GenerateQuestionForm from "./pages/generate-question-form"
import TechnicalPage from "./pages/technical-page"



function App(){

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/interview" element={<InterviewPreparation/>}/>
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path="/feedback-form" element={<FeedbackFormPage/>}/>
      <Route path="/generate-question" element={<GenerateQuestionForm/>}/>
      <Route path="/technical" element={<TechnicalPage/>}/>
    </Routes>
    
    </>
  )
}
export default App