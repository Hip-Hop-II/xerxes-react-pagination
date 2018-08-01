## xerxes-react-pagination

* [基本介绍](#基本介绍)
  * [安装说明](#安装说明)
  * [案例说明](#案例说明)
  * [props说明](#props说明)
  * [events说明](#events说明)
  * [methods说明](#methods说明)

## 基本介绍
这是一个基于 `react` 的分页组件， 包含 总条数，左右切换，快速跳转， 条数修改等完整的功能

### 安装说明

运行安装命令：

```
  npm i -s xerxes-react-pagination or yarn add xerxes-react-pagination

```

### 案例说明

介绍了基本的使用方式

```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Pagination from 'xerxes-react-pagination'
import Pagination from 'xerxes-react-pagination/lib/index.css'
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
        <h2>完整的分页</h2>
        <Pagination total={this.state.total} onChange={this._pageChange} />
        <button onClick={this.click}>点击</button>
        <h2>设置组件布局选项</h2>
        <Pagination total={400} 
        layout="pager, total"
        onChange={this._pageChange} />
        <button onClick={this.click}>点击</button>
      </div>
    )
  }
}

```

### props说明

| 属性 | 类型 | 默认值 | 可选值 | 描述 |
| :--- | :----: | :----: | :---: | :--- |
| total | Number | ❌  | -- | 初始化时数据的总条数 |
| currentPage     | Number | 1   | ---  | 当前激活的页数 |
| pageSize   | Number | 10  | ---  | 当前页显示的条数 |
| pageSizes  | Array  | [10, 20, 30, 40] | --- | 每页显示个数选择器的选项设置 |
| layout   | Array | 'pager, jumper, total'  | pager, jumper, total | 组件布局， 子组件名用逗号分隔 |

### events说明

| 事件名称 | 回调参数 | 事件说明 |
| :------ | :------:| :------ |
| onSizeChange | 每页条数 size | pageSize 改变时触发 |
| onCurrentChange | 当前页 currentPage | currentPage 改变时触发 |

### methods说明
| 方法名称 | 方法说明 | 参数说明 |
| :------ | :------- |
| setCurrentPage | 设置当前页 | 范围内的页数 |
