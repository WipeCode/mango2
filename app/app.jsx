import React from "react";
import ReactDOM from "react-dom/client";
/** Подключение компонентов */
import AppRouter from "./router/AppRouter.jsx";

ReactDOM
.createRoot( document.getElementById('wrap') )
.render(
    <AppRouter/>
);
