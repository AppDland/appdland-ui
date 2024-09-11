import { CSSProperties } from "react";

interface SelectStyleInt{
    /**
     * Define el estilo del input
     * @default "box"
     */
    type?: 'box' | 'bottom-line';
    /**
     * Animación al desplegar la lista de opciones
     * @default true
     */
    listAnimation?: boolean;
    textAlign?: "left" | "center";
    /**
     * @default "solid"
     */
    background?: "solid" | "transparent";
    fontSize?: "medium" | "large";
    backgroundColor?: string;
    color?: string;
    blurColor?: string;
    borderRadius?: number;
    placeholderColor?: string;
    blurPlaceholderColor?: string;
    showPlaceholderOnList?: boolean;
}

export interface OptionsInt{
    value: string;
    label: string;
}

interface OptionsStyleInt{
    backgroundColor?: string;
    optionLineSeparatorColor?: string;
    color?: string;
    textAlign?: "left" | "center";
    optionHoverColor?: string;
}

export interface SelectAppProps {
    placeHolder?: string;
    options: string[] | OptionsInt[];
    value: string;
    onChange: (option: string) => void;
    validator?: boolean;
    /**
     * Mensaje de error cuando ```validator = {true}```
     */
    errorMessage?:string;
    /**
     * Muestra el mensaje de error (errorMessage) en la ubicación del placeholder
     * @default false
     */
    errorOnPlaceholder?: boolean;
    /**
     * Muestra el mensaje de error (errorMessage) debajo del select
     * @default false
     */
    errorBelowSelect?: boolean;
    errorMessageStyle?: CSSProperties;
    defaultValue?: string;
    style?: SelectStyleInt;
    /**
     * Impide que la opcion se ubique como opcion seleccionada
     * @default false
     */
    preventDefault?: boolean;
    optionsStyle?: OptionsStyleInt;
    /**
     * Agrega una flecha personalizada
     */
    customArrow?: React.ReactNode;
}