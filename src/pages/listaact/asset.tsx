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
  Paper,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses
} from '@mui/material'
import AddAssetDrawer from './AddAssetDrawer'
import SidebarEditAsset from './editAsset'
import { format } from 'date-fns'
import Icon from 'src/@core/components/icon'
import { useSettings } from 'src/@core/hooks/useSettings'

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

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [dates] = useState<string[]>([])
  const [addAssetOpen, setAddAssetOpen] = useState<boolean>(false)
  const toggleAddAssetDrawer = () => setAddAssetOpen(!addAssetOpen)

  const { settings } = useSettings()
  const { mode } = settings

  useEffect(() => {
    fetchData()
    // depreciation()
  }, [])

  const fetchData = () => {
    axios
      .get<Asset[]>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/`)
      .then(response => {
        const filteredAssets: Asset[] = response.data.filter(asset => !asset.isDeleted)
        console.log(filteredAssets)
        setAssets(filteredAssets)
        console.log('dates' + dates)
      })
      .catch(error => {
        console.error(error)
      })
  }
  // const depreciation = () => {
  //   axios
  //     .get<Asset[]>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/`)
  //     .then(response => {
  //       const filteredAssets = response.data.filter(asset => !asset.isDeleted)
  //       setAssets(filteredAssets)

  //       depreciation()
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }

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

  // Agrega esta función en tu componente AssetList
  const convertBase64ToImageUrl = (base64String: string) => {
    return `data:image/png;base64,${base64String}`
  }

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
  //estilo para dia y noche

  const headerStyle = {
    backgroundColor: mode === 'light' ? '#8c90f0' : '#5a5c75',
    color: mode === 'light' ? 'black' : 'white',

    fontFamily: 'Roboto, Arial, sans-serif'
  }

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

                {/* <TableCell style={{ width: '50px' }} sx={{ textAlign: 'center' }}>
                  {asset.typeCategoryAsset}
                </TableCell> */}
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
