import { Heart } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
      <footer className="w-full border-t bg-white py-6 md:py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link className="flex items-center gap-2" href="/">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="font-bold">HeartGuard AI</span>
            </Link>
            <p className="text-sm text-gray-500">Advanced AI-powered heart health assessment and recommendations.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/assessment" className="text-sm text-gray-500 hover:text-gray-900">
                  Assessment
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-gray-500 hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-sm text-gray-500 hover:text-gray-900">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm text-gray-500 hover:text-gray-900">
                  Health Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-gray-500 hover:text-gray-900">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-500 hover:text-gray-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© 2023 HeartGuard AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-gray-900">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
    );
}