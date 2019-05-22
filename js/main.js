// =============================================================================
// sprites
// =============================================================================

//
// hero sprite
//
function Hero(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'hero');
    this.anchor.set(0.5, 0.5);
    this.scale.set(1,1);
    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
}

// hero prototype
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function (direction) {
    const SPEED = 350;
    this.body.velocity.x = direction * SPEED;
        if (this.body.velocity.x < 0) {
        this.scale.x = -1;
    }
    else if (this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
};
Hero.prototype.jump = function () {
    const JUMP_SPEED = 600;
    let canJump = this.body.touching.down;

    if (canJump) {
        this.body.velocity.y = -JUMP_SPEED;
    }

    return canJump;
};
Hero.prototype.bounce = function () {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};
function Friend(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'friend');
    this.anchor.set(0.5, 0.5);
    this.scale.set(1,1);
    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.animations.add('friend_die', [1, 2, 3], 8);
    this.frame = 0;
}

// friend prototype
Friend.prototype = Object.create(Phaser.Sprite.prototype);
Friend.prototype.constructor = Friend;

Friend.prototype.move = function (direction) {
    const SPEED = 300;
    this.body.velocity.x = direction * SPEED;
        if (this.body.velocity.x < 0) {
        this.scale.x = -1;
    }
    else if (this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
};
Friend.prototype.jump = function () {
    const JUMP_SPEED = 725;
    let canJump = this.body.touching.down;

    if (canJump) {
        this.body.velocity.y = -JUMP_SPEED;
    }

    return canJump;
};
Friend.prototype.bounce = function () {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};
Friend.prototype.die = function () {
    this.body.enable = false;

  {
        this.kill();
    }
    
};
//Spider prototypes

function Spider(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'spider');

    // anchor
    this.anchor.set(0.5);
    // animation
    this.animations.add('crawl', [0, 1, 2], 8, true);
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    this.animations.play('crawl');

    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Spider.SPEED;
}

Spider.SPEED = 200;

// inherit from Phaser.Sprite
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.update = function () {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Spider.SPEED; // turn left
    }
    else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Spider.SPEED; // turn right
    }
};
Spider.prototype.die = function () {
    this.body.enable = false;

    this.animations.play('die').onComplete.addOnce(function () {
        this.kill();
    }, this);
    
};

class Jumper extends Phaser.Sprite {
constructor (game, x, y) {
    //Phaser.Sprite.call(this, game, x, y, 'jumper');
    super(game,x,y,'jumper');
    // anchor
    this.anchor.set(0.5);
    // animation
   // this.animations.add('crawl', [0, 1, 2], 8, true);
    //this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    //this.animations.play('crawl');

    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 0;
    
    
}
    update (){
            
    this.jump();
    }
    
    jump () {
    const JUMP_SPEED = 700;
    let canJump = this.body.touching.down;

    if (canJump) {
        this.body.velocity.y = -JUMP_SPEED;
        this.frame = 0;
    
    }
else{this.frame = 1;
    
    }
    return canJump;
        
}
die() {
    this.body.enable = false;

    
        this.kill();
    
}
}
class Greed extends Phaser.Sprite {
constructor (game, x, y) {
    //Phaser.Sprite.call(this, game, x, y, 'jumper');
    super(game,x,y,'greed');
    // anchor
    this.anchor.set(0.5);
    // animation
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    // physic properties
    //this.game.physics.enable(this);
    //this.body.collideWorldBounds = true;
    //this.body.velocity.x = 0;
    
    
}

    
}
class Camilia extends Phaser.Sprite {
constructor (game, x, y) {
    //Phaser.Sprite.call(this, game, x, y, 'jumper');
    super(game,x,y,'camilia');
    // anchor
    this.anchor.set(0.5);
    // animation
   // this.animations.add('crawl', [0, 1, 2], 8, true);
    //this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    //this.animations.play('crawl');

    // physic properties
    //this.game.physics.enable(this);
    //this.body.collideWorldBounds = true;
    //this.body.velocity.x = 0;
    
    
}

    
}


// =============================================================================
// game states
// =============================================================================

PlayState = {};

const LEVEL_COUNT = 4;

PlayState.init = function (data) {
    this.game.renderer.renderSession.roundPixels = true;

    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP,
        w: Phaser.KeyCode.W,
        d: Phaser.KeyCode.D,
        a: Phaser.KeyCode.A
    });
      this.coinPickupCount = 0;
     this.hasKey = false;
     this.level = (data.level || 0) % LEVEL_COUNT;
};



PlayState._spawnCoin = function (coin) {
    let sprite = this.coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);
        sprite.animations.add('rotate', [0, 1, 2, 1], 6, true);
    sprite.animations.play('rotate');
        this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
};

PlayState.preload = function () {
    this.game.load.json('level:0', 'data/level00.json');
    this.game.load.json('level:1', 'data/level01.json');
    this.game.load.json('level:2', 'data/level02.json');
    this.game.load.json('level:3', 'data/level03.json');
    this.game.load.image('background', 'images/background.png');
    this.game.load.image('background2', 'images/background2.png');
    this.game.load.image('background3', 'images/background3.png');
    this.game.load.image('backgroundR', 'images/backgroundR.png');
    this.game.load.image('ground', 'images/ground.png');
    this.game.load.image('grass:8x1', 'images/grass_8x1.png');
    this.game.load.image('grass:6x1', 'images/grass_6x1.png');
    this.game.load.image('shopcounter', 'images/shopcounter.png');
    this.game.load.image('grass:4x1', 'images/grass_4x1.png');
    this.game.load.image('grass:2x1', 'images/grass_2x1.png');
    this.game.load.image('grass:1x1', 'images/grass_1x1.png');
    this.game.load.image('grass:1x1.5', 'images/grass_1x1.5.png');
    this.game.load.image('spike', 'images/spike.png');
    this.game.load.image('spikespawn', 'images/spike_spawn.png');
    this.game.load.image('longwall', 'images/wall_8x6.png');
    this.game.load.image('redplatform', 'images/redplatform.png');
    this.game.load.image('blueplatform', 'images/blueplatform.png');
    this.game.load.image('hero', 'images/hero_stopped.png');
    this.game.load.spritesheet('friend', 'images/friend.png', 34 ,42);
    this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
    this.game.load.image('invisible-wall', 'images/invisible_wall.png');
    this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);
    this.game.load.spritesheet('jumper', 'images/jumper.png', 54, 64);
    this.game.load.spritesheet('greed', 'images/greed.png', 48, 84);
    this.game.load.spritesheet('camilia', 'images/camilia.png', 75, 75);
    this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
    this.game.load.image('icon:coin', 'images/coin_icon.png');
    this.game.load.image('font:numbers', 'images/numbers.png');
    this.game.load.spritesheet('door', 'images/door.png', 42, 66);
    this.game.load.image('key', 'images/key.png');
    this.game.load.spritesheet('icon:key', 'images/key_icon.png', 34, 30);
};

PlayState.create = function () {
    
    this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));
    this.keys.up.onDown.add(function () {
    this.hero.jump();
}, this);
        this.keys.w.onDown.add(function () {
    this.friend.jump();
}, this);
    this._createHud();
        this.sfx = {
        // ...
        stomp: this.game.add.audio('sfx:stomp')
    };
};

PlayState.update = function () {
    this._handleCollisions();
    this.spikes.forEach(spike => {spike.body.velocity.x = 0});
    this._handleInput();
    this.coinFont.text = `x${this.coinPickupCount}`;
    this.keyIcon.frame = this.hasKey ? 1 : 0;
};

PlayState._handleCollisions = function () {
    this.game.physics.arcade.collide(this.spiders, this.platforms, this._platformVsEnemy, null, this);
    this.game.physics.arcade.collide(this.jumpers, this.platforms, this._platformVsEnemy, null, this);
    this.game.physics.arcade.collide(this.hero, this.platforms, (hero, platform) => {console.log(platform.image);}, (hero, platform)=> !(platform.image == "blueplatform"), this);
    this.game.physics.arcade.collide(this.friend, this.platforms);
    this.game.physics.arcade.collide(this.greed, this.platforms);
    this.game.physics.arcade.collide(this.hero, this.friend);
    this.game.physics.arcade.collide(this.friend, this.greed);
    this.game.physics.arcade.collide(this.hero, this.greed);
    this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin,null, this);
    this.game.physics.arcade.overlap(this.friend, this.coins, this._onHeroVsCoin,null, this);
    this.game.physics.arcade.overlap(this.coins, this.platforms, this._platformVsCoin,null, this);
    this.game.physics.arcade.collide(this.spiders, this.platforms,this._onHeroVsEnemy, null, this);
    this.game.physics.arcade.collide(this.spiders, this.enemyWalls);
    this.game.physics.arcade.overlap(this.hero, this.spiders,this._onHeroVsEnemy, null, this);
    this.game.physics.arcade.overlap(this.friend, this.spiders,this._onFriendVsEnemy, null, this);
    this.game.physics.arcade.overlap(this.hero, this.jumpers,this._onHeroVsJumper, null, this);
    this.game.physics.arcade.overlap(this.friend, this.jumpers,this._onFriendVsJumper, null, this);
    this.game.physics.arcade.overlap(this.hero, this.greed,this._onHeroVsGreed, null, this);
    this.game.physics.arcade.overlap(this.friend, this.greed,this._onHeroVsGreed, null, this);
    this.game.physics.arcade.overlap(this.hero, this.key, this._onHeroVsKey, null, this)
    this.game.physics.arcade.overlap(this.friend, this.key, this._onHeroVsKey, null, this)
    this.game.physics.arcade.overlap(this.hero, this.door, this._onHeroVsDoor,function (hero, door) {return this.hasKey && hero.body.touching.down;}, this);
   
};

function filterPlatforms(hero, platform){
    return platform.image == ("blueplatform")
}

PlayState._handleInput = function () {
    if (this.keys.left.isDown) { // move hero left
        this.hero.move(-1);
    }
    else if (this.keys.right.isDown) { // move hero right
        this.hero.move(1);
    }
    else { // stop
        this.hero.move(0);
    }
        if (this.keys.a.isDown) { // move hero left
        this.friend.move(-1);
    }
    else if (this.keys.d.isDown) { // move hero right
        this.friend.move(1);
    }
    else { // stop
        this.friend.move(0);
    }
};
PlayState._loadLevel = function (data) {
    // create all the groups/layers that we need
    this.game.add.image(0, 0, data.background.image);
    this.bgDecoration = this.game.add.group();
    this.platforms = this.game.add.group();
    this.coins = this.game.add.group();
    this.spiders = this.game.add.group();
    this.jumpers = this.game.add.group();
    this.camilia = this.game.add.group();
    this.greed = this.game.add.group();
    this.enemyWalls = this.game.add.group();
    this.spikes = [];    // spawn all platforms
    data.platforms.forEach(this._spawnPlatform, this);
    // spawn hero and enemies
    this._spawnCharacters({hero: data.hero, friend: data.friend, spiders: data.spiders, jumpers: data.jumpers, camilia: data.camilia, greed: data.greed});
    data.coins.forEach(this._spawnCoin, this);
    this._spawnDoor(data.door.x, data.door.y);
    this._spawnKey(data.key.x, data.key.y);

    // enable gravity
    const GRAVITY = 1200;
    this.game.physics.arcade.gravity.y = GRAVITY;
};

PlayState._spawnPlatform = function (platform) {
    let sprite = this.platforms.create(
        platform.x, platform.y, platform.image);

    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
    sprite.body.immovable = true;
    if (platform.image == "grass:1x1.5"){
    sprite.body.immovable = false;
    }
        if (platform.image == "spike"){
            this.spikes.push(sprite)
    sprite.body.immovable = false;
    }
    //sprite.body.immovable = false;
    this._spawnEnemyWall(platform.x, platform.y, 'left');
    this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};


PlayState._onHeroVsCoin = function (hero, coin) {
    coin.kill();
    this.coinPickupCount++;
};
PlayState._platformVsCoin = function (coin, platform) {
    coin.kill();
    this.coinPickupCount++;
};
PlayState._spawnCharacters = function (data) {
    // spawn spiders
    data.spiders.forEach(function (spider) {
        let sprite = new Spider(this.game, spider.x, spider.y);
        this.spiders.add(sprite);
    }, this);
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.friend = new Friend(this.game, data.friend.x, data.friend.y);
    this.game.add.existing(this.hero);
    this.game.add.existing(this.friend);
    
     data.jumpers.forEach(function (jumper) {
        let sprite = new Jumper(this.game, jumper.x, jumper.y);
        this.jumpers.add(sprite);
    }, this);
         data.camilia.forEach(function (camilia) {
        let sprite = new Camilia(this.game, camilia.x, camilia.y);
        this.camilia.add(sprite);
    }, this);
             data.greed.forEach(function (greed) {
        let sprite = new Greed(this.game, greed.x, greed.y);
        this.greed.add(sprite);
    }, this);

};

PlayState._spawnEnemyWall = function (x, y, side) {
    let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
    // anchor and y displacement
    sprite.anchor.set(side === 'left' ? 1 : 0, 1);

    // physic properties
    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
};
PlayState._onHeroVsEnemy = function (hero, enemy) {
    if (hero.body.velocity.y > 0) { // kill enemies when hero is falling
        hero.bounce();
        
       
        enemy.die();

    }
    else { // game over -> restart the game
        this.sfx.stomp.play();
        this.game.state.restart(true, false, {level: this.level});
    }
};
PlayState._onFriendVsEnemy = function (friend, enemy) {
    if (friend.body.velocity.y > 0) { // kill enemies when hero is falling
        friend.bounce();
        
       
        enemy.die();

    }
    else { // game over -> restart the game
   
        friend.die();
        this.game.state.restart(true, false, {level: this.level});
    }
};
PlayState._onHeroVsJumper = function (hero, jumper) {

        this.game.state.restart(true, false, {level: this.level});
};
PlayState._onFriendVsJumper = function (friend, jumper) {

        friend.kill();
    this.game.state.restart(true, false, {level: this.level});
};
PlayState._onHeroVsGreed = function (hero, greed) {

        this.game.state.restart(true, false, {level: this.level});
};
PlayState._onHeroVsKey = function (hero, key) {
    key.kill();
    this.hasKey = true;
};
PlayState._onHeroVsDoor = function (hero, door) {
    fetch("/level",{
        method: 'POST',
        body: JSON.stringify({level:this.level + 1})
    })
        .then(data => console.log(data))
        .catch(error => console.error(error))
    this.game.state.restart(true, false, { level: this.level + 1 });
    
};
PlayState._platformVsEnemy = function (enemy, platform) {
    if (platform.body.velocity.x < 0 || platform.body.velocity.y < 0){
        
       
        enemy.die();

    }
};


PlayState._createHud = function () {
    console.log("What are you looking at?")
        this.keyIcon = this.game.make.image(0, 19, 'icon:key');
    this.keyIcon.anchor.set(0, 0.5);
        const NUMBERS_STR = '0123456789X ';
    this.coinFont = this.game.add.retroFont('font:numbers', 20, 26,
        NUMBERS_STR, 6);
   let coinIcon = this.game.make.image(this.keyIcon.width + 7, 0, 'icon:coin');
    let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width,
        coinIcon.height / 2, this.coinFont);
    coinScoreImg.anchor.set(0, 0.5);
    this.hud = this.game.add.group();
    this.hud.add(coinIcon);
    this.hud.position.set(10, 10);
    this.hud.add(coinScoreImg);
     this.hud.add(this.keyIcon);
};
PlayState._spawnDoor = function (x, y) {
    this.door = this.bgDecoration.create(x, y, 'door');
    this.door.anchor.setTo(0.5, 1);
    this.game.physics.enable(this.door);
    this.door.body.allowGravity = false;
        this.door.animations.add('rotate', [0, 1, 2], 10, true);
    this.door.animations.play('rotate');
};
PlayState._spawnKey = function (x, y) {
    this.key = this.bgDecoration.create(x, y, 'key');
    this.key.anchor.set(0.5, 0.5);
    this.game.physics.enable(this.key);
    this.key.body.allowGravity = false;
        this.key.y -= 3;
    this.game.add.tween(this.key)
        .to({y: this.key.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .loop()
        .start();
};
    // ...





// ============================================================================= 
// entry point
// =============================================================================

window.onload = function () {
    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    game.state.add('play', PlayState);
    game.state.start('play');
    game.state.start('play', true, false, {level: 0});
};






