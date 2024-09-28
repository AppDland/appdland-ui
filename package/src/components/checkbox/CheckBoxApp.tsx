import React, { useState } from 'react';
import { CheckBoxAppProps } from "./CheckBoxApp.types";
import "./styles.css";

export const CheckBoxApp: React.FC<CheckBoxAppProps> = ({ style = {}, ...props }) => {

    const [isAnimating, setIsAnimating] = useState(false);

    const handleCheck = () => {
        props.onChange(!props.value);
        setIsAnimating(true);
    }



    return (
        <div className="appdland-ui-checkboxapp-container" onClick={handleCheck}>
            <div className="appdland-ui-checkboxapp-box" >
                <div
                    className={`appdland-ui-checkboxapp-active ${props.value === true ? "appdland-ui-checkboxapp-active-animated" : isAnimating && props.value === false ? "appdland-ui-checkboxapp-active-animated-reverse" : ""}`}
                    style={{
                        //@ts-ignore
                        '--appdland-ui-checkboxapp-color': style.checkColor
                            ? style.checkColor
                            : style.color
                                ? style.color
                                : "black"
                    }}

                />
                <svg
                    className={`appdland-ui-check-active ${props.value === true ? "appdland-ui-check-active-animated" : isAnimating && props.value === false ? "appdland-ui-check-active-animated-reverse" : ""}`}
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.5 12.5L19 0L20.5 2L5 17L0 8.5L2 7L5.5 12.5Z"
                        fill={style.checkColor
                            ? style.checkColor
                            : style.color
                                ? style.color
                                : 'black'
                        }
                    />
                </svg>
            </div>
            <p
                style={{
                    color: style.labelColor
                        ? style.labelColor
                        : style.color
                            ? style.color
                            : "black"
                }}
            >
                {props.label}
            </p>
        </div>

    )
}