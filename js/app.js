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
	    // else {
	    //     reject('Request failed.  Returned status of ' + xhr.status);
	    // }
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

	// Films
	makeAjaxRequest('https://swapi.co/api/films/', function(data) {
		let films = data.results;

		films.sort(function(a, b) {
			return a.episode_id - b.episode_id;
		});

		let filmsSection = document.querySelector('.films-section');

		films.forEach(function(film, index) {
			console.log(film)
			let filmElement = document.createElement('div');
			let htmlContent = 
				'<div class="film-container">' +
					'<div class="film-content">' +
						'<a href="#">' + 
							'<img src="assets/images/film-' + film.episode_id + '.jpeg"/>' +
							'<p class="film-title">' + film.title + '</p>' +
						'</a>' +
					'</div>' +
				'</div>';

			filmElement.innerHTML = htmlContent;
			
			let filmElementChild = filmElement.firstChild;
			filmsSection.appendChild(filmElementChild);


			setTimeout(function() {
				filmElementChild.style.opacity = 1
			}, 50);
			
		});
	});
});