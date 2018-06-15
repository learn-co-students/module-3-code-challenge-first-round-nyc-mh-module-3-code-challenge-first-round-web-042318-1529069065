document.addEventListener("DOMContentLoaded", function(event) {

BEERS_URL = "http://localhost:3000/beers"
beerList = document.getElementById('list-group')
beerDetail = document.getElementById('beer-detail')


function index () {
    fetch(BEERS_URL).then(r=>r.json()).then(appendBeersToIndex)
}
index()

function appendBeersToIndex (allBeers) {
    allBeers.forEach(beer => {
        beerList.innerHTML += `<li class="list-group-item" id="${beer.id}">${beer.name}</li>`
    });
}

beerList.addEventListener('click', e=>{
    if (e.target.className === "list-group-item" ) {
        getBeerDetails(e.target.id)
    }
})

function getBeerDetails (beerId) {
    fetch(`${BEERS_URL}/${beerId}`).then(r=>r.json()).then(appendBeerDatilsPage)
}

function appendBeerDatilsPage(beer){
    beerDetail.innerHTML =
    `
    <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
                <textarea id='description-edit' >${beer.description}</textarea>
            <button id="${beer.id}" class="btn btn-info">
        Save
    </button>
    ` 

}


beerDetail.addEventListener('click', e=> {

    if (e.target.className === 'btn btn-info') {
        inputField = document.getElementById('description-edit')
        input = inputField.value
        sendUpdateToServer(e.target.id, input)
    }
})


function sendUpdateToServer (beerId, newDescription) {
    config = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify({
            description: `${newDescription}`
        })
    }

    fetch(`${BEERS_URL}/${beerId}`, config).then(r=>r.json()).then(console.log)
}


});
