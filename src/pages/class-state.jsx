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
      loading: false,
      confirmed: false,
      deleted: false
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
            this.handleVerifyKey()
            return
          }
          throw new Error('Error the code is incorrect')
        } catch (err) {
          this.handleErrorMessage(err)
        }
      }, 1000)
    }
  }

  handleVerifyKey = () => {
    this.setState({
      loading: false,
      error: null,
      confirmed: true
    })
  }

  handleGetInput = e => {
    this.setState({ inputData: e.target.value })
  }

  handleSendVerifyKey = () => {
    this.setState({ loading: true })
  }

  handleErrorMessage = error => {
    this.setState({
      error: error.message,
      loading: false
    })
  }

  handleUndoChange = () => {
    this.setState({
      confirmed: false,
      inputData: ''
    })
  }

  handleResetChange = () => {
    this.setState({
      confirmed: false,
      deleted: false,
      inputData: ''
    })
  }

  handleDeleteData = () => {
    this.setState({ deleted: true })
  }

  render() {
    return (
      <div
        className={`${styles.card} ${
          this.state.error && !this.state.loading ? styles.error : ''
        }`}
      >
        {!this.state.confirmed ? (
          <>
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
                onChange={this.handleGetInput}
              />
            </div>
            <div>
              <button onClick={this.handleSendVerifyKey}>Check</button>
            </div>
          </>
        ) : null}

        {this.state.confirmed && !this.state.deleted ? (
          <>
            <div>
              <h1>Delete {this.props.name}</h1>
            </div>
            <div>
              <h2>Are you sure?</h2>
            </div>
            <div>
              <button onClick={this.handleDeleteData}>Ok</button>
              <button onClick={this.handleUndoChange}>Cancel</button>
            </div>
          </>
        ) : null}

        {this.state.deleted ? (
          <>
            <div>
              <h1>{this.props.name} Deleted</h1>
            </div>
            <div>
              <h2>Recover {this.props.name}</h2>
            </div>
            <div>
              <button onClick={this.handleResetChange}>Ok</button>
            </div>
          </>
        ) : null}
      </div>
    )
  }
}
