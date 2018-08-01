import React from 'react'
import Pagination from '../src/Pagination'
import {mount, shallow} from 'enzyme'

describe('test props', () => {
  const pagination = mount(<Pagination total={50} />)
  it('options is array and has values', () => {
    expect(pagination.props().total).toBe(50)
  })
})
