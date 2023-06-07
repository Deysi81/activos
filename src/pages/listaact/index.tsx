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
import AddAssetDrawer from './AddAssetDrawer'
import SidebarEditAsset from './editAsset'

interface Asset {
  name: string
  description: string
  responsible: string
  amount: number
  supplier: string
  location: string
  worth: number
  dateacquisition: string
  warrantyexpirationdate: string
  asset: boolean
  _id: string
}

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])

  const [addAssetOpen, setAddAssetOpen] = useState<boolean>(false)
  const toggleAddAssetDrawer = () => setAddAssetOpen(!addAssetOpen)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios
      .get<Asset[]>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/`)
      .then(response => {
        const filteredAssets = response.data.filter(asset => asset.asset)
        setAssets(filteredAssets)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleDelete = async (id: string) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/${id}`)
      .then(response => {
        console.log(response.data)
        fetchData()
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <Button onClick={toggleAddAssetDrawer}>NUEVO Activo</Button>
      <AddAssetDrawer open={addAssetOpen} toggle={toggleAddAssetDrawer} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
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
                Cantidad
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
                fecha de expiración de la garantía
              </TableCell>
              <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                ACCIONES
              </TableCell>
            </TableRow>
          </TableHead>
          {assets.map(asset => (
            <TableBody key={asset._id}>
              <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.name}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.description}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.responsible}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.amount}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.supplier}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.location}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.worth}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.dateacquisition}
                </TableCell>
                <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.warrantyexpirationdate}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ButtonGroup size='small' aria-label='small outlined button group'>
                    <SidebarEditAsset providerId={asset._id} />
                    <Button size='small' color='secondary' variant='outlined' onClick={() => handleDelete(asset._id)}>
                      Eliminiar
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
