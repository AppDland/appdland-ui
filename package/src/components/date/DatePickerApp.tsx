import React, { useEffect, useRef, useState } from 'react';
import { DatePickerAppProps } from './DatePickerApp,types';
import "./styles.css";

export const DatePickerApp: React.FC<DatePickerAppProps> = (props) => {

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
            className={`date-picker-app-container ${props.style === "box" ? "date-picker-app-box" : "date-picker-app-bottom-line"}`}
            onClick={handleClick}
            ref={inputRef}
            style={{
                borderColor: props.validator === true ? "red" : "lightgray"
            }}
        >
            <div
                className='date-picker-app-placeholder'
                style={{
                    top: placeholderActive ? "-12%" : "50%",
                    backgroundColor: placeholderActive ? 'transparent' : "white",
                    justifyContent: props.textAlign
                }}
            >
                <p
                    style={{
                        color: props.validator === true
                            ? isFocused ? "red" : "lightpink"
                            : isFocused ? "black" : 'lightgray',
                        fontSize: placeholderActive ? "small" : "medium",
                        padding: placeholderActive ? "0 10px" : "0",
                    }}
                >
                    {
                        props.validator === true ? props.errorMessage : props.placeholder
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
                    display: props.textAlign === "left" ? 'block' : "flex"
                }}
            />
        </div>

    )
}