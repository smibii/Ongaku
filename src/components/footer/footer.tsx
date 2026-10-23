import { ReactNode } from "react";
import DockerContainer from "../docker/docker.container";
import Navbar from "../navbar/navbar";
import "./footer.style.scss";

export default function Footer(): ReactNode {
    return (
        <footer>
            <DockerContainer />
            <Navbar />
        </footer>
    );
}