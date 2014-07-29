$(document).ready(function () {
        var $ta = $('textarea');
        var log = function (msg) {
                $ta.val($ta.val() + ' ' + msg + '\n');
                return this;
        };

        $ta
		$
                .keyboard(
                        'w+a, a+w',
						{
								event  : 'keydown',
                                preventDefault : true
                        },
                        function () {
                                player.x -= player.step;
								player.y -= player.step;
								player.directionOfMovement = "up-left";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x += player.step;
									player.y += player.step;
								}
								
								player.spriteRun.update(dTime);
                        }
                )
				
				.keyboard(
                        'w+d, d+w',
						{
								event  : 'keydown',
                                preventDefault : true
                        },
                        function () {
                                player.x += player.step;
								player.y -= player.step;
								player.directionOfMovement = "up-right";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
									player.y += player.step;
								}
								
								player.spriteRun.update(dTime);
                        }
                )
				
				.keyboard(
                        's+d, d+s',
						{
								event  : 'keydown',
                                preventDefault : true
                        },
                        function () {
                                player.x += player.step;
								player.y += player.step;
								player.directionOfMovement = "down-right";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
									player.y -= player.step;
								}
								
								player.spriteRun.update(dTime);
                        }
                )
				
				.keyboard(
                        's+a, a+s',
						{
								event  : 'keydown',
                                preventDefault : true
                        },
                        function () {
                                player.x -= player.step;
								player.y += player.step;
								player.directionOfMovement = "down-left";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x += player.step;
									player.y -= player.step;
								}
								
								player.spriteRun.update(dTime);
                        }
                )
		//$	
				.keyboard(
                        's',
                        {
								event  : 'keydown',
                                preventDefault : true
                        },
                        function () {
								player.y += player.step;
								player.directionOfMovement = "down";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.y -= player.step;
								}
								
								player.spriteRun.update(dTime);
                        }
                )
				
				.keyboard(
                        'w',
                        {
								event  : 'keydown',
                                preventDefault : true
                        },
                        function () {
								player.y -= player.step;
								player.directionOfMovement = "up";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.y += player.step;
								}
								
								player.spriteRun.update(dTime);
                        }
                )
				
				.keyboard(
                        'd',
                        {		event  : 'keydown',
                                preventDefault : true
                        },
                        function () {
								player.x += player.step;
								player.directionOfMovement = "right";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
								}
								
								player.spriteRun.update(dTime);
                        }
                )
				
				.keyboard(
                        'a',
                        {
								event  : 'keydown',
                                preventDefault : true
                        },
                        function () {
								player.x -= player.step;
								player.directionOfMovement = "left";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x += player.step;
								}
								
								player.spriteRun.update(dTime);
                        }
                )
				
				.keyboard(
                        'w+a, a+w, w+d, d+w, s+d, d+s, s+a, a+s, s, w, d, a',
                        {
								event  : 'keyup',
                                preventDefault : true
                        },
                        function () {
								player.isStand = true;
                        }
                )
});