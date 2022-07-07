import styles from '../styles/Card.module.css'
import { Component } from 'react'

class Message extends Component {
  componentWillUnmount() {
    console.log('COMPONENT WILL UNMOUNT')
  }

  render() {
    return <h2>Loading...</h2>
  }
}

export class ClassState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      loading: false
    }
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT')
  }

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        try {
          this.setState({ loading: false })
        } catch (err) {
          this.setState({ error: true })
        }
      }, 1000)
    }
  }

  render() {
    return (
      <div className={`${styles.card} ${this.state.error ? styles.error : ''}`}>
        <div>
          <h1>Delete {this.props.name}</h1>
        </div>
        <div>
          {this.state.loading ? <Message /> : null}
          {this.state.error ? <h2>Error the code is incorrect</h2> : null}
          {!this.state.error && !this.state.loading ? (
            <h2>Type the security code</h2>
          ) : null}
        </div>
        <div>
          <input placeholder="Cook..." />
        </div>
        <div>
          <button
            onClick={() =>
              this.setState(previousState => ({
                loading: !previousState.loading
              }))
            }
          >
            Check
          </button>
        </div>
      </div>
    )
  }
}
