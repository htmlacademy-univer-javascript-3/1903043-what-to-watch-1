import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedFilm } from "../../store/api-actions";
import { AppDispatch } from "../../types/store";
import { getIsLoadingStatus, getSelectedFilm } from "./../../store/selectors";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const id = Number(window.location.href.split("/").at(-1));
  const film = useSelector((state) => getSelectedFilm(state));
  const videoRef: any = React.useRef();
  const timeValueRef: any = React.useRef();
  const buttonPlayRef: any = React.useRef();
  const progressBarRef: any = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchSelectedFilm({ id }));
  }, [id]);

  const handlePlay = () => {
    if (videoRef.current.paused == true) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen(); // Firefox
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen(); // Chrome and Safari
    }
  };

  const getRemainingTime = (): string => {
    if (!videoRef.current) return "";
    const allSeconds = Math.round(
      videoRef.current.duration - videoRef.current.currentTime
    );
    const hours = Math.floor(allSeconds / 3600);
    const minutes = Math.floor((allSeconds % 3600) / 60);
    const seconds = allSeconds % 60;
    const remainingTime = [hours, minutes, seconds]
      .map((item, index) => {
        if (index == 0 && item == 0) return;
        else if (item >= 10) return item;
        return `0${item}`;
      })
      .filter((item) => item)
      .join(":");
    return remainingTime;
  };

  const handleExit = () => {
    navigate(-1);
  };

  const handleChangeProgressBar = (e: any) => {
    var time = videoRef.current.duration * (progressBarRef.current.value / 100);
    videoRef.current.currentTime = time;
  };

  const handleTimeUpDateVideo = () => {
    timeValueRef.current.innerHTML = getRemainingTime();
    var value =
      (100 / videoRef.current.duration) * videoRef.current.currentTime;
    progressBarRef.current.value = value;
    progressBarRef.current.style.background = `-webkit-linear-gradient(
      left,
      #d9cd8d ${value}%,
      #d9cd8d ${value}%,
      rgba(255, 251, 231, 0.35) ${value}%,
      rgba(255, 251, 231, 0.35) 100%
    )`;
  };

  return (
    <>
      <div className="player">
        <video
          src={film?.videoLink}
          className="player__video"
          poster={film?.posterImage}
          ref={videoRef}
          onTimeUpdate={handleTimeUpDateVideo}
        ></video>

        <button type="button" className="player__exit" onClick={handleExit}>
          Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <input
                className="player__progress"
                value="0"
                max="100"
                ref={progressBarRef}
                onChange={handleChangeProgressBar}
                type="range"
              />
            </div>
            <div className="player__time-value" ref={timeValueRef}>
              {getRemainingTime()}
            </div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={handlePlay}
              ref={buttonPlayRef}
            >
              {isPlaying ? (
                <>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="#EEE5B5"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
                    <rect x="6" y="5" width="4" height="14" rx="1" />{" "}
                    <rect x="14" y="5" width="4" height="14" rx="1" />{" "}
                  </svg>
                  <span>Play</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Pause</span>
                </>
              )}
            </button>
            <div className="player__name">{isPlaying ? "Pause" : "Play"}</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={handleFullScreen}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
