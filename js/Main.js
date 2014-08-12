RATIO_IMAGE_SIZE = 2;
BLOCK_WIDTH = 32 * RATIO_IMAGE_SIZE;
BLOCK_HEIGHT = 32 * RATIO_IMAGE_SIZE;
PLAYER_WIDTH = 25 * RATIO_IMAGE_SIZE;
PLAYER_HEIGHT = 30 * RATIO_IMAGE_SIZE;
ZOMBIE_WIDTH = 15 * RATIO_IMAGE_SIZE;
ZOMBIE_HEIGHT = 25 * RATIO_IMAGE_SIZE;
PLAYER_STEP = 0.75 * RATIO_IMAGE_SIZE;//при скорости игрока 0.5 количество кадров анимации передвижения делать = 2
ZOMBIE_STEP = 0.25 * RATIO_IMAGE_SIZE;
ZOMBIE_DISTANCE_ATTACK = 1;
SPEAD_STANDART_BULLET = 10;
HEALTH_ZOMBIE = 35;
NUMBER_ZOMBIES_IN_THE_LEVEL = 50;

JOINING_SPRITE_OBJECT_PLAYER = 20;
JOINING_SPRITE_OBJECT_ZOMBIE = 15;

var lastTime;
var levelOfComplexity = 0;

var _requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function _collision(objA, objB) {
    if (objA.x + objA.width > objB.x && objA.x < objB.x + objB.width && objA.y + objA.height > objB.y && objA.y < objB.y + objB.height) {
        return true;
    }
    else {
        return false;
    }
}

function _getZombieSpirte(resources)
{
	return resources.get('img/ZOMBIE' + getRandomInt(1, 4) + '.gif');
}

function _createPlayer(example, ctx, pic, map)
{
	var i = getRandomInt(0, 11);
	var j = getRandomInt(0, 9);
	
	while (map.obstaclesMap[j][i] != null)
	{
		i = getRandomInt(0, 11);
		j = getRandomInt(0, 9);
	}
	
	var x = i * BLOCK_WIDTH;
	var y = j * BLOCK_HEIGHT;
	
	var player = new CPlayer(ctx, pic, x, y);
	return player;
}

function _outOfBounds(map, player)
{
	if (player.x < 0)
	{
		player.x = 0;
	}
	else if (map.width < (player.x + player.width))
	{
		player.x = map.width - player.width;
	}
	
	if (player.y < 0)
	{
		player.y = 0;
	}
	else if (map.height < (player.y + player.height))
	{
		player.y = map.height - player.height;
	}
}

function _playerHitSnag(map, player)
{
	for (var obstacle in map.obstaclesArray)
	{
		if (_collision(player, map.obstaclesArray[obstacle]))
		{
			return true;
		}
	}
	
	for (var zombie in map.zombiesArray)
	{
		if (!map.zombiesArray[zombie].isDestroyed && player != map.zombiesArray[zombie] && _collision(player, map.zombiesArray[zombie]))
		{
			return true;
		}
	}
	
	for (var object in map.objectPlayerDefenceArray)
	{
		if (_collision(player, map.objectPlayerDefenceArray[object]))
		{
			return true;
		}
	}
	
	for (var playerFromTeam in map.playersArray)
	{
		if (player != map.playersArray[playerFromTeam] && _collision(player, map.playersArray[playerFromTeam]))
		{
			return true;
		}
	}
	
	return false;
}

function _criateZombiePlayerHunter(ctx, map, resources)
{
	if (NUMBER_ZOMBIES_IN_THE_LEVEL - map.getNumberOfZombies() <= 0)
	{
		return;
	}

	var numberEdge = getRandomInt(1, 4);
	var x = 0;
	var y = 0;
	var zombPlay = null;
	
	do
	{
		if (numberEdge == 1)//верх
		{
			x = getRandomInt(0, map.width);
			y = -70;
		}
		if (numberEdge == 2)//право
		{
			x = map.width + 5;
			y = getRandomInt(0, map.height);
		}
		if (numberEdge == 3)//низ
		{
			x = getRandomInt(0, map.width);
			y = map.height + 5;
		}
		if (numberEdge == 4)//лево
		{
			x = -70;
			y = getRandomInt(0, map.height);
		}
	
		zombPlay = new CZombieHunterPlayer(ctx, _getZombieSpirte(resources), levelOfComplexity, dTime, x, y, map.playersArray);
	}
	while (_playerHitSnag(map, zombPlay));
	
	map.pushZombieInArrayZombies(zombPlay);
}

function _playerOrZombieStandingOnSpawn(map, spawn)
{
	for (var zombie in map.zombiesArray)
	{
		if (!map.zombiesArray[zombie].isDestroyed &&  _collision(spawn, map.zombiesArray[zombie]))
		{
			return true;
		}
	}
	
	for (var player in map.playersArray)
	{
		if (!map.playersArray[player].isDestroyed && _collision(spawn, map.playersArray[player]))
		{
			return true;
		}
	}
	
	return false;
}

function _criateZombieObjectHunter(ctx, map, resources)
{
	if (NUMBER_ZOMBIES_IN_THE_LEVEL - map.getNumberOfZombies() <= 0)
	{
		return;
	}

	var spawn = map.objectSpawnArray[getRandomInt(0, (map.objectSpawnArray.length - 1))];//Получаем случайный объект (спавнер)

	if (!_playerOrZombieStandingOnSpawn(map, spawn))
	{
		var zombObj = new CZombieHunterObject(ctx, _getZombieSpirte(resources), levelOfComplexity, dTime, spawn.x, spawn.y,  map.objectPlayerDefenceArray);
		map.pushZombieInArrayZombies(zombObj);
	}
}

function _update(dt) 
{

	_outOfBounds(map, player);
	
	if (getRandomInt(1, 1000) >= 990)
	{
		_criateZombiePlayerHunter(ctx, map, resources);
	}
	
	if (getRandomInt(1, 1000) >= 900)
	{
		_criateZombieObjectHunter(ctx, map, resources);
	}
	
	for (var zombie in map.zombiesArray)
	{
		map.zombiesArray[zombie].takeStep(map);
		map.zombiesArray[zombie].attack(map);
	}
	
	player.update(map);
}

function _drawInfo(example, ctx, pic, map, player)
{
	ctx.fillStyle = "black";
	ctx.fillRect(map.width, 0, example.width - map.width, map.height);
	ctx.strokeRect(map.width, 0, example.width - map.width, map.height);
	//найти красивую менюшку
	//ctx.drawImage(pic, 0, 0, 103, 143, map.width, 0, example.width - map.width, map.height);
	
	ctx.font = 'bold ' + 7 * RATIO_IMAGE_SIZE +'px courier';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#FFFFFF';
	
	ctx.fillText('Жизни игрока:', map.width + 10, 15 * RATIO_IMAGE_SIZE);
    ctx.fillText(player.health, map.width + 10, 30 * RATIO_IMAGE_SIZE);

	ctx.fillText('Жизни защищаемого объекта:', map.width + 10, 55  * RATIO_IMAGE_SIZE);
	ctx.fillText(map.objectPlayerDefenceArray[0].health, map.width + 10, 70 * RATIO_IMAGE_SIZE);

	ctx.fillText('Количество патронов:', map.width + 10, 95 * RATIO_IMAGE_SIZE);
	ctx.fillText(player.arsenal[player.currentWeapon].numberOfCartridges, map.width + 10, 110 * RATIO_IMAGE_SIZE);
	
	ctx.fillText('Зомби осталось:', map.width + 10, 135 * RATIO_IMAGE_SIZE);
	ctx.fillText(NUMBER_ZOMBIES_IN_THE_LEVEL - map.getNumberOfZombies(), map.width + 10, 150 * RATIO_IMAGE_SIZE);
}

function _draw(map, player, resources)
{
	map.draw();
	
	player.drawWeapons();

	//необходимо, для того, что бызомби и игорк нормально залазили друг на друга
	var arrayToDrawZombiesAndPlayers = [];
	
	for (var zombie in map.zombiesArray)
	{
		if (map.zombiesArray[zombie].isDestroyed)
		{
			map.zombiesArray[zombie].draw();
		}
		else
		{
			arrayToDrawZombiesAndPlayers.push(map.zombiesArray[zombie]);
		}
	}
	
	arrayToDrawZombiesAndPlayers.push(player);
	
	arrayToDrawZombiesAndPlayers.sort(function(a, b){return a.y - b.y;});
	
	for (var element in arrayToDrawZombiesAndPlayers)
	{
		arrayToDrawZombiesAndPlayers[element].draw();
	}
	//необходимо, для того, что бызомби и игорк нормально залазили друг на друга
	
	_drawInfo(example, ctx, resources.get('img/main.png'), map, player);
}

function _allPlayersAreDestroyed(map)
{
	for (var player in map.playersArray)
	{
		if (!map.playersArray[player].isDestroyed)
		{
			return false;
		}
	}
	
	return true;
}

function _allZombiesAreDestroyed(map)
{
	if ((NUMBER_ZOMBIES_IN_THE_LEVEL - map.getNumberOfZombies()) > 0)
	{
		return false;
	}
	
	for (var zombie in map.zombiesArray)
	{
		if (!map.zombiesArray[zombie].isDestroyed)
		{
			return false;
		}
	}
	
	return true;
}

function _destroyedProtectedObject(map)
{
	for (var objeckt in map.objectPlayerDefenceArray)
	{
		if (map.objectPlayerDefenceArray[objeckt].isDestroyed)
		{
			return true;
		}
	}
	
	return false;
}

function _checkAtEndOfGame(map)
{
	if (_destroyedProtectedObject(map) || _allZombiesAreDestroyed(map) || _allPlayersAreDestroyed(map))
	{
		return true;
	}
	
	return false;
}

function _drawEndGame(message, example, ctx)
{
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, example.width, map.height);
	ctx.strokeRect(0, 0, example.width, map.height);
	//найти красивый фон
	//ctx.drawImage(pic, 0, 0, 103, 143, map.width, 0, example.width - map.width, map.height);
	
	ctx.font = 'bold ' + 15 * RATIO_IMAGE_SIZE +'px courier';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#FFFFFF';

    ctx.fillText(message, example.width / 2, example.height / 2);
	
	ctx.font = 'bold ' + 5 * RATIO_IMAGE_SIZE +'px courier';
	
	ctx.fillText('Press P to go to the menu...', example.width / 2, example.height / 2 + 40);
}

function _start()
{	
	var now = Date.now();
    var dt = (now - lastTime) / 600.0;
	dTime = dt;

	if (!onMenu)
	{
		endGame = _checkAtEndOfGame(map);
	}
		
	if (!onMenu && endGame && delayEndOfGame > 0)
	{
		delayEndOfGame--;
	}	
	
	if (onMenu)
	{
		_drawMenu();
	}
	else if (!endGame || (endGame && delayEndOfGame > 0))
	{
		_update(dt);
		_draw(map, player, resources);
	}
	else if (delayEndOfGame == 0)
	{
		if (_allZombiesAreDestroyed(map))
		{
			_drawEndGame('You win!', example, ctx);
		}
		else if (_destroyedProtectedObject(map) || _allPlayersAreDestroyed(map))
		{
			_drawEndGame('You lose!', example, ctx);
		}
	}
	
    lastTime = now;
    _requestAnimFrame(_start);
	
}

function _init()
{
	onMenu = false;

	lastTime = Date.now();
	delayEndOfGame = 50;
	map = new CMap(example, ctx, resources);
	map.init();
	player = _createPlayer(example, ctx, resources.get('img/Player.gif'), map);
	map.setPlayer(player);
		
	_start();
}

function _drawMenu()
{
	ctx.drawImage(resources.get('img/FoneMenu.jpg'), 0, 0, 1280, 1024, 0, 0, example.width, example.height);
	
	easilyButton.draw();
	averageButton.draw();
	hardButton.draw();
}

function _menu()
{
	onMenu = true;

	easilyButton = new CButton(ctx, resources.get('img/Button.jpg'), 'Easily', 300, 150, 400, 50);
	averageButton = new CButton(ctx, resources.get('img/Button.jpg'), 'Average', 300, 250, 400, 50);
	hardButton = new CButton(ctx, resources.get('img/Button.jpg'), 'Hard', 300, 350, 400, 50);
	
	_start();
}

function main()
{
	onMenu = false;
	example = document.getElementById("page");
	ctx = example.getContext('2d');
	
	example.focus();
	
	example.width *= RATIO_IMAGE_SIZE;
	example.height *= RATIO_IMAGE_SIZE;
	
	example.onclick = function(e)
	{
		var x = (e.pageX - example.offsetLeft);
        var y = (e.pageY - example.offsetTop);
        
		if (onMenu)
		{
			if (easilyButton.hitButton(x, y))
			{
				levelOfComplexity = 1;
				_init();
			}
			if (averageButton.hitButton(x, y))
			{
				levelOfComplexity = 2;
				_init();
			}
			if (hardButton.hitButton(x, y))
			{
				levelOfComplexity = 3;
				_init();
			}
		}
	};
	
	resources.load([
    'img/tex_trava.bmp',
    'img/Spawn.bmp',
	'img/Box.bmp',
	'img/Stone.bmp',
	'img/DefObj.bmp',
	'img/ZOMBIE1.gif',
	'img/ZOMBIE2.gif',
	'img/ZOMBIE3.gif',
	'img/ZOMBIE4.gif',
	'img/Player.gif',
	'img/lifebottle.gif',
	'img/StandartBullet.png',
	'img/FoneMenu.jpg',
	'img/Button.jpg'
	]);
	
	resources.onReady(_menu);
}