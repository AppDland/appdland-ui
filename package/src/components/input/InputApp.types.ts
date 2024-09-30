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

export interface BasicInputProps {
    /**
     * un valor por defecto para inicializar en el input
     */
    defaultValue?: string;
    value: string;
    /**
     * evento onChange
     * @param value (string)
     */
    onChange: (value: string) => void;
    validator?: boolean;
    maxLength?: number;
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
    style?: styleInputInt;
    placeholder?: string;
    disabled?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface InputAppProps extends BasicInputProps {
    /**
     * Establece el tipo de input
     * @text texto 
     * @number número
     * @password contraseña
     * @percentage porcentaje
     * @email correo electrónico
     * @tel teléfono
     * 
     * @default text
     */
    type: "text" | "number" | "password" | "percentage" | "email" | "tel";
    
    /**
     * Pone en mayuscula cada palabra (únicamente con type: "text")
     * @default false
    */
    capitalize?: boolean;
    /**
     * Pone en mayuscula todo el texto
     * @default false
     */
    capitalizeAll?: boolean;    
    child?: React.ReactNode;
    /**
     * @default 30
     */
    childSize?: number;
    /**
     * Muestra el elemento incrustado siempre (requiere **child**)
     * 
     * @default false
     */
    alwaysShowChild?: boolean;
}

export interface InputMoneyProps extends BasicInputProps {
    /**
     * Muestra números decimales
     * @default true
     */
    showDecimal?: boolean;
}