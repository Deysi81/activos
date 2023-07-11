---
sidebar_position: 3
---

# Lista de grupos contables

Tendremos os siguientes componentes qwue nos serviran para las depreciaciones

## DEPRECIACIONES

Las depreciaciones se refieren a la disminución del valor de un activo a lo largo del tiempo debido al desgaste, el uso, la obsolescencia u otros factores. Es un concepto importante en la contabilidad y las finanzas, ya que afecta la valoración de los activos en los estados financieros de una empresa.

## Importaciones

Las importaciones son los módulos y componentes externos utilizados en el componente `ContablesList`.

```tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TableCell, TableRow, TableBody, TableContainer, Table, TableHead, Paper } from '@mui/material'
import SidebarAddPontables from './addcontables'
```

## Tipos de datos

El tipo de dato Contables define la estructura de un objeto contable que se muestra en la lista.

```tsx
interface Contables {
  _id: string
  assetCategory: string
  usefulLife: number
  asset: boolean
}
```

## Componente ContablesList

El componente ContablesList es el componente principal que muestra la lista de contables. Utiliza el estado para almacenar la lista de contables y el estado para controlar la apertura del panel deslizable de agregar contables.

```tsx
const ContablesList: React.FC = () => {
  const [contables, setContables] = useState<Contables[]>([])
  const [contablesvider, setcontablesvider] = useState<Contables | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const [addcontablesOpen, setAddcontablesOpen] = useState<boolean>(false)
  const toggleAddcontablesDrawer = () => setAddcontablesOpen(!addcontablesOpen)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    console.log('fetchData')
    axios
      .get<Contables[]>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}depreciation-asset-list/`)
      .then(response => {
        setContables(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    if (contablesvider) {
      setcontablesvider({ ...contablesvider, [e.target.name]: e.target.value })
    }
  }

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Button onClick={toggleAddcontablesDrawer}>NUEVA DEPRECIACION</Button>
      <SidebarAddPontables open={addcontablesOpen} toggle={toggleAddcontablesDrawer} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead style={{ backgroundColor: '#504F73' }}>
            <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2)} !important` } }}>
              <TableCell
                style={{ width: '30px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
                sx={{ textAlign: 'center' }}
              >
                Nombre De Categoria
              </TableCell>
              <TableCell
                style={{ width: '30px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)' }}
                sx={{ textAlign: 'center' }}
              >
                Vida Util
              </TableCell>
            </TableRow>
          </TableHead>
          {contables.map(contables => (
            <TableBody key={contables._id}>
              <TableRow>
                <TableCell style={{ width: '100px' }} sx={{ textAlign: 'center' }}>
                  {contables.assetCategory}
                </TableCell>
                <TableCell style={{ width: '100px' }} sx={{ textAlign: 'center' }}>
                  {contables.usefulLife}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </>
  )
}

export default ContablesList
```
