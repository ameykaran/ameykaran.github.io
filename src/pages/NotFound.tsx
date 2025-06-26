import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900  flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white"> 
          <span role="img" aria-label="broken rocket">
            💥
          </span>
          Uh Oh!
        </h1>
        <p className="text-xl text-gray-600 mb-4 text-slate-300">You're lost in space</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Let's take you back home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
