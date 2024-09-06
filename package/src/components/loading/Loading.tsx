import React from 'react';
import "./styles.css";

interface LoadingInt {
    loadingColor?: string;
    background?: "dark" | "light";
    spinners?: 3 | 6 | 9;
}

const Loading = ({ loadingColor, background = "dark", spinners = 6 }: LoadingInt) => {

    return (
        <div className="appdland-ui-loading-screen" style={{
            backgroundColor: background === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)"
        }}>
            <div className="appdland-ui-loading-circle">
                <div className="appdland-ui-loading-roller">
                    {
                        Array.from({ length: spinners }).map((_, index) => (
                            <Rollers color={loadingColor} key={index} />

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

interface RollersInt {
    color?: string;
}

const Rollers = ({ color }: RollersInt) => (
    <div style={{ '--appdland-ui-loading-bg-color': color ? color : "black" } as React.CSSProperties} />
)

export default Loading;