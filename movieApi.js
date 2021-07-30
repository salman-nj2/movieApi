let searchInputTxt = document.getElementById("search-input").value;
var searchBtn = document.getElementById("search-btn");

// function getMovielist(){
//     let searchInputTxt = document.getElementById('search-input').value
//     console.log('searchInputTxt:', searchInputTxt)
//     fetch(`https://www.omdbapi.com/?&apikey=6faec127&s=${searchInputTxt}`)
//     .then(function(res) {
//         res.json().then(function(res){
//             console.log(res)
//         })
//     })
//     .catch(function (err) {
//         console.log(err )
//     })
// }

function getMovielist() {
  let mov = document.getElementById("movie");
  mov.style.display = "block";
  mov.style.width = "30%";
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.omdbapi.com/?t=${searchInputTxt}&plot=full&apikey=6faec127`
  )
    .then((response) => response.json())

    .then((data) => {
      // console.log('data:', data)

      let html = "";
      console.log("data.movies:", data);
      function recommend() {
        if (data.imdbRating > 8.5) {
          return "<p>Recommended</p>";
        } else {
          return "";
        }
      }

      if (data.Title == undefined) {
        html =
          '<div class ="notFound"><p>Movie not found</p><img src="https://media4.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif?cid=6c09b952ef85de48e3e9d9af56b663ae7e098597c6fc458d&rid=giphy.gif&ct=g" id="notFound"></div>';
      } else {
        html += `
                        <div class = "movie-img">
                            <img src = "${data.Poster}" alt = "movie poster">
                        </div>
                        <div class = "movie-name">
                            <h3>${data.Title}</h3>
                            <h4>Genre : ${data.Genre}</h4>
                            <h4>imdb Rating : ${data.imdbRating}</h4>
                            <div class='rec'>${recommend()}</div>
                           
                            <h4>Released date : ${data.Released}</h4>
                            <button onclick="showplot()" id='showPlot'>see plot</button>
                            <div id="plot">${data.Plot}</div>
                        </div>
                `;
      }
      movie.innerHTML = html;
    });
}

var id = 0;
function showplot() {
  var plot = document.getElementById("plot");
  if (id % 2 === 0) {
    plot.style.display = "block";
  } else {
    plot.style.display = "none";
  }
  id++;
}

function home() {
  fetch(`https://www.omdbapi.com/?&apikey=6faec127&s=mission`)
    .then((response) => response.json())

    .then((data) => {
      let html = "";
      if (data.Search) {
        console.log("data.movies:", data.Search);
        data.Search.forEach((mov) => {
          html += `               <div id="flex">
                                        <div class = "movie-img">
                                            <img src = "${mov.Poster}" alt = "movie poster">
                                        </div>
                                        <div class = "movie-name">
                                            <h3>${mov.Title}</h3>
                                            <h4>Realsed date : ${mov.Year}</h4>
                                        </div>
                                        </div>
                `;
        });
      }

      movie.innerHTML = html;
    });
}
home();

function backtohome() {
  window.location.href = "./movieApi.html   ";
}
