
import alt from '../alt'
import PageActions from '../actions/PageActions'

class PageStore {

  constructor () {
    this.page = 1
    this.bindListeners({
      handleUpdatePage: PageActions.UPDATE_PAGE,
    })
  }

  handleUpdatePage (page) {
    this.page = page
  }

}

export default alt.createStore(PageStore, 'PageStore')

