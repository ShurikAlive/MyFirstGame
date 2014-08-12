CButton = Base.extend({
	constructor: function(ctx, pic, message, x, y, width, height) 
	{
		this.ctx = ctx;
		this.pic = pic;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.message = message;
	},
	
	draw: function()
	{
		this.ctx.drawImage(this.pic, 0, 0, 626, 262, this.x, this.y, this.width, this.height);
		
		this.ctx.font = 'bold ' + 15 * RATIO_IMAGE_SIZE +'px courier';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'top';
		this.ctx.fillStyle = '#000000';
		
		this.ctx.fillText(this.message, this.x + (this.width / 2), this.y +(this.height / 2) - (15 * RATIO_IMAGE_SIZE / 2));
	},
	
	hitButton: function(x, y)
	{
		if (((this.x <= x) && (this.x + this.width >= x)) && ((this.y <= y) && (this.y + this.height >= y)))
		{
			return true;
		}
		
		return false;
	}
	
});
