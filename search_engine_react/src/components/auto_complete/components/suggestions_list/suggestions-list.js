import React from "react";
import PropTypes from "prop-types";
import SuggestionsListItem from "../suggestions_list_item/suggestions-list-item";

import "./suggestions-list.css";

const TAKE_ITEMS = 10;

const SuggestionsList = ({options, history, onItemClick, onItemRemoveFromHistory}) => {

    const loadedItems = options.map(option => {
        const {id, title} = option;
        if (history.has(title)) {
            return <SuggestionsListItem
                key={id}
                title={title}
                memorized
                onClick={() => onItemClick(title)}
                onRemove={() => onItemRemoveFromHistory(title)}
            />
        }
        return <SuggestionsListItem key={id} title={title} onClick={() => onItemClick(title)}/>
    });

    const historyItems = Array.from(history).slice(-TAKE_ITEMS).map((search, index) => (
        <SuggestionsListItem
            key={`${index}-${search}`}
            title={search}
            memorized
            onClick={() => onItemClick(search)}
            onRemove={() => onItemRemoveFromHistory(search)}
        />
    ));

    const displayOptions = () => {
        if (options.length > 0) {
            return loadedItems;
        } else if (history.size > 0) {
            return historyItems;
        } else {
            return <li className={"no-results-placeholder"}>No results</li>;
        }
    }

    return <ul className={"suggestions-list"}>
        {displayOptions()}
    </ul>;
}

SuggestionsList.propTypes = {
    options: PropTypes.array.isRequired,
    history: PropTypes.instanceOf(Set).isRequired,
    onItemClick: PropTypes.func.isRequired,
    onItemRemoveFromHistory: PropTypes.func.isRequired,
}

SuggestionsList.defaultProps = {
    options: [],
}

export default SuggestionsList;