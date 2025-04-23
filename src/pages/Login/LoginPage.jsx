import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileStore } from "../../store/profileStore";
import { request } from "../../util/request";

const LoginPage = () => {
  const navigate = useNavigate();
  const { funLogin } = profileStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await request("auth/login", "post", form);
      funLogin(res.user, res.token);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    }
  };

  const handleSocialLogin = (provider) => {
    const popup = window.open(
      `http://localhost:8000/api/auth/${provider}`,
      "_blank",
      "width=500,height=600"
    );

    const receiveMessage = (event) => {
      if (event.origin !== "http://localhost:8000") return;

      const { user, token } = event.data || {};
      if (user && token) {
        funLogin(user, token);
        navigate("/");
      } else {
        setError("Social login failed.");
      }
    };

    window.addEventListener("message", receiveMessage);

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        window.removeEventListener("message", receiveMessage);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center px-4">
      <div className="bg-[#1c1c1e] w-full max-w-sm p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-600" />
          <span className="px-3 text-sm text-gray-400">or</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        <button
          onClick={() => handleSocialLogin("google")}
          className="w-full mb-3 bg-white text-black py-2 rounded hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>

        <button
          onClick={() => handleSocialLogin("github")}
          className="w-full bg-[#1f2a3a] text-white py-2 rounded hover:bg-[#1a2633] transition"
        >
          Continue with GitHub
        </button>

        <p className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-red-500 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
