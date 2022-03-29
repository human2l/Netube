import axios from "axios";
import data from "../data/videos.json";
const getCommonVideos = async (url) => {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    // const response = await axios.get(
    //   `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    // );
    // const data = response.data;
    console.log("Youtube API called");

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }
    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
  } catch (err) {
    console.error("Something went wrong with video library");
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=AU`;
  return getCommonVideos(URL);
};
