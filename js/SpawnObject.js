CSpawnObject = Base.extend({
	constructor: function(ctx, pic, x, y) {
		this.ctx = ctx;
		this.pic = pic;
		this.x = x;
		this.y = y;
		this.width = BLOCK_WIDTH;
		this.height = BLOCK_HEIGHT;
	},

	draw: function()
	{
		this.ctx.drawImage(this.pic, 0, 0, 64, 64, this.x, this.y, this.width, this.height);
	}
});

