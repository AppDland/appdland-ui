import React, { createContext, useContext, useRef, useState } from "react";

interface InputContextInt {
    placeholderActive: boolean;
    setPlaceholderActive: (param: boolean) => void;
    focused: boolean;
    setFocused: (param: boolean) => void;
    innerVal: string;
    setInnerVal: (param: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    basicFocus: () => void;
    basicBlur: () => void;
}

const InputContext = createContext<InputContextInt | null>(null);


interface InputProps {
    children: React.ReactNode;
}

const InputProvider: React.FC<InputProps> = ({ children }) => {

    const [placeholderActive, setPlaceholderActive] = useState(false);
    const [focused, setFocused] = useState(false);
    const [innerVal, setInnerVal] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const basicFocus = () => {
        setPlaceholderActive(true);
        setFocused(true);
    }

    const basicBlur = () => {
        if (innerVal === "") {
            setPlaceholderActive(false);
        }
        setFocused(false);
    }

    return (
        <InputContext.Provider
            value={
                {
                    placeholderActive,
                    setPlaceholderActive,
                    focused,
                    setFocused,
                    innerVal,
                    setInnerVal,
                    inputRef,
                    basicFocus,
                    basicBlur
                }
            }
        >
            {children}
        </InputContext.Provider>
    );
}


const useInputContext = (): InputContextInt => {
    const context = useContext(InputContext);
    if (!context) {
        throw new Error('useInputContext debe ser utilizado dentro de InputProvider');
    }
    return context;
};

export { InputProvider, useInputContext };