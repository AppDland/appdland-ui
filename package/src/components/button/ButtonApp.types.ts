interface popupConfigInt {
    title?: string;
    text?: string;
}

interface buttonStyleInt {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
}

export interface ButtonAppProps {
    title: string;
    onClick?: () => void;
    /**
     * @default "solid"
     */
    style?: "solid" | "light" | "border-line";
    /**
     * @default "default"
     */
    actionStyle?: "default" | "cancel";
    buttonStyle?: buttonStyleInt;
    validateSubmit?: boolean | popupConfigInt;
}