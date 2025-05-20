import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";


const Videoplayer = ({ videos }) => {
  return (
    <ReactPlayer
      url={videos}
      controls
      width="100%"
      height="200px"
    />
  );
};

export default Videoplayer;

Videoplayer.propTypes = {
  videos: PropTypes.string.isRequired,
};
