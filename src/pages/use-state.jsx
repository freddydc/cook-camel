import styles from '../styles/Card.module.css'
import { useEffect, useState } from 'react'

const KEY_GUARD = 'cook'

export const UseState = ({ name }) => {
  const [inputData, setInputData] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        try {
          if (inputData === KEY_GUARD) {
            setLoading(false)
            setError(null)
            return
          }
          throw new Error('Error the code is incorrect')
        } catch (err) {
          setError(err.message)
          setLoading(false)
        }
      }, 1000)
    }
  }, [loading])

  return (
    <div className={`${styles.card} ${error && !loading ? styles.error : ''}`}>
      <div>
        <h1>Delete {name}</h1>
      </div>
      <div>
        {loading ? <h2>Loading...</h2> : null}
        {error && !loading ? <h2>{error}</h2> : null}
        {!error && !loading ? <h2>Type the security code</h2> : null}
      </div>
      <div>
        <input
          placeholder="Cook..."
          value={inputData}
          onChange={e => setInputData(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => setLoading(previousValue => !previousValue)}>
          Check
        </button>
      </div>
    </div>
  )
}
