
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ThemeProvider,
TableCell, TableRow, TableBody, TableContainer, Table, TableHead, ButtonGroup, Paper } from '@mui/material';
import TextField from '@mui/material/TextField'
import AddUserDrawer from './AddUserDrawer';
import AddAssetDrawer from './AddAssetDrawer';

interface Asset {
  
  name: string;
  description: string;
  responsible: string;
  amount: number;
  supplier: string;
  location: string;
  worth: number;
  dateacquisition: string;
  warrantyexpirationdate: string;
  asset:boolean;
  _id: string;
 
}

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editedAsset, setEditedAsset] = useState<Asset | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  
  const [addAssetOpen, setAddAssetOpen] = useState<boolean>(false)
  const toggleAddAssetDrawer = () => setAddAssetOpen(!addAssetOpen)
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<Asset[]>(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/`)
      .then(response => {
        const filteredAssets = response.data.filter(asset => asset.asset);
        setAssets(filteredAssets);
      })
      .catch(error => {
        console.error(error);
      });
  };

   
    
  const handleDelete =async (id: string) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/${id}`)
      .then(response => {
        console.log(response.data);
        fetchData();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = (asset: Asset) => {
    setEditedAsset(asset);
  };

  const handleSave = () => {
    if (editedAsset) {
      console.log(editedAsset);
      axios
          .put(`${process.env.NEXT_PUBLIC_API_ACTIVOS}asset/${editedAsset._id}`, editedAsset)
          .then(response => {
          console.log(response.data);
          setEditedAsset(null);
          fetchData();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleCancel = () => {
    setEditedAsset(null);
  };

  const handleInputChange = (e: React.ChangeEvent<{ name: string; value: string; }>) => {
    if (editedAsset) {
      setEditedAsset({ ...editedAsset, [e.target.name]: e.target.value });
    }
  };
  
  

const handleThemeChange = () => {
  setTheme(theme === 'light' ? 'dark' : 'light')
}

return (
  <>
    <Button onClick={toggleAddAssetDrawer}>NUEVO Activo</Button>
    <AddAssetDrawer open={addAssetOpen} toggle={toggleAddAssetDrawer} />
  <TableContainer component ={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >Nombre</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >Descripción</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >Responsable</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >Cantidad</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >Proveedor</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >Ubicación</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >Precio</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >Fecha de adquisición</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }}>fecha de expiración de la garantía</TableCell>
                <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }} >ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            {assets.map(asset => (
              <TableBody key={asset._id}>
                {editedAsset && editedAsset._id === asset._id ? (
                    <TableRow>
                    <TableCell >
                      <TextField
                        name="name"
                        // label="Nombre"
                        value={editedAsset.name}
                        onChange={handleInputChange}
                        sx={{ marginBottom: '10px' }}
                      />
                    </TableCell>
                    <TableCell >
                      <TextField
                        name="description"
                        value={editedAsset.description}
                        onChange={handleInputChange}
                        sx={{ marginBottom: '10px' }}
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                      name="responsible"
                      id='standard-basic'
                      value={editedAsset.responsible}
                      onChange={handleInputChange}
                      sx={{ marginBottom: '10px' }}
                    />
                    </TableCell>
                    <TableCell>
                        <TextField
                        name="amount"
                        type="number"
                        value={editedAsset.amount}
                        onChange={handleInputChange}
                        sx={{ marginBottom: '10px' }}
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                      name="supplier"
                      value={editedAsset.supplier}
                      onChange={handleInputChange}
                      sx={{ marginBottom: '10px' }}
                    />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="location"
                        value={editedAsset.location}
                        onChange={handleInputChange}
                        sx={{ marginBottom: '10px' }}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <TextField
                        name="worth"
                        type="number"
                        value={editedAsset.worth}
                        onChange={handleInputChange}
                        sx={{ marginBottom: '10px' }}
                      /> 
                    </TableCell>                 
                    <TableCell>
                      <TextField
                        name="dateacquisition"                
                        type="datetime-local"
                        value={editedAsset.dateacquisition}
                        onChange={handleInputChange}
                        sx={{ marginBottom: '10px' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="warrantyexpirationdate"
                        type="datetime-local"
                        value={editedAsset.warrantyexpirationdate}
                        onChange={handleInputChange}
                        sx={{ marginBottom: '10px' }}
                      />    
                    </TableCell>   
                    <TableCell>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                      <Button size="small" color="primary" variant="outlined" onClick={handleSave}>
                        Save
                      </Button>
                      <Button size="small" color="secondary" variant="outlined" onClick={handleCancel}>
                        Cancel
                      </Button>
                      </ButtonGroup>
                    </TableCell>
                    </TableRow>                   
                ) : (
                  <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>

                    <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }}>
                      {asset.name}
                    </TableCell>
                    <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }}>
                      {asset.description}
                    </TableCell>
                    <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }}>
                      {asset.responsible}
                    </TableCell>
                    <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }}>
                      {asset.amount}
                    </TableCell>
                    <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }}>
                      {asset.supplier}
                    </TableCell>
                    <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }}>
                      {asset.location}
                    </TableCell>
                    <TableCell style={{width: '50px'}} sx={{ textAlign: 'center' }}>
                      {asset.worth}
                    </TableCell>                                  
                    <TableCell style={{width: '50px'}}sx={{ textAlign: 'center' }}>
                      {asset.dateacquisition}
                    </TableCell>
                    <TableCell style={{width: '50px'}}sx={{ textAlign: 'center' }}>
                      {asset.warrantyexpirationdate}
                    </TableCell >
                    <TableCell sx={{ textAlign: 'center' }}>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button  size="small" color="primary" variant="outlined" onClick={() => handleEdit(asset)}>
                            Editar
                        </Button>
                        <Button size="small" color="secondary" variant="outlined" onClick={() => handleDelete(asset._id)}>
                            Eliminiar
                        </Button>
                    </ButtonGroup>
                    </TableCell >
                    
                  </TableRow>
                )}
              </TableBody>
            ))}
          </Table>
          
</TableContainer>
</>
)
}

export default AssetList;
