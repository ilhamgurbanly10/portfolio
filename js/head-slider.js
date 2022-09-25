
flashSimpleSlider(".head-slider", {
	dots: true,
	autoplay: true,
	autoplaySpeed: "very-slow",
	speed: "2.5s",
	draggable: false,
});


// slider-links

const links = document.querySelectorAll('.head-slide-link');
links.forEach(link => link.addEventListener('click', function(event) {
	 event.stopPropagation(); 
}));

// slider-links