let app = new Vue({
    el: '#app',
    data: {
        cartEmpty: 1,
        isActive: 0,
        components: [],
    },
    methods: {
        showMenu: function () {
            if (this.isActive) {
                this.isActive = 0;
            } else {
                this.isActive = 1;
            }
        },
        addComponent: function (component) {

            let index = this.components.indexOf(component, 0);
            if (index != -1) {
                this.drawOnCanvas(component, .1);
            } else {
                this.drawOnCanvas(component);
            }

            this.components.push(component);
        },
        removeComponent: function (component) {
            let index = this.components.indexOf(component, 0)
            if (index != -1) {
                this.components.splice(index, 1);
            } else {
                alert('Not found this element in the pizza');
            }
        },
        init: function () {
            let canvas = document.getElementById('canvas');
            let context = canvas.getContext('2d');
            let widthImage = +this.sizeCanvas.width.split('').slice(0, -2).join('');
            let heightImage = +this.sizeCanvas.height.split('').slice(0, -2).join('');

            let img = new Image();
            img.onload = function () {
                context.drawImage(img, 0, 0, widthImage, heightImage);
            }
            img.src = 'images/testo.png';
        },
        drawOnCanvas: function (src, rotate = 0) {
            let context = document.getElementById('canvas').getContext('2d');

            let widthImage = +this.sizeCanvas.width.split('').slice(0, -2).join('');
            let heightImage = +this.sizeCanvas.height.split('').slice(0, -2).join('');
            let img = new Image();

            img.onload = function () {
                if (rotate) {
                    context.translate(widthImage / 2, heightImage / 2);
                    context.rotate(rotate);
                    context.drawImage(img, -widthImage / 2, -heightImage / 2, widthImage, heightImage);
                    context.translate(-widthImage / 2, -heightImage / 2);
                    context.rotate(-rotate);
                } else {
                    context.drawImage(img, 0, 0, widthImage, heightImage);
                }

            }
            img.src = 'images/' + src + '.png';
        }
    },
    computed: {
        sizeCanvas: function () {
            let w = '', h = '';
            let elem = document.querySelector('.pizza__canvas');
            if (window.innerWidth < 500) {
                w = getComputedStyle(elem).width;
                h = getComputedStyle(elem).height;
            } else {
                w = window.innerHeight - 150 + 'px';
                h = window.innerHeight - 150 + 'px';
            }

            return {
                width: w,
                height: h
            }
        }
    }
});

app.init();
