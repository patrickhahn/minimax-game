// Enum for cell ownership status
var own = {
  EMPTY: 0,
  PLAYER: 1,
  CPU: 2
};

var Cell = function (game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.value = Math.floor((Math.random() * 99) + 1);
  this.owner = own.EMPTY;

  this.cell_div = $("<div><p>" + this.value + "</p></div>").css({position: "absolute",
                 width: Cell.WIDTH,
                 height: Cell.HEIGHT,
                 top: y * Cell.HEIGHT,
                 left: x * Cell.WIDTH});
  this.cell_div.addClass("cell");

  var cell = this;

  this.cell_div.on('mousedown', function(e) {
    e.preventDefault();
    if (e.button == 0 && cell.game.player_turn && cell.owner == own.EMPTY) {

      cell.claim_for_player();
    }
  });

  this.cell_div.click(function (e) {
    e.preventDefault();
    if (!cell.game.player_turn) {
      cell.game.cpu_move();
    }
  });
};

Cell.WIDTH = 50;
Cell.HEIGHT = 50;

Cell.prototype.claim_for_player = function() {
  this.game.player_turn = false;
  this.cell_div.toggleClass('claimed', true);
  this.set_owner(own.PLAYER);
  this.game.update(this);
};

Cell.prototype.set_owner = function(new_owner) {
  this.owner = new_owner;
  if (new_owner == own.PLAYER) {
    this.cell_div.toggleClass('player',true);
    this.cell_div.toggleClass('cpu', false);
  }
  else if (new_owner == own.CPU) {
    this.cell_div.toggleClass('player',false);
    this.cell_div.toggleClass('cpu', true);
  }
  else {
    this.cell_div.toggleClass('player',false);
    this.cell_div.toggleClass('cpu', false);
  }
};

Cell.prototype.flip = function() {
  if (this.owner == own.PLAYER) {
    this.set_owner(own.CPU);
  }
  else if (this.owner == own.CPU) {
    this.set_owner(own.PLAYER);
  }
}

Cell.prototype.getNeighbors = function() {
  var neighbors = [];

  if (this.x > 0) {
    neighbors.push(this.game.getCell(this.x - 1, this.y));
  }
  if (this.x < this.game.width - 1) {
    neighbors.push(this.game.getCell(this.x + 1, this.y));
  }
  if (this.y > 0) {
    neighbors.push(this.game.getCell(this.x, this.y - 1));
  }
  if (this.y < this.game.height - 1) {
    neighbors.push(this.game.getCell(this.x, this.y + 1));
  }
  return neighbors;
};

Cell.prototype.getCellDiv = function() {
  return this.cell_div;
};
