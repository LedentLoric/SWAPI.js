// AJAX REQUESTS
function makeAjaxRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        callback(xhr.response);
	    }
	};
	xhr.send();
	
}

document.addEventListener('DOMContentLoaded', function() {

	// Hamburger Menu
	document.querySelector('.header-hamburger-menu').addEventListener('click', function() {
		this.querySelector('.header-hamburger-icon').classList.toggle("open");

		let menuOverlay = document.querySelector('.header-menu-overlay');
		
		let screenDiagonal = 2 * Math.sqrt(Math.pow(document.body.offsetWidth, 2) + Math.pow(document.body.offsetHeight, 2));
		menuOverlay.style.width = screenDiagonal + 'px';
		menuOverlay.style.height = screenDiagonal + 'px';

		menuOverlay.classList.toggle('header-menu-overlay-open');

		let menuContainer = document.querySelector('.header-menu-container');
		menuContainer.classList.toggle('header-menu-container-open');
		document.querySelector('.header-title').classList.toggle('header-title-hidden');
	});

	let url = new URL(window.location.href);
	let epId = url.searchParams.get("episode_id");
	
	let sectionTitle = document.querySelector('.section-title');
	let loader = document.querySelector('.loader');

	if (epId === null) {
		sectionTitle.innerText = 'FilmS';

		// Get all Films
		makeAjaxRequest('https://swapi.co/api/films/', function(data) {
			loader.style.opacity = 0;

			let films = data.results;

			films.sort(function(a, b) {
				return a.episode_id - b.episode_id;
			});

			let filmsSection = document.querySelector('.films-section');

			films.forEach(function(film, index) {
				let filmElement = document.createElement('div');
				let htmlContent = 
					'<div class="film-container">' +
						'<div class="film-content">' +
							'<a href="?episode_id=' + film.episode_id + '" class="film-link">' + 
								'<img src="assets/images/film-' + film.episode_id + '.jpeg" class="film-image"/>' +
								'<p class="film-title">' + film.title + '</p>' +
							'</a>' +
						'</div>' +
					'</div>';

				filmElement.innerHTML = htmlContent;
				
				let filmElementChild = filmElement.firstChild;
				filmsSection.appendChild(filmElementChild);

				filmElementChild.querySelector('.film-link').addEventListener('click', function(e) {
					localStorage.setItem('selectedFilmURL', film.url);
				});

				setTimeout(function() {
					filmElementChild.style.opacity = 1
				}, 50);
				
			});
		});
	
	} else {
		let selectedFilmURL = localStorage.getItem('selectedFilmURL');

		// Get selected Film
		makeAjaxRequest(selectedFilmURL, function(data) {
			loader.style.opacity = 0;

			let film = data;

			sectionTitle.innerText = film.title;

			let selectedFilmSection = document.querySelector('.selected-film-section');

			let imageElement = document.createElement('div');
			imageElement.innerHTML = 
				'<div class="selected-film-image-container">' +
					'<img src="assets/images/film-' + film.episode_id + '.jpeg" class="film-image"/>' +
				'</div>';

			let descriptionElement = document.createElement('div');
			descriptionElement.innerHTML = 
				'<div class="selected-film-description-container">' + 
					'<p class="seleted-film-description-title">Opening Crawl</p>' + 
					'<p class="seleted-film-description-content">' + film.opening_crawl + '</p>' + 
					'<div class="seleted-film-information-container">' + 
						'<div class="seleted-film-information-content">' +
							'<p class="seleted-film-description-title">Producer</p>' + 
							'<p class="seleted-film-description-content">' + film.producer + '</p>' + 
							'<p class="seleted-film-description-title">Director</p>' + 
							'<p class="seleted-film-description-content">' + film.director + '</p>' + 
						'</div>' +
						'<div class="seleted-film-information-content">' +
							'<p class="seleted-film-description-title">Release Date</p>' + 
							'<p>' + film.release_date + '</p>' + 
						'</div>' +
					'</div>' +
				'</div>';

			selectedFilmSection.appendChild(imageElement.firstChild);
			selectedFilmSection.appendChild(descriptionElement.firstChild);

			console.log(film);
		});
	}
	
});