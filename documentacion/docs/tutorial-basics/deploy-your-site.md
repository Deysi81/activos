---
sidebar_position: 5
---

# Editar Activos

## (edtAsset)

## SidebarEditAsset

El componente `SidebarEditAsset` es un componente de React que representa un panel deslizable para editar un activo existente. A continuación, se explican las variables, constantes y funciones utilizadas en este componente.

## IMPORTACIONES

Las importaciones son los módulos, componentes y funciones externas utilizadas en el componente `SidebarEditAsset`

```tsx
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react'

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
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import axios from 'axios'
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
```

## Tipos de datos

Estos son los tipos de datos utilizados en el componente `SidebarEditAsset`. Estos tipos de datos definen la estructura y las propiedades de los objetos utilizados en el componente.

```tsx
interface UserData {
  _id: string
  name: string
  description: string
  responsible: string
  supplier: string
  location: string
  price: number
  dateAcquisition: Date
  warrantyExpirationDate: Date
  typeCategoryAsset: string
  file: string
}

interface assetCategory {
  _id: string
  assetCategory: string
}
```

## Valores por defecto

El objeto `defaultValues` contiene los valores por defecto para los campos del formulario.

```tsx
const defaultValues = {
  _id: '',
  name: '',
  description: '',
  responsible: '',
  supplier: '',
  location: '',
  price: 0,
  dateAcquisition: new Date('2023-06-27T15:10:58.870'),
  warrantyExpirationDate: new Date('2023-06-27T15:10:58.870'),
  file: '',
  typeCategoryAsset: ''
}
```

## Componente SidebarEditAsset

El componente `SidebarEditAsset` es una función de componente de React que acepta un objeto de props `props` con una propiedad providerId de tipo `string`. El prop `providerId` se asigna a una constante llamada `providerId` para su posterior uso.
El componente utiliza el estado para controlar diferentes valores. En este caso, se utilizan las siguientes variables de estado:

- `image`: Un estado que almacena un objeto File o null, utilizado para almacenar una imagen seleccionada.
- `state`: Un estado booleano que indica si el panel deslizable está abierto `(true)` o cerrado `(false)`.
- `previewfile`: Un estado que almacena una cadena de texto que representa la vista previa de un archivo de imagen o null si no hay ninguna vista previa.
- `asset`: Un estado que almacena un objeto UserData que representa los datos del activo que se está editando. Se inicializa con los valores por defecto definidos en el objeto `defaultValues`.

```tsx
const SidebarEditAsset = (props: { providerId: string }) => {
  // ** Props
  const providerId = props.providerId

  // ** State
  const [image, setImage] = useState<File | null>(null)
  const [state, setState] = useState<boolean>(false)
  const [groupContable, setGroupContable] = useState<assetCategory[]>([])
  const [previewfile, setPreviewfile] = useState<string | null>(null)
  const [asset, setAsset] = useState<UserData>(defaultValues)
  // ...
}
```

La constante `Header` es un componente estilizado creado con la función `styled` de Material-UI. Utiliza el componente Box de Material-UI para crear un contenedor con estilos personalizados para el encabezado del panel deslizable. Los estilos se definen utilizando el objeto de tema `(theme)` y se aplican al componente `Box`.

```tsx
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

//La función toggleDrawer es un manejador de eventos utilizado para abrir o cerrar el panel deslizable. Toma un parámetro open de tipo booleano que indica si el panel deslizable debe abrirse o cerrarse.
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
  mode: 'onChange'
})
```

## FUNCIONES

La función `getData` es una función asincrónica que se utiliza para obtener los datos del activo que se está editando. Utiliza `axios` para realizar una solicitud HTTP GET al servidor y obtiene los datos del activo basado en el `providerId`. Los datos obtenidos se actualizan en el estado `asset` utilizando la función `setAsset`.

```tsx
const getData = async () => {
  await axios
    .get<UserData>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/${providerId}`)
    .then(response => {
      console.log('edit data' + response.data)
      setAsset(response.data)
      console.log('edit data2' + asset)
    })
    .catch(error => {
      console.error(error)
    })
}

useEffect(() => {
  getData()
  getAsset()
}, [])
```

**Funciones manejadoras** de eventos utilizadas en el componente:

- `handleChange`: Maneja el cambio de valor en los campos de entrada del formulario. Actualiza el estado asset con los nuevos valores ingresados por el usuario.
- `handlefileChange`: Maneja el cambio de archivo en el campo de entrada de archivo. Actualiza el estado asset con la imagen seleccionada y muestra una vista previa de la imagen.
- `handleSubmit`: Maneja el envío del formulario. Utiliza axios para realizar una solicitud HTTP PUT al servidor y actualizar los datos del activo con los valores del estado asset.
- `handleCategoryChange`: Maneja el cambio de categoría en el campo de selección de categoría. Actualiza el estado asset con el valor de categoría seleccionado por el usuario.

```tsx
//  Manejador de cambio de campo
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value)
  setAsset({ ...asset, [e.target.name]: e.target.value })
}

//VIZUALIZAR IMAGENES -> Manejador de cambio de archivo
const handlefileChange = (e: ChangeEvent<HTMLInputElement>) => {
  const reader = new FileReader()
  reader.onload = function () {
    if (reader.readyState === 2) {
      const formattedDate = new Date().toISOString()

      setAsset
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
//  Manejador de envío del formulario
const handleSubmit = async () => {
  //console.log(file)
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/${asset._id}`, {
      name: asset.name,
      description: asset.description,
      responsible: asset.responsible,
      supplier: asset.supplier,
      location: asset.location,
      price: asset.price,
      dateAcquisition: asset.dateAcquisition,
      warrantyExpirationDate: asset.warrantyExpirationDate,
      file: asset.file,
      typeCategoryAsset: asset.typeCategoryAsset
    })
    console.log(asset)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
//  Manejador de cambio de categoría
function handleCategoryChange(event: SelectChangeEvent<string>, child: ReactNode): void {
  setAsset({ ...asset, typeCategoryAsset: event.target.value as string })
}
```

**Funciones auxiliares** utilizadas en el componente:

- `convertBase64ToImageUrl`: Convierte una cadena de texto base64 en una URL de imagen válida. Se utiliza para mostrar una vista previa de la imagen seleccionada en el formulario.
- `getAsset`: Obtiene las categorías de activos desde el servidor utilizando `axios` y actualiza el estado `groupContable` con los datos obtenidos.

```tsx
//  Conversión de base64 a URL de imagen
const convertBase64ToImageUrl = (base64String: string) => {
  return `data:image/png;base64,${base64String}`
}

const getAsset = async () => {
  try {
    const response = await axios.get<assetCategory[]>(`http://10.10.214.219:8080/depreciation-asset-list`)
    setGroupContable(response.data)
  } catch (error) {
    console.error(error)
  }
}
```

- El componente `<Drawer>` de Material-UI se utiliza para representar el panel deslizable.
- El prop `open` se establece en el estado `state` para controlar si el panel está abierto o cerrado.
- Los props `anchor` y `variant` configuran la posición y el estilo del panel deslizable.
- El prop `onClose` se establece para cambiar el estado `state` a `false` cuando se cierra el panel.
- El prop `ModalProps` se utiliza para mantener montado el componente modal del panel. El prop sx configura el ancho del panel deslizable en diferentes tamaños de pantalla.

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
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500, md: 800, lg: 1000 } } }}
      >
        <Header>
          <Typography variant='h6'>Editar Activo</Typography>
          <IconButton size='small' onClick={toggleDrawer(false)} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        <Box sx={{ p: 5 }}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 6 }} style={{ borderRadius: '50%', textAlign: 'center' }}>
              <Controller
                name='file'
                control={control}
                render={({ field }) => (
                  <div>
                    <img
                      src={convertBase64ToImageUrl(asset.file)}
                      alt='Imagen actual del activo'
                      width={200}
                      height={200}
                      style={{ borderRadius: '50%', textAlign: 'center' }}
                    />
                  </div>
                )}
              />
            </FormControl>

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
                    placeholder=''
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
                name='description'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={asset.description}
                    label='Descripción'
                    placeholder=' '
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                    onChange={handleChange}
                    autoComplete='off'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='responsible'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={asset.responsible}
                    label='Responsable'
                    placeholder=' '
                    error={Boolean(errors.responsible)}
                    helperText={errors.responsible?.message}
                    onChange={handleChange}
                    autoComplete='off'
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='supplier'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={asset.supplier}
                    label='Proveedor'
                    placeholder=' '
                    error={Boolean(errors.supplier)}
                    helperText={errors.supplier?.message}
                    onChange={handleChange}
                    autoComplete='off'
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='location'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={asset.location}
                    label='Ubicación'
                    placeholder=' '
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
            </FormControl>
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
            <FormControl fullWidth sx={{ mb: 6 }}>
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

            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='typeCategoryAsset'>Categoría</InputLabel>
              <Select
                labelId='typeCategoryAsset-label'
                id='typeCategoryAsset'
                value={asset.typeCategoryAsset}
                onChange={handleCategoryChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                autoComplete='off'
              >
                {groupContable?.map(asset => (
                  <MenuItem key={asset._id} value={asset.assetCategory}>
                    {asset.assetCategory}
                  </MenuItem>
                ))}
              </Select>
                
            </FormControl>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
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

export default SidebarEditAsset
```
