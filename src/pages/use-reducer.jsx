import styles from '../styles/Card.module.css'
import { useEffect, useReducer } from 'react'

const KEY_GUARD = 'cook'

export const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        try {
          if (state.inputData === KEY_GUARD) {
            dispatch({ type: actionTypes.verifyKey })
            return
          }
          throw new Error('Error the code is incorrect')
        } catch (err) {
          dispatch({
            type: actionTypes.errorMessage,
            payload: err.message
          })
        }
      }, 1000)
    }
  }, [state.loading])

  return (
    <div
      className={`${styles.card} ${
        state.error && !state.loading ? styles.error : ''
      }`}
    >
      {!state.confirmed ? (
        <>
          <div>
            <h1>Delete {name}</h1>
          </div>
          <div>
            {state.loading ? <h2>Loading...</h2> : null}
            {state.error && !state.loading ? <h2>{state.error}</h2> : null}
            {!state.error && !state.loading ? (
              <h2>Type the security code</h2>
            ) : null}
          </div>
          <div>
            <input
              placeholder="Cook..."
              value={state.inputData}
              onChange={e =>
                dispatch({
                  type: actionTypes.getInput,
                  payload: e.target.value
                })
              }
            />
          </div>
          <div>
            <button
              onClick={() => dispatch({ type: actionTypes.sendVerifyKey })}
            >
              Check
            </button>
          </div>
        </>
      ) : null}

      {state.confirmed && !state.deleted ? (
        <>
          <div>
            <h1>Delete {name}</h1>
          </div>
          <div>
            <h2>Are you sure?</h2>
          </div>
          <div>
            <button onClick={() => dispatch({ type: actionTypes.deleteData })}>
              Ok
            </button>
            <button onClick={() => dispatch({ type: actionTypes.undoChange })}>
              Cancel
            </button>
          </div>
        </>
      ) : null}

      {state.deleted ? (
        <>
          <div>
            <h1>{name} Deleted</h1>
          </div>
          <div>
            <h2>Recover {name}</h2>
          </div>
          <div>
            <button onClick={() => dispatch({ type: actionTypes.resetChange })}>
              Ok
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}

const initialState = {
  inputData: '',
  loading: false,
  error: null,
  confirmed: false,
  deleted: false
}

const actionTypes = {
  verifyKey: 'VERIFY_KEY',
  getInput: 'GET_INPUT',
  sendVerifyKey: 'SEND_VERIFY_KEY',
  resetChange: 'RESET_CHANGE',
  deleteData: 'DELETE_DATA',
  undoChange: 'UNDO_CHANGE',
  errorMessage: 'ERROR_MESSAGE'
}

const reducerData = (state, payload) => ({
  [actionTypes.verifyKey]: {
    ...state,
    loading: false,
    error: null,
    confirmed: true
  },
  [actionTypes.getInput]: {
    ...state,
    inputData: payload
  },
  [actionTypes.sendVerifyKey]: {
    ...state,
    loading: true
  },
  [actionTypes.resetChange]: {
    ...state,
    confirmed: false,
    deleted: false,
    inputData: ''
  },
  [actionTypes.deleteData]: {
    ...state,
    deleted: true
  },
  [actionTypes.undoChange]: {
    ...state,
    confirmed: false,
    inputData: ''
  },
  [actionTypes.errorMessage]: {
    ...state,
    error: payload,
    loading: false
  }
})

const reducer = (state, action) => {
  const data = reducerData(state, action.payload)[action.type]

  if (data) {
    return data
  }

  return state
}
