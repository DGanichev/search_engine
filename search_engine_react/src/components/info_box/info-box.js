import React from "react";
import PropTypes from "prop-types";

const InfoBox = ({message, className}) => {
    return <div className={`info-box ${className}`}>{message}</div>
}

InfoBox.propTypes = {
    message: PropTypes.string.isRequired,
    className: PropTypes.string
}

InfoBox.defaultProps = {
    className: ""
}

export default InfoBox;