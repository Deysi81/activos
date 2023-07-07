import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  ThemeProvider,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  ButtonGroup,
  Paper
} from '@mui/material'
import TextField from '@mui/material/TextField'
import SidebarProviderUser from './addprovider'
import SidebarAddProvider from './addprovider'
import SidebarEditProvider from './editprovider'
import Icon from 'src/@core/components/icon'
import { useSettings } from 'src/@core/hooks/useSettings'

interface Provider {
  _id: string
  name: string
  address: string
  phone: number
  asset: boolean
}

const ProviderList: React.FC = () => {
  const [provider, setProvider] = useState<Provider[]>([])
  const [providervider, setprovidervider] = useState<Provider | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const [addproviderOpen, setAddproviderOpen] = useState<boolean>(false)
  const toggleAddproviderDrawer = () => setAddproviderOpen(!addproviderOpen)
  const { settings } = useSettings()
  const { mode } = settings
  useEffect(() => {
    fetchData()
  }, [])

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

  const handleEdit = (provider: Provider) => {
    setprovidervider(provider)
  }

  const handleCancel = () => {
    setprovidervider(null)
  }

  const handleInputChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    if (providervider) {
      setprovidervider({ ...providervider, [e.target.name]: e.target.value })
    }
  }
  //estilo para dia y noche

  const headerStyle = {
    backgroundColor: mode === 'light' ? '#8c90f0' : '#5a5c75',
    color: mode === 'light' ? 'black' : 'white',

    fontFamily: 'Roboto, Arial, sans-serif'
  }

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
