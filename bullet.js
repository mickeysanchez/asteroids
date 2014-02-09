(function(root) {
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
  var MovingObject = AsteroidsGame.MovingObject;
  
  var Bullet = AsteroidsGame.Bullet = function Bullet(pos, vel, game) {
    this.game = game;
    MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  };
  
  Bullet.inherits(MovingObject); 

  Bullet.RADIUS = 3;
  Bullet.COLOR = "black";
  Bullet.SPEED = 20;
  
  Bullet.prototype.move = function () {
    AsteroidsGame.MovingObject.prototype.move.call(this);
    this.hitAsteroids();
	this.outOfBounds();
  };

  Bullet.prototype.hitAsteroids = function () {
    var that = this;
    this.game.asteroids.forEach(function (asteroid) {
      if (that.isCollidedWith(asteroid)) {
        that.game.removeAsteroid(asteroid);
        that.game.removeBullet(that);
      }
    });
  };
  
  Bullet.prototype.outOfBounds = function () {
	if (Math.abs(this.pos[0]) > AsteroidsGame.Game.DIM_X || Math.abs(this.pos[1]) > AsteroidsGame.Game.DIM_Y) {
	  	  var index = this.game.bullets.indexOf(this);
	  	  this.game.bullets = this.game.bullets.slice(index+1);
	}
  };

})(this);