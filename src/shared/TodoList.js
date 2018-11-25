import React, { Component } from 'react'
import '../styles/todoList'

class TodoList extends Component {
  constructor(props) {
    super(props)

    // let data

    // if (__isBrowser__) {
    //   data = window.__INITIAL_DATA__
    //   delete window.__INITIAL_DATA__
    // } else {
    //   data = this.props.staticContext.data
    // }

    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      },
      // data,
      // loading: data ? false : true,
    }

    // this.fetchData = this.fetchData.bind(this)
  }

  // handleInput(e) {
  //   console.log('Hello Input')
  // }

  // addItem() {
  //   console.log('Hello Add Item')
  // }

  componentDidMount() {
    if (!this.state.data) {
      // this.fetchData(this.props.match.params.id)
      // console.log('[ componentDidMount:this.props.match.params.id ]', this.props.match.params.id)
      console.log('[ TODOLIST ] componentDidMount fired')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // this.fetchData(this.props.match.params.id)
      // console.log('[ componentDidUpdate:this.props.match.params.id ]', this.props.match.params.id)
      console.log('[ TODOLIST ] componentDidUpdate fired')
    }
  }

  // fetchData(todos) {
  //   this.setState(() => ({
  //     loading: true
  //   }))

  //   // Available only on the as prop route method 
  //   this.props.loadData(todos)
  //     .then(data => this.setState(() => ({
  //       data,
  //       loading: false,
  //     })))
  //     .then(data => console.log('[ Todos ]', data))
  // }

  render() {
    const { task } = this.props
    // const { loading, data } = this.state

    // if (loading === true) {
    //   return <p>LOADING</p>
    // }

    return (
      <div className='todoListMain'>
        <div className='header'>
          <form onSubmit={this.props.addItem}>
            <input placeholder={task} />
            <button type='submit'> Add {task}</button>
          </form>
        </div>
      </div>
    )
  }
}

export default TodoList

// vs.

// export default const TodoList = props => (
//   <div className="todoListMain">
//     <div className="header">
//       <form onSubmit={this.props.addItem}>
//         <input placeholder="Task" name='test'/>
//         <button type="submit"> Add Task {this}</button>
//       </form>
//     </div>
//   </div>
// )