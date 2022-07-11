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
            dispatch({ type: 'VERIFY_KEY' })
            return
          }
          throw new Error('Error the code is incorrect')
        } catch (err) {
          dispatch({
            type: 'ERROR_MESSAGE',
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
                  type: 'GET_INPUT',
                  payload: e.target.value
                })
              }
            />
          </div>
          <div>
            <button onClick={() => dispatch({ type: 'SEND_VERIFY_KEY' })}>
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
            <button onClick={() => dispatch({ type: 'DELETE_DATA' })}>
              Ok
            </button>
            <button onClick={() => dispatch({ type: 'UNDO_CHANGE' })}>
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
            <button onClick={() => dispatch({ type: 'RESET_CHANGE' })}>
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

const reducerData = (state, payload) => ({
  VERIFY_KEY: {
    ...state,
    loading: false,
    error: null,
    confirmed: true
  },
  GET_INPUT: {
    ...state,
    inputData: payload
  },
  SEND_VERIFY_KEY: {
    ...state,
    loading: true
  },
  RESET_CHANGE: {
    ...state,
    confirmed: false,
    deleted: false,
    inputData: ''
  },
  DELETE_DATA: {
    ...state,
    deleted: true
  },
  UNDO_CHANGE: {
    ...state,
    confirmed: false,
    inputData: ''
  },
  ERROR_MESSAGE: {
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
