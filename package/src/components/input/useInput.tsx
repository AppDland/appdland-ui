import { useEffect, useRef, useState } from "react";
import { InputAppProps } from "./InputApp.types";
import { formatMoney, formatRevertComas, formatUpperEach } from "../../functions/formats";

const useInput = (props: InputAppProps) => {
    const [placeholderActive, setPlaceholderActive] = useState(false);
    const [innerVal, setInnerVal] = useState<string>();
    const [decimal, setDecimal] = useState("");
    const [inputWidth, setInputWidth] = useState(0);
    const [focused, setFocused] = useState(false);
    const [innerShowDecimal, setInnerShowDecimal] = useState(false);
    const [isNegative, setIsNegative] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const inputDecimalRef = useRef<HTMLInputElement>(null);

    //EFFECTS
    useEffect(() => {
        if (props.defaultValue && props.defaultValue.length > 0) {
            if (props.type === "money") {
                const isNumber = Number(props.defaultValue);
                if (!isNaN(isNumber)) {
                    const formated = formatMoney(isNumber);
                    setInnerVal(formated);
                }

            } else if (props.type === "percentage") {
                const isNumber = Number(props.defaultValue);
                if (!isNaN(isNumber)) {
                    setInnerVal(props.defaultValue);
                }
            }
            props.onChange(props.defaultValue);
        }
    }, []);

    useEffect(() => {
        if (props.value.length > 0 && placeholderActive === false) {
            setPlaceholderActive(true);
        } else if (props.value.length === 0 && placeholderActive === true && focused === false) {
            console.log("yes")
            setPlaceholderActive(false);
        }
    }, [props.value, placeholderActive]);

    useEffect(() => {
        if (props.type === "money" && props.showDecimal) {
            setInnerShowDecimal(true);
        }
    }, [props.type, props.showDecimal]);

    useEffect(() => {
        if (innerVal) {

            const multiplier = props.style?.fontSize === "medium" ? 9 : 10;

            const getSize = () => {
                const length = String(formatRevertComas(innerVal)).length;
                return (Math.trunc(length / 3.1) * 5) + (length * multiplier);
            }
            const numberSize = () => {
                const length = innerVal.length - (innerVal.includes(".") ? 1 : 0);
                return (innerVal.includes(".") ? 6 : 0) + (length * multiplier);
            }
            setInputWidth(props.type === "money" ? getSize() : numberSize())
        }
    }, [innerVal]);


    const handleClick = (e: any) => {
        if (props.disabled === false) {
            setPlaceholderActive(true);
            setFocused(true);
            // if (e.target.contains(inputDecimalRef.current)) {
            //     inputDecimalRef.current?.focus();
            // } else {
            inputRef.current?.focus();
            // }
        }
    }

    const handleBlur = () => {
        if (props.value === "") {
            setPlaceholderActive(false);
        }
        if (props.type === "money" && decimal.length === 0) {
            setInnerShowDecimal(false);
        }
        setFocused(false);
    }

    const handleFocus = () => {
        setPlaceholderActive(true);
        setFocused(true);
        if (props.onFocus) {
            props.onFocus();
        }
        if (props.showDecimal) {
            setInnerShowDecimal(true);
        }
    }

    const innerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        //PASAR ESTA LOGICA AL EFECTO YA QUE SE EJECUTA DOS VECES
        if (props.type === "text" && props.capitalize) {
            value = formatUpperEach(value);
        } else if (props.type === "money") {
            value = value === "-" ? value : String(formatRevertComas(value));
            if (isNaN(Number(value)) && value !== "-") {
                return;
            } else {
                const converted = value === "-" ? value : formatMoney(Number(value));
                const [integer, decimal] = converted.split(".");
                setInnerVal(converted === "0" ? "" : integer);
                if (decimal) {
                    setDecimal(decimal);
                }
            }
            value = value === "0" ? "" : value;
        } else if (props.type === "number") {
            if (isNaN(Number(value)) && value !== "-") {
                return;
            }
            value = value === "0" ? "" : value;
        } else if (props.type === "percentage") {
            if (isNaN(Number(value)) && value !== "-") {
                return;
            }
            setInnerVal(value);
            value = value === "0" ? "" : value;
        }
        props.onChange(value);
    }

    const handleKeyUp = (e: any) => {
        if (
            e.key === "." ||
            e.key === "," ||
            e.keyCode === 190 ||
            e.keyCode === 188 ||
            e.keyCode === 229 ||
            e.code === "Period" ||
            e.code === "Comma"
        ) {
            inputDecimalRef.current?.focus();
        }
        if (
            e.key === "Enter" ||
            e.keyCode === 13 ||
            e.code === "Enter"
        ) {
            setFocused(false);
            inputRef.current?.blur();
        }

        if (props.type === "money") {
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
            }
        }

    }

    const handleDecimalKeyDown = (e: any) => {
        const position = e.target.selectionStart;
        if (position === 0 && e.key === "Backspace") {
            inputRef.current?.focus();
        }
    }

    const handleDecimalChange = (e: any) => {
        if (!isNaN(Number(e.target.value))) {
            let value = String(e.target.value);
            if (value.length <= 2) {
                setDecimal(value);
                props.onChange(props.value.split(".")[0] + "." + value);
            }
        }
    }

    const handleDecimalFocus = () => {
        setInnerShowDecimal(true);
    }
    const handleDecimalBlur = () => {
        if (decimal.length === 0) {
            setInnerShowDecimal(false);
        }
    }

    const handleDecimalClick = () => {
        // console.log("clicked");
        // inputDecimalRef.current?.blur();
        // inputRef.current?.focus();
    }

    return {
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
    }
}

export default useInput;