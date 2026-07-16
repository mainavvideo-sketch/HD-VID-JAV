import { useState } from "react";
import play from "../../assets/playbutton.png";
import { Link } from "react-router-dom";
import "./videocard.css";

import { createPlayer, videoFeatures } from "@videojs/react";
import { MinimalVideoSkin, Video } from "@videojs/react/video";

const Player = createPlayer({
  features: videoFeatures,
});

function VideoCard({ video }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [playTrailer, setPlayTrailer] = useState(false);

  const openTrailer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTrailer(true);
    setPlayTrailer(false);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setPlayTrailer(false);
  };

  return (
    <>
      <div className="video-card">
        <div className="video-overlay">
          {video.trailer && (
            <div className="play-icon" onClick={openTrailer}>
              <img src={play} alt="Play Icon" />
            </div>
          )}

          <Link to={`/watch/${video.id}`}>
            <img
              src={video.thumbnail}
              className="thumbnail"
              alt={video.title}
            />
          </Link>
        </div>

        <div className="meta">
          <Link to={`/watch/${video.id}`}>
            <h1 className="video-title">{video.title}</h1>
          </Link>

          <div className="actress">
            {video.actress.map((name, index) => (
              <span key={index}>
                <Link to={`/actress/${encodeURIComponent(name)}`}>
                  {name}
                </Link>
              </span>
            ))}
          </div>

          <div className="studio">
            <span>
              <Link to={`/studio/${encodeURIComponent(video.studio)}`}>
                {video.studio}
              </Link>
            </span>
          </div>
        </div>
      </div>

      {showTrailer && (
        <div className="trailer-modal" onClick={closeTrailer}>
          <div
            className="trailer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeTrailer}>
              ✕
            </button>

            {!playTrailer ? (
              <div className="preview">
                <img
                  src={video.thumbnail}
                  className="watch-thumbnail"
                  alt={video.title}
                />

                <div
                  className="watchplay"
                  onClick={() => setPlayTrailer(true)}
                >
                  <img src={play} alt="Play Trailer" />
                </div>
              </div>
            ) : (
              <Player.Provider>
                <MinimalVideoSkin>
                  <Video
                    src={video.trailer}
                    autoPlay
                    preload="metadata"
                    disableRemotePlayback
                  />
                </MinimalVideoSkin>
              </Player.Provider>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default VideoCard;