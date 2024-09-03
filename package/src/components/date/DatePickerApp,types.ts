
export interface DatePickerAppProps{
    value: string;
    onChange: (val: string) => void;
    validator?: boolean;
    errorMessage?: string;
    placeholder?: string;
    maxToday?: boolean;
}