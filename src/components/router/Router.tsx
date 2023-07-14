import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "../homepage/Homepage";
import Play from "../play/Play";
import React from "react";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/play" element={<Play />} />
        </Routes>
    </BrowserRouter>
);

export default Router;