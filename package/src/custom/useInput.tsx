import { useState } from "react";

interface ValidateInputInt {
    value: string;
    validate: boolean;
    errorMessage?: string;
}

interface inputCompleteInt extends registerConfig, ValidateInputInt { };

interface errorEventsInt{
    onFormatError?: string;
    onRequiredError?: string;
    onMinError?: string;
    onMaxError?: string;
    onPositiveNumberError?: string;
}

export interface registerConfig {
    min?: number;
    max?: number;
    /**
     * @default "string"
     */
    type?: 'string' | 'number';
    /**
     * @default true
     */
    required?: boolean;
    /**
     * Números positivos únicamente
     * @default true
     */
    positive?: boolean;
    errorEvents?: errorEventsInt;
}

export interface GroupInt {
    [key: string]: inputCompleteInt;
}
export const useInputGroup = (): [GroupInt, (key: string, value: string, validate?: boolean, errorMessage?: string) => void, (key: string, settings?: registerConfig) => void] => {

    const [state, setState] = useState<GroupInt>({});

    /**
     * Cambiar estado 
     * @param key nombre del input
     * @param value valor
     * @param validate estado del input (true === error)
     * @param errorMessage mensaje de error
     */
    const setter = (key: string, value: string, validate: boolean = false, errorMessage?: string) => {
        setState(prevState => ({
            ...prevState,
            [key]: {
                ...state[key],
                value,
                validate,
                errorMessage
            }

        }));
    }

    const register = (key: string, settings?: registerConfig) => {
        if (!state[key]) {
            setState(prevState => ({
                ...prevState,
                [key]: {
                    value: "",
                    validate: false,
                    ...settings
                }

            }));
        }

    }

    return [state, setter, register];
}