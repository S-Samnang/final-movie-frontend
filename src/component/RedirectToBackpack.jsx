// components/RedirectToBackpack.js
import { useEffect } from "react";

const RedirectToBackpack = () => {
  useEffect(() => {
    window.location.href = "http://localhost:8000/admin";
  }, []);

  return (
    <p className="text-white text-center mt-10">
      Redirecting to admin panel...
    </p>
  );
};

export default RedirectToBackpack;
