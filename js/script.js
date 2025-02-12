//Stvari kojima zelimo da pristupimo iz glabal state-a u bilo kojoj funkciji
const global = {
  // Za uzimanje ostatka url adrese posle "?" i .com,.net,.org
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "4f03c25d2cb6c0b7b33fd91d937f9a24",
    apiUrl: "http://api.themoviedb.org/3/",
  },
};
// Display 20 most popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  // const{results}-destructure the array
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
     <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />
            `
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
    `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}
// Popular Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/on_the_air");
  // const{results}-destructure the array
  // const showsFromUS = results.filter((showOrigin) =>
  //   showOrigin.origin_country.includes("US")
  // );
  // console.log(showsFromUS);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
     <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />
            `
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air date: ${show.first_air_date}</small>
            </p>
          </div>
    `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}
// Displaay movie datails
async function displayMovieDetails() {
  // window.location.search nam daje sve posle znaka ? u adresi(url)
  // sa .split podelimo i dobijamo array sa dva clana
  // sve pre i sve posle '=',nama treba ono posle
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieId}`);
  // console.log(movie);

  //Overlay for background image
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
              : `
          <img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />
          `
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
            ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name} </li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies
            .map((companie) => companie.name)
            .join(", ")}
          </div>
        </div>
  `;
  document.querySelector("#movie-details").appendChild(div);
}
// Display popular shows
async function displayShowDetails() {
  // window.location.search nam daje sve posle znaka ? u adresi(url)
  // sa .split podelimo i dobijamo array sa dva clana
  // sve pre i sve posle '=',nama treba ono posle
  const showId = window.location.search.split("=")[1];
  const show = await fetchAPIData(`tv/${showId}`);
  console.log(show);

  //Overlay for background image
  displayBackgroundImage("tv", show.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            show.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
              : `
          <img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />
          `
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release date: ${show.first_air_date}</p>
            <p>
            ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name} </li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes: </span>${
              show.number_of_episodes
            } </li>
            <li><span class="text-secondary">Last Episode To Air: </span>${
              show.last_episode_to_air.name
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies
            .map((companie) => companie.name)
            .join(", ")}
          </div>
        </div>
  `;
  document.querySelector("#show-details").appendChild(div);
}

// Serch movies and tv shows function

async function search() {
  // za dobijenje ostatka url adrese posle ? i .com,.org...
  const querystring = window.location.search;
  // za dobijanje podataka iz url,dobiju se metodi
  const urlParams = new URLSearchParams(querystring);
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");
  //validation-provera da li je nesto uneto u search polje
  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIdata();
    // console.log(results);
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;
    // console.log(global.search.totalPages);

    if (results.length === 0) {
      showAlert("No results found");
      return;
    }
    displaySearchResults(results);
    document.querySelector("#search-term").value = "";
  } else {
    showAlert("Please enter a search term", "alert-error");
  }
}
// Display search results
function displaySearchResults(results) {
  // Clear previous results
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
     <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${
                global.search.type === "movie" ? result.title : result.name
              }"
            />`
                : `
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${
                global.search.type === "movie" ? result.title : result.name
              }"
            />
            `
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === "movie"
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
    `;
    document.querySelector(
      "#search-results-heading"
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;
    document.querySelector("#search-results").appendChild(div);
  });
  displayPagination();
}
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;
  document.querySelector("#pagination").appendChild(div);

  // Sakrij 'prev' i'next dugmica na prvoj stranici
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");

  if (global.search.page === 1 && prevButton) {
    prevButton.style.display = "none";
  } else if (prevButton) {
    prevButton.style.display = "inline-block"; // ili "block" u zavisnosti od dizajna
  }

  if (global.search.page === global.search.totalPages && nextButton) {
    nextButton.style.display = "none";
  } else if (nextButton) {
    nextButton.style.display = "inline-block";
  }

  // Next page
  document.querySelector("#next").addEventListener("click", async () => {
    // API request for next page

    global.search.page++;
    const { results, total_pages } = await searchAPIdata();
    displaySearchResults(results);
  });

  // Previous page
  document.querySelector("#prev").addEventListener("click", async () => {
    // API request for next page

    global.search.page--;
    const { results, total_pages } = await searchAPIdata();
    displaySearchResults(results);
  });
}

// Display swiper slider

async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  results.forEach((movie) => {
    // console.log(movie);
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
                1
              )} / 10
            </h4>
    `;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwiper();
  });
}
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch data form TMDB API
// OVO je samo vezba.Za pravi projekat zahtevi(requests) i API_KEY
// bi trebalo da se cuvaju na serveru.
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
async function searchAPIdata() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&
    language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
// Spinner za vreme loadovanja stranice
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
// Show custom  alert
function showAlert(message, className = "alert-error") {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert", className);
  alertElement.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertElement);
  setTimeout(() => alertElement.remove(), 3000);
}
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Display backdrom on details pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no=repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.2 ";
  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}
// Page Router function
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows");
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      console.log("Movie details");
      break;
    case "/tv-details.html":
      displayShowDetails();
      console.log("TV details");
      break;
    case "/search.html":
      search();
      console.log("Search Page");
      break;
  }
  highlightActiveLink();
}
document.addEventListener("DOMContentLoaded", init);
