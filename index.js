Vue.component('pizza-products', {
    props: ['item'],
    template: `<div class="pizza__product">
                    <img v-bind:src="item.img" alt="item.name">
                    <div class="pizza__btn">
                        <button v-on:click='$emit("remove", item.id)' v-bind:disabled = '!item.count'>-</button>
                        <button v-on:click='$emit("add", item.name)'>+</button>
                    </div>
                    <span>{{ item.name }}</span>
                </div>`
});


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
        products: [
            {
                id: 0,
                name: 'testo',
                img: '',
                count: 1,
            },
            {
                id: 0,
                name: 'cheese',
                img: 'images/icons/cheese.png',
                count: 0,
            },
            {
                id: 1,
                name: 'becon',
                img: 'images/icons/becon.png',
                count: 0,
            },
            {
                id: 2,
                name: 'mushrooms',
                img: 'images/icons/mushrooms.png',
                count: 0,
            }
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
            this.products.forEach(element => {
                if (element.name == component) {
                    element.count++;
                } else {
                    return 0;
                }
            });
            this.drawOnCanvas();

        },
        removeComponent: function (id) {
            try {
                this.products.forEach(element => {
                    if (element.id == id) {
                        element.count--;
                    }
                });
            } catch (e) {
                alert('Error:' + e);
            }
        },
        init: function () {
            this.drawOnCanvas();
        },
        drawOnCanvas: function () {
            let context = document.getElementById('canvas').getContext('2d');
            let arr = this.products;

            let widthImage = +this.sizeCanvas.width.split('').slice(0, -2).join('');
            let heightImage = +this.sizeCanvas.height.split('').slice(0, -2).join('');

            arr.forEach(element => {
                if (element.count != 0) {
                    let img = new Image();

                    img.onload = function () {
                        context.drawImage(img, 0, 0, widthImage, heightImage);
                    }
                    img.src = 'images/' + element.name + '.png';
                }
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
