import axios from "axios";

const KEY = "AIzaSyBHFz9vtq3h-0NdoWUSdZankfeqPYUJXuE";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 20,
    key: KEY,
    type: "video",
  },
});
