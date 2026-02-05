import { Instagram, Phone,Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left - Logo and Tagline */}
          <div className="flex flex-col items-start">
            <Image
              src="/logo/logo-white.svg"
              alt="Sandbox Logo"
              width={60}
              height={60}
              className="mb-4 brightness-0"
            />
            <p className="text-gray-600 text-sm font-gemunu">
              IEEE ITB Student Branch
            </p>
          </div>

          {/* Center - Navigation */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-gray-900 font-gemunu text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-600 hover:text-[#FF6B7A] transition-colors font-gemunu"
              >
                Home
              </Link>
              <Link
                href="/competitions"
                className="text-gray-600 hover:text-[#FF6B7A] transition-colors font-gemunu"
              >
                Competition
              </Link>
            </div>
          </div>

          {/* Right - Contact */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-gray-900 font-gemunu text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <div className="space-y-2 text-gray-600 font-gemunu">
              <p className="text-sm">#theSandboxIEEEITB</p>
              <p className="text-sm">sandbox@ieee-itb.org</p>
              <p className="text-sm">Jl. Ganesha No. 10, Bandung</p>

              {/* Social Media Icons */}
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#FF6B7A] transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#FF6B7A] transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#FF6B7A] transition-colors"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm font-gemunu">
            © 2026 IEEE SANDBOX. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
