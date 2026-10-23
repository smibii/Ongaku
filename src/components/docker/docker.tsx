import { ReactNode } from "react";
import "./docker.style.scss";
import { useOngaku } from "../../providers/ongaku.context";
import { FaHeart, FaRegHeart, FaPlay } from "react-icons/fa";

export default function Docker(): ReactNode {
    const ongaku = useOngaku();

    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi9NMmpMQYDbPl2iXBFp3ODX019fdilWMJxhSyZ3yAkBnIl1c_hwFK7qo&s=10";

    return (
        <docker
            className={ ongaku.showDocker ? "active" : "" }
        >            
            <dockerbody>
                <content>
                    <info>
                        <img src={ image } />
                        <text>
                            <songtitle>
                                Song
                            </songtitle>
                            <artistname>
                                Artist
                            </artistname>
                        </text>
                    </info>

                    <actions>
                        <button>
                            <FaHeart />
                        </button>
                        <button>
                            <FaPlay />
                        </button>
                    </actions>
                </content>

                <progress
                    max={ 100 }
                    value={ 50 }
                />
            </dockerbody>

            <halo>
                <img src={ image } />
            </halo>
        </docker>
    );
}