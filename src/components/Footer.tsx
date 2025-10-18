import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white mb-4">About Us</h3>
            <p className="text-sm">
              Leading educational institution committed to excellence in academics and character development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-white transition-colors">
                  Downloads
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="text-white mb-4">Academics</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/departments" className="hover:text-white transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-white transition-colors">
                  Faculty
                </Link>
              </li>
              <li>
                <Link to="/fee-structure" className="hover:text-white transition-colors">
                  Fee Structure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Main Campus, University Road, City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+92-123-4567890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@college.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} College Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
