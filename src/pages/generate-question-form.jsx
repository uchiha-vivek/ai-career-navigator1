import GenerateQuestion from "../components/feedback/generate-question"
import Navbar from "../components/navbar"

function GenerateQuestionForm(){

    return (
        <>
        <Navbar/>
        <div className="mt-5" >
            <GenerateQuestion/>
        </div>
        </>
    )
}
export default GenerateQuestionForm