import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-8 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-center md:text-left text-lg font-semibold mb-6 md:mb-0">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transform transition-transform duration-300 ease-out"
            aria-label="LinkedIn"
          >
            <FaLinkedin
              size={30}
              className="text-white hover:text-blue-400 transition-colors duration-300"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transform transition-transform duration-300 ease-out"
            aria-label="Instagram"
          >
            <FaInstagram
              size={30}
              className="text-white hover:text-pink-400 transition-colors duration-300"
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transform transition-transform duration-300 ease-out"
            aria-label="Twitter"
          >
            <FaTwitter
              size={30}
              className="text-white hover:text-blue-300 transition-colors duration-300"
            />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transform transition-transform duration-300 ease-out"
            aria-label="YouTube"
          >
            <FaYoutube
              size={30}
              className="text-white hover:text-red-400 transition-colors duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
