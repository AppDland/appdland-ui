import React, { useEffect, useRef, useState } from "react";
import { SelectAppProps } from "./SelectApp.types";
import "./styles.css";

export const SelectApp: React.FC<SelectAppProps> = ({ listAnimation = true, errorOnPlaceholder = false, ...props }) => {

    const [openList, setOpenList] = useState(false);
    const [placeAction, setPlaceAction] = useState(false);

    const handleSelect = (option: string) => {
        props.onChange(option);
        setOpenList(false);
        setPlaceAction(true)
    }

    const handleClick = () => {
        if (openList === true) {
            setOpenList(false)
        } else {
            setOpenList(true)
        }

    }

    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const listClick = (e: any) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setOpenList(false)
            }
        }
        document.addEventListener("click", listClick)

        return () => {
            document.removeEventListener("click", listClick)
        }
    }, [])


    useEffect(() => {
        if (props.value.length > 0 && placeAction === false) {
            setPlaceAction(true);
        } else if (props.value.length === 0 && placeAction === true) {
            setPlaceAction(false);
        }
    }, [props.value, placeAction]);

    return (
        <div
            ref={listRef}
            className="selector-box-general"
        >
            <div
                className="selector-first-box"
                onClick={handleClick}
                style={{

                    borderColor: props.validator === true
                        ? "red"
                        : openList ? "black" : "rgba(0,0,0,0.2)"
                }}
            >
                {
                    props.placeHolder && (
                        <p
                            className="selector-placeholder"
                            style={{
                                top: placeAction === false ? "50%" : "-10%",
                                marginLeft: placeAction === false ? "0" : "10px",
                                fontSize: placeAction === false ? "medium" : "small",
                                color: props.validator === true
                                    ? openList === false ? "lightpink" : "red"
                                    : openList ? "black" : "lightgray"
                            }}
                        >
                            {
                                errorOnPlaceholder && props.validator === true
                                    ? props.errorMessage
                                    : props.placeHolder
                            }
                        </p>
                    )
                }

                {
                    props.value.length > 0 ? (
                        <p className="selector-option">{props.value}</p>

                    ) : (
                        <p className="selector-option selector-option-ghost">ghost</p>
                    )
                }

                <div className="selector-arrow">
                    <p>
                        arrow
                    </p>
                </div>
            </div>
            {
                openList === true || listAnimation === true ? (
                    <div
                        className="selector-options-box"
                        style={{
                            height: listAnimation
                                ? openList === true
                                    ? `${props.options.length * 45}px`
                                    : '0px'
                                : 'auto',
                            transitionDuration: listAnimation ? "0.3s" : undefined,
                            boxShadow: openList === true
                                ? "0px 5px 10px 1px rgba(0, 0, 0, 0.3)"
                                : 'none'
                        }}
                    >
                        {
                            props.options.map((opcion, index) => (
                                <p

                                    onClick={() => handleSelect(opcion)}
                                    key={index}
                                    style={{
                                        cursor: openList === true ? "pointer" : "default"
                                    }}
                                >
                                    {opcion}
                                </p>
                            ))
                        }
                    </div>
                ) : null
            }

        </div>
    )
}