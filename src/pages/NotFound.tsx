import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="glass-card p-10 text-center max-w-md">
        <div className="text-5xl mb-4">💥</div>
        <h1 className="font-display text-3xl font-extrabold mb-3 text-white">
          Uh oh!
        </h1>
        <p className="text-gray-300/90 mb-6">You're lost in space.</p>
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-blue text-[#150f1f] font-semibold px-5 py-2 hover:bg-blue/90 hover:scale-105 transition-all duration-300"
        >
          Let's take you back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
