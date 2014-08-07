function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

CMap = Base.extend({
	constructor: function(example, ctx, picturesResurse)
	{
		this.obstaclesArray = [];//массив препятствий
		this.obstaclesMap = [];//Сама карта
		this.objectSpawnArray = [];//Массив спавнов зомби
		this.objectPlayerDefenceArray = [];//Объект, который должен защищать игрок
		this.playersArray = [];//Массив с игроками
		this.zombiesArray = [];//Массив зомби
		this.height = 0;
		this.width = 0;
	
		this.example = example;
		this.ctx = ctx;
		this.picturesResurse = picturesResurse;
	},

	pushZombieInArrayZombies: function(zombie)
	{
		this.zombiesArray.push(zombie);
	},
		
	sortAnArrayOfZombies: function()
	{
		this.zombiesArray.sort(function(a,b){return !a.isDestroyed});
	},
	
	init: function()
	{
		var arrayMap = [
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		];
	
		for (var j = 0; j < arrayMap.length; ++j)
		{
			for (var i = 0; i < arrayMap[j].length; ++i)
			{
				numberBlock = getRandomInt(1, 40);
			
				if (numberBlock >= 11 && numberBlock < 13)
				{	
					var box = new CBox(this.ctx, this.picturesResurse.get('img/Box.bmp'), i * BLOCK_WIDTH, j * BLOCK_HEIGHT);
					arrayMap[j][i] = box;
					this.obstaclesArray.push(box);
				}
				else if (numberBlock >= 13 && numberBlock < 15)
				{
					var stone = new CStone(this.ctx, this.picturesResurse.get('img/Stone.bmp'), i * BLOCK_WIDTH, j * BLOCK_HEIGHT);
					arrayMap[j][i] = stone;
					this.obstaclesArray.push(stone);
				}
			}
		}
	
		var i = getRandomInt(0, 11);
		var j = getRandomInt(0, 2);
		
		while (arrayMap[j][i] != null)
		{
			i = getRandomInt(0, 11);
			j = getRandomInt(0, 2);
		}
	
		var spawnObj = new CSpawnObject(this.ctx, this.picturesResurse.get('img/Spawn.bmp'), i * BLOCK_WIDTH, j * BLOCK_HEIGHT);
		arrayMap[j][i] = spawnObj;
		this.objectSpawnArray.push(spawnObj);
	
		i = getRandomInt(0, 11);
		j = getRandomInt(7, 9);
	
		while (arrayMap[j][i] != null)
		{
			i = getRandomInt(0, 11);
			j = getRandomInt(7, 9);
		}
	
		var defencObject = new CDefencObject(this.ctx, this.picturesResurse.get('img/DefObj.bmp'), i * BLOCK_WIDTH, j * BLOCK_HEIGHT);
		arrayMap[j][i] = defencObject;
		this.objectPlayerDefenceArray.push(defencObject);
		
		this.height = arrayMap.length * BLOCK_HEIGHT;
		this.width = arrayMap[1].length * BLOCK_WIDTH;
		this.obstaclesMap = arrayMap;
	},
	
	draw: function()
	{
		for (var j = 0; j < this.obstaclesMap.length; ++j)
		{
			for (var i = 0; i < this.obstaclesMap[j].length; ++i)
			{
				this.ctx.drawImage(this.picturesResurse.get('img/tex_trava.bmp'), 0, 0, 64, 64, i * BLOCK_WIDTH, j * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);	
					
				if (this.obstaclesMap[j][i] != null)
				{
					this.obstaclesMap[j][i].draw();
				}
			}
		}
	},
	
	setPlayer: function(player)
	{
		this.playersArray.push(player);
	}
});