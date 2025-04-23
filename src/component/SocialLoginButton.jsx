export const SocialLoginButton = ({ provider, label, bgColor, textColor }) => {
  const handleSocialLogin = () => {
    const url = `http://localhost:8000/api/auth/${provider}`;
    const win = window.open(url, "_blank", "width=500,height=600");

    const timer = setInterval(() => {
      try {
        const result = win.localStorage.getItem("social-auth-result");
        if (result) {
          const { token, user } = JSON.parse(result);
          win.localStorage.removeItem("social-auth-result");
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/";
          clearInterval(timer);
          win.close();
        }
      } catch {}
    }, 500);
  };

  return (
    <button
      onClick={handleSocialLogin}
      className={`w-full ${bgColor} ${textColor} py-2 rounded text-center font-medium`}
    >
      {label}
    </button>
  );
};
