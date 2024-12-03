import { useEffect, useState } from 'react';
import { InputApp, FormApp, useLoading, FormAppProvider, useFormApp, DatePickerApp, ButtonApp, SelectApp, CheckBoxApp, InputMoneyApp } from "@juandland/appdland-ui"
import deleteIcon from "./delete.png";
import "./App.css";



interface formValsInt {
    datepicker: string;
    value: number;
    mount: number;
}

const Custom = () => {
    const { register, formValues } = useFormApp();

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);


    return (
        <InputApp
            {...register("nombre", { type: "string", min: 5, max: 30 })}
            type='text'
            placeholder='Ingresa tu nombre'
        />
    )
}
function App() {
    return (
        <FormAppProvider>
            <Form />
        </FormAppProvider>
    );
}

const Form = () => {

    const { setLoading } = useLoading();
    const [check, setCheck] = useState(false);


    const { register, validateForm, form, formValues, setForm } = useFormApp();

    return (
        <FormApp onSubmit={(values) => console.log(values)}>
            <Custom />
            <DatePickerApp
                {...register("datepicker")}
                placeholder='Fecha de prueba'
                maxToday
                errorBelowDate
                errorMessage='error de prueba'
            />
            <InputApp
                {...register("cel", { type: "number" })}
                type='tel'
                style={{
                    type: "bottom-line",
                    textAlign: "center"
                }}
                placeholder='Ingresa Porcentaje este es un texto largo'
                child={
                    <div style={{ width: "100%" }}>
                        <img alt='' src={deleteIcon} style={{ width: "100%" }} />

                        <input type='text' />
                    </div>
                }
            // capitalize
            />
            <InputMoneyApp
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
                placeholder='Ingresa Numero'
                style={{
                    type: "bottom-line",
                    textAlign: "center"
                }}
                defaultValue='5555'
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
                placeholder='Ingresa Porcentaje este es un texto largo de prueba para testear'
                style={{
                    type: "bottom-line",
                    textAlign: "center"
                }}
                // defaultValue='4'
                errorOnPlaceholder
            />
            <SelectApp
                {...register('select')}
                options={['Nequi', 'Transferencia Argentina prueba de texto largo', 'opcion3']}
                placeholder='Envías muchos pesos'
                style={{
                    type: "box",
                    textAlign: "right",
                    placeholderColor: "#004E77",
                    blurPlaceholderColor: "#004E77",
                    color: "#004E77",
                    blurColor: "#004E77",
                    arrowColor: "#004E77",
                    showPlaceHolderOnFocus: false,
                }}
                optionsStyle={{
                    showPlaceholderOnList: true,
                    scrollThumbColor: "#004E77",
                    maxItems: 3
                }}
                errorBelowSelect
            />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100px" }}>
                <SelectApp
                    {...register('select2')}
                    options={[{ label: 'Cedula de ciudadania', value: 'CC', extra: 'CC' }, { label: 'Codu', value: 'CE', extra: 'CC' }]}
                    placeholder='un placeholder largo'
                    // defaultValue='CC'
                    errorBelowSelect
                />
            </div>
            <CheckBoxApp
                onChange={val => setCheck(val)}
                value={check}
                label='Codigo'
                style={{
                    color: "#004E77"
                }}
            />


            <div style={{ borderStyle: "solid", width: "100px" }}>
                <SelectApp
                    {...register('select')}
                    options={['hola', 'adios']}
                    style={{
                        type: 'bottom-line',
                        textAlign: "left"
                    }}
                    placeholder='Este va ser un placeholder largo para manejar el texto detras de la felcha'
                />
            </div>


            <ButtonApp
                validateSubmit
                style={{
                    type: "solid",
                    backgroundColor: "blue",
                    borderColor: "red",
                    textColor: "white"
                }}
            // actionStyle='cancel' 
            // icon={{
            //     icon: deleteIcon,
            //     // invertColor: true,
            // }}
            >Boton</ButtonApp>
        </FormApp>
    )
}

export default App;