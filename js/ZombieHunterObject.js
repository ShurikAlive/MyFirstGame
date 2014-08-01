CZombieHunterObject = CBaseZombie.extend({
	takeStep: function(map)
	{
		var targetObject = map.objectPlayerDefenceArray[this.indexGoalOfDestroying];
		var zoneZombieAttack = new CZoneZombieAttack(this.x, this.y, this.height, this.width, this.distanceAttacks);
		
		//Дошли до дистанции атаки
		if (_collision(targetObject, zoneZombieAttack))
		{
			return;
		}
		//Дошли до дистанции атаки
		
		//Стримимся к цели!
		if (targetObject.x > this.x && !this.isStuck)
		{
			this.x += this.step;
			
			if (_playerHitSnag(map, this))
			{
				this.x -= this.step;
			}
		}
		else if (targetObject.x < this.x && !this.isStuck)
		{
			this.x -= this.step;
			
			if (_playerHitSnag(map, this))
			{
				this.x += this.step;
			}
		}
		
		if (targetObject.y > this.y && !this.isStuck)
		{
			this.y += this.step;
			
			if (_playerHitSnag(map, this))
			{
				this.y -= this.step;
			}
		}
		else if (targetObject.y < this.y && !this.isStuck)
		{
			this.y -= this.step;
			
			if (_playerHitSnag(map, this))
			{
				this.y += this.step;
			}
		}
		//Стримимся к цели!
		
		//Если застряли!
		if ((this.lastX == this.x) && (this.lastY == this.y) && ((this.y != targetObject.y) || (this.x != targetObject.x)))
		{
			this.isStuck = true;
			
			if (this.x == targetObject.x)
			{
				if (this.x > map.width / 2)
				{
					this.directionTraversal = 'left'
				}
				else
				{
					this.directionTraversal = 'right';
				}
			}
			
			if (this.y == targetObject.y)
			{
				if (this.y > map.height / 2)
				{
					this.directionTraversal = 'up'
				}
				else
				{
					this.directionTraversal = 'down';
				}
			}
		}
		
		if (this.isStuck)
		{
			if (this.directionTraversal == 'right')
			{
				this.x += this.step;
				
				if (_playerHitSnag(map, this))
				{
					this.x -= this.step;
				}
			}
			else if (this.directionTraversal == 'left')
			{
				this.x -= this.step;
				
				if (_playerHitSnag(map, this))
				{
					this.x += this.step;
				}
			}
			
			if (this.directionTraversal == 'up')
			{
				this.y -= this.step;
				
				if (_playerHitSnag(map, this))
				{
					this.y += this.step;
				}
			}
			else if (this.directionTraversal == 'down')
			{
				this.y += this.step;
				
				if (_playerHitSnag(map, this))
				{
					this.y -= this.step;
				}
			}
			
			this.currentLongDetour += this.step;
		}
		
		if (this.currentLongDetour >= this.perimeterMoveNearObstacles)
		{
			this.currentLongDetour = 0;
			this.isStuck = false;
		}
		//Если застряли!
		
		this.lastX = this.x;
		this.lastY = this.y;
	}
});
