
// flash-scroll-indicator

function flashScrollIndicator() {

	const indicator = document.querySelector('.fl-scroll-indicator');
	
	function indicate() {

		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = (winScroll / height) * 100;
		indicator.style.height = scrolled + "%";

	}	

	window.addEventListener('load', indicate);
	window.addEventListener('scroll', indicate);

}

// the-end-of-flash-scroll-indicator



// flash-active-scrolling

function flashActiveScrolling() {

	var buttons = document.querySelectorAll('.fl-wait-to-be-active-link');
	var mdButtons = document.querySelectorAll('.fl-wait-to-be-active-md-link');
	const elements = document.querySelectorAll(".fl-active-scrolling");

	function active() {
		let len = elements.length;
		while (--len && window.scrollY + 250 < elements[len].offsetTop) {}
		buttons.forEach(btn => btn.classList.remove('fl-active'));
		mdButtons.forEach(btn => btn.classList.remove('fl-active'));
		buttons[len].classList.add('fl-active');
		mdButtons[len].classList.add('fl-active');  
	}

	active();

	window.addEventListener('scroll', active);

}	

// the-end-of-flash-active-scrolling



// flash-lightbox

function flashLightbox() {

	const lightbox = (el) => {

		const images = el.querySelectorAll('.fl-lightbox-img');
		const buttons = el.querySelectorAll('.fl-lightbox-btn');
		const len = images.length;
		var modal, slides = [], numbers = [], slideImages = [], prevArrow, nextArrow, nextIndex = 1, 
		lastIndex = len - 1, prevIndex = lastIndex, closeBtn, playBtn, pauseBtn, playing, isPlaying = false;

		// functions
		const createModal = () => {

			modal =  flashCreateElement("DIV","", { class: "fl-lightbox-modal", }, document.body);
			prevArrow = flashCreateElement("button","<i class='fa fa-chevron-left'></i>", { class: "fl-lightbox-arrow fl-lightbox-prev", type: "button"}, modal);
			nextArrow = flashCreateElement("button","<i class='fa fa-chevron-right'></i>", { class: "fl-lightbox-arrow fl-lightbox-next", type: "button"}, modal);
			closeBtn = flashCreateElement("button","<i class='fa fa-times'></i>", { class: "fl-lightbox-close fl-lightbox-modal-btn", type: "button"}, modal);
			buttonList =  flashCreateElement("div","", { class: "fl-lightbox-btn-list", }, modal);
			playBtn = flashCreateElement("button","<i class='fa fa-play'></i>", { class: "fl-lightbox-play fl-lightbox-modal-btn", type: "button"}, buttonList);
			pauseBtn = flashCreateElement("button","<i class='fa fa-pause'></i>", { class: "fl-lightbox-pause fl-lightbox-modal-btn", type: "button", disabled: ""}, buttonList);


			for (let i = 0; i < len; i++) {
				slides[i] = flashCreateElement("DIV","", { class: "fl-lightbox-slide", }, modal);
				numbers[i] = flashCreateElement("DIV",""+Number(i + 1)+" / "+len+"", { class: "fl-lightbox-number", }, slides[i]);
				slideImages[i] = document.importNode(images[i], true);
				slideImages[i].className = "fl-lightbox-img";
				slides[i].appendChild(slideImages[i]);
				buttons[i].setAttribute('data-index', i);
				buttons[i].addEventListener('click', showModal);
			}

			slides[0].classList.add('fl-show');

			nextArrow.addEventListener('click', next);
			prevArrow.addEventListener('click', prev);
			nextArrow.addEventListener('click', pausePlay);
			prevArrow.addEventListener('click', pausePlay);
			closeBtn.addEventListener('click', closeModal);
			playBtn.addEventListener('click', play);
			pauseBtn.addEventListener('click', pause);

		}

		const setNextIndex = () => { 
			nextIndex == 0 ? prevIndex = lastIndex : prevIndex = nextIndex - 1 ;
			nextIndex == lastIndex ? nextIndex = 0 : nextIndex++; 
		}

		const setPrevIndex = () => { 
			prevIndex == lastIndex ? nextIndex = 0 : nextIndex = prevIndex + 1; 
			prevIndex == 0 ? prevIndex = lastIndex : prevIndex--; 
		}

		const next = () => {
			for (let i = 0; i < len; i++) { i == nextIndex ? slides[i].classList.add('fl-show') : slides[i].classList.remove('fl-show') }
			setNextIndex();
		}

		const prev = () => {
			for (let i = 0; i < len; i++) { i == prevIndex ? slides[i].classList.add('fl-show') : slides[i].classList.remove('fl-show') }
			setPrevIndex();
		}

		function showModal() {
			const dataIndex = this.getAttribute('data-index'); 
			modal.classList.add('fl-show');
			for (let i = 0; i < len; i++) { i == dataIndex ? slides[i].classList.add('fl-show') : slides[i].classList.remove('fl-show') }
			nextIndex  = dataIndex;
			setNextIndex();
		}

		const closeModal = () => { modal.classList.remove('fl-show'); pause(); } 

		const play = () => { playing = setInterval(function() { next()}, 6000); disablePlay(); enablePause(); isPlaying = true; }

		const pause = () => { clearInterval(playing);  enablePlay(); disablePause(); isPlaying = false; }

		const enablePlay = () => playBtn.removeAttribute('disabled');

		const enablePause = () => pauseBtn.removeAttribute('disabled');

		const disablePlay = () => playBtn.setAttribute('disabled', '');

		const disablePause = () => pauseBtn.setAttribute('disabled', '');


		const pausePlay = () => { if (isPlaying) { pause(); play(); } }

		// calling-functions
		createModal();
		
	}

	const elements = document.querySelectorAll('.fl-lightbox');
	elements.forEach(el => lightbox(el));

}

// flash-lightbox



