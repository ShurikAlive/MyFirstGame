RATIO_IMAGE_SIZE = 2;
BLOCK_WIDTH = 32 * RATIO_IMAGE_SIZE;
BLOCK_HEIGHT = 32 * RATIO_IMAGE_SIZE;
PLAYER_WIDTH = 25 * RATIO_IMAGE_SIZE;
PLAYER_HEIGHT = 30 * RATIO_IMAGE_SIZE;
ZOMBIE_WIDTH = 15 * RATIO_IMAGE_SIZE;
ZOMBIE_HEIGHT = 25 * RATIO_IMAGE_SIZE;
PLAYER_STEP = 0.5 * RATIO_IMAGE_SIZE;
ZOMBIE_STEP = 0.25 * RATIO_IMAGE_SIZE;
ZOMBIE_DISTANCE_ATTACK = 1;

var lastTime;

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
		if (player != map.zombiesArray[zombie] && _collision(player, map.zombiesArray[zombie]))
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
	var numberEdge = getRandomInt(1, 4);
	var x = 0;
	var y = 0;
	
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
	
	var zombPlay = new CZombieHunterPlayer(ctx, _getZombieSpirte(resources), dTime, x, y, map.playersArray);
	
	map.pushZombieInArrayZombies(zombPlay);
}

function _playerOrZombieStandingOnSpawn(map, spawn)
{
	for (var zombie in map.zombiesArray)
	{
		if ( _collision(spawn, map.zombiesArray[zombie]))
		{
			return true;
		}
	}
	
	for (var player in map.playersArray)
	{
		if ( _collision(spawn, map.playersArray[player]))
		{
			return true;
		}
	}
	
	return false;
}

function _criateZombieObjectHunter(ctx, map, resources)
{
	var spawn = map.objectSpawnArray[getRandomInt(0, (map.objectSpawnArray.length - 1))];//Получаем случайный объект (спавнер)

	if (!_playerOrZombieStandingOnSpawn(map, spawn))
	{
		var zombObj = new CZombieHunterObject(ctx, _getZombieSpirte(resources), dTime, spawn.x, spawn.y,  map.objectPlayerDefenceArray);
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
	}
}

function _draw(map, player)
{
	map.draw();
	player.draw();
	
	for (var zombie in map.zombiesArray)
	{
		map.zombiesArray[zombie].draw();
	}
}

function _start()
{	
	var now = Date.now();
    var dt = (now - lastTime) / 600.0;
	dTime = dt;

    _update(dt);
    _draw(map, player);

    lastTime = now;
    _requestAnimFrame(_start);
	
}

function _init()
{
	lastTime = Date.now();
	map = new CMap(example, ctx, resources);
	map.init();
	player = _createPlayer(example, ctx, resources.get('img/Player.gif'), map);
	map.setPlayer(player);
		
	_start();
}

function main(map, player)
{
	example = document.getElementById("page");
	ctx = example.getContext('2d');
	
	example.focus();
	
	example.width *= RATIO_IMAGE_SIZE;
	example.height *= RATIO_IMAGE_SIZE;
	
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
	'img/Player.gif'
	]);
	
	resources.onReady(_init);
}