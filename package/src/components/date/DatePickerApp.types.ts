import { CSSProperties } from "react";

interface StyleDateInt{
    /**
     * @default "box"
     */
    type?: "box" | "bottom-line";
    /**
     * @default "left"
     */
    textAlign?: "left" | "center";
    backgroundColor?: string;
    fontSize?: "medium" | "large";
    color?: string;
    blurColor?: string;
    borderRadius?: number;
    placeholderColor?: string;
    blurPlaceholderColor?: string;
}

export interface DatePickerAppProps{
    value: string;
    onChange: (val: string) => void;
    validator?: boolean;
    /**
     * Muestra el mensaje de error (errorMessage) en la ubicación del placeholder
     * @default false
     */
    errorOnPlaceholder?: boolean;
    /**
     * Muestra el mensaje de error (errorMessage) debajo del input
     * @default false
     */
    errorBelowDate?: boolean;
    /**
     * Mensaje de error, se muestra cuando la propiedad "validator" sea verdadera
     */
    errorMessage?: string;
    errorMessageStyle?: CSSProperties;
    placeholder?: string;
    maxToday?: boolean;
    style?: StyleDateInt;
}