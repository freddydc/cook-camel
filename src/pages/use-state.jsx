import styles from '../styles/Card.module.css'
import { useEffect, useState } from 'react'

export const UseState = ({ name }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        try {
          setLoading(false)
        } catch (err) {
          setError(true)
        }
      }, 1000)
    }
  }, [loading])

  return (
    <div className={`${styles.card} ${error ? styles.error : ''}`}>
      <div>
        <h1>Delete {name}</h1>
      </div>
      <div>
        {loading ? <h2>Loading...</h2> : null}
        {error ? <h2>Error the code is incorrect</h2> : null}
        {!error && !loading ? <h2>Type the security code</h2> : null}
      </div>
      <div>
        <input placeholder="Cook..." />
      </div>
      <div>
        <button onClick={() => setLoading(previousValue => !previousValue)}>
          Check
        </button>
      </div>
    </div>
  )
}
