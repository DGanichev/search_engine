import React from "react";
import PropTypes from "prop-types";

import "./pagination.css";

const Pagination = ({currentPage, total, itemsPerPage, onPageClick}) => {
    const handlePageSelection = (page) => {
        onPageClick(page + 1);
    }

    const pagesCount = Math.ceil(total / itemsPerPage);

    const pages = Array.from(Array(pagesCount).keys()).map((page, index) => {
        const active = page === currentPage - 1;
        return <span
            key={`${index}-${page}`}
            className={`page ${active && 'active'}`}
            onClick={() => handlePageSelection(page)}
        >
            {page + 1}
        </span>
    });

    return <div className={"pagination"}>
        {pages}
    </div>;
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageClick: PropTypes.func.isRequired
}

export default Pagination;