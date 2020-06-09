Vue.component('pizza-products', {
    props: ['item', 'image'],
    template: `<div class="pizza__product">
                    <span class='pizza__count' v-if='item.count'>{{item.count}}</span>
                    <div class='pizza__img' v-bind:style="{backgroundImage: image}"></div>
                    <div class="pizza__btn">
                        <button v-on:click='$emit("remove", item.id)' v-bind:disabled = '!item.count' v-bind:class='{pizza__btn_disabled: !item.count}'>-</button>
                        <button v-on:click='$emit("add", item.id)'>+</button>
                    </div>
                    <span class='pizza__name'>{{ item.name }}</span>
                    <span class='pizza__price'>{{item.price}} usd</span>
                </div>`
});
Vue.component('pizza-order', {
    props: {
        cost: Number,
    },
    template:`
        <div class="content__order order">
            <div class="order__cost">
                <span>Cost: {{cost}} usd</span>
            </div>
            <div class="order__btn">
                <button @click='$emit("create-order")'>Create order</button>
            </div>
        </div>
    `
});
Vue.component('pizza-order-list',{
    props: {
        list: Array,
    },
    template:`
        <div class='order-list'>
                <div class="order-list__header">
                    <div class="order-list__name">
                        <span>Product</span>
                    </div>
                    <div class="order-list__price">
                        <span>Price</span>
                    </div>
                    <div class="order-list__count">
                        <span>Count</span>   
                    </div>
                    <div class="order-list__cost">
                        <span>Cost</span>
                    </div>
                </div>
                <div class="order-list__row" v-for='item in list' :key='item.id' v-if='item.count'>
                    <div class="order-list__name">
                        <span>{{item.name}}</span>
                    </div>
                    <div class="order-list__price">
                        <span>{{item.price}}</span>
                    </div>
                    <div class="order-list__count">
                        <span>{{item.count}}</span>   
                    </div>
                    <div class="order-list__cost">
                        <span>{{item.count*item.price}} usd</span>
                    </div>
                </div>
        </div>
    `,
});
Vue.component('pizza-form-confirm',{
    props:{
        order: Array,
        cost: Number,
        buyer: Object,
    },
    template:`
        <div class="form">
                <a class='form__cancel' @click='$emit("cancel")'></a>
                <div class='form__body'>
                    <div class="form__head">
                        <span>Your order</span>
                    </div>
                    <pizza-order-list class='form__order-list' v-bind:list='order'></pizza-order-list>
                    <div class="form__total-cost">
                        <span>Total: {{cost}} usd</span>
                    </div>
                    <div class="form__head">
                        <span>Your contacts</span>
                    </div>
                    <div class="form__contacts">
                        <input type="text" v-model='buyer.name' name="name" placeholder="Tom">
                        <input type="text" v-model='buyer.phone' name='phone' placeholder="+19xxxxxxxxxxx">
                    </div>
                    <div class="form__buttons">
                        <button class="form__btn form__btn_cancel" @click='$emit("cancel")'>Cancel</button>
                        <button class="form__btn form__btn_submit" @click='$emit("submit")'>Send</button>
                    </div>
                </div>
        </div>
    `
})


let app = new Vue({
    el: '#app',
    data: {
        cartEmpty: 1,
        isActive: 0,
        formActive:0,
        products: [
            {
                id: 0,
                name: 'testo',
                img: '',
                canvas: 'testo',
                count: 1,
                price: 50,
            },
            {
                id: 1,
                name: 'cheese',
                img: 'url(images/icons/cheese.png)',
                canvas: 'cheese',
                count: 0,
                price: 10,
            },
            {
                id: 2,
                name: 'becon',
                img: 'url(images/icons/becon.png)',
                canvas: 'becon',
                count: 0,
                price: 15,
            },
            {
                id: 3,
                name: 'mushrooms',
                img: 'url(images/icons/mushrooms.png)',
                canvas: 'mushrooms',
                count: 0,
                price: 12,
            },
            {
                id: 4,
                name: 'black olives',
                img: 'url(images/icons/black-olives.jpg)',
                canvas: 'black-olives',
                count: 0,
                price: 15,
            },
            {
                id: 5,
                name: 'pickles',
                img: 'url(images/icons/piсkles.jpg)',
                canvas: 'pickles',
                count: 0,
                price: 8,
            },
            {
                id: 6,
                name: 'hauting sausages',
                img: 'url(images/icons/haunting-sausages.jpg)',
                canvas: 'hauting-sausages',
                count: 0,
                price: 20,
            },
            {
                id: 7,
                name: 'salami',
                img: 'url(images/icons/salami.jpg)',
                canvas: 'salami',
                count: 0,
                price: 16,
            },
            {
                id: 8,
                name: 'salmon',
                img: 'url(images/icons/salmon.jpg)',
                canvas: 'salmon',
                count: 0,
                price: 25,
            },
            {
                id: 9,
                name: 'snow crab',
                img: 'url(images/icons/snow-crab.jpg)',
                canvas: 'snow-crab',
                count: 0,
                price: 18,
            },
            {
                id: 10,
                name: 'squid',
                img: 'url(images/icons/squid.jpg)',
                canvas: 'squid',
                count: 0,
                price: 18,
            },
        ],
        cart: {
            orders: [],
            name: '',
            phone:'',
        }, 
        telegramConfig: {
            id: 376924044,
            token: '1090298924:AAGVaxz5fHsG4VNN9DEpvp7sZYe_RuTOtvs',
        }
    },
    methods: {
        showMenu: function () {
            if (this.isActive) {
                this.isActive = 0;
            } else {
                this.isActive = 1;
            }
        },
        addComponent: function (id) {
            this.products.forEach(element => {
                if (element.id == id) {
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
                this.drawOnCanvas();
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
                    img.src = 'images/' + element.canvas + '.png';
                }
            });

        },
        createOrder: function(){
            let orderList = this.choosedProducts().map(elem=>{return elem.name + ' ' + elem.count+ ' pcs'}).join('\n\t');
            this.cartEmpty=0;
            this.formActive=0;
            
            return this.sendToTelegram({
                name: this.cart.name,
                phone: this.cart.phone,
                order: orderList,
                cost: this.cost,
            });
        },
        sendToTelegram: async function(data){

            let message = `Order
            ${data.order} 
                на общую сумму ${data.cost} usd. 
            Buyer
                Name: ${data.name}
                Phone: ${data.phone}`;
            let url = `https://api.telegram.org/bot${this.telegramConfig.token}/sendMessage?chat_id=${this.telegramConfig.id}&parse_mode=HTML&text=`+encodeURI(message);
            await fetch(url)
                .then(response=>response.json())
                .then(json=>{
                    if (json.ok) {
                        this.products.forEach(elem=>elem.id!=0?elem.count=0:elem.count=1);
                        this.drawOnCanvas();
                        alert('Thank you for order!');
                    }

                });
        },
        choosedProducts: function(){
            return this.products.filter(elem=>{
                        if (elem.count>0){
                            return elem;
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
                h = w;
            } else {
                w = window.innerHeight - 150 + 'px';
                h = window.innerHeight - 150 + 'px';
            }

            return {
                width: w,
                height: h
            }
        },
        cost: function(){
            let cost = 0;
            let orderList = this.choosedProducts();
            orderList.forEach(elem=>{
                cost+=elem.count*elem.price;
            });
            return cost;
        }
    }
});

app.init();
