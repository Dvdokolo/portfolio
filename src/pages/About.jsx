import { motion } from 'framer-motion';
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaNpm,
  FaCode, FaBrain, FaLaptopCode
} from 'react-icons/fa';
import { SiTailwindcss, SiFramer } from 'react-icons/si';
import profile from "../images/profile.jpg"; 

const About = () => {
  const skills = [
    { name: 'React.js', icon: <FaReact />, color: 'text-blue-500' },
    { name: 'HTML5', icon: <FaHtml5 />, color: 'text-orange-500' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: 'text-blue-400' },
    { name: 'JavaScript', icon: <FaJs />, color: 'text-yellow-400' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'text-teal-500' },
    { name: 'Framer Motion', icon: <SiFramer />, color: 'text-purple-500' },
    { name: 'Git', icon: <FaGitAlt />, color: 'text-red-500' },
    { name: 'NPM', icon: <FaNpm />, color: 'text-red-600' }
  ];

  const highlights = [
    {
      icon: <FaCode />,
      title: "Clean Code",
      description: "Writing maintainable, efficient, and well-documented code"
    },
    {
      icon: <FaBrain />,
      title: "Problem Solving",
      description: "Analytical approach to debugging and feature implementation"
    },
    {
      icon: <FaLaptopCode />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and best practices"
    }
  ];

  return (
    <div className="min-h-screen py-8 md:py-16 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative h-48 md:h-64">
            <div className="absolute inset-0 h-[13rem] bg-blue-600 bg-opacity-60 flex items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white"
              >
                About Me
              </motion.h1>
            </div>
          </div>

          <div className="p-6 md:p-12">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:w-1/3"
              >
                <img
                  src={profile}
                  alt="Developer workspace"
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:w-2/3 space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">
                  David Okolo
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  I'm a front-end developer passionate about building intuitive and user-friendly web applications. With expertise in HTML, CSS, JavaScript, React.js, and Tailwind CSS, I create responsive and high-performance websites with modern design principles.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Currently, I'm expanding my knowledge into full-stack development and exploring machine learning to enhance my problem-solving capabilities. I thrive in dynamic environments, constantly learning new technologies and improving my craft to deliver innovative digital experiences.
                </p>
              </motion.div>
            </div>

            {/* Highlights Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-gray-700 rounded-xl"
                >
                  <div className="text-3xl text-blue-500 mb-4">
                    {highlight.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-300">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Technical Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-4 bg-gray-700 rounded-xl"
                  >
                    <div className={`text-4xl ${skill.color} mb-2`}>
                      {skill.icon}
                    </div>
                    <span className="text-gray-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Resume Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <motion.a
                href="/DavidOkoloResume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Download Resume
              </motion.a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;