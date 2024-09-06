import React, { createContext, useContext, useState } from "react";
import Loading from "./Loading";

interface ContextLoadingInt {
    loading: boolean;
    /**
     * **Cambia el estado de loading**
     * 
     * ``true`` muestra la pantalla de carga
     * 
     * ``false`` quita la pantalla de carga
     */
    setLoading: (param: boolean) => void;
}

const LoadingConetxt = createContext<ContextLoadingInt | null>(null);


interface LoadingProps {
    children?: React.ReactNode;
    /**
     * Color del elemento de carga
     */
    loadingColor?: string;
    /**
     * Tipo de fondo
     */
    background?: "light" | "dark";
    /**
     * Cuantos spinners se muestran
     * 
     * *default* = **6**
     */
    spinners?: 3 | 6 | 9;
}

/**
 * Provider de loading, habilita el uso de useLoading
 * @returns 
 */
const LoadingProvider: React.FC<LoadingProps> = ({ children, background, loadingColor, spinners }) => {

    const [loading, setInnerLoading] = useState(false);

    const setLoading = (op: boolean) => {
        setInnerLoading(op);
        if (op === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    return (
        <LoadingConetxt.Provider value={
            {
                loading,
                setLoading,
            }
        }>
            {
                loading === true && (
                    <Loading background={background} loadingColor={loadingColor} spinners={spinners} />
                ) 
            }
            {children}

        </LoadingConetxt.Provider>
    );
}

/**
 * custom hook para activar o desactivar el estado de "loading"
 * @returns 
 */
const useLoading = (): ContextLoadingInt => {
    const context = useContext(LoadingConetxt);
    if (!context) {
        throw new Error('useLoading debe ser utilizado dentro de LoadingProvider');
    }
    return context;
};

export { LoadingProvider, useLoading };