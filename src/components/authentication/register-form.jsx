import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { motion } from "framer-motion"; // Import framer-motion

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);

      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          firstName,
          lastName,
          gender,
          email,
        })
      );
      setMessage("Registration successful! Please check your email for verification.");
      setFirstName("");
      setLastName("");
      setGender("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.message || "An unknown error occurred!");
    }
  };

  return (
    <div className="bg-gray-600 flex flex-col justify-center items-center h-screen">
      <motion.h2
        className="text-2xl font-bold text-white mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Register
      </motion.h2>
      <motion.div
        className="p-5 bg-white rounded shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handleRegister} className="space-y-6">
          <motion.div className="flex space-x-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="w-1/2">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <label className="block text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </motion.div>

          {error && <motion.p className="text-red-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>{error}</motion.p>}
          {message && <motion.p className="text-green-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>{message}</motion.p>}

          <motion.button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
