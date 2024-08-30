import React, { useEffect, useRef, useState } from 'react';
import { InputAppProps } from './InputApp.types';
import { formatMoney, formatRevertComas, formatUpperEach } from '../../functions/formats';
import "./styles.css";

export const InputApp: React.FC<InputAppProps> = (
    {
        disabled = false,
        style = "box",
        showDecimal = true,
        ...props
    }
) => {

    const [placeholderActive, setPlaceholderActive] = useState(false);
    const [focused, setFocused] = useState(false);
    const [innerVal, setInnerVal] = useState<string>();
    const [decimal, setDecimal] = useState("");
    const [inputWidth, setInputWidth] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const inputDecimalRef = useRef<HTMLInputElement>(null);

    const handleClick = (e: any) => {
        if (disabled === false) {
            setPlaceholderActive(true);
            setFocused(true);
            if (e.target.contains(inputDecimalRef.current)) {
                inputDecimalRef.current?.focus();
            } else {
                inputRef.current?.focus();
            }
        }
    }

    const handleBlur = () => {
        if (props.value === "") {
            setPlaceholderActive(false);
        }
        setFocused(false);
    }

    const handleFocus = () => {
        setPlaceholderActive(true);
        setFocused(true);
        if (props.onFocus) {
            props.onFocus();
        }
    }

    const innerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (props.type === "text" && props.capitalize) {
            value = formatUpperEach(value);
        } else if (props.type === "money") {

            value = String(formatRevertComas(value));
            console.log(value);
            if (isNaN(Number(value))) {
                return;
            } else {
                const converted = formatMoney(Number(value));
                setInnerVal(converted === "0" ? "" : converted)
            }
        } else if (props.type === "number") {
            if (isNaN(Number(value))) {
                return;
            } else if (props.percentage === true) {
                setInnerVal(value);
            }
        }
        console.log("will save")
        props.onChange(value === "0" ? "" : value);
    }

    useEffect(() => {
        if (props.value.length > 0 && placeholderActive === false) {
            setPlaceholderActive(true);
        } else if (props.value.length === 0 && placeholderActive === true && focused === false) {
            console.log("yes")
            setPlaceholderActive(false);
        }
    }, [props.value, placeholderActive]);

    useEffect(() => {
        if (props.type === "money" && props.value.length > 0) {
            const [integer, decimal] = props.value.split(".");
            setInnerVal(formatMoney(Number(integer)));
            if (Number(decimal) > 0) {
                setDecimal(decimal);
            }
        }
    }, [props.value, props.type]);

    const handleDecimalInput = (e: any) => {
        console.log(e.target.value);
    }

    const handleKeyUp = (e: any) => {
        if (e.key === "." || e.key === ",") {
            inputDecimalRef.current?.focus();
        }
    }

    const handleDecimalKeyDown = (e: any) => {
        const position = e.target.selectionStart;
        console.log(position);
        if (position === 0 && e.key === "Backspace") {
            inputRef.current?.focus();
        }
    }

    const handleDecimalChange = (e: any) => {
        let value = String(e.target.value);
        if (value.length <= 2) {
            setDecimal(value);
            props.onChange(props.value.split(".")[0] + "." + value);
        }
    }

    useEffect(() => {
        if (innerVal) {
            const lenght = String(formatRevertComas(innerVal)).length;
            if (lenght < 4) {
                setInputWidth((lenght - 0.1) * 10);
            } else if (lenght < 7) {
                setInputWidth(lenght * 10);
            } else {
                setInputWidth((lenght + 0.4) * 10);
            }
        }
    }, [innerVal]);

    return (
        <div
            className={`inputgb-container ${style === "box" ? "inputgb-container-box" : "inputgb-container-bottom-line"}`}
            onClick={handleClick}
            style={{
                borderColor: props.validator === true
                    ? "red"
                    : focused ? "black" : 'lightgray'
            }}
        >
            <p
                className={`inputgb-placeholder`}
                style={{
                    top: placeholderActive ? "-45%" : "5%",
                    left: placeholderActive ? "10px" : "0",
                    fontSize: placeholderActive ? "small" : "medium",
                    width: placeholderActive ? "auto" : "100%",
                    color: focused ? "black" : "gray"
                }}
            >
                {props.placeholder}
            </p>
            {
                props.type === "money" &&
                <p className="inputgb-money">$</p>
            }
            <input
                ref={inputRef}
                type={props.type === "money" || props.type === "number" ? "text" : props.type}
                inputMode={props.type === "money" || props.type === "number" ? "numeric" : "none"}
                autoComplete="off"
                value={innerVal ? innerVal : props.value}
                onChange={innerChange}
                autoCorrect="off"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={handleKeyUp}
                disabled={disabled}
                maxLength={props.type === "money"
                    ? 19
                    : props.maxLength ? props.maxLength : undefined
                }
                className="inputgb-input"
                style={{
                    padding: props.type === "money" ? "10px 0" : "10px",
                    width: innerVal && showDecimal
                        ? props.percentage
                            ? `${innerVal.length * 10 + 20}px`
                            : `${inputWidth}px`
                        : "100%"
                }}
            />
            {
                props.type === "money" && innerVal && showDecimal ? (
                    <input
                        ref={inputDecimalRef}
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        autoCorrect="off"
                        maxLength={2}
                        value={decimal}
                        onChange={handleDecimalChange}
                        onKeyDown={handleDecimalKeyDown}
                        onInput={handleDecimalInput}
                        placeholder="00"
                        className="inputgb-decimal"
                    />
                ) : props.percentage === true && innerVal ? (
                    <p className="inputgb-percentage">%</p>
                ) : null
            }
        </div>
    )
}