import React from "react";
import PropTypes from "prop-types";

import "./list.css";

const List = ({data}) => {
    
    const items = data.map(item => <li className={"item"} key={item.id}>
            <p className={"title"}>
                <a target={"_blank"} href={`https://www.google.com/search?q=${item.title}`}>
                    {item.title}
                </a>
            </p>
            <span>{item.description}</span>
        </li>
    );

    return <ul className={"list"}>
        {items}
    </ul>;
}

List.propTypes = {
    data: PropTypes.array.isRequired,
}

List.defaultProps = {
    data: []
}

export default List;