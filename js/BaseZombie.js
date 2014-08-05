CZoneZombieAttack = Base.extend({
	constructor: function(x, y, height, width, attackRange)
	{
		this.x = x - attackRange;
		this.y = y - attackRange;
		this.height = height + attackRange;
		this.width = width + attackRange;
	}
});

CBaseZombie = Base.extend({
	constructor: function(ctx, pic, dTime, x, y, arrayObjects) {
		this.ctx = ctx;
		this.pic = pic;
		this.x = x;
		this.y = y;
		this.lastX = x;
		this.lastY = y;
		this.width = PLAYER_AND_ZOMBIE_WIDTH;
		this.height = PLAYER_AND_ZOMBIE_HEIGHT;
		this.directionOfMovement = 'up';// up, down, left, right, upleft, upright, downleft, downright
		this.step = ZOMBIE_STEP;
		this.isStand = false;
		
		this.isStuck = false;
		this.perimeterMoveNearObstacles = PLAYER_AND_ZOMBIE_WIDTH + BLOCK_WIDTH + 3;
		this.currentLongDetour = 0;
		this.directionTraversal = 'up';
		
		this.distanceAttacks = ZOMBIE_DISTANCE_ATTACK;
		
		this.indexGoalOfDestroying = getRandomInt(0, (arrayObjects.length - 1));
		
		this.dTime = dTime;
		this.spriteRun = new CSprite(pic, [180, 0], [60, 60], 4, [0, 1, 2, 3], 'horizontal', false, [this.width, this.height]);
	},

	draw: function()
	{
		var spritePosInHorizontal = 0;
		var heightOneImageOnSprite = 60;
		var indent = 0;
		
		switch (this.directionOfMovement) {
			case "up":
			{
				spritePosInHorizontal = 0;
				break;
			}
			
			case "down":
			{
				spritePosInHorizontal = 1;
				break;
			}
			
			case "left":
			{
				spritePosInHorizontal = 2;
				break;
			}
			
			case "right":
			{
				spritePosInHorizontal = 3;
				break;
			}
		
			
			case "upleft":
			{
				spritePosInHorizontal = 4;
				break;
			}
			
			case "upright":
			{
				spritePosInHorizontal = 5;
				break;
			}
			
			case "downleft":
			{
				spritePosInHorizontal = 6;
				break;
			}
			
			case "downright":
			{
				spritePosInHorizontal = 7;
				break;
			}
		}
		
		if (!this.isStand)
		{
			this.spriteRun.pos[1] = 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal;
			this.spriteRun.updateCoordinateObject(this.x, this.y);
			this.spriteRun.render(this.ctx);
			this.spriteRun.update(dTime);
		}
		else
		{
			this.ctx.drawImage(this.pic, 0, 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal, 60, 60, this.x, this.y, this.width, this.height);
		}
	}
});
