'use strict'
console.log('#התחלנו');

var cl = console.log;

var gOffset = 1;
var smartCanvas = new smartCanvas();
var gImgs = [
    {
        id: 1,
        url: 'img/memes/1.jpg',
        keywords: ['happy', 'drunk', 'satisfied']
    },
    {
        id: 2,
        url: 'img/memes/2.jpg',
        keywords: ['happy', 'satisfied']
    },
    {
        id: 3,
        url: 'img/memes/3.jpg',
        keywords: ['tired', 'disappointed', 'shocked']
    },
    {
        id: 4,
        url: 'img/memes/4.jpg',
        keywords: ['happy', 'shocked']
    },
];
var gKeywords = [];


// ----------------------------------DARGON BALL  TOUCH AND RESIZE-------------------------------------------------------//
window.onresize = function (event) {
    if (!smartCanvas.elCanvas) return;
    smartCanvas.canvOffset = ((smartCanvas.elCanvas.height / (smartCanvas.elCanvas.clientHeight / 100)) / 100);
    if (smartCanvas.elInpLower.clientHeight + smartCanvas.elInpLower.offsetTop > smartCanvas.elCanvas.clientHeight) {
        smartCanvas.elInpLower.style.top = (smartCanvas.elCanvas.clientHeight - smartCanvas.elInpLower.clientHeight) + 'px';
    }
    smartCanvas.responsiveCanvTxt();
};

function renderCanvas(canvSelector, url) {
    var elInputUpper = document.querySelector('.upper');
    var elInputLower = document.querySelector('.lower');

    var img = new Image();
    img.onload = function () {
        smartCanvas.configurate(canvSelector, img, elInputUpper, elInputLower);
        //Responsive
        smartCanvas.canvOffset = ((smartCanvas.elCanvas.height / (smartCanvas.elCanvas.clientHeight / 100)) / 100);
        smartCanvas.responsiveCanvTxt();


        //Touch Drag En li koah lesader et ze :( you will excuse me :*
        smartCanvas.elInpUpper.addEventListener('touchmove', function (ev) {
            var touchLocation = ev.targetTouches[0];
            var topOffset = (touchLocation.clientY - smartCanvas.elCanvas.getBoundingClientRect().y);

            var elmnt = smartCanvas.elInpUpper;
            if (topOffset >= 0 && topOffset < (smartCanvas.elCanvas.clientHeight - elmnt.clientHeight)) {
                smartCanvas.txt.upper.pos.y = topOffset * smartCanvas.canvOffset;
                smartCanvas.resetImg();
                smartCanvas.drawTxt();
                elmnt.style.top = topOffset + 'px';

            }
            ev.preventDefault();
        });

        smartCanvas.elInpLower.addEventListener('touchmove', function (ev) {
            var touchLocation = ev.targetTouches[0];
            var topOffset = (touchLocation.clientY - smartCanvas.elCanvas.getBoundingClientRect().y);

            var elmnt = smartCanvas.elInpLower;
            if (topOffset >= 0 && topOffset < (smartCanvas.elCanvas.clientHeight - elmnt.clientHeight)) {
                smartCanvas.txt.lower.pos.y = topOffset * smartCanvas.canvOffset;
                smartCanvas.resetImg();
                smartCanvas.drawTxt();
                elmnt.style.top = topOffset + 'px';
            }
            ev.preventDefault();
        });
    }
    img.src = url;
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    // if (document.getElementById(elmnt.id + "header")) {
    //   /* if present, the header is where you move the DIV from:*/
    //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    // } else {
    //   /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
    // }

    function dragMouseDown(e) {
        console.log('moving');
        console.log(elmnt.width);
        console.log(elmnt.height);
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        console.log('asdasd');
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        if ((elmnt.offsetTop - pos2 + elmnt.clientHeight) <= smartCanvas.elCanvas.clientHeight &&
            (elmnt.offsetTop - pos2) > 0) {

            if (elmnt.classList.contains('lower')) {
                smartCanvas.txt.lower.pos.y = (elmnt.offsetTop - pos2) * smartCanvas.canvOffset;
            } else {
                smartCanvas.txt.upper.pos.y = (elmnt.offsetTop - pos2) * smartCanvas.canvOffset;
            }
            smartCanvas.resetImg();
            smartCanvas.drawTxt();

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchmove = null;
    }
}

function init() {
    renderGallery(gImgs);
    renderKeywords();
    // var gImgs = createImgs()
}

function renderGallery(imgs) {
    // cl('renderGallery');
    var elGallery = document.querySelector('.gallery');
    var strGallery = '';
    for (var i = 0; i < imgs.length; i++) {
        for (var j = 0; j < 3; j++) {
            strGallery += '<div>\
                        <a href="#top"><img src="' + imgs[i].url + '" id="' + imgs[i].id + '" onclick="renderStudio(this.src)"></a>\
                     </div>'
        }
    }
    elGallery.innerHTML = strGallery;
}

function renderKeywords() {
    var strHtml = '';
    var keywords = {}
    gImgs.forEach(function (img) {
        img.keywords.forEach(function (keyword) {
            if (!keywords[keyword]) keywords[keyword] = 0;
            keywords[keyword]++;
            gKeywords.push(keyword);
        });
    });
    cl('keys: ', keywords);
    // console.log('keywords? ',keywords)
    for (var key in keywords) {
        if (keywords.hasOwnProperty(key)) {
            var value = keywords[key];
            strHtml += '<p style="font-size: ' + (16 + value * 5) + 'px" onclick="filterWords(this.innerText)">' + key + '</p>'
        }
    }
    document.querySelector('.keywords').innerHTML = strHtml;
}

function renderStudio(src) {
    var elStudio = document.querySelector('.editor');
    elStudio.style.maxHeight = '1500px';
    renderCanvas('canvas', src);
}

function getInputValues() {
    var upperTxt = document.querySelector('.upper').value;
    var lowerTxt = document.querySelector('.lower').value;
    return {
        upperTxt: upperTxt,
        lowerTxt: lowerTxt
    }
}

function renderTxt() {

    //    var txtObj = getInputValues();
    smartCanvas.resetImg();
    smartCanvas.drawTxt();
    //    console.log(lowerTxt,upperTxt);
}

function downloadImg(elLink) {
    debugger;
    elLink.href = smartCanvas.elCanvas.toDataURL();
    elLink.download = 'mosh-sumbat-meme.jpg';
}

function humpingTed(elImg) {
    //    elImg.src = "https://media2.giphy.com/media/Nxhqtjqw1y5os/giphy.gif"
    elImg.style.display = 'none';
    var elIframe = document.querySelector('.ted');
    elIframe.style.display = 'block';
}

function removeHumpingTed(elIframe) {
    elIframe.style.display = 'none';
    var elImg = document.querySelector('.logo > img');
    elImg.style.display = 'block';
}

function fillUpperCanvas(elInput) {
    var txt = elInput.value;
    smartCanvas.txt.upper.txt = txt;
    smartCanvas.elInpUpper.value = txt;
    document.querySelector('.side-upper').value = txt;
    console.log(txt);
    renderTxt();
}

function fillLowerCanvas(elInput) {
    var txt = elInput.value;
    smartCanvas.txt.lower.txt = txt;
    smartCanvas.elInpLower.value = txt;
    document.querySelector('.side-lower').value = txt;
    console.log(txt);
    renderTxt();
}

// function updateVals(el) {
//     console.log('asd')
//     smartCanvas.txt.upper = el.innerText;
//     console.log(smartCanvas.txt.upper);
//     renderTxt();
// }

function useUrl(idx) {
    debugger;
    var elUrl = document.querySelectorAll('.url')[+idx];
    var url = elUrl.value;
    renderStudio(url);
}


//function responsiveCanvTxt() {
//    smartCanvas.elInpUpper.style.width = smartCanvas.elCanvas.width + 'px';
//    smartCanvas.elInpLower.style.width = smartCanvas.elCanvas.width + 'px';
//
//    var txtOffset = ((smartCanvas.elCanvas.clientHeight / (smartCanvas.elCanvas.height / 100)) / 100);
//    smartCanvas.elInpUpper.style.fontSize = parseInt((smartCanvas.txt.upper.fontSize * (txtOffset))) + 'px';
//    smartCanvas.elInpLower.style.fontSize = parseInt((smartCanvas.txt.lower.fontSize * (txtOffset))) + 'px';
//    smartCanvas.elInpLower.style.top = (smartCanvas.elCanvas.clientHeight - smartCanvas.elInpLower.clientHeight) + 'px';
//
//    smartCanvas.txt.lower.pos.y = smartCanvas.elInpLower.offsetTop * gOffset;
//    smartCanvas.txt.upper.pos.y = smartCanvas.elInpUpper.offsetTop * gOffset;
//    smartCanvas.resetImg();
//    smartCanvas.drawTxt();
//}

//-----------------------------------DragonBall-----------------------------------------------------------////



function align(direction) {
    smartCanvas.changeAlign(direction);
    smartCanvas.resetImg();
    smartCanvas.drawTxt();
}

function toggleShadow() {
    smartCanvas.toggleShadow();
    smartCanvas.resetImg();
    smartCanvas.drawTxt();

}

function changeFont(font) {
    smartCanvas.fontFamily = font + '';
    console.log(smartCanvas.font);
    smartCanvas.resetImg();
    smartCanvas.drawTxt();
}

function changeColor(color) {
    smartCanvas.fontHexColor = color;
    smartCanvas.resetImg();
    smartCanvas.drawTxt();
}

function filterWords(keyword) {
    // cl('filterWords',keyword);
    var filteredImgs = gImgs.filter(function (img) {
        for (var i = 0; i < img.keywords.length; i++) {
            if (img.keywords[i].includes(keyword.trim())) {
                // cl('returning ' ,img.keywords[i] , keyword);
                return true;
            }
        }
        return false;
    });
    // cl(filteredImgs);

    renderGallery(filteredImgs);
}

function changeFontSize(value) {
    smartCanvas.setFontSize(value);
}
