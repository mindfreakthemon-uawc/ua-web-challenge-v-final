function handle_blinky($stage, state) {
	var blinky = state.coords.blinky,
		blinky_o = $.extend({}, blinky),
		direction_o = blinky.direction,
		direction = ghost_direction(state, blinky, direction_o);

	blinky.direction = direction;
	move_named_coords(blinky, direction);

	var $blinky_o = locate_named($stage, blinky_o),
		$blinky_n = locate_named($stage, blinky);

	$blinky_o.removeClass('blinky direction-' + direction_o);
	$blinky_n.addClass('blinky direction-' + direction);
}

function handle_pinky($stage, state) {
	var pinky = state.coords.pinky,
		pinky_o = $.extend({}, pinky),
		pacman = state.coords.pacman,
		direction_o = pinky.direction,
		direction = ghost_direction(state, pinky, direction_o, move_named_coords(pacman, pacman.direction, true, 4));

	pinky.direction = direction;
	move_named_coords(pinky, direction);

	var $pinky_o = locate_named($stage, pinky_o),
		$pinky_n = locate_named($stage, pinky);

	$pinky_o.removeClass('pinky direction-' + direction_o);
	$pinky_n.addClass('pinky direction-' + direction);
}