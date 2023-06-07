// ** React Imports
import React, { useEffect, useState } from 'react';
import { ChangeEvent, forwardRef, MouseEvent, SyntheticEvent } from 'react'
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
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Autocomplete, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';



const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

    const CreateAsset : React.FC = () => {
  // ** States
  
interface Asset {
  asset: unknown;
  
  name: string;
  address: string;
  phone: number;
  assetname: string;
  _id: string;
 
}     const [assets, setAssets] = useState<Asset[]>([]);
        const [value, setValue] = useState<string>('nuevo-activo')
        const [date, setDate] = useState<DateType>(null)
       const [asset, setAsset] = useState({
      name: '',
      address: '',
      phone: 0,
      assetname: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios
      .post('http://10.10.214.219:8080/asset/upload', asset)
      .then((response) => {
        console.log(response.data);

        // Realizar acciones adicionales después de enviar los datos exitosamente
      })
      .catch((error) => {
        console.error(error);

        // Manejar el error en caso de que la solicitud falle
      });

  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<Asset[]>('http://10.10.214.219:8080/asset')
      .then(response => {
        const filteredAssets = response.data.filter(asset => asset.asset);
        setAssets(filteredAssets);
      })
      .catch(error => {
        console.error(error);
      });
  };

   

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `3px solid ${theme.palette.divider}` }}>
          <Tab value='nuevo-proveedor' label='Nuevo Proveedor' />
         
        </TabList>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TabPanel value='nuevo-proveedor'>
            
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      
        <Box gridColumn="span 4">
        <TextField id="filled-basic"
           variant="filled"  name="name" label="Nombre" value={asset.name} autoComplete='off' onChange={handleChange}/>
                
        </Box>
        <Box gridColumn="span 4">
        <TextField 
           id="filled-basic"
           label="Direccion"
           variant="filled"
           name="address" 
           value={asset.address}
           autoComplete='off' onChange={handleChange} />
                
        </Box>
        <Box gridColumn="span 4">
            <TextField 
            id="filled-basic"
            label="Celular"
            variant="filled" 
             
            name="phone"
            value={asset.phone} 
            autoComplete='off' 
            onChange={handleChange} />



        </Box>
        
      </Box>

            </TabPanel>
            
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
