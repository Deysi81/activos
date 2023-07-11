---
sidebar_position: 3
---

# Lista de proveedores

Este bloque de código importa los módulos y componentes necesarios para la funcionalidad del componente `ProviderList`. A continuación se muestra la documentación para cada importación:

- `React` es una biblioteca de JavaScript para construir interfaces de usuario. Se utiliza para definir componentes y manejar el estado en la aplicación.
- `useState` es un hook de React que permite agregar estado a componentes de función. Se utiliza para mantener el estado de la lista de proveedores.
- `useEffect` es otro hook de React que se utiliza para ejecutar efectos secundarios en componentes de función. En este caso, se utiliza para llamar a fetchData al montar el componente.
- `axios` es una biblioteca HTTP basada en promesas que se utiliza para realizar solicitudes a un servidor API. Se utiliza aquí para obtener y eliminar proveedores.
- `Button, TableCell, TableRow, TableBody, TableContainer, Table, TableHead, ButtonGroup y Paper`: son componentes de la biblioteca Material-UI (MUI) que se utilizan para construir y estilizar la tabla de proveedores.
- `SidebarAddProvider y SidebarEditProvider`: son componentes personalizados que se utilizan para agregar y editar proveedores.
- `Icon`: Es un componente personalizado que muestra iconos en la interfaz de usuario.
  useSettings es un hook personalizado que se utiliza para obtener la configuración de la aplicación.

```tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  ButtonGroup,
  Paper
} from '@mui/material'
import SidebarAddProvider from './addprovider'
import SidebarEditProvider from './editprovider'
import Icon from 'src/@core/components/icon'
import { useSettings } from 'src/@core/hooks/useSettings'
```

## INTERFACES

Este bloque de código importa los módulos necesarios y define la interfaz Provider que describe la estructura de los objetos de proveedores.

```tsx
interface Provider {
  _id: string
  name: string
  address: string
  phone: number
  asset: boolean
}
```

## COMPONENTES

Aquí se define el **componente** `ProviderList`. Utiliza el **hook de estado** `useState` para mantener el estado de los proveedores en la variable `provider`. También se utiliza el **hook useEffect** para llamar a la **función** `fetchData` cuando el componente se monta.

```tsx
const ProviderList: React.FC = () => {
  const [provider, setProvider] = useState<Provider[]>([])

  const [addproviderOpen, setAddproviderOpen] = useState<boolean>(false)
  const toggleAddproviderDrawer = () => setAddproviderOpen(!addproviderOpen)
  const { settings } = useSettings()
  const { mode } = settings
  useEffect(() => {
    fetchData()
  }, [])
```

## FUNCIONES

- Función `fetchData` utiliza Axios para realizar una solicitud GET al servidor API y obtener los datos de los proveedores. Luego, se filtran los proveedores que no son activos y se actualiza el estado provider con los proveedores filtrados.
  ```tsx
  const fetchData = () => {
    console.log('fetchData')
    axios
      .get<Provider[]>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}supplier/`)
      .then(response => {
        // setProvider(response.data)
        const filteredproviders = response.data.filter(provider => !provider.asset)
        setProvider(filteredproviders)
        console.log(provider)
      })
      .catch(error => {
        console.error(error)
      })
  }
  ```
  Función `handleDelete` se utiliza para eliminar un proveedor. Realiza una solicitud DELETE al servidor API y luego llama a `fetchData` para actualizar la lista de proveedores.
  ```tsx
  const handleDelete = async (id: string) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_ACTIVOS}supplier/${id}`)
      .then(response => {
        console.log(response.data)
        fetchData()
      })
      .catch(error => {
        console.error(error)
      })
  }
  ```
  El objeto `headerStyle` define el estilo para el encabezado de la tabla. El color de fondo y el color del texto se basan en el modo `(mode)` obtenido de la configuración.

```tsx
const headerStyle = {
  backgroundColor: mode === 'light' ? '#8c90f0' : '#5a5c75',
  color: mode === 'light' ? 'black' : 'white',

  fontFamily: 'Roboto, Arial, sans-serif'
}
```

Finalmente, se muestra el contenido del componente `ProviderList`. El bloque de código contiene:

- **`Un botón`** para agregar un nuevo proveedor que llama a la función `toggleAddproviderDrawer` cuando se hace clic en él.
- El **componente** **`SidebarAddProvider`** que muestra un formulario para agregar un proveedor, controlado por el estado addproviderOpen y la función toggleAddproviderDrawer.
- Un componente `TableContainer` y un componente Table de MUI para mostrar la lista de proveedores en una tabla.
- El encabezado de la tabla `(TableHead)` con las columnas Nombre, Dirección, Celular y Acciones.
- Los proveedores se mapean en el cuerpo de la tabla `(TableBody)` y se muestran en filas `(TableRow)`.
- Cada proveedor tiene celdas `(TableCell)` que muestran el nombre, dirección, celular y acciones. Las acciones incluyen un botón para editar `(SidebarEditProvider)` y un botón para eliminar `(Button)` un proveedor.

```tsx
return (
    <>
      <Button onClick={toggleAddproviderDrawer}>NUEVO Proveedor</Button>
      <SidebarAddProvider open={addproviderOpen} toggle={toggleAddproviderDrawer} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead style={headerStyle}>
            <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
              <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                Nombre
              </TableCell>
              <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                Direccion
              </TableCell>
              <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                Celular
              </TableCell>
              <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          {provider.map(provider => (
            <TableBody key={provider._id}>
              <TableRow>
                <TableCell style={{ width: '100px' }} sx={{ textAlign: 'center' }}>
                  {provider.name}
                </TableCell>
                <TableCell style={{ width: '100px' }} sx={{ textAlign: 'center' }}>
                  {provider.address}
                </TableCell>
                <TableCell style={{ width: '100px' }} sx={{ textAlign: 'center' }}>
                  {provider.phone}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ButtonGroup size='small' aria-label='small outlined button group'>
                    <SidebarEditProvider providerId={provider._id}></SidebarEditProvider>
                    <Button
                      size='small'
                      style={{ color: '#e53935', borderRadius: '10px' }}
                      variant='outlined'
                      onClick={() => handleDelete(provider._id)}
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

export default ProviderList

```
