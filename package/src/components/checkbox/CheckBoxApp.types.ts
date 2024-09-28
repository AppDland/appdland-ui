interface CheckBoxAppStyles {
    /**
     * Establece el color global
     */
    color?: string;
    /**
     * Establece el color del check únicamente
     */
    checkColor?: string;
    /**
     * Establece el color del label
     */
    labelColor?: string;
}

export interface CheckBoxAppProps {
    value: boolean;
    onChange: (param: boolean) => void;
    label?: string;
    style?: CheckBoxAppStyles
}