import { EndpointType } from "./endpoint.type.ts";
import Home from "../components/home/home.tsx";

const allowedEndpoints: EndpointType[] = [
    {
        element: <Home />,
        path: "*"
    }
]

export default allowedEndpoints;