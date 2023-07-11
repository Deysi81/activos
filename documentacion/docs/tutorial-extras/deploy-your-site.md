---
sidebar_position: 5
---

# Editar Proveedores

## (edtprovider)

## SidebarEditProvider

El componente `SidebarEditProvider` es un componente de React que representa un panel deslizable para editar un proveedor existente. A continuación, se explican las variables, constantes y funciones utilizadas en este componente.

## IMPORTACIONES

Las importaciones son los módulos, componentes y funciones externas utilizadas en el componente `SidebarEditProvider`

```tsx
// ** React Imports
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'

import Button from '@mui/material/Button'

import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
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

## Tipos de datos

Estos son los tipos de datos utilizados en el componente `SidebarEditProvider`. Estos tipos de datos definen la estructura y las propiedades de los objetos utilizados en el componente.

```tsx
interface UserData {
  _id: string
  name: string
  phone: string
  address: string
}
```

### showErrors

`showErrors` es una función que toma el nombre de un campo, la longitud del valor y un valor mínimo y devuelve un mensaje de error basado en esas condiciones.

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

### Header

`Header` es un componente estilizado utilizando la función styled de MUI.
El componente Header es una caja que muestra un encabezado con contenido centrado.

````tsx
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))
```

### schema
`schema` es un objeto de validación definido utilizando yup```
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
````

## Componente SidebarEditAsset

```tsx
const SidebarEditProvider = (props: { providerId: string }) => {
  // ** Props
  // ** State
  const [state, setState] = useState<boolean>(false)
  const providerId = props.providerId
  const [asset, setAsset] = useState<UserData>({
    _id: '',
    name: '',
    phone: '',
    address: ''
  })
   const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState(open)
  }
```

Hook de formulario

- `reset`: Una función que restablece los campos del formulario a sus valores por defecto.
- `control`: Un objeto que contiene las funciones y el estado del formulario. Se utiliza para conectar los campos de entrada al formulario y gestionar su estado y validación
- `formState.errors`: Un objeto que contiene los errores de validación de los campos del formulario.

```tsx
const {
  reset,
  control,
  formState: { errors }
} = useForm({
  defaultValues,
  mode: 'onChange',
  resolver: yupResolver(schema)
})
```

### handleClose

handleClose es una función que se ejecuta cuando se cierra el panel lateral.
Recarga la página (window.location.reload()) y restablece los valores del formulario utilizando la función reset

```tsx
const handleClose = () => {
  window.location.reload() // 500 milisegundos (0.5 segundos)
  reset()
}
```

## FUNCIONES

- El hook `useEffect` se utiliza para ejecutar código después de que el componente se haya renderizado.
  En este caso, se utiliza para llamar a la función getData una vez, cuando el componente se monta.
- `getData` realiza una solicitud GET a la API para obtener los datos del proveedor especificado por su ID.
- Los datos obtenidos se establecen en el estado `asset` utilizando la función setAsset.

```tsx
useEffect(() => {
  getData()
}, [])
const getData = async () => {
  await axios
    .get<UserData>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}supplier/${providerId}`)
    .then(response => {
      console.log(response.data)
      setAsset(response.data)
    })
    .catch(error => {
      console.error(error)
    })
}
```

**Funciones manejadoras** de eventos utilizadas en el componente:

- `handleChange`: Maneja el cambio de valor en los campos de entrada del formulario. Actualiza el estado asset con los nuevos valores ingresados por el usuario.
- `handleSubmit`: Maneja el envío del formulario. Utiliza axios para realizar una solicitud HTTP PUT al servidor y actualizar los datos del activo con los valores del estado asset.

```tsx
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setAsset({ ...asset, [e.target.name]: e.target.value })
}

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()

  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_ACTIVOS}supplier/update/${providerId}`, asset)
    console.log(asset)
    console.log(response.data)
    handleClose()
  } catch (error) {
    console.error(error)
  }
}
```

```tsx
  return (
    <>
      <Button style={{ color: '#94bb68', borderRadius: '10px' }} onClick={toggleDrawer(true)}>
        <Icon icon='mdi:pencil-outline' fontSize={20} />
      </Button>
      <Drawer
        open={state}
        anchor='right'
        variant='temporary'
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 400, sm: 750 } } }}
      >
        <Header>
          <Typography variant='h6'>Agregar Proveedor</Typography>
          <IconButton size='small' onClick={toggleDrawer(false)} sx={{ color: 'text.primary' }}>
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
                    placeholder='Ruth'
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
                    placeholder='Av. Bolivar n°415'
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
    </>
  )
}

export default SidebarEditProvider

```
