import React, { useEffect, useState } from 'react';
import { InputApp, ButtonApp, FormApp, useFormApp, SelectApp, DatePickerApp, useLoading } from "@juandland/appdland-ui"
import deleteIcon from "./delete.png";
import "./App.css";

interface formValsInt {
    datepicker: string;
    value: number;
    mount: number;
}
function App() {

    const { register, validateForm, form, formValues, setForm } = useFormApp<formValsInt>();
    const { setLoading } = useLoading();

    useEffect(() => {
        console.log(formValues.value);
        // setLoading(true);
    }, [formValues]);

    return (
        <div style={{
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <FormApp
                onSubmit={() => console.log(formValues)}
                validateForm={() => validateForm()}
                className='form-test'
            >
                <DatePickerApp
                    {...register("datepicker")}
                    placeholder='Fecha de prueba'
                    textAlign='center'
                    style='bottom-line'
                    maxToday
                />
                <InputApp
                    {
                    ...register("value", {
                        min: 5,
                        max: 10,
                        required: false,
                        type: 'number',
                        errorEvents: {
                            onMinError: "Perrrooo"
                        },
                    })
                    }
                    type='money'
                    placeholder='Ingresa Numero'
                    style='bottom-line'
                    textAlign='left'
                    fontSize='large'
                    errorOnPlaceholder
                />
                <InputApp
                    {
                    ...register("mount", {
                        min: 5,
                        max: 10,
                    })
                    }
                    type='percentage'
                    placeholder='Ingresa Porcentaje'
                    style='bottom-line'
                    textAlign='left'
                    fontSize='large'
                    defaultValue='50'
                    errorOnPlaceholder
                />
                <SelectApp
                    {...register('selector')}
                    options={["opcion 1", "opcion 2"]}
                    placeHolder='Test de select'
                    textAlign='center'
                    errorOnPlaceholder
                />
                <ButtonApp
                    validateSubmit
                    style='border-line'
                    disabled
                // actionStyle='cancel' 
                // buttonStyle={{
                //     backgroundColor: "black",
                //     textColor: "white",
                // }}
                icon={{
                    icon: deleteIcon,
                    // invertColor: true,
                }}
                >Boton</ButtonApp>


            </FormApp>
        </div>
    );
}

export default App;