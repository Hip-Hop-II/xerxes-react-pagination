import React, { PureComponent, Fragment } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './Pagination.css'
import Select from './Select.js'
import JumpPager from './JumpPager'

const Total = ({total}) => (
  <div className="xerxes-total">
    <span>共 {total} 条</span>
  </div>
)

class Pagination extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      current: props.currentPage,
      jumpValue: null,
      size: props.pageSize
    }
  }
  itemClick = (current) => {
    if (current !== this.state.current) {
      this.setCurrentPage(current)
    }
  }
  /**
   * 验证值是否符合要求
   * @param {*当前页} value 
   */
  valideCurrent (value) {
    value = Number(value)
    if (!value || isNaN(value) || value > this._totalPage) {
      return false
    }
    return value
  }
  setCurrentPage (pageNumber) {
    if (this.valideCurrent(pageNumber)) {
      this.setState({
        current: this.valideCurrent(pageNumber)
      })
      if (this.props.onChange) {
        this.props.onChange(this.valideCurrent(pageNumber))
      }
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
  handleJumpPrev = () => {
    const page = this.state.current - 5
    page ?  this.setCurrentPage(page) : this.setCurrentPage(1)
  }
  handleJumpNext = () => {
    const page = this.state.current + 5
    page ?  this.setCurrentPage(page) : this.setCurrentPage(1)
  }
  renderMorePaginationItem = (totalPage) => {
    const {current} = this.state
    return (
      <Fragment>
      <li className={classnames('xerxes-pagination__item', {
        'current': current === 1
      })} onClick={() => this.itemClick(1)}>1</li>
      {current > 3 && <li className={classnames('xerxes-pagination__item')} 
      onClick={this.handleJumpPrev}
      >...</li>}
      {/* current > 3 && <li className={classnames('xerxes-pagination__item')} onClick={() => this.itemClick(current - 2)} >{ current - 2 }</li>  */}
      {current > 2 && <li className={classnames('xerxes-pagination__item')} onClick={() => this.itemClick(current - 1)} >{ current - 1 }</li>}
      {current !== 1 && current !== totalPage && <li className={classnames('xerxes-pagination__item', {'current': true})} >{ current}</li>}
      
      {current < totalPage - 1 && <li className={classnames('xerxes-pagination__item')} onClick={() => this.itemClick(current + 1)} >{ current + 1 }</li>}
      {current < totalPage - 2 && <li className={classnames('xerxes-pagination__item')} onClick={() => this.itemClick(current + 2)} >{ current + 2 }</li>}
      {current < totalPage - 3 && <li className={classnames('xerxes-pagination__item')} 
      onClick={this.handleJumpNext}
      >...</li>}
      {totalPage > 1 && <li className={classnames('xerxes-pagination__item', {
        current: current === totalPage
      })} onClick={() => this.itemClick(totalPage)}>{ totalPage }</li>}
      </Fragment>
    )
  }
  get _totalPage () {
    const {total, pageSize} = this.props
    const {size} = this.state
    const num = Math.ceil(total / size)
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
  /**
   * @param {* 当前激活的页数} current
   */
  _jumpPageChange = (current) => {
    this.setCurrentPage(current)
  }

  /**
   * @param {* 当前激活的条数} item
   * @param {* 当前激活的条数索引} index
   */
  _selectChange = (item, index) => {
    const {total} = this.props
    const {current, size} = this.state
    if (item !== size) {
      if (Math.ceil(total / item) < current) {
        this.setCurrentPage(1)
      }
      this.setPageSize(item)
    }
  }

  /**
   * 
   * @param {*当前激活的显示条数} size 
   */
  setPageSize (size) {
    this.setState({
      size
    })
    if (this.props.onSizeChange) {
      this.props.onSizeChange(size)
    }
  }

  _renderList () {
    const {total} = this.props
    return !isNaN(Number(total)) && Number(total) > 0 ? (
      <ul className="xerxes-pagination__list">
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
          <i className="icon iconfont icon-xiangyoujiantou"></i>
        </li>
      </ul>
    ) : null
  }

  /**
   * 格式化布局样式
   * @param {*布局选项} layout 
   */
  formatLayout (layout) {
    const {pageSizes} = this.props
    let layoutOptions = {
      pager: <Select 
      options={pageSizes}
        selectChange={this._selectChange}
      />,
      jumper: <JumpPager 
      totalPage={this._totalPage}
      jumpPageChange={this._jumpPageChange}
      />
    }
    const layoutArray = layout.split(',')
    layout.indexOf('total') !== -1 && layoutArray.splice(layoutArray.indexOf('total'), 1)
    let options = []
    if (layoutArray.length > 0) {
      options = layoutArray.map((item, index) => {
        if (layoutOptions[item.trim()]) {
          return <Fragment key={index}>
            {layoutOptions[item.trim()]}
          </Fragment>
        }
      })
    }
    return options
  }

  render () {
    const {className, style, layout, total} = this.props
    return (
      <div className={classnames('xerxes-wrapper', className)}
        style={style}
      >
        {layout.indexOf('total') !== -1 && <Total total={total} />}
        {this._renderList()}
        {this.formatLayout(layout)}
        
      </div>
    )
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  layout: PropTypes.string,
  pageSizes: PropTypes.array,
  onSizeChange: PropTypes.func,
  onCurrentChange: PropTypes.func
}

Pagination.defaultProps = {
  total: 0,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 30, 40],
  layout: 'pager, jumper, total'
}

export default Pagination
