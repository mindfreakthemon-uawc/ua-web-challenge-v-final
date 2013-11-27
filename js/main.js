function domize_level($stage, state) {
	var stage = generate_stage(),
		layout = state.layout = stage.layout,
		coords = state.coords = stage.coords;

	layout.forEach(function (row) {
		var $row = $();

		row.forEach(function (cell_type) {
			var $cell = $('<span />', { 'class': 'cell' });

			switch (cell_type) {
				case CellTypes.Tile:
					$cell
						.addClass('tile');
					break;
				case CellTypes.Dot:
					$cell
						.addClass('dot');
					break;
			}

			$row = $row.add($cell);
		});

		$('<div />', { 'class': 'row' })
			.append($row)
			.appendTo($stage);
	});

	// handle characters
	Names
		.forEach(function (name) {
			var named_coords = coords[name];

			locate_named($stage, named_coords)
				.addClass(name + ' direction-' + named_coords.direction);
		});
}

function iterate_step($stage, $status, state) {
	handle_pacman($stage, state);

	// update score
	$status.find('.score').text(state.score);

	// check if all dots eaten;
	if (!$stage.find('.dot').length) {
		throw 'You won!';
	}

	handle_blinky($stage, state);
	handle_pinky($stage, state);
	//handle_inky($stage, state);
	//handle_clyde($stage, state);

	['blinky', 'pinky'].forEach(function (ghost) {
		if (is_pacman_caught(state, state.coords[ghost])) {
			throw 'Game over';
		}
	});

	// check
}

function handle_arrow_keys($window, state) {
	$window
		.on('keyup keydown', function (e) {
			if (e.which in KeyMap) {
				e.preventDefault();

				if (e.type === 'keyup') {
					// disabled for now
					state.key &= ~KeyMap[e.which];
				} else {
					state.key |= KeyMap[e.which];
					//state.key &= ~DirectionsOpposite[KeyMap[e.which]];
				}
			}
		});
}

$(function () {
	var $stage = $("#stage"),
		$status = $("#status"),
		$window = $(window);

	var state = {
		key: 0,
		score: 0,

		layout: null,
		coords: null
	};

	domize_level($stage, state);
	handle_arrow_keys($window, state);

	var iter = iterate_step.bind(null, $stage, $status, state),
		interval;

	interval = setInterval(function () {
		try {
			iter();
		} catch (e) {
			alert(e);
			clearInterval(interval);

			if (confirm('Restart?')) {
				location.reload();
			}
		}
	}, 800);
});