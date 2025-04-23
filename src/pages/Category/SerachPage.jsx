import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../../component/MovieCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return;
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:8000/api/search?query=${query}`
        );
        setResults(res.data.results);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-10 text-white">
      <h2 className="text-2xl font-semibold mb-4">
        Search results for: <span className="text-yellow-400">"{query}"</span>
      </h2>

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && query && <p>No results found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
