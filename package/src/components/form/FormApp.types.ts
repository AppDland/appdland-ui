import { CSSProperties } from "react";

export interface FormAppProps {
    style?: CSSProperties;
    /**
     * DEPRECATED
     * Una funcion que valida el formulario antes de ejecutar el metodo onSubmit, se debe retornar un valor booleano
     * @returns false ? Detiene onSubmit
     * @returns true ? Continua a onSubmit
    */
    validateForm?: () => boolean;
    onSubmit: (formValues?: formValuesInt) => void;
    children?: React.ReactNode;
    className?: string;
}

import { inputCompleteInt, registerConfig } from "../../custom/useInput";

export interface useFormAppProps<T> {
    /**
     * Registra un input, se debe usar con el operador Spread.
     *
     * *Ejemplo*: 
     * ```
     * <InputApp
        * {...register('inputName')}
        * otherProps
     * />
     * ```
     * 
     * | ATRIBUTOS |
     * 
     * **name** asigna un nombre al input
     * 
     * **settings** ajustes para validar el formulario
     * 
     * *return*
     * - value
     * - onChange
     * - validator
     * - errorMessage
     * - maxLength
     * 
     * NOTA:
     * 
     * No reasigne los atributos que se están retornano, esto causaria un posible error
     */
    register: (name: string, settings?: registerConfig) => RegisterInt;
    /**
     * La función que finalmente valida que los inputs cumplan los requisitos del formulario
     * @false detiene el onSubmit
     * @true continua al onSubmit
     */
    validateForm: () => boolean;
    /**
     * 
     */
    form: Record<string, inputCompleteInt>;
    setForm: (key: string, value: string, validate?: boolean, errorMessage?: string) => void;
    /**
     * Accede a un objeto con los inputs y sus values
     */
    formValues: T | formValuesInt;
}

export type formValuesInt = {
    [key: string]: any;
}

export interface RegisterInt {
    value: string;
    onChange: (param: string) => void;
    validator: boolean;
    errorMessage: string;
    maxLength: number | undefined;
}