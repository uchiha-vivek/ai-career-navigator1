import GenerateQuestion from "../components/feedback/generate-question"
import InterviewAssistantComponent from "../components/InterviewAssistantComponent"
import Navbar from "../components/navbar"

function GenerateQuestionForm(){

    return (
        <>
        <Navbar/>
        <div className="mt-5" >
            
            <InterviewAssistantComponent/>
        </div>
        </>
    )
}
export default GenerateQuestionForm