import React, { useEffect, useRef } from 'react';
import { ButtonApp } from '../button/ButtonApp';
import "./styles.css";

interface PopupYesNoInt {
    title?: String;
    text?: String;
    onYes: () => void;
    onNo?: () => void;
    state: boolean;
    setState: (param: boolean) => void;
}

const PopupYesNo = ({ title, text, state, setState, onYes, onNo }: PopupYesNoInt) => {

    useEffect(() => {
        if (state === true) {
            document.body.style.overflow = "hidden";
        }
    }, [state]);

    const clickYes = () => {
        onYes();
        setState(false);
        document.body.style.overflow = "unset";
    }
    const clickNo = () => {
        if (onNo) {
            onNo();
        }
        setState(false);
        document.body.style.overflow = "unset";
    }

    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        const closeModal = (e: any) => {
            if (popupRef.current && popupRef.current.contains(e.target)) {
                setState(false);
            }
        }

        document.addEventListener("click", closeModal);

        return () => {
            document.removeEventListener("click", closeModal);
        }
    }, []);

    return (
        <div className='popup-yes-no-back' ref={popupRef}>
            <div className="popup-yes-no" onClick={(e) => e.stopPropagation()}>
                <h1>{title ? title : "Confirmar"}</h1>
                <p>{text ? text : "¿Quieres continuar?"}</p>
                <br />
                <div className='popup-yes-no-buttons'>
                    <ButtonApp
                        title="No"
                        onClick={clickNo}
                        style='border-line'
                        actionStyle='cancel'
                    />
                    <ButtonApp
                        title="Si"
                        onClick={clickYes}
                        style='border-line'
                    />
                </div>
            </div>
        </div>
    )
}

export default PopupYesNo;