import validator from 'validator';

export const getVideoID = (link: string) => {
  const isUrl = validator.isURL(link);
  if (!isUrl) {
    return null;
  }
  const url = new URL(link);
  const videoId = url.searchParams.get('v');
  return videoId;
};
