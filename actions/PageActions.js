
import alt from '../alt'

class PageActions {

  updatePage(page) {
    this.dispatch(page)
  }

  previousPage () {
    let page = this.page
    if (page > 1) {
      page--
      this.actions.updatePage(page)
    }
  }

  nextPage () {
    let page = this.page
    page++
    this.actions.updatePage(page)
  }

}

export default alt.createActions(PageActions)

