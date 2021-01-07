enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(1)
        music.powerUp.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("Au!", invincibilityPeriod)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
function giveIntroduction () {
    game.setDialogFrame(img`
        . 7 f 7 7 7 7 7 7 7 7 7 7 f 7 . 
        7 f 7 f 1 1 1 1 1 1 1 1 f 7 f 7 
        7 1 f 7 7 7 7 7 7 7 7 7 7 f 1 7 
        7 f 7 f 1 1 1 1 1 1 1 1 f 7 f 7 
        7 1 f 1 1 1 1 1 1 1 1 1 1 f 1 7 
        7 f 7 f 1 1 1 1 1 1 1 1 f 7 f 7 
        7 1 f 1 1 1 1 1 1 1 1 1 1 f 1 7 
        7 f 7 f 1 1 1 1 1 1 1 1 f 7 f 7 
        7 1 f 1 1 1 1 1 1 1 1 1 1 f 1 7 
        7 f 7 f 1 1 1 1 1 1 1 1 f 7 f 7 
        7 1 f 1 1 1 1 1 1 1 1 1 1 f 1 7 
        7 f 7 f 1 1 1 1 1 1 1 1 f 7 f 7 
        7 1 f 7 7 7 7 7 7 7 7 7 7 f 1 7 
        7 f 7 f 1 1 1 1 1 1 1 1 f 7 f 7 
        . 7 f 7 7 7 7 7 7 7 7 7 7 f 7 . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 7 7 7 7 f f . . . . 
        . . . . f 7 7 7 7 7 7 f . . . . 
        . . . f 7 7 7 1 1 7 7 7 f . . . 
        . . . f 7 7 1 7 7 1 7 7 f . . . 
        . . . f 7 7 1 1 1 1 7 7 f . . . 
        . . . f 7 7 1 7 7 1 7 7 f . . . 
        . . . . f 7 7 7 7 7 7 f . . . . 
        . . . . f f 7 7 7 7 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Miután Hősünk Átvágott A Halálfejes-Úton Egy Dzsungelben Találta Magát.")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . . . f 5 f 5 5 5 f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.baDing.play()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d f f f d d f f f e e d f . 
        . f f f 9 f f f f 9 f f f f f . 
        . f d f 9 f d d f 9 f d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f f f f f f f f f f f f f . . 
        . f d d f f f f f f d d d f . . 
        . f d f f f f f f f f d d f . . 
        . . f f f f 5 f 5 f f f f f . . 
        . . . f f f f f f f f f f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e f f f d d f f f d f . 
        . f f f f f 9 f f f f 9 f f f . 
        . f e d d f 9 f d d f 9 f d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f f f f f f f f f f f f f . 
        . . f d d d f f f f f f d d f . 
        . . f d d f f f f f f f f d f . 
        . . f f f f f 5 f 5 f f f f . . 
        . . . f f f f f f f f f f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . f f f . . f f f . . . . 
        `)
}
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    }
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c b b b b b b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b c b b b c b b b b f . . . . 
        f b 1 f f f 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . f f f . . . . . . . . . . . 
        f f f c c . . . . . . . . f f f 
        f f c c . . c c . . . f c b b c 
        f f c 3 c c 3 c c f f b b b c . 
        f f b 3 b c 3 b c f b b c c c . 
        . c b b b b b b c f b c b c c . 
        . c b b b b b b c b b c b b c . 
        c b 1 b b b 1 b b b c c c b c . 
        c b b b b b b b b c c c c c . . 
        f b c b b b c b b b b f c . . . 
        f b 1 f f f 1 b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . c c . . c c . . . . . . . . 
        . . c 3 c c 3 c c c . . . . . . 
        . c b 3 b c 3 b c c c . . . . . 
        . c b b b b b b b b f f . . . . 
        c c b b b b b b b b f f . . . . 
        c b 1 b b b 1 b b c f f f . . . 
        c b b b b b b b b f f f f . . . 
        f b c b b b c b c c b b b . . . 
        f b 1 f f f 1 b f c c c c . . . 
        . f b b b b b b f b b c c . . . 
        c c f b b b b b c c b b c . . . 
        c c c f f f f f f c c b b c . . 
        . c c c . . . . . . c c c c c . 
        . . c c c . . . . . . . c c c c 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . f f f . . . . . . . . . . . 
        f f f c c . . . . . . . . f f f 
        f f c c . . c c . . . f c b b c 
        f f c 3 c c 3 c c f f b b b c . 
        f f b 3 b c 3 b c f b b c c c . 
        . c b b b b b b c f b c b c c . 
        . c b b b b b b c b b c b b c . 
        c b 1 b b b 1 b b b c c c b c . 
        c b b b b b b b b c c c c c . . 
        f b c b b b c b b b b f c . . . 
        f b 1 f f f 1 b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c b b b b b b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b c b b b c b b b b f . . . . 
        f b 1 f f f 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d f f f e d d e e f . . . . 
        . f f f 9 f f f f e e f . . . . 
        . f d f 9 f d d f e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f f f f f f f f f f . . . . 
        . . f f f d d d f f f f . . . . 
        . . f f f f d d f f f f . . . . 
        . . f f 5 f f f f f f f . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d f f f e d d e e f . . . . 
        . f f f 9 f f f f e e f . . . . 
        . f d f 9 f d d f e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f f f f f f f f f f . . . . 
        . . f f f f f d d f f f . . . . 
        . . f f f f d d d f f f f . . . 
        . . f f 5 f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . . f f f . f f f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d f f f e d d e e f . . . . 
        . f f f 9 f f f f e e f . . . . 
        . f d f 9 f d d f e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f f f f f f f f f f . . . . 
        . . f f f d d d f f f f . . . . 
        . . f f f f d d f f f f . . . . 
        . . f f 5 f f f f f f f . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d f f f e d d e e f . . . . 
        . f f f 9 f f f f e e f . . . . 
        . f d f 9 f d d f e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f f f f f f f f f f . . . . 
        . f d d d f f f f f f f . . . . 
        f f f d d f f f f f f f . . . . 
        f f 5 f f f f f f f f f . . . . 
        . f f f f f f f f f f . . . . . 
        . f f f f . f f f . . . . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e f f f d f . 
        . . . . f e e f f f f 9 f f f . 
        . . . . f e e f d d f 9 f d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f f d d d f f f . . 
        . . . . f f f f d d f f f f . . 
        . . . . f f f f f f f 5 f f . . 
        . . . . . f f f f f f f f . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e f f f d f . 
        . . . . f e e f f f f 9 f f f . 
        . . . . f e e f d d f 9 f d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f d d f f f f f . . 
        . . . f f f f d d d f f f f . . 
        . . f f f f f f f f f 5 f f . . 
        . . f f f f f f f f f f f . . . 
        . . . f f f f . . f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e f f f d f . 
        . . . . f e e f f f f 9 f f f . 
        . . . . f e e f d d f 9 f d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f f d d d f f f . . 
        . . . . f f f f d d f f f f . . 
        . . . . f f f f f f f 5 f f . . 
        . . . . . f f f f f f f f . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e f f f d f . 
        . . . . f e e f f f f 9 f f f . 
        . . . . f e e f d d f 9 f d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f f f f f d d d f . 
        . . . . f f f f f f f d d f f f 
        . . . . f f f f f f f f f 5 f f 
        . . . . . f f f f f f f f f f . 
        . . . . . . . f f f . f f f . . 
        `)
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f f e e e e e e e e e e e f . 
        f d f f f f d d f f f e e d f . 
        f d d f 9 f f f f 9 f f f f f . 
        f f f f 9 f d d f 9 f d d e f . 
        f f f d f d d d d f d d d f . . 
        f f f d d d d d d d d d d f . . 
        f f f f f f f f f f f f f f . . 
        f f f f f f f f f f d d d f . . 
        . f f f f f f f f f f d d f . . 
        . . f f f f 5 f 5 f f f f f . . 
        . . . f f f f f f f f f f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f f e e e e e e e e e e e f . 
        f d f f f f d d f f f e e d f . 
        f d d f 9 f f f f 9 f f f f f . 
        f f f f 9 f d d f 9 f d d e f . 
        f f f d f d d d d f d d d f . . 
        f f f d d d d d d d d d d f . . 
        f f f f f f f f f f f f f f . . 
        f f f f f f f f f f d d d f . . 
        . f f f f f f f f f f d d f . . 
        . . f f f f 5 f 5 f f f f f . . 
        . . . f f f f f f f f f f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . f e e e e e e e e e e f . . 
            . f f e e e e e e e e e e e f . 
            f d f f f f d d f f f e e d f . 
            f d d f 9 f f f f 9 f f f f f . 
            f f f f 9 f d d f 9 f d d e f . 
            f f f d f d d d d f d d d f . . 
            f f f d d d d d d d d d d f . . 
            f f f f f f f f f f f f f f . . 
            f f f f f f f f f f d d d f . . 
            . f f f f f f f f f f d d f . . 
            . . f f f f 5 f 5 f f f f f . . 
            . . . f f f f f f f f f f . . . 
            . . . f f f f f f f f f f . . . 
            . . . . f f f . . f f f . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e f f f d d f f f f d f 
        . f f f f f 9 f f f f 9 f d d f 
        . f e d d f 9 f d d f 9 f f f f 
        . . f d d d f d d d d f d f f f 
        . . f d d d d d d d d d d f f f 
        . . f f f f f f f f f f f f f f 
        . . f d d d f f f f f f f f f f 
        . . f d d f f f f f f f f f f . 
        . . f f f f f 5 f 5 f f f f . . 
        . . . f f f f f f f f f f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e f f f d d f f f f d f 
        . f f f f f 9 f f f f 9 f d d f 
        . f e d d f 9 f d d f 9 f f f f 
        . . f d d d f d d d d f d f f f 
        . . f d d d d d d d d d d f f f 
        . . f f f f f f f f f f f f f f 
        . . f d d d f f f f f f f f f f 
        . . f d d f f f f f f f f f f . 
        . . f f f f f 5 f 5 f f f f . . 
        . . . f f f f f f f f f f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . f e e e e e e e e e e f . . 
            . f e e e e e e e e e e e e f . 
            . f d e e f f f d d f f f f d f 
            . f f f f f 9 f f f f 9 f d d f 
            . f e d d f 9 f d d f 9 f f f f 
            . . f d d d f d d d d f d f f f 
            . . f d d d d d d d d d d f f f 
            . . f f f f f f f f f f f f f f 
            . . f d d d f f f f f f f f f f 
            . . f d d f f f f f f f f f f . 
            . . f f f f f 5 f 5 f f f f . . 
            . . . f f f f f f f f f f . . . 
            . . . f f f f f f f f f f . . . 
            . . . . f f f . . f f f . . . . 
            `)
    }
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d f f f d d f f f e e d f . 
        . f f f 9 f f f f 9 f f f f f . 
        . f d f 9 f d d f 9 f d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f f f f f f f f f f f f f . . 
        . f d f f f f f f f f f d d f . 
        f d d f f f 5 f 5 f f f d d f . 
        . f f f f f f f f f f f f f . . 
        . . . f f f f . f f f f f . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e f f f d d f f f d f . 
        . f f f f f 9 f f f f 9 f f f . 
        . f e d d f 9 f d d f 9 f d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f f f f f f f f f f f f f . 
        . f d d f f f f f f f f f d f . 
        . f d d f f f 5 f 5 f f f d d f 
        . . f f f f f f f f f f f f f . 
        . . . f f f f f . f f f f . . . 
        `)
}
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Ow!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(myTiles.tile4)) {
        bumper = sprites.create(img`
            . . . . c c c c c c . . . . . . 
            . . . c 6 7 7 7 7 6 c . . . . . 
            . . c 7 7 7 7 7 7 7 7 c . . . . 
            . c 6 7 7 7 7 7 7 7 7 6 c . . . 
            . c 7 c 6 6 6 6 c 7 7 7 c . . . 
            . f 7 6 f 6 6 f 6 7 7 7 f . . . 
            . f 7 7 7 7 7 7 7 7 7 7 f . . . 
            . . f 7 7 7 7 6 c 7 7 6 f c . . 
            . . . f c c c c 7 7 6 f 7 7 c . 
            . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
            . c 7 7 2 7 7 c f c 6 7 7 6 c c 
            c 1 1 1 1 7 6 f c c 6 6 6 c . . 
            f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
            f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
            . f 6 1 1 1 1 1 1 6 6 6 f . . . 
            . . c c c c c c c c c f . . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, myTiles.tile0)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(myTiles.tile7)) {
        flier = sprites.create(img`
            . . f f f . . . . . . . . f f f 
            . f f c c . . . . . . f c b b c 
            f f c c . . . . . . f c b b c . 
            f c f c . . . . . . f b c c c . 
            f f f c c . c c . f c b b c c . 
            f f c 3 c c 3 c c f b c b b c . 
            f f b 3 b c 3 b c f b c c b c . 
            . c b b b b b b c b b c c c . . 
            . c 1 b b b 1 b b c c c c . . . 
            c b b b b b b b b b c c . . . . 
            c b c b b b c b b b b f . . . . 
            f b 1 f f f 1 b b b b f c . . . 
            f b b b b b b b b b b f c c . . 
            . f b b b b b b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, myTiles.tile0)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 80
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
function initializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(myTiles.tile6)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, myTiles.tile0)
    createEnemies()
    spawnGoals()
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile1, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("Következő Szint...")
        setLevelTileMap(currentLevel)
    } else {
        game.over(true, effects.confetti)
    }
})
function hasNextLevel () {
    return currentLevel != levelCount
}
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(myTiles.tile5)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value7, myTiles.tile0)
    }
}
let heroFacingLeft = false
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let flier: Sprite = null
let bumper: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation: animation.Animation = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . f f f f f f f f f f . . . 
    . . f e e e e e e e e e e f . . 
    . f e e e e e e e e e e e e f . 
    . f d e e f f f d d f f f d f . 
    . f f f f f 9 f f f f 9 f f f . 
    . f e d d f 9 f d d f 9 f d f . 
    . . f d d d f d d d d f d d f . 
    . . f d d d d d d d d d d d f . 
    . . f f f f f f f f f f f f f . 
    . . f d d d f f f f f f d d f . 
    . . f d d f f f f f f f f d f . 
    . . f f f f f 5 f 5 f f f f . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . f f f . . f f f . . . . 
    `, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundImage(img`
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888822222222228888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888882222222222222888888888882222228888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888822222222222222888888822222222222288888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888882222222222222222288888222222222222288888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888822222444444444422228882222444444222228888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888244444555552222242228822224222222444422888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888442555222255522224422222442222222222244222888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888455444444442255222242224222222222222222422228888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888454222222224422555244442222225555555522242222888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888882454222222222242222552222225555244222555524422288888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888882454228222222244222252222255222422222222452442228888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888882454288822222222422225225522222422888888825554222888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888882454288888222222244222555222224228888888882425422288888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888882454288888822222224422252222242228888888888244554288888888888888888888888888888888888888888888888
    88888888888888888888888888888888888fff88888888888888888888888882454288888888882222242222224422288888888888222425588888888888888888888888888888888888888888888888
    888888888888888888888888888888888ff111ff888888888888888888888882454288888888888822244222242222288888888888822242528888888888888888888888888888888888888888888888
    8888888888888888888888888888888ff1111111ff8888888888888888888882454288888888888888224422422222288888888888882242522888888888888888888888888888888888888888888888
    88888888888888888888888888888ff11111111111ff88888888888888888882424288888888888888882422422222888888888888882224422888888888888888888888888888888888888888888888
    888888888888888888888888888ff111111111111111ff888888888888888882444288888888888888888422422222888888888888888224422888888888888888888888888888888888888888888888
    88888888888888888888888ffff1111111111111111111ff8888888888888882222888888888888888888242422228888888888888888822222888888888888888888888888888888888888888888888
    888888888888888888888df1111111111111111111111111fffff88888888882222888888888888888888844222228888888888888888822228888888888888888888888888888888888888888888888
    888888888888888888ffff1111111111111111111111111111111f8888888882222888888888888888888844222288888888888888888888228888888888888888888888888888888888888888888888
    8888888888888888ff111111111111111111111111111111111111ff88888888888888888888888888888824222288888888888888888888888888888888888888888888888888888888888888888888
    88888888888888ff1111111111111111111111111111111111111111f8888888888888888888888888888824222288888888888888888888888888888888888888888888888888888888888888888888
    888888888888ff1111111111111111111111111111111111111111111f888888888888888888888888888824222888888888888888888888888888888888888888888888888888888888888888888888
    88888888888f111111111111111111111111111111111111111111111f888888888888888888888888888824222888888888888888888888888888888888888888888888888888888888888888888888
    8888888888f91111111111111111111111111111111111111111111111f88888888888888888888888888224228888888888888888888888888888888888888888888fffffffff888888888888888888
    888888888f111111111111111111111111111111111111111111111111f88888888888888888888888888224228888888888888888888888888888888888888888fff111111111ffd888888888888888
    888888888fdddd111111111111111111111111111111111111111111111f88888888888888888888888ff2242288888888888888888888888888888888888888ff11111111111111ffd8888888888888
    88888888fddddddddddd1111111111111111111111111111111111111111ff888888888888888888ffffd2244288888888888888888888888888888888888888f11111111111111111fd888888888888
    8888888fddddddddddddddddddddddd111111111111111111111111111111f8888888888888888fff9ddd22442ffffffff88888888888888888888888888888f1111111111111111111f888888888888
    888888fdddddddddddddddddddddddddddddddddddddddddddddddddddddddf888888888888ffff9ddddd2244ddddddd9ff8888888888888888888888888888f1111111111111111111ff88888888888
    88888dfddddddddddddddddddddddddddddddddddddddddddddddddddddddddf8888888888ffddddddddd2244dddddddddf8888888888888888888888888888f111111111111111111111f8888888888
    888dffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddf88888888ffdddddddddd2244ddddddddddfff888888888888888888888888f11111111111111111111111f888888888
    88dfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddf8888888fddddddddddd2424dddddddddddddf88888888888888888888888f111111111111111111111111fffdd8888
    8dfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfff888ffdddddddd22224242dddddddddddddff88888888888888888888df11111111111111111111111111fdddd88
    dfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddff8ffddddddddd244242442dddddddddddddfff888888888888888888f1111111111111111111111111111ffffdd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffddddddddd22442442442ddddddddddddfdff8888888888888888f111111111111111111111111111111111ff
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffddddddddd244424424442dddddddddddfdddffd88888888888ff111111111111111111111111111111111111
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdfddddddddd244524424442dddddddddddfdddddff888888ffff11111111111111111111111111111111111111
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddfddddddddd245522225442dddddddddddfddddddffd888ff11111111111111111111111111111111111111111
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddfddddddddd245524225442ddddddddddfddddddddffffff111111111111111111111111111111111111111111
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddfddddddddd245552555442ddddddddddfddddddddf11111111111111111111111111111111111111111111111
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddfddddddddd244555554442ddddddddddfdddddddddf1111111111111111111111111111111111111111111111
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddfddddddddd244455544442dddddddddfddddddddddf1111111111111111111111111111111111111111111111
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddfdddddddddd24444444442dddddddddfddddddddddff1dddd1111111111111111111111111111111111111111
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddfddddddddddd2444444442ddddddddfddddddddddddfddddddd111111111111111111111ddddd111111111111
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddfdddddddddddd222222222dddddddfdddddddddddddfdddddddddd1111111111111111dddddddd11111111111
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddfddddddddddddddddddddddddddfddddddddddddddfdddddddddddddddddddddddddddddddddddd1111111dd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddfdddddddddddddddddddddddddfdddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddfddddddddddddddddddddddddfdddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddfdddddddddddddddddddddffddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddfffdddddddddddddddddfdddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddffddddddddddddddfddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddffddddddddddffdddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddfffdddddffddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddfffffddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddd
    dddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddd
    dddffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddd
    ddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddddd
    ddddddffddddddddddddddddddddddddddddddddddddddddddddddddfddddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddd
    dddfffdddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddfdddddddddddddddddfdddddddfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddfddddddddddddddddddddddd
    ddddddddddddddddddddddddfdddddddddddddddfdddddddddddddddddfddddddfddddddddddfdddddddddddddddddddddddddddddddddddddddddddddddfdddddddddddfddddddddddddddddddddddd
    ddddddddddddddddddddddddfddddddddddddddddfdddddddddddddddddfdddddfddddddddddfddddddddddddddddddddddddddddddddddddddddddddddddfddddfdddddfddddddddddddddddddddddd
    dddddddddddddddddddddddddfddddddddddddddddfdddddddddddddddddfdddfdddddddddddfddddddddddddddddddddddddddddddddddddddddddddddddfddddfdddddfddddddddddddddddddddddd
    ddddddddddddddddddddddddddfddddddddddddddddfddddddddddddddddfddfddddddddddddfdddddddddddddddddddfdddddddddddddddddddddddddddddfdddfdddddfddddddddddddddddddddddd
    ddddddddddddddddddfdddddddfddddddddddddddddfdddddddddddddddddfdfddddddddddddfdddddddddddddddddddfdddddddddddddddddddddddddddddfdddfdddddfddddddddddfdddddddddddd
    ddddddddddfdddddddfddddddddfddddddddddddddddfdddddddddddddddddffdddddddddddfddddddddddddddddddddfddddddddddddddddddddddddddddddfddfdddddfddddddddddfdddfdddddddd
    dddddddddfddddddddfdddddddddfddddddddddddddddfddddddddddddddddffdddddddddddfddddddfdddddddddddddfddddddddddddddfdddddddddfddddddffddddddfddddddddddfdddfdddddddd
    ddddddddfdddddddddfddddddddddfddddddddddddddddfdddddddddddddddfdfddddddddddfddddddfdddddddddddddfddddddddddddddfdddddddddfddddddffddddddfddddddddddfdddfdddddddd
    dddddddfddddddddddfdddddddddddfddddddddddddddddfddddddddddddddfddffdddddddffddddddfdddddddddddddfddddddddddddddfdddddddddfddddddffddddddfddddfdddddfdddfddddddfd
    ddddddfdddddddddddfddddddddddddffdddddddddddddddfdddddddddddddfddddfddddddddddddddfdddddddddddddfdddddddfddddddfdddddddddfddddddffddddddfddddfdddddfdddfddddddfd
    dddddfdddddddddddddfdddddddddddddfddddddddddddddddddddddddddddfdddddfdddddddddddddfdddddddddddddfdddddddfddddddfdddddddddfddddddffddddddfddddfdddddfdddfddddddfd
    ddddfddddddddddddddfddddddddddddddfdddddddddddddddddddddddddddfdddddfdddddddddddddfdddddddddddddfdddddddfddddddfdddddddddfdddddfddfdddddfddddfdddddfdddfddddddfd
    dddfdddddddddddddddfdddddddddddddddffdddddddddddddddddddddddddfddddddfdddddddddddddfddddddddddddfdddddddfddddddfdddddddddfdddddddddfddddfddddfdddddfdddfddddddfd
    ddfddddddddddddddddfdddddddddddddddddfddddddddddddddddddddddddfdddddddddddddddddddddddddddddddddfdddddddfddddddfdddddddddfdddddddddfddddfddddfdddddfdddfddddddfd
    dfdddddddddddddddddfddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddddddddddddfdddddddfdddddddfddddddddfdddddddddfddddfdddfddddddfdddfddddddfd
    ddddddddddddddddddddfddddddddddddddddddffdddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddfdddddddfddddddddfddddddddddfdddfddddddddddddddddddddddf
    dddddddddddddddddddddddddddddddddddddddddfddddddddddddddddddddfdddddddddddddddddddddddddddddddddddddddddfdddddddfddddddddfddddddddddfddfdddddddddddddddddddddddd
    `)
initializeAnimations()
createPlayer(hero)
levelCount = 8
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.CrouchLeft)
        } else {
            animation.setAction(hero, ActionKind.CrouchRight)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.RunningLeft)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.RunningRight)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.IdleLeft)
        } else {
            animation.setAction(hero, ActionKind.IdleRight)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Flying)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Idle)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
