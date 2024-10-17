import { CSSProperties } from "react";

interface SelectStyleInt{
    /**
     * Define el estilo del input
     * @default "box"
     */
    type?: 'box' | 'bottom-line' | 'outline';
    textAlign?: "left" | "center" | "right";
    /**
     * Muestra el placeholder despues de hacer click en el select
     * @default true
     */
    showPlaceHolderOnFocus?: boolean;
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
    /**
     * Agrega una flecha personalizada
     */
    customArrow?: React.ReactNode;
    arrowType?: "plain" | "curved";
    arrowColor?: string;
}

export interface OptionsInt{
    value: string;
    label: string;
    extra?: string | React.ReactNode;
}

interface OptionsStyleInt{
    /**
     * Animación al desplegar la lista de opciones
     * @default true
     */
    listAnimation?: boolean;
    showPlaceholderOnList?: boolean;
    backgroundColor?: string;
    optionLineSeparatorColor?: string;
    color?: string;
    textAlign?: "left" | "center";
    optionHoverColor?: string;
    /**
     * Número máximo de items a mostrar en la lista
     * @default 5
     */
    maxItems?: number;
    scrollThumbColor?: string;
}

export interface SelectAppProps {
    placeholder?: string;
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
    boxStyle?: React.CSSProperties;
    /**
     * Impide que la opcion se ubique como opcion seleccionada
     * @default false
     */
    preventDefault?: boolean;
    optionsStyle?: OptionsStyleInt;
    disabled?: boolean;
}