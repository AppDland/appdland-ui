<h1 align="center">AppDland UI</h1>

<p>Todos los componentes UI estandarizados para usar en AppDland</p>

<p align="left">
<img src="https://img.shields.io/badge/STATUS-EN%20DESARROLLO-green">
</p>

## Índice

- [Instalación](#instalación)
- [Formulario](#formulario)
  - [Contexto FormAppProvider](#contexto-formappprovider)
  - [FormApp](#formapp)
  - [useFormApp](#useformapp)
  - [Formulario Ejemplo Completo](#formulario-ejemplo-completo)

### Instalación

Primero, instala la librería `AppDland UI`:

```bash
npm install appdland-ui
```

### FORMULARIO
Su principal funcionalidad es automatizar las validaciones sobre los inputs, acortando asi una buena parte de código.
Está pensado para trabajar con los inputs de esta misma libreria, ya que su metodo **register** entrega atributos con nombres especificos que podrían no funcionar en otros componentes.
### Contexto ***FormAppProvider***
El componente formulario se ha construido como un contexto para permitir el uso de sus atributos a lo largo de varios componentes, muy útil en caso de formularios extensos.
- Ejemplo
```javascript
import { FormAppProvider } from "appdland-ui";

function App() {
    return (
        <FormAppProvider>
            {...}
        </FormAppProvider>
    );
}

export default App;
```
### FormApp
Este componente es quien finalmente recibe el contenido del formulario y los atributos de validacion y confirmacion.
- Ejemplo
```javascript
import { FormApp } from "appdland-ui";

const MyForm = () => {
    return (
        <FormApp onSubmit={(values) => console.log(values)}>
            {...}
        </FormApp>
    )
}

export default MyForm
```
### useFormApp
Este custom hook permite registrar inputs en el formulario y configurar sus atributos para las validaciones. Los valores del formulario se pueden extraer del estado formValues o como argumento de onSubmit.
- Ejemplo
```javascript
import { useFormApp, InputApp } from "appdland-ui";

const MyForm = () => {
    const { register, formValues } = useFormApp();

    return (
        <FormApp onSubmit={(values) => console.log(values)}>
            <InputApp
                {...register("nombre", { type: "string", min: 5, max: 30 })}
                type='text'
                placeholder='Ingresa tu nombre'
            />
        </FormApp>
    )
}

export default MyForm;
```
### Formulario Ejemplo Completo
```javascript
import { FormAppProvider } from "appdland-ui";
import axios from "axios";

function App() {
    return (
        <FormAppProvider>
            <MyForm />
        </FormAppProvider>
    );
}

const MyForm = () => {
    const { register, formValues } = useFormApp();

    const handleSubmit = () => {
        //simulamos un api post
        axios.post("url", {
            userInfo: {
                userName: formValues.nombre
            }
        })
            .then(() => console.log("post ok"))
            .catch((error) => console.log(error))
    }

    return (
        <FormApp onSubmit={handleSubmit}>
            <InputApp
                {...register("nombre", { type: "string", min: 5, max: 30 })}
                type='text'
                placeholder='Ingresa tu nombre'
            />
        </FormApp>
    )
}

export default App;
```