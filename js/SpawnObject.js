CSpawnObject = CBaseBlock.extend({
	draw: function()
	{
		this.ctx.drawImage(this.pic, 0, 0, 64, 64, this.x, this.y, this.width, this.height);
	}
});

