class BulletType1Controller extends BulletController {
    constructor(position, direction) {
        super(position, direction, BulletType1Controller.SPRITE_NAME);
        this.sprite.body.velocity = this.sprite.body.velocity.setMagnitude(BulletType1Controller.BULLET_SPEED);
        this.sprite.damage = BulletType1Controller.DAMAGE;
    }
}

BulletType1Controller.SPRITE_NAME = 'BulletType1.png';
BulletType1Controller.BULLET_SPEED = 1500;
BulletType1Controller.DAMAGE = 1;
