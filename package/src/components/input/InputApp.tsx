import React, { useEffect, useState } from 'react';
import { InputAppProps } from './InputApp.types';
import { InputProvider, useInputContext } from './InputContext';
import { BaseInput } from './BaseInput';
import { formatInteger, formatUpperEach } from '../../functions/formats';

export const InputApp: React.FC<InputAppProps> = ({ style = {}, errorOnPlaceholder = false, errorBelowInput = false, alwaysShowChild = false, ...props }) => {

    const [inputWidth, setInputWidth] = useState(0);
    const { placeholderActive, inputRef, innerVal, setInnerVal, basicFocus, basicBlur, setFocused, setClickInside } = useInputContext();

    useEffect(() => {
        if (props.defaultValue && props.defaultValue.length > 0) {
            if (props.type === "percentage" || props.type === "number" || props.type === "tel") {
                const isNumber = Number(props.defaultValue);
                if (!isNaN(isNumber)) {
                    setInnerVal(props.defaultValue);
                    props.onChange(props.defaultValue);
                }
            } else {
                setInnerVal(props.defaultValue);
                props.onChange(props.defaultValue);
            }
        }
    }, []);

    useEffect(() => {
        if (innerVal && props.type === "percentage") {

            const multiplier = style.fontSize === "large" ? 10 : 9;

            const getSize = () => {
                const length = innerVal.length - (innerVal.includes(".") ? 1 : 0);
                return (innerVal.includes(".") ? 6 : 0) + (length * multiplier);
            }
            setInputWidth(getSize())
        }
    }, [innerVal]);

    const handleFocus = () => {
        basicFocus();
        if (props.onFocus) {
            props.onFocus();
        }
    }

    const handleBlur = () => {
        if (props.onBlur) {
            props.onBlur();
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
    }

    const innerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (props.type === "name") {
            value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        }

        if ((props.type === "text" || props.type === "name") && props.capitalize) {
            value = formatUpperEach(value);
        } else if ((props.type === "text" || props.type === "name") && props.capitalizeAll) {
            value = value.toUpperCase();
        } else if (props.type === "number") {
            if (isNaN(Number(value)) && value !== "-") {
                return;
            }
            value = value === "0" ? "" : value;
        } else if (props.type === "tel"){
            value = formatInteger(value);
        } else if (props.type === "percentage") {
            if (isNaN(Number(value)) && value !== "-") {
                return;
            }
            value = value === "0" ? "" : value;
        }
        setInnerVal(value);
        props.onChange(value);
    }

    return (
        <>
            {
                props.child && (
                    <div
                        className='appdland-ui-inputapp-child-container'
                        style={{
                            opacity: alwaysShowChild
                                ? "1"
                                : placeholderActive
                                    ? "1"
                                    : "0",
                            maxWidth: props.childSize 
                            ? `${props.childSize}px`
                            : '30px'
                        }}
                        onClick={e => {setClickInside(true); e.stopPropagation();}}
                    >
                        {props.child}
                    </div>
                )
            }
            <input
                ref={inputRef}
                type={props.type === "number" ? "text" : props.type}
                inputMode={props.type === "number"
                    ? "decimal"
                    : props.type === "percentage"
                        ? "numeric"
                        : props.type === "email"
                            ? "email"
                            : "text"
                }
                autoComplete="off"
                value={innerVal}
                onChange={innerChange}
                autoCorrect="off"
                onFocus={handleFocus}
                onBlurCapture={basicBlur}
                onBlur={handleBlur}
                onKeyUp={handleKeyUp}
                disabled={props.disabled}
                maxLength={props.maxLength
                    ? props.maxLength
                    : undefined
                }
                className="appdland-ui-inputapp-input"
                style={{
                    width: props.type === "percentage"
                        ? `${inputWidth}px`
                        : "100%",
                    fontSize: style.fontSize ? style.fontSize : "medium",
                    paddingLeft: "10px",
                    paddingRight: style.textAlign === "center" && props.type !== "percentage"
                        ? "10px"
                        : "0",
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
                props.type === "percentage" && innerVal ? (
                    <p
                        className="appdland-ui-inputapp-percentage-symbol"
                        style={{
                            color: style.color ? style.color : "black",
                            width: style.textAlign
                                ? style.textAlign === "left"
                                    ? "100%"
                                    : "12px"
                                : "100%"
                        }}
                    >%</p>
                ) : null
            }
            {
                props.child && (
                    <div
                        className='appdland-ui-inputapp-child-container'
                    >
                        <p style={{ visibility: "hidden" }}>---------</p>
                    </div>
                )
            }
        </>
    )
}

export const InputConstructor: React.FC<InputAppProps> = (props: InputAppProps) => (
    <InputProvider>
        <BaseInput {...props}>
            <InputApp {...props} />
        </BaseInput>
    </InputProvider>
)