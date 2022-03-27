import axios from "axios";

export const getVideos = async (searchQuery) => {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`
    );
    const data = response.data;
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }
    const id = item.id?.videoId || item.id;
    return data?.items.map((item) => {
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
  } catch (err) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};
