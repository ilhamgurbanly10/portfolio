// using-functions
flash_active_menu(false);
flash_toggle_class_scrolling();
flash_live_chat();
flash_fixed_back_to_top_button();
// the-end-of-using-functions


function flash_active_menu(icon = true) {

	var buttons = document.querySelectorAll('.flash-menu-link');
	var length = buttons.length;
	var is_hovered = false;

	for (var i = 0; i < length; i++) {

		buttons[i].addEventListener('click', active);
		buttons[i].addEventListener('mouseover', add_hover);
		buttons[i].addEventListener('mouseout', remove_hover);
	}	

	function active() {

		for (var i = 0; i < length; i++) {
			
			if (buttons[i] == this) { 

				buttons[i].classList.add('active');
				if (icon) active_icon(buttons[i]);

			}

			else {

				buttons[i].classList.remove('active');
				if (icon) deactive_icon(buttons[i]);

			}	
		}

		document.body.addEventListener('click', deactive_all);

	}

	function active_icon(btn) {

		var icon = btn.querySelector('.fa-angle-down');

		if (icon == undefined) return;

		icon.classList.remove('fa-angle-down');
		icon.classList.add('fa-angle-up');

	}

	function deactive_icon(btn) {

		var icon = btn.querySelector('.fa-angle-up');

		if (icon == undefined) return;

		icon.classList.add('fa-angle-down');
		icon.classList.remove('fa-angle-up');

	}

	function add_hover() {is_hovered = true;}

	function remove_hover() {is_hovered = false;}

	function deactive_all() {

		for (var i = 0; i < length; i++) {
			
			if (!is_hovered) { 

				buttons[i].classList.remove('active');
				if (icon) deactive_icon(buttons[i]);

			}	

		}

		if (!is_hovered) document.body.removeEventListener('click', deactive_all)
	}

}


function flash_increase_count(element, to, from = 0, added_number = 1) {

	var my_function;
	var number = from;
	element.innerHTML = from;

	if (to = "get-from-target") to = element.getAttribute('to');

	my_function = setInterval(function() {

		number += added_number;
		element.innerHTML = number;

		if (number + added_number >= to) { 

			clearInterval(my_function);
			element.innerHTML = to;

		}	

	}, 1);

}

function flash_write_text(element, text, text_from_attribute = false) {

	var my_function;
	var i = 0;

	if (text_from_attribute) text = element.getAttribute('text');

	var length = text.length;

	my_function = setInterval(function() {

		// alert(text[i]);
		element.innerHTML += text[i];
		i++;

		if (i == length) clearInterval(my_function);

	}, 10);

}


// Add this class to element: flash-scroll
// Write class name to scroll-class attribute

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

// flash-first-type-slide
function flash_first_type_slide(container, autoplay = false, time = "very-slow") {

	// getting-elements-and-values
	var images = container.querySelectorAll('.flash-first-type-slide-image');
	var titles = container.querySelectorAll('.flash-first-type-slide-title');
	var texts = container.querySelectorAll('.flash-first-type-slide-text');
	var button_containers = container.querySelectorAll('.flash-first-type-slide-links-container');
	var prev_button = container.querySelector('.flash-first-type-slide-previous');
	var next_button = container.querySelector('.flash-first-type-slide-next');
	var circles = container.querySelectorAll('.flash-first-type-slide-circle');
	var index = 1;
	var last_index = images.length - 1;
	var previous_index = last_index;
	var my_function;

	// adding-functions
	prev_button.addEventListener('click', previous);
	next_button.addEventListener('click', next);

	for (var i = 0; i < circles.length; i++) {
		circles[i].addEventListener('click', show_with_circle);
	}	

	// determining-the-time
	switch (time) {
	  case "very-fast":
	    time = 1000;
	    break;
	  case "fast":
	    time = 2000;
	    break;
	  case "normal":
	    time = 3000;
	    break;
	  case "slow":
	    time = 5000;
	    break;
	  case "very-slow":
	    time = 6000;
	    break;
	}

	// functions
	function play() {

		my_function = setInterval(function() {

			active(index);

			if (index == 0) previous_index = last_index;
			else previous_index = index - 1;
			if (index == last_index) index = 0;
			else index += 1;

		}, time);

	}

	function stop() {
		clearInterval(my_function);
	}

	function previous() {
		 
		active(previous_index);

		if (previous_index == last_index)  index = 0; 
		else index = previous_index + 1;

		if (previous_index == 0) previous_index = last_index;
		else previous_index -= 1;	

		if(autoplay) {
			stop();
			play();
		}

	}

	function next() {
		
		active(index);

		if (index == 0) previous_index = last_index;
		else previous_index = index - 1;
		if (index == last_index) index = 0;
		else index += 1;

		if(autoplay) {
			stop();
			play();
		}
	
	}

	function active(index) {

		for (var i = 0; i < images.length; i++) {
			
			if (index == i) { 

				images[i].classList.add('active-slide-element'); 
				images[i].classList.remove('deactive-slide-element'); 

				titles[i].classList.add('active-slide-element'); 
				titles[i].classList.remove('deactive-slide-element'); 

				texts[i].classList.add('active-slide-element'); 
				texts[i].classList.remove('deactive-slide-element'); 

				button_containers[i].classList.add('active-slide-element'); 
				button_containers[i].classList.remove('deactive-slide-element'); 

				circles[i].classList.add('active'); 

			}

			else { 

				images[i].classList.remove('active-slide-element');
				images[i].classList.add('deactive-slide-element');

				titles[i].classList.remove('active-slide-element');
				titles[i].classList.add('deactive-slide-element');

				texts[i].classList.remove('active-slide-element');
				texts[i].classList.add('deactive-slide-element');

				button_containers[i].classList.remove('active-slide-element');
				button_containers[i].classList.add('deactive-slide-element');

				circles[i].classList.remove('active'); 
			}	

		}

	}

	function show_with_circle() {

		var x = this.getAttribute('index');
		active(x);

		if (x == "0") {
			index = 1;
			previous_index = 2;
		}

		else if (x == "1") {
			index = 2;
			previous_index = 0;
		}

		else {
			index = 0;
			previous_index = 1;
		}

		if(autoplay) {
			stop();
			play();
		}

	}

	// using-functions
	if (autoplay) play();

}

// the-end-of-flash-first-type-slide



// flash-live-chat
function flash_live_chat() {

	// getting-elements-and-values
	var open_button = document.querySelector('.flash-live-chat-open-button');
	var container = document.querySelector('.flash-live-chat-container');
	var close_button = document.querySelector('.flash-live-chat-close-button');
	var input = document.querySelector('.flash-live-chat-form-input');
	var submit_button = document.querySelector('.flash-live-chat-form-submit');
	var reset_button = document.querySelector('.flash-live-chat-form-reset');


	// avodiding-errors
	if(flash_is_undefined(open_button) || flash_is_undefined(container)) return;

	// adding-functions
	open_button.addEventListener('click', hide_open_button);
	open_button.addEventListener('click', show_chat);
	close_button.addEventListener('click', hide_chat);
	close_button.addEventListener('click', show_open_button);
	input.addEventListener('keyup', enable_and_disable_submit);
	reset_button.addEventListener('click', disable_submit);

	// functions
	function show_open_button() { open_button.classList.remove('hide-flash-live-chat-open-button'); }

	function hide_open_button() { open_button.classList.add('hide-flash-live-chat-open-button'); }

	function show_chat() { container.classList.add('show-flash-live-chat-container'); }

	function hide_chat() { container.classList.remove('show-flash-live-chat-container'); }

	function enable_and_disable_submit() {

		if (this.value == "") submit_button.setAttribute('disabled','');
		else submit_button.removeAttribute('disabled');

	}

	function disable_submit() { submit_button.setAttribute('disabled',''); }

}
// the-end-of-flash-live-chat

// flash-fixed-back-to-top-button
function flash_fixed_back_to_top_button() {

	// getting-elements-and-values
	var button = document.querySelector('.flash-fixed-back-to-top-button');

	// avodiding-errors
	if (flash_is_undefined(button)) return;

	// adding-functions
	button.addEventListener('click', hide);
	window.addEventListener('scroll', show);


	// functions
	function show() { 

		if (document.documentElement.scrollTop > 100)
		button.classList.add('flash-fixed-back-to-top-button-is-scrolled');
		else hide();

	}

	function hide() { button.classList.remove('flash-fixed-back-to-top-button-is-scrolled'); }

}
// the-end-of-flash-fixed-back-to-top-button


// fl-slide-with-three-elements
function fl_slide_with_three_elements(element, autoplay = true, time = "fast") {


	// getting-elements-and-values
	var elements = element.querySelectorAll('.fl-slide-with-three-elements-item');
	var previous_button = element.querySelector('.fl-slide-with-three-elements-previous');
	var next_button = element.querySelector('.fl-slide-with-three-elements-next');
	var index = 1;
	var last_index = elements.length - 1;
	var previous_index = last_index;
	var my_function;
	var procent = 100 / 3;

	// adding-functions
	previous_button.addEventListener('click', previous);
	next_button.addEventListener('click', next);

	// determining-the-time
	switch (time) {
	  case "very-fast":
	    time = 1000;
	    break;
	  case "fast":
	    time = 2000;
	    break;
	  case "normal":
	    time = 3000;
	    break;
	  case "slow":
	    time = 5000;
	    break;
	  case "very-slow":
	    time = 6000;
	    break;
	}

	// functions
	function play() {

		my_function = setInterval(function() {

			if (!flash_is_disabled(next_button)) {

			var size = index * procent + "%";
			elements[0].style.marginLeft = "-"+size+"";
			if (index == 0) previous_index = last_index;
			else previous_index = index - 1;
			if (index == last_index) index = 0;
			else index += 1;

			} else {

				elements[0].style.marginLeft = "0%";
				index = 1;
				previous_index = last_index;

			}

			disable_enable_buttons();	
			

		}, time);

	}

	function stop() {
		clearInterval(my_function);
	}

	function previous() {

		 
		var size = previous_index * procent + "%";

		if (previous_index == 0)
		elements[0].style.marginLeft = "0%";
		else 
		elements[0].style.marginLeft = "-"+size+"";

		if (previous_index == last_index)  index = 0; 
		else index = previous_index + 1;

		if (previous_index == 0) previous_index = last_index;
		else previous_index -= 1;	

		disable_enable_buttons();

		if(autoplay) {
			stop();
			play();
		}

	}

	function next() {
		
		var size = index * procent + "%";
		elements[0].style.marginLeft = "-"+size+"";
		if (index == 0) previous_index = last_index;
		else previous_index = index - 1;
		if (index == last_index) index = 0;
		else index += 1;

		disable_enable_buttons();

		if(autoplay) {
			stop();
			play();
		}
	
	}

	function disable_enable_buttons() {

		if (previous_index == last_index) flash_disable_button(previous_button);
		else flash_enable_button(previous_button);

		if (index >= last_index - 1) flash_disable_button(next_button);
		else flash_enable_button(next_button);

	}

	// using-functions
	if (autoplay) play();

}
// the-end-of-fl-slide-with-three-elements





