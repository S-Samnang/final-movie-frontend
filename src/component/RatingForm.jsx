import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { request } from "../util/request";
import { profileStore } from "../store/profileStore";

const RatingForm = ({ movieId, onRatingSubmitted }) => {
  const { user, token } = profileStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    if (!rating) {
      setMsg("Please select a star rating.");
      return;
    }

    setLoading(true);
    try {
      const res = await request(
        "ratings",
        "post",
        {
          movie_id: movieId,
          rating,
          comment,
        },
        token
      );
      setMsg("✅ Rating submitted!");
      setRating(0);
      setComment("");
      onRatingSubmitted();
    } catch (err) {
      setMsg("❌ Failed to submit rating. Please log in.");
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  if (!user)
    return <p className="text-gray-400 mt-4">Log in to leave a rating.</p>;

  return (
    <div className="bg-white bg-opacity-5 p-4 rounded-md border border-gray-600 mt-8 w-full">
      <h3 className="text-lg font-bold text-white mb-4">Rate this movie</h3>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* ⭐ Rating */}
        <ReactStars
          count={5}
          onChange={setRating}
          size={28}
          value={rating}
          activeColor="#ffd700"
        />

        {/* 📝 Comment */}
        <textarea
          className="flex-1 min-w-[200px] p-2 border border-gray-400 rounded bg-black text-white placeholder-gray-400 resize-none"
          placeholder="Write a comment (optional)..."
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* ✅ Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md whitespace-nowrap"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {msg && <p className="mt-3 text-sm text-gray-300">{msg}</p>}
    </div>
  );
};

export default RatingForm;
