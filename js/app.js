document.addEventListener('DOMContentLoaded', function() {
	// Hamberger Menu
	document.querySelector('.header-hamburger-menu').addEventListener('click', function() {
		this.querySelector('.header-hamburger-icon').classList.toggle("open");
	});
});