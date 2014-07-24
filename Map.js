BLOCK_WIDTH = 32;
BLOCK_HEIGHT = 32;

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// карта пока без защищаемого блока!!!

function CMap(example, ctx, picturesResurse)
{
	this.obstaclesArray = [];//массив препятствий
	this.obstaclesMap = [];//Сама карта
	this.objectSpawnArray = [];//Массив спавнов зомби
	this.objectPlayerDefenceArray = [];//Объект, который должен защищать игрок
	
	this.example = example;
	this.ctx = ctx;
	this.picturesResurse = picturesResurse;
}

CMap.prototype.init = function()
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
	
	i = 11 - i;
	j = 9 - j;
	
	while (arrayMap[j][i] != null)
	{
		if (i > 6)
		{
			i -= 1;
		}
		else 
		{
			i += 1;
		}
		
		if (j > 7)
		{
			j -= 1;
		}
		else 
		{
			j += 1;
		}
	}
	
	var defencObject = new CDefencObject(this.ctx, this.picturesResurse.get('img/DefObj.bmp'), i * BLOCK_WIDTH, j * BLOCK_HEIGHT);
	arrayMap[j][i] = defencObject;
	this.objectPlayerDefenceArray.push(defencObject);
		
	this.obstaclesMap = arrayMap;
}
	
CMap.prototype.draw = function()
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
}