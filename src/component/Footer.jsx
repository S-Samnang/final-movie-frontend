import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#131313] text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Fun watch</h1>
            <p className="text-sm">enjoy your times</p>
          </div>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <Link to="/toprated" className="hover:underline">
                Popular
              </Link>
            </li>
            <li>
              <Link to="nowplaying" className="hover:underline">
                Now playing
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="hover:underline">
                Upcoming
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-600" />
        <p className="text-center text-sm font-medium">Powered by Samnang</p>
      </div>
    </footer>
  );
};

export default Footer;
