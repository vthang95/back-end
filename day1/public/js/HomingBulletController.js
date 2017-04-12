class HomingBulletController extends BulletController {
    constructor(position, direction, spriteName, physicsGroup, bulletSpeed) {
        super(position, direction, spriteName, physicsGroup, bulletSpeed);
        Nakama.homingBulletControllers.push(this);
        this.sprite.events.onKilled.add(this.remove, this);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.setDamage = 5;
        this.physicsGroup = physicsGroup;
        this.sprite.health = 5;
        this.BULLET_SPEED = bulletSpeed;
        this.minDistance = 10000;
    }

    remove() {
        Nakama.homingBulletControllers.splice(Nakama.homingBulletControllers.indexOf(this), 1);
    }

    follow() {
        let checkGroup = (group, doFollow) => {
            if (group === Nakama.playerBulletGroup) {
                doFollow(Nakama.allEnemies);
            }
            if (group === Nakama.enemyHomingBulletGroup) {
                doFollow(Nakama.players);
            }
        };

        let doFollow = groupArr => {
            for (let i = 0; i < groupArr.length; i++) {
                if (!groupArr[i].sprite.alive) continue;
                let distance = Nakama.game.physics.arcade.distanceBetween(this.sprite, groupArr[i].sprite);
                if (distance < this.minDistance) {
                    this.minDistance = distance;
                    this.target = groupArr[i].sprite;
                }
            }
        };

        checkGroup(this.physicsGroup, doFollow);
    }

    update() {
        if (!this.sprite.alive) return;
        this.follow();
        // let currentAngle = Nakama.game.math.radToDeg(
        //     Nakama.game.math.angleBetween(
        //         0,
        //         0,
        //         this.sprite.body.velocity.x,
        //         this.sprite.body.velocity.y
        //     )
        // );

        // let directionAngle = Nakama.game.math.radToDeg(
        //     Nakama.game.math.angleBetween(
        //         0,
        //         0,
        //         direction.x,
        //         direction.y
        //     )
        // )

        // let deltaAngle = directionAngle - currentAngle;
        // if (deltaAngle > 180) deltaAngle -= 360;
        // if (deltaAngle < 180) deltaAngle += 360;

        // let maxDelta = HomingBulletController.TURN_RATE * Nakama.game.time.physicsElapsed;
        // if (deltaAngle > maxDelta) deltaAngle = maxDelta;
        // if (deltaAngle < - maxDelta) deltaAngle = - maxDelta;

        // let newAngle = currentAngle + deltaAngle;
        // let newDirection = new Phaser.Point(
        //     Math.cos(Nakama.game.math.degToRad(newAngle)),
        //     Math.sin(Nakama.game.math.degToRad(newAngle))
        // );



        if (!this.target || !this.target.alive) return;

        this.sprite.body.velocity = Phaser.Point.subtract(this.target.position, this.sprite.position).setMagnitude(this.BULLET_SPEED);

        this.sprite.rotation = Nakama.game.physics.arcade.angleBetween(this.sprite, this.target) + Math.PI / 2;
    }

    render() {
        // Nakama.game.debug.spriteInfo(this.sprite.damage, 32, 100);
        // Nakama.game.debug.spriteInfo(this.target, 32, 100);
    }
}

HomingBulletController.TURN_RATE = 60