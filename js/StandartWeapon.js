CStandartWeapon = CBaseWeapon.extend({
	constructor: function() 
	{
		this.name = "StandartWeapon";
		this.numberOfCartridges = 150;
		this.lastFire = Date.now();
		this.rate = 500;//время в мс между выстрелами(вылетами патронов)
		this.bulletsOnTheMap = [];
	},

	makeAShot: function(player, pic)
	{
		if (this.numberOfCartridges > 0 && (Date.now() - this.lastFire >= this.rate))
		{
			this.numberOfCartridges--;
			this.bulletsOnTheMap.push(new CStandartBullet(player, pic));//Добавляем созданную пулю в массив пулю в массив
			this.lastFire = Date.now();
		}
	},
	
	_cleaningFacedBullets: function()
	{
		var bullets = [];
		
		for (var bullet in this.bulletsOnTheMap)
		{
			if (!this.bulletsOnTheMap[bullet].bulletHitTheObject())
			{
				bullets.push(this.bulletsOnTheMap[bullet]);
			}
		}
		
		this.bulletsOnTheMap = bullets;
	},
	
	update: function(map)
	{
		for (var bullet in this.bulletsOnTheMap)
		{
			this.bulletsOnTheMap[bullet].updateState(map);
		}
		
		this._cleaningFacedBullets();
	},
	
	drawBullets: function(ctx)
	{
		for (var bullet in this.bulletsOnTheMap)
		{
			this.bulletsOnTheMap[bullet].draw(ctx);
		}
	}
});