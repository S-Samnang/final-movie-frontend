import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UserScore = ({ rating }) => {
  const percentage = Math.round((rating / 10) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="w-16 h-16">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#ffffff",
            pathColor: "#22c55e", // Tailwind green-500
            trailColor: "#1e293b", // Tailwind slate-800
            textSize: "24px",
            strokeLinecap: "round",
          })}
        />
      </div>
      <p className="text-white font-semibold text-sm">User Score</p>
    </div>
  );
};

export default UserScore;