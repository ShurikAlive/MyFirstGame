function _calculateTheInitialX(player)
{
	if (player.directionOfMovement == "left" || player.directionOfMovement == "up-left" || player.directionOfMovement == "down-left")
	{
		return (player.x - 3);
	}
	else if (player.directionOfMovement == "right" || player.directionOfMovement == "up-right" || player.directionOfMovement == "down-right")
	{
		return (player.x + player.width + 3);
	}
	else if (player.directionOfMovement == "down" || player.directionOfMovement == "up")
	{
		return (player.x + (player.width / 2));
	}
	
	return (player.x - 3);
}

function _calculateTheInitialY(player)
{
	if (player.directionOfMovement == "down" || player.directionOfMovement == "down-right" || player.directionOfMovement == "down-left")
	{
		return (player.y + player.height + 3);
	}
	else if (player.directionOfMovement == "up" || player.directionOfMovement == "up-right" || player.directionOfMovement == "up-left")
	{
		return (player.y + 3);
	}
	else if (player.directionOfMovement == "right" || player.directionOfMovement == "left")
	{
		return (player.y + (player.height / 2));
	}
	
	return (player.y + 3);
}

CStandartBullet = CBaseBullet.extend({
	constructor: function(player, pic) 
	{
		this.x = _calculateTheInitialX(player);
		this.y = _calculateTheInitialY(player);
		this.width = 4;
		this.height = 4;
		
		this.direction = player.directionOfMovement;
		
		this.pic = pic;
		
		this.demage = 35;
		this.spead = SPEAD_STANDART_BULLET;
		
		this.bulletFaced = false;
	},
	
	bulletHitTheObject: function()
	{
		return this.bulletFaced;
	},
	
	_takeStep: function()
	{
		if (this.direction == "up")
		{
			this.y -= this.spead;
		}
		else if (this.direction == "down")
		{
			this.y += this.spead;
		}
		else if (this.direction == "left")
		{
			this.x -= this.spead;
		}
		else if (this.direction == "right")
		{
			this.x += this.spead;
		}
		else if (this.direction == "up-right")
		{
			this.y -= this.spead;
			this.x += this.spead;
		}
		else if (this.direction == "up-left")
		{
			this.y -= this.spead;
			this.x -= this.spead;
		}
		else if (this.direction == "down-right")
		{
			this.y += this.spead;
			this.x += this.spead;
		}
		else if (this.direction == "down-left")
		{
			this.y += this.spead;
			this.x -= this.spead;
		}
	},
	
	_outOfBounds: function(map)
	{
		if (this.x < 0 || this.x > map.width)
		{
			return true;
		}
		
		if (this.y < 0 || this.y > map.height)
		{
			return true;
		}
		
		return false;
	},
	
	_collisionWithObjects: function(map)
	{
		for (var block in map.obstaclesArray)
		{
			if (_collision(map.obstaclesArray[block], this))
			{
				this.bulletFaced = true;
				return;
			}
		}
		
		for (var zombie in map.zombiesArray)
		{
			if (!map.zombiesArray[zombie].isDestroyed && _collision(map.zombiesArray[zombie], this))
			{
				map.zombiesArray[zombie].setDemage(this.demage);
				this.bulletFaced = true;
				return;
			}
		}
		
		for (var object in map.objectPlayerDefenceArray)
		{
			if (_collision(map.objectPlayerDefenceArray[object], this))
			{
				//вызываем функцию у объекта для нанесения урона
				this.bulletFaced = true;
				return;
			}
		}
		
		if (this._outOfBounds(map))
		{
			this.bulletFaced = true;
			return;
		}
	},
	
	updateState: function(map)
	{
		if (!this.bulletFaced)
		{
			this._takeStep();
			this._collisionWithObjects(map);
		}
	},
	
	draw: function(ctx)
	{
		if (!this.bulletFaced)
		{
			ctx.drawImage(this.pic, 0, 0, 4, 4, this.x, this.y, this.width, this.height);
		}
	}
});