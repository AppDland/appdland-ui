
export interface DatePickerAppProps{
    value: string;
    onChange: (val: string) => void;
    validator?: boolean;
    errorMessage?: string;
    placeholder?: string;
    maxToday?: boolean;
    /**
     * @default "left"
     */
    textAlign?: "left" | "center";
    /**
     * @default "box"
     */
    style?: "box" | "bottom-line";
}