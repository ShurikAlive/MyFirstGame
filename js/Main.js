RATIO_IMAGE_SIZE = 2;
BLOCK_WIDTH = 32 * RATIO_IMAGE_SIZE;
BLOCK_HEIGHT = 32 * RATIO_IMAGE_SIZE;
PLAYER_AND_ZOMBIE_WIDTH = 30 * RATIO_IMAGE_SIZE;
PLAYER_AND_ZOMBIE_HEIGHT = 30 * RATIO_IMAGE_SIZE;
PLAYER_STEP = 1 * RATIO_IMAGE_SIZE;
ZOMBIE_STEP = 0.25 * RATIO_IMAGE_SIZE;
ZOMBIE_DISTANCE_ATTACK = 1;

var lastTime;

function _collision(objA, objB) {
    if (objA.x + objA.width > objB.x && objA.x < objB.x + objB.width && objA.y + objA.height > objB.y && objA.y < objB.y + objB.height) {
        return true;
    }
    else {
        return false;
    }
}

function _criatePlayer(example, ctx, pic, map)
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
	
	return false;
}

function _update(dt) 
{
	_outOfBounds(map, player);
	zomb.takeStep(map);
	zombPlay.takeStep(map);
}

function _draw(map, player, zomb, zombPlay)
{
	map.draw();
	player.draw();
	zomb.draw();
	zombPlay.draw();
}

function _start()
{	
	var now = Date.now();
    var dt = (now - lastTime) / 600.0;
	dTime = dt;

    _update(dt);
    _draw(map, player, zomb, zombPlay);

    lastTime = now;
    requestAnimFrame(_start);
	
}

function _init()
{
	lastTime = Date.now();
	map = new CMap(example, ctx, resources);
	map.init();
	player = _criatePlayer(example, ctx, resources.get('img/Player.gif'), map);
	map.setPlayer(player);
	
	zomb = new CZombieHunterObject(ctx, resources.get('img/Player.gif'), map.objectSpawnArray[0].x, map.objectSpawnArray[0].y,  map.objectPlayerDefenceArray);
	zombPlay = new CZombieHunterPlayer(ctx, resources.get('img/Player.gif'), map.objectSpawnArray[0].x + 100, map.objectSpawnArray[0].y + 100,  map.playersArray);
	
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
	'img/Player.gif'
	]);
	
	resources.onReady(_init);
}