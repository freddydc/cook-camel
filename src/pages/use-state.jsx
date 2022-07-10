import styles from '../styles/Card.module.css'
import { useEffect, useState } from 'react'

const KEY_GUARD = 'cook'

export const UseState = ({ name }) => {
  const [state, setState] = useState({
    inputData: '',
    loading: false,
    error: null,
    confirmed: false,
    deleted: false
  })

  const handleConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: null,
      confirmed: true
    })
  }

  const handleError = err => {
    setState({
      ...state,
      error: err.message,
      loading: false
    })
  }

  const handleEntry = e => {
    setState({
      ...state,
      inputData: e.target.value
    })
  }

  const handleCheck = () => {
    setState({
      ...state,
      loading: true
    })
  }

  const handleDelete = () => {
    setState({
      ...state,
      deleted: true
    })
  }

  const handleCancel = () => {
    setState({
      ...state,
      confirmed: false,
      inputData: ''
    })
  }

  const handleReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      inputData: ''
    })
  }

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        try {
          if (state.inputData === KEY_GUARD) {
            handleConfirm()
            return
          }
          throw new Error('Error the code is incorrect')
        } catch (err) {
          handleError(err)
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
              onChange={handleEntry}
            />
          </div>
          <div>
            <button onClick={handleCheck}>Check</button>
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
            <button onClick={handleDelete}>Ok</button>
            <button onClick={handleCancel}>Cancel</button>
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
            <button onClick={handleReset}>Ok</button>
          </div>
        </>
      ) : null}
    </div>
  )
}
