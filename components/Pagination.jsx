
import React from 'react'
import { Link } from 'react-router'
import PageActions from '../actions/PageActions'

class Pagination extends React.Component {

  constructor () {
    super ()
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
  }

  previous () {
    let page = this.props.page
    if (page > 1) {
      page--
      PageActions.updatePage(page)
    }
  }

  next () {
    let page = this.props.page
    page++
    PageActions.updatePage(page)
  }

  render () {
    let page = this.props.page
    let path = this.props.router.path

    return (
      <div className='py2 flex flex-center'>
        <Link
          to={path}
          onClick={this.previous}
          query={{ page: (page > 1) ? (page - 1) : 1 }}
          className='btn'>
          Previous
        </Link>
        <div className='flex-auto' />
        <div className='h5 bold'>{page}</div>
        <div className='flex-auto' />
        <Link
          to={path}
          onClick={this.next}
          query={{ page: page + 1 }}
          className='btn'>
          Next
        </Link>
      </div>
    )
  }

}

export default Pagination

