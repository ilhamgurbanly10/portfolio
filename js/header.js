
// calling-functions

flashScrollIndicator();

flashActiveScrolling();

flashLightbox();

// the-end-of-calling-functions


// scroll-animation

const pageScrollAnimation = () => {

	const elements = document.querySelectorAll('.page-scroll-animation');
	for (let i = 0; i < elements.length; i++) { flashIsScrolled(elements[i]); }

}

pageScrollAnimation();

// the-end-of-scroll-animation



