$(document).ready(function () {
        var $ta = $('textarea');
        var log = function (msg) {
                $ta.val($ta.val() + ' ' + msg + '\n');
                return this;
        };

        $ta
		$
                .keyboard(
                        'w a',
						{
							strict : false,
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
                        'w d',
						{
							strict : false,
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
                        's d',
						{
							strict : false,
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
                        's a',
						{
							strict : false,
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
							strict : true,
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
							strict : true,
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
                        {		
							strict : true,
							event  : 'keydown',
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
							strict : true,
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
                        'w a, w d, s d, s a, s, w, d, a',
                        {
							strict : true,
							event  : 'keyup',
                            preventDefault : true
                        },
                        function () {
								player.isStand = true;
                        }
                )
});