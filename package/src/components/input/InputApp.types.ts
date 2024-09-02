import { CSSProperties } from "react";

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
    type: "text" | "number" | "password" | "money";
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
    /**
     * Define el estilo del input
     * @default "box"
     */
    style?: 'box' | 'bottom-line';
    validator?: boolean;
    placeholder?: string;
    maxLength?: number;
    /**
     * Muestra números decimales (funciona con el atributo type: "money")
     * @default true
     */
    showDecimal?: boolean;
    onFocus?: () => void;
    percentage?: boolean;
    disabled?: boolean;
    /**
     * @default "left"
     */
    textAlign?: "left" | "center";
    /**
     * @default "solid"
     */
    background?: "solid" | "transparent";
    /**
     * @default "medium"
     */
    fontSize?: "medium" | "large";
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
}