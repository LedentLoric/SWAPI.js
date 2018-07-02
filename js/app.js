document.addEventListener('DOMContentLoaded', function() {
	
	// Hamburger Menu
	document.querySelector('.header-hamburger-menu').addEventListener('click', function() {
		this.querySelector('.header-hamburger-icon').classList.toggle("open");

		let menuContainer = document.querySelector('.header-menu-overlay');
		
		let screenDiagonal = 2 * Math.sqrt(Math.pow(document.body.offsetWidth, 2) + Math.pow(document.body.offsetHeight, 2));
		menuContainer.style.width = screenDiagonal + 'px';
		menuContainer.style.height = screenDiagonal + 'px';

		menuContainer.classList.toggle('header-menu-overlay-open');
	});
});