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
});