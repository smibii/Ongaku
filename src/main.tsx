import ReactDOM, { Root } from "react-dom/client";
import {BrowserRouter as Router } from "react-router-dom";
import { OngakuProvider } from "./providers/ongaku.context.tsx";
import EndpointNode from "./endpoint/endpoint.tsx";
import Footer from "./components/footer/footer.tsx";
import "./main.style.scss";

const container: HTMLElement = document.body;
const root: Root = ReactDOM.createRoot(container);

root.render(
    <Router>
        <OngakuProvider>
            <Footer />
            <EndpointNode />
        </OngakuProvider>
    </Router>
);