const apiURL = 'http://localhost:3000/beers'
const ulListGroup = document.getElementById('list-group')
const divClassListToShow = document.createElement('DIV')

fetch(apiURL).then(r=> r.json()).then(getHTMLBeers)
// fetch(apiURL).then(r=> r.json()).then(getBeersDetails)

ulListGroup.addEventListener('click', function(event){
  event.preventDefault()
  if (event.target) {
    const beerId = event.target.id
    showBeerDetail(beerId)
  }

})

const getBeerDetail = document.getElementById('beer-detail')
getBeerDetail.addEventListener('click', function(event){


  if (event.target.className == "btn btn-info") {
  var thing = document.getElementById('textThing')
  var updateText = thing.value
  updateDescription(event, updateText)
}

})

// function getBeersDetails(beers) {
//   beers.map(beer => getBeer(beer)
//
// }

// function getBeersDetails(beers) {
//   beers.map(a => getBeer(a)
// }

function updateDescription(event, updateText) {
  const body = {
    description: updateText
  }
  const config = {
    method: 'PATCH',
    headers:  {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body:JSON.stringify(body)
  }
  fetch(`${apiURL}/${event.target.id.slice(event.target.id.length - 1, event.target.id.length)}`, config).then(r=> r.json()).then(showBeer)


}


function getHTMLBeers(beers) {
  beers.map(getHTMLBeer)
  beers.map(getBeer)
}

function getBeer(beer) {
  const divIdBeerDetail = document.getElementById('beer-detail')

  const divClassListToShow = document.createElement('DIV')
  divClassListToShow.setAttribute('id', `the-${beer.id}`)
   divClassListToShow.innerHTML = `<h1>${beer.name}</h1>
          <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
              <textarea>${beer.description}</textarea>
            <button id="edit-beer-${beer.id}" class="btn btn-info">
                Save
              </button>`


}


function showBeerDetail(beerId, event){
  const beerDetail = document.getElementById('beer-detail')
  const tag = document.getElementById(`the-${beerId}`)

  // beerDetail.innerHTML = tag.innerHTML

  fetch(`${apiURL}/${beerId}`).then(r => r.json()).then(showBeer)
}


function showBeer(beer) {
  const divClassListToShow = document.createElement('DIV')
  divClassListToShow.setAttribute('id', `the-${beer.id}`)
   divClassListToShow.innerHTML = `<h1>${beer.name}</h1>
          <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
              <textarea id="textThing">${beer.description}</textarea>
            <button id="edit-beer-${beer.id}" class="btn btn-info">
                Save
              </button>`
    const show = document.getElementById('beer-detail')
  show.innerHTML = divClassListToShow.innerHTML
}

function getHTMLBeer(beer) {

  const li = document.createElement('LI')
  li.setAttribute('class', 'list-group-item')
  li.setAttribute('id', `${beer.id}`)
  li.innerText = beer.name
  ulListGroup.appendChild(li)



}




// <div class='col-md-4'>
//   <ul class="list-group" id="list-group">
//   </ul>
// </div>
