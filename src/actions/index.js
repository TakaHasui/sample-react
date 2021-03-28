import axios from 'axios'

export const READ_EVENTS =  'READ_EVENTS'
export const CREATE_EVENT =  'CREATE_EVENT'

const ROOT_URL ='https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'

// readEventsではピュアなオブジェクトを返さなければならないが、
// redux_thunkを使うとこの中で非同期処理が可能になる。
export const readEvents = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`)
  dispatch({ type: READ_EVENTS, response })
}

export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)
  dispatch({ type: CREATE_EVENT, response })
}
