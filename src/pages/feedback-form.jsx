import FeedbackForm from "../components/feedback/api-response"
import Navbar from "../components/navbar"
function FeedbackFormPage(){
    return (
        <>
        <Navbar/>
      
        <div className="mt-5" >
        <FeedbackForm/>
        </div>
        </>
    )
}
export default FeedbackFormPage