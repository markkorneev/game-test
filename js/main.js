/**
 * @author Mark Korneev <korneevmark@gmail.com>
 * @license GNU/AGPLv3
 * @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
 */

'use strict';

(function () {
	var h1 = document.getElementsByTagName('h1');
	h1 = Array.prototype.slice.call(h1);	
	h1.forEach(function (item) {
		item.innerHTML = 'Game here mdfka!';
	});
	
	// Create the canvas
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 600;
	document.body.appendChild(canvas);
	
	var spritesNames = ['bg', 'hero', 'enemy'];

	
	var sprites = spritesNames.reduce(function (items, name) {
	
		var item = items[name] = {
			ready: false,
			image: new Image()
		};
		
		item.image.onload = function () {
			item.ready = true;
		};
		
		item.image.onerror = function () {
			console.error('Cannot load sprite "' + name + '"');
		};
		
		item.image.src = 'images/'+ name +'.png';
		
		return items;
	}, {});
	

	// Game objects
	var hero = {
		speed: 256, // movement in pixels per second
		x: 0,
		y: 0
	};
	var enemy = {
		x: 0,
		y: 0
	};
	var enemysKills = 0;

	// Handle keyboard controls
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e){
		delete keysDown[e.keyCode];
	}, false);

	// Reset the game when the player catches a enemy
	function reset() {
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
	
		// Throw the enemy somewhere on the screen randomly
		enemy.x = 32 + (Math.random() * (canvas.width - 64));
		enemy.y = 32 + (Math.random() * (canvas.height - 64));
	}

	// Update game objects
	function update(modifier) {
		if (38 in keysDown) { // Player holding up
			hero.y -= hero.speed * modifier;
		}
		if (40 in keysDown) { // PLayer holding down
			hero.y += hero.speed * modifier;
		}
		if (37 in keysDown) { // PLayer holding left
			hero.x -= hero.speed * modifier;
		}
		if (39 in keysDown) { // PLayer holding right
			hero.x += hero.speed * modifier;
		}
	
		// Are they touching?
		if (
			hero.x <= (enemy.x + 32)
			&& enemy.x <= (hero.x + 32)
			&& hero.y <= (enemy.y + 32)
			&& enemy.y <= (hero.y + 32)
		) {
			++enemysKills;
			reset();
		}
	}

	// Draw everything
	function render() {
		if (sprites.bg.ready) {
			ctx.drawImage(sprites.bg.image, 0, 0);
		}
	
		if (sprites.hero.ready) {
			ctx.drawImage(sprites.hero.image, hero.x, hero.y);
		}
	
		if (sprites.enemy.ready) {
			ctx.drawImage(sprites.enemy.image, enemy.x, enemy.y);
		}
	
		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Kills: " + enemysKills, 32, 32);
	}
	
	
	
	var then = Date.now();
	
	function main() {
		var
			now = Date.now(),
			delta = now - then;
		
		update(delta / 1000);
		render();
		
		then = now;
		
		// Request to do this again ASAP
		requestAnimationFrame(main);
	}
	
	// Let's play this game!
	reset();
	requestAnimationFrame(main);
})();
