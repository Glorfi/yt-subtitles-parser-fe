interface IVideoPlayerProps {
  videoId: string;
}
export const VideoPlayer = (props: IVideoPlayerProps): JSX.Element => {
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${props.videoId}?si=zgbkU3eE-dqT-T6z`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};
