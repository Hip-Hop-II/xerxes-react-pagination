import React from 'react'
import Select from '../src/Select'
import {mount, shallow} from 'enzyme'

describe('test props', () => {
  const select = mount(<Select options={[20, 30, 40, 50]} />)
  it('options is array and has values', () => {
    expect(select.props().options).toEqual([20, 30, 40, 50])
  })
})
