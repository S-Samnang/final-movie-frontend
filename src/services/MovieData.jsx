export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4113f3ad734e747a5b463cde8c55de42&language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch actor data: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching actor data:", error);
    return null;
  }
};

export const fetchNowPlayingMovie = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=4113f3ad734e747a5b463cde8c55de42&language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch actor data: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching actor data:", error);
    return null;
  }
};

export const fetchUpcomingMovie = async () => {
  try {
    const response = await fetch(
      ` https://api.themoviedb.org/3/movie/upcoming?api_key=4113f3ad734e747a5b463cde8c55de42&language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch actor data: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching actor data:", error);
    return null;
  }
};

export const fetchActor = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=4113f3ad734e747a5b463cde8c55de42`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch actor data: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching actor data:", error);
    return null;
  }
};

export const fetchTrailer = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=4113f3ad734e747a5b463cde8c55de42&language=en-US`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch actor data: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching actor data:", error);
    return null;
  }
};
