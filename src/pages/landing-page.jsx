import Login from "../components/authentication/login-form"
import RegisterPage from "../components/authentication/register-form"
import FramerMotionCard from "../components/card-component"
import Footer from "../components/footer"
import InterviewAssistantComponent from "../components/InterviewAssistantComponent"
import InterviewComponent from "../components/InterviewComponent"
import Navbar from "../components/navbar"
import HeroSection from "./hero-section"




const LandingPage = () => {

    return (
        <>
        <div className="flex flex-col min-h-screen " >
            <Navbar/>
            <HeroSection/>
            <main className="flex-grow mt-20 " >
                 <FramerMotionCard/>
                 {/* <Login/>
                 <RegisterPage/> */}
                
            </main>
            <Footer/>
        </div>
        </>
    )
}
export default LandingPage