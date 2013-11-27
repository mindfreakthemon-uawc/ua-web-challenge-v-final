function generate_stage() {
	var stage = {
		layout: [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 2, 1, 1, 2, 1, 1, 0, 1, 2, 1, 1, 2, 1, 1, 2, 1],
			[1, 2, 1, 1, 2, 1, 1, 0, 1, 2, 1, 1, 2, 1, 1, 2, 1],
			[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1],
			[1, 2, 2, 2, 2, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 1],
			[1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1],
			[1, 1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1],
			[1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1],
			[1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
			[1, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 1],
			[1, 2, 1, 1, 2, 1, 1, 0, 1, 0, 1, 1, 2, 1, 1, 2, 1],
			[1, 2, 2, 1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1, 2, 2, 1],
			[1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
			[1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1],
			[1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1],
			[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		coords: {
			pacman: {row: 13, index: 8, direction: Directions.Right },

			blinky: { row: 7, index: 8, direction: Directions.Right },
			pinky: { row: 8, index: 8, direction: Directions.Up }
			//inky: { row: 6, index: 3, direction: Directions.Right },
			//clyde: { row: 6, index: 5, direction: Directions.Left }
		}
	};

	return stage;
}

/**
 *
 * @param named_coords
 * @param direction
 * @param [new_ref] - if set, creates a copy and changes it, changes the same obj otherwise
 * @param cells
 */
function move_named_coords(named_coords, direction, new_ref, cells) {
	var named_coords_n = new_ref ? $.extend({}, named_coords) : named_coords;

	cells = cells || 1;

	switch (direction) {
		case Directions.Up:
			named_coords_n.row -= cells;
			break;
		case Directions.Down:
			named_coords_n.row += cells;
			break;
		case Directions.Left:
			named_coords_n.index -= cells;
			break;
		case Directions.Right:
			named_coords_n.index += cells;
			break;
	}

	return named_coords_n;
}

function is_layout_type(state, named_coords, type) {
	return state.layout[named_coords.row][named_coords.index] === type;
}

function is_layout_dot(state, named_coords) {
	return is_layout_type(state, named_coords, CellTypes.Dot);
}

function is_layout_wall(state, named_coords) {
	return is_layout_type(state, named_coords, CellTypes.Tile);
}

function is_named_equals(named_coords1, named_coords2) {
	return named_coords1.row === named_coords2.row &&
		named_coords1.index === named_coords2.index;
}

function is_pacman_caught(state, named_coords) {
	return is_named_equals(state.coords.pacman, named_coords);
}

function manhattan_distance(named_coords1, named_coords2) {
	return Math.abs(named_coords1.row - named_coords2.row) +
		Math.abs(named_coords1.index - named_coords2.index);
}

function ghost_direction(state, named_coords, direction_o, pacman_coords) {
	var direction = null,
		min = Number.MAX_VALUE;

	pacman_coords = pacman_coords || state.coords.pacman;

	['Right', 'Down', 'Left', 'Up'].forEach(function (k) {
		if (Directions[k] === DirectionsOpposite[direction_o]) {
			// do not turn around
			return;
		}

		var nc = move_named_coords(named_coords, Directions[k], true);

		if (is_layout_wall(state, nc)) {
			return;
		}

		var md = manhattan_distance(nc, pacman_coords);

		if (md <= min) {
			min = md;
			direction = Directions[k];
		}
	});

	return direction;
}

function locate_named($stage, named_coords) {
	return $stage
		.children().eq(named_coords.row)
		.children().eq(named_coords.index);
}