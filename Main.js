function init()
{
	var map = new CMap(example, ctx, resources);
	map.init();
	map.draw();
}

function main()
{
	example = document.getElementById("page");
	ctx = example.getContext('2d');
	
	resources.load([
    'img/tex_trava.bmp',
    'img/Spawn.bmp',
	'img/Box.bmp',
	'img/Stone.bmp',
	'img/DefObj.bmp'
	]);
	
	resources.onReady(init);
}