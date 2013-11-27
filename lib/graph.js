// graph.js
// Sets up the page with a graph

Array.prototype.remove = function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

var GraphNodeType = { OPEN: 0, WALL: 1 };

function Graph(grid) {
	this.elements = grid;
	this.nodes = [];

	for (var x = 0; x < grid.length; x++) {
		var row = grid[x];
		this.nodes[x] = [];
		for (var y = 0; y < row.length; y++) {
			this.nodes[x].push(new GraphNode(x, y, row[y]));
		}
	}
}

Graph.prototype.toString = function () {
	var graphString = "\n";
	var nodes = this.nodes;
	for (var x = 0; x < nodes.length; x++) {
		var rowDebug = "";
		var row = nodes[x];
		for (var y = 0; y < row.length; y++) {
			rowDebug += row[y].type + " ";
		}
		graphString = graphString + rowDebug + "\n";
	}
	return graphString;
};

function GraphNode(x, y, type) {
	this.data = { };
	this.x = x;
	this.y = y;
	this.pos = {x: x, y: y};
	this.type = type;
}

GraphNode.prototype.toString = function () {
	return "[" + this.x + " " + this.y + "]";
};

GraphNode.prototype.isWall = function () {
	return this.type == GraphNodeType.WALL;
};