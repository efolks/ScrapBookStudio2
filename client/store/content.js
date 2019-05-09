import axios from 'axios'

/**
 * ACTION TYPES
 */

 const GET_PAGE_CONTENT = 'GET_PAGE_CONTENT'

 const GET_SINGLE_TEXT = 'GET_SINGLE_TEXT'
 const UPDATE_SINGLE_TEXT = 'UPDATE_SINGLE_TEXT'
 const CREATE_SINGLE_TEXT = 'CREATE_SINGLE_TEXT'
 const DELETE_SINGLE_TEXT = 'DELETE_SINGLE_TEXT'



 const GET_SINGLE_MEDIA = 'GET_SINGLE_MEDIA'
 const UPDATE_SINGLE_MEDIA = 'UPDATE_SINGLE_MEDIA'
 const CREATE_SINGLE_MEDIA = 'CREATE_SINGLE_MEDIA'
 const DELETE_SINGLE_MEDIA = 'DELETE_SINGLE_MEDIA'

/**
 * ACTION CREATORS
 */

 const getPageContent = (pageText, pageMedia) => ({
   type: GET_PAGE_CONTENT,
   pageText,
   pageMedia
 })

 export const getSingleText = (id) => ({
     type: GET_SINGLE_TEXT,
     id
 })

 const updateSingleText = (text) => ({
     type: UPDATE_SINGLE_TEXT,
     text
 })

 const createSingleText = (text) => ({
     type: CREATE_SINGLE_TEXT,
     text
 })

 const deleteSingleText = (id) => ({
     type: DELETE_SINGLE_TEXT,
     id
 })

 export const getSingleMedia = (id) => ({
     type: GET_SINGLE_MEDIA,
     id
 })

 const updateSingleMedia = (media) => ({
     type: UPDATE_SINGLE_MEDIA,
     media
 })

 const createSingleMedia = (media) => ({
     type: CREATE_SINGLE_MEDIA,
     media
 })

 const deleteSingleMedia = (id) => ({
     type: DELETE_SINGLE_MEDIA,
     id
 })

 //Thunks
 export const getPageContentThunk = (id) => async dispatch => {
  try {
      const {data} = await axios.get(`/api/pages/${id}`)
      const { canvas_texts, media} = data
      dispatch(getPageContent(canvas_texts, media))
  } catch(err) {console.error(err)}
}


export const createSingleTextThunk = () => async dispatch => {
  try {
      const {data} = await axios.post('/api/canvastext')
      dispatch(createSingleText(data))
  } catch (err) {console.log(err)}
}

export const updateSingleTextThunk = (id, updatedProp) => async dispatch => {
    console.log('our id: ', id)  
    try {
          const {data} = await axios.put(`/api/canvastext/${id}`, updatedProp)
          dispatch(updateSingleText(data))
      } catch (err) {console.log(err)}
}

export const deleteSingleTextThunk = id => async dispatch => {
  try {
      await axios.delete(`api/canvastext/${id}`)
      dispatch(deleteSingleText(id))
  } catch (err) {console.error(err)}
}

export const createSingleMediaThunk = (path) => async dispatch => {
  try {
      const {data} = await axios.post('/api/media', path)
      dispatch(createSingleMedia(data))
  } catch (err) {console.log(err)}
}

export const updateSingleMediaThunk = (id, updatedProp) => async dispatch => {
      try {
          const {data} = await axios.put(`/api/media/${id}`, updatedProp)
          dispatch(updateSingleMedia(data))
      } catch (err) {console.log(err)}
}

export const deleteSingleMediaThunk = id => async dispatch => {
  try {
      await axios.delete(`api/media/${id}`)
      dispatch(deleteSingleMedia(id))
  } catch (err) {console.error(err)}
}

  /**
 * INITIAL STATE
 */
const initialState = {
    allText: [],
    selectedText: '',
    allMedia: [],
    selectedMedia: ''
}

//Reducer
// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  const newState = {...state}
  switch(action.type) {
    case GET_PAGE_CONTENT:
         newState.allText = action.pageText
         newState.allMedia = action.pageMedia
         return newState
    case GET_SINGLE_TEXT:
        newState.selectedText = action.id
        return newState
    case CREATE_SINGLE_TEXT:
        newState.allText = [...newState.allText, action.text]
        newState.selectedText = action.text.id
        return newState
    case UPDATE_SINGLE_TEXT:
    newState.allText = [...newState.allText, action.text]
        return newState
    case DELETE_SINGLE_TEXT:
         newState.allText = newState.allText.filter(text =>
         text.id !== action.id)
         newState.selectedText = ''
         return newState
    case GET_SINGLE_MEDIA:
        newState.selectedMedia = action.id
        return newState
    case CREATE_SINGLE_MEDIA:
        newState.allMedia = [...newState.allMedia, action.media]
        newState.selectedMedia = action.media.id
        return newState
    case UPDATE_SINGLE_MEDIA:
        newState.allMedia = [...newState.allMedia, action.media]        
        return newState
    case DELETE_SINGLE_MEDIA:
         newState.allMedia = newState.allMedia.filter(media =>
         media.id !== action.id)
         newState.selectedMedia = ''
         return newState
     default:
         return state
  }
}
