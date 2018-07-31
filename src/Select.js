import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Select.css'

class Select extends PureComponent {
  constructor (props) {
    super(props)
    const selectValue = props.options.length > 0 ? props.options[0] : ''
    this.state = {
      selectIndex: 0,
      selectValue: selectValue
    }
  }
  renderItem = (options) => {
    const {selectIndex} = this.state
    return options.map((item, index) => (
      <li className={classnames('xerxes-select__item', {
        'active': selectIndex === index
      })} key={index} onClick={() => this.itemClick(item, index)}>{`${item} 条/页`}</li>
    ))
  }
  itemClick = (item, index) => {
    this.setState({
      selectIndex: index,
      selectValue: this.props.options[index]
    })
    if (this.props.selectChange) {
      this.props.selectChange(item, index)
    }
  }
  render () {
    const {options} = this.props
    const {selectIndex} = this.state 
    return (
      <div className="xerxes-select__selection">
        <div className="xerxes-select__value">{`${options[selectIndex]} 条/页`}</div>
        <ul className="xerxes-select__list">
          {this.renderItem(options)}
        </ul>
      </div>
    )
  }
}

Select.propTypes = {

}

export default Select
