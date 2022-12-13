import React from "react";

type propsType = {
  src: string;
  muted: boolean;
  autoPlay: boolean;
};

const VideoPlayer = ({ src, muted, autoPlay }: propsType) => {
  return (
    <video width={300} autoPlay={autoPlay} muted={muted} src={src}></video>
  );
};

export default VideoPlayer;
