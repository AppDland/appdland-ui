import React, { useEffect, useRef } from 'react';
import { BasicInputProps } from './InputApp.types';
import { useInputContext } from './InputContext';
import "./styles.css";

interface BaseInputInt extends BasicInputProps {
    children: React.ReactNode;
    isMoney?: boolean;
}

export const BaseInput = ({ children, style = {}, errorOnPlaceholder = false, errorBelowInput = false, disabled = false, isMoney = false, ...props }: BaseInputInt) => {

    const { placeholderActive, setPlaceholderActive, focused, setFocused, inputRef, setClickInside, setInnerVal, innerVal } = useInputContext();
    const containerRef = useRef<HTMLInputElement>(null);

    //NO SERIA MEJOR MANEJARLO SIEMPRE CON EVENTO ON CLICK Y ON BLUR?
    useEffect(() => {
        if (props.value.length > 0 && placeholderActive === false) {
            setPlaceholderActive(true);
        } else if (props.value.length === 0 && placeholderActive === true && focused === false) {
            setPlaceholderActive(false);
        }
    }, [props.value, placeholderActive]);

    useEffect(() => {
        if (props.value !== innerVal) {
            setInnerVal(props.value);
        }
    }, [props.value])

    useEffect(() => {
        const clickEvent = (e: any) => {
            if (containerRef.current && containerRef.current.contains(e.target)) {
                setClickInside(true);
            } else {
                setClickInside(false);
            }
        }
        document.addEventListener('click', clickEvent);
        return () => {
            document.removeEventListener('click', clickEvent);
        }
    }, []);

    const handleClick = () => {
        if (disabled === false) {
            setPlaceholderActive(true);
            setFocused(true);
            inputRef.current?.focus();
        }
    }

    return (
        <div
            ref={containerRef}
            className={`appdland-ui-inputapp-container ${style.type === "box" ? "appdland-ui-inputapp-container-box" : "appdland-ui-inputapp-container-bottom-line"}`}
            onClick={handleClick}
            style={{
                borderRadius: style.type === "box"
                    ? style.borderRadius
                        ? style.borderRadius
                        : "5px"
                    : "0px",
                borderColor: props.validator === true
                    ? "red"
                    : focused
                        ? style.color
                            ? style.color : "black"
                        : style.blurColor
                            ? style.blurColor
                            : "lightgray",
                backgroundColor: style.background === "transparent" ? "transparent" : "white"
            }}
        >
            <p
                className={`appdland-ui-inputapp-placeholder`}
                style={{
                    top: style.background === "transparent"
                        ? "45%"
                        : placeholderActive ? "-16%" : "45%",
                    left: placeholderActive
                        ? style.textAlign
                            ? style.textAlign === "left"
                                ? "10px"
                                : undefined
                            : "10px"
                        : style.textAlign
                            ? style.textAlign === "left"
                                ? "0"
                                : undefined
                            : "0",
                    fontSize: placeholderActive ? "small" : "medium",
                    color: props.validator === true
                        ? focused ? "red" : "lightpink"
                        : focused
                            ? style.placeholderColor
                                ? style.placeholderColor
                                : "black"
                            : style.blurPlaceholderColor
                                ? style.blurPlaceholderColor
                                : "lightgray",
                    textAlign: style.textAlign
                        ? style.textAlign
                        : "left",
                    opacity: style.background === "transparent"
                        ? placeholderActive ? "0" : "1"
                        : undefined,
                    backgroundColor: style.background === "transparent" ? "transparent" : "white"
                }}
            >
                {
                    errorOnPlaceholder && errorBelowInput === false && props.validator
                        ? props.errorMessage + '*'
                        : props.placeholder
                }
            </p>
            {children}
            {
                errorBelowInput && errorOnPlaceholder === false && props.validator && (
                    <p
                        className='appdland-ui-inputapp-error-message'
                        style={{
                            fontSize: style.fontSize === "large" ? "small" : "x-small",
                            ...props.errorMessageStyle
                        }}
                    >
                        {props.errorMessage}*
                    </p>
                )
            }
        </div>
    )
}