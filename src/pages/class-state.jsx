import styles from '../styles/Card.module.css'
import { Component } from 'react'

const KEY_GUARD = 'cook'

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
      inputData: '',
      error: null,
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
          if (this.state.inputData === KEY_GUARD) {
            this.setState({
              loading: false,
              error: null
            })
            return
          }
          throw new Error('Error the code is incorrect')
        } catch (err) {
          this.setState({
            error: err.message,
            loading: false
          })
        }
      }, 1000)
    }
  }

  render() {
    return (
      <div
        className={`${styles.card} ${
          this.state.error && !this.state.loading ? styles.error : ''
        }`}
      >
        <div>
          <h1>Delete {this.props.name}</h1>
        </div>
        <div>
          {this.state.loading ? <Message /> : null}
          {this.state.error && !this.state.loading ? (
            <h2>{this.state.error}</h2>
          ) : null}
          {!this.state.error && !this.state.loading ? (
            <h2>Type the security code</h2>
          ) : null}
        </div>
        <div>
          <input
            placeholder="Cook..."
            value={this.state.inputData}
            onChange={e => this.setState({ inputData: e.target.value })}
          />
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
