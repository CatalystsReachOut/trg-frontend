import * as apiProvider from './../provider'
import * as apiConstant from '../../utils/apiConstants'

export const getData = () => {
    return apiProvider.getAll('')
}