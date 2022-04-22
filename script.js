const $form = document.getElementById('form')
const $udate = document.getElementById('udate')
const $apod = document.getElementById('apod')
const $fav = document.getElementById('fav')
const $modal = document.getElementById('modal')

const $mtitle = document.getElementById('mtitle')
const $mdate = document.getElementById('mdate')
const $mimg = document.getElementById('mimg')
const $mexplaination = document.getElementById('mexplaination')

const favdata = {
    notes: [
        { title: '', date: '', image: '' },
    ],
}


function createFavorites() {
    // creating an empty array
    const html = []

    for (let i = 1; i < favdata.notes.length; i++) {
        html.push(`

        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${favdata.notes[i].image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${favdata.notes[i].title}</h5>
          <p class="card-text">${favdata.notes[i].date}</p>
        </div>
      </div>`)
    }

    console.log(favdata.value)

    $fav.innerHTML = html.join('')
}
createFavorites()



$form.addEventListener('submit', async function(e) {


    e.preventDefault()


    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=rwCIeeeoODb1DfH4awtLSoHQ4HM6yF9cxK6hRPBI&date=' + $udate.value)

    const json = await response.json()


    const favorites = {

        stitle: json.title,
        sdate: json.date,
        sexplanation: json.explanation,
        surl: json.url,

    }


    localStorage.setItem('favorites', JSON.stringify(favorites))
    console.log(favorites.value)


    if (json.date == undefined) {

        $modal.innerHTML = `
        <div id="modal" class="" tabindex="-1" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <h6></h6>
                    <button  id="cmodal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
                </div>
                <div class="modal-body">
                    <div class="image">
                        <img class="float-left img-thumbnail" src="" alt="">
                    </div>
                    <p>Selection not Made or Please Select the Valid date</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`

    } else {

        $modal.innerHTML = `
        <div id="modal" class="" tabindex="-1" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${json.title}</h5>
                        <h6>${json.date}</h6>
                        <button id="cmodal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                    </div>
                    <div class="modal-body">
                        <div class="image">
                            <img class="float-left img-thumbnail" src="${json.url}" alt="">
                        </div>
                        <p>${json.explanation}</p>
                    </div>
                    <div class="modal-footer">
                        <button id="savemodal" type="button" class="btn btn-primary">Add to Favorites</button>
                        <button id="cmodal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
    }

    $modal.style.display = 'block'

    addFavoriteEvent(json)


})

const refreshPrevent = localStorage.getItem('favorites')



if (refreshPrevent) {

    const favorites = JSON.parse(refreshPrevent)
        // this favorites is an array
        // favorites[ fav1, fav2 ,fav3]

    // $modal.innerHTML = `
    //         <div id="modal" class="" tabindex="-1" >
    //         <div class="modal-dialog" role="document">
    //             <div class="modal-content">
    //                 <div class="modal-header">
    //                     <h5 class="modal-title">${favorites.stitle}</h5>
    //                     <h6>${favorites.sdate}</h6>
    //                     <button id="cmodal" type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                 <span aria-hidden="true">&times;</span>
    //               </button>
    //                 </div>
    //                 <div class="modal-body">
    //                     <div class="image">
    //                         <img class="float-left img-thumbnail" src="${favorites.surl}" alt="">
    //                     </div>
    //                     <p>${favorites.sexplanation}</p>
    //                 </div>
    //                  <div class="modal-footer">
    //                     <button id="savemodal" type="button" class="btn btn-primary">Add To Favorites</button>
    //                     <button id="cmodal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //                 </div>
    //             </div>
    //         </div>
    //         </div>`

    createFavorites()

}


function addFavoriteEvent(json) {

    const $savemodal = document.getElementById('savemodal')

    $savemodal.addEventListener('click', function() {

        const favorites = JSON.parse(refreshPrevent)
        favorites.push(json)

        favdata.notes.push({
            title: json.title,
            date: json.date,
            image: json.url,
        })

        $modal.style.display = 'none'

        // render favorites
        createFavorites()

        // store the new favorite to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites))
        console.log(favorites)
        console.log(localStorage)
    })

}


const $cmodal = document.getElementById('cmodal')

$cmodal.addEventListener('click', function() {

    $modal.style.display = 'none'

})