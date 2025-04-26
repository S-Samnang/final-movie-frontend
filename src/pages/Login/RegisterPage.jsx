import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../util/request";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1 = Register form, Step 2 = OTP input
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await request("auth/register", "post", form);
      setMessage(res.message);
      setStep(2); // move to OTP step
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await request("auth/verify-otp", "post", {
        email: form.email,
        otp,
      });
      setMessage(res.message);
      // ✅ After verify success, user must login manually
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed.");
    }
  };

  const handleResendOtp = async () => {
    setError("");
    try {
      const res = await request("auth/resend-otp", "post", {
        email: form.email,
      });
      setMessage(res.message);
      setCooldown(30); //Start 30 second cooldown
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP.");
    }
  };
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center px-4">
      <div className="bg-[#1c1c1e] w-full max-w-sm p-8 rounded-xl shadow-lg">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Register
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
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
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
              >
                Register
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Verify OTP
            </h2>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                required
                className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
              >
                Verify OTP
              </button>
            </form>

            {/* Resend OTP Button with Cooldown */}
            <div className="text-center mt-4">
              {cooldown > 0 ? (
                <p className="text-gray-400 text-sm">
                  You can resend OTP in {cooldown} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-400 text-sm hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
        {message && (
          <p className="text-green-400 text-sm text-center mt-4">{message}</p>
        )}

        {/* Already have account */}
        {step === 1 && (
          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-red-500 hover:underline"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
