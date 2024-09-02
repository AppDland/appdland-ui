import { useState } from "react";

interface ValidateInputInt {
    value: string;
    validate: boolean;
    errorMessage?: string;
}

// const modifyHook = (setState: any, keysValues: any) => {
//     setState((prevState: any) => ({
//         ...prevState,
//         ...keysValues
//     }));
// };

// export const useInput = (params?: ValidateInputInt): [ValidateInputInt, (value: string, validate?: boolean) => void] => {

//     const [state, setState] = useState<ValidateInputInt>({
//         value: params?.value || '',
//         validate: params?.validate || false
//     });

//     const setter = (value: string, validate: boolean = false) => {
//         modifyHook(setState, {
//             value: value,
//             validate: validate
//         })
//     }

//     return [state, setter];
// }

// export default useInput;

interface inputCompleteInt extends registerConfig, ValidateInputInt { };

export interface registerConfig {
    min?: number;
    max?: number;
    type?: 'string' | 'number';
    required?: boolean;
}

interface GroupInt {
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
        setState({
            ...state,
            [key]: {
                ...state[key],
                value,
                validate,
                errorMessage
            }

        });
    }

    const register = (key: string, settings?: registerConfig) => {
        setState({
            ...state,
            [key]: {
                value: "",
                validate: false,
                ...settings
            }

        });
    }

    return [state, setter, register];
}