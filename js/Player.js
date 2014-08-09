CPlayer = Base.extend({
	constructor: function(ctx, pic, x, y) {
		this.ctx = ctx;
		this.pic = pic;
		this.x = x;
		this.y = y;
		this.width = PLAYER_WIDTH;
		this.height = PLAYER_HEIGHT;
		this.directionOfMovement = "up";// up, down, left, right, up-left, up-right, down-left, down-right
		this.step = PLAYER_STEP;
		this.isStand = true;
		
		this.arsenal = [new CStandartWeapon()];//Массив с оружием игрока
		this.currentWeapon = 0;//индекс оружия из массива, которое в данный момент спользует игрок
		this.heShoots = false;
		
		this.health = 100;
		this.isDestroyed = false;
		
		this.isDamaged = false;
		this.lastDamage = Date.now();
		this.delayPictures = 500;
				
		this.spriteRun = new CSprite(pic, [180, 0], [60, 60], 4, [0, 1, 2, 3], 'horizontal', false, [this.width, this.height]);
		this.spriteShoot = new CSprite(pic, [0, 0], [60, 60], 1, [1], 'horizontal', false, [this.width, this.height]);
	},

	setDemage: function(demage)
	{
		this.health -= demage;
		this.isDamaged = true;
		this.lastDamage = Date.now();
		
		if (this.health <= 0)
		{
			this.health = 0;
			this.isDestroyed = true;
		}
	},
	
	pressTrigger: function(pic)
	{
		this.arsenal[this.currentWeapon].makeAShot(this, pic);
	},
	
	update: function(map)
	{
		for (var weapon in this.arsenal)
		{
			this.arsenal[weapon].update(map);
		}
	},
	
	drawWeapons: function()
	{
		for (var weapon in this.arsenal)
		{
			this.arsenal[weapon].drawBullets(this.ctx);
		}
	},
	
	clipIsEmpty: function()
	{
		return (this.arsenal[this.currentWeapon].numberOfCartridges <= 0);
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
		
			
			case "up-left":
			{
				spritePosInHorizontal = 4;
				break;
			}
			
			case "up-right":
			{
				spritePosInHorizontal = 5;
				break;
			}
			
			case "down-left":
			{
				spritePosInHorizontal = 6;
				break;
			}
			
			case "down-right":
			{
				spritePosInHorizontal = 7;
				break;
			}
		}
		
		if (!this.heShoots && this.isDamaged && !this.isDestroyed)
		{
			this.ctx.drawImage(this.pic, 120, 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal, 60, 60, this.x, this.y, this.width, this.height);
		}
		else if (!this.isDestroyed && !this.isStand && !this.heShoots)
		{
			this.spriteRun.pos[1] = 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal;
			this.spriteRun.updateCoordinateObject(this.x, this.y);
			this.spriteRun.render(this.ctx);
		}
		else if (!this.isDestroyed && this.isStand)
		{
			this.ctx.drawImage(this.pic, 0, 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal, 60, 60, this.x, this.y, this.width, this.height);
		}
		else if (!this.isDestroyed && this.heShoots)
		{
			this.spriteShoot.pos[1] = 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal;
			this.spriteShoot.updateCoordinateObject(this.x, this.y);
			this.spriteShoot.render(this.ctx);
		}
		else if (this.isDestroyed)
		{
			this.ctx.drawImage(this.pic, 240, 480, 60, 60, this.x, this.y, this.width, this.height);
		}
		
		if (Date.now() - this.lastDamage >= this.delayPictures)
		{
			this.isDamaged = false;
		}
	}
});
