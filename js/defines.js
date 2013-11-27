// enum
var CellTypes = {
	Empty: 0,
	Tile: 1,
	Dot: 2
};

// bin enum
var Directions = {
		Up: 1,
		Right: 2,
		Down: 4,
		Left: 8
	},
	DirectionsOpposite = {
		1: 4,
		2: 8,
		4: 1,
		8: 2
	},
	KeyMap = {
		37: 8, // left
		38: 1, // up
		39: 2, // right
		40: 4 // down
	};

var Names = ['pacman', 'blinky', 'pinky'/*, 'inky', 'clyde'*/];