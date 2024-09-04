import { CSSProperties } from "react";

export interface FormAppProps {
    style?: CSSProperties;
    /**
     * Una funcion que valida el formulario antes de ejecutar el metodo onSubmit, se debe retornar un valor booleano
     * @returns false ? Detiene onSubmit
     * @returns true ? Continua a onSubmit
    */
    validateForm?: () => boolean;
    onSubmit: () => void;
    children?: React.ReactNode;
    className?: string;
}