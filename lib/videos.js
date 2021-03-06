import testData from "../data/videos.json";
import { getWatchedVideos, getFavouritedVideos } from "./db/hasura";
const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  );
  return await response.json();
};

const getCommonVideos = async (url) => {
  try {
    const environment = process.env.NODE_ENV;
    const data =
      environment === "development" ? testData : await fetchVideos(url);

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }
    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        // imgUrl: item.snippet.thumbnails.medium.url,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        statistics: item.statistics || { viewCount: 0 },
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

export const getVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || null
  );
};

export const getMyListVideos = async (userId, token) => {
  const videos = await getFavouritedVideos(userId, token);
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || null
  );
};
