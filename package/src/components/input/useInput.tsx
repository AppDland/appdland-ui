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

    const inputRef = useRef<HTMLInputElement>(null);
    const inputDecimalRef = useRef<HTMLInputElement>(null);

    //EFFECTS
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

    useEffect(() => {
        if (props.type === "money" && props.showDecimal) {
            setInnerShowDecimal(true);
        }
    }, [props.type, props.showDecimal]);

    useEffect(() => {
        if (innerVal) {
            const lenght = String(formatRevertComas(innerVal)).length;
            
            const [
                _first,
                _second,
                _third,
                _fourth,
                _fifth
            ] = [
                    props.fontSize === "medium" ? -0.1 : 0,
                    props.fontSize === "medium" ? 0 : 0.5,
                    props.fontSize === "medium" ? 0.1 : 1,
                    props.fontSize === "medium" ? 0.2 : 1.5,
                    props.fontSize === "medium" ? 0.3 : 2
                ];

            if (lenght < 4) {
                setInputWidth((lenght + _first) * 10);
            } else if (lenght < 7) {
                setInputWidth((lenght + _second) * 10);
            } else if (lenght < 10) {
                setInputWidth((lenght + _third) * 10);
            } else if (lenght < 12) {
                setInputWidth((lenght + _fourth) * 10);
            } else {
                setInputWidth((lenght + _fifth) * 10);
            }
        }
    }, [innerVal]);

    useEffect(() => {
        if (props.register) {
            props.register();
        }
    }, []);

    const handleClick = (e: any) => {
        if (props.disabled === false) {
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
        if (props.type === "text" && props.capitalize) {
            value = formatUpperEach(value);
        } else if (props.type === "money") {

            value = String(formatRevertComas(value));
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
        props.onChange(value === "0" ? "" : value);
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
    }

    const handleDecimalKeyDown = (e: any) => {
        const position = e.target.selectionStart;
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

    const handleDecimalFocus = () => {
        setInnerShowDecimal(true);
    }
    const handleDecimalBlur = () => {
        if (decimal.length === 0) {
            setInnerShowDecimal(false);
        }
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
        handleDecimalBlur
    }
}

export default useInput;