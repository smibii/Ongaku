type component<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

declare namespace React {
    namespace JSX {
        interface IntrinsicElements {
            content: component<HTMLElement>;
            info: component<HTMLElement>;
            actions: component<HTMLElement>;
            halo: component<HTMLAttributes>;
            marquee: component<HTMLAttributes> & {
                scrollamount?: string;
                scrolldelay?: string;
                direction?: "up" | "down" | "left" | "right";
                behavior?: "scrolling" | "sliding" | "alternate";
                loop?: string;
                bgcolor?: string;
                vspace?: string;
                hspace?: string;
            };

            "song-title": component<HTMLElement>;
            "artist-name": component<HTMLElement>;

            home: component<HTMLElement>;

            navbar: component<HTMLElement>;

            "docker-container": component<HTMLElement>;
            docker: component<HTMLElement>;
            "docker-body": component<HTMLElement>;

            "progress-bar": component<HTMLElement>;
            "progress-track": component<HTMLElement>;
        }
    }
}