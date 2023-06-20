import React, {useCallback, useRef, useState} from "react";
import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import SuggestionsList from "./components/suggestions_list/suggestions-list";

import "./auto-complete.css";

const KEY_CODES = Object.freeze({
    ENTER: 13
});

const DEBOUNCE_TIMEOUT = 500;

const AutoComplete = ({autoFocus, onSubmit, loadSuggestions}) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [history, setHistory] = useState(new Set([]));

    const inputRef = useRef(null);

    const handleOnInputFocus = () => {
        setExpanded(true)
        inputRef.current?.focus();
    };

    const handleOnInputBlur = () => {
        setExpanded(false)
        inputRef.current?.blur();
    };

    const pushItemToHistory = (value) => {
        if (value) {
            history.add(value);
            setHistory(history);
        }
    }

    const search = async (value) => {
        if (!value) {
            setOptions([]);
        } else {
            try {
                setLoading(true);
                const result = await loadSuggestions(value);
                setOptions(result.results);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const value = e.target.value.trim();
        const debouncedSearch = _.debounce(search, DEBOUNCE_TIMEOUT);
        debouncedSearch(value);
    };

    const handleKeyDown = (e) => {
        const {keyCode} = e;
        const value = e.target.value;
        if (keyCode === KEY_CODES.ENTER) {
            handleOnInputBlur();
            pushItemToHistory(value);
            onSubmit(value);
        }
    }

    const handleOnItemClick = useCallback((value) => {
        inputRef.current.value = value;
        handleOnInputBlur();
        pushItemToHistory(value);
        onSubmit(value);
    }, []);

    const handleOnItemRemoveFromHistory = useCallback((value) => {
        const success = history.delete(value);
        if (success) {
            const newSet = new Set(Array.from(history));
            setHistory(newSet);
        }
    }, []);

    return <div className={"autocomplete-container"}>
        <div className={`search-field ${expanded && 'expanded-search-field'}`}>
            <FontAwesomeIcon icon={faSearch}/>
            <input
                ref={inputRef}
                className="input-field"
                placeholder="Search..."
                autoFocus={autoFocus}
                onChange={handleInputChange}
                onFocus={handleOnInputFocus}
                onBlur={handleOnInputBlur}
                onKeyDown={handleKeyDown}
            />
            {loading && (
                <span className={"loader"}/>
            )}
        </div>
        {expanded && <SuggestionsList
            history={history}
            options={options}
            onItemClick={handleOnItemClick}
            onItemRemoveFromHistory={handleOnItemRemoveFromHistory}
        />}
    </div>
}

AutoComplete.propTypes = {
    autoComplete: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    loadSuggestions: PropTypes.func.isRequired
}

AutoComplete.defaultProps = {
    autoComplete: false,
}

export default AutoComplete;