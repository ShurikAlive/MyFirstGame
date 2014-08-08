CZombieHunterPlayer = CBaseZombie.extend({
	takeStep: function(map)
	{
		if (this.isDestroyed || this.isAttacking)
		{
			return;
		}
	
		var targetObject = map.playersArray[this.indexGoalOfDestroying];
		var zoneZombieAttack = new CZoneZombieAttack(this.x, this.y, this.height, this.width, this.distanceAttacks);
		
		var previousDirection = this.directionOfMovement;
		
		//Дошли до дистанции атаки
		if (_collision(targetObject, zoneZombieAttack))
		{
			this.isStand = true;
			return;
		}
		else
		{
			this.isStand = false;
		}
		//Дошли до дистанции атаки
		
		this.directionOfMovement = '';
		
		//Стримимся к цели!
		if (targetObject.y > this.y && !this.isStuck)
		{
			this.y += this.step;
			
			if (_playerHitSnag(map, this))
			{
				this.y -= this.step;
			}
			else
			{
				this.directionOfMovement += 'down';
			}
		}
		else if (targetObject.y < this.y && !this.isStuck)
		{
			this.y -= this.step;
			
			if (_playerHitSnag(map, this))
			{
				this.y += this.step;
			}
			else
			{
				this.directionOfMovement += 'up';
			}
		}
		
		if (targetObject.x > this.x && !this.isStuck)
		{
			this.x += this.step;
			
			if (_playerHitSnag(map, this))
			{
				this.x -= this.step;
			}
			else
			{
				this.directionOfMovement += 'right';
			}
		}
		else if (targetObject.x < this.x && !this.isStuck)
		{
			this.x -= this.step;
			
			if (_playerHitSnag(map, this))
			{
				this.x += this.step;
			}
			else
			{
				this.directionOfMovement += 'left';
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
			this.directionOfMovement = '';
			
			if (this.directionTraversal == 'up')
			{
				this.y -= this.step;
				
				if (_playerHitSnag(map, this))
				{
					this.y += this.step;
				}
				else
				{
					this.directionOfMovement += 'up';
				}
			}
			else if (this.directionTraversal == 'down')
			{
				this.y += this.step;
				
				if (_playerHitSnag(map, this))
				{
					this.y -= this.step;
				}
				else
				{
					this.directionOfMovement += 'down';
				}
			}
			
			if (this.directionTraversal == 'right')
			{
				this.x += this.step;
				
				if (_playerHitSnag(map, this))
				{
					this.x -= this.step;
				}
				else
				{
					this.directionOfMovement += 'right';
				}
			}
			else if (this.directionTraversal == 'left')
			{
				this.x -= this.step;
				
				if (_playerHitSnag(map, this))
				{
					this.x += this.step;
				}
				else
				{
					this.directionOfMovement += 'left';
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
		
		if (this.directionOfMovement == '')
		{
			this.directionOfMovement = previousDirection;
			this.isStand = true;
		}
		
		this.lastX = this.x;
		this.lastY = this.y;
	},
	
	attack: function(map)
	{
		var targetObject = map.playersArray[this.indexGoalOfDestroying];
		var zoneZombieAttack = new CZoneZombieAttack(this.x, this.y, this.height, this.width, this.distanceAttacks);
				
		if (!this.isDestroyed && this.isStand && _collision(targetObject, zoneZombieAttack) && (Date.now() - this.lastHit >= this.rate))
		{		
			this.isAttacking = true;
			targetObject.setDemage(this.demage);
			this.lastHit = Date.now();
		}
		else if ((Date.now() - this.lastHit >= this.rate))
		{
			this.isAttacking = false;
		}
	}
});
