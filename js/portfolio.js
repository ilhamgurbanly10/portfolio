// avoiding-css-transitions-wenn-page-is-loading
var animation = document.querySelector('.loading-ani');

document.body.onload = function() {
	body_is_loaded();
}

function body_is_loaded() { 
	document.body.classList.remove('flash-is-not-loaded');
	animation.classList.add('stop');
}
// the-end-of-avoiding-css-transitions-wenn-page-is-loading

// getting-elements-and-values
var my_gallery = document.querySelector('#my-gallery');
// the-end-of-getting-elements-and-values

// using-functions
navbar_list();
sm_navbar_list();
flash_toggle_class_scrolling();
active_scrolling();

flashGallery('#my-gallery', {
	autoplay: false,
	speed: "fast",
	dots: true,
	infinite: false,
	lengthPerList: 9
});
// the-end-of-using-functions


function active_scrolling() {

	// getting-elements-and-values
	const elements = document.querySelectorAll(".activator-scrolling");
	var list =  document.querySelector('.navbar-list');
	var sm_list = document.querySelector('.navbar-sm-list');
	var buttons = list.querySelectorAll('.navbar-btn');
	var sm_buttons = sm_list.querySelectorAll('.navbar-btn');
	var last_el = elements[6];
	var last_el_scroll_top = document.documentElement.scrollHeight - 3600;
	var page = document.documentElement;


	// avodiding_errors
	if (flash_is_undefined(elements[0])) return;

	// functions
	const is_in_page = (el) => {

		if (last_el_is_in_view(last_el)) { active(last_el); } 

		else {

		  	var element_top = get_element_top(el);
		  	if (page.scrollTop >= element_top - 201) return true;
		  	else return false;

		 }		  	

	};

	const last_el_is_in_view = (el) => {
	  	if (page.scrollHeight - page.scrollTop <= page.clientHeight + 50) return true;
	  	else return false;	
	  		
	};

	// functions
	const active = (el) => {

		for (var i = 0; i < elements.length; i++) {

			var index = el.getAttribute('index');
			
			if (i == index) { 

				buttons[i].classList.add('active');
				sm_buttons[i].classList.add('active');
			} else { 

				buttons[i].classList.remove('active');
				sm_buttons[i].classList.remove('active');

			}	
		}
	}		

	const toggle = () => {

	  elements.forEach((el) => {

	    if (is_in_page(el)) { active(el); }

	  });

	}

	
	function get_element_top(el) { return window.pageYOffset + el.getBoundingClientRect().top; }

	window.addEventListener('load', toggle);
	window.addEventListener('scroll', toggle);

}	

// navbar-list
function navbar_list() {

	// getting-elements-and-values
	var list = document.querySelector('.navbar-list');
	var buttons = list.querySelectorAll('.navbar-btn');
	var pixels = 20;
	var my_function;

	// avoiding-errors
	if (buttons[0] == undefined) return;
	var length = buttons.length;

	// adding_functions
	for (var i = 0; i < length; i++) { 
		buttons[i].addEventListener('click', active); 
		buttons[i].addEventListener('click', to_element); 

	}

	// functions
	function active() {

		for (var i = 0; i < length; i++) {
			
			if (buttons[i] === this) this.classList.add('active');
			else buttons[i].classList.remove('active');
		}
	}	

	function to_element() {

		var target = this.getAttribute('target');
		var el = document.querySelector(''+target+'');
		var element_top = get_element_top(el);
		document.body.scrollTop = element_top - 200;
		document.documentElement.scrollTop = element_top - 200;

	}

	function get_element_top(el) { return window.pageYOffset + el.getBoundingClientRect().top; }
		

}
// the-end-of-navbar-list


// sm-navbar-list
function sm_navbar_list() {
	
	// getting-elements-and-values
	var toggler = document.querySelector('.flash-mobile-menu-toggler');
	var list = document.querySelector('.navbar-sm-list');
	var buttons = list.querySelectorAll('.navbar-btn');
	var length = buttons.length;
	var is_hover = false;

	// adding-functions
	toggler.addEventListener('click', active_toggler);
	toggler.addEventListener('click', toggle);

	list.addEventListener('mouseover', function() { is_hover = true; });
	list.addEventListener('mouseout', function() { is_hover = false; });

	toggler.addEventListener('mouseover', function() { is_hover = true; });
	toggler.addEventListener('mouseout', function() { is_hover = false; });

	for (var i = 0; i < length; i++) { 
		buttons[i].addEventListener('click', active); 
		buttons[i].addEventListener('click', to_element);
	}

	// functions
	function active_toggler() { toggler.classList.toggle('active'); }

	function active() {

		for (var i = 0; i < length; i++) {
			
			if (buttons[i] === this) this.classList.add('active');
			else buttons[i].classList.remove('active');
		}
	}	

	function toggle() {

		list.classList.toggle('show');

		if (flash_has_class(list, "show")) document.addEventListener('click', close_with_body);
		else document.removeEventListener('click', close_with_body);

	}


	function to_element() {

		var target = this.getAttribute('target');
		var el = document.querySelector(''+target+'');
		var element_top = get_element_top(el);
		document.body.scrollTop = element_top - 200;
		document.documentElement.scrollTop = element_top - 200;

		toggler.click();

	}

	function get_element_top(el) { return window.pageYOffset + el.getBoundingClientRect().top; }

	function close_with_body() {

		if (!is_hover) { 

			toggler.click();
			document.removeEventListener('click', close_with_body);

		}	

	}

}
// the-end-of-sm-navbar-list


window.addEventListener('scroll', scroll_indicator);

var document_height = document.documentElement.scrollHeight;

function scroll_indicator() {

	var indicator = document.querySelector('.scroll-indicator');
	
	// console.log(document_height + " " + document.documentElement.scrollTop);
	// var procent = document_height / 100; 
	// var height = document.documentElement.scrollTop / procent;
	// line.style.height = ""+height+"vh";

  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  indicator.style.height = scrolled + "%";

	
}



// functions
function flash_toggle_class_scrolling() {

	// getting-elements-and-values
	const elements = document.querySelectorAll(".flash-scroll");

	// avodiding_errors
	if (flash_is_undefined(elements[0])) return;

	// functions
	const is_in_view = (el, percentageScroll = 100) => {
	  const elementTop = el.getBoundingClientRect().top;

	  return (
	    elementTop <= 
	    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
	  );
	};


	const add_class = (element) => {
	  const class_name = element.getAttribute('scroll-class');
	  element.classList.add(""+class_name+"");

	};

	const remove_class = (element) => {
	  const class_name = element.getAttribute('scroll-class');
	  element.classList.remove(""+class_name+"");
	};

	const toggle_class = () => {

	  elements.forEach((el) => {
	    if (is_in_view(el, 100)) add_class(el); 
	    else remove_class(el);
	  });

	}

	window.addEventListener('load', toggle_class);
	window.addEventListener('scroll', toggle_class);

}	
// the-end-of-functions
