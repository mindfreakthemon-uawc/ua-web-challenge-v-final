function handle_pacman($stage, state) {
	var pacman = state.coords.pacman,
		// current
		pacman_o = $.extend({}, pacman),
		direction_o = pacman.direction;

	var direction = state.key;

	if (!direction) {
		direction = direction_o;
	}

	switch (direction) {
		case Directions.Up:
		case Directions.Down:
		case Directions.Left:
		case Directions.Right:
			var pacman_s = move_named_coords(pacman, direction, true);

			if (is_layout_wall(state, pacman_s)) {
				direction = direction_o;
			}
			break;

		// uses prev state to direct pacman
		case Directions.Up | Directions.Left:
		case Directions.Up | Directions.Right:
		case Directions.Left | Directions.Down:
		case Directions.Right | Directions.Down:
			var direction_w = direction & ~direction_o & ~DirectionsOpposite[direction_o],
				pacman_w = move_named_coords(pacman, direction_w, true);

			if (!is_layout_wall(state, pacman_w)) {
				// ok to move
				direction = direction_w;
			}

			break;
		default:
			direction = direction_o;

	}

	pacman.direction = direction;
	move_named_coords(pacman, direction);

	if (is_layout_wall(state, pacman)) {
		// revert because cant go there
		state.coords.pacman = pacman_o;
		return;
	}

	if (is_named_equals(pacman_o, pacman)) {
		// do nothing
		return;
	}

	var $pacman_o = locate_named($stage, pacman_o),
		$pacman_n = locate_named($stage, pacman);

	// make changed to stage
	$pacman_o.removeClass('pacman direction-' + direction_o);
	$pacman_n.addClass('pacman direction-' + pacman.direction);

	if (is_layout_dot(state, pacman) &&
		$pacman_n.hasClass('dot')) {
		state.score += 10;
		$pacman_n.removeClass('dot');
	}
}