window.onload = () => {
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    }
    resize();

    function v2(x, y) {
        return {
            x: x,
            y: y
        };
    }

    const gravity = 0.7;

    class Sprite {
        constructor(position, velocity, color = 'red') {
            this.position = position;
            this.velocity = velocity;
            this.width = 50;
            this.height = 100;
            this.lastKey;
            this.attackBox = {
                position: this.position,
                width: 100,
                height: 50,
            }
            this.color = color;
            this.isAttacking;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

            ctx.fillStyle = 'green';
            ctx.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }

        update() {
            this.draw();

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            if(this.position.y + this.height + this.velocity.y >= canvas.height) {
                this.velocity.y = 0;
            }else {
                this.velocity.y += gravity;
            }
        }

        attack() {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 100);
        }
    }

    let player = new Sprite(
        v2(0, 0),
        v2(0, 10),
        color = 'red'
    )

    let enemy = new Sprite(
        v2(400, 100),
        v2(0, 10),
        color = 'blue'
    )

    function KeyBind() {
        return {
            pressed: false
        };
    }

    let keyBinds = {
        up: KeyBind(),
        down: KeyBind(),
        left: KeyBind(),
        right: KeyBind(),
        a: KeyBind(),
        d: KeyBind(),
        w: KeyBind(),
        s: KeyBind()
    };

    let keyCodes = {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        a: 'KeyA',
        d: 'KeyD',
        w: 'KeyW',
        s: 'KeyS'
    };

    function onKeyDown(event) {
        switch(event.code) {
            case keyCodes.up:
                keyBinds.up.pressed = true;
                // player.lastKey = keyCodes.up;
                player.velocity.y -= 10;
                break;
            case keyCodes.down:
                keyBinds.down.pressed = true;
                player.lastKey = keyCodes.down;
                break;
            case keyCodes.left:
                keyBinds.left.pressed = true;
                player.lastKey = keyCodes.left;
                break;
            case keyCodes.right:
                keyBinds.right.pressed = true;
                player.lastKey = keyCodes.right;
                break;
            case keyCodes.a:
                keyBinds.a.pressed = true;
                enemy.lastKey = keyCodes.a;
                break;
            case keyCodes.w:
                keyBinds.w.pressed = true;
                // enemy.lastKey = keyCodes.w;
                enemy.velocity.y -= 10;
                break;
            case keyCodes.s:
                keyBinds.s.pressed = true;
                enemy.lastKey = keyCodes.s;
                break;
            case keyCodes.d:
                keyBinds.d.pressed = true;
                enemy.lastKey = keyCodes.d;
                break;
            default:
                console.log(event);
                break;
        }
    }
    window.addEventListener('keydown', onKeyDown, false);

    function onKeyUp(event) {
        switch(event.code) {
            case keyCodes.up:
                keyBinds.up.pressed = false;
                break;
            case keyCodes.down:
                keyBinds.down.pressed = false;
                break;
            case keyCodes.left:
                keyBinds.left.pressed = false;
                break;
            case keyCodes.right:
                keyBinds.right.pressed = false;
                break;
            case keyCodes.a:
                keyBinds.a.pressed = false;
                break;
            case keyCodes.w:
                keyBinds.w.pressed = false;
                break;
            case keyCodes.s:
                keyBinds.s.pressed = false;
                break;
            case keyCodes.d:
                keyBinds.d.pressed = false;
                break;
            default:
                console.log(event);
                break;
        }
    }
    window.addEventListener('keyup', onKeyUp, false);

    function rectangularCollision(rectangle1, rectangle2) {
        return (
            rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
            rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
            rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        );
    }

    function animate() {
        window.requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        player.update();
        enemy.update();

        // player movement
        if(keyBinds.left.pressed && player.lastKey == keyCodes.left) {
            player.velocity.x = -5;
        }else if(keyBinds.right.pressed && player.lastKey == keyCodes.right) {
            player.velocity.x = 5;
        }else {
            player.velocity.x = 0;
        }

        // enemy movement
        if(keyBinds.a.pressed && enemy.lastKey == keyCodes.a) {
            enemy.velocity.x = -5;
        }else if(keyBinds.d.pressed && enemy.lastKey == keyCodes.d) {
            enemy.velocity.x = 5;
        }else {
            enemy.velocity.x = 0;
        }

        // detect for collision
        if(rectangularCollision()) {
            console.log('player attacked enemy!!');
        }
    }
    animate();
}