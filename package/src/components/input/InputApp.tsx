import React from 'react';
import { InputAppProps } from './InputApp.types';
import useInput from './useInput';
import "./styles.css";

export const InputApp: React.FC<InputAppProps> = (
    {
        disabled = false,
        style = "box",
        showDecimal = true,
        textAlign = "left",
        background = "solid",
        fontSize = "medium",
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
        isNegative
    } = useInput({ disabled, showDecimal, fontSize, ...props });

    return (
        <div
            className={`inputgb-container ${style === "box" ? "inputgb-container-box" : "inputgb-container-bottom-line"}`}
            onClick={handleClick}
            style={{
                borderColor: props.validator === true
                    ? "red"
                    : focused ? "black" : 'lightgray',
                backgroundColor: background === "solid" ? "white" : "transparent"
            }}
        >
            <p
                className={`inputgb-placeholder`}
                style={{
                    top: background === "solid"
                        ? placeholderActive ? "-16%" : "45%"
                        : "45%",
                    left: placeholderActive
                        ? textAlign === "left" ? "10px" : undefined
                        : textAlign === "left" ? "0" : undefined,
                    fontSize: placeholderActive ? "small" : "medium",
                    width: placeholderActive ? "auto" : "auto",
                    color: props.validator === true
                        ? focused ? "red" : "lightpink"
                        : focused ? "black" : "lightgray",
                    textAlign: textAlign,
                    opacity: background === "transparent"
                        ? placeholderActive ? "0" : "1"
                        : undefined,
                    backgroundColor: background === "solid" ? "white" : "transparent"
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
                    focused
                        ? <p className="inputgb-money" style={{
                            color: isNegative ? "red" : "black"
                        }}>$</p>
                        : props.value.length > 0
                            ? <p className="inputgb-money" style={{
                                color: isNegative ? "red" : "black"
                            }}>$</p>
                            : null
                )
            }
            <input
                ref={inputRef}
                type={props.type === "money" || props.type === "number" ? "text" : props.type}
                inputMode={props.type === "money" || props.type === "number" ? "decimal" : "none"}
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
                            ? `${ innerVal.length * 10}px`
                            : `${inputWidth}px`
                        : "100%",
                    fontSize: fontSize
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
                        onFocus={handleDecimalFocus}
                        onChange={handleDecimalChange}
                        onKeyDown={handleDecimalKeyDown}
                        onBlur={handleDecimalBlur}
                        placeholder="00"
                        className="inputgb-decimal"
                        style={{
                            opacity: innerShowDecimal ? "1" : "0"
                        }}
                    />
                ) : props.percentage === true && innerVal ? (
                    <p className="inputgb-percentage">%</p>
                ) : null
            }
            {
                errorBelowInput && errorOnPlaceholder === false && props.validator && (
                    <p
                        className='inputgb-error-message'
                        style={{
                            fontSize: fontSize === "large" ? "small" : "x-small",
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