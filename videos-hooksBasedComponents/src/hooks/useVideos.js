import { useState, useEffect } from "react";
import youtube from "../apis/youtube";

export default function useVideos(defaultSearch) {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getSearchResults(defaultSearch);
  }, [defaultSearch]);
  const getSearchResults = async (searchInput) => {
    const results = await youtube.get("/search", {
      params: {
        q: searchInput,
      },
    });
    setVideos(results.data.items);
  };
  return [videos, getSearchResults];
}
