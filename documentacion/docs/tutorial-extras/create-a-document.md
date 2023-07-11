---
sidebar_position: 2
---

# Agregar nuevos Proveedores

## (AddAssetDrawer)

El componente `SidebarAddProvider` es un componente de React que representa un panel deslizable para agregar un nuevo Proveedor. A continuación, se explican las variables, constantes y funciones utilizadas en este componente.

## Importaciones

- `React Imports:`
  Estas importaciones son necesarias para utilizar funciones y tipos relacionados con React, como el manejo de eventos de cambio y eventos de formulario, así como el uso del estado en componentes de función.
- `MUI Imports:`
  Estas importaciones son para los componentes de la biblioteca Material-UI utilizados en la interfaz de usuario. Proporcionan componentes como el panel deslizante (Drawer), botón (Button), campo de texto (TextField), botón de icono (IconButton), tipografía (Typography), contenedor (Box) y control de formulario (FormControl).
  `Third Party Imports:`
  Estas importaciones corresponden a bibliotecas y funciones de terceros utilizadas en la aplicación: `yup` es una biblioteca de validación de formularios que se utiliza junto con yupResolver para definir esquemas de validación.
  `useForm` y Controller son funciones proporcionadas por react-hook-form que se utilizan para el manejo de formularios y campos de formulario respectivamente.
  `axios` es una biblioteca utilizada para realizar solicitudes HTTP en la aplicación.

```tsx
// ** React Imports
import { ChangeEvent, FormEvent, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'
```

## TIPOS DE DATOS

Estos son los tipos de datos utilizados en el componente SidebarAddProvider. Estos tipos de datos definen la estructura y las propiedades de los objetos utilizados en el componente.

```tsx
interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  name: string
  phone: string
  address: string
}
```

## FUNCIONES AUXILIARES

La función `showErrors` es una función auxiliar que toma un campo, la longitud de su valor y una longitud mínima requerida, y devuelve un mensaje de error si es necesario. Esta función se utiliza para mostrar mensajes de error de validación en el formulario.

```tsx
const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}
```

## ESTILOS

El objeto `Header` es un estilo personalizado creado utilizando el componente `styled` de Material-UI. Define los estilos para el encabezado del panel deslizable

```tsx
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))
```

## ESQUEMA DE VALIDACION

El objeto `schema` define las reglas de validación utilizando el módulo yup. Estas reglas se utilizan para validar los campos del formulario.

```tsx
const schema = yup.object().shape({
  direction: yup.string().required(),
  phone: yup
    .string()
    .typeError('')
    .min(10, obj => showErrors('Celular', obj.value.length, obj.min))
    .required(),
  name: yup
    .string()
    .min(3, obj => showErrors('Nombre', obj.value.length, obj.min))
    .required()
})
```

## Valores por defecto

El objeto `defaultValues` contiene los valores por defecto para los campos del formulario.

```tsx
const defaultValues = {
  name: '',
  phone: '',
  address: ''
}
```

## COMPONENTES

### Componente SidebarAddProvider

El componente `SidebarAddProvider` es el componente principal que representa el panel deslizable para agregar un nuevo Proveedor. Este componente incluye todo el formulario y la lógica necesaria para interactuar con él.

```tsx
const SidebarAddProvider = (props: SidebarAddUserType) => {
  // ** Props y estado
  // ** Props
  const { open, toggle } = props

  // ** State
  const [asset, setAsset] = useState<UserData>({
    name: '',
    phone: '',
    address: ''
  })
  // ** Hook de formulario
  const {
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // ** Función para cerrar el panel deslizable
  const handleSave = async (asset: UserData) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_ACTIVOS}supplier/`, asset)
      .then(response => {
        console.log(response.data)
        toggle()
        reset()
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleClose = () => {
    window.location.reload()
    toggle()
    reset()
  }

  // ** Manejador de cambio de campo
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAsset({ ...asset, [e.target.name]: e.target.value })
  }

  // ** Manejador de envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ACTIVOS}supplier/`, asset)
      console.log(asset)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
```

- La función `return` muestra el componente
  - `Drawer` que representa el panel deslizante.
  - `open, anchor y variant` son propiedades del Drawer que controlan su apertura, posición y variante respectivamente.
  - `onClose={handleClose}` se ejecuta cuando se cierra el panel deslizante y llama a la función handleClose
  - `Controller` es un componente proporcionado por react-hook-form para conectar campos de entrada controlados.
  - `TextField` es un componente de campo de texto de Material-UI utilizado para la entrada de datos.
  - El cierre del panel deslizante y el restablecimiento del formulario se manejan en la función `handleClose`

```tsx
  // ** Renderizado del componente
  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 400, sm: 750 } } }}
    >
      <Header>
        <Typography variant='h6'>Agregar Proveedor</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.name}
                  label='Nombre'
                  placeholder='Juan'
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.phone}
                  label='Celular'
                  placeholder='78906547'
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.address}
                  label='Dirección'
                  placeholder='Calle La Paz n°415'
                  error={Boolean(errors.address)}
                  helperText={errors.address?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleClose}>
              Aceptar
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddProvider
```
