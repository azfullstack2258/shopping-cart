import cartActionTypes from './cartAction'
import productActionTypes from './productAction'

const actionTypes = {
  ...cartActionTypes,
  ...productActionTypes
}

export * from './cartAction'
export * from './productAction'

export default actionTypes
