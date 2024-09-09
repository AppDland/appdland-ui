import React, { useEffect } from 'react';
import { InputAppProps } from './InputApp.types';
import useInput from './useInput';
import "./styles.css";

export const InputApp: React.FC<InputAppProps> = (
    {
        disabled = false,
        showDecimal = true,
        style = {
            type: "box",
            textAlign: "left",
            background: "solid",
            fontSize: "medium",
        },
        errorOnPlaceholder = false,
        errorBelowInput = false,
        ...props
    }
) => {

    const {
        placeholderActive,
        innerVal,
        decimal,
        inputWidth,
        focused,
        inputRef,
        inputDecimalRef,
        innerShowDecimal,
        handleClick,
        handleBlur,
        handleFocus,
        innerChange,
        handleKeyUp,
        handleDecimalKeyDown,
        handleDecimalChange,
        handleDecimalFocus,
        handleDecimalBlur,
        handleDecimalClick,
        isNegative
    } = useInput({ disabled, showDecimal, style, ...props });

    return (
        <div
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
                    top: style.background === "solid"
                        ? placeholderActive ? "-16%" : "45%"
                        : "45%",
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
                    width: placeholderActive ? "auto" : "auto",
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
                    backgroundColor: style.background === "solid" ? "white" : "transparent"
                }}
            >
                {
                    errorOnPlaceholder && errorBelowInput === false && props.validator
                        ? props.errorMessage + '*'
                        : props.placeholder
                }
            </p>
            {
                props.type === "money" && (
                    props.value.length > 0
                        ? <p className="appdland-ui-inputapp-money-symbol" style={{
                            color: isNegative
                                ? "red"
                                : style.color
                                    ? style.color
                                    : "black"
                        }}>$</p>
                        : null
                )
            }
            <input
                ref={inputRef}
                type={props.type === "money" || props.type === "number" ? "text" : props.type}
                inputMode={props.type === "money" || props.type === "number"
                    ? "decimal"
                    : props.type === "percentage"
                        ? "numeric"
                        : "text"
                }
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
                className="appdland-ui-inputapp-input"
                style={{
                    // padding: props.type === "money" ? "10px 0" : "10px",
                    width: innerVal
                        ? `${inputWidth}px`
                        : "100%",
                    fontSize: style.fontSize ? style.fontSize : "medium",
                    paddingLeft: props.type === "money"
                        ? innerVal
                            ? "0"
                            : "10px"
                        : "10px",
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
                props.type === "money" && innerVal && showDecimal ? (
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
                ) : props.type === "percentage" && innerVal ? (
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