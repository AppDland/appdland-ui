import React, { useEffect, useRef, useState } from 'react';
import { InputMoneyProps } from './InputApp.types';
import { InputProvider, useInputContext } from './InputContext';
import { formatMoney, formatRevertComas } from '../../functions/formats';
import { BaseInput } from './BaseInput';

export const InputMoneyApp: React.FC<InputMoneyProps> = ({ showDecimal = true, style = {}, ...props }: InputMoneyProps) => {

    const [decimal, setDecimal] = useState("");
    const [inputWidth, setInputWidth] = useState(0);
    const inputDecimalRef = useRef<HTMLInputElement>(null);
    const [innerShowDecimal, setInnerShowDecimal] = useState(false);
    const [isNegative, setIsNegative] = useState(false);
    const { innerVal, setInnerVal, inputRef, basicFocus, basicBlur, setFocused } = useInputContext();


    const setMoney = (value: string) => {
        const isNumber = Number(value);
        if (!isNaN(isNumber)) {
            const formated = formatMoney(isNumber);
            const [integer, dec] = formated.split('.');

            setInnerVal(integer);
            if (dec) {
                setInnerShowDecimal(true);
                setDecimal(dec);
            }
        }
    }

    useEffect(() => {
        if (props.defaultValue && props.defaultValue.length > 0) {
            setMoney(props.defaultValue);
            props.onChange(props.defaultValue);
        }
    }, []);

    useEffect(() => {
        if (innerVal) {
            const multiplier = style.fontSize === "large" ? 10 : 9;
            const getSize = () => {
                const length = String(formatRevertComas(innerVal)).length;
                return (Math.trunc(length / 3.1) * 5) + (length * multiplier);
            }
            setInputWidth(getSize())
        }
    }, [innerVal]);

    useEffect(() => {
        if (showDecimal) {
            setInnerShowDecimal(true);
        }
    }, [showDecimal]);


    const innerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        const selectionStart = inputRef.current?.selectionStart || 0;

        value = value === "-" ? value : String(formatRevertComas(value));
        if (isNaN(Number(value)) && value !== "-") {
            return;
        } else {
            const converted = value === "-" ? value : formatMoney(Number(value));
            const [integer] = converted.split(".");
            setInnerVal(integer);

            const nextSelectionStart = selectionStart + (integer.length - innerVal.length === 2 ? 1 : integer.length - innerVal.length === -2 ? -1 : 0);

            // Esperar a que se actualice el input y luego restaurar la posición del cursor
            setTimeout(() => {
                inputRef.current?.setSelectionRange(nextSelectionStart, nextSelectionStart);
            }, 0);
        }
        value = value === "0" ? "" : value;

        props.onChange(value);

    }

    const handleFocus = () => {
        basicFocus();
        if (props.onFocus) {
            props.onFocus();
        }
        if (showDecimal) {
            setInnerShowDecimal(true);
        }
    }

    const handleBlur = () => {
        basicBlur();
        if (props.onBlur) {
            props.onBlur();
        }
        if (decimal.length === 0) {
            setInnerShowDecimal(false);
        }
    }

    const handleKeyUp = (e: any) => {
        if (
            e.key === "Enter" ||
            e.keyCode === 13 ||
            e.code === "Enter"
        ) {
            setFocused(false);
            inputRef.current?.blur();
        }

        if (
            e.key === "-" ||
            e.keyCode === 189 ||
            e.code === "Minus"
        ) {
            if (props.value.length === 0) {
                props.onChange('-');
                setIsNegative(true);
            }
        } else if (e.key === "Backspace" && innerVal?.length === 0) {
            setIsNegative(false);
            if (decimal.length > 0) {
                e.preventDefault();
                inputDecimalRef.current?.focus();
            }
        }


    }

    const handleKeyDown = (e: any) => {
        const position = e.target.selectionEnd;

        if (
            e.key === "." ||
            e.key === "," ||
            e.keyCode === 190 ||
            e.keyCode === 188 ||
            e.keyCode === 229 ||
            e.code === "Period" ||
            e.code === "Comma"
        ) {
            e.preventDefault();
            inputDecimalRef.current?.focus();
        }

        if (position === innerVal.length) {
            if (
                e.key === "ArrowRight" ||
                e.keyCode === 39 ||
                e.code === "ArrowRight"
            ) {
                e.preventDefault();
                inputDecimalRef.current?.focus();
            }
        }
    }

    const handleDecimalKeyDown = (e: any) => {
        const position = e.target.selectionStart;
        if (position === 0) {
            if (
                e.key === "Backspace" ||
                e.keyCode === 8 ||
                e.code === "Backspace" ||
                e.key === "ArrowLeft" ||
                e.keyCode === 37 ||
                e.code === "ArrowLeft"
            ) {
                e.preventDefault();
                inputRef.current?.setSelectionRange(innerVal.length, innerVal.length);
                inputRef.current?.focus();
            }
        }
    }

    const handleDecimalChange = (e: any) => {
        const position = e.target.selectionStart;
        if (!isNaN(Number(e.target.value))) {
            let value = String(e.target.value);
            if (value.length <= 2) {
                setDecimal(value);
                props.onChange(props.value.split(".")[0] + "." + value);
                inputDecimalRef.current?.setSelectionRange(position, position + 1);
            }
        }
    }

    const handleDecimalFocus = () => {
        setFocused(true);
        setInnerShowDecimal(true);
        inputDecimalRef.current?.setSelectionRange(0, 1);
    }
    const handleDecimalBlur = () => {
        if (decimal.length === 0) {
            setInnerShowDecimal(false);
        }
    }

    const handleDecimalClick = (e: any) => {
        setTimeout(() => {
            inputDecimalRef.current?.focus();
        }, 1);
    }

    return (
        <>
            <p
                className="appdland-ui-inputapp-money-symbol"
                style={{
                    color: isNegative
                        ? "red"
                        : style.color
                            ? style.color
                            : "black"
                }}
            >
                $
            </p>
            <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={innerVal}
                onChange={innerChange}
                autoCorrect="off"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                disabled={props.disabled}
                maxLength={19}
                className="appdland-ui-inputapp-input"
                style={{
                    width: `${inputWidth}px`,
                    fontSize: style.fontSize ? style.fontSize : "medium",
                    paddingLeft: innerVal
                        ? "0"
                        : "10px",
                    paddingRight: "0",
                    textAlign: style.textAlign
                        ? style.textAlign
                        : "left",
                    color: style.color
                        ? style.color
                        : "black"
                }}
                spellCheck="false"
            />
            {
                showDecimal ? (
                    <input
                        ref={inputDecimalRef}
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        autoCorrect="off"
                        maxLength={2}
                        value={decimal}
                        onClick={handleDecimalClick}
                        onFocus={handleDecimalFocus}
                        onChange={handleDecimalChange}
                        onKeyDown={handleDecimalKeyDown}
                        onBlur={handleDecimalBlur}
                        placeholder="00"
                        className="appdland-ui-inputapp-decimal"
                        tabIndex={-1}
                        style={{
                            opacity: innerShowDecimal ? "1" : "0",
                            width: style.textAlign
                                ? style.textAlign === "left"
                                    ? "100%"
                                    : "15px"
                                : "100%",
                            color: style.color
                                ? style.color
                                : "black"
                        }}
                    />
                ) : null
            }
        </>
    )
}

export const InputConstructor: React.FC<InputMoneyProps> = (props: InputMoneyProps) => (
    <InputProvider>
        <BaseInput {...props}>
            <InputMoneyApp {...props} />
        </BaseInput>
    </InputProvider>
)