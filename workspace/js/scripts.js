/*
Before after - Code by Zsolt Király
v1.0.1 - 2019-10-15
*/

'use strict';
var beforeAfter = function() {

    function signatura() {
        if (window['console']) {
            const text = {
                black: '%c     ',
                blue: '%c   ',
                author: '%c  Zsolt Király  ',
                github: '%c  https://zsoltkiraly.com/'
            }

            const style = {
                black: 'background: #282c34',
                blue: 'background: #61dafb',
                author: 'background: black; color: white',
                github: ''
            }

            console.log(text.black + text.blue + text.author + text.github, style.black, style.blue, style.author, style.github);
        }
    }


    signatura();


    function setImageWidth(i, b, a) {
        let img = i.querySelectorAll('img');

        for (let element of img) {
            element.style.width = b.offsetWidth + 'px';
        }
    }


    function getWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }


    function setStartPosition(h, a) {
        h.style.left = '0px';
        a.style.width = '10px';
    }


    function setPercentPosition(h, hmuD, b) {
        h.setAttribute('data-percent-position', Math.ceil(hmuD));
    }


    function loading(container) {
        setTimeout(function() {
            container.classList.remove('show');

            setTimeout(function() {
                container.classList.remove('loading');
            }, 500);

        }, 500);
    }


    function bounceLeft(key1, key2, a, h, dW, dL, time) {
        setTimeout(()=> {
            a.style[key1] = dW;
            h.style[key2] = dL;
        }, time)
    }


    function setMiddle(a, h, b) {
        a.style.transition = 'width .5s cubic-bezier(0.215, 0.61, 0.355, 1)';
        h.style.transition = 'left .5s cubic-bezier(0.215, 0.61, 0.355, 1)';

        bounceLeft('width', 'left', a, h, (b.offsetWidth / 2 + 25) + 'px', ((b.offsetWidth / 2 + 25) - 10) + 'px', 500);
        bounceLeft('width', 'left', a, h, (b.offsetWidth / 2 - 10) + 'px', ((b.offsetWidth / 2 - 10) - 10) + 'px', 1000);
        bounceLeft('width', 'left', a, h, (b.offsetWidth / 2 + 5) + 'px', ((b.offsetWidth / 2 + 5) - 10) + 'px', 1500);
        bounceLeft('width', 'left', a, h, (b.offsetWidth / 2) + 'px', ((b.offsetWidth / 2) - 10) + 'px', 2000);
        bounceLeft('transition', 'transition', a, h, '', '', 2550);
    }


    function disabledTouch(i) {
        i.classList.add('disabled-touch');

        setTimeout(()=> {
            i.classList.remove('disabled-touch');
        }, 2550)
    }


    function app(config) {


        var startX = 0,
            dist = 0,
            handDist = 0;


        const id = document.querySelector('#' + config.id + ''),
              after = id.querySelector('.after'),
              before = id.querySelector('.before'),
              hand = before.querySelector('.hand'),
              handButton = before.querySelector('.hand-button');


        setImageWidth(id, before, after);
        setStartPosition(hand, after);
        disabledTouch(id);


        function fingerDown(b, e, type) {
            b.classList.add('catch');
            handDist = parseFloat(hand.style.left, 10);
            
            if(type =='mouse') {
                startX = e.clientX;

            } else if(type =='touch') {
                startX = parseInt(e.changedTouches[0].clientX);
            }

            if (e.cancelable) {
                e.preventDefault();
            }
        }


        function fingerMove(b, h, hD, a, e, type) {
            if(b.classList.contains('catch')) {

                if(type =='mouse') {
                    dist = startX - e.clientX;

                } else if(type =='touch') {
                    dist = startX - e.changedTouches[0].clientX;
                }

                if(dist > 0) {

                    if((hD + dist * -1) >= 0) {
                        h.style.left = (hD + dist * -1) + 'px';

                        a.style.width = (10 + hD + dist * -1) + 'px';
                    }
                } else {
                    if(hD + Math.abs(dist) <= b.offsetWidth - h.offsetWidth) {

                        h.style.left = (hD + Math.abs(dist)) + 'px';

                        a.style.width = (10 + hD + Math.abs(dist)) + 'px';
                    }
                }
                
            }

            if (e.cancelable) {
                e.preventDefault();
            }
        }

        function fingerUp(b, h, a, e, type) {
 
            if(b.classList.contains('catch') && type =='touch' ||  type =='mouse') {
                b.classList.remove('catch');

                var handMouseUpDist = parseFloat(h.style.left, 10);

                if(handMouseUpDist < 10) {

                    h.style.transition = 'left .1s ease'; 
                    h.style.left = '0px';

                    a.style.transition = 'left .1s ease'; 
                    a.style.width = '10px';

                    setTimeout(()=> {
                        h.style.transition = '';
                        a.style.transition = '';
                    }, 200)

                    setPercentPosition(h, 0, b);

                } else if(handMouseUpDist + 20 > b.offsetWidth - 10) {

                    h.style.left = (b.offsetWidth - 20) + 'px';
                    h.style.transition = 'left .1s ease'; 

                    a.style.width =  (b.offsetWidth - 10) + 'px';
                    a.style.transition = 'left .1s ease'; 

                    setTimeout(()=> {
                        h.style.transition = '';
                        a.style.transition = '';
                    }, 200)

                    setPercentPosition(h, 100, b);

                } else {

                    setPercentPosition(h, (handMouseUpDist / b.offsetWidth) * 100, b);
                }
            }

            if (e.cancelable) {
                e.preventDefault();
            }
        }


        function resize(i, b, h, a) {

            setImageWidth(i, b, a);

            //Position middle
            a.style.transition = 'width .5s cubic-bezier(0.215, 0.61, 0.355, 1)';
            h.style.transition = 'left .5s cubic-bezier(0.215, 0.61, 0.355, 1)';

            a.style.width = (b.offsetWidth / 2) + 'px';
            h.style.left = (b.offsetWidth / 2 - 10) + 'px';

            setTimeout(()=> {
                h.style.transition = '';
                a.style.transition = '';
            }, 500)


            /*
            //Keepd the position
            if(b.offsetWidth > parseFloat(a.style.width, 10) + 10) {
                h.style.left = Math.ceil((parseFloat(h.getAttribute('data-percent-position')) / 100) * b.offsetWidth) + 'px';
                a.style.width = (10 + Math.ceil((parseFloat(h.getAttribute('data-percent-position')) / 100) * b.offsetWidth)) + 'px';

            } else {

                h.style.left = (b.offsetWidth - 20) + 'px';
                a.style.width = (b.offsetWidth - 10) + 'px';
            }*/
        }

        handButton.addEventListener('mousedown', (e)=> { fingerDown(before, e, 'mouse') });
        document.addEventListener('mousemove', (e)=> { fingerMove(before, hand, handDist, after, e, 'mouse') });
        document.addEventListener('mouseup', (e)=> { fingerUp(before, hand, after, e, 'mouse') });
        handButton.addEventListener('touchstart', (e)=> {  fingerDown(before, e, 'touch')  });
        handButton.addEventListener('touchmove', (e)=> { fingerMove(before, hand, handDist, after, e, 'touch') });
        handButton.addEventListener('touchend', (e)=> { fingerUp(before, hand, after, e, 'touch') });

        var cachedWidth = getWidth();

        window.addEventListener('resize', ()=> {

            var newWidth = getWidth();

            if(newWidth !== cachedWidth) {
                resize(id, before, hand, after);

                cachedWidth = newWidth;
            }
        });

        loading(id);
        setMiddle(after, hand, before)
    }

    return {
        app:app
    }
}();