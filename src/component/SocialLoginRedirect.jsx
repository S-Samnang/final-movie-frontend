// src/pages/Auth/SocialLoginRedirect.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { profileStore } from "../store/profileStore";

const SocialLoginRedirect = () => {
  const { funLogin } = profileStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token && email) {
      funLogin({ name, email }, token);
      navigate("/");
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white text-lg">
      Logging you in with social account...
    </div>
  );
};

export default SocialLoginRedirect;
