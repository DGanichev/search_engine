import React from "react";
import Search from "../search/search";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './app.css';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Search/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
