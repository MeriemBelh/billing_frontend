// src/index.js or similar entry file
import React from 'react';
import ReactDOM from 'react-dom/client';
import App, {OrderTotal} from './App';
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";


const router = createBrowserRouter([

    {
        path: "/moonolith_JSF-0.0.1-SNAPSHOT/thankYou.xhtml",
        element: <OrderTotal/>,
    }

]);

const render = (containerId, queryParams) => {
    const container = document.getElementById(containerId);
    if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(
            <RouterProvider router={router} />
        );
    }
};

// Make sure render is available in the global scope
window.render = render;
