import React, { Component } from 'react'

class TodoList extends Component {
  render() {
    const { task } = this.props
    return (
      <div className='todoListMain'>
        <div className='header'>
          <form onSubmit={this.props.addItem}>
            <input placeholder='Task' />
            <button type='submit'> Add {task}</button>
          </form>
        </div>
      </div>
    )
  }
}

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

export default TodoList