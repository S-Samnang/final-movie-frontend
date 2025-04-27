const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="text-red-700 px-3 py-2 rounded relative mb-3 text-[13px]"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;
