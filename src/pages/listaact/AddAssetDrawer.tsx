// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import user, { addUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { Direction } from '@mui/material';
import axios from 'axios'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  name: string
  description:string
  responsible:string
  amount:number
  supplier:string
  location:string
  worth:number
  dateacquisition:string
  warrantyexpirationdate: string
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  direction: yup.string().required(),
  phone: yup
    .string()
    .typeError('')
    .min(10, obj => showErrors('Celular', obj.value.length, obj.min))
    .required(),
  name: yup
    .string()
    .min(3, obj => showErrors('Nombre', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  name: '',
  description:'',
  responsible:'',
  amount:0,
  supplier:'',
  location:'',
  worth:0,
  dateacquisition:'',
  warrantyexpirationdate: ''
}

const SidebarAddAsset = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState<string>('basic')
  const [role, setRole] = useState<string>('subscriber')
  const [asset, setAsset] = useState<UserData>();

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleSave = async() => {
    console.log("handlesave")
    console.log(asset)
      await axios
        .post(`https://falling-wildflower-5373.fly.dev/asset`, asset)
        .then(response => {
          console.log(response.data);
          toggle()
          reset()
        })
        .catch(error => {
          console.error(error);
        });
  };

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 500, sm: 600 } } }}
    >
      <Header>
        <Typography variant='h6'>Agregar Activo</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(handleSave)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='descripcion'
                  placeholder='78906547'
                  onChange={onChange}
                  error={Boolean(errors.description)}
                  autoComplete='off'
                />
              )}
            />
            {errors.description && <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='responsible'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='responsable'
                  onChange={onChange}
                  placeholder='Av. Bolivar n°415'
                  error={Boolean(errors.responsible)}
                  autoComplete='off'
                />
              )}
            />
            {errors.responsible && <FormHelperText sx={{ color: 'error.main' }}>{errors.responsible.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='amount'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='cantidad'
                  onChange={onChange}
                  placeholder='Av. Bolivar n°415'
                  error={Boolean(errors.amount)}
                  autoComplete='off'
                />
              )}
            />
            {errors.amount && <FormHelperText sx={{ color: 'error.main' }}>{errors.amount.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='supplier'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='proveedor'
                  onChange={onChange}
                  placeholder='Av. Bolivar n°415'
                  error={Boolean(errors.supplier)}
                  autoComplete='off'
                />
              )}
            />
            {errors.supplier && <FormHelperText sx={{ color: 'error.main' }}>{errors.supplier.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='location'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='ubicacion'
                  onChange={onChange}
                  placeholder='Av. Bolivar n°415'
                  error={Boolean(errors.location)}
                  autoComplete='off'
                />
              )}
            />
            {errors.location && <FormHelperText sx={{ color: 'error.main' }}>{errors.location.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='worth'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='precio'
                  onChange={onChange}
                  placeholder='Av. Bolivar n°415'
                  error={Boolean(errors.worth)}
                  autoComplete='off'
                />
              )}
            />
            {errors.worth && <FormHelperText sx={{ color: 'error.main' }}>{errors.worth.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dateacquisition'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='fecha de adquisicion'
                  onChange={onChange}
                  placeholder='Av. Bolivar n°415'
                  error={Boolean(errors.dateacquisition)}
                  autoComplete='off'
                />
              )}
            />
            {errors.dateacquisition && <FormHelperText sx={{ color: 'error.main' }}>{errors.dateacquisition.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='warrantyexpirationdate'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='fecha de expiracion de garantia'
                  onChange={onChange}
                  placeholder='Av. Bolivar n°415'
                  error={Boolean(errors.warrantyexpirationdate)}
                  autoComplete='off'
                />
              )}
            />
            {errors.warrantyexpirationdate && <FormHelperText sx={{ color: 'error.main' }}>{errors.warrantyexpirationdate.message}</FormHelperText>}
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
  )
}

export default SidebarAddAsset
