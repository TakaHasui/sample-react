import _ from 'lodash' // 配列の操作が得意なパッケージ
import {
  READ_EVENT,
  READ_EVENTS,
  DELETE_EVENT,
} from '../actions'

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENT:
      const data = action.response.data
      return {...events, [data.id]: data}
    case READ_EVENTS:
      // console.log(action.response.data)
      // _.mapKeys: idをキーとした連想配列に置き換える
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENT:
    console.log(action.id)
      delete events[action.id]
      // ↑によってeventsに更新な発生し、
      // ↓で新しいメモリ空間上にアップデートされたイベントをreducerが返却する
      return {...events}
    default:
      return events
  }
}
