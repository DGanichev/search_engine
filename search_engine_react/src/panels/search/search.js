import React, {useEffect, useState} from "react";
import {AutoComplete, InfoBox, List} from "../../components";
import {useSearchParams} from "react-router-dom";
import moment from "moment";
import {Pagination} from "@mui/material";

import "./search.css";

const TAKE = 10;
const SKIP = 0;
const DEFAULT_PAGE = 1;
const ITEMS_PER_PAGE = 10;

const Search = () => {
    const [result, setResult] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = +searchParams.get("page") || DEFAULT_PAGE;

    useEffect(() => {
        if (!!search && !!page) {
            (async () => {
                const skip = TAKE * (page - 1);
                const take = TAKE;
                const start = moment();
                const data = await getData(search, skip, take);
                const end = moment();
                const duration = moment.duration(end.diff(start));
                setResult({data: data, elapsedTime: duration.asSeconds()});
            })()
        }
    }, [search, page]);

    const getData = async (search, skip, take) => {
        try {
            const response = await fetch(`http://localhost:3000/?search=${search}&skip=${skip}&take=${take}`, {
                method: "GET",
            })
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    const handlePageChange = (_, page) => {
        setSearchParams({search: search, page: page});
    }

    const handleSubmit = (value) => {
        if (value) {
            setSearchParams({search: value, page: DEFAULT_PAGE});
        }
    };

    const loadSuggestions = async (search) => getData(search, SKIP, TAKE);

    const displayResultList = () => {
        const {data: {results, metadata}, elapsedTime} = result;
        const count = Math.ceil(metadata.total / ITEMS_PER_PAGE);
        return <>
            <InfoBox message={`About ${metadata.total} results (${elapsedTime} seconds)`}/>
            <List data={results}/>
            <Pagination count={count} size={"large"} page={page} onChange={handlePageChange}/>
        </>;
    }

    return <div className={"container"}>
        <AutoComplete onSubmit={handleSubmit} loadSuggestions={loadSuggestions} autoFocus/>
        {!!result && displayResultList()}
    </div>;
}

export default Search;