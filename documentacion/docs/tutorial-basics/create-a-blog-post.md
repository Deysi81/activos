---
sidebar_position: 3
---

# Lista de activos

Tendremos os siguientes componentes:

### ASSET

El componente `asset.tsx` es responsable de mostrar una lista de los activos y proporcionar funcionalidades para agregar, editar y eliminar

#### PROPS

Nombres de los props

- `Asset`:(obligatorio) Un array de objetosw que representa los tados de los Activos:cada objeto debe tener las siguientes propiedades:
  - `_id`: string
  - `name`: string
  - `description`: string
  - `responsible`: string
  - `supplier`: string
  - `location`: string
  - `price`: number
  - `dateAcquisition`: Date
  - `warrantyExpirationDate`: Date
  - `isDeleted`: boolean
  - `depreciatedValue`: number
  - `typeCategoryAsset`: string
  - `ufv3`: number
  - `ufv4`: number
  - `file`: string

#### IMPORTACIONES

El componente utiliza varias importaciones de modulos y librerias. Aqui tienes una descripcion de cada una de ellas:

- useState, useEffect: Estos hooks te permiten agregar y administrar el estado y los efectos secundarios en tus componentes de manera declarativa y fácil de entender.

  ```tsx
  import React, { useState, useEffect } from 'react'
  ```

- Button, TableCell, TableRow, TableBody, TableContainer, Table, TableHead, ButtonGroup, Paper, Tooltip, TooltipProps, styled, tooltipClassest:

  Estos son solo algunos de los componentes y conceptos que mencionaste. Material-UI es una biblioteca popular de componentes de interfaz de usuario para React que proporciona una amplia variedad de componentes y utilidades para crear interfaces atractivas y receptivas. Puedes consultar la documentación oficial de Material-UI para obtener más información y ejemplos detallados sobre cómo utilizar estos componentes y conceptos en tu aplicación.

  ```tsx
  import {
    Button,
    TableCell,
    TableRow,
    TableBody,
    TableContainer,
    Table,
    TableHead,
    ButtonGroup,
    Paper,
    Tooltip,
    TooltipProps,
    styled,
    tooltipClasses
  } from '@mui/material'
  ```

  masss

#### INTERFACES

El componente utiliza dos interfaces para definir el tipo de datos del documentos y el tipo de celda en la cuadricula de los datos

- Asset: define la estructura de los datos de un documento. Tiene propiedades como ser:
  ```tsx
  interface Asset {
    _id: string
    name: string
    description: string
    responsible: string
    supplier: string
    location: string
    price: number
    dateAcquisition: Date
    warrantyExpirationDate: Date
    isDeleted: boolean
    depreciatedValue: number
    typeCategoryAsset: string
    ufv3: number
    ufv4: number
    file: string
  }
  ```

#### VARIABLES

Componente que muestra una lista de activos.

```tsx
 const AssetList: React.FC = () => {
```

Dentro de este componente tenemos:

- Estado para almacenar la lista de activos **const [assets, setAssets] = useState<Asset[]>([])**
- Estado para almacenar una lista de fechas **const [dates] = useState<string[]>([])**
- Estado para controlar la apertura o cierre del panel para agregar un activo **const [addAssetOpen**, **setAddAssetOpen]**
- Función para alternar el estado de apertura o cierre del panel **const toggleAddAssetDrawer = () => setAddAssetOpen(!addAssetOpen)**
- Obtener las configuraciones del componente **const{settings } = useSettings(), const { mode } = settings**

  ```tsx
  const [assets, setAssets] = useState<Asset[]>([])
  const [dates] = useState<string[]>([])
  const [addAssetOpen, setAddAssetOpen] = useState<boolean>(false)
  const toggleAddAssetDrawer = () => setAddAssetOpen(!addAssetOpen)
  const { settings } = useSettings()
  const { mode } = settings
  ```

#### FUNCIONES DE UTILIDAD

Incluyen como ser:

- Función para realizar una solicitud GET y obtener la lista de activos
  ```tsx
  const fetchData = () => {
    axios
      .get<Asset[]>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/`)
      .then(response => {
        // Filtrar los activos eliminados de la respuesta
        const filteredAssets: Asset[] = response.data.filter(asset => !asset.isDeleted)
        setAssets(filteredAssets)
      })
      .catch(error => {
        console.error(error)
      })
  }
  ```
- Función para manejar la eliminación de un activo
  ```tsx
  const handleDelete = async (id: string) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/${id}`)
      .then(response => {
        fetchData() // Volver a obtener la lista de activos después de la eliminación exitosa
      })
      .catch(error => {
        console.error(error)
      })
  }
  ```
- Función para convertir una cadena de base64 a una URL de imagen
  ConvertBase64ToImageUrl: convierte una imagen cualquiera a base64.

```tsx
const convertBase64ToImageUrl = (base64String: string) => {
  return `data:image/png;base64,${base64String}`
}
```

#### COMPONENTE

- Definir un componente Tooltip personalizado utilizando el estilo proporcionado por el tema de Material-UI

```tsx
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))
```

#### ESTILO

- Estilo del encabezado de la tabla basado en el modo (light o dark) configurado en el componente

```tsx
const headerStyle = {
  backgroundColor: mode === 'light' ? '#8c90f0' : '#5a5c75',
  color: mode === 'light' ? 'black' : 'white',
  fontFamily: 'Roboto, Arial, sans-serif'
}
```

- Retorna la estructura
  En esta sección, se renderiza una estructura de tabla con las cabeceras de las columnas para mostrar la información de los activos. Cada celda de la tabla se alinea al centro (textAlign: 'center'), y se aplica un estilo personalizado (headerStyle) al encabezado.

```tsx
return (
  <>
    <Button onClick={toggleAddAssetDrawer}>NUEVO Activo</Button>
    <AddAssetDrawer open={addAssetOpen} toggle={toggleAddAssetDrawer} />

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead style={headerStyle}>
          <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Imagen
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Nombre
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Descripción
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Responsable
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Proveedor
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Ubicación
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Precio
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Fecha de adquisición
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Fecha de expiración
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Valor Depreciado
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              Tipo de Categoria
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              UFV3
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              UFV4
            </TableCell>
            <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
              ACCIONES
            </TableCell>
          </TableRow>
        </TableHead>

```

- En esta sección, se utiliza el método **map** para iterar sobre la lista de activos (assets) y generar las filas de la tabla con la información de cada activo. Cada fila contiene celdas con la imagen del activo, el nombre, la descripción, el responsable, el proveedor, la ubicación, el precio, la fecha de adquisición, la fecha de expiración, el valor depreciado, la categoría, las columnas de UFV3 y UFV4, y un grupo de botones para acciones como editar o eliminar el activo.
- Botón para abrir o cerrar el panel para agregar un activo **Button onClick={toggleAddAssetDrawer}**
- Panel para agregar un activo
  **AddAssetDrawer open={addAssetOpen}**

```tsx
{assets.map(asset => (
            <TableBody key={asset._id}>
              <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  <img
                    src={convertBase64ToImageUrl(asset.file)}
                    alt='Imagen del activo'
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%' }}
                  />
                </TableCell>

                <TableCell
                  style={{ width: '50px', fontFamily: 'Arial, Helvetica, sans-serif' }}
                  sx={{ textAlign: 'center' }}
                >
                  {asset.name}
                </TableCell>

                <HtmlTooltip title={<React.Fragment>{asset.description}</React.Fragment>}>
                  <TableCell>
                    {asset.description.length < 11 ? asset.description : `${asset.description.substr(0, 15)}..`}
                  </TableCell>
                </HtmlTooltip>

                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.responsible}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.supplier}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.location}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.price}
                </TableCell>
                <TableCell>
                  {asset.dateAcquisition && new Date(asset.dateAcquisition).toLocaleDateString('es-ES')}
                </TableCell>

                <TableCell>
                  {asset.warrantyExpirationDate && new Date(asset.warrantyExpirationDate).toLocaleDateString('es-ES')}
                </TableCell>

                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.depreciatedValue}
                </TableCell>

                <HtmlTooltip title={<React.Fragment>{asset.typeCategoryAsset}</React.Fragment>}>
                  <TableCell>
                    {asset.typeCategoryAsset.length < 11
                      ? asset.typeCategoryAsset
                      : `${asset.typeCategoryAsset.substr(0, 18)}...`}
                  </TableCell>
                </HtmlTooltip>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.ufv3}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.ufv4}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ButtonGroup size='small' aria-label='small outlined button group'>
                    <SidebarEditAsset providerId={asset._id} />
                    <Button
                      size='small'
                      style={{ color: '#e53935', borderRadius: '5px' }}
                      variant='outlined'
                      onClick={() => handleDelete(asset._id)}
                    >
                      <Icon icon='mdi:delete-outline' fontSize={20} />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </>
  )
}

export default AssetList
```
