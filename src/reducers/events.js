import _ from 'lodash' // 配列の操作が得意なパッケージ
import { READ_EVENTS } from '../actions'

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      // console.log(action.response.data)
      // _.mapKeys: idをキーとした連想配列に置き換える
      return _.mapKeys(action.response.data, 'id')
    default:
      return events
  }
}
