let movies = "spiderman"


// capturar dados informados em um formulário
const btn = document.querySelector("#send");

btn.addEventListener("click", function(e) {
    e.preventDefault();

    const movieName = document.querySelector("#name")

    movies = movieName.value

    console.log(movies)

    fetchMovies()
})
const fetchMovies = () => {
    // requisição para url com o nome do filme passado por parãmetro
    const getPokemonUrl = movies => `https://api.tvmaze.com/search/shows?q=${movies}&embed=episodes`

    fetch(getPokemonUrl(movies)).then(response => {
        return response.json()
    }).then(jsonBody => {

        // Tranformando o jason em um array para obter o tamanho do array de objeto formado pelo promisse
        let array = Object.keys(jsonBody).map(e => Object[e])
        let tamDate = array.length;
        let list = ''
        if (tamDate == 0) {
            alert('Esta API só recebe o nome de filmes no indioma Inglês')
            list += `<li class="card">
                        <h2 class="card-title"> 404! Nenhum filme encontrado! </h2>

                        <h3 class="card-subtitle">Esta API só recebe o nome de filmes no indioma Inglês</h3>
                     </li>`

        } else {

            for (let i = 0; i < tamDate; i++) {
                list += `<li class="card">
                            <div>
                                <img src="${jsonBody[i].show.image.medium}" alt="">
                            </div>
    
                            <h2 class="card-title"> ${jsonBody[i].show.name}</h2>
    
                            <h3 class="card-subtitle">${jsonBody[0].show.genres}</h3>
                         </li>`
            }
            console.log(jsonBody)
        }



        // Aqui começa a manipular o DOM
        const ul = document.querySelector('[data-js="movies"]')
        ul.innerHTML = list
    })
}

fetchMovies()