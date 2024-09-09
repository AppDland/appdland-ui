import { CSSProperties } from "react";

interface styleInputInt{
    /**
     * Define el estilo del input
     * @default "box"
     */
    type?: 'box' | 'bottom-line';
    /**
     * @default "left"
     */
    textAlign?: "left" | "center";
    /**
     * @default "solid"
     */
    background?: "solid" | "transparent";
    backgroundColor?: string;
    /**
     * @default "medium"
     */
    fontSize?: "medium" | "large";
    color?: string;
    blurColor?: string;
    borderRadius?: number;
    placeholderColor?: string;
    blurPlaceholderColor?: string;
}

export interface InputAppProps {
    /**
     * Establece el tipo de input
     * @text tipo texto 
     * @number --not tested--
     * @password --not tested--
     * @money input de tipo dinero (máximo números de 15 carácteres)
     * 
     * @default "text"
     */
    type: "text" | "number" | "password" | "money" | "percentage";
    value: string;
    /**
     * evento onChange
     * @param value input value en string
     */
    onChange: (value: string) => void;
    /**
     * Pone en mayuscula cada palabra (únicamente con type: "text")
     * @default false
    */
    capitalize?: boolean;
    style?: styleInputInt;
    validator?: boolean;
    placeholder?: string;
    maxLength?: number;
    /**
     * Muestra números decimales (funciona con el atributo type: "money")
     * @default true
     */
    showDecimal?: boolean;
    onFocus?: () => void;
    disabled?: boolean;
    /**
     * Muestra el mensaje de error (errorMessage) en la ubicación del placeholder
     * @default false
     */
    errorOnPlaceholder?: boolean;
    /**
     * Muestra el mensaje de error (errorMessage) debajo del input
     * @default false
     */
    errorBelowInput?: boolean;
    /**
     * Mensaje de error, se muestra cuando la propiedad "validator" sea verdadera
     */
    errorMessage?: string;
    errorMessageStyle?: CSSProperties;
    /**
     * un valor por defecto para inicializar en el input
     */
    defaultValue?: string;
}