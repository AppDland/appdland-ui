import { useEffect, useState } from 'react';
import { InputApp, FormApp, FormAppProvider, useFormApp, DatePickerApp, ButtonApp, SelectApp, CheckBoxApp, InputMoneyApp, SelectListApp } from "appdland-ui"
import deleteIcon from "./delete.png";
import "./App.css";



interface formValsInt {
    datepicker: string;
    value: number;
    mount: number;
}

const Custom = () => {
    const { register, formValues, setForm } = useFormApp();

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

    useEffect(() => {
        // setForm('nombre', 'hola')
    }, [])

    return (
        <InputApp
            {...register("nombre", { type: "string", min: 5, max: 30 })}
            type='text'
            placeholder='Ingresa tu nombre'
            capitalize
            style={{
                type: 'bottom-line',
                borderRadius: 10,
                textAlign: "center",
                // placholderTop: true,
                // backgroundColor: "red"
            }}
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

    const [check, setCheck] = useState(false);


    const { register, validateForm, form, formValues, setForm } = useFormApp<formValsInt>();
    const [list, setList] = useState<string[]>([]);

    return (
        <FormApp onSubmit={(values) => console.log(values)}>
            <Custom />
            <DatePickerApp
                {...register("datepicker")}
                placeholder='Fecha de prueba'
                maxToday
                errorBelowDate
                errorMessage='error de prueba'
                style={{
                    type: "box",
                    backgroundColor: "transparent",
                    color: "#B3E0CB",
                    blurColor: '#378064',
                    placeholderColor: '#B3E0CB',
                    blurPlaceholderColor: '#378064',
                    textAlign: "center",
                    borderRadius: 20,
                }}
                defaultValue='2025-02-04'
            />
            <InputApp
                {...register("cel", { type: "string" })}
                type='text'
                style={{
                    type: "bottom-line",
                    // textAlign: "center"
                }}
                // defaultValue='hola'
                placeholder='Ingresa Porcentaje este es un texto largo'
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
                    type: 'bottom-line',
                    background: "transparent",
                    textAlign: "center",
                    blurColor: '#378064',
                    blurPlaceholderColor: 'blue',
                    color: "#B3E0CB",
                    placeholderColor: 'blue',
                    placholderTop: true,
                }}
                defaultValue='5555.55'
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

            <SelectListApp
                options={[
                    { value: 'hola', label: 'hola' },
                    { value: 'adios', label: 'adios' },
                    { value: 'chao', label: 'chao' },
                ]}
                value={list}
                onChange={val => setList(val)}
                placeholder='Selecciona un elemento de la lista'
                style={{
                    deleteIconColor: 'red',
                    backgroundColor: 'green',
                    color: 'white',
                }}
            />


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