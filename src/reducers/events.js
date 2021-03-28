import _ from 'lodash' // 配列の操作が得意なパッケージ
import {
  CREATE_EVENT,
  READ_EVENT,
  READ_EVENTS,
  UPDATE_EVENT,
  DELETE_EVENT,
} from '../actions'

export default (events = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      const data = action.response.data
      return {...events, [data.id]: data}
    case READ_EVENTS:
      // console.log(action.response.data)
      // _.mapKeys: idをキーとした連想配列に置き換える
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENT:
      delete events[action.id]
      // ↑によってeventsに更新な発生し、
      // ↓で新しいメモリ空間上にアップデートされたイベントをreducerが返却する
      return {...events}
    default:
      return events
  }
}
