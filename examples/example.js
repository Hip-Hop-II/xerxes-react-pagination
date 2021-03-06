import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Pagination from '../src/Pagination'
import './example.css'

class App extends Component {
  state = {
    total: 50
  }
  click = () => {
    this.setState({total: this.state.total+10})
  }
  _pageChange = (num) => {
    console.log(num)
  }
  render () {
    return (
      <div className="wrapper">
        <h2>hello pagination!!</h2>
        <Pagination total={this.state.total} onChange={this._pageChange} 
        layout="total, jumper, pager"
        />
        <button onClick={this.click}>点击</button>
        <h2>hello pagination!!</h2>
        <Pagination total={this.state.total} onChange={this._pageChange} 
        />
        <h2>hello pagination!!</h2>
        <Pagination total={400} onChange={this._pageChange} 
        layout="total, pager"
        />
        <button onClick={this.click}>点击</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
