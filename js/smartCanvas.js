'use strict'

var smartCanvas = function () {
    this.img = null;
    this.elCanvas = null;
    this.canvOffset = 1;
    this.canvTxtOffset = 1;
    this.elInpUpper = null;
    this.elInpLower = null;
    this.ctx = null;
    this.fontSize = 50;
    this.fontBold = 700;
    this.fontFamily = 'Arial';
    this.fontStyle = 'regular';
    this.textAlign = 'center';


    this.fontHexColor = '#FFF';

    this.txt = {
        upper: {
            txt: '',
            fontSize: this.fontSize,
            fontWeight: this.fontBold,
            pos: {
                x: 0,
                y: 0,
            },

        },
        lower: {
            txt: '',
            fontSize: this.fontSize,
            fontWeight: this.fontBold,
            pos: {
                x: 0,
                y: 0,
            }
        }
    }

    this.configurate = function (canvSelector, img, elInpUpper, elInpLower) {
        if (!canvSelector || !img) return;
        this.img = img;

        this.elInpUpper = elInpUpper;
        this.elInpLower = elInpLower;

        this.elCanvas = document.querySelector(canvSelector);
        this.elCanvas.width = this.img.width;
        this.elCanvas.height = this.img.height;

        elInpUpper.style.fontWeight = this.txt.upper.fontWeight;
        elInpLower.style.fontWeight = this.txt.lower.fontWeight;
        elInpUpper.style.top = 0;
        elInpLower.style.top = (this.elCanvas.clientHeight - elInpLower.clientHeight) + 'px';

        this.txt.upper.pos.y = elInpUpper.style.top.split('px')[0];
        this.txt.lower.pos.y = elInpLower.style.top.split('px')[0];;

        this.ctx = this.elCanvas.getContext('2d');
        this.drawImage();

        console.log('Configuratin is done.');
    };

    this.drawImage = function () {
        console.log('drawImage');
        this.ctx.drawImage(this.img, 0, 0, this.elCanvas.width, this.elCanvas.height);
    };

    this.changeAlign = function (align) {
        this.textAlign = align;
    }
    this.toggleShadow = function () {
        this.ctx.shadowColor = 'black';
        this.ctx.shadowBlur = (this.ctx.shadowBlur) ? 0 : 5;
    }

    this.responsiveCanvTxt = function () {
        this.elInpUpper.style.width = this.elCanvas.width + 'px';
        this.elInpLower.style.width = this.elCanvas.width + 'px';

        this.canvTxtOffset = ((this.elCanvas.clientHeight / (this.elCanvas.height / 100)) / 100);

        this.elInpUpper.style.fontSize = parseInt((this.fontSize * (this.canvTxtOffset))) + 'px';
        this.elInpLower.style.fontSize = parseInt((this.fontSize * (this.canvTxtOffset))) + 'px';

        this.elInpLower.style.top = (this.elCanvas.clientHeight - this.elInpLower.clientHeight) + 'px';
        
        if (this.elInpLower.offsetTop <= this.elInpUpper.offsetTop + this.elInpUpper.clientHeight) {
            this.elInpUpper.style.top = (this.elInpLower.offsetTop - this.elInpUpper.clientHeight) + 'px';
        }

        this.txt.lower.pos.y = this.elInpLower.offsetTop * this.canvOffset;
        this.txt.upper.pos.y = this.elInpUpper.offsetTop * this.canvOffset;
        this.resetImg();
        this.drawTxt();
    }
    this.setFontSize = function (fontSize) {


        if (this.fontSize < 32 && fontSize < 0 || fontSize > 0 && (this.elInpLower.clientHeight + fontSize >= (this.elCanvas.clientHeight / 2))) return;
        this.fontSize += fontSize;
        this.responsiveCanvTxt();
        this.drawImage();
        this.drawTxt();
    };

    this.setFontHexColor = function (fontHexColor) {
        this.fontHexColor = fontHexColor;
    };

    this.drawUpperTxt = function () {
        if (!this.img) return;
        this.ctx.textAlign = this.textAlign;
        this.ctx.font = this.fontBold + ' ' + this.fontSize + "px " + this.fontFamily;
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = this.fontHexColor;
        switch (this.textAlign) {
            case 'center':
                this.txt.upper.pos.x = this.elCanvas.width / 2;
                break;
            case 'left':
                this.txt.upper.pos.x = 0;
                break;
            case 'right':
                this.txt.upper.pos.x = this.elCanvas.width;
                break;
        }
        this.ctx.fillText(this.txt.upper.txt, this.txt.upper.pos.x, this.txt.upper.pos.y);

    }

    this.drawLowerTxt = function () {
        if (!this.img) return;
        this.ctx.textAlign = this.textAlign;
        this.ctx.font = this.fontBold + ' ' + this.fontSize + "px " + this.fontFamily;
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = this.fontHexColor;
        switch (this.textAlign) {
            case 'center':
                this.txt.lower.pos.x = this.elCanvas.width / 2;
                break;
            case 'left':
                this.txt.lower.pos.x = 0;
                break;
            case 'right':
                this.txt.lower.pos.x = this.elCanvas.width;
                break;
        }
        this.ctx.fillText(this.txt.lower.txt, this.txt.lower.pos.x, this.txt.lower.pos.y);
    }

    this.drawTxt = function () {
        if (!this.img) return;
        this.drawUpperTxt();
        this.drawLowerTxt();
    };

    this.resetImg = function () {
        if (!this.img) return;
        this.ctx.clearRect(0, 0, this.elCanvas.width, this.elCanvas.width);
        this.ctx.drawImage(this.img, 0, 0, this.elCanvas.width, this.elCanvas.height);
    }

    this.getDataURL = function () {
        return this.elCanvas.toDataURL();
    }

}
