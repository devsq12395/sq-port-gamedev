import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex items-center justify-center h-screen w-full flex-col text-center bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
      }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.8 } }}
      >
        Hello, I am <span className="text-blue-500">Clydon Gamboa</span>
      </motion.h1>
      
      <motion.p
        className="text-xl md:text-2xl font-medium mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
      >
        fullstack and game developer
      </motion.p>

      <motion.hr
        className="w-1/2 border-t-2 border-gray-300 mb-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1, transition: { duration: 0.8, delay: 0.4 } }}
      />

      <motion.div
        className="flex space-x-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.6 } }}
      >
        <a href="https://www.linkedin.com/in/clydongamboa/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-3xl text-blue-700 hover:text-blue-900" />
        </a>
        <a href="https://github.com/clydongamboa" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-3xl text-gray-800 hover:text-black" />
        </a>
        <a href="https://twitter.com/clydongamboa" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-3xl text-blue-500 hover:text-blue-700" />
        </a>
      </motion.div>

      <motion.button
        className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600"
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.8, delay: 0.8 } }}
        onClick={() => window.open('/path/to/cv.pdf', '_blank')}
      >
        Download CV
      </motion.button>
    </motion.div>
  );
}

export default MainPage;
