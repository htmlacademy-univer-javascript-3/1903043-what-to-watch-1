import React from "react";

type propsType = {
  src: string;
  muted: boolean;
  autoPlay: boolean;
};

const VideoPlayer = ({ src, muted, autoPlay }: propsType) => {
  return (
    <video width={300} autoPlay={autoPlay} muted={muted}>
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
