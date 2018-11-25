import React, { Component } from 'react'
import TodoList from './TodoList'
import Loader from './Loader'
import '../styles/todos'

class Todos extends Component {
  constructor(props) {
    super(props)

    let data

    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      data = this.props.staticContext.data
    }

    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      },
      data,
      loading: data ? false : true,
    }

    this.fetchData = this.fetchData.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    
  }

  handleInput(e) {
    console.log('Hello Input')
  }

  addItem() {
    console.log('Hello Add Item')
  }

  componentDidMount() {
    if (!this.state.data) {
      this.fetchData(this.props.match.params.id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(this.props.match.params.id)
    }
  }

  fetchData(todos) {
    this.setState(() => ({
      loading: true
    }))

    // Available only on the as prop route method 
    this.props.loadData(todos)
      .then(data => this.setState(() => ({
        data,
        loading: false,
      })))
      .then(data => console.log('[ TODOS ]', data))
  }

  render() {
    const { task } = this.props
    const { loading, data } = this.state

    if (loading === true) {
      return <Loader/>
    }

    return (
      <div className='Todo'>
        <div className='container'>
          <div className='todo-wrap'>
            <h1>TODOS</h1>
            <TodoList addItem={this.addItem} />
          </div>
        </div>
      </div>
    )
  }
}

export default Todos