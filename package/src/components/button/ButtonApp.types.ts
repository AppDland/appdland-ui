interface popupConfigInt {
    title?: string;
    text?: string;
}

interface buttonStyleInt {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
}

interface iconConfigInt{
    size?: number;
    icon?: string;
    invertColor?: boolean;
}

export interface ButtonAppProps {
    title?: string;
    children?: React.ReactNode;
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
    /**
     * Renderiza un boton de tipo icono
     * 
     * **IGNORA PROPIEDADES**
     * @param title
     * @param children
     */
    icon?: string | iconConfigInt;
    disabled?: boolean;
}