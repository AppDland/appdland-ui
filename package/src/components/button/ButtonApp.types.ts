interface popupConfigInt {
    title?: string;
    text?: string;
}

interface iconConfigInt {
    size?: number;
    icon?: string | React.ReactNode;
    invertColor?: boolean;
}

interface StyleButtonInt {
    type?: "solid" | "light" | "border-line";
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
}

export interface ButtonAppProps {
    title?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    /**
     * @default "solid"
     */
    style?: StyleButtonInt;
    /**
     * @default "default"
     */
    actionStyle?: "default" | "cancel";
    validateSubmit?: boolean | popupConfigInt;
    /**
     * Renderiza un boton de tipo icono
     * 
     * **IGNORA PROPIEDADES**
     * @param title
     * @param children
     */
    icon?: string | iconConfigInt | React.ReactNode;
    disabled?: boolean;
}