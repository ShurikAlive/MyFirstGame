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
							if (player.isShootsAndRun)
							{
								player.isShootsAndRun = false;
							}
						
							if (!player.isDestroyed && !player.heShoots)
							{
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
							if (player.isShootsAndRun)
							{
								player.isShootsAndRun = false;
							}
						
							if (!player.isDestroyed && !player.heShoots)
							{
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
							if (player.isShootsAndRun)
							{
								player.isShootsAndRun = false;
							}
						
							if (!player.isDestroyed && !player.heShoots)
							{
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
							if (player.isShootsAndRun)
							{
								player.isShootsAndRun = false;
							}
						
							if (!player.isDestroyed && !player.heShoots)
							{
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
							if (player.isShootsAndRun)
							{
								player.isShootsAndRun = false;
							}
						
							if (!player.isDestroyed && !player.heShoots)
							{
								player.y += player.step;
								player.directionOfMovement = "down";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.y -= player.step;
								}
								
								player.spriteRun.update(dTime);
							}
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
							if (player.isShootsAndRun)
							{
								player.isShootsAndRun = false;
							}
							
							if (!player.isDestroyed && !player.heShoots)
							{
								player.y -= player.step;
								player.directionOfMovement = "up";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.y += player.step;
								}
								
								player.spriteRun.update(dTime);
							}
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
							if (player.isShootsAndRun)
							{
								player.isShootsAndRun = false;
							}
						
							if (!player.isDestroyed && !player.heShoots)
							{
								player.x += player.step;
								player.directionOfMovement = "right";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
								}
								
								player.spriteRun.update(dTime);
							}
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
							if (player.isShootsAndRun)
							{
								player.isShootsAndRun = false;
							}
						
							if (!player.isDestroyed && !player.heShoots)
							{
								player.x -= player.step;
								player.directionOfMovement = "left";
								player.isStand = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x += player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        'f',
                        {
							strict : true,
							event  : 'keydown'
                        },
                        function () {
							if (!player.isDestroyed && !player.clipIsEmpty() && !endGame && !player.isShootsAndRun)
							{
								player.heShoots = true;
								player.isStand = false;
							
								player.pressTrigger(resources.get('img/StandartBullet.png'));
							
								player.spriteShoot.update(dTime);
							}
							else
							{
								player.isStand = true;
								player.heShoots = false;
							}
                        }
                )
				
				.keyboard(
                        'f',
                        {
							event  : 'keyup'
                        },
                        function () {
							if (!player.isDestroyed)
							{
								player.heShoots = false;
								player.isStand = true;
							}
                        }
                )
				
				.keyboard(
                        'p',
                        {
                        },
                        function () {
							if (endGame && delayEndOfGame == 0)
							{
								_menu();
							}
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
							if (!player.isDestroyed)
							{
								player.isStand = true;
							}
                        }
                )
				
				.keyboard(
                        's f',
                        {
							strict : true,
							event  : 'keydown',
                            preventDefault : true
                        },
                        function () {
							if (player.heShoots)
							{
								player.heShoots = false;
							}
						
							if (!player.isDestroyed && !player.heShoots && !player.clipIsEmpty() && !endGame)
							{
								player.y += player.step;
								player.directionOfMovement = "down";
								player.isStand = false;
								player.isShootsAndRun = true;
								
								player.pressTrigger(resources.get('img/StandartBullet.png'));
								
								if (_playerHitSnag(map, player))
								{
									player.y -= player.step;
								}
								
								player.spriteShootAndRun.update(dTime);
							}
							else
							{
								player.y += player.step;
								player.directionOfMovement = "down";
								player.isStand = false;
								player.isShootsAndRun = false;
								
								if (_playerHitSnag(map, player))
								{
									player.y -= player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        'w f',
                        {
							strict : true,
							event  : 'keydown',
                            preventDefault : true
                        },
                        function () {
							if (player.heShoots)
							{
								player.heShoots = false;
							}
						
							if (!player.isDestroyed && !player.heShoots && !player.clipIsEmpty() && !endGame)
							{
								player.y -= player.step;
								player.directionOfMovement = "up";
								player.isStand = false;
								player.isShootsAndRun = true;
								
								player.pressTrigger(resources.get('img/StandartBullet.png'));
								
								if (_playerHitSnag(map, player))
								{
									player.y += player.step;
								}
								
								player.spriteShootAndRun.update(dTime);
							}
							else
							{
								player.y -= player.step;
								player.directionOfMovement = "up";
								player.isStand = false;
								player.isShootsAndRun = false;
								
								if (_playerHitSnag(map, player))
								{
									player.y += player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        'a f',
                        {
							strict : true,
							event  : 'keydown',
                            preventDefault : true
                        },
                        function () {
							if (player.heShoots)
							{
								player.heShoots = false;
							}
						
							if (!player.isDestroyed && !player.heShoots && !player.clipIsEmpty() && !endGame)
							{
								player.x -= player.step;
								player.directionOfMovement = "left";
								player.isStand = false;
								player.isShootsAndRun = true;
								
								player.pressTrigger(resources.get('img/StandartBullet.png'));
								
								if (_playerHitSnag(map, player))
								{
									player.x += player.step;
								}
								
								player.spriteShootAndRun.update(dTime);
							}
							else
							{
								player.x -= player.step;
								player.directionOfMovement = "left";
								player.isStand = false;
								player.isShootsAndRun = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x += player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        'd f',
                        {
							strict : true,
							event  : 'keydown',
                            preventDefault : true
                        },
                        function () {
							if (player.heShoots)
							{
								player.heShoots = false;
							}
						
							if (!player.isDestroyed && !player.heShoots && !player.clipIsEmpty() && !endGame)
							{
								player.x += player.step;
								player.directionOfMovement = "right";
								player.isStand = false;
								player.isShootsAndRun = true;
								
								player.pressTrigger(resources.get('img/StandartBullet.png'));
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
								}
								
								player.spriteShootAndRun.update(dTime);
							}
							else
							{
								player.x += player.step;
								player.directionOfMovement = "right";
								player.isStand = false;
								player.isShootsAndRun = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        's a f',
                        {
							strict : true,
							event  : 'keydown',
                            preventDefault : true
                        },
                        function () {
							if (player.heShoots)
							{
								player.heShoots = false;
							}
						
							if (!player.isDestroyed && !player.heShoots && !player.clipIsEmpty() && !endGame)
							{
								player.y += player.step;
								player.x -= player.step;
								player.directionOfMovement = "down-left";
								player.isStand = false;
								player.isShootsAndRun = true;
								
								player.pressTrigger(resources.get('img/StandartBullet.png'));
								
								if (_playerHitSnag(map, player))
								{
									player.y -= player.step;
									player.x += player.step;
								}
								
								player.spriteShootAndRun.update(dTime);
							}
							else
							{
								player.y += player.step;
								player.x -= player.step;
								player.directionOfMovement = "down-left";
								player.isStand = false;
								player.isShootsAndRun = false;
								
								if (_playerHitSnag(map, player))
								{
									player.y -= player.step;
									player.x += player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        'w a f',
                        {
							strict : true,
							event  : 'keydown',
                            preventDefault : true
                        },
                        function () {
							if (player.heShoots)
							{
								player.heShoots = false;
							}
						
							if (!player.isDestroyed && !player.heShoots && !player.clipIsEmpty() && !endGame)
							{
								player.y -= player.step;
								player.x -= player.step;
								player.directionOfMovement = "up-left";
								player.isStand = false;
								player.isShootsAndRun = true;
								
								player.pressTrigger(resources.get('img/StandartBullet.png'));
								
								if (_playerHitSnag(map, player))
								{
									player.y += player.step;
									player.x += player.step;
								}
								
								player.spriteShootAndRun.update(dTime);
							}
							else
							{
								player.y -= player.step;
								player.x -= player.step;
								player.directionOfMovement = "up-left";
								player.isStand = false;
								player.isShootsAndRun = false;
								
								if (_playerHitSnag(map, player))
								{
									player.y += player.step;
									player.x += player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        'w d f',
                        {
							strict : true,
							event  : 'keydown',
                            preventDefault : true
                        },
                        function () {
							if (player.heShoots)
							{
								player.heShoots = false;
							}
						
							if (!player.isDestroyed && !player.heShoots && !player.clipIsEmpty() && !endGame)
							{
								player.x += player.step;
								player.y -= player.step;
								player.directionOfMovement = "up-right";
								player.isStand = false;
								player.isShootsAndRun = true;
								
								player.pressTrigger(resources.get('img/StandartBullet.png'));
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
									player.y += player.step;
								}
								
								player.spriteShootAndRun.update(dTime);
							}
							else
							{
								player.y -= player.step;
								player.x += player.step;
								player.directionOfMovement = "up-right";
								player.isStand = false;
								player.isShootsAndRun = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
									player.y += player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        's d f',
                        {
							strict : true,
							event  : 'keydown',
                            preventDefault : true
                        },
                        function () {
							if (player.heShoots)
							{
								player.heShoots = false;
							}
						
							if (!player.isDestroyed && !player.heShoots && !player.clipIsEmpty() && !endGame)
							{
								player.x += player.step;
								player.y += player.step;
								player.directionOfMovement = "down-right";
								player.isStand = false;
								player.isShootsAndRun = true;
								
								player.pressTrigger(resources.get('img/StandartBullet.png'));
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
									player.y -= player.step;
								}
								
								player.spriteShootAndRun.update(dTime);
							}
							else
							{
								player.x += player.step;
								player.y += player.step;
								player.directionOfMovement = "down-right";
								player.isStand = false;
								player.isShootsAndRun = false;
								
								if (_playerHitSnag(map, player))
								{
									player.x -= player.step;
									player.y -= player.step;
								}
								
								player.spriteRun.update(dTime);
							}
                        }
                )
				
				.keyboard(
                        's a f, s d f, w a f, w d f, s f, w f, a f, d f',
                        {
							strict : true,
							event  : 'keyup',
                            preventDefault : true
                        },
                        function () {
							
							if (!player.isDestroyed)
							{
								player.isShootsAndRun = false;
								player.isStand = true;
							}
						}
                )
});