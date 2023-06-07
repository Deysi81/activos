// ** React Imports
import React, { useState } from 'react'
import { ChangeEvent, forwardRef, MouseEvent, SyntheticEvent } from 'react'
import { makeStyles } from '@mui/styles'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import CardActions from '@mui/material/CardActions'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import { Paper } from '@mui/material'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const CreateAsset: React.FC = () => {
  // ** States
  const [value, setValue] = useState<string>('nuevo-activo')
  const [date, setDate] = useState<DateType>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [asset, setAsset] = useState({
    name: '',
    description: '',
    responsible: '',
    amount: 0,
    supplier: '',
    location: '',
    worth: 0,
    dateacquisition: '',
    warrantyexpirationdate: '',
    file: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAsset({ ...asset, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios
      .post('https://falling-wildflower-5373.fly.dev/asset', asset)
      .then(response => {
        console.log(response.data)

        // Realizar acciones adicionales después de enviar los datos exitosamente
      })
      .catch(error => {
        console.error(error)

        // Manejar el error en caso de que la solicitud falle
      })
  }

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    setSelectedImage(file || null)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        asset.file = reader.result as string
      }
      console.log(asset.file)
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(null)
    }
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `3px solid ${theme.palette.divider}` }}
        >
          <Tab value='nuevo-activo' label='Nuevo Activo' />

          <Tab value='lista-de-activos' label='Depreciacion UFV' />
        </TabList>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TabPanel value='nuevo-activo'>
              <Grid container spacing={2}>
                <div>
                  <div style={{ marginBottom: '10px' }}>
                    <input type='file' onChange={handleImageChange} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {previewImage && (
                      <img src={previewImage} alt='Preview' style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    )}
                    <br />
                  </div>
                </div>

                <Grid item xs={12} sm={4}>
                  <TextField id='name' name='name' label='Nombre' value={asset.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={1} sm={4}>
                  <TextField
                    id='description'
                    name='description'
                    label='Descripción'
                    value={asset.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id='responsible'
                    name='responsible'
                    label='Responsable'
                    value={asset.responsible}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    id='amount'
                    name='amount'
                    label='Cantidad'
                    type='number'
                    value={asset.amount}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id='supplier'
                    name='supplier'
                    label='Proveedor'
                    value={asset.supplier}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id='location'
                    name='location'
                    label='Ubicación'
                    value={asset.location}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id='worth'
                    name='worth'
                    label='Precio'
                    type='number'
                    value={asset.worth}
                    onChange={handleChange}
                  />
                </Grid>
                <br></br>
                <Grid item xs={12} sm={4}>
                  <Typography variant='body2' gutterBottom>
                    Fecha de Adquisicion
                  </Typography>
                  <TextField
                    id='dateacquisition'
                    name='dateacquisition'
                    type='datetime-local'
                    value={asset.dateacquisition}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant='body2' gutterBottom>
                    Fecha de expiración de la garantía
                  </Typography>

                  <TextField
                    id='warrantyexpirationdate'
                    name='warrantyexpirationdate'
                    label=' '
                    type='datetime-local'
                    value={asset.warrantyexpirationdate}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='lista-de-activos'></TabPanel>
          </CardContent>

          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button size='medium' type='submit' sx={{ mr: 2 }} variant='contained'>
              CREAR
            </Button>
          </CardActions>
        </form>
      </TabContext>
    </Card>
  )
}

export default CreateAsset
