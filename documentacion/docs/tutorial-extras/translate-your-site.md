---
sidebar_position: 2
---

# AÑADIR NUEVO GRUPO CONTABLE

## Importaciones

Las importaciones son los módulos y componentes externos utilizados en el componente `SidebarAddProvider`.

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

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports

import { useRouter } from 'next/router'

// ** Types Imports

import axios from 'axios'
```

## Tipos de Datos

El tipo de dato `SidebarAddUserType` define la estructura de los prop para el componente `SidebarAddProvider`. El tipo de dato UserData define la estructura de los datos del proveedor que se van a enviar al servidor.

```tsx
interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  assetCategory: string
  usefulLife: number
  asset: boolean
}
```

## Funciones de Utilidad

La función `showErrors `se utiliza para mostrar mensajes de error específicos para diferentes campos del formulario.

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

## Componente Header

El bloque `Header` define un componente estilizado utilizando la función styled de @mui/material. Este componente representa la cabecera del panel deslizable y tiene estilos personalizados.

```tsx
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))
```

## Esquema Schema

El bloque `schema` define un esquema de validación utilizando el paquete yup. Este esquema define las reglas de validación para los campos direction, phone y name del formulario.

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

El bloque `defaultValues` define los valores iniciales para los campos del formulario. En este caso, los campos son assetCategory, usefulLife y asset.

```tsx
const defaultValues = {
  assetCategory: '',
  usefulLife: 0,
  asset: true
}
```

## Componente SidebarAddProvider

El componente `SidebarAddProvider` es el componente principal que muestra el panel deslizable para agregar proveedores. Utiliza el estado para almacenar los valores de los campos del formulario y los errores de validación.

```tsx

const SidebarAddProvider = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props
  const [asset, setAsset] = useState<UserData>({
    assetCategory: '',
    usefulLife: 0,
    asset: true
  })

  // ** Hooks
  const {
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAsset({ ...asset, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ACTIVOS}depreciation-asset-list/`, asset)
      console.log(asset)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

```

## Despliegue para agregar un grupo contable

```tsx
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
        <Typography variant='h6'>Agregar Nuevo grupo contable</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='assetCategory'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.assetCategory}
                  label='Nombre'
                  placeholder=' '
                  error={Boolean(errors.assetCategory)}
                  helperText={errors.assetCategory?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='usefulLife'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.usefulLife}
                  label='usefulLife'
                  placeholder='78906547'
                  error={Boolean(errors.usefulLife)}
                  helperText={errors.usefulLife?.message}
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
