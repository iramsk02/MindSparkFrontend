import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../icons/Logo";

const Navbar = ({ role, avatar, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const profileLink = role === "student" ? "/StudentProfile" : "/InstructorProfile";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Logo navigateto="/StudentDashboard" />
          <span className="font-bold text-xl">MicroLearn</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-300 text-md items-center">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition flex items-center gap-1">
              {link.icon}
              {link.label}
            </a>
          ))}
          <a href={profileLink}>
            <img
              className="bg-amber-300 w-[42px] h-[42px] rounded-full border-amber-50 border"
              src={avatar}
              alt="DP"
            />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition">
              {link.label}
            </a>
          ))}
          <a href={profileLink} className="hover:text-white transition">Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
