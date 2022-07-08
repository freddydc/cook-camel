import styles from '../styles/Card.module.css'
import { useEffect, useState } from 'react'

const KEY_GUARD = 'cook'

export const UseState = ({ name }) => {
  const [state, setState] = useState({
    inputData: '',
    loading: false,
    error: null
  })

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        try {
          if (state.inputData === KEY_GUARD) {
            setState({
              ...state,
              loading: false,
              error: null
            })
            return
          }
          throw new Error('Error the code is incorrect')
        } catch (err) {
          setState({
            ...state,
            error: err.message,
            loading: false
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
            setState({
              ...state,
              inputData: e.target.value
            })
          }
        />
      </div>
      <div>
        <button
          onClick={() =>
            setState(previousValue => ({
              ...state,
              loading: !previousValue.loading
            }))
          }
        >
          Check
        </button>
      </div>
    </div>
  )
}
