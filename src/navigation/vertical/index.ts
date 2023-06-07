// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Hogar',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Mensajes',
      path: '/second-page',
      icon: 'mdi:email-outline'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Control de Acceso',
      icon: 'mdi:shield-outline'
    },
    {
      title: 'Activos',
      icon: 'mdi:account-outline',
      children: [
        {
          title: 'Nuevo Activo',
          path: '/listaact/AddAssetDrawer',
          icon: 'mdi:account-group'
        },
        {
          title: 'Lista Activo',
          path: '/listaact',
          icon: 'mdi:account-group'
        }
      ]
    },
    {
      title: 'Proveedores',
      icon: 'mdi:account-outline',
      children: [
        {
          title: 'Nuevo Proveedor',
          path: '/getprovider',
          icon: 'mdi:account-check'
        }
      ]
    },
    {
      title: 'Imagen',
      path: '/user/usuario/base64/base64',
      icon: 'mdi:account-box-multiple'
    }
  ]
}

export default navigation
