import styles from '../styles/Card.module.css'
import { useState } from 'react'

export const UseState = ({ name }) => {
  const [error, setError] = useState(true)

  return (
    <div className={`${styles.card} ${error ? styles.error : ''}`}>
      <div>
        <h1>Delete {name}</h1>
      </div>
      <div>
        {error ? <h2>Error the code is incorrect</h2> : null}
        {!error ? <h2>Type the security code</h2> : null}
      </div>
      <div>
        <input placeholder="Cook..." />
      </div>
      <div>
        <button onClick={() => setError(previousValue => !previousValue)}>
          Check
        </button>
      </div>
    </div>
  )
}
