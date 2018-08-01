import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class JumpPager extends PureComponent {
  _jumpPageChange = (e) => {
    this.props.jumpPageChange(e.target.value)
  }
  render () {
    const {totalPage} = this.props
    return (
      <div className="xerxes-quickjump">
        <span>前往</span>
        <input
          type="number"
          min={1}
          max={totalPage}
          onBlur={this._jumpPageChange}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              this._jumpPageChange(e)
            }
          }}
        />
        <span>页</span>
      </div>
    )
  }
}

JumpPager.propTypes = {
  totalPage: PropTypes.number,
  jumpPageChange: PropTypes.func,
  current: PropTypes.number
}

export default JumpPager
