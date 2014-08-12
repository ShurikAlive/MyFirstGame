CZoneZombieAttack = Base.extend({
	constructor: function(x, y, height, width, attackRange)
	{
		this.x = x - attackRange;
		this.y = y - attackRange;
		this.height = height + (attackRange * 2);
		this.width = width + (attackRange * 2);
	}
});

CBaseZombie = Base.extend({
	constructor: function(ctx, pic, levelOfComplexity, dTime, x, y, arrayObjects) {
		this.ctx = ctx;
		this.pic = pic;
		this.x = x;
		this.y = y;
		this.lastX = x;
		this.lastY = y;
		this.width = ZOMBIE_WIDTH;
		this.height = ZOMBIE_HEIGHT;
		this.directionOfMovement = 'up';// up, down, left, right, upleft, upright, downleft, downright
		this.step = ZOMBIE_STEP;
		this.isStand = false;
				
		this.isStuck = false;
		this.perimeterMoveNearObstacles = ZOMBIE_WIDTH + BLOCK_WIDTH + 3;
		this.currentLongDetour = 0;
		this.directionTraversal = 'up';
		
		this.distanceAttacks = ZOMBIE_DISTANCE_ATTACK;
		
		this.indexGoalOfDestroying = getRandomInt(0, (arrayObjects.length - 1));
		
		this.health = HEALTH_ZOMBIE * levelOfComplexity;
		this.isDestroyed = false;
		
		this.isDamaged = false;
		this.lastDamage = Date.now();
		this.delayPictures = 500;
		
		this.isAttacking = false;
		this.rate = 1000;
		this.demage = 5 * levelOfComplexity;
		this.lastHit = Date.now();
		
		this.dTime = dTime;
		this.spriteRun = new CSprite(pic, [35, 0], [35, 50], 4, [0, 1, 2, 3], 'horizontal', false, [this.width, this.height]);
		this.spriteAttack = new CSprite(pic, [0, 450], [35, 50], 3, [0, 1, 2], 'horizontal', false, [this.width, this.height]);
	},

	setDemage: function(demage)
	{
		this.health -= demage;
		this.isDamaged = true;
		this.lastDamage = Date.now();
		
		if (this.health <= 0)
		{
			this.isDestroyed = true;
		}
	},
	
	draw: function()
	{
		var spritePosInHorizontal = 0;
		var heightOneImageOnSprite = 50;
		var indent = 0;
				
		switch (this.directionOfMovement) {
			case "down":
			{
				spritePosInHorizontal = 0;
				break;
			}
			
			case "downleft":
			{
				spritePosInHorizontal = 1;
				break;
			}
			
			case "left":
			{
				spritePosInHorizontal = 2;
				break;
			}
			
			case "upleft":
			{
				spritePosInHorizontal = 3;
				break;
			}
		
			
			case "downright":
			{
				spritePosInHorizontal = 4;
				break;
			}
			
			case "right":
			{
				spritePosInHorizontal = 5;
				break;
			}
			
			case "upright":
			{
				spritePosInHorizontal = 6;
				break;
			}
			
			case "up":
			{
				spritePosInHorizontal = 7;
				break;
			}
		}
		
		if (this.isDamaged && !this.isDestroyed)
		{
			this.ctx.drawImage(this.pic, 0, 400, 35, 50, this.x, this.y, this.width, this.height);
		}
		else if (!this.isStand && !this.isDestroyed && !this.isAttacking)
		{
			this.spriteRun.pos[1] = 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal;
			this.spriteRun.updateCoordinateObject(this.x, this.y);
			this.spriteRun.render(this.ctx);
			this.spriteRun.update(dTime);
		}
		else if (!this.isDestroyed && !this.isAttacking && this.isStand)
		{
			this.ctx.drawImage(this.pic, 0, 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal, 35, 50, this.x, this.y, this.width, this.height);
		}
		else if (!this.isDestroyed && this.isAttacking)
		{
			this.spriteAttack.pos[1] = 450 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal;
			this.spriteAttack.updateCoordinateObject(this.x, this.y);
			this.spriteAttack.render(this.ctx);
			this.spriteAttack.update(dTime);
		}
		else if (this.isDestroyed)
		{
			this.ctx.drawImage(this.pic, 175, 400, 35, 50, this.x, this.y, this.width, this.height);
		}
		
		if (Date.now() - this.lastDamage >= this.delayPictures)
		{
			this.isDamaged = false;
		}
	}
});
