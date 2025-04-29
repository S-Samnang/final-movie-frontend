import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { request } from "../../util/request";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }

    try {
      const res = await request("auth/reset-password", "post", {
        email: form.email,
        token,
        password: form.password,
        password_confirmation: form.confirm,
      });

      setMessage(
        res.message || "Password reset successful. You may now login."
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.error || "Reset failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center px-4">
      <div className="bg-[#1c1c1e] max-w-sm w-full p-8 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#2c2c2e] rounded border border-gray-700 placeholder-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#2c2c2e] rounded border border-gray-700 placeholder-gray-400"
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={form.confirm}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#2c2c2e] rounded border border-gray-700 placeholder-gray-400"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && (
            <p className="text-green-400 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
