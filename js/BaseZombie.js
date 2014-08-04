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
	constructor: function(ctx, pic, x, y, arrayObjects) {
		this.ctx = ctx;
		this.pic = pic;
		this.x = x;
		this.y = y;
		this.lastX = x;
		this.lastY = y;
		this.width = PLAYER_AND_ZOMBIE_WIDTH;
		this.height = PLAYER_AND_ZOMBIE_HEIGHT;
		this.directionOfMovement = 'up';// up, down, left, right, up-left, up-right, down-left, down-right
		this.step = ZOMBIE_STEP;
		this.isStand = false;
		
		this.isStuck = false;
		this.perimeterMoveNearObstacles = PLAYER_AND_ZOMBIE_WIDTH + BLOCK_WIDTH + 3;
		this.currentLongDetour = 0;
		this.directionTraversal = 'up';
		
		this.distanceAttacks = ZOMBIE_DISTANCE_ATTACK;
		
		this.indexGoalOfDestroying = getRandomInt(0, (arrayObjects.length - 1));
		//this.spriteRun = new CSprite(pic, [180, 0], [60, 60], 4, [0, 1, 2, 3], 'horizontal', false, [this.width, this.height]);
	},

	draw: function()
	{
	
		this.ctx.drawImage(this.pic, 0, 0, 60, 60, this.x, this.y, this.width, this.height);
	}
});
