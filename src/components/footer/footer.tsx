import { ReactNode } from "react";
import DockerScroll from "../docker/docker.scroll";
import Navbar from "../navbar/navbar";
import "./footer.style.scss";

export default function Footer(): ReactNode {
    return (
        <footer>
            <DockerScroll />
            <Navbar />
        </footer>
    );
}