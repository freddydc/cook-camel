import styles from '../styles/Card.module.css'
import { Component } from 'react'

export class ClassState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: true
    }
  }

  render() {
    return (
      <div className={`${styles.card} ${this.state.error ? styles.error : ''}`}>
        <div>
          <h1>Delete {this.props.name}</h1>
        </div>
        <div>
          {this.state.error ? <h2>Error the code is incorrect</h2> : null}
          {!this.state.error ? <h2>Type the security code</h2> : null}
        </div>
        <div>
          <input placeholder="Cook..." />
        </div>
        <div>
          <button
            onClick={() =>
              this.setState(previousState => ({ error: !previousState.error }))
            }
          >
            Check
          </button>
        </div>
      </div>
    )
  }
}
