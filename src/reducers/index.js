import {combineReducers } from 'redux'
import count from './count'
import events from './events'

// 複数のReducerを使う場合は、カンマ区切りで{}内に複数定義
export default combineReducers({ count, events })
