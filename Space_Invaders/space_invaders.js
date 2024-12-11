function restartGame(screen){
    app.stage.removeChild(screen)
    martiansMatrix = Array(4).fill().map(() => Array(11).fill(null));
    app.stage.addChild(martiansContainer);
    martiansContainer.x = 50;
    martiansContainer.y = 65;
    lastColR = 10;
    lastColL = 0;
    firsRow = 4;
    martiansAlive = 44;
    score = 0;
    finishedGame = false;
    scoreText;
    hitsInaRow = 0;
    app.stage.eventMode = 'static'
    setMartians()
    hearts = Array(3).fill(null);
    writeScore()
    lifes = 3
    writeHearts()
    martiansDirection = 0
    martiansMovement()
    shieldSprites = Array(4).fill(null)
    shields = [0,0,0,0]
    setShields()
}

function finishGame(){
    finishedGame = true;
    app.stage.eventMode = 'passive'
    hudContainer.removeChild(scoreText)
    for (var i = 0; i <4; ++i){
        app.stage.removeChild(shieldSprites[i])
    }
    app.stage.removeChild(martiansContainer)
    for (var i = 0; i <4; ++i){
        for (var j = 0; j < 11; ++j){
            martiansContainer.removeChild(martiansMatrix[i][j])
        }
    }
    for (var i = 0; i < 3; ++i){
        hudContainer.removeChild(hearts[i])
    }
}

function victory(){
    finishGame()
    var gameOverScreen = new PIXI.Graphics()
    .rect(0,0,app.canvas.width, app.canvas.height)
    .fill('black')
    app.stage.addChild(gameOverScreen);
    gameOverScreen.alpha = 0.0;
    const style = new PIXI.TextStyle({
        fontFamily: 'Retro Gaming',
        fontSize: 48,
        fill: 'white',
        fontWeight: 'bold',
        stroke: { color: 'green', width: 5, join: 'round' },
        dropShadow: {
            color: '#000000',
            blur: 4,
            angle: Math.PI / 6,
            distance: 6,
        },
        wordWrap: true,
        wordWrapWidth: 440,
    });
    var gameOverText = new PIXI.Text({
        text: 'VICTORY',
        style,
    });
    gameOverText.x = app.canvas.width/2 - gameOverText.width/2;
    gameOverText.y = app.canvas.height/2 - gameOverText.height/2-25;

    var yourScoreText = new PIXI.Text('Your score: ' + score, scoreStyle);
    yourScoreText.x = app.canvas.width/2 - yourScoreText.width/2;
    yourScoreText.y = app.canvas.height/2 - yourScoreText.height/2+25;

    gameOverScreen.addChild(gameOverText);
    gameOverScreen.addChild(yourScoreText);

    var replayBtn = new PIXI.Graphics()
    .rect(app.canvas.width/2-100,app.canvas.height/2+75,200, 50)
    .fill('green')

    gameOverScreen.addChild(replayBtn)
    
    var replayText = new PIXI.Text('Replay', {
        fontFamily: 'Retro Gaming',
        fontSize: 24,
        fill: 'white',
        align: 'center',
    });
    replayText.anchor.set(0.5); // Centrar el texto dentro del botón
    replayText.x = app.canvas.width/2; // Centrado en el botón (mitad de 200px)
    replayText.y = app.canvas.height/2+100; // Centrado en el botón (mitad de 50px)
    replayBtn.addChild(replayText);
    var step = -1/240
    const GOTicker = (delta) => {
        if (gameOverScreen.alpha < 1.0){
            gameOverScreen.alpha += 1/120
        }
        else {
            replayBtn.alpha += step;
            if (replayBtn.alpha <= 0.4) step = 1/240
            else if (replayBtn.alpha >= 1.0) step = -1/240
        }
    };
    app.ticker.add(GOTicker);
    replayBtn.eventMode = 'static'
    replayBtn.on('click', (event) => {
        replayBtn.alpha = 1.0
        app.ticker.remove(GOTicker)
        restartGame(gameOverScreen)
    }) 
}

function gameOver(){
    finishGame()
    var gameOverScreen = new PIXI.Graphics()
    .rect(0,0,app.canvas.width, app.canvas.height)
    .fill('black')
    app.stage.addChild(gameOverScreen);
    gameOverScreen.alpha = 0.0;
    const style = new PIXI.TextStyle({
        fontFamily: 'Retro Gaming',
        fontSize: 48,
        fill: 'white',
        fontWeight: 'bold',
        stroke: { color: 'red', width: 5, join: 'round' },
        dropShadow: {
            color: '#000000',
            blur: 4,
            angle: Math.PI / 6,
            distance: 6,
        },
        wordWrap: true,
        wordWrapWidth: 440,
    });
    var gameOverText = new PIXI.Text({
        text: 'GAME OVER',
        style,
    });
    gameOverText.x = app.canvas.width/2 - gameOverText.width/2;
    gameOverText.y = app.canvas.height/2 - gameOverText.height/2-25;

    var yourScoreText = new PIXI.Text('Your score: ' + score, scoreStyle);
    yourScoreText.x = app.canvas.width/2 - yourScoreText.width/2;
    yourScoreText.y = app.canvas.height/2 - yourScoreText.height/2+25;

    gameOverScreen.addChild(gameOverText);
    gameOverScreen.addChild(yourScoreText);

    var replayBtn = new PIXI.Graphics()
    .rect(app.canvas.width/2-100,app.canvas.height/2+75,200, 50)
    .fill('green')

    gameOverScreen.addChild(replayBtn)
    
    var replayText = new PIXI.Text('Replay', {
        fontFamily: 'Retro Gaming',
        fontSize: 24,
        fill: 'white',
        align: 'center',
    });
    replayText.anchor.set(0.5); // Centrar el texto dentro del botón
    replayText.x = app.canvas.width/2; // Centrado en el botón (mitad de 200px)
    replayText.y = app.canvas.height/2+100; // Centrado en el botón (mitad de 50px)
    replayBtn.addChild(replayText);
    var step = -1/240
    const GOTicker = (delta) => {
        if (gameOverScreen.alpha < 1.0){
            gameOverScreen.alpha += 1/120
        }
        else {
            replayBtn.alpha += step;
            if (replayBtn.alpha <= 0.4) step = 1/240
            else if (replayBtn.alpha >= 1.0) step = -1/240
        }
    };
    app.ticker.add(GOTicker);
    replayBtn.eventMode = 'static'
    replayBtn.on('click', (event) => {
        replayBtn.alpha = 1.0
        app.ticker.remove(GOTicker)
        restartGame(gameOverScreen)
    }) 
}

function writeHearts(){
    for (var i = 0; i < 3; ++i){
        var heart = PIXI.Sprite.from('heart.png');
        heart.y = 10; heart.x = app.canvas.width - heart.width - i*heart.width - 20;
        hudContainer.addChild(heart)
        hearts[i] = heart
    }
}

function writeScore(){
    scoreText = new PIXI.Text('Score: ' + score, scoreStyle);
    scoreText.x = 20;
    scoreText.y = 10;
    hudContainer.addChild(scoreText);
}

function getCol(x){
    var col = -1;
    for (var i = 0; i < 11 && col == -1; ++i){
        if (x >= i*70+martiansContainer.x && x <= i*70+martiansContainer.x+52){
            col = i;
        }
    }
    return col;
}

function getRow(y){
    var row = -1;
    for (var i = 0; i < 4 && row == -1; ++i){
        if (y >= martiansContainer.y+i*60 && y <= martiansContainer.y+i*60+41){
            row = i;
        }
    }
    return row;
}

function bulletCollision(x,y){
    if (x >= martiansContainer.x+5 && x <= (martiansContainer.x+martiansContainer.width-5)){
        var col = getCol(x);
        var row = getRow(y);
        if (col > -1 && row > -1){
            if (martiansMatrix[row][col] != 0){
                martiansMatrix[row][col].alpha = 0.0;
                martiansMatrix[row][col] = 0;
                hitsInaRow += 1
                score += 100 * hitsInaRow;
                scoreText.text = 'Score: ' + score
                martiansAlive -= 1
                if (col == lastColR && martiansMatrix[0][col] == 0 && martiansMatrix[1][col] == 0 && martiansMatrix[2][col] == 0 && martiansMatrix[3][col] == 0){
                    lastColR -= 1
                } else if (col == lastColL && martiansMatrix[0][col] == 0 && martiansMatrix[1][col] == 0 && martiansMatrix[2][col] == 0 && martiansMatrix[3][col] == 0){
                    lastColL += 1
                }
                else if (row == firsRow-1){
                    var rowEliminated = true;
                    for (var i=0;i<11 && rowEliminated;++i){
                        rowEliminated=martiansMatrix[row][i]==0
                    }
                    if (rowEliminated) firsRow -= 1
                }
                if (martiansAlive == 0) victory()
                return true;
            }
        }
    } else return false;
}

function shieldCollision(x,y){
    var collision = false;
    for (var i=0; i <4 && !colission; ++i){
        if (x >= i*110 + i*60 + 125+8 && x<= i*110 + i*60 + 125 + 96) {
            if (y >= 474 && y <= 474+64 && shields[i] < 10) {
                colission = true;
                shields[i] += 1;
                if (shields[i] == 10){
                    shieldSprites[i].alpha = 0.0;
                } else {
                    shieldSprites[i].gotoAndStop(shields[i])
                }
            }
        }
    }
    return collision
}

function setShields(){
    for (var i = 0; i < 4; ++i){
        const anim = new PIXI.AnimatedSprite(shieldsheet.animations.shield);
        anim.animationSpeed = 0.1666/2;
        anim.x = i*110 + i*60 + 125;
        anim.y = 450;
        app.stage.addChild(anim);
        shieldSprites[i] = anim;
    }

}

function playerCollision(x,y){
    if (y >= ship.y){
        if (x >= ship.x && x <= ship.x+ship.width){
            lifes -= 1;
            if (lifes >= 0){
                hearts[lifes].alpha = 0.25;
                if (lifes == 0) gameOver()
                    return true;
            } 
        }
    }
}

async function martianBullet(obj) {
    var elapsed = 0.0;
    const updateBullet = (delta) => {
        //kills = bulletCollision(obj.x, obj.y)
        if (obj.y < app.canvas.height && !shieldCollision(obj.x, obj.y) && !playerCollision(obj.x, obj.y)) {
            elapsed += delta; 
            obj.y += 5;
        } else {
            app.stage.removeChild(obj);
            obj.destroy();
            app.ticker.remove(updateBullet); 
        }
    };
    
    app.ticker.add(updateBullet);
}

function martianShoot() {
    if (!finishedGame){
        var col = getCol(ship.x)
        if (col == -1) col = Math.floor(Math.random() * 11)
        var i = 3;
        while ( i >= 0 && martiansMatrix[i][col] == 0) i -= 1
        if (i >= 0){
          let b = new PIXI.Graphics()
            .rect(0, 0, 4, 10)
            .fill('green');
          app.stage.addChild(b);
          b.x = martiansMatrix[i][col].x + martiansMatrix[i][col].width/2 + martiansContainer.x
          b.y = martiansMatrix[i][col].y+10+martiansContainer.y
          martianBullet(b)
        }
        setTimeout(martianShoot, 1000);
    }
}

function setMartians(){
    for (var i = 0; i < 4; ++i){
        for (var j = 0; j < 11; ++j){
            var martian = PIXI.Sprite.from('martian.png');
            martiansContainer.addChild(martian)
            martian.y = i*60; martian.x = j*70;
            martiansMatrix[i][j] = martian
        }
    }
    martianShoot()
}

function martiansMovement(){
    var order = [1, 3, 2, 3]
    var elapsed = 0;
    var point = 0;
    const martiansMove = (ticker) =>{
        if (!finishedGame){
            if (martiansContainer.y + (martiansContainer.height/4 * firsRow) <= 450){
                if (order[martiansDirection] == 1 && (martiansContainer.x + (martiansContainer.width - (10-lastColR)*70) >= (app.canvas.width - 5))){ martiansDirection += 1; point = martiansContainer.y+30;}
                if (order[martiansDirection] == 3 && martiansContainer.y >= point) martiansDirection = (martiansDirection + 1)%4
                if (order[martiansDirection] == 2 && (martiansContainer.x+lastColL*70 <= 4)){ martiansDirection += 1; point = martiansContainer.y+30;}
            } else {
                if (order[martiansDirection] == 1 && (martiansContainer.x + (martiansContainer.width - (10-lastColR)*70) >= (app.canvas.width - 5))){ martiansDirection += 1;}
                if (order[martiansDirection] == 3) martiansDirection = (martiansDirection + 1)%4
                if (order[martiansDirection] == 2 && (martiansContainer.x+lastColL*70 <= 4)){ martiansDirection += 1;}
            }
            if (order[martiansDirection] == 1){
                martiansContainer.x += 0.1;
            } else if (order[martiansDirection] == 3){
                martiansContainer.y += 0.1;
            } else {
                martiansContainer.x -= 0.1;
            }
        } else {
            app.ticker.remove(martiansMove)
        }

    };

    martiansMove.deltaTime = 5;
    app.ticker.add(martiansMove)
}

async function bullet(obj) {
    var kills = false;
    const updateBullet = (delta) => {
        kills = bulletCollision(obj.x, obj.y)
        if (obj.y > 0 && !kills && !shieldCollision(obj.x, obj.y)) {
            obj.y -= 5;
        } else {
            if (!kills) hitsInaRow = 0;
            app.stage.removeChild(obj);
            obj.destroy();
            app.ticker.remove(updateBullet); 
        }
    };
    
    app.ticker.add(updateBullet);
}
function loadShip() {
    app.stage.addChild(ship);

    //Dimensionar i col·locar nau
    ship.y = app.canvas.height - 64; ship.x = app.canvas.width/2 - ship.height/2;

    //Moviment nau
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.addEventListener('mousemove', (e) =>
    {
        ship.x =  e.global.x - ship.height/2;
    });

    //Disparar
    var canShoot = true;

    app.stage.on('mousedown', (event) => { 
        if (canShoot){
          let b = new PIXI.Graphics()
            .rect(0, 0, 2, 10)
            .fill('white');
          app.stage.addChild(b);
          b.x = ship.x + ship.width/2-1
          b.y = ship.y-10
          canShoot = false;
          bullet(b)
          setTimeout(() => {
            canShoot = true;
          }, 100);
        }
      });

}

const app = new PIXI.Application();
await app.init({ width: 860, height: 620,background: 'black' });
document.body.appendChild(app.canvas);
await PIXI.Assets.load('ship.png');
var ship = PIXI.Sprite.from('ship.png');
loadShip()
var martiansMatrix = Array(4).fill().map(() => Array(11).fill(null));
let martiansContainer = new PIXI.Graphics()
    .rect(0, 0, app.canvas.width-100, 240)
    .fill('transparent');
app.stage.addChild(martiansContainer);
martiansContainer.x = 50;
martiansContainer.y = 65;
var lastColR = 10;
var lastColL = 0;
var firsRow = 4;
var martiansAlive = 44;
var score = 0;
var finishedGame = false;
var scoreText;
var hitsInaRow = 0;
await PIXI.Assets.load('martian.png');
await PIXI.Assets.load({
    src: 'Retro Gaming.ttf',
    name: 'Retro Gaming'
});
setMartians()
await PIXI.Assets.load('heart.png');
var hearts = Array(3).fill(null);
var hudContainer = new PIXI.Graphics()
    .rect(0,0,app.canvas.width, 60)
    .fill('#230023')
app.stage.addChild(hudContainer);
const scoreStyle = new PIXI.TextStyle({
    fontFamily: 'Retro Gaming',
    fontSize: 24,
    fill: 'white',
    fontWeight: 'bold',
    stroke: { color: '#4168d9', width: 5, join: 'round' },
    dropShadow: {
        color: '#000000',
        blur: 4,
        angle: Math.PI / 6,
        distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 440,
});
writeScore()
var lifes = 3
writeHearts()
var martiansDirection = 0
martiansMovement()
const atlasData = {
    frames: {
        shield1: {
            frame: { x: 0, y:0, w:106, h:98 },
            sourceSize: { w: 106, h: 98 },
            spriteSourceSize: { x: 0, y: 0, w: 106, h: 98 }
        },
        shield2: {
            frame: { x: 106, y:0, w:106, h:98 },
            sourceSize: { w: 106, h: 98 },
            spriteSourceSize: { x: 0, y: 0, w: 106, h: 98 }
        },
        shield3: {
            frame: { x: 212, y:0, w:106, h:98 },
            sourceSize: { w: 106, h: 98 },
            spriteSourceSize: { x: 0, y: 0, w: 106, h: 98 }
        },
        shield4: {
            frame: { x: 318, y:0, w:106, h:98 },
            sourceSize: { w: 106, h: 98 },
            spriteSourceSize: { x: 0, y: 0, w: 106, h: 98 }
        },
        shield5: {
            frame: { x: 424, y:0, w:106, h:98 },
            sourceSize: { w: 106, h: 98 },
            spriteSourceSize: { x: 0, y: 0, w: 106, h: 98 }
        },
    },
    meta: {
        image: 'shield.png',
        format: 'RGBA8888',
        size: { w: 530, h: 98 },
        scale: 1
    },
    animations: {
        shield: ['shield1', 'shield1','shield2', 'shield2', 'shield3', 'shield3', 'shield4', 'shield4', 'shield5' , 'shield5'], 
    }
}
await PIXI.Assets.load('shield.png');
const shieldsheet = new PIXI.Spritesheet(
    PIXI.Texture.from(atlasData.meta.image),
    atlasData
);

// Generate all the Textures asynchronously
await shieldsheet.parse();
var shieldSprites = Array(4).fill(null)
var shields = [0,0,0,0]
setShields()


