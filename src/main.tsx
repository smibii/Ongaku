import ReactDOM, { Root } from "react-dom/client";
import {BrowserRouter as Router } from "react-router-dom";
import { OngakuProvider } from "./providers/ongaku.context.tsx";
import EndpointNode from "./endpoint/endpoint.tsx";
import Docker from "./components/docker/docker.tsx";
import "./main.style.scss";

const container: HTMLElement = document.body;
const root: Root = ReactDOM.createRoot(container);

root.render(
    <Router>
        <OngakuProvider>
            <Docker />
            <EndpointNode />
        </OngakuProvider>
    </Router>
);