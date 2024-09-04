
export interface SelectAppProps {
    placeHolder?: string;
    options: string[];
    value: string;
    onChange: (option: string) => void;
    validator?: boolean;
    /**
     * Animación al desplegar la lista de opciones
     * @default true
     */
    listAnimation?: boolean;
    /**
     * Mensaje de error cuando ```validator = {true}```
     */
    errorMessage?:string;
    /**
     * Muestra el mensaje de error (errorMessage) en la ubicación del placeholder
     * @default false
     */
    errorOnPlaceholder?: boolean;
    /**
     * Muestra el mensaje de error (errorMessage) debajo del select
     * @default false
     */
    errorBelowSelect?: boolean;
    textAlign?: "left" | "center";
}