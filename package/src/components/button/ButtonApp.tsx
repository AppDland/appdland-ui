import React, { useRef, useState } from 'react';
import { ButtonAppProps } from './ButtonApp.types';
import PopupYesNo from '../popup/PopupYesNo';
import "./styles.css";

export const ButtonApp: React.FC<ButtonAppProps> = ({ validateSubmit, style = "solid", buttonStyle, ...props }) => {

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

    return (
        <>
            <button
                className={
                    `general-button ${style === "border-line"
                        ? "general-button-border-line"
                        : undefined
                    }`
                }
                onClick={innerHandleClick}
                type={props.onClick ? "button" : "submit"}
                style={{
                    backgroundColor: buttonStyle?.borderColor || style !== "solid"
                        ? 'transparent'
                        : props.actionStyle === "cancel"
                            ? "red"
                            : buttonStyle?.backgroundColor
                                ? buttonStyle.backgroundColor
                                : 'lightgray',
                    color: props.actionStyle === "cancel"
                        ? style !== "solid"
                            ? "red"
                            : "white"
                        : buttonStyle?.textColor
                            ? buttonStyle.textColor
                            : 'black',
                    borderColor: props.actionStyle === "cancel"
                        ? "red"
                        : buttonStyle?.borderColor
                            ? buttonStyle.borderColor
                            : "black"
                }}
                ref={buttonRef}
            >
                {props.title}
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