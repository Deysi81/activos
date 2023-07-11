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
      title: 'Activos',
      icon: 'mdi:briefcase-account',
      children: [
        {
          title: 'Nuevo Activo',
          path: '/listaact/asset',
          icon: 'mdi:currency-usd-circle'
        },
        {
          title: 'Grupos Contables',
          path: '/depreciaciones/getprovider',
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
          path: '/proveedores/getprovider',
          icon: 'mdi:account-check'
        }
      ]
    }
  ]
}

export default navigation
