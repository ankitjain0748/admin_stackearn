import { useState, useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

const VideoModal = ({ videoLink, thumbnail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const getEmbedLink = (link) => {
    try {
      const url = new URL(link);
      const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;
    } catch {
      return "";
    }
  };

  const generateThumbnail = (link) => {
    try {
      const url = new URL(link);
      const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch {
      return "https://via.placeholder.com/300x200?text=Invalid+URL";
    }
  };

  const fetchVideoDuration = async (link) => {
    try {
      const url = new URL(link);
      const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      const data = await response.json();
      setDuration(data.title);
    } catch {
      setDuration('');
    }
  };

  useEffect(() => {
    if (videoLink) fetchVideoDuration(videoLink);
  }, [videoLink]);

  return (
    <div>
      <a className="popup-youtube position-relative" onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <img
          src={thumbnail ? thumbnail : generateThumbnail(videoLink)}
          alt="Video Thumbnail"
          className="img-fluid video-thumbnails"
        />
        <div className="position-absolute top-50 start-50 translate-middle">
          <FaPlay color="white" size={24} />
        </div>
        {/* {duration && (
          <div className="video-duration position-absolute bottom-0 end-0 bg-dark text-white p-1">
            {duration}
          </div>
        )} */}
      </a>

      {isOpen && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div onClick={handleClose} className="position-absolute dataclose">
              <MdClose size={24} />
            </div>
            <iframe
              className="responsive-iframe"
              src={getEmbedLink(videoLink) + "&autoplay=1&controls=1"}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media;"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <style>
        {`
    .dataclose {
      padding: 5px;
      color: black;
      cursor: pointer;
      background-color: white;
      top: 10px;
      right: 10px; /* ✅ Changed from -40px to 10px */
      border-radius: 50%;
      position: absolute;
      z-index: 1000;
    }

    @media (max-width: 640px) {
      .responsive-iframe {
        height: 250px; /* smaller height for phones */
      }
      .popup-content {
        max-width: 100%;
      }
      .dataclose {
        top: 5px;
        right: 5px; /* ✅ ensure visibility on small screens */
      }
    }

    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
      padding: 10px;
    }

    .popup-content {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      position: relative;
      animation: fadeIn 0.3s ease-out;
      width: 90%;
      max-width: 900px;
    }

    .responsive-iframe {
      width: 100%;
      height: 500px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `}
      </style>
    </div>
  );
};

export default VideoModal;

// Let me know if you want me to tweak anything else! 🚀