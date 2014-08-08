CDefencObject = Base.extend({
	constructor: function(ctx, pic, destroyedPicture, x, y) {
		this.ctx = ctx;
		this.pic = pic;
		this.destroyedPicture = destroyedPicture;
		this.x = x;
		this.y = y;
		this.width = BLOCK_WIDTH;
		this.height = BLOCK_HEIGHT;
		
		this.health = 100;
		this.isDestroyed = false;
	},

	setDemage: function(demage)
	{
		this.health -= demage;
		
		if (this.health <= 0)
		{
			this.health = 0;
			this.isDestroyed = true;
		}
	},
	
	draw: function()
	{
		if (!this.isDestroyed)
		{
			this.ctx.drawImage(this.pic, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
		}
		else
		{
			this.ctx.drawImage(this.destroyedPicture, 0, 0, 13, 31, this.x + 25, this.y + 15, 13, 31);
		}
	}
});
