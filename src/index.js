const BEER_URL = 'http://localhost:3000/beers'
// PATCHING beers is @ http://localhost:3000/beers/:id
const beerListing = document.getElementById('list-group')
const beerDescription = document.getElementById('beer-detail')
var beers = []

class App {
  static createElement (element, attribute = '', parent = '', inner = '') {
    if (typeof (element) === 'undefined') {
      return false
    }
    let e = document.createElement(element)
    if (!Array.isArray(attribute)) {
      attribute = [attribute]
    }
    if ((typeof (attribute) === 'object') && (attribute !== '')) {
      for (let attr of attribute) {
        for (let key in attr) {
          e.setAttribute(key, attr[key])
        }
      }
    }
    if (!Array.isArray(inner)) {
      inner = [inner]
    }
    for (var i = 0; i < inner.length; i++) {
      if (inner[i].tagName) {
        e.appendChild(inner[i])
      } else {
        e.appendChild(document.createTextNode(inner[i]))
      }
    }
    if (parent) {
      parent.appendChild(e)
    }
    return e
  }
}
class Beer {
  constructor (id, name, tagline, firstBrewed, description, imageUrl, foodPairing = [], brewersTip, contributedBy) {
    this.id = id
    this.name = name
    this.tagline = tagline
    this.first_brewed = firstBrewed
    this.description = description
    this.image_url = imageUrl
    this.food_pairing = foodPairing
    this.brewers_tip = brewersTip
    this.contrinbuted_by = contributedBy
    this.onRenderDescription = this.renderDescription.bind(this)
    this.onSave = this.save.bind(this)
    beers.push(this)
  }

  render (parentElement = '') {
    const beerListing = App.createElement('li', {class: 'list-group-item'}, parentElement, `${this.name}`)
    beerListing.addEventListener('click', this.onRenderDescription)
  }

  static getBeerData () {
    window.fetch('http://localhost:3000/beers').then(function (response) {
      return response.json()
    }).then(function (beers) {
      const docFragment = document.createDocumentFragment()
      const parentListingElement = document.getElementsByClassName('list-group')
      for (let beer of beers) {
        const beerObj = new Beer(beer.id, beer.name, beer.tagline, beer.first_brewed, beer.description, beer.image_url, beer.food_pairing, beer.brewers_tip, beer.contributed_by)
        beerObj.render(docFragment)
      }
      parentListingElement[0].appendChild(docFragment)
    })
  }

  renderDescription () {
    const docFragment = document.createDocumentFragment()
    const header = App.createElement('h1', '', docFragment, `${this.name}`)
    const img_src = App.createElement('img', {src: `${this.image_url}`}, docFragment)
    const tagline = App.createElement('h3', '', docFragment, `${this.tagline}`)
    const descriptionTextArea = App.createElement('textarea', {id: `beer-${this.id}`}, docFragment, `${this.description}`)
    const editButton = App.createElement('button', [{id: 'edit-beer'}, {class: 'btn btn-info'}], docFragment, 'Save')
    editButton.addEventListener('click', this.onSave)

    if (beerDescription.firstChild) {
      while (beerDescription.firstChild) {
        beerDescription.removeChild(beerDescription.firstChild)
      }
    }
    beerDescription.appendChild(docFragment)
  }

  save () {
    const newDescription = document.getElementById(`beer-${this.id}`).value
    window.fetch(`http://localhost:3000/beers/${this.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({description: `${newDescription}`})
    })
    this.description = newDescription
    this.renderDescription()
  }
}

const app = Beer.getBeerData()
