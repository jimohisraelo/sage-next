import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} SAGE. All rights reserved.</p>
        <div className="flex space-x-6 text-xl">
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white">
            <FaTiktok />
          </a>
          <a href="#" className="hover:text-white">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
}
