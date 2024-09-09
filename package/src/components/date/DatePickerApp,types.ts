
interface StyleDateInt{
    /**
     * @default "box"
     */
    type?: "box" | "bottom-line";
    /**
     * @default "left"
     */
    textAlign?: "left" | "center";
    backgroundColor?: string;
    fontSize?: "medium" | "large";
    color?: string;
    blurColor?: string;
    borderRadius?: number;
    placeholderColor?: string;
    blurPlaceholderColor?: string;
}

export interface DatePickerAppProps{
    value: string;
    onChange: (val: string) => void;
    validator?: boolean;
    errorMessage?: string;
    placeholder?: string;
    maxToday?: boolean;
    style?: StyleDateInt;
}