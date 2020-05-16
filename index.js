let app = new Vue({
    el: '#app',
    data: {
        cartEmpty: 1,
        isActive: 0,
        components: [
            {
                id: 0,
                name: 'testo',
                count: 1,
            },
        ],
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
            let index = 0;
            this.components.forEach(element => {
                if (element.name == component) {
                    index = element.id;
                } else {
                    return 0;
                }
            });
            if (index) {
                this.components[index].count++;
            } else {
                this.components.push({
                    id: this.components.length,
                    name: component,
                    count: 1
                });
            }
            this.drawOnCanvas();

        },
        removeComponent: function (index) {
            if (this.components[index]) {
                if (this.components[index].count == 1) {
                    this.components.splice(index, 1);
                    this.drawOnCanvas();
                } else {
                    this.components[index].count--;
                }
            } else {
                alert('Not found this element in the pizza');
            }
        },
        init: function () {
            this.drawOnCanvas();
        },
        drawOnCanvas: function () {
            let context = document.getElementById('canvas').getContext('2d');
            let arr = this.components;

            let widthImage = +this.sizeCanvas.width.split('').slice(0, -2).join('');
            let heightImage = +this.sizeCanvas.height.split('').slice(0, -2).join('');

            arr.forEach(element => {
                let img = new Image();

                img.onload = function () {
                    context.drawImage(img, 0, 0, widthImage, heightImage);
                }
                img.src = 'images/' + element.name + '.png';
            });

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
