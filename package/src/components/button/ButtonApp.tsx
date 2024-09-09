import React, { useRef, useState } from 'react';
import { ButtonAppProps } from './ButtonApp.types';
import PopupYesNo from '../popup/PopupYesNo';
import "./styles.css";

export const ButtonApp: React.FC<ButtonAppProps> = ({ validateSubmit, style = {}, ...props }) => {

    const [popupState, setPopupState] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const innerHandleClick = (e: any) => {
        if (validateSubmit) {
            if (popupState === false && validateSubmit) {
                e.preventDefault();
            }
            setPopupState(true);
        } else if (props.onClick) {
            props.onClick();
        }
    }

    const opacity = () => {
        if (props.disabled === true) {
            return {
                opacity: "0.4",
                cursor: "default"
            }
        }
    }

    return (
        <>
            <button
                className={
                    `appdland-ui-buttonapp-main ${props.icon
                        ? "appdland-ui-buttonapp-icon"
                        : style.type === "border-line"
                            ? "appdland-ui-buttonapp-normal appdland-ui-buttonapp-border-line"
                            : "appdland-ui-buttonapp-normal"
                    }`
                }
                onClick={innerHandleClick}
                type={props.onClick ? "button" : "submit"}
                style={{
                    backgroundColor: style.type === "border-line" || style.type === "light"
                        ? 'transparent'
                        : props.actionStyle === "cancel" && !props.icon
                            ? "red"
                            : style.backgroundColor
                                ? style.backgroundColor
                                : props.icon
                                    ? 'transparent'
                                    : 'lightgray',
                    color: props.actionStyle === "cancel"
                        ? style.type !== "solid"
                            ? "red"
                            : "white"
                        : style.textColor
                            ? style.textColor
                            : 'black',
                    borderColor: props.actionStyle === "cancel"
                        ? "red"
                        : style.borderColor
                            ? style.borderColor
                            : "black",
                    ...opacity()
                }}
                ref={buttonRef}
                disabled={props.disabled}
            >
                {
                    props.icon ? (
                        typeof props.icon !== "string" ? (
                            typeof props.icon === "object" && "icon" in props.icon ? (
                                typeof props.icon.icon === "string" ? (
                                    <ImgComponent
                                        path={props.icon.icon}
                                        actionStyle={props.actionStyle}
                                        size={props.icon.size}
                                        invertColor={props.icon.invertColor}
                                    />
                                ) : (
                                    props.icon.icon
                                )
                            ) : typeof props.icon !== "object" ? (
                                props.icon
                            ) : null
                        ) : (
                            <ImgComponent path={props.icon} />
                        )


                    ) : (
                        props.title ? props.title : props.children
                    )
                }
            </button>
            {
                popupState && <PopupYesNo
                    onYes={() => {
                        if (props.onClick) {
                            props.onClick();
                        } else {
                            buttonRef.current?.click();
                        }
                    }}
                    title={typeof validateSubmit !== "boolean" ? validateSubmit?.title : undefined}
                    text={typeof validateSubmit !== "boolean" ? validateSubmit?.text : undefined}
                    state={popupState}
                    setState={setPopupState}
                />
            }

        </>

    )
}

interface ImgComponentInt {
    path: string;
    size?: number;
    actionStyle?: "default" | "cancel";
    invertColor?: boolean;
}

const ImgComponent = ({ path, size, actionStyle, invertColor }: ImgComponentInt) => (
    <img
        src={path}
        alt='button-icon'
        style={{
            width: size ? `${size}px` : "25px",
            height: size ? `${size}px` : "25px"
        }}
        className={
            actionStyle === "cancel"
                ? "appdland-ui-buttonapp-icon-red"
                : invertColor === true ? "appdland-ui-buttonapp-icon-invert" : ""}
    />
)