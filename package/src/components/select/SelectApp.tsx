import React, { useEffect, useRef, useState } from "react";
import { OptionsInt, SelectAppProps } from "./SelectApp.types";
import arrowIcon from "./arrow.png";
import CustomArrow from "./CustomArrow";
import "./styles.css";

export const SelectApp: React.FC<SelectAppProps> = ({ preventDefault = false, ...props }) => {

    const [innerVal, setInnerVal] = useState<string | OptionsInt>();
    const [openList, setOpenList] = useState(false);

    const listRef = useRef<HTMLDivElement>(null);

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

    const handleClick = () => {
        if (openList === true) {
            setOpenList(false)
        } else {
            setOpenList(true)
        }
    }

    const handleSelect = (option: string | OptionsInt) => {
        if (preventDefault === false) {
            setInnerVal(option);
        }
    }

    return (
        <div
            ref={listRef}
            className="appdland-ui-selectapp-container"
        >
            <MainBox
                innerVal={innerVal}
                handleClick={handleClick}
                isListOptionActive={openList}
                {...props}
            />

            <ListOptions
                isListOptionActive={openList}
                setListOptionActive={setOpenList}
                onSelect={handleSelect}
                {...props}
            />

        </div>
    )
}

interface MainBoxInt extends SelectAppProps {
    innerVal: string | OptionsInt | undefined;
    handleClick: (param?: any) => void;
    isListOptionActive: boolean;
}

const MainBox = ({ innerVal, handleClick, isListOptionActive, style = {}, errorOnPlaceholder = false, errorBelowSelect = false, disabled = false, ...props }: MainBoxInt) => {

    const [placeAction, setPlaceAction] = useState(false);

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

    useEffect(() => {
        if (innerVal) {
            if (typeof innerVal === "string") {
                props.onChange(innerVal);
            } else {
                props.onChange(innerVal.value);
            }
        }
    }, [innerVal]);

    return (
        <>
            <div
                className={`appdland-ui-selectapp-main-box ${style.type && style.type === "box" ? "appdland-ui-selectapp-main-box-box" : style.type === "bottom-line" ? "appdland-ui-selectapp-main-box-bottom-line" : ""}`}
                onClick={() => disabled === false ? handleClick() : null}
                style={{
                    borderRadius: style.type === "bottom-line" || style.type === "outline"
                        ? "0"
                        : style.borderRadius
                            ? style.borderRadius
                            : "5px",
                    borderColor: props.validator === true
                        ? "red"
                        : isListOptionActive
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
                            : "white",
                    opacity: disabled === true
                        ? '0.5'
                        : '1',
                    cursor: disabled === true
                        ? 'default'
                        : 'pointer'
                }}
            >
                {
                    props.placeholder && (
                        <p
                            className="appdland-ui-selectapp-placeholder"
                            style={{
                                top: style.showPlaceHolderOnFocus === false
                                    ? "50%"
                                    : style.background && style.background === "transparent"
                                        ? "50%"
                                        : style.backgroundColor
                                            ? "50%"
                                            : placeAction === false
                                                ? "50%"
                                                : "-10%",
                                fontSize: placeAction === false ? "medium" : "small",
                                left: style.textAlign === "center"
                                    ? "50%"
                                    : undefined,
                                right: style.textAlign === "right"
                                    ? "30px"
                                    : undefined,
                                transform: style.textAlign && style.textAlign === "center"
                                    ? "translate(-50%, -50%)"
                                    : "translate(0, -50%)",
                                color: props.validator === false
                                    ? isListOptionActive
                                        ? style.placeholderColor
                                            ? style.placeholderColor
                                            : "black"
                                        : style.blurPlaceholderColor
                                            ? style.blurPlaceholderColor
                                            : "lightgray"
                                    : isListOptionActive === false
                                        ? "lightpink"
                                        : "red",
                                backgroundColor: style.background && style.background === "transparent"
                                    ? "transparent"
                                    : style.backgroundColor
                                        ? style.backgroundColor
                                        : "white",
                                display: style.background === "transparent" || style.backgroundColor || style.showPlaceHolderOnFocus === false
                                    ? placeAction === false
                                        ? "block"
                                        : "none"
                                    : 'block'
                            }}
                        >
                            {
                                errorOnPlaceholder && props.validator === true
                                    ? props.errorMessage
                                    : props.placeholder
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
                                : "left",
                            paddingRight: style.textAlign === "right"
                                ? "40px"
                                : undefined
                        }}>{typeof innerVal === "string" ? innerVal : innerVal.label}</p>

                    ) : (
                        <p className="appdland-ui-selectapp-option-selected appdland-ui-selectapp-option-ghost">ghost</p>
                    )
                }

                <div className="appdland-ui-selectapp-arrow">
                    {
                        style.customArrow
                            ? style.customArrow
                            : style.arrowType === "curved"
                                ? <img
                                    alt="appdland-ui-arrow"
                                    src={arrowIcon as string}
                                    style={{
                                        rotate: isListOptionActive
                                            ? "180deg"
                                            : "0deg"
                                    }}
                                />
                                : <CustomArrow rotate={isListOptionActive} color={style.arrowColor} />
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
        </>
    )
}

interface ListOptionsInt extends SelectAppProps {
    isListOptionActive: boolean;
    setListOptionActive: (param: boolean) => void;
    onSelect?: (param: string | OptionsInt) => void;
}

const ListOptions = ({ isListOptionActive, setListOptionActive, onSelect, optionsStyle = {}, preventDefault = false, ...props }: ListOptionsInt) => {

    const handleSelect = (option: string | OptionsInt) => {
        if (typeof option === "string") {
            props.onChange(option);
        } else {
            props.onChange(option.value);
        }
        setListOptionActive(false);
        if (onSelect) {
            onSelect(option);
        }
    }

    return (
        <div
            className="appdland-ui-selectapp-options-box"
            style={{
                //@ts-ignore
                '--appdland-ui-scrollbar-thumb-color': optionsStyle.scrollThumbColor
                    ? optionsStyle.scrollThumbColor
                    : 'rgb(233, 233, 233)',
                height: isListOptionActive === true
                    ? `${props.options.length * 46 + (optionsStyle.showPlaceholderOnList === true ? 41 : 0)}px`
                    : '0px',
                transitionDuration: optionsStyle.listAnimation ? "0.3s" : undefined,
                boxShadow: isListOptionActive === true
                    ? "0px 5px 10px 1px rgba(0, 0, 0, 0.3)"
                    : 'none',
                backgroundColor: optionsStyle.backgroundColor
                    ? optionsStyle.backgroundColor
                    : "white",
                maxHeight: optionsStyle.maxItems
                    ? `${optionsStyle.maxItems * 46 + (optionsStyle.showPlaceholderOnList === true ? 41 : 0)}px`
                    : "229px"
            }}
        >
            {
                optionsStyle.showPlaceholderOnList === true && (
                    <p onClick={() => handleSelect("")} className="appdland-ui-selectapp-options-placeholder" style={{
                        borderColor: optionsStyle.optionLineSeparatorColor
                            ? optionsStyle.optionLineSeparatorColor
                            : "rgb(233, 233, 233)",
                        justifyContent: optionsStyle.textAlign
                            ? optionsStyle.textAlign
                            : "left"
                    }}>{props.placeholder}</p>
                )
            }
            {
                props.options.map((opcion, index) => (
                    <div
                        className="appdland-ui-selectapp-option"
                        onClick={() => handleSelect(opcion)}
                        key={index}
                        style={{
                            cursor: isListOptionActive === true ? "pointer" : "default",
                            //@ts-ignore
                            '--appdland-ui-select-option-hover': optionsStyle.optionHoverColor
                                ? optionsStyle.optionHoverColor
                                : "rgb(245, 245, 245)",
                            color: optionsStyle.color
                                ? optionsStyle.color
                                : "black",
                            borderColor: optionsStyle.optionLineSeparatorColor
                                ? optionsStyle.optionLineSeparatorColor
                                : "rgb(245, 245, 245)",
                            justifyContent: optionsStyle.textAlign && optionsStyle.textAlign === "center"
                                ? "space-evenly"
                                : "space-between"
                        }}
                    >
                        {
                            typeof opcion === 'object' && opcion.extra && (
                                opcion.extra
                            )
                        }
                        <p>{typeof opcion === "string" ? opcion : opcion.label}</p>
                    </div>
                ))
            }
        </div>
    )
}