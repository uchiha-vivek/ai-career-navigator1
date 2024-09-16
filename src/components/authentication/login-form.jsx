import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                console.log("Email is verified");

                const registrationData = localStorage.getItem("registrationData");
                const { firstName = "", lastName = "", gender = "" } = registrationData
                    ? JSON.parse(registrationData)
                    : {};

                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (!userDoc.exists()) {
                    console.log("User document does not exist, creating...");
                    await setDoc(doc(firestore, "users", user.uid), {
                        firstName,
                        lastName,
                        gender,
                        email: user.email,
                    });

                    localStorage.removeItem("registrationData");
                } else {
                    console.log("User document already exists");
                }

                console.log("Redirecting to dashboard...");
                navigate("/dashboard");
            } else {
                setError("Please verify your email before logging in.");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="bg-gradient-to-b from-green-500 to-green-900 justify-center items-center h-screen w-screen flex flex-col relative"
        >
            <motion.h2
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-medium text-4xl text-white mb-10"
            >
                Firebase Auth
            </motion.h2>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-5 border border-gray-300 rounded bg-white bg-opacity-20 backdrop-blur-lg shadow-lg"
            >
                <motion.form
                    onSubmit={handleLogin}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium block mb-2 text-gray-300"
                        >
                            Email
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.05 }}
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white transition-transform duration-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium block mb-2 text-gray-300"
                        >
                            Password
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.05 }}
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white transition-transform duration-300"
                        />
                    </div>
                    {error && (
                        <motion.p
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-red-500 text-sm"
                        >
                            {error}
                        </motion.p>
                    )}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex justify-center py-2 px-4 border border-transparent bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </motion.button>
                </motion.form>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-sm font-medium text-gray-300 mt-5"
                >
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-blue-700 hover:underline">
                        Register Here
                    </Link>
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default Login;
