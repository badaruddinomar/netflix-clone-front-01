import { useEffect, useState } from "react";

export const useFetch = (path, page = 1, genresId, query) => {
  const [data, setData] = useState({});
  const apiBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  useEffect(() => {
    const fetchHandler = async () => {
      let url;
      if (genresId) {
        url = `${apiBaseUrl}/${path}?language=en-US&page=${page}&api_key=${apiKey}&with_genres=${genresId}`;
      } else if (query) {
        url = `${apiBaseUrl}/${path}?language=en-US&page=${page}&api_key=${apiKey}&query=${query}`;
      } else {
        url = `${apiBaseUrl}/${path}?language=en-US&page=${page}&api_key=${apiKey}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    };
    fetchHandler();
  }, [apiBaseUrl, path, apiKey, page, genresId, query]);
  return data;
};
