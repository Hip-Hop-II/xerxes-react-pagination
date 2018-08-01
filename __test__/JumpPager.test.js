import React from 'react'
import JumpPager from '../src/JumpPager'
import {mount, shallow} from 'enzyme'

describe('test props', () => {
  const jumppager = mount(<JumpPager totalPage={50} current={2}  />)
  it('options is array and has values', () => {
    expect(jumppager.props().totalPage).toBe(50)
  })
})
