import React from 'react';

interface CustomArrowInt {
    color?: string;
    rotate?: boolean;
}
const CustomArrow = ({color = "black", rotate = false}: CustomArrowInt) => {

    return (
        <svg width="18" height="8" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop: "5px", rotate: rotate === true ? "180deg" : "0deg", transitionDuration: "0.1s"}}>
            <path d="M13 15L0.00961876 0L25.9904 0L13 15Z" fill={color} />
        </svg>
    )
}

export default CustomArrow;