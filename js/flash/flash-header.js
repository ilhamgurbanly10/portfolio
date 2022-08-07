
// onloading

document.body.onload = function() {

	pageIsLoaded();
	endProgress();

}

// the-end-of-onloading



// calling-functions

flashNavbar();

// the-end-of-calling-functions



// is-loaded

function pageIsLoaded() { document.body.classList.remove('fl-page-is-not-loaded'); }

// the-end-of-is-loaded



// progress

function endProgress() { 
	const progress = document.querySelector('.fl-loading-ani');
	if (progress) progress.classList.add('fl-stop'); 
}

// the-end-of-progress



// flash-navbar

function flashNavbar() {

	const navbar = document.querySelector('.fl-navbar');

	// calling-functions
	flashMdMenu(navbar);
	flashNavbarSearch();
	flashHideMdMenu();

}

function flashHideMdMenu() {

	const menu = document.querySelector('.fl-md-menu');
	const buttons = document.querySelectorAll('.fl-md-menu-link');
	const toggler = document.querySelector('.fl-navbar-toggler');

	const hide = () => {
		menu.classList.remove('fl-show');
		toggler.classList.remove('fl-active');
	} 

	buttons.forEach(btn => btn.addEventListener('click', hide));
}

function flashMdMenu(navbar, closeRest = true) {

	const toggler = navbar.querySelector('.fl-navbar-toggler');
	const menu = document.querySelector('.fl-md-menu');
	const buttons = menu.querySelectorAll('.fl-md-menu-dropdown-toggler');
	const dropdowns = menu.querySelectorAll('.fl-md-menu-dropdown-menu-con');

	// functions
	const toggle = () => { menu.classList.toggle('fl-show'); toggler.classList.toggle('fl-active'); }

	function toggleDropdown(event) {

		event.preventDefault();
		const dropdown = this.closest('.fl-md-menu-item').querySelector('.fl-md-menu-dropdown-menu-con');
		dropdown.classList.toggle('fl-show');
		this.classList.toggle('fl-dropdown-is-visible');
		if (closeRest) hideRest(dropdown);

	}	

	function hideRest(dropdown) {

		for (var x = 0; x < dropdowns.length; x++) {
			
			if (dropdowns[x] == dropdown) continue;
			dropdowns[x].classList.remove('fl-show');
			buttons[x].classList.remove('fl-dropdown-is-visible');

		}

	}

	// events
	toggler.addEventListener('click', toggle);
	buttons.forEach(btn => btn.addEventListener('click', toggleDropdown));

}

// the-end-of-flash-navbar



// flash-navbar-search

function flashNavbarSearch(con) {

	// elements-and-values
	if(!con) con = document.querySelector('.fl-navbar-search-parent-js');

	// avoiding-errors
	if (!con) return;

	const form = con.querySelector('.fl-navbar-search');
	const input = form.querySelector('.fl-navbar-search-input');
	const showResults = form.getAttribute('show-results');
	const results = con.querySelector('.fl-navbar-results-of-search');
	const submit = form.querySelector('.fl-navbar-search-submit');
	const reset = form.querySelector('.fl-navbar-search-reset');

	const toggler = document.querySelector('.fl-navbar-search-toggler');
	const icon = document.querySelector('.fl-navbar-search-toggler .fa');
	var isHovered = true;

	// adding-functions
	if (showResults == "true") { 

		input.addEventListener('keyup', toggle);
		input.addEventListener('focusin', show);
		input.addEventListener('focusout', hide);

	} else {

		input.addEventListener('keyup', enableDisableButtons);
		
	}

	if (reset != undefined) reset.addEventListener('click', disableButtons);
	
	if (toggler) {

		toggler.addEventListener('click', toggleContainer);
		toggler.addEventListener('mouseover', mouseIsOver);
		toggler.addEventListener('mouseout', mouseIsOut);

	}
		
	con.addEventListener('mouseover', mouseIsOver);
	con.addEventListener('mouseout', mouseIsOut);

	if (showResults == "true") { 
		results.addEventListener('mouseover', mouseIsOver);
		results.addEventListener('mouseout', mouseIsOut);
	}	
	
	// functions
	function toggleContainer() {

		if (!con.classList.contains('fl-show'))
			document.documentElement.addEventListener('click', closeContainer);
		else
			document.documentElement.removeEventListener('click', closeContainer);

		this.classList.toggle('fl-active');
		con.classList.toggle('fl-show');
		toggleIcon();

	}



	function closeContainer() {

		if (!isHovered) {

			con.classList.remove('fl-show');
			document.documentElement.removeEventListener('click', closeContainer);

			if (toggler) toggler.classList.remove('fl-active');

			if (icon == undefined) return;

			icon.classList.add('fa-search');
			icon.classList.remove('fa-times');

		}	

	}

	function toggleIcon() {

		if (icon == undefined) return;

		icon.classList.toggle('fa-search');
		icon.classList.toggle('fa-times');

	}

	function mouseIsOver() { isHovered = true; }

	function mouseIsOut() { isHovered = false; }

	function toggle() {

		if (this.value != "") {

			results.classList.add('fl-show');
			input.classList.add('results-is-shown');
			enableSubmit();
			enableReset();

		} else { 

			hide();
			disableSubmit();
			disableReset();

		}	

	}

	function show() {

		if (this.value != "") { 

			results.classList.add('fl-show');
			input.classList.add('results-is-shown');
			enableSubmit();
			enableReset();

		}	


	}

	function hide() { results.classList.remove('fl-show'); input.classList.remove('results-is-shown'); }

	function enableSubmit() { if (submit) submit.removeAttribute('disabled'); }

	function disableSubmit() { if (submit) submit.setAttribute('disabled',''); }

	function enableReset() { if (reset) reset.removeAttribute('disabled'); }

	function disableReset() { if (reset) reset.setAttribute('disabled',''); }

	function disableButtons() {

		submit.setAttribute('disabled','');
		if (reset != undefined) reset.setAttribute('disabled','');
		input.value = "";

	}

	function enableDisableButtons() {

		if (this.value != "") {

			enableSubmit();
			enableReset();

		} else { 

			disableSubmit();
			disableReset();

		}

	}

}

// flash-navbar-search
