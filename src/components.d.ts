type component<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

declare namespace React {
    namespace JSX {
        interface IntrinsicElements {
            content: component<HTMLElement>;
            info: component<HTMLElement>;
            actions: component<HTMLElement>;
            halo: component<HTMLAttributes>;

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