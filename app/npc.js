window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function Dkbo(option) {
    this.id = option.id || "";
    this.NPCNum = option.NPCNum || 1;
    this.element = document.getElementById(this.id);
    this.element.width = option.width || 400;
    this.element.height = option.height || 200;
    this.canvas = this.element.getContext('2d');
    this.state = option.state || true;
    this.img = new Image();
    this.NPC = [];
    for (var i = 0; i < this.NPCNum; i++) {
        this.NPC.push(this.NPCSet(i));
    }
    if(this.state) {
       window.requestAnimationFrame(this.walk.bind(this));
    }
}
Dkbo.prototype = {
    NPCSet: function(id) {
      var pX = Math.floor(Math.random() * 10000 % (this.element.width - 32));
      pX = pX >= 0 ? pX : 0;
      var pY = Math.floor(Math.random() * 10000 % (this.element.height - 48));
      pY = pY >= 0 ? pY : 0;
      var NPC = {
            id: id,
        imgSrc: "http://dkbo.github.io/images/man.png", // NPC Sprites URL
            pX: pX, // X Pos
            pY: pY, // y pos
            aX: 0, // x Area
            aY: 0, // y Area
            aW: this.element.width, //isMove Width Area
            aH: this.element.height, //isMove Height Area
            mX: 0, // x Max
            mY: 0, // y Max
            x: 0, // x Move
            y: 0, // y Move
            w: 32, // NPC Width
            h: 48, // NPC Height
            d: 0, // NPC Down Sprites Pos
            l: 1, // NPC Up Sprites Pos
            r: 2, // NPC Right Sprites Pos
            u: 3, // NPC Left Sprites Pos
            t: 0, // NPC Turn
            s: 0, // NPC Stop
            f: 0, // NPC animate   ##DONT CHANGE
            footSpeed: 8, // NPC Sprites Animate Speed
            isR: false, // Is Move Right
            isU: false, // Is Move Up
            isD: false, // Is Move Down
            isL: false // Is Move Left
      };
      return NPC;
    },
    draw: function(i, turn) {
        var n = this.NPC[i];
        this.canvas.drawImage(this.img, Math.floor(this.NPC[i].f / n.footSpeed) % 4 * 32, n.h * turn, n.w, n.h, n.pX, n.pY, n.w, n.h);
        if ((n.s > 0 && turn == 0 && n.y < n.mY) || (n.s > 0 && turn == 1 && n.x > 0) || (n.s > 0 && turn == 2 && n.x < n.mX) || (n.s > 0 && turn == 3 && n.y > 0)) {
            this.NPC[i].f++;
            this.process(i);
        } else {
            this.NPC[i].s--;
            this.NPC[i].f = 0;
        }
    },
    process: function(i) {
        switch (this.NPC[i].t) {
            case 0:
                this.NPC[i].y--;
                this.NPC[i].pY--;
                break;
            case 1:
                this.NPC[i].x++;
                this.NPC[i].pX++;
                break;
            case 2:
                this.NPC[i].y++;
                this.NPC[i].pY++;
                break;
            case 3:
                this.NPC[i].x--;
                this.NPC[i].pX--;
                break;
            case 4:
                this.NPC[i].y--;
                this.NPC[i].pY--;
                this.NPC[i].x--;
                this.NPC[i].pX--;
                break;
            case 5:
                this.NPC[i].y--;
                this.NPC[i].pY--;
                this.NPC[i].x++;
                this.NPC[i].pX++;
                break;
            case 6:
                this.NPC[i].y++;
                this.NPC[i].pY++;
                this.NPC[i].x--;
                this.NPC[i].pX--;
                break;
            case 7:
                this.NPC[i].y++;
                this.NPC[i].pY++;
                this.NPC[i].x++;
                this.NPC[i].pX++;
                break;

        }
    },
    random: function(i) {
        var r = Math.floor(Math.random() * 10000 % 8);
        var rw = Math.floor(Math.random() * 101) + 10;
        this.NPC[i].s = 1
        switch (r) {
            case 0:
                this.NPC[i].isU = true;
                this.NPC[i].y = rw;
                this.NPC[i].t = 0;
                this.draw(i, this.NPC[i].u);
                break;
            case 1:
                this.NPC[i].isR = true;
                this.NPC[i].mX = rw;
                this.NPC[i].x = 0;
                this.NPC[i].t = 1;
                this.draw(i, this.NPC[i].r);
                break;
            case 2:
                this.NPC[i].isD = true;
                this.NPC[i].mY = rw;
                this.NPC[i].y = 0;
                this.NPC[i].t = 2;
                this.draw(i, this.NPC[i].d);
                break;
            case 3:
                this.NPC[i].isL = true;
                this.NPC[i].x = rw;
                this.NPC[i].t = 3;
                this.draw(i, this.NPC[i].l);
                break;
            case 4:
                this.NPC[i].isU = true;
                this.NPC[i].isL = true;
                this.NPC[i].y = rw;
                this.NPC[i].x = rw;
                this.NPC[i].t = 4;
                this.draw(i, this.NPC[i].l);
                break;
            case 5:
                this.NPC[i].isU = true;
                this.NPC[i].isR = true;
                this.NPC[i].y = rw;
                this.NPC[i].mX = rw;
                this.NPC[i].x = 0;
                this.NPC[i].t = 5;
                this.draw(i, this.NPC[i].r);
                break;
            case 6:
                this.NPC[i].isD = true;
                this.NPC[i].isL = true;
                this.NPC[i].mY = rw;
                this.NPC[i].y = 0;
                this.NPC[i].x = rw;
                this.NPC[i].t = 6;
                this.draw(i, this.NPC[i].l);
                break;
            case 7:
                this.NPC[i].isD = true;
                this.NPC[i].isR = true;
                this.NPC[i].mX = rw;
                this.NPC[i].x = 0;
                this.NPC[i].mY = rw;
                this.NPC[i].y = 0;
                this.NPC[i].t = 7;
                this.draw(i, this.NPC[i].r);
                break;
        }
    },

    walk: function() {
        this.canvas.clearRect(0, 0, 9999, 9999);
        var n;
        for (var i = 0; i < this.NPC.length; i++) {
            n = this.NPC[i];
            this.img.src = n.imgSrc;
            if (n.isU && n.y > 0 || (n.isU && n.s > 0)){
                if (n.aY <= n.pY && (n.aX + n.aW - n.w) >= n.pX && n.aX <= n.pX)
                    this.draw(i, n.u);
                else {
                    this.NPC[i].isU = false;
                    this.NPC[i].isL = false;
                    this.NPC[i].isR = false;
                    this.NPC[i].s = 0;
                }
            }
            else if (n.isU && n.y == 0){
                this.NPC[i].isU = false;
            }
            if (n.isD && n.y < n.mY || (n.isD && n.s > 0)){
                if ((n.aY + n.aH - n.h) >= n.pY && (n.aX + n.aW - n.w) >= n.pX && n.aX <= n.pX)
                    this.draw(i, n.d);
                else {
                    this.NPC[i].isD = false;
                    this.NPC[i].isL = false;
                    this.NPC[i].isR = false;
                    this.NPC[i].s = 0;
                }
            }
            else if (n.isD && n.y == n.mY){
                this.NPC[i].isD = false;
            }
            if (n.isR && n.x < n.mX || (n.isR && n.s > 0)) {
                if (n.t != 5 && n.t != 7) {
                    if ((n.aX + n.aW -n.w) >= n.pX)
                        this.draw(i, n.r);
                    else {
                        this.NPC[i].isR = false;
                        this.NPC[i].s = 0;
                    }
                }
            } else if (n.isR && n.x == n.mX)
                this.NPC[i].isR = false;


            if (n.isL && n.x > 0 || (n.isL && n.s > 0)) {
                if (n.t != 4 && n.t != 6) {
                    if (n.aX <= n.pX)
                        this.draw(i, n.l);
                    else {
                        this.NPC[i].isL = false;
                        this.NPC[i].s = 0;
                    }
                }
            } else if (n.isL && n.x == 0)
                this.NPC[i].isL = false;


            if (!n.isL && !n.isD && !n.isU && !n.isR && this.NPC[i].s == 0) {
                this.random(i);
            }
        }
        if(this.state) {
          window.requestAnimationFrame(this.walk.bind(this));
        }
    },
    start: function() {
        this.state = true;
        window.requestAnimationFrame(this.walk.bind(this));

    },
    stop: function() {
        this.state = false;
    }


};
