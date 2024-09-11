import React, { useEffect, useRef, useState } from "react";
import { OptionsInt, SelectAppProps } from "./SelectApp.types";
import arrowIcon from "./arrow.png";
import "./styles.css";

export const SelectApp: React.FC<SelectAppProps> = ({ style = { listAnimation: true, textAlign: "left" }, optionsStyle = {}, errorOnPlaceholder = false, errorBelowSelect = false, preventDefault = false, ...props }) => {

    const [openList, setOpenList] = useState(false);
    const [placeAction, setPlaceAction] = useState(false);
    const [innerVal, setInnerVal] = useState<string | OptionsInt>();

    const handleSelect = (option: string | OptionsInt) => {
        if (typeof option === "string") {
            props.onChange(option);
        } else {
            props.onChange(option.value);
        }
        if (preventDefault === false) {
            setInnerVal(option);
            setPlaceAction(true);
        }
        setOpenList(false);
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
    }, []);

    useEffect(() => {
        if (props.defaultValue) {
            props.onChange(props.defaultValue);
            const found = props.options.find((value) => typeof value === "string" ? value === props.defaultValue : value.value === props.defaultValue);
            if (found) {
                setInnerVal(found);
            }
        }
    }, []);

    useEffect(() => {
        if (innerVal) {
            if (typeof innerVal === "string") {
                props.onChange(innerVal);
            } else {
                props.onChange(innerVal.value);
            }
        }
    }, [innerVal]);

    useEffect(() => {
        if (
            typeof innerVal === "string" && innerVal.length > 0 && placeAction === false ||
            typeof innerVal === "object" && innerVal.value.length > 0 && placeAction === false
        ) {
            setPlaceAction(true);
        } else if (
            typeof innerVal === "string" && innerVal.length === 0 && placeAction === true ||
            typeof innerVal === "object" && innerVal.value.length === 0 && placeAction === true
        ) {
            setPlaceAction(false);
        }
    }, [innerVal, placeAction]);

    return (
        <div
            ref={listRef}
            className="appdland-ui-selectapp-container"
        >
            <div
                className={`appdland-ui-selectapp-main-box ${style.type && style.type === "box" ? "appdland-ui-selectapp-main-box-box" : "appdland-ui-selectapp-main-box-bottom-line"}`}
                onClick={handleClick}
                style={{
                    borderRadius: style.type === "bottom-line"
                        ? "0"
                        : style.borderRadius
                            ? style.borderRadius
                            : "5px",
                    borderColor: props.validator === true
                        ? "red"
                        : openList
                            ? style.color
                                ? style.color
                                : "black"
                            : style.blurColor
                                ? style.blurColor
                                : "lightgray",
                    backgroundColor: style.background
                        ? style.background === "solid"
                            ? style.backgroundColor
                                ? style.backgroundColor
                                : "white"
                            : "transparent"
                        : style.backgroundColor
                            ? style.backgroundColor
                            : "white"
                }}
            >
                {
                    props.placeHolder && (
                        <p
                            className="appdland-ui-selectapp-placeholder"
                            style={{
                                top: style.background && style.background === "transparent"
                                    ? "50%"
                                    : style.backgroundColor
                                        ? "50%"
                                        : placeAction === false
                                            ? "50%"
                                            : "-10%",
                                // marginLeft: placeAction === false ? "0" : "10px",
                                fontSize: placeAction === false ? "medium" : "small",
                                left: style.textAlign && style.textAlign === "center"
                                    ? "50%"
                                    : "0",
                                transform: style.textAlign && style.textAlign === "center"
                                    ? "translate(-50%, -50%)"
                                    : "translate(0, -50%)",
                                color: props.validator === false
                                    ? openList
                                        ? style.placeholderColor
                                            ? style.placeholderColor
                                            : "black"
                                        : style.blurPlaceholderColor
                                            ? style.blurPlaceholderColor
                                            : "lightgray"
                                    : openList === false
                                        ? "lightpink"
                                        : "red",
                                backgroundColor: style.background && style.background === "transparent"
                                    ? "transparent"
                                    : style.backgroundColor
                                        ? style.backgroundColor
                                        : "white",
                                opacity: style.background && style.background === "transparent" || style.backgroundColor
                                    ? placeAction === false
                                        ? "1"
                                        : "0"
                                    : '1'
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
                    typeof innerVal === "string" && innerVal.length > 0 || typeof innerVal === "object" && innerVal.value.length > 0 ? (
                        <p className="appdland-ui-selectapp-option-selected" style={{
                            color: style.color
                                ? style.color
                                : "black",
                            textAlign: style.textAlign
                                ? style.textAlign
                                : "left"
                        }}>{typeof innerVal === "string" ? innerVal : innerVal.label}</p>

                    ) : (
                        <p className="appdland-ui-selectapp-option-selected appdland-ui-selectapp-option-ghost">ghost</p>
                    )
                }

                <div className="appdland-ui-selectapp-arrow">
                    {
                        props.customArrow
                            ? props.customArrow
                            : <img
                                alt="appdland-ui-arrow"
                                src={arrowIcon as string}
                                style={{
                                    rotate: openList
                                        ? "180deg"
                                        : "0deg"
                                }}
                            />
                    }
                </div>
            </div>
            {
                errorBelowSelect && errorOnPlaceholder === false && props.validator && (
                    <p
                        className='appdland-ui-selectapp-error-message'
                        style={{
                            fontSize: style.fontSize === "large" ? "small" : "x-small",
                            ...props.errorMessageStyle
                        }}
                    >
                        {props.errorMessage}*
                    </p>
                )
            }
            {
                openList === true || style.listAnimation === true ? (
                    <div
                        className="appdland-ui-selectapp-options-box"
                        style={{
                            height: style.listAnimation
                                ? openList === true
                                    ? `${props.options.length * 45 + (style.showPlaceholderOnList === true ? 30 : 0)}px`
                                    : '0px'
                                : 'auto',
                            transitionDuration: style.listAnimation ? "0.3s" : undefined,
                            boxShadow: openList === true
                                ? "0px 5px 10px 1px rgba(0, 0, 0, 0.3)"
                                : 'none',
                            backgroundColor: optionsStyle.backgroundColor
                                ? optionsStyle.backgroundColor
                                : "white"
                        }}
                    >
                        {
                            style.showPlaceholderOnList === true && (
                                <small className="appdland-ui-selectapp-options-placeholder" style={{
                                    borderColor: optionsStyle.optionLineSeparatorColor
                                        ? optionsStyle.optionLineSeparatorColor
                                        : "lightgray",
                                    justifyContent: optionsStyle.textAlign
                                        ? optionsStyle.textAlign
                                        : "left"
                                }}>{props.placeHolder}</small>
                            )
                        }
                        {
                            props.options.map((opcion, index) => (
                                <p

                                    onClick={() => handleSelect(opcion)}
                                    key={index}
                                    style={{
                                        cursor: openList === true ? "pointer" : "default",
                                        //@ts-ignore
                                        '--appdland-ui-select-option-hover': optionsStyle.optionHoverColor
                                            ? optionsStyle.optionHoverColor
                                            : "lightgray",
                                        color: optionsStyle.color
                                            ? optionsStyle.color
                                            : "black",
                                        borderColor: optionsStyle.optionLineSeparatorColor
                                            ? optionsStyle.optionLineSeparatorColor
                                            : "lightgray",
                                        justifyContent: optionsStyle.textAlign
                                            ? optionsStyle.textAlign
                                            : "left"
                                    }}
                                >
                                    {typeof opcion === "string" ? opcion : opcion.label}
                                </p>
                            ))
                        }
                    </div>
                ) : null
            }

        </div>
    )
}