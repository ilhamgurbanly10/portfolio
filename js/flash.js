// loading

// avoiding-css-transitions-wenn-page-is-loading
document.body.onload = function() {
	body_is_loaded();
}

function body_is_loaded() { 
	document.body.classList.remove('flash-is-not-loaded');
}
// end-of-the-loading

// using-functions
flash_switch_containers();
flash_prevent_default_links();
flash_clicker();
flash_active_elements();
flash_font_size_changer();
flash_back_to_top();
// the-end-of-using-functions

// flash-modal-container 
function flash_modal_container() {

	// getting-elements-and-values
	var buttons = document.querySelectorAll('.flash-modal-button');
	var modals = document.querySelectorAll('.flash-modal-container');

	// avoiding-errors
	if (flash_is_undefined(buttons[0]) || flash_is_undefined(modals[0])) return;

	var buttons_length = buttons.length;
	var has_hover = false;
	var modal_no_buttons = [];

	// loops
	for (var i = 0; i < buttons_length; i++) {
		buttons[i].addEventListener('click', show);

		if (has_close_button(modals[i])) {

			modals[i].querySelector('.flash-modal-close-button').
			addEventListener('click', close_with_button); 

		}

		else if (!flash_has_class(modals[i], "without-background")) {

			modals[i].addEventListener('click', close);

			for (var x = 0; x < modals[i].children.length; x++) {
				modals[i].children[x].addEventListener('mouseover', add_hover);
				modals[i].children[x].addEventListener('mouseout', remove_hover);
			}

		}

		if (flash_has_class(modals[i], "without-background")) {

			buttons[i].addEventListener('click', add_hiding_clicking_body);
			modals[i].addEventListener('mouseover', add_hover);
			modals[i].addEventListener('mouseout', remove_hover);
			buttons[i].addEventListener('mouseover', add_hover);
			buttons[i].addEventListener('mouseout', remove_hover);

			modals[i].querySelector('.flash-modal-close-button').
			addEventListener('click', remove_hiding_clicking_body); 

			modal_no_buttons[i] = modals[i].querySelector('.flash-modal-no-button');

			if (!flash_is_undefined(modal_no_buttons[i]))
				modal_no_buttons[i].addEventListener('click', close_by_no_button); 
			
		} else {
			buttons[i].addEventListener('click', remove_hiding_clicking_body); 
		}
		
	}



	// functions 
	function show() { 

		var target = this.getAttribute('target');
		var modal = document.querySelector(''+target+'');
		modal.classList.add('show');

		// hiding-other-modals
		for (var i = 0; i < modals.length; i++) {

				if (modals[i] === modal) continue;

				modals[i].classList.remove('show');

		}
	
	}

	function close() { if (!has_hover) this.classList.remove('show'); }

	function close_by_no_button() { 

		var target = this.getAttribute('target');
		var modal = document.querySelector(''+target+'');
		modal.classList.remove('show');

	}

	function close_with_button() { this.parentElement.classList.remove('show'); }

	function add_hover() { return has_hover = true; }

	function remove_hover() { return has_hover = false; }

	function has_close_button(modal) {

		var button = modal.querySelector('.flash-modal-close-button');
		if (button == undefined) return false;
		else return true;
		
	}

	function add_hiding_clicking_body() {	
		document.body.addEventListener('click', hide_clicking_body);
	}

	function remove_hiding_clicking_body() {	
		document.body.removeEventListener('click', hide_clicking_body);
	}

	function hide_clicking_body() {

		if (!has_hover) {

			for (var i = 0; i < modals.length; i++) {

				if (flash_has_class(modals[i], "show"))
				modals[i].classList.remove('show');

			}	

			document.body.removeEventListener('click', hide_clicking_body);

		}

	}

}

// the-end-of-flash-modal-container 

// animations

// 01 - three-points
function flash_three_points(element, stop_button = false, time = "fast", 
	loop = "infinite") {

	var count_of_points = 0;
	var count_of_loops = 0;
	var default_html = element.innerHTML;
	var my_function;

	// determining-the-time
	switch (time) {
	  case "fast":
	    time = 1000;
	    break;
	  case "normal":
	    time = 2000;
	    break;
	  case "slow":
	     time = 3000;
	    break;
	}

	start();

	// functions	
	function start() {

		if (loop == "infinite") {

			my_function = setInterval( function() {

					if (count_of_points < 3) {

						element.innerHTML += ".";
						count_of_points += 1;

					}	

					else {

						element.innerHTML = default_html;
						count_of_points = 0;

					}		
		 
			}, time);

		} else {

			my_function = setInterval( function() {

					if (count_of_loops < loop) {

						if (count_of_points < 3) {

							element.innerHTML += ".";
							count_of_points += 1;

						}	

						else {

							element.innerHTML = default_html;
							count_of_points = 0;
							count_of_loops += 1;

						}

					
					} else finish();	
		 
			}, time);

		}

		function finish() {

			clearInterval(my_function);
			element.innerHTML = default_html;

		}	

		if (stop_button != false) stop_button.addEventListener('click', finish);

			

	}
	
}

// 02 - three-circles
function flash_three_circles(element, stop_button = false, time = "fast", 
	loop = "infinite") {

	// getting-elements-and-values
	var circles = element.querySelectorAll('.flash-three-circles-circle');
	var count_of_loops_of_circle = 1;
	var count_of_loops = 0;
	var my_function;

	// determining-the-time
	switch (time) {
	  case "fast":
	    time = 1000;
	    break;
	  case "normal":
	    time = 2000;
	    break;
	  case "slow":
	     time = 3000;
	    break;
	}

	start();

	// functions
	function show_first_circle() {

		circles[0].classList.add('show');
		circles[1].classList.remove('show');
		circles[2].classList.remove('show');
		count_of_loops_of_circle += 1;

	}

	function show_second_circle() {

		circles[0].classList.remove('show');
		circles[1].classList.add('show');
		circles[2].classList.remove('show');
		count_of_loops_of_circle += 1;
		
	}

	function show_third_circle() {

		circles[0].classList.remove('show');
		circles[1].classList.remove('show');
		circles[2].classList.add('show');
		count_of_loops_of_circle += 1;
		
	}

	function hide_circles() {

		circles[0].classList.remove('show');
		circles[1].classList.remove('show');
		circles[2].classList.remove('show');
		count_of_loops_of_circle = 1;
		
	}

	// functions	
	function start() {

		if (loop == "infinite") {

			my_function = setInterval( function() {

					if (count_of_loops_of_circle == 1) show_first_circle();
					else if (count_of_loops_of_circle == 2) show_second_circle();
					else if (count_of_loops_of_circle == 3) show_third_circle();
					else hide_circles();
	 
			}, time);

		} else {

			my_function = setInterval( function() {

					if (count_of_loops < loop) {

						if (count_of_loops_of_circle == 1) show_first_circle();
						else if (count_of_loops_of_circle == 2) show_second_circle();
						else if (count_of_loops_of_circle == 3) show_third_circle();
						else { 

							hide_circles();
							count_of_loops += 1;

						}	

					} else finish();	
		 
			}, time);

		}

		function finish() {

			clearInterval(my_function);
			hide_circles();

		}	

		if (stop_button != false) stop_button.addEventListener('click', finish);

			

	}


}


// the-end-of-animations


// other-functions

// 01) Check if element is undefined
function flash_is_undefined(element) {

	if (element == undefined) return true;
	else return false;

}

function flash_has_class(element, class_name) {

	var has_class = false;
	var class_list = element.classList;
	var length = class_list.length;
	
	for (var i = 0; i < length; i++) {	
		
		if (class_list[i] == class_name) {
			has_class = true;
			break;		
		}

	}

	return has_class;

}

// 03
// drop-down

flash_drop_down();

function flash_drop_down() {

	var containers = document.querySelectorAll('.flash-drop-down-container');
	var toggler = document.querySelectorAll('.flash-drop-down-button');
	var drop_downs = document.querySelectorAll('.flash-drop-down-element');
	var has_hover = false;

	// avoiding-errors
	if (flash_is_undefined(toggler[0])) return;

	// adding-functions-for-dropdown-menu
	for (var i = 0, show_type = [], show_wenn = []; i < toggler.length; i++) {

		show_type[i] = toggler[i].getAttribute('show-type');
		show_wenn[i] = toggler[i].getAttribute('show-wenn');

		if (show_wenn[i] == "hover") 
			add_hover_functions(show_type[i],toggler[i]);
		else if (show_wenn[i] == "click") 
			add_click_functions(show_type[i],toggler[i]);

		toggler[i].addEventListener('mouseover', add_hover);
		toggler[i].addEventListener('mouseout', remove_hover);
		drop_downs[i].addEventListener('mouseover', add_hover);
		drop_downs[i].addEventListener('mouseout', remove_hover);
        
	}

	// functions

	// showing-and-hiding-dropdown-menu
	// hover-functions
	function show() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.add('show');
	}

	function hide() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.remove('show');
	}

	// fading-dropdown-menu
	function fade_in() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.add('fade-in');
	}

	function fade_out() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.remove('fade-in');
	}

	// sliding-dropdown-menu
	function slide_down() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.add('slide-down');
	}

	function slide_up() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.remove('slide-down');
	}

	function toggle_icon(button) {
		var icon = button.querySelector('.fa-angle-down');

		if (icon == undefined) return;

		icon.classList.toggle('fa-angle-up');
	}

	// click-functions
	function toggle() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.toggle('show');
		toggle_icon(this);
	}

	function fade() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.toggle('fade-in');
		toggle_icon(this);
	}

	function slide() {
		var target = this.getAttribute('target');
		document.querySelector(''+target+'').classList.toggle('slide-down');
		toggle_icon(this);
	}

	function add_hiding_clicking_body() {	
		document.body.addEventListener('click', hide_clicking_body);
	}

	// adding-functions
	function add_hover_functions(show_type, toggler) {

		var close_others = toggler.getAttribute('close-others');
		if (close_others == "on") 
			toggler.addEventListener('mouseover', hide_others);
		

		if (show_type == "show") {
			toggler.addEventListener('mouseover', show);
			toggler.addEventListener('mouseout', hide);
		}	else if (show_type == "fade") {
			toggler.addEventListener('mouseover', fade_in);
			toggler.addEventListener('mouseout', fade_out);
		} else if (show_type == "slide") {
			toggler.addEventListener('mouseover', slide_down);
			toggler.addEventListener('mouseout', slide_up);
		}

	}

	function add_click_functions(show_type, toggler) {

		toggler.addEventListener('click', add_hiding_clicking_body);

		var close_others = toggler.getAttribute('close-others');
		if (close_others == "on") 
			toggler.addEventListener('click', hide_others);

		if (show_type == "show") {
			toggler.addEventListener('click', toggle);
		}	else if (show_type == "fade") {
			toggler.addEventListener('click', fade);
		} else if (show_type == "slide") {
			toggler.addEventListener('click', slide);
		}

	}

	function add_hover() { 
		return has_hover = true; 
	}

	function remove_hover() { 
		return has_hover = false;  
	}

	function hide_clicking_body() {

		if (!has_hover) {

			for (var i = 0; i < drop_downs.length; i++) {

				drop_downs[i].classList.remove('show');
				drop_downs[i].classList.remove('fade-in');
				drop_downs[i].classList.remove('slide-down');

				if (toggler[i].querySelector('.fa-angle-down') == undefined)
					continue;
				
					toggler[i].querySelector('i').classList.remove('fa-angle-up');

			}	

			document.body.removeEventListener('click', hide_clicking_body);

		}

	}

	function hide_others() {
 
 			var id = this.getAttribute('target');
 			id = id.substring(1);

			for (var i = 0; i < drop_downs.length; i++) {

				if (id == drop_downs[i].id) continue;

				drop_downs[i].classList.remove('show');
				drop_downs[i].classList.remove('fade-in');
				drop_downs[i].classList.remove('slide-down');

				if (toggler[i].querySelector('.fa-angle-down') == undefined)
					continue;
				
					toggler[i].querySelector('i').classList.remove('fa-angle-up');

			}	

	}

}
// the-end-of-drop-down


// other-functions

// 01) Toggle event listener
function flash_toggle_event_listener(element, event = 'click', my_function) {

	// getting-elements-and-values
	var new_attribute = document.createAttribute(''+event+'');
	new_attribute.value = ""+my_function.name+"";


	if (has_event_listener()) remove();
	else add();

	// functions
	function add() {

		element.addEventListener(''+event+'', my_function);
		element.setAttributeNode(new_attribute);

	}

	function remove() {

		element.removeEventListener(''+event+'', my_function);
		element.removeAttribute(''+event+'');

	}

	function has_event_listener() {

		var attribute = element.getAttributeNode(''+event+'');
		var attribute_name = "";
		var attribute_value = "";

		// when attribute is null, js gives error with name and value
		if (attribute != null) { 
			attribute_name = attribute.name;
			attribute_value = attribute.value;
		}	

		if (attribute_name != new_attribute.name || attribute_value != my_function.name) 
			return false; 
		else 
			return true;

	}

}

function flash_remove_classes(element, classes = []) {

	for (var i = 0; i < classes.length; i++) {
		
		element.classList.remove(''+classes[i]+'');

	}

}

function flash_add_classes(element, classes = []) {

	for (var i = 0; i < classes.length; i++) {
		
		element.classList.add(''+classes[i]+'');

	}
	
}

function flash_toggle_classes(element, classes = []) {

	for (var i = 0; i < classes.length; i++) {
		
		element.classList.toggle(''+classes[i]+'');

	}
	
}

flash_extend_text();

function flash_extend_text() {

	// getting-elements-and-values
	var containers = document.querySelectorAll('.flash-extend-text-text');

	if (flash_is_undefined(containers[0])) return;

	for (var i = 0, max_height = []; i < containers.length; i++) {

		max_height[i] = containers[i].getAttribute('lines') * containers[i].getAttribute('line-height') + "px";
		containers[i].style.maxHeight = max_height[i];
		var max_height = max_height[i];
		var button = containers[i].querySelector('.flash-extend-text-button');
		button.addEventListener('click', function() {
			toggle(button, max_height);
		});

	}

	function toggle(button, max_height) {

		var is_extended = button.parentElement.getAttribute('extended');
		var text = button.parentElement;

		if (is_extended == "false") {

			text.style.maxHeight = "500px";
			text.setAttribute('extended', 'true');

		} else {

			text.style.maxHeight = max_height;
			text.setAttribute('extended', 'false');

		}

	}


}

function flash_get_number_of_characters(element, is_value, trim = false) {

	if (is_value) element = element.value;
	if (trim == true) element = element.trim();
	return element.length;

}

function flash_back_to_top() {

	// getting-elements-and-values
	var buttons = document.querySelectorAll('.flash-back-to-top-button');

	// avoiding-errors
	if (flash_is_undefined(buttons[0])) return;

	// adding-functions
	for (var i = 0; i < buttons.length; i++) {

		buttons[i].addEventListener('click', back_to_top);
        
	}

	// functions
	function back_to_top() {

		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
			
	}

}

// var doc_body = document.body;

// flash_create_element("DIV","Hallo", {
// 	class: "my_container",
// 	style: "background-color: red;",
// 	target: "#my_container_2"
// }, doc_body, "last-child");

function flash_create_element(tag_name, html = "", attributes = {}, parent = false, as_child = "last-child") {

	var element = document.createElement(''+tag_name+'');
	element.innerHTML = html;

	for (x in attributes) {	element.setAttribute(''+x+'',''+attributes[x]+''); }

  	if (parent) {

  		if (as_child == "last-child") parent.appendChild(element);
  		else if (as_child == "first-child") parent.insertBefore(element, parent.childNodes[0]);
 		else parent.insertBefore(element, parent.children[as_child - 1]);
  	}

  	return element;

}

function flash_toggle_password() {

	// getting-elements-and-values
	var buttons = document.querySelectorAll('.flash-toggle-password');

	// avoiding-errors
	if (flash_is_undefined(buttons[0])) return;

	var buttons_length = buttons.length;

	for (var i = 0; i < buttons_length; i++) {
		buttons[i].addEventListener('click', toggle);
	}

	function toggle() {

		var target = this.getAttribute('target-form');

		var password = document.querySelector(''+target+'');

		var type = password.getAttribute('type') === 'password' ? 'text' : 'password';

    	password.setAttribute('type', type);

    	password.focus();

    	this.classList.toggle('fa-eye-slash');

	}

}

function flash_has_class(element, class_name) {

	var has_class = false;
	var class_list = element.classList;
	var length = class_list.length;
	
	for (var i = 0; i < length; i++) {	
		
		if (class_list[i] == class_name) {
			has_class = true;
			break;		
		}

	}

	return has_class;

}


function flash_check_name_input(form, min_character = 4, max_character = 15) {	

	// getting-elements-and-values
	var input = form.querySelector('.flash-user-name');

	// getting-outputs
	var output_of_empty = form.querySelector('.flash-user-name-is-empty');
	var output_of_starts_with_number = 
	form.querySelector('.flash-user-name-starts-with-number');
	var output_of_has_false_character = 
	form.querySelector('.flash-user-name-has-false-character');
	var outpup_of_out_of_quantity = 
	form.querySelector('.flash-user-name-is-out-of-quantity');

	// adding-functions
	input.addEventListener('focusout', show_errors);
	
	// functions
	function has_error() {
		flash_add_class(input, "input-has-error");
	}

	function do_not_has_error() {
		flash_remove_class(input, "input-has-error");
		has_value();
		does_not_start_with_number();
		do_not_has_false_character();
		is_not_out_of_quantity();
	}

	function do_not_has_value() {
		flash_add_class(output_of_empty, "visible");
		has_error();
		does_not_start_with_number();
		do_not_has_false_character();
		is_not_out_of_quantity();
	}	

	function starts_with_number() {
		flash_add_class(output_of_starts_with_number, "visible");
		has_error();
		has_value();
		do_not_has_false_character();
		is_not_out_of_quantity();
	}

	function has_false_character() {
		flash_add_class(output_of_has_false_character, "visible");
		has_error();
		has_value();
		is_not_out_of_quantity();
		does_not_start_with_number();
	}

	function is_out_of_quantity() {
		flash_add_class(outpup_of_out_of_quantity, "visible");
		has_error();
		has_value();
		does_not_start_with_number();
		do_not_has_false_character();
	}

	function has_value() {
		flash_remove_class(output_of_empty, "visible");
	}	

	function does_not_start_with_number() {
		flash_remove_class(output_of_starts_with_number, "visible");
	}

	function do_not_has_false_character() {
		flash_remove_class(output_of_has_false_character, "visible")
	}

	function is_not_out_of_quantity() {
		flash_remove_class(outpup_of_out_of_quantity, "visible");
	}

	// function is_not_letter_or_number() {


	// }


	function show_errors() {

		var value = input.value;
		var length = value.length;

		if (value == "") {
			do_not_has_value();
		}	
		else if (flash_starts_with_number(value)) {
			starts_with_number();
		}
		else if (flash_has_illegal_character(value)) {
			has_false_character();
		}
		else if (length < min_character || length > max_character) { 
			is_out_of_quantity();
		}		

		input.addEventListener('keyup', show_remove_errors);
			
	}

	function show_remove_errors() {

		var value = input.value;
		var length = value.length;

		if (value == "") { 

			do_not_has_value();

		} else { 

			if (flash_starts_with_number(value)) {
				starts_with_number();
			}

			else if (flash_has_illegal_character(value)) {
				has_false_character();
			}

			else if (length < min_character || length > max_character) {
				is_out_of_quantity();

			} else {
				do_not_has_error();
			}	
			
		}

		input.removeEventListener('focusout', show_errors);

	}

}	

function flash_check_password_repeat_input(form) {

	// getting-elements-and-values
	var password = form.querySelector('.flash-password');
	var password_repeat = form.querySelector('.flash-password-repeat');
	var pr_is_not_same = form.querySelector('.flash-password-repeat-is-not-same');
	var pr_is_empty = form.querySelector('.flash-password-repeat-is-empty');


	// adding-functions
	password_repeat.addEventListener('focusout', check);
	password_repeat.addEventListener('focusout', function() {
		password_repeat.addEventListener('keyup', check);
		password_repeat.removeEventListener('focusout', check);
		password.addEventListener('keyup', check);
	});



	// functions
	function check() {

		if (password_repeat.value == "") is_empty();

		else if (password_repeat.value != password.value) is_not_same(); 

		else { is_same(); is_not_empty(); }

	}

	function is_not_same() { 

		pr_is_not_same.classList.add('visible');
		pr_is_empty.classList.remove('visible'); 
		password_repeat.classList.add('input-has-error');

	}

	function is_same() { 

		pr_is_not_same.classList.remove('visible'); 
		password_repeat.classList.remove('input-has-error');

	}

	function is_not_empty() { 

		pr_is_empty.classList.remove('visible');
		password_repeat.classList.remove('input-has-error'); 

	}

	function is_empty() { 

		pr_is_empty.classList.add('visible');
		pr_is_not_same.classList.remove('visible');
		password_repeat.classList.add('input-has-error');

	}

}

function flash_check_password_input(form, min_character = 4, max_character = 8) {	


	// getting-elements-and-values
	var input = form.querySelector('.flash-password');

	// getting-outputs
	var output_of_empty = form.querySelector('.flash-password-is-empty');

	var output_of_has_false_character = 
	form.querySelector('.flash-password-has-false-character');

	var output_of_has_illegal_letter = 
	form.querySelector('.flash-password-has-illegal-letter');

	var outpup_of_out_of_quantity = 
	form.querySelector('.flash-password-is-out-of-quantity');

	var output_of_letters_are_less_than_the_limit = 
	form.querySelector('.flash-password-letters-are-less-than-the-limit');

	var output_of_numbers_are_less_than_the_limit = 
	form.querySelector('.flash-password-numbers-are-less-than-the-limit');	


	// adding-functions
	input.addEventListener('focusout', show_errors);
	
	// functions
	function has_error() {
		flash_add_class(input, "input-has-error");
	}

	function do_not_has_error() {
		flash_remove_class(input, "input-has-error");
		has_value();
		do_not_has_false_character();
		does_not_have_illegal_letter();
		has_minimum_limit_of_letters();
		has_minimum_limit_of_numbers();
		is_not_out_of_quantity();
	}

	function do_not_has_value() {
		flash_add_class(output_of_empty, "visible");
		has_error();
		do_not_has_false_character();
		does_not_have_illegal_letter()
		has_minimum_limit_of_letters();
		has_minimum_limit_of_numbers();
		is_not_out_of_quantity();
	}	

	function has_false_character() {
		flash_add_class(output_of_has_false_character, "visible");
		has_error();
		has_value();
		does_not_have_illegal_letter();
		has_minimum_limit_of_letters();
		has_minimum_limit_of_numbers();
		is_not_out_of_quantity();
	}

	function has_illegal_letter() {
		flash_add_class(output_of_has_illegal_letter, "visible");
		has_error();
		has_value();
		do_not_has_false_character();
		has_minimum_limit_of_letters();
		has_minimum_limit_of_numbers();
		is_not_out_of_quantity();
	}


	function does_not_have_minimum_limit_of_letters() {
		flash_add_class(output_of_letters_are_less_than_the_limit, "visible");
		has_error();
		has_value();
		do_not_has_false_character();
		does_not_have_illegal_letter();
		has_minimum_limit_of_numbers();
		is_not_out_of_quantity();
	}

	function does_not_have_minimum_limit_of_numbers() {
		flash_add_class(output_of_numbers_are_less_than_the_limit, "visible");
		has_error();
		has_value();
		do_not_has_false_character();
		does_not_have_illegal_letter();
		has_minimum_limit_of_letters();
		is_not_out_of_quantity();
	}

	function is_out_of_quantity() {
		flash_add_class(outpup_of_out_of_quantity, "visible");
		has_error();
		has_value();
		does_not_have_illegal_letter();
		has_minimum_limit_of_letters();
		has_minimum_limit_of_numbers();
		do_not_has_false_character();
	}

	function has_value() {
		flash_remove_class(output_of_empty, "visible");
	}	

	function do_not_has_false_character() {
		flash_remove_class(output_of_has_false_character, "visible")
	}

	function does_not_have_illegal_letter() {
		flash_remove_class(output_of_has_illegal_letter, "visible")
	}

	function has_minimum_limit_of_letters() {
		flash_remove_class(output_of_letters_are_less_than_the_limit, "visible");
	}

	function has_minimum_limit_of_numbers() {
		flash_remove_class(output_of_numbers_are_less_than_the_limit, "visible");
	}

	function is_not_out_of_quantity() {
		flash_remove_class(outpup_of_out_of_quantity, "visible");
	}

	// function is_not_letter_or_number() {


	// }


	function show_errors() {

		var value = input.value;
		var length = value.length;

		if (value == "") {
			do_not_has_value();
		}

		else if (flash_has_illegal_character(value, true)) {
			has_false_character();
		}

		else if (flash_has_illegal_letter(value)) {
			has_illegal_letter();
		}

		else if (!flash_has_minimum_limit_of_letters(value)) {
			does_not_have_minimum_limit_of_letters();
		}

		else if (!flash_has_minimum_limit_of_numbers(value)) {
			does_not_have_minimum_limit_of_numbers();
		}
		
		else if (length < min_character || length > max_character) { 
			is_out_of_quantity();
		}		

		input.addEventListener('keyup', show_remove_errors);
			
	}

	function show_remove_errors() {

		var value = input.value;
		var length = value.length;

		if (value == "") { 

			do_not_has_value();

		} else { 

			if (flash_has_illegal_character(value, true)) {
				has_false_character();
			}

			else if (flash_has_illegal_letter(value)) {
				has_illegal_letter();
			}	

			else if (!flash_has_minimum_limit_of_letters(value)) {
				does_not_have_minimum_limit_of_letters();
			}

			else if (!flash_has_minimum_limit_of_numbers(value)) {
				does_not_have_minimum_limit_of_numbers();
			}

			else if (length < min_character || length > max_character) {
				is_out_of_quantity();

			} else {
				do_not_has_error();
			}	
			
		}

		input.removeEventListener('focusout', show_errors);

	}

}	


function flash_disable_submit(form) {

	// Qeyd:
	// Funksiyanın əsas işi verilmiş formun inputlarında 'input-has-error' klassının 
	// olub-olmamasını yoxlamaqla submiti disable və enable etməkdir.

	// getting-elements-and-values
	var submit = form.querySelector('.flash-submit-button');
	var inputs = form.querySelectorAll('.flash-input');
	var length = inputs.length;
	var last_loop = length - 1;

	// adding-functions
	form.addEventListener('focusout', check_error);
	form.addEventListener('keyup', check_error);

	// functions
	function check_error() {
		for (var i = 0; i < length; i++) {

			if (flash_has_class(inputs[i], "input-has-error") || inputs[i].value == "") {
				submit.setAttribute('disabled','');
				break;
			} 

			// Silinmənin yalnız ən sonuncu döngüdə olması üçün belə qoyulub
			if (!flash_has_class(inputs[i], "input-has-error") && i == last_loop)
				submit.removeAttribute('disabled');
		}
	}

}	

function flash_reset_form(form) {

	// getting-elements-and-values
	var submit = form.querySelector('.flash-submit-button');
	var reset = form.querySelector('.flash-reset-button');
	var inputs = form.querySelectorAll('.flash-input');
	var warnings = form.querySelectorAll('.flash-form-warning');
	var inputs_length = inputs.length;
	var warnings_length = warnings.length;

	// adding-functions
	reset.addEventListener('click', reset_form);

	// functions
	function remove_classes() {

		for (var i = 0; i < inputs_length; i++) {
			flash_remove_class(inputs[i], "input-has-error");
		}

	}

	function remove_warnings() {

		for (var i = 0; i < warnings_length; i++) {
			flash_remove_class(warnings[i], "visible");
		}
		
	}

	function enable_submit() {

		submit.removeAttribute('disabled');

	}

	function reset_form() {

		remove_classes();
		enable_submit();
		remove_warnings();

	}

}

function flash_add_class(element, class_name) {

	// Um einen Fehler zu verhindern
	if (flash_is_undefined(element)) 
		return console.log("Could not add class, because element was undefined.");
	else if (element[0] == undefined) 
		element.classList.add(''+class_name+'');
	else {
		for (var i = 0; i < element.length; i++) {
			
			element[i].classList.add(''+class_name+'');
		}
	}

}

function flash_is_undefined(element) {

	if (element == undefined) return true;
	else return false;

}

function flash_has_illegal_character(element, all_characters = false) {

	// Um einen Fehler zu verhindern
	if (flash_is_undefined(element)) 
		return console.log("Could not check the element, because element was undefined.");

	// getting-elements-and-values
	var characters = [
		',','/',';','[',']','\\','`','!','#','$','%','^','&','*','(',')'
		,'-','=','+','{','}','|',':','"','\'','<','>','?'
		];	

	var characters_length = characters.length;
	var element_length = element.length;
	var has_illegal_character = false;

	// functions
	function check_character(character) {

		var has_error = false;

		for (var i = 0; i < characters_length; i++) {

			if(character == characters[i]) {
				has_error = true;
				break;
			} 

		}

		return has_error;

	}


	if (flash_has_underline(element, all_characters) || 
		flash_has_point(element, all_characters) ||
		flash_has_space(element, all_characters)) {

		return has_illegal_character = true;

	} else {

		for (var i = 0; i < element_length; i++) {
			
			if(check_character(element[i])) {
				return has_illegal_character = true;
			} 	
			
		}

	}	

	return has_illegal_character;

}

function flash_starts_with_number(element) {

	// Um einen Fehler zu verhindern
	if (flash_is_undefined(element)) 
		return console.log("Could not check the element, because element was undefined.");

	// getting-elements-and-values
	var starts_with_number = false;
	var numbers = ["0","1","2","3","4","5","6","7","8","9"];
	var numbers_length = numbers.length;
	var first_character = element[0];

	// loop
	for (var i = 0; i < numbers_length; i++) {
		

		if (first_character == numbers[i]) {
			starts_with_number = true;
			break;
		}

	}
	

	return starts_with_number;

}


function flash_has_underline(element, all_underlines = false) {

	// Qeyd: all_underlines parametri true qoyulsa bütün tapdığı altdan xəttlər üçün 
	// true qayıdacaq.Əgər false qoyularsa ortada tək olan altdan xəttlər üçün true
	// qayıtmayacaq.

	// Um einen Fehler zu verhindern
	if (flash_is_undefined(element)) 
		return console.log("Could not check the element, because element was undefined.");

	// getting-elements-and-values
	var has_underline = false;
	var element_length = element.length;
	var last_loop;

	// Heç bir yazı olmazsa sonuncu döngünün -1 olmaması üçün qoyulub
	if (element_length > 0) last_loop = element.length - 1;
	else last_loop = 0;


	// functions
	function check_double_underlines() {

		// last-loop - 1 axırıncıdan əvvəlkini də yoxlamağa ehtiyac olmadığına görə
		// qoyulub
		for (var i = 1; i < last_loop - 1; i++) {
	
			if (element[i] == "_" || element[i] == "." || element[i] == " ") {

				if (element[i + 1] == "_") {
					has_underline = true;
					break;
				}
					
			}

		}	

	}

	function check_underline() {

		for (var i = 0; i < element_length; i++) {
		
			if (element[i] == "_") {
				has_underline = true;
				break;
			}

		}

	}

	function has_underline_in_the_beginning() {
		if (element[0] == "_") return true;
		else return false;
	}

	function has_underline_at_the_end() {
		if (element[last_loop] == "_") return true;
		else return false;
	}

	if (!all_underlines) {

		// Əvvəldə və axırda varsa altdan xətt true olaraq qayıdsın
		if (has_underline_in_the_beginning() || has_underline_at_the_end()) 
			has_underline = true;

		// Əks halda ortada 2 ardıcıl altdan xətt axtarsın
		else check_double_underlines();

	} else check_underline();

	return has_underline;

}

function flash_has_point(element, all_points = false) {

	// Qeyd: all_underlines parametri true qoyulsa bütün tapdığı altdan xəttlər üçün 
	// true qayıdacaq.Əgər false qoyularsa ortada tək olan altdan xəttlər üçün true
	// qayıtmayacaq.

	// Um einen Fehler zu verhindern
	if (flash_is_undefined(element)) 
		return console.log("Could not check the element, because element was undefined.");

	// getting-elements-and-values
	var has_point = false;
	var element_length = element.length;
	var last_loop;

	// Heç bir yazı olmazsa sonuncu döngünün -1 olmaması üçün qoyulub
	if (element_length > 0) last_loop = element.length - 1;
	else last_loop = 0;


	// functions
	function check_double_points() {

		// last-loop - 1 axırıncıdan əvvəlkini də yoxlamağa ehtiyac olmadığına görə
		// qoyulub
		for (var i = 1; i < last_loop - 1; i++) {
	
			if (element[i] == "_" || element[i] == "." || element[i] == " ") {

				if (element[i + 1] == ".") {
					has_point = true;
					break;
				}
					
			}

		}	

	}

	function check_point() {

		for (var i = 0; i < element_length; i++) {
		
			if (element[i] == ".") {
				has_point = true;
				break;
			}

		}

	}

	function has_point_in_the_beginning() {
		if (element[0] == ".") return true;
		else return false;
	}

	function has_point_at_the_end() {
		if (element[last_loop] == ".") return true;
		else return false;
	}

	if (!all_points) {

		// Əvvəldə və axırda varsa altdan xətt true olaraq qayıdsın
		if (has_point_in_the_beginning() || has_point_at_the_end()) has_point = true;

		// Əks halda ortada 2 ardıcıl altdan xətt axtarsın
		else check_double_points();

	} else check_point();

	return has_point;

}

function flash_has_space(element, all_spaces = false) {

	// Qeyd: all_underlines parametri true qoyulsa bütün tapdığı altdan xəttlər üçün 
	// true qayıdacaq.Əgər false qoyularsa ortada tək olan altdan xəttlər üçün true
	// qayıtmayacaq.

	// Um einen Fehler zu verhindern
	if (flash_is_undefined(element)) 
		return console.log("Could not check the element, because element was undefined.");

	// getting-elements-and-values
	var has_space = false;
	var element_length = element.length;
	var last_loop;

	// Heç bir yazı olmazsa sonuncu döngünün -1 olmaması üçün qoyulub
	if (element_length > 0) last_loop = element.length - 1;
	else last_loop = 0;


	// functions
	function check_double_spaces() {

		// last-loop - 1 axırıncıdan əvvəlkini də yoxlamağa ehtiyac olmadığına görə
		// qoyulub
		for (var i = 1; i < last_loop - 1; i++) {
	
			if (element[i] == "_" || element[i] == "." || element[i] == " ") {

				if (element[i + 1] == " ") {
					has_space = true;
					break;
				}
					
			}

		}	

	}

	function check_space() {

		for (var i = 0; i < element_length; i++) {
		
			if (element[i] == " ") {
				has_space = true;
				break;
			}

		}

	}

	function has_space_in_the_beginning() {
		if (element[0] == " ") return true;
		else return false;
	}

	function has_space_at_the_end() {
		if (element[last_loop] == " ") return true;
		else return false;
	}

	if (!all_spaces) {

		// Əvvəldə və axırda varsa altdan xətt true olaraq qayıdsın
		if (has_space_in_the_beginning() || has_space_at_the_end()) has_space = true;

		// Əks halda ortada 2 ardıcıl altdan xətt axtarsın
		else check_double_spaces();

	} else check_space();

	return has_space;

}

function flash_check_email_input(form)  {

	// Um einen Fehler zu verhindern
	if (flash_is_undefined(form)) 
		return console.log("Could not check the element, because element was undefined.");

	// getting-elements-and-values
	var input = form.querySelector('.flash-email');
	var output_of_is_not_correct = form.querySelector('.flash-email-is-not-correct');
	var output_of_is_empty = form.querySelector('.flash-email-is-empty');

	// adding-functions
	input.addEventListener('focusout', check);

	// functions
	function is_empty() {
		flash_add_class(output_of_is_empty, 'visible');
		flash_add_class(input, "input-has-error");
		flash_remove_class(output_of_is_not_correct, 'visible');
	}

	function is_not_empty() {
		flash_remove_class(output_of_is_empty, 'visible');
		flash_remove_class(input, "input-has-error");
	}

	function is_email() {
		flash_remove_class(output_of_is_not_correct, 'visible');
		flash_remove_class(input, "input-has-error");
	}

	function is_not_email() {
		flash_add_class(output_of_is_not_correct, 'visible');
		flash_add_class(input, "input-has-error");
		flash_remove_class(output_of_is_empty, 'visible');
	}

	function check() {

		var value = input.value;

		if (value == "") is_empty();
		else if (!flash_is_email(value)) is_not_email();

		input.removeEventListener('focusout', check);
		input.addEventListener('keyup', check_automatically);

	}

	function check_automatically() {

		var value = input.value;

		if (value == "") is_empty();
		else if (!flash_is_email(value)) is_not_email();
		else { 
			is_email();
			is_not_empty();
		}	
		
	}

}

function flash_is_email(value) {

	// Um einen Fehler zu verhindern
	if (flash_is_undefined(value)) 
		return console.log("Could not check the element, because element was undefined.");

	var is_email = false;

	reg = new RegExp('^([a-zA-Z0-9-._]+)'+
		               '(@)([a-zA-Z0-9-.]+)'+
		               '(.)([a-zA-Z]{2,4})$');
	is_email = (reg.test(value));
	
	return is_email;

}

function flash_is_empty(element) {

	if (element.length == 0) return true;
	else return false;

}


function flash_has_minimum_limit_of_letters(element, minimum_limit = 2) {

	// getting-elements-and-values
	var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M", 
	"N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

	var letters_length = letters.length;
	var element_length = element.length;
	var has_minimum_limit = false;
	var count = 0;
	element = element.toUpperCase();

	// functions
	function check_letter(letter) {

		var is_letter = false;

		for (var i = 0; i < letters_length; i++) {

			if(letter == letters[i]) {
				is_letter = true;
				break;
			} 

		}

		return is_letter;

	}


	for (var i = 0; i < element_length; i++) {
		
		if(check_letter(element[i])) {

			count += 1;

			if (count >= minimum_limit) 
				{ 
					has_minimum_limit = true;
					break;
				}	

		} 	
		
	}	

	return has_minimum_limit;
	
}

function flash_has_minimum_limit_of_numbers(element, minimum_limit = 2) {

	// getting-elements-and-values

	// Qeyd: Javascript boşluğu rəqəm tipindəki 0 ilə eyni hesab etdiyindən 0 string 
	// olaraq verilib.
	var numbers = ["0","1","2","3","4","5","6","7","8","9"];

	var numbers_length = numbers.length;
	var element_length = element.length;
	var has_minimum_limit = false;
	var count = 0;

	// functions
	function check_number(number) {

		var is_number = false;

		for (var i = 0; i < numbers_length; i++) {

			if(number == numbers[i]) {
				is_number = true;
				break;
			} 

		}

		return is_number;

	}


	for (var i = 0; i < element_length; i++) {
		
		if(check_number(element[i])) {

			count += 1;

			if (count >= minimum_limit) 
				{ 
					has_minimum_limit = true;
					break;
				}	

		} 	
		
	}	

	return has_minimum_limit;
	
}

// var my_name = "i 5'ülham";

// alert(flash_has_illegal_letter(my_name));

function flash_has_illegal_letter(element) {

	// getting-elements-and-values
	var letters = ["A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h",
	"I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r",
	"S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z"]; 

	var numbers = ["0","1","2","3","4","5","6","7","8","9"];

	var other_characters = [',','/',';','[',']','\\','`','!','#','$','%','^','&','*',
	'(',')','-','=','+','{','}','|',':','"','\'','<','>','?',' ','.','_'];	

	var letters_length = letters.length;
	var numbers_length = numbers.length;
	var other_characters_length = other_characters.length;
	var element_length = element.length;
	var has_illegal_letter = false;

	// functions
	function is_not_illegal(letter) {

		var is_not_illegal = false;

		for (var i = 0; i < letters_length; i++) {

			if(letter == letters[i]) {
				is_not_illegal = true;
				break;
			} 

		}

		return is_not_illegal;

	}

	// functions
	function is_number(character) {

		var is_number = false;

		for (var i = 0; i < numbers_length; i++) {

			if(character == numbers[i]) {
				is_number = true;
				break;
			} 

		}

		return is_number;

	}

	// functions
	function is_other_character(character) {

		var is_other_character = false;

		for (var i = 0; i < other_characters_length; i++) {

			if(character == other_characters[i]) {
				is_other_character = true;
				break;
			} 

		}

		return is_other_character;

	}

	// loop
	for (var i = 0; i < element_length; i++) {
		
		if (
			!is_not_illegal(element[i]) && 
			!is_number(element[i]) && 
			!is_other_character(element[i])
		) {

			has_illegal_letter = true;
			break;

		} 	
		
	}	

	return has_illegal_letter;

}

function flash_has_number(element) {

	// getting-elements-and-values

	var numbers = ["0","1","2","3","4","5","6","7","8","9"];

	var numbers_length = numbers.length;
	var element_length = element.length;
	var has_number = false;

	// functions
	function is_number(character) {

		var is_number = false;

		for (var i = 0; i < numbers_length; i++) {

			if(number == numbers[i]) {
				is_number = true;
				break;
			} 

		}

		return is_number;

	}


	for (var i = 0; i < element_length; i++) {
		
		if(is_number(element[i])) {

			has_number = true;
			break;
					
		} 	
		
	}	

	return has_number;
	
}

function flash_simple_slide_images(container, settings = {
	loop: 'infinite',
	time: "very-fast",
	link_buttons: false

}) {

	// determining-default-settings
	if (settings.loop ==  undefined) settings.loop = "infinite";
	if (settings.time ==  undefined) settings.time = "normal";  
	if (settings.link_buttons ==  undefined) settings.link_buttons = false;   

	var images = container.querySelectorAll('.flash-slide-images-image');
	var images_length = images.length;
	var image_index = 1;
	var last_index = images.length - 1;
	var last_image_index = 0;
	var before_of_last_image_index = 0;
	var class_name;
	var my_function;
	var loop = 0;

	if (settings.link_buttons) {

		var link_buttons_container_id = container.getAttribute('links-container');
		var link_buttons_container = document.querySelector(''+link_buttons_container_id+'');
		var link_buttons = link_buttons_container.querySelectorAll('.flash-slide-images-links-link');

	}

	// determining-slide-type	
	if (flash_has_class(images[0], "toggle")) class_name = "show";
	else if (flash_has_class(images[0], "fade")) class_name = "fade-in";	
	else if (flash_has_class(images[0], "slide-to-right")) class_name = "to-right";

	images[0].classList.add(''+class_name+'');

	// determining-the-time
	switch (settings.time) {
	  case "very-fast":
	    settings.time = 1000;
	    break;
	  case "fast":
	    settings.time = 2000;
	    break;
	  case "normal":
	    settings.time = 3000;
	    break;
	  case "slow":
	    settings.time = 5000;
	    break;
	  case "very-slow":
	    settings.time = 5000;
	    break;
	}

	// functions
	function start_slide() {

	    my_function = setInterval(function() {	

	    	// images
	    	images[last_image_index].classList.remove(''+class_name+'');    	
	    	images[image_index].classList.add(''+class_name+'');

			// for slide
			if (class_name == "to-right") {

				if (last_image_index == 0) before_of_last_image_index = last_index;
		    	else before_of_last_image_index = last_image_index - 1;

		    	images[before_of_last_image_index].classList.remove('out-of-container');
		    	images[last_image_index].classList.add('out-of-container');

		    }	


		   	// link-buttons
	    	if (settings.link_buttons) {

				link_buttons[last_image_index].classList.remove('active');
				link_buttons[image_index].classList.add('active');

			}


		    // alert(before_of_last_image_index + " " + last_image_index + " " +image_index);
	    	last_image_index = image_index;
   	
	    	// determining-image-index-and-loop
	    	if (image_index == last_index) { 
	    		image_index = 0;
	    		loop += 1;
	    	} else { image_index += 1; }

	    	
	    	// for number of loops
	    	if (loop == settings.loop) setTimeout(function() {
	    		stop();
	    	}, settings.time)

	    }, settings.time)

	}

	function stop_slide() {
		clearInterval(my_function);
	}

	function stop() {
		stop_slide();
		reset();
	}

	function reset() {

		images[last_image_index].classList.remove(''+class_name+'');
	    images[0].classList.add(''+class_name+'');
		image_index = 1;
		last_image_index = 0;
		before_of_last_image_index = 0;
		loop = 0;
		if (settings.link_buttons) {

			for (var i = 1; i < link_buttons.length; i++) {
				link_buttons[i].classList.remove('active');
			}
			
			link_buttons[0].classList.add('active');
			
		}	

	}

	// using_functions 
	start_slide();

}
// the-end-of-slide-images


function flash_open_full_screen(element, button, add_class) {

	function openFullscreen() {

	  if (element.requestFullscreen) {
	    element.requestFullscreen();
	  } else if (element.webkitRequestFullscreen) { /* Safari */
	    element.webkitRequestFullscreen();
	  } else if (element.msRequestFullscreen) { /* IE11 */
	    element.msRequestFullscreen();
	  }

	  if (add_class) element.classList.add('flash-full-screen');

	}

	if (button != undefined) button.addEventListener('click', openFullscreen);

}

function flash_close_full_screen(element) {

	  if (document.exitFullscreen) {
	    document.exitFullscreen();
	  } else if (document.webkitExitFullscreen) { /* Safari */
	    document.webkitExitFullscreen();
	  } else if (document.msExitFullscreen) { /* IE11 */
	    document.msExitFullscreen();
	  }

	  if (element != undefined) element.classList.remove('flash-full-screen');

}


function flash_remove_class(element, class_name, exceptional_element) {

	// using_functions
	if (element[0] == undefined) remove_class_of_element();
	else remove_class_of_elements();

	// functions
	function remove_class_of_element() {
		element.classList.remove(''+class_name+'');
	}

	function remove_class_of_elements() {

		for (var i = 0; i < element.length; i++) {

			element[i].classList.remove(''+class_name+'');

		}

		if (exceptional_element != undefined)
			exceptional_element.classList.add(''+class_name+'');
		
	}



}


function flash_simple_slide(element, autoplay = true, time = "normal") {


	// getting-elements-and-values
	var elements = element.querySelectorAll('.flash-slide-element');
	var previous_button = element.querySelector('.flash-slide-previous');
	var next_button = element.querySelector('.flash-slide-next');
	var class_name;
	var index = 1;
	var last_index = elements.length - 1;
	var previous_index = last_index;
	var my_function;

	// adding-functions
	previous_button.addEventListener('click', previous);
	next_button.addEventListener('click', next);

	// determining-slide-type	
	if (flash_has_class(element, "toggle")) class_name = "show";
	else if (flash_has_class(element, "fade")) class_name = "fade-in";	
	else if (flash_has_class(element, "slide")) class_name = "to-right";

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
	    time = 5000;
	    break;
	}

	// functions
	function play() {

		my_function = setInterval(function() {

			var size = index * 100 + "%";
			elements[0].style.marginLeft = "-"+size+"";
			if (index == 0) previous_index = last_index;
			else previous_index = index - 1;
			if (index == last_index) index = 0;
			else index += 1;

		}, time)
	}

	function stop() {
		clearInterval(my_function);
	}

	function previous() {

		var size = previous_index * 100 + "%";
		elements[0].style.marginLeft = "-"+size+"";

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
		
		var size = index * 100 + "%";
		elements[0].style.marginLeft = "-"+size+"";
		if (index == 0) previous_index = last_index;
		else previous_index = index - 1;
		if (index == last_index) index = 0;
		else index += 1;

		if(autoplay) {
			stop();
			play();
		}	
	}

	// using-functions
	if (autoplay) play();

}

function flash_full_screen_background_images(time = "slow") {

	// getting-elements-and-values
	var images = document.querySelectorAll('.flash-full-screen-bg-images-image');
	var length = images.length - 1;
	var index = 1;
	var last_index = 0;

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

	// adding
	images[0].classList.add('show');
	
	// functions
	function start() {

		setInterval(function() {

			images[index].classList.add('show');
			images[last_index].classList.remove('show');

			if (index == length) {
				index = 0;
				last_index = length;
			}	
			else {
				last_index = index;
				index += 1;

			}	

		}, time)

	}

	// using-functions
	start();

}

// flash-expand
function flash_expand() {

	// getting-elements-and-values
	var elements = document.querySelectorAll('.flash-expand');

	// avoiding-errors
	if(flash_is_undefined(elements[0])) return;

	// adding-functions
	for (var i = 0, type = [], width = []; i < elements.length; i++) {
		
		type[i] = elements[i].getAttribute('expand-when');
		width[i] = elements[i].getAttribute('from-width');
		elements[i].addEventListener(''+type[i]+'', expand);
		elements[i].style.width = ""+width[i]+"";

	}

	// functions
	function expand() {

		if (flash_has_class(this, "expanded")) reduce_width(this);
		else default_width(this);

		this.classList.toggle('expanded');
		
	}

	function reduce_width(elm) {
		
		var width = elm.getAttribute('to-width');
		elm.style.width = ""+width+"";

	}

	function default_width(elm) {

		var width = elm.getAttribute('from-width');
		elm.style.width = ""+width+"";

	}

}

// You must add these classes:
// form - .flash-disable-and-enable-form-buttons
// inputs - .flash-input
// submit - .flash-submit
// reset - .flash-reset
// ! Add to reset button submit-target also for submit button
// ! Do not forget to add disabled attribute to buttons
function flash_disable_and_enable_form_buttons() {

	// getting-elements-and-values
	var forms = document.querySelectorAll('.flash-disable-and-enable-form-buttons');
	var inputs = [];
	var empty_inputs = [];
	var length = forms.length;

	// avoiding-errors
	if (flash_is_undefined(forms[0])) return;

	// adding_functions
	for (var i = 0; i < length; i++) {
		
		// formun bütün inputlarına gərək verəsən, buradad for döngüsü yenə açılmalıdır
		// forms[i].addEventListener('keyup', disable_and_enable);
		// forms[i].addEventListener('keyup', disable_and_enable);
		inputs[i] = forms[i].querySelectorAll('.flash-input');
		empty_inputs[i] = inputs[i].length;

		for (var x = 0; x < inputs[i].length; x++) {
			
			inputs[i][x].addEventListener('keyup', disable_and_enable);
			inputs[i][x].setAttribute('parent-index',''+i+'');

			forms[i].querySelector('.flash-reset').addEventListener('click', function() {
				flash_disable_button(this, true);
				flash_disable_button(document.querySelector(''+this.getAttribute('submit-target')+''));
			});

		}

	}

	// functions
	function disable_and_enable() {
		
		var index = this.getAttribute('parent-index');
		var submit = forms[index].querySelector('.flash-submit');
		var reset = forms[index].querySelector('.flash-reset');

		if(is_empty(index)) flash_disable_button(submit);
		else flash_enable_button(submit);

		if (all_inputs_is_empty(index)) flash_disable_button(reset);
		else flash_enable_button(reset);

	}

	function is_empty(y) {

		var result = false;

		for (var z = 0; z < inputs[y].length; z++) {
			
			if (inputs[y][z].value == "") result = true;  
			
		}

		return result;

	} 

	function all_inputs_is_empty(y) {

		var result = true;

		for (var z = 0; z < inputs[y].length; z++) {
			
			if (inputs[y][z].value != "") result = false;  
			
		}

		return result;

	} 

}

function flash_enable_button(btn) {
	btn.removeAttribute('disabled');
}

function flash_disable_button(btn, click = false) {
	if (click) {

		btn.click();

		setTimeout(function() {
			btn.setAttribute('disabled','');
		}, 1);

	} else btn.setAttribute('disabled','');

}

// functions: get, add, remove and toggle
function flash_attribute(element, my_function = "add", name, value = "") {

	// using-the-function
	switch (my_function) {
	  case "get":
	    return get_attribute();
	    break;
	  case "add":
	    add_attribute();
	    break;
	  case "remove":
	    remove_attribute();
	    break;
	  case "toggle":
	    toggle_attribute()
	    break;
	}

	// functions
	function get_attribute() {
		return element.getAttribute(''+name+'');
	}

	function add_attribute() {
		element.setAttribute(''+name+'',''+value+'');
	}

	function remove_attribute() {
		element.removeAttribute(''+name+'');
	}

	function toggle_attribute() {
		
		if(element.hasAttribute(''+name+'')) remove_attribute();
		else add_attribute();

	}

}

// functions: add, remove, toggle, add_removing_all, remove_all
function flash_class(element, my_function = "add", class_name = "") {

	// using-the-function
	switch (my_function) {
	  case "add":
	    add_class();
	    break;
	  case "remove":
	    remove_class();
	    break;
	  case "toggle":
	    toggle_class()
	    break;
	  case "add_removing_all":
	    add_class_removing_all();
	    break;  
	  case "remove_all":
	    remove_all_classes();
	    break; 
	}

	// functions
	function add_class() {
		element.classList.add(''+class_name+'');
	}

	function remove_class() {
		element.classList.remove(''+class_name+'');
	}

	function toggle_class() {	
		element.classList.toggle(''+class_name+'');
	}

	function add_class_removing_all() {	
		element.className = class_name;
	}

	function remove_all_classes() {	
		element.className = "";
	}

}

function flash_get_value(element) {
	return element.value;
}

function flash_get_text(element) {
	return element.innerText;
}

function flash_get_html(element) {
	return element.innerHTML;
}

function flash_get_value_length(element) {
	var text = element.value;
	return text.length;
}

function flash_get_text_length(element) {
	return element.innerText.length;
}

function flash_get_html_length(element) {
	return element.innerHTML.length;
}

function flash_get_length(element) {
	return element.length;
}




// html = false - only text, not elements
function flash_is_empty(element, html = true) {

	var is_empty = false;

	if (html) {

		if (element.innerText.length == 0 && element.children.length == 0) is_empty = true;

	} else {

		if (element.innerText.length == 0) is_empty = true;	

	}

	return is_empty;

}

function flash_empty(element) {
	element.innerHTML = "";
}


// functions - fade, fade-in, fade-out (default is fade)
// if use fade-in, you must add this class to element: flash-fade
// if use fade-out, you must add these classes to element: flash-fade and flash-fade-in
// you can add these function to a button putting button as 4. argument to function. If do not
// button make it "false"

function flash_fade(element, my_function = "fade", slide = false, button, time = "normal") {

	// determining-the-time
	switch (time) {
	  case "very-fast":
	    time = "0.5s";
	    break;
	  case "fast":
	    time = "1s";
	    break;
	  case "normal":
	    time = "2s";
	    break;
	  case "slow":
	    time = "3s";
	    break;
	  case "very-slow":
	    time = "3.5s";
	    break;
	}

	element.style.transitionDuration = time;

	// adding-or-using-function
	if (button) {

		// adding-the-function
		switch (my_function) {
		  case "fade-in":
		    button.addEventListener('click', fade_in);
		    break;
		  case "fade-out":
		    button.addEventListener('click', fade_out);
		    break;
		  case "fade":
		    button.addEventListener('click', fade);
		    break;
		}

	} else {

		// using-the-function
		switch (my_function) {
		  case "fade-in":
		    fade_in();
		    break;
		  case "fade-out":
		    fade_out();
		    break;
		  case "fade":
		    fade();
		    break;
		}

	}

	// add-classes
	if (slide) element.classList.add('flash-fade-with-slide');
	else element.classList.add('flash-fade');

	// functions

	function fade_in() {

		if (slide) element.classList.add('flash-fade-in-with-slide-down');
		else element.classList.add('flash-fade-in');

	}

	function fade_out() {

		if (slide) element.classList.remove('flash-fade-in-with-slide-down');
		else element.classList.remove('flash-fade-in');

	}

	function fade() {

		if (slide) element.classList.toggle('flash-fade-in-with-slide-down');
		else element.classList.toggle('flash-fade-in');

	}

}

// functions - slide, slide-down, slide-up (default is slide)
// if use slide-down, you must add this class to element: flash-slide
// if use slide-up, you must add these classes to element: flash-slide and flash-slide-down
// you can add these function to a button putting button as 3. argument to function. If do not
// button make it "false"

function flash_slide(element, my_function = "slide", button, time = "normal") {

	// determining-the-time
	switch (time) {
	  case "very-fast":
	    time = "0.5s";
	    break;
	  case "fast":
	    time = "1s";
	    break;
	  case "normal":
	    time = "2s";
	    break;
	  case "slow":
	    time = "3s";
	    break;
	  case "very-slow":
	    time = "3.5s";
	    break;
	}

	element.style.transitionDuration = time;

	// adding-or-using-function
	if (button) {

		// adding-the-function
		switch (my_function) {
		  case "slide-down":
		    button.addEventListener('click', slide_down);
		    break;
		  case "slide-up":
		    button.addEventListener('click', slide_up);
		    break;
		  case "slide":
		    button.addEventListener('click', slide);
		    break;
		}

	} else {

		// using-the-function
		switch (my_function) {
		  case "slide-down":
		    slide_down();
		    break;
		  case "slide-up":
		    slide_up();
		    break;
		  case "slide":
		    slide();
		    break;
		}

	}

	// add-classes
	element.classList.add('flash-slide');

	// functions

	function slide_down() {
		element.classList.add('flash-slide-down');
	}

	function slide_up() {
		element.classList.remove('flash-slide-down');
	}

	function slide() {
		element.classList.toggle('flash-slide-down');
	}

}

// functions - toggle, show, hode (default is toggle)
// if use show, you must add this class to element: flash-show-hide
// if use hide, you must add these classes to element: flash-show-hide and flash-show
// you can add these function to a button putting button as 3. argument to function. If do not
// button make it "false"

function flash_toggle(element, my_function = "toggle", button, time = "not") {

	// determining-the-time
	switch (time) {
	  case "not":
	    time = "0s";
	    break;
	  case "very-fast":
	    time = "0.5s";
	    break;
	  case "fast":
	    time = "1s";
	    break;
	  case "normal":
	    time = "2s";
	    break;
	  case "slow":
	    time = "3s";
	    break;
	  case "very-slow":
	    time = "3.5s";
	    break;
	}

	element.style.transitionDelay = time;

	// adding-or-using-function
	if (button) {

		// adding-the-function
		switch (my_function) {
		  case "show":
		    button.addEventListener('click', show);
		    break;
		  case "hide":
		    button.addEventListener('click', hide);
		    break;
		  case "toggle":
		    button.addEventListener('click', toggle);
		    break;
		}

	} else {

		// using-the-function
		switch (my_function) {
		  case "show":
		    show();
		    break;
		  case "hide":
		    hide();
		    break;
		  case "toggle":
		    toggle();
		    break;
		}

	}

	// add-classes
	element.classList.add('flash-show-hide');

	// functions
	function show() {
		element.classList.add('flash-show');
	}

	function hide() {
		element.classList.remove('flash-show');
	}

	function toggle() {
		element.classList.toggle('flash-show');
	}

}

function flash_get_client_x(e, pixels = true) {

		var rect = e.target.getBoundingClientRect();
  		var x = Math.floor(e.clientX - rect.left);
  		if (!pixels) return x;
  		else return x + "px";

}

// autoplay - true/false 
// time - very-fast/fast/normal/slow/very-slow or any number
// columns 2/3/4/5
// circles true/false 

function flash_gallery(container, settings = {
	autoplay: false,
	time: "normal",
	columns: 3,
	circles: true,
	list_number: true
}) {

	// determining-columns
	var class_name_of_columns;

	if (settings.columns < 2) settings.columns = 2;
	else if (settings.columns > 5) settings.columns = 5;

	if (settings.columns == 2) class_name_of_columns = "flash-gallery-two-images-in-row";
	else if (settings.columns == 3) class_name_of_columns = "flash-gallery-three-images-in-row";
	else if (settings.columns == 4) class_name_of_columns = "flash-gallery-four-images-in-row";
	else if (settings.columns == 5) class_name_of_columns = "flash-gallery-five-images-in-row";

	// determining-default-values
	if (settings.autoplay == undefined) settings.autoplay = false;
	if (settings.time == undefined) settings.time = "normal";
	if (settings.columns == undefined) settings.columns = 3;
	if (settings.circles == undefined) settings.circles = true;
	if (settings.list_number == undefined) settings.list_number = true;

	// getting-elements-and-values
	var gallery_container = container.querySelector('.flash-gallery-container');
	var gallery_list = container.querySelector('.flash-gallery-list');
	var images = container.querySelectorAll('.flash-gallery-item');
	var other_images = [];
	var elements_length_in_list = settings.columns * 3;
	var other_images_length = images.length - elements_length_in_list;
	var other_images_lists_length = other_images_length / elements_length_in_list;
	var images_number = container.querySelector('.flash-gallery-images-number-number');
	var list_numbers = container.querySelector('.flash-gallery-list-numbers');
	var this_list_number = container.querySelector('.flash-gallery-this-list-number');
	var total_list_number = container.querySelector('.flash-gallery-this-total-list-number');

	// writing-images-number
	images_number.innerHTML = images.length;

	// adding-classes
	gallery_list.classList.add(''+class_name_of_columns+'');

	var list_length = Math.ceil(images.length / elements_length_in_list);

	// writing-total-list-number
	if (settings.list_number &&  images.length > elements_length_in_list) 
		total_list_number.innerHTML = list_length;
	else if (settings.list_number && images.length <= elements_length_in_list) {
		total_list_number.innerHTML = "1";
		list_numbers.classList.add('fl-disabled')
	}

	// using-functions
	get_other_images();
	remove_other_images();
	add_other_images();

	// functions
	function get_other_images() {

		for (var i = 0; i < other_images_length; i++) {
		
			other_images[i] = images[elements_length_in_list + i];


		}

	}	

	function remove_other_images() {

		for (var i = elements_length_in_list; i < images.length; i++) {
		
			images[i].remove();
		}

	} 

	function add_other_images() {

		 for (var i = 0, list_containers = [], lists = []; i < other_images_lists_length; i++) {
		 	
		 	// creating-and-adding-lists
			list_containers[i] = flash_create_element("DIV","", {
				class: "flash-gallery-list-container",
			}, gallery_container, "last-child");

			lists[i] = flash_create_element("UL","", {
				class: "flash-gallery-list "+class_name_of_columns+"",
			}, list_containers[i], "last-child");

			// adding-other-images-to-lists
			for (var x = 0; x < elements_length_in_list; x++) {

				if (other_images[x] != undefined)
					lists[i].appendChild(other_images[x].cloneNode(true));

				if (x == elements_length_in_list - 1) 
					other_images.splice(0, elements_length_in_list);

			}

		 }

	}

	function write_this_list_number(x) { if (settings.list_number) this_list_number.innerHTML = x + 1; }

	// getting-elements-and-values
	var gallery_container = container.querySelectorAll('.flash-gallery-container');
	var elements = container.querySelectorAll('.flash-gallery-list-container');
	var previous_button = container.querySelector('.flash-gallery-previous');
	var next_button = container.querySelector('.flash-gallery-next');
	var index = 1;
	var last_index = elements.length - 1;
	var previous_index = last_index;
	var my_function;
	var circles_container = container.querySelector('.flash-gallery-circles-container');
	var circles = [];
	var prev_circle = container.querySelector('.flash-gallery-prev-circle');
	var next_circle = container.querySelector('.flash-gallery-next-circle');
	var circles_limit = 3;
	
	// next-circle
	if (list_length > circles_limit) flash_add_class(next_circle, "active");


	if (other_images_length < 1) {
		flash_disable_button(previous_button);
		flash_disable_button(next_button);
	}

	// adding-functions
	previous_button.addEventListener('click', previous);
	next_button.addEventListener('click', next);

	if (settings.circles) {
		prev_circle.addEventListener('click', previous);
		next_circle.addEventListener('click', next);
	}	


	// determining-the-time
	switch (settings.time) {
	  case "very-fast":
	    settings.time = 1000;
	    break;
	  case "fast":
	    settings.time = 2000;
	    break;
	  case "normal":
	    settings.time = 3000;
	    break;
	  case "slow":
	    settings.time = 5000;
	    break;
	  case "very-slow":
	    settings.time = 6000;
	    break;
	}

	// functions
	function play() {

		my_function = setInterval(function() {

			var size = index * 100 + "%";
			elements[0].style.marginLeft = "-"+size+"";

			active_circle(index);
			write_this_list_number(index);
			active_next_prev_circles(index);

			if (index == 0) previous_index = last_index;
			else previous_index = index - 1;
			if (index == last_index) index = 0;
			else index += 1;

		}, settings.time)
	}

	function stop() {
		clearInterval(my_function);
	}

	function previous() {

		var size = previous_index * 100 + "%";
		elements[0].style.marginLeft = "-"+size+"";

		active_circle(previous_index);
		write_this_list_number(previous_index);
		active_next_prev_circles(previous_index);

		if (previous_index == last_index)  index = 0; 
		else index = previous_index + 1;

		if (previous_index == 0) previous_index = last_index;
		else previous_index -= 1;	

		if(settings.autoplay && other_images_length >= 1) {
			stop();
			play();
		}	

	}

	function next() {
		
		var size = index * 100 + "%";
		elements[0].style.marginLeft = "-"+size+"";

		active_circle(index);
		write_this_list_number(index);
		active_next_prev_circles(index);

		if (index == 0) previous_index = last_index;
		else previous_index = index - 1;
		if (index == last_index) index = 0;
		else index += 1;

		if(settings.autoplay && other_images_length >= 1) {
			stop();
			play();
		}	
	}

	function add_modal_images() {

		var modal_images_main_container = container.querySelector('.flash-gallery-modal-image-container-container');
		
		for (var i = 0, image_containers = []; i < images.length; i++) {
		 	
			image_containers[i] = flash_create_element("DIV","", {
				class: "flash-gallery-modal-image-container",
			}, modal_images_main_container, "last-child");

			flash_create_element("IMG","", {
				class: "flash-gallery-modal-image",
				src: ""+images[i].querySelector('.flash-gallery-image').src+""
			}, image_containers[i], "last-child");

		 }

	}

	function add_circles()  {

		if (!settings.circles || other_images_length < 1) return;

		for (var i = 0; i < other_images_lists_length + 1; i++) {

			circles[i] = flash_create_element("button","", {
				type: "button",
				class: "flash-gallery-circle",
				index: ""+i+""
			}, circles_container, "last-child");

			circles[i].addEventListener('click', change_list_with_circle);

		}

		circles[0].classList.add('active');

	}

	function change_list_with_circle() {

		var my_index = Number(this.getAttribute('index'));

		var size = my_index * 100 + "%";
		elements[0].style.marginLeft = "-"+size+"";

		active_circle(my_index);
		write_this_list_number(my_index);
		active_next_prev_circles(my_index);

		if (my_index == 0) previous_index = last_index;
		else previous_index = my_index - 1;
		if (my_index == last_index) index = 0;
		else index = my_index + 1;

		if(settings.autoplay && other_images_length >= 1) {
			stop();
			play();
		}	

	}

	function active_circle(z) {

		if (!settings.circles || other_images_length < 1) return;

		flash_remove_class(circles, "active", circles[z]);

		var limit = list_length - circles_limit;

		if (z > 2 && z <= limit)
			circles[0].style.marginLeft = "-" + z * 2 + "vw";
		else if (z < circles_limit) 
			circles[0].style.marginLeft = "0px";
		else if (z > limit) 
			circles[0].style.marginLeft = "-" + limit * 2 + "vw";

	}

	function active_next_prev_circles(index) {

		if (!settings.circles) return;

		var length = list_length - circles_limit;
		index += 1;

		// prev-circle
		if (index > circles_limit) flash_add_class(prev_circle, "active");
		else flash_remove_class(prev_circle, "active");

		// next-circle
		if (index > length) flash_remove_class(next_circle, "active");
		else flash_add_class(next_circle, "active");

	}

	// using-functions
	if (settings.autoplay && other_images_length >= 1) play();
	if (settings.circles) add_circles();

	add_modal_images();
	flash_gallery_modal_container(container, settings.time);

}

// flash-gallery-modal-container 
function flash_gallery_modal_container(container, time) {

	// getting-elements-and-values
	var gallery_modal_container = container.querySelector('.flash-gallery-modal-container');
	var elements = container.querySelectorAll('.flash-gallery-modal-image-container');
	var play_button = container.querySelector('.flash-gallery-play');
	var pause_button = container.querySelector('.flash-gallery-pause');
	var previous_button = container.querySelector('.flash-gallery-modal-previous');
	var next_button = container.querySelector('.flash-gallery-modal-next');
	var open_full_screen_button = container.querySelector('.flash-gallery-open-full-screen-button');
	var close_full_screen_button = container.querySelector('.flash-gallery-close-full-screen-button');
	var index = 1;
	var last_index = elements.length - 1;
	var previous_index = last_index;
	var my_function;
	var is_playing = false;
	var buttons = document.querySelectorAll('.flash-gallery-modal-button');
	var modals = document.querySelectorAll('.flash-gallery-modal-container');
	var buttons_length = buttons.length;

	var number_of_image = container.querySelector('.flash-gallery-modal-image-number');
	var number_of_images = container.querySelector('.flash-gallery-modal-number-number');

	// writing-image-numbers
	number_of_image.innerHTML = index;
	number_of_images.innerHTML = elements.length;

	// avoiding-errors
	if (flash_is_undefined(buttons[0]) || flash_is_undefined(modals[0])) return;

	// adding-functions
	play_button.addEventListener('click', play);
	pause_button.addEventListener('click', pause);
	previous_button.addEventListener('click', previous);
	next_button.addEventListener('click', next);

	flash_open_full_screen(gallery_modal_container, open_full_screen_button, true);

	close_full_screen_button.addEventListener('click', function() {
		flash_close_full_screen(gallery_modal_container);
	})	

	flash_remove_class_during_espacing_from_full_screen(gallery_modal_container);

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
	
	
	// using-functions
	flash_prevent_default(buttons);
	flash_index_as_attribute(buttons);

	// adding-close-functions
	var close_buttons = document.querySelectorAll('.flash-gallery-modal-close-button');

	for (var i = 0; i < close_buttons.length; i++) {

		close_buttons[i].addEventListener('click', close);

	}	

	// loops
	for (var i = 0; i < buttons_length; i++) {

		buttons[i].addEventListener('click', show);	 

	}
	
	// functions 
	function select_image(button) {

		var image_index = button.getAttribute('index');
		index = Number(image_index);

		var size = index * 100 + "%";
		elements[0].style.marginLeft = "-"+size+"";
		
		if (index == 0) previous_index = last_index;
		else previous_index = index - 1;
		if (index == last_index) index = 0;
		else index += 1;

		write_image_number();

		if(is_playing) {
			pause();
			play();
		}	

	}

	function show() { 

		var target = this.getAttribute('target');
		var modal = document.querySelector(''+target+'');
		modal.classList.add('show');

		select_image(this);
	
	}

	function close() { 

		var target = this.getAttribute('target');
		var modal = document.querySelector(''+target+'');
		modal.classList.remove('show');
	
	}
	
	function play() {

		my_function = setInterval(function() {

			var size = index * 100 + "%";
			elements[0].style.marginLeft = "-"+size+"";

			if (index == 0) previous_index = last_index;
			else previous_index = index - 1;
			if (index == last_index) index = 0;
			else index += 1;

			write_image_number();

		}, time);

		if(!is_playing) {

			flash_disable_button(play_button);
			flash_enable_button(pause_button);

		}

		is_playing = true;
		

	}

	function pause() {

		clearInterval(my_function);

		if(is_playing) {

			flash_enable_button(play_button);
			flash_disable_button(pause_button);

		}

		is_playing =  false;
		
	}

	function previous() {

		var size = previous_index * 100 + "%";
		elements[0].style.marginLeft = "-"+size+"";
		

		if (previous_index == last_index)  index = 0; 
		else index = previous_index + 1;

		if (previous_index == 0) previous_index = last_index;
		else previous_index -= 1;

		write_image_number();

		if(is_playing) {
			pause();
			play();
		}	

	}

	function next() {
		
		var size = index * 100 + "%";
		elements[0].style.marginLeft = "-"+size+"";
		
		if (index == 0) previous_index = last_index;
		else previous_index = index - 1;
		if (index == last_index) index = 0;
		else index += 1;

		write_image_number();

		if(is_playing) {
			pause();
			play();
		}	
	}

	function write_image_number() {

		if (index == 0) number_of_image.innerHTML = elements.length;
		else number_of_image.innerHTML = index;

	}

}
// the-end-of-flash-gallery-modal-container 


function flash_prevent_default(elements) {

	if (elements[0] == undefined) 
		element.addEventListener("click", function(event){
	  		event.preventDefault();
		});
	else {

		for (var i = 0; i < elements.length; i++) {

			elements[i].addEventListener("click", function(event){
	  			event.preventDefault();
			});

		}	
	}	

}

function flash_index_as_attribute(elements) {

	for (var i = 0; i < elements.length; i++) {

		elements[i].setAttribute('index', ''+i+'');
	}

}


function flash_remove_class_during_espacing_from_full_screen(element) {

	document.addEventListener('fullscreenchange', exit_handler);
	document.addEventListener('webkitfullscreenchange', exit_handler);
	document.addEventListener('mozfullscreenchange', exit_handler);
	document.addEventListener('MSFullscreenChange', exit_handler);

	function exit_handler() {
	    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
	        if (element != undefined) element.classList.remove('flash-full-screen');
	    }
	}  

}

// functions - set, remove and get
function flash_id(element, my_function = "set", id) {

	// using-the-function
	switch (my_function) {
	  case "set":
	    set();
	    break;
	  case "remove":
	    remove()
	    break;
	  case "get":
	    return get();
	    break;
	}

	// functions
	function set() {
		element.id = id;
	}

	function remove() {
		element.id = "";
	}

	function get() {
		return element.id;
	}

}

// var elm = flash_get_elements("class", "my-div-2")
// alert(elm[0].innerHTML);

// types - id, class, name
// parent is optional

function flash_get_element(type = "id", query, parent) {

	var element;

	// using-the-function
	switch (type) {
	  case "id":
	    with_id();
	    break;
	  case "class":
	    with_class();
	    break;
	  case "name":
	    with_name();
	    break;
	}

	// functions
	function with_id() {

		if (parent == undefined)
			element = document.getElementById(''+query+'');
		else
			element = parent.getElementById(''+query+'');

	}

	function with_class() {

		if (parent == undefined)
			element = document.querySelector('.'+query+'');
		else
			element = parent.querySelector('.'+query+'');

	}

	function with_name() {

		if (parent == undefined)
			element = document.querySelector(''+query+'');
		else
			element = parent.querySelector(''+query+'');

	}


	if (element == undefined) console.log("Could not find the element");

	return element;

}

// types - id, class, name
// parent is optional

function flash_get_elements(type = "id", query, parent) {

	var elements = [];

	// using-the-function
	switch (type) {
	  case "id":
	    with_id();
	    break;
	  case "class":
	    with_class();
	    break;
	  case "name":
	    with_name();
	    break;
	}

	// functions
	function with_id() {

		if (parent == undefined)
			elements = document.querySelectorAll('#'+query+'');
		else
			elements = parent.querySelectorAll('#'+query+'');

	}

	function with_class() {

		if (parent == undefined)
			elements = document.querySelectorAll('.'+query+'');
		else
			elements = parent.querySelectorAll('.'+query+'');

	}

	function with_name() {

		if (parent == undefined)
			elements = document.querySelectorAll(''+query+'');
		else
			elements = parent.querySelectorAll(''+query+'');

	}


	if (elements[0] == undefined) console.log("Could not find the element");

	return elements;

}

function flash_switch_containers() {

	// getting-elements-and-values
	var containers =document.querySelectorAll('.flash-switch-containers');
	var buttons = [];
	var elements = [];
	var show_types = [];
	var times = [];
	var circle_containers = [];
	var circles = [];
	var use_circles = [];
	var autoplays = [];
	var autoplay_times = [];
	var autoplay_functions = [];
	var loops = [];

	// avoiding-errors
	if (flash_is_undefined(containers[0])) return;

	// adding-functions
	for (var i = 0; i < containers.length; i++) {

		// getting-elements-and-values
		buttons[i] = containers[i].querySelectorAll('.flash-switch-containers-button');
		elements[i] = containers[i].querySelectorAll('.flash-switch-containers-container');
		circle_containers[i] = containers[i].querySelector('.flash-switch-containers-circles-container');
		times[i] = containers[i].getAttribute('time');
		use_circles[i] = containers[i].getAttribute('circles');
		autoplays[i] = containers[i].getAttribute('autoplay');
		autoplay_times[i] = containers[i].getAttribute('autoplay-time');
		loops[i] = containers[i].getAttribute('autoplay-loop');
			
		// circles	
		if (use_circles[i] ==  "true") {

			add_circles(circle_containers[i], buttons[i].length);
			circles[i] = containers[i].querySelectorAll('.flash-switch-containers-circle');

		}	

		// if autoplay is true
		if (autoplays[i] == "true") {

			// condition-for-autoplay-loop
			if (loops[i] == undefined || loops[i] == "infinite")
				autoplay_functions[i] = flash_click_buttons(buttons[i], autoplay_times[i], false);
			else
				autoplay_functions[i] = flash_click_buttons(buttons[i], autoplay_times[i], false, loops[i]);

			containers[i].addEventListener('mouseover', function() {

				var index = this.querySelector('.flash-switch-containers-button').getAttribute('parent-index');
				clearInterval(autoplay_functions[index]);

			});

		}

		// determining-show-type
		show_types[i] = containers[i].getAttribute('show-type');

		// add-functions-to-buttons
		for (var x = 0; x < buttons[i].length; x++) {

			buttons[i][x].setAttribute('parent-index',''+i+'');
			buttons[i][x].setAttribute('index',''+x+'');
			
			if (show_types[i] == "fade") {

				buttons[i][x].addEventListener('click', fade);
				determine_time(elements[i][x], times[i]);
				elements[i][x].classList.add('fade');
				elements[i][0].classList.add('fade-in');

			}

			else if (show_types[i] == "toggle") {

				buttons[i][x].addEventListener('click', toggle);
				elements[i][x].classList.add('toggle');
				elements[i][0].classList.add('show');

			}

			else if (show_types[i] == "slide") {

				buttons[i][x].addEventListener('click', slide);
				determine_time(elements[i][x], times[i]);
				elements[i][x].classList.add('slide');

			}

			else {

				buttons[i][x].addEventListener('click', fade);
				determine_time(elements[i][x], times[i]);
				elements[i][x].classList.add('fade');
				elements[i][0].classList.add('fade-in');

			}

		}

	}

	// functions
	function fade() {

		var parent_index = this.getAttribute('parent-index');
		var index = this.getAttribute('index');
		flash_remove_class(buttons[parent_index], "active", this);
		flash_remove_class(elements[parent_index], "fade-in", elements[parent_index][index]);

		if (use_circles[parent_index] == "true")
			flash_remove_class(circles[parent_index], "active", circles[parent_index][index]);

	}

	function toggle() {

		var parent_index = this.getAttribute('parent-index');
		var index = this.getAttribute('index');
		flash_remove_class(buttons[parent_index], "active", this);
		flash_remove_class(elements[parent_index], "show", elements[parent_index][index]);

		if (use_circles[parent_index] == "true")
			flash_remove_class(circles[parent_index], "active", circles[parent_index][index]);

	}

	function slide() {

		var parent_index = this.getAttribute('parent-index');
		var index = this.getAttribute('index');
		flash_remove_class(buttons[parent_index], "active", this);

		var size = index * 100 + "%";
		elements[parent_index][0].style.marginLeft = "-"+size+"";

		if (use_circles[parent_index] == "true")
			flash_remove_class(circles[parent_index], "active", circles[parent_index][index]);

	}

	function add_circles(parent, length)  {

		for (var i = 0; i < length; i++) {

			if (i == 0)

			flash_create_element("SPAN","", {
				class: "flash-switch-containers-circle active",
			}, parent, "last-child");

			else 

			flash_create_element("SPAN","", {
				class: "flash-switch-containers-circle",
			}, parent, "last-child");

		}

	}

	// determining-the-time
	function determine_time(element, time) {

		switch (time) {
		  case "very-fast":
		    element.style.transitionDuration = "0.5s";
		    break;
		  case "fast":
		    element.style.transitionDuration = "1s";
		    break;
		  case "normal":
		    element.style.transitionDuration = "2s";
		    break;
		  case "slow":
		    element.style.transitionDuration = "3s";
		    break;
		  case "very-slow":
		    element.style.transitionDuration = "3.5s";
		    break;
		  default:
		    element.style.transitionDuration = "1s";
		    break;  
		}

	}	

}

function flash_prevent_default_links() {

	// getting-elements-and-values
	var links = document.querySelectorAll('.flash-link-disabled');

	// avoiding-errors
	if(flash_is_undefined(links[0])) return;

	// loop	
	for (var i = 0; i < links.length; i++) {

		links[i].addEventListener("click", function(event){
  			event.preventDefault();
		});

	}	

}


function flash_click_buttons(buttons, time, click_first_button = true, limit) {

	// getting-elements-and-values
	var i;
	if (click_first_button) i = 0; else i = 1;
	var loop = 0;
	var my_function;
	if (limit == undefined) limit = "infinite";

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
	my_function = setInterval(function() {

		if (loop == limit) clearInterval(my_function);

		buttons[i].click();

		if (i == buttons.length - 1) {

			i = 0;
			loop += 1;

		} else i++;

	}, time)

	return my_function;

}


// flash-gallery-modal-container 
function flash_slide_images(container, settings = {
	autoplay: false,
	show_type: "slide",
	time: "normal",
	circles: true,
	full_screen: true,
	control_bar: true,
	prev_next: true,
	numbers: true,
	link_buttons: false 

}) {

	// determining-default-values
	if (settings.autoplay == undefined) settings.autoplay = false;
	if (settings.show_type == undefined) settings.show_type = "slide";
	if (settings.time == undefined) settings.time = "normal";
	if (settings.circles == undefined) settings.circles = true;
	if (settings.full_screen == undefined) settings.full_screen = true;
	if (settings.control_bar == undefined) settings.control_bar = true;
	if (settings.prev_next == undefined) settings.prev_next = true;
	if (settings.numbers == undefined) settings.numbers = true;
	if (settings.link_buttons == undefined) settings.link_buttons = false;

	// getting-elements-and-values
	var images_container = container.querySelector('.flash-slide-images-container');
	var images = container.querySelectorAll('.flash-slide-images-image-container');
	var control_bar = container.querySelector('.flash-slide-images-controlbar');
	var play_button = container.querySelector('.flash-slide-images-play');
	var pause_button = container.querySelector('.flash-slide-images-pause');
	var previous_button = container.querySelector('.flash-slide-images-previous');
	var next_button = container.querySelector('.flash-slide-images-next');
	var close_button = container.querySelector('.flash-slide-images-close-button');
	var open_full_screen_button = container.querySelector('.flash-slide-images-open-full-screen');
	var close_full_screen_button = container.querySelector('.flash-slide-images-close-full-screen');
	var circles_parent = container.querySelector('.flash-slide-images-circles-container');
	var circles_main_parent = container.querySelector('.flash-slide-images-circles-main-container');
	var numbers = container.querySelector('.flash-slide-images-numbers');
	var link_buttons = container.querySelectorAll('.flash-slide-images-links-link');
	var prev_circle = container.querySelector('.flash-slide-images-prev-circle');
	var next_circle = container.querySelector('.flash-slide-images-next-circle');
	var circles = [];
	var index = 1;
	var last_index = images.length - 1;
	var previous_index = last_index;
	var my_function;
	var is_playing = false;
	var class_name;
	var circles_limit = 5;

	// avoiding-errors
	if (flash_is_undefined(images[0])) return;

	// determining-show-type
	if (settings.show_type == "fade") {

		flash_add_class(images, "fl-fade");
		images[0].classList.add('fl-fade-in');
		class_name = "fl-fade-in";
		// adding-functions
		if (!settings.control_bar) flash_hide(control_bar);
		else {
			play_button.addEventListener('click', play);
			pause_button.addEventListener('click', pause);
		}
			
		if (!settings.prev_next) {

			flash_hide(previous_button);
			flash_hide(next_button);

		} else {

			previous_button.addEventListener('click', previous);
			next_button.addEventListener('click', next);

		}	
	

	}

	else if (settings.show_type == "toggle") {

		flash_add_class(images, "fl-toggle");
		images[0].classList.add('fl-show');
		class_name = "fl-show";
		// adding-functions
		if (!settings.control_bar) flash_hide(control_bar);
		else {
			play_button.addEventListener('click', play);
			pause_button.addEventListener('click', pause);
		}

		if (!settings.prev_next) {

			flash_hide(previous_button);
			flash_hide(next_button);

		} else {

			previous_button.addEventListener('click', previous);
			next_button.addEventListener('click', next);

		}	

	}

	// default-slide
	else if (settings.show_type == "slide") {

		flash_add_class(images, "fl-slide");
		// adding-functions
		if (!settings.control_bar) flash_hide(control_bar);
		else {
			play_button.addEventListener('click', slide_play);
			pause_button.addEventListener('click', pause);
		}

		if (!settings.prev_next) {

			flash_hide(previous_button);
			flash_hide(next_button);

		} else {

			previous_button.addEventListener('click', slide_previous);
			next_button.addEventListener('click', slide_next);

		}	

	}

	var number_of_image = container.querySelector('.flash-slide-images-image-number');
	var number_of_all_images = container.querySelector('.flash-slide-images-all-images-number');

	// writing-image-numbers
	if (!settings.numbers) flash_hide(numbers);
	else {
		number_of_image.innerHTML = index;
		number_of_all_images.innerHTML = images.length;
	}

	// active-next-circle
	if (settings.circles && images.length > circles_limit) 
		flash_add_class(next_circle, "active");

	// full-screen
	if (!settings.full_screen) flash_hide(open_full_screen_button); 

	else {
		flash_open_full_screen(images_container, open_full_screen_button, true);

		close_full_screen_button.addEventListener('click', function() {
			flash_close_full_screen(images_container);
		})

		close_button.addEventListener('click', function() {
			flash_close_full_screen(images_container);
		})	

		flash_remove_class_during_espacing_from_full_screen(images_container);
	}	

	// determining-the-time
	switch (settings.time) {
	  case "very-fast":
	    settings.time = 1000;
	    break;
	  case "fast":
	    settings.time = 2000;
	    break;
	  case "normal":
	    settings.time = 3000;
	    break;
	  case "slow":
	    settings.time = 5000;
	    break;
	  case "very-slow":
	    settings.time = 6000;
	    break;
	}
	
	// functions
	// belong-to-slide
	function slide_play() {

		my_function = setInterval(function() {

			var size = index * 100 + "%";
			images[0].style.marginLeft = "-"+size+"";

			active_circle(index);
			active_button(index);
			active_next_prev_circles(index);

			if (index == 0) previous_index = last_index;
			else previous_index = index - 1;
			if (index == last_index) index = 0;
			else index += 1;

			write_image_number();

		}, settings.time);

		if(!is_playing) {

			flash_disable_button(play_button);
			flash_enable_button(pause_button);

		}

		is_playing = true;
		

	}

	function slide_previous() {

		var size = previous_index * 100 + "%";
		images[0].style.marginLeft = "-"+size+"";
		
		active_circle(previous_index);
		active_button(previous_index);
		active_next_prev_circles(previous_index);

		if (previous_index == last_index)  index = 0; 
		else index = previous_index + 1;

		if (previous_index == 0) previous_index = last_index;
		else previous_index -= 1;

		write_image_number();

		if(is_playing) {
			pause();
			slide_play();
		}	

	}

	function slide_next() {
		
		var size = index * 100 + "%";
		images[0].style.marginLeft = "-"+size+"";

		active_circle(index);
		active_button(index);
		active_next_prev_circles(index);
		
		if (index == 0) previous_index = last_index;
		else previous_index = index - 1;
		if (index == last_index) index = 0;
		else index += 1;

		write_image_number();

		if(is_playing) {
			pause();
			slide_play();
		}	

	}

	// belong-to-fade
	function play() {

		my_function = setInterval(function() {

			flash_remove_class(images, class_name, images[index]);

			active_circle(index);
			active_button(index);
			active_next_prev_circles(index);

			if (index == 0) previous_index = last_index;
			else previous_index = index - 1;
			if (index == last_index) index = 0;
			else index += 1;

			write_image_number();

		}, settings.time);

		if(!is_playing) {

			flash_disable_button(play_button);
			flash_enable_button(pause_button);

		}

		is_playing = true;
		

	}

	function pause() {

		clearInterval(my_function);

		if(is_playing) {

			flash_enable_button(play_button);
			flash_disable_button(pause_button);

		}

		is_playing =  false;
		
	}

	function previous() {
		
		flash_remove_class(images, class_name, images[previous_index]);

		active_circle(previous_index);
		active_button(previous_index);
		active_next_prev_circles(previous_index);

		if (previous_index == last_index)  index = 0; 
		else index = previous_index + 1;

		if (previous_index == 0) previous_index = last_index;
		else previous_index -= 1;

		write_image_number();

		if(is_playing) {
			pause();
			play();
		}	

	}

	function next() {
		
		flash_remove_class(images, class_name, images[index]);

		active_circle(index);
		active_button(index);
		active_next_prev_circles(index);
		
		if (index == 0) previous_index = last_index;
		else previous_index = index - 1;
		if (index == last_index) index = 0;
		else index += 1;

		write_image_number();

		if(is_playing) {
			pause();
			play();
		}	

	}

	function write_image_number() {

		if (!settings.numbers) return;

		if (index == 0) number_of_image.innerHTML = images.length;
		else number_of_image.innerHTML = index;

	}

	function add_circles(parent)  {

		for (var i = 0; i < images.length; i++) {

			if (i == 0)

			circles[i] = flash_create_element("i","", {
				class: "flash-slide-images-circle active",
			}, parent, "last-child");

			else 

			circles[i] = flash_create_element("i","", {
				class: "flash-slide-images-circle",
			}, parent, "last-child");

		}

	}

	function active_circle(z) {

		if (!settings.circles) return;

		var limit = images.length - circles_limit;
		// if (images.length <= 1 || z >= circles_limit) return;
		if (images.length <= 1) return;
		flash_remove_class(circles, "active", circles[z]);

		if (z > 4 && z <= limit)
			circles[0].style.marginLeft = "-" + z * 30 + "px";
		else if (z < circles_limit) 
			circles[0].style.marginLeft = "0px";
		else if (z > limit) 
			circles[0].style.marginLeft = "-" + limit * 30 + "px";

	}

	function active_next_prev_circles(index) {

		if (!settings.circles) return;

		var length = images.length - circles_limit;
		index += 1;

		// prev-circle
		if (index > circles_limit) flash_add_class(prev_circle, "active");
		else flash_remove_class(prev_circle, "active");

		// next-circle
		if (index > length) flash_remove_class(next_circle, "active");
		else flash_add_class(next_circle, "active");

	}

	function active_button(z) {

		if (images.length <= 1 || settings.link_buttons == false) return;
		flash_remove_class(link_buttons, "active", link_buttons[z]);

	}

	// using-functions
	if (!settings.circles) flash_hide(circles_main_parent);	
	else add_circles(circles_parent);

	if (settings.autoplay) {

		if (settings.show_type == "fade" || settings.show_type == "toggle") play();
		else slide_play();
		

	}	

}
// the-end-of-flash-slide-images

function flash_hide(element) {

	if (element == undefined) return;

	element.style.display = "none";

} 

function flash_open_alert(element) {

	// getting-elements-and-values
	if (flash_is_string(element)) 
		var container = document.querySelector(''+element+'');
	else 
		var container = element;

	// functions
	function open() { container.focus(); }

	// using-functions
	open();

}

function flash_is_string(thing) {

	var is_string = false;

	if (typeof thing == "string") is_string = true;

	return is_string;

}


function flash_post_slide(element, autoplay = true, time = "fast", small_screen = false, circle = false) {


	// getting-elements-and-values
	var big_screen_list = element.querySelector('.flash-post-slide-big-screen-list');
	var elements = big_screen_list.querySelectorAll('.flash-post-slide-item');
	var previous_button = element.querySelector('.flash-post-slide-previous');
	var next_button = element.querySelector('.flash-post-slide-next');
	var index = 1;
	var last_index = elements.length - 1;
	var previous_index = last_index;
	var my_function;
	var procent = 24;
	var circles = [];

	if (small_screen) {

		// getting-elements-and-values
		var small_screen_list = element.querySelector('.flash-post-slide-small-screen-list');
		var ss_elements = small_screen_list.querySelectorAll('.flash-post-slide-item');
		var ss_previous_button = element.querySelector('.flash-post-slide-small-screen-previous');
		var ss_next_button = element.querySelector('.flash-post-slide-small-screen-next');
		var ss_index = 1;
		var ss_last_index = ss_elements.length - 1;
		var ss_previous_index = ss_last_index;
		var my_ss_function;
		var ss_procent = 47.5;
		var ss_circles = [];

		// adding-functions
		ss_previous_button.addEventListener('click', ss_previous);
		ss_next_button.addEventListener('click', ss_next);
	}

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

				if (circle) change_active_circle(index);

				var size = index * procent - 4 + "%";
				elements[0].style.marginLeft = "-"+size+"";
				if (index == 0) previous_index = last_index;
				else previous_index = index - 1;
				if (index == last_index) index = 0;
				else index += 1;

			} else {

				elements[0].style.marginLeft = "4%";
				index = 1;
				previous_index = last_index;

				if (circle) change_active_circle(index);

			}



			disable_enable_buttons();	
			

		}, time);

	}

	function stop() {
		clearInterval(my_function);
	}

	function previous() {

		if (circle) change_active_circle(previous_index);

		var size = previous_index * procent - 4 + "%";

		if (previous_index == 0)
		elements[0].style.marginLeft = "4%";
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

		if (circle) change_active_circle(index);

		var size = index * procent - 4 + "%";
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

		if (index >= last_index - 2) flash_disable_button(next_button);
		else flash_enable_button(next_button);

	}

	function add_circles()  {

		var parent =  flash_create_element("div","", {
			class: "flash-post-slide-circles-con fps-big-screen-circles",
		}, element, "last-child");

		var length = Math.trunc(elements.length / 4);

		if (length < 2) return;

		for (var i = 0; i < length; i++) {

			circles[i] = flash_create_element("button","", {
				type: "button",
				index: ""+i+"",
				class: "flash-post-slide-circle",
			}, parent, "last-child");

			circles[i].addEventListener('click', active_circle);

		}

		circles[0].classList.add('active');

	}

	function active_circle() {

		var i = this.getAttribute('index');
		var size = i * 96 - 4;

		if (i == 0) elements[0].style.marginLeft = "4%";
		else elements[0].style.marginLeft = "-"+size+"%";

		flash_remove_class(circles, "active", this);

		var y = i * 4 + 1;
		var x = i * 4 - 1;

		if (i >= circles.length - 1) { 
			index = 0;
			flash_disable_button(next_button);

		} else {	
			index = y;
			flash_enable_button(next_button);
		}	

		if (i == 0) {
			flash_disable_button(previous_button);
			previous_index = last_index;
		} else { 
			flash_enable_button(previous_button);
			previous_index = x;
		}	

		if(autoplay) {
			stop();
			play();
		}

	}

	function change_active_circle(y) {

		var length = Math.trunc(elements.length / 4);

		for (var i = 0, x = 0; i < length; i++) {
			
			x = i * 4;
			z = x + 1;
			m = z + 1;
			n = m + 1;

			// alert(circles[0].innerHTML);
			if (y == x || y == z || y == m || y == n) {

				flash_remove_class(circles, "active", circles[i]);
				break;

			}

		}

	}

	function ss_play() {

		my_ss_function = setInterval(function() {

			if (!flash_is_disabled(ss_next_button)) {

				if (circle) change_active_ss_circle(ss_index);

				var size = ss_index * ss_procent - 5 + "%";
				ss_elements[0].style.marginLeft = "-"+size+"";
				if (ss_index == 0) ss_previous_index = ss_last_index;
				else ss_previous_index = ss_index - 1;
				if (ss_index == ss_last_index) ss_index = 0;
				else ss_index += 1;

			} else {

				ss_elements[0].style.marginLeft = "5%";
				ss_index = 1;
				ss_previous_index = ss_last_index;

				if (circle) change_active_ss_circle(ss_index);

			}

			disable_enable_ss_buttons();	
			

		}, time);

	}

	function ss_stop() {
		clearInterval(my_ss_function);
	}

	function ss_previous() {

		if (circle) change_active_ss_circle(ss_previous_index);

		var size = ss_previous_index * ss_procent - 5 + "%";

		if (ss_previous_index == 0)
		ss_elements[0].style.marginLeft = "5%";
		else 
		ss_elements[0].style.marginLeft = "-"+size+"";

		if (ss_previous_index == ss_last_index)  ss_index = 0; 
		else ss_index = ss_previous_index + 1;

		if (ss_previous_index == 0) ss_previous_index = ss_last_index;
		else ss_previous_index -= 1;	

		disable_enable_ss_buttons();

		if(autoplay) {
			ss_stop();
			ss_play();
		}

	}

	function ss_next() {

		if (circle) change_active_ss_circle(ss_index);
		
		var size = ss_index * ss_procent - 5 + "%";
		ss_elements[0].style.marginLeft = "-"+size+"";
		if (ss_index == 0) ss_previous_index = ss_last_index;
		else ss_previous_index = ss_index - 1;
		if (ss_index == ss_last_index) ss_index = 0;
		else ss_index += 1;

		disable_enable_ss_buttons();

		if(autoplay) {
			ss_stop();
			ss_play();
		}
	
	}

	function disable_enable_ss_buttons() {

		if (ss_previous_index == ss_last_index) flash_disable_button(ss_previous_button);
		else flash_enable_button(ss_previous_button);

		if (ss_index >= ss_last_index) flash_disable_button(ss_next_button);
		else flash_enable_button(ss_next_button);

	}

	function add_ss_circles()  {

		var parent =  flash_create_element("div","", {
			class: "flash-post-slide-circles-con fps-small-screen-circles",
		}, element, "last-child");

		var length = Math.trunc(ss_elements.length / 2);

		if (length < 2) return;

		for (var i = 0; i < length; i++) {

			ss_circles[i] = flash_create_element("button","", {
				type: "button",
				index: ""+i+"",
				class: "flash-post-slide-circle",
			}, parent, "last-child");

			ss_circles[i].addEventListener('click', active_ss_circle);

		}

		ss_circles[0].classList.add('active');

	}

	function active_ss_circle() {

		var i = this.getAttribute('index');
		var size = i * 95 - 5;

		if (i == 0) ss_elements[0].style.marginLeft = "5%";
		else ss_elements[0].style.marginLeft = "-"+size+"%";

		flash_remove_class(ss_circles, "active", this);

		var y = i * 2 + 1;
		var x = i * 2 - 1;

		if (i >= ss_circles.length - 1) { 
			ss_index = 0;
			flash_disable_button(ss_next_button);

		} else {	
			ss_index = y;
			flash_enable_button(ss_next_button);
		}	

		if (i == 0) {
			flash_disable_button(ss_previous_button);
			ss_previous_index = ss_last_index;
		} else { 
			flash_enable_button(ss_previous_button);
			ss_previous_index = x;
		}

		if(autoplay) {
			ss_stop();
			ss_play();
		}	

	}

	function change_active_ss_circle(y) {

		var length = Math.trunc(ss_elements.length / 2);

		for (var i = 0, x = 0; i < length; i++) {
			
			x = i * 2;
			z = x + 1;

			// alert(circles[0].innerHTML);
			if (y == x || y == z) {

				flash_remove_class(ss_circles, "active", ss_circles[i]);
				break;

			}

		}

	}

	// using-functions
	if (circle) add_circles();

	if (small_screen && circle) add_ss_circles();

	if (autoplay) {

		play();
		if (small_screen) ss_play();

	}	

}

function flash_is_disabled(element) {

	var is_disabled = false;

	var attribute = element.getAttribute('disabled');

	if (attribute !=  null) is_disabled = true;

	return is_disabled;

}

// to element 
// class: flash-clicker
// attribute: click-target="" click-target-2=""
function flash_clicker() {

	// getting-elements-and-values
	var buttons = document.querySelectorAll('.flash-clicker');

	// avoiding-errors
	if (flash_is_undefined(buttons[0])) return;

	// adding_functions
	for (var i = 0; i < buttons.length; i++) {
		
		buttons[i].addEventListener('click', click_button);
	}


	// functions
	function click_button() {

		var target = this.getAttribute('click-target');
		var button = document.querySelector(''+target+'');
		button.click();

		var target_2 = this.getAttribute('click-target-2');
		if (target_2 == null || target_2 == "") return;

		var button_2 = document.querySelector(''+target_2+'');
		button_2.click();

	}

}

// flash-search-form
function flash_extra_search_form(container) {

	// avoiding-errors
	if (flash_is_undefined(container)) return;

	var form = container.querySelector('.flash-search-form');
	var input = form.querySelector('.flash-search-form-search');
	var show_results = form.getAttribute('show-results');
	var results = container.querySelector('.flash-results-of-search');
	var submit = form.querySelector('.flash-search-form-submit');
	var reset = form.querySelector('.flash-search-form-reset');
	var is_searching_text = 
	results.querySelector('.flash-results-of-search-is-searching-text');
	var stop_is_searching_button = 
	results.querySelector('.flash-stop-is-searching');
	var now_is_searching = false;
	var is_searching_parent = 
	results.querySelector('.flash-results-of-search-is-searching');

	

	if (show_results == "true") { 

		input.addEventListener('keyup', toggle);
		input.addEventListener('focusin', show);
		input.addEventListener('focusout', hide);

	} else {

		input.addEventListener('keyup', enable_and_disable_buttons);
		
	}

	reset.addEventListener('click', disable_buttons);
	
	// functions
	function toggle() {

		if (this.value != "") {
			results.classList.add('show');
			enable_submit();
			enable_reset();
		}	
		else { 
			hide();
			disable_submit();
			disable_reset();

		}	

	}

	function show() {

		if (this.value != "") { 
			results.classList.add('show');
			enable_submit();
			enable_reset();
		}	


	}

	function hide() {

		results.classList.remove('show');

	}

	function enable_submit() {

		submit.removeAttribute('disabled');

	}

	function disable_submit() {

		submit.setAttribute('disabled','');

	}

	function enable_reset() {

		reset.removeAttribute('disabled');

	}

	function disable_reset() {

		reset.setAttribute('disabled','');
		
	}

	function disable_buttons() {

		submit.setAttribute('disabled','');
		reset.setAttribute('disabled','');
		input.value = "";

	}

	function enable_and_disable_buttons() {

		if (this.value != "") {
			enable_submit();
			enable_reset();
		}	
		else { 
			disable_submit();
			disable_reset();
		}
	}

	function is_searching() {

		if (!now_is_searching) {
			flash_three_points(is_searching_text, stop_is_searching_button, "fast");
			is_searching_parent.classList.remove('hide');
			now_is_searching = true;
		}	

	}

	function is_not_searching() {

		stop_is_searching_button.click();
		is_searching_parent.classList.add('hide');
		now_is_searching = false;

	}

}
// the-end-of-flash-search-form


function flash_active_elements() {

	// getting-elements-and-values
	var elements = document.querySelectorAll('.flash-active-element');

	// avoiding-errors
	if (flash_is_undefined(elements[0])) return;

	// adding-functions
	for (var i = 0; i < elements.length; i++) {
		
		elements[i].addEventListener('click', active);
		elements[i].addEventListener('click', deactive);

	}

	// functions
	function active() {
		this.classList.add('fl-active');
	}

	function deactive() {
		var this_element = this;
		setTimeout(function() {
			this_element.classList.remove('fl-active');
		}, 200);
		
	}

}

function flash_form_image(event, target) {
	
	var image = document.querySelector(''+target+'');
	image.src = URL.createObjectURL(event.target.files[0]);

}

function flash_reset_image() {

	// get-elements-and-values
	var buttons = document.querySelectorAll('.flash-reset-image');
	var length = buttons.length;

	// avoiding-errors
	if (flash_is_undefined(buttons[0])) return;

	// adding-functions
	for (var i = 0; i < length; i++) {

		buttons[i].addEventListener('click', reset);

	}


	// functions
	function reset() {

		var target = this.getAttribute('form-target');
		var form = document.querySelector(''+target+'');
		var image = form.querySelector('.flash-form-image');
		var default_src = this.getAttribute('default-image-src');

		image.src = ""+default_src+"";

	}

}



// flash-font-size-changer


function flash_font_size_changer() {

	// get-elements-and-values
	var containers = document.querySelectorAll('.fl-font-size-changer-con');

	// avoiding-errors
	if (containers[0] == undefined) return;

	var length = containers.length;
	var targets = [];
	var elements = [];
	var minus_buttons = [];
	var plus_buttons = [];
	var default_sizes = [];
	var plus_sizes = [];
	var size_types = [];
	var change_types = [];
	var lines = [];
	var steps = 5;
	var next_indexes = [];
	var prev_indexes = [];

	// for-loop
	for (var i = 0; i < length; i++) {

		minus_buttons[i] = containers[i].querySelector('.fl-font-size-changer-minus');
		plus_buttons[i] = containers[i].querySelector('.fl-font-size-changer-plus');

		minus_buttons[i].setAttribute('index',''+i+'');
		plus_buttons[i].setAttribute('index',''+i+'');


		targets[i] = containers[i].getAttribute('target');
		elements[i] = document.querySelector(''+targets[i]+'');
		change_types[i] = containers[i].getAttribute('change-type');

		if (change_types[i] == "class") {

			minus_buttons[i].addEventListener('click', minus_with_class);
			plus_buttons[i].addEventListener('click', plus_with_class);
			elements[i].classList.add('ffsc-font-size-1');

		} else { 	

			default_sizes[i] = Number(containers[i].getAttribute('default-size'));
			plus_sizes[i] = Number(containers[i].getAttribute('plus-size'));
			size_types[i] = containers[i].getAttribute('size-type');	
			lines[i] = Number(containers[i].getAttribute('lines'));
			minus_buttons[i].addEventListener('click', minus);
			plus_buttons[i].addEventListener('click', plus);
			elements[i].style.fontSize = ""+default_sizes[i]+size_types[i]+"";
			elements[i].style.lineHeight = ""+default_sizes[i]+size_types[i]+"";
			elements[i].style.maxHeight = ""+default_sizes[i] * lines[i] + size_types[i]+"";

		}	

		next_indexes[i] = 1;

		if (containers[i].getAttribute('in-small-screen') == "true") 
			containers[i].classList.add('fl-in-small-screen');
	}

	// functions

	// with-sizes
	function minus() {

		var y = this.getAttribute('index');

		var last_size = flash_get_numbers_from_string(elements[y].style.fontSize);
		var new_size = last_size - plus_sizes[y];
		elements[y].style.fontSize = ""+new_size+size_types[y]+"";
		elements[y].style.lineHeight = ""+new_size+size_types[y]+"";

		if (lines[y] != "false")
		elements[y].style.maxHeight = ""+new_size * lines[y] + size_types[y]+"";
	
		if (prev_indexes[y] == 0)  { 

			disable_minus(this); 
			next_indexes[y] = 1;

		}

		else { 

			next_indexes[y] = prev_indexes[y] + 1;
			prev_indexes[y] -= 1;

		}	

		enable_plus(plus_buttons[y]);

	}

	function plus() {

		var y = this.getAttribute('index');

		var last_size = flash_get_numbers_from_string(elements[y].style.fontSize);
		var new_size = last_size + plus_sizes[y];
		elements[y].style.fontSize = ""+new_size+size_types[y]+"";
		elements[y].style.lineHeight = ""+new_size+size_types[y]+"";

		if (lines[y] != "false")
		elements[y].style.maxHeight = ""+new_size * lines[y] + size_types[y]+"";

		if (next_indexes[y] == steps - 1) { 

			disable_plus(this); 
			prev_indexes[y] = steps - 2; 

		}

		else { 

			prev_indexes[y] = next_indexes[y] - 1;
			next_indexes[y] += 1;

		}	

		enable_minus(minus_buttons[y]);

	}

	// with-classes
	function minus_with_class() {

		var y = this.getAttribute('index');

		change_classes(y, prev_indexes[y]); 

	
		if (prev_indexes[y] == 0)  { 

			disable_minus(this); 
			next_indexes[y] = 1; }

		else { 

			next_indexes[y] = prev_indexes[y] + 1;
			prev_indexes[y] -= 1;

		}	

		enable_plus(plus_buttons[y]);

	}

	function plus_with_class() {

		var y = this.getAttribute('index');

	    change_classes(y, next_indexes[y]);

		if (next_indexes[y] == steps - 1) { 

			disable_plus(this); 
			prev_indexes[y] = steps - 2; 

		}

		else { 

			prev_indexes[y] = next_indexes[y] - 1;
			next_indexes[y] += 1;

		}	

		enable_minus(minus_buttons[y]);

	}

	function disable_minus(btn) { btn.setAttribute('disabled', ''); }

	function enable_minus(btn) { btn.removeAttribute('disabled'); }

	function disable_plus(btn) { btn.setAttribute('disabled', ''); }

	function enable_plus(btn) { btn.removeAttribute('disabled'); }

	function change_classes(x, loop) {

		switch (loop) {
		  case 0:
		    flash_add_class_removing_others(elements[x], "ffsc-font-size-1", 
		    	["ffsc-font-size-2", "ffsc-font-size-3", "ffsc-font-size-4", "ffsc-font-size-5"]);
		    break;
		  case 1:
		    flash_add_class_removing_others(elements[x], "ffsc-font-size-2", 
		    	["ffsc-font-size-1", "ffsc-font-size-3", "ffsc-font-size-4", "ffsc-font-size-5"]);
		    break;
		  case 2:
		    flash_add_class_removing_others(elements[x], "ffsc-font-size-3", 
		    	["ffsc-font-size-1", "ffsc-font-size-2", "ffsc-font-size-4", "ffsc-font-size-5"]);
		    break;
		  case 3:
		    flash_add_class_removing_others(elements[x], "ffsc-font-size-4", 
		    	["ffsc-font-size-1", "ffsc-font-size-2", "ffsc-font-size-3", "ffsc-font-size-5"]);
		    break;
		  case 4:
		    flash_add_class_removing_others(elements[x], "ffsc-font-size-5", 
		    	["ffsc-font-size-1", "ffsc-font-size-2", "ffsc-font-size-3", "ffsc-font-size-4"]);
		    break;
		}

	}

}
// the-end-of-flash-font-size-changer

function flash_add_class_removing_others(element, class_name, classes = []) {

	element.classList.add(''+class_name+'');

	for (var i = 0; i < classes.length; i++) {
	
			element.classList.remove(''+classes[i]+'');

	}

}


function flash_get_numbers_from_string(str) {

	var regex = /[+-]?\d+(\.\d+)?/g;

	var floats = str.match(regex).map(function(v) { return parseFloat(v); });
	return Number(floats);

}







