---
sidebar_position: 2
---

# Agregar nuevos activos

## (AddAssetDrawer)

El componente `SidebarAddProvider` es un componente de React que representa un panel deslizable para agregar un nuevo activo. A continuación, se explican las variables, constantes y funciones utilizadas en este componente.

## Importaciones

Las importaciones son los módulos, componentes y funciones externas utilizadas en el componente `SidebarAddProvider`

```tsx
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import { Select, SelectChangeEvent, MenuItem } from '@mui/material'
import React from 'react'
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
  description: string
  responsible: string
  price: number
  supplier: string
  location: string
  dateAcquisition: Date
  warrantyExpirationDate: Date
  file: string
  typeCategoryAsset: string
}

interface AssetCategory {
  _id: string
  assetCategory: string
}

interface Supplier {
  _id: string
  name: string
}

interface Responsible {
  _id: string
  name: string
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
  responsible: yup.string().required(),
  supplier: yup.string().required(),
  location: yup.string().required(),
  typeCategoryAsset: yup.string().required(),
  dateAcquisition: yup.string().required(),
  warrantyExpirationDate: yup.string().required(),
  name: yup
    .string()
    .min(3, obj => showErrors('Nombre', obj.value.length, obj.min))
    .matches(/^[A-Za-z ]*$/, 'El nombre solo puede contener letras')
    .required(),
  price: yup.number().moreThan(0, 'El valor debe ser mayor que cero').required()
})
```

## Valores por defecto

El objeto `defaultValues` contiene los valores por defecto para los campos del formulario.

```tsx
const defaultValues = {
  name: '',
  description: '',
  responsible: '',
  price: 0,
  supplier: '',
  location: '',
  dateAcquisition: '',
  warrantyExpirationDate: new Date('2023-07-27T15:10:58.870'),
  file: '',
  typeCategoryAsset: ''
}
```

## COMPONENTES

### Componente SidebarAddProvider

El componente `SidebarAddProvider` es el componente principal que representa el panel deslizable para agregar un nuevo activo. Este componente incluye todo el formulario y la lógica necesaria para interactuar con él.

```tsx
const SidebarAddProvider = (props: SidebarAddUserType) => {
  // ** Props y estado
  const { open, toggle } = props
  const [previewfile, setPreviewfile] = useState<string | null>(null)
  const [groupContable, setGroupContable] = React.useState<AssetCategory[]>([])
  const [groupprovider, setGroupprovider] = useState<Supplier[]>()
  const [responsible, setResponsible] = useState<Supplier[]>()
  const [asset, setAsset] = useState<UserData>(defaultValues)

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
  const handleClose = () => {
    window.location.reload()
    toggle()
    reset()
  }

  // ** Efecto de montaje del componente
  useEffect(() => {
    getAsset()
    getsupplier()
    getResponsible()
  }, [])

  // ** Manejador de cambio de campo
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAsset(prevAsset => ({ ...prevAsset, [name]: value }))
  }

  // ** Manejador de cambio de archivo
  const handlefileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = function () {
      if (reader.readyState === 2) {
        const formattedDate = new Date().toISOString()
        setAsset({ ...asset, file: reader.result as string })
        setPreviewfile(reader.result as string)
      }
    }
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files)
      reader.readAsDataURL(e.target.files[0])
      console.log('' + previewfile)
    }
  }

  // ** Manejador de envío del formulario
  const handleSubmit = async () => {
    try {
      console.log(asset.warrantyExpirationDate)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/`, asset)
      console.log(asset.warrantyExpirationDate)
      console.log(asset.name)
      console.logasset.description)
      console.log(asset.supplier)
      console.log(response.data)
      console.log(asset.typeCategoryAsset)
    } catch (error) {
      console.error(error)
    }
  }

  // ** Manejador de cambio de categoría
  const handleCategoryChange = (e: ChangeEvent<{ value: unknown }>) => {
    setAsset({ ...asset, typeCategoryAsset: e.target.value as string })
  }

  // ** Obtener categorías de activos
  const getAsset = async () => {
    try {
      console.log(asset.warrantyExpirationDate)
      const response = await axios.get<AssetCategory[]>(`http://10.10.214.219:8080/depreciation-asset-list`)
      setGroupContable(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // ** Manejador de cambio de proveedor
  const handleProviderChange = (e: ChangeEvent<{ value: unknown }>) => {
    setAsset({ ...asset, supplier: e.target.value as string })
  }

  // ** Obtener proveedores
  const getsupplier = async () => {
    try {
      const response = await axios.get<Supplier[]>(`http://10.10.214.219:8080/supplier`)
      setGroupprovider(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // ** Manejador de cambio de responsable
  const handleResponsibleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setAsset({ ...asset, responsible: e.target.value as string })
  }

  // ** Obtener responsables
  const getResponsible = async () => {
    try {
      const response = await axios.get<Responsible[]>(`http://10.10.214.219:3300/api/personal`)
      setResponsible(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // ** Renderizado del componente

return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500, md: 800, lg: 1000 } } }}
    >
      <Header>
        <Typography variant='h6'>Agregar Nuevo Activo</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <label htmlFor='file'>Imagen</label>
            <input type='file' id='file' name='file' onChange={handlefileChange} />
            <div style={{ textAlign: 'center' }}>
              {previewfile && (
                <img
                  src={previewfile}
                  alt='Preview'
                  style={{ maxWidth: '250px', maxHeight: '250px', borderRadius: '50%' }}
                />
              )}
            </div>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.name}
                  label='Nombre'
                  placeholder='Nombre del Activo'
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.description}
                  label='Descripcion'
                  placeholder='descripcion'
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 0.1 }}>
            <Typography variant='body2' gutterBottom>
              Responsable
            </Typography>
            <Select
              value={asset.responsible}
              onChange={handleResponsibleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              autoComplete='off'
            >
              {responsible?.map(asset => (
                <MenuItem key={asset._id} value={asset.name}>
                  {asset.name}
                </MenuItem>
              ))}
            </Select>
              
          </FormControl>
          <FormControl fullWidth sx={{ mb: 0.1 }}>
            <Typography variant='body2' gutterBottom>
              Proveedor
            </Typography>
            <Select
              value={asset.supplier}
              onChange={handleProviderChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
              autoComplete='off'
            >
              {groupprovider?.map(asset => (
                <MenuItem key={asset._id} value={asset.name}>
                  {asset.name}
                </MenuItem>
              ))}
            </Select>
              
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='location'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.location}
                  label='Ubicacion'
                  placeholder=''
                  error={Boolean(errors.location)}
                  helperText={errors.location?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='price'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.price}
                  label='Precio'
                  placeholder=' '
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>{' '}
          <Typography variant='body2' gutterBottom>
            Fecha de Adquisicion
          </Typography>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dateAcquisition'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='datetime-local'
                  value={asset.dateAcquisition}
                  placeholder=' '
                  error={Boolean(errors.dateAcquisition)}
                  helperText={errors.dateAcquisition?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>
          <Typography variant='body2' gutterBottom>
            Fecha de expiración de la garantía
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name='warrantyExpirationDate'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='datetime-local'
                  value={asset.warrantyExpirationDate}
                  placeholder=' '
                  error={Boolean(errors.warrantyExpirationDate)}
                  helperText={errors.warrantyExpirationDate?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <Typography variant='body2' gutterBottom>
              Categoría
            </Typography>
            <Autocomplete
              options={groupContable}
              getOptionLabel={option => option.assetCategory}
              value={groupContable.find(option => option.assetCategory === asset.typeCategoryAsset) || null}
              onChange={(event, newValue) => {
                setAsset({ ...asset, typeCategoryAsset: newValue?.assetCategory || '' })
              }}
              renderInput={params => <TextField {...params} label='' />}
            />
          </FormControl>
            
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='outlined' onClick={handleClose} sx={{ mr: 3 }}>
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

export default SidebarAddAsset

```

### Componente ComboBox

El componente `ComboBox` es una función que devuelve un componente `Autocomplete` de Material-UI para seleccionar una categoría de activo. Recibe un arreglo de categorías de activos y renderiza el componente con las opciones proporcionadas.

```tsx
export function ComboBox(category: AssetCategory[]) {
  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={category}
      sx={{ width: 300 }}
      renderInput={params => <TextField {...params} label='Movie' />}
    />
  )
}
```
