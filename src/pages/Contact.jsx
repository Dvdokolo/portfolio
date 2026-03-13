import { motion } from 'framer-motion';
import { FaWhatsapp, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const Contact = () => {
  return (
    <div className="min-h-screen py-8 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative h-48">
           
            <div className="absolute inset-0 bg-blue-600  bg-opacity-60 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Contact Me
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-12">
            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Get in Touch
                </h2>
                <ContactItem 
                  icon={<MdPhone size={24} />}
                  label="Phone"
                  value="09065256711"
                  href="tel:09065256711"
                />
                <ContactItem 
                  icon={<FaWhatsapp size={24} />}
                  label="WhatsApp"
                  value="Chat on WhatsApp"
                  href="https://wa.me/09065256711"
                />
                <ContactItem 
                  icon={<MdEmail size={24} />}
                  label="Email"
                  value="dvdokolo@gmail.com"
                  href="mailto:dvdokolo@gmail.com"
                />
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Connect With Me
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <SocialLink
                    icon={<FaGithub size={24} />}
                    label="GitHub"
                    href="https://github.com/Dvdokolo"
                  />
                  <SocialLink
                    icon={<FaLinkedin size={24} />}
                    label="LinkedIn"
                    href="https://linkedin.com/in/david-okolo-07418b320"
                  />
                
                  <SocialLink
                    icon={<FaWhatsapp size={24} />}
                    label="WhatsApp"
                    href="https://wa.me/09065256711"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, label, value, href }) => (
  <motion.a
    whileHover={{ scale: 1.02 }}
    href={href}
    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl group"
  >
    <div className="text-blue-500 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400">
        {value}
      </p>
    </div>
  </motion.a>
);

const SocialLink = ({ icon, label, href }) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600"
  >
    <div className="text-blue-500 mr-3">
      {icon}
    </div>
    <span className="text-gray-900 dark:text-white">{label}</span>
  </motion.a>
);

export default Contact;