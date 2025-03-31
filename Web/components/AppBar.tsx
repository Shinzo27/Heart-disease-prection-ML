import { Heart } from "lucide-react";
import Link from "next/link";

export default function AppBar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center gap-3 text-xl font-medium" href="#">
        <Heart className="h-6 w-6 text-red-500" />
        <span className="">HeartGuard AI</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>
        <Link
          className="text-sm font-medium bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          href="/signin"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
