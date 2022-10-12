import React from "react";

type propsType = {
  src: string;
};

const VideoPlayer = ({ src }: propsType) => {
  return (
    <video width={300} autoPlay muted>
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
