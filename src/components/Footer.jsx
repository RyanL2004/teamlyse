import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
      <footer className="bg-[#121212] text-gray-400">
        <div className="max-w-screen-xl mx-auto p-6 lg:py-8">
          
          {/* Top Section */}
          <div className="md:flex md:justify-between items-center">
            
            {/* Logo */}
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                <img
                  src="https://www.svgrepo.com/show/495702/shop.svg"
                  className="h-8 me-3"
                  alt="MeetPet Logo"
                />
                <h1 className="text-2xl font-bold">
                  <span className="text-white">Meet</span>
                  <span className="text-gray-400">Pet</span>
                </h1>
              </a>
            </div>
  
            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              
              {/* Resources */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-white uppercase">
                  Resources
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://react.dev/" className="hover:text-white transition duration-300">
                      React
                    </a>
                  </li>
                  <li>
                    <a href="https://nodejs.org/en" className="hover:text-white transition duration-300">
                      Node.js
                    </a>
                  </li>
                </ul>
              </div>
  
              {/* Follow Me */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-white uppercase">
                  Follow Me
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://github.com/RyanL2004" className="hover:text-white transition duration-300">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/rayan-louahche/" className="hover:text-white transition duration-300">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
  
              {/* Legal */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-white uppercase">
                  Legal
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition duration-300">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition duration-300">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
  
            </div>
          </div>
  
          {/* Divider */}
          <hr className="my-6 border-gray-700" />
  
          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            
            {/* Copyright */}
            <span className="text-sm">
              © 2025{" "}
              <a href="#" className="hover:text-white transition duration-300">
                MeetPet™
              </a>
              . All Rights Reserved.
            </span>
  
            {/* Social Icons */}
            <div className="flex mt-4 space-x-6 sm:mt-0">
            <a href="https://github.com/RyanL2004" className="hover:text-white transition">
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
            </a>
            <a href="https://www.linkedin.com/in/rayan-louahche/" className="hover:text-white transition">
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a>
            <a href="https://discord.com/users/YOUR_DISCORD_ID" className="hover:text-white transition">
              <FontAwesomeIcon icon={faDiscord} className="text-xl" />
            </a>
            <a href="mailto:your-email@example.com" className="hover:text-white transition">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            </a>
            <a href="https://your-portfolio.com" className="hover:text-white transition">
              <FontAwesomeIcon icon={faGlobe} className="text-xl" />
            </a>
          </div>
            
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  