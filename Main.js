RATIO_IMAGE_SIZE = 2;
BLOCK_WIDTH = 32 * RATIO_IMAGE_SIZE;
BLOCK_HEIGHT = 32 * RATIO_IMAGE_SIZE;

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
	
	example.width *= RATIO_IMAGE_SIZE;
	example.height *= RATIO_IMAGE_SIZE;
	
	resources.load([
    'img/tex_trava.bmp',
    'img/Spawn.bmp',
	'img/Box.bmp',
	'img/Stone.bmp',
	'img/DefObj.bmp'
	]);
	
	resources.onReady(init);
}