import React, { useEffect, useRef, useState } from 'react';
import { DatePickerAppProps } from './DatePickerApp.types';
import "./styles.css";

export const DatePickerApp: React.FC<DatePickerAppProps> = ({ style = {}, errorBelowDate = false, errorOnPlaceholder = false, ...props }) => {

    const [placeholderActive, setPlaceholderActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const datePickerRef = useRef<HTMLInputElement>(null);
    const [today, setToday] = useState("");

    const handleClick = () => {
        setIsFocused(true);
        setPlaceholderActive(true);
        datePickerRef.current?.showPicker();
    }

    useEffect(() => {
        if (isFocused === false && props.value.length === 0) {
            setPlaceholderActive(false);
        }
    }, [isFocused, props.value]);

    useEffect(() => {

        const handlePlaceholder = (e: any) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setIsFocused(false);
            }
        }

        document.addEventListener("click", handlePlaceholder);

        return () => {
            document.removeEventListener("click", handlePlaceholder);
        }
    }, []);

    useEffect(() => {
        if (props.maxToday === true) {
            let date = new Date();
            const monthSeparator = String(date.getMonth()).length === 1 ? "-0" : "-";
            const daySeparator = String(date.getDate()).length === 1 ? "-0" : "-";
            let fullDate = date.getFullYear() + monthSeparator + (date.getMonth() + 1) + daySeparator + date.getDate();
            setToday(fullDate);
        }
    }, []);

    return (
        <div
            className={`date-picker-app-container ${style.type === "bottom-line" ? "date-picker-app-bottom-line" : "date-picker-app-box"}`}
            onClick={handleClick}
            ref={inputRef}
            style={{
                borderColor: props.validator === true
                    ? "red"
                    : isFocused
                        ? style.color
                            ? style.color
                            : "black"
                        : style.blurColor
                            ? style.blurColor
                            : "lightgray",
                backgroundColor: style.backgroundColor
                    ? style.backgroundColor
                    : "white",
                borderRadius: style.type === "bottom-line"
                    ? "0"
                    : style.borderRadius
                        ? style.borderRadius
                        : "5px"

            }}
        >
            <div
                className='date-picker-app-placeholder'
                style={{
                    top: style.backgroundColor
                        ? "50%"
                        : placeholderActive
                            ? "-12%"
                            : "50%",
                    backgroundColor: style.backgroundColor
                        ? style.backgroundColor
                        : placeholderActive
                            ? 'transparent'
                            : "white",
                    justifyContent: style.textAlign
                        ? style.textAlign
                        : "left",
                    opacity: style.backgroundColor
                        ? placeholderActive
                            ? "0"
                            : "1"
                        : "1"
                }}
            >
                <p
                    style={{
                        color: props.validator === true
                            ? isFocused
                                ? "red"
                                : "lightpink"
                            : isFocused
                                ? style.placeholderColor
                                    ? style.placeholderColor
                                    : "black"
                                : style.blurPlaceholderColor
                                    ? style.blurPlaceholderColor
                                    : 'lightgray',
                        fontSize: placeholderActive ? "small" : "medium",
                        padding: placeholderActive ? "0 10px" : "0",
                        backgroundColor: style.backgroundColor
                            ? "transparent"
                            : "white",
                    }}
                >
                    {
                    errorOnPlaceholder && errorBelowDate === false && props.validator
                        ? props.errorMessage + '*'
                        : props.placeholder
                }
                </p>
            </div>
            <input
                onClick={(e) => e.stopPropagation()}
                onFocus={() => setIsFocused(true)}
                ref={datePickerRef}
                type="date"
                value={props.value}
                onChange={({ target }) => props.onChange(target.value)}
                className='date-picker-app-input'
                max={props.maxToday ? today : undefined}
                style={{
                    display: style.textAlign === "center" ? 'flex' : "block",
                    backgroundColor: style.backgroundColor
                        ? style.backgroundColor
                        : "white",
                    color: style.color
                        ? style.color
                        : "black",
                    opacity: style.backgroundColor
                        ? placeholderActive
                            ? "1"
                            : "0"
                        : "1",
                    fontSize: style.fontSize
                        ? style.fontSize
                        : "medium"
                }}
            />
            {
                errorBelowDate && errorOnPlaceholder === false && props.validator && (
                    <p
                        className='appdland-ui-datepickerapp-error-message'
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