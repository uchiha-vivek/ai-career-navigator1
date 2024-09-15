import TechnicalProblem from "../components/feedback/solve-technical-problem"
import Navbar from "../components/navbar"


function TechnicalPage(){
    return (
        <>
       <Navbar/>
       <div className="mt-5" >
            <TechnicalProblem/>
       </div>
        </>
    )
}
export default TechnicalPage