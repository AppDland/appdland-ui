
/**
 * dsdsds
 * @type 
 */
export interface InputAppProps {
    type: "text" | "number" | "password" | "money";
    value: string;
    onChange: (event: string) => void;
    /**Pone en mayuscula cada palabra, default: false */
    capitalize?: boolean;
    validator?: boolean;
    placeholder?: string;
    maxLength?: number;
    onFocus?: () => void;
    percentage?: boolean;
    disabled?: boolean;
}