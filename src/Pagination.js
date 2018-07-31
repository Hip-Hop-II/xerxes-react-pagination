import React, { PureComponent, Fragment } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './Pagination.css'
import Select from './Select.js'

class Pagination extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      current: props.currentPage,
      jumpValue: null
    }
  }
  itemClick = (current) => {
    if (current !== this.state.current) {
      this.setCurrentPage(current)
    }
  }
  setCurrentPage (pageNumber) {
    this.setState({
      current: pageNumber
    })
    if (this.props.onChange) {
      this.props.onChange(pageNumber)
    }
  }
  renderPaginationItem (length) {
    const {current} = this.state
    return Array.from({length}).map((item, index) => (
      <li className={classnames('xerxes-pagination__item', {
        'current': current === index + 1
      })} key={index} onClick={() => this.itemClick(index + 1)}>{index + 1}</li>
    ))
  }
  renderMorePaginationItem = (totalPage) => {
    const {current} = this.state
    return (
      <Fragment>
      <li className={classnames('xerxes-pagination__item', {
        'current': current === 1
      })} onClick={() => this.itemClick(1)}>1</li>
      {current > 3 && <li className={classnames('xerxes-pagination__item')} >...</li>}
      {/* current > 3 && <li className={classnames('xerxes-pagination__item')} onClick={() => this.itemClick(current - 2)} >{ current - 2 }</li>  */}
      {current > 2 && <li className={classnames('xerxes-pagination__item')} onClick={() => this.itemClick(current - 1)} >{ current - 1 }</li>}
      {current !== 1 && current !== totalPage && <li className={classnames('xerxes-pagination__item', {'current': true})} >{ current}</li>}
      
      {current < totalPage - 1 && <li className={classnames('xerxes-pagination__item')} onClick={() => this.itemClick(current + 1)} >{ current + 1 }</li>}
      {current < totalPage - 2 && <li className={classnames('xerxes-pagination__item')} onClick={() => this.itemClick(current + 2)} >{ current + 2 }</li>}
      {current < totalPage - 3 && <li className={classnames('xerxes-pagination__item')} >...</li>}
      {totalPage > 1 && <li className={classnames('xerxes-pagination__item', {
        current: current === totalPage
      })} onClick={() => this.itemClick(totalPage)}>{ totalPage }</li>}
      </Fragment>
    )
  }
  get _totalPage () {
    const {total, pageSize} = this.props
    const num = Math.ceil(total / pageSize)
    return num === 0 ? 1 : num
  }
  get _prevDisabled () {
    const {current} = this.state
    return current === 1
  }
  get _nextDisabled () {
    return this.state.current === this._totalPage
  }
  prev = () => {
    const {current} = this.state
    if (this._prevDisabled) {
      return false
    }
    this.setCurrentPage(current - 1)
  }
  next = () => {
    const {current} = this.state
    if (this._nextDisabled) {
      return false
    }
    this.setCurrentPage(current + 1)
  }
  _jumpPageChange = (e) => {
    const value = Number(e.target.value)
    if (!value || isNaN(value) || value > this._totalPage) {
      return
    }
    if (value !== this.state.current) {
      this.setState({
        current: Number(value)
      })
    }
  }
  render () {
    const {total} = this.props
    return (
      <div className={classnames('xerxes-wrapper')}

      >
        <div className="xerxes-total">
          <span>共 {total} 条</span>
        </div>
        {!isNaN(Number(total)) && Number(total) > 0 && <ul className="xerxes-pagination__list">
          <li className={classnames('xerxes-pagination__item prevpage', {
            'disabled': this._prevDisabled
          })}
          onClick={this.prev}
          >
            <i className="icon iconfont icon-xiangzuojiantou"></i>
          </li>
          {this._totalPage < 8 ? this.renderPaginationItem(this._totalPage) : this.renderMorePaginationItem(this._totalPage)}
          <li className={classnames('xerxes-pagination__item nextpage', {
            disabled: this._nextDisabled
          })}
          onClick={this.next}
          >
            <i className="iconfont icon-xiangyoujiantou"></i>
          </li>
        </ul> }
        <Select 
        options={[10, 20, 30, 40]}
        />
        <div className="xerxes-quickjump">
          <span>前往</span>
          <input 
          type="number"
          min={1}
          max={this._totalPage}
          onBlur={this._jumpPageChange}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              this._jumpPageChange(e)
            }
          }}
          />
          <span>页</span>
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number
}

Pagination.defaultProps = {
  total: 0,
  currentPage: 1,
  pageSize: 5
}

export default Pagination
