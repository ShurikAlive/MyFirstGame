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
		
		if (!this.isStand)
		{
			this.spriteRun.pos[1] = 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal;
			this.spriteRun.updateCoordinateObject(this.x, this.y);
			this.spriteRun.render(this.ctx);
		}
		else
		{
			this.ctx.drawImage(this.pic, 0, 0 + heightOneImageOnSprite * spritePosInHorizontal + indent * spritePosInHorizontal, 60, 60, this.x, this.y, this.width, this.height);
		}
	}
});
