import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// viene selezionato il div con id="root" nell'index.html come elemento
// radice per l'albero gerarchico di react
const root = ReactDOM.createRoot(document.getElementById("root"));
// su questo elemento radice viene injectato il primo componente React, app
root.render(<App />);
