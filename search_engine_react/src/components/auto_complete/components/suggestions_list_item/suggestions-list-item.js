import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";

import "./suggestions-list-item.css";

const SuggestionsListItem = ({title, memorized, onClick, onRemove}) => {

    const handleOnTitleMouseDown = (e) => {
        e.preventDefault();
        onClick();
    }

    const handleOnRemoveMouseDown = (e) => {
        e.preventDefault();
        onRemove();
    }

    if (memorized) {
        return <li className={"suggestions-list-item"}>
            <FontAwesomeIcon icon={faClock}/>
            <span className={"title memorized"} onMouseDown={handleOnTitleMouseDown}>{title}</span>
            <span className={"remove-btn"} onMouseDown={handleOnRemoveMouseDown}>Delete</span>
        </li>
    }
    return <li className={"suggestions-list-item"}>
        <span className={"title"} onMouseDown={handleOnTitleMouseDown}>{title}</span>
    </li>;
}

SuggestionsListItem.propTypes = {
    title: PropTypes.string.isRequired,
    memorized: PropTypes.bool,
    onClick: PropTypes.func,
    onRemove: PropTypes.func
}

SuggestionsListItem.defaultProps = {
    memorized: false,
}

export default SuggestionsListItem;