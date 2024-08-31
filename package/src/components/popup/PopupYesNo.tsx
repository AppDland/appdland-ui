import React, { useEffect } from 'react';
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

    return (
        <div className='popup-yes-no-back'>
            <div className="popup-yes-no">
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