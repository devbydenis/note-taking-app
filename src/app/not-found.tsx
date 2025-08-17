import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-sm w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Sorry your page has a problem.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            <FaHome /> Back To Home
          </Link>

        <p className="mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Note App Taking
        </p>
        
        </div>
      </div>
    </div>
  );
}