<script setup>
</script>

<template>
    <main>
        <div class="container">
            <ImageModal :modal-visible="imageModal" :images="product_info.images" :activeImageKey="activeImageKey" @closeModal="toggleImageModal" @syncActiveImage="syncActiveImage($event)" />

            <div class="product-container">
                <div class="product-images-container">
                    <div class="position-relative">
                        <div class="icon-nav previous-icon" @click="changeImage('prev')">
                            <img src="@/assets/icon-previous.svg" alt="icon previous">
                        </div>
                        <img :src="product_info.images[activeImageKey]" :alt="product_info.name" class="main-product-image" @click="toggleImageModal">
                        <div class="icon-nav next-icon" @click="changeImage('next')">
                            <img src="@/assets/icon-next.svg" alt="icon next">
                        </div>
                    </div>

                    <div class="product-images-thumbs">
                        <div v-for="(image, key) in product_info.images" :key="key" class="product-image-thumb" :class="{ activeImage: activeImageKey === key}" @click="activeImageKey = key">
                            <img :src="image" :alt="product_info.name">
                        </div>
                    </div>
                </div>
                <div class="product-info-container">
                    <p class="product-brand">{{ product_info.brand }}</p>
                    <p class="product-name">{{ product_info.name }}</p>
                    <p class="product-description">{{ product_info.description }}</p>
                    <div class="price-container">
                        <p v-if="product_info.discount" class="final-price">${{ product_info.price.toFixed(2).toLocaleString('en-US') }} <span class="discount-badge">{{ product_info.discount }}%</span></p>
                        <p :class="{ oldPrice: product_info.discount }">${{ product_info.base_price.toFixed(2).toLocaleString('en-US') }}</p>
                    </div>
                    <div class="d-inline-flex gap-2 flex-wrap">
                        <div class="qty-input">
                            <button class="qty-count qty-count--minus" data-action="minus" type="button" :class="{ disabledBtn: product_info.qty === 0}" @click="product_info.qty > 0 ? product_info.qty-- : null">-</button>
                            <input class="product-qty" type="number" v-model="product_info.qty" name="product-qty">
                            <button class="qty-count qty-count--add" data-action="add" type="button" @click="product_info.qty++">+</button>
                        </div>
                        <div class="btn btn-primary d-flex gap-2 align-items-center justify-content-center" :class="{ disabledCartBtn: product_info.qty === 0}" @click="addToCart()">
                            <img src="@/assets/icon-cart.svg" alt="cart">
                            Add to cart
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import ImageModal from '@/components/ImageModal.vue'
export default {
    components: {
        ImageModal
    },
    data() {
        return {
            product_info: {
                id: 1,
                images: ['image-product-1.jpg', 'image-product-2.jpg', 'image-product-3.jpg', 'image-product-4.jpg'],
                brand: 'Sneaker Company',
                name: 'Fall Limited Edition Sneakers',
                description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they\'ll withstand everything the weather can offer.',
                price: 125,
                base_price: 250,
                discount: 50,
                qty: 1,
            },
            activeImageKey: 0,
            imageModal: false
        }
    },
    computed: {
        windowWidth() {
            return window.innerWidth
        }
    },
    methods: {
        toggleImageModal() {
            if(this.windowWidth > 768) {
                let newValue = !this.imageModal

                this.$store.dispatch('layout/setModalOpen', newValue)
                this.imageModal = newValue
            }
        },
        changeImage(direction) {
            let newValue = this.activeImageKey;

            if (direction === 'prev') {
                newValue = newValue > 0 ? newValue - 1 : this.product_info.images.length - 1;
            } else if (direction === 'next') {
                newValue = newValue < this.product_info.images.length - 1 ? newValue + 1 : 0;
            }

            this.activeImageKey = newValue
        },
        syncActiveImage(value) {
            this.activeImageKey = value
        },
        addToCart() {
            let objectToAdd = JSON.parse(JSON.stringify(this.product_info))
            this.$store.dispatch('cart/addCartItem', objectToAdd)
            this.product_info.qty = 1
        }
    }
}
</script>

<style scoped>
.product-container {
    padding: 50px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 130px;
    flex-direction: column;
}
@media (min-width: 768px) {
    .product-container {
        padding: 100px 50px;
        flex-direction: row;
    }
}
.product-images-container img {
    max-width: 450px;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
}
.product-images-thumbs {
    display: flex;
    margin-top: 32px;
    justify-content: space-between;
    gap: 8px;
}
.product-images-thumbs img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    background-color: #fff;
    overflow: hidden;
    cursor: pointer;
    transition: 0.15s;
}
.product-images-thumbs img:hover {
    opacity: .5;
}
.product-image-thumb {
    border: 2px solid transparent;
    border-radius: 18px;
}
.activeImage {
    border: 2px solid #ff7e1b !important;
}
.activeImage img {
    opacity: .5;
}
.product-info-container {
    max-width: 440px;
}
.product-brand {
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 1.5px;
    font-weight: 600;
    color: #6e6f73;
    margin-bottom: 0;
}
.product-name {
    font-weight: 700;
    font-size: 44px;
    line-height: 3rem;
    margin-top: 15px;
}
.product-description {
    font-weight: 400;
    font-size: 15px;
    line-height: 1.625rem;
    margin-top: 32px;
    color: #69707d;
}
.final-price {
    font-weight: 700;
    font-size: 25px;
    line-height: 1.625rem;
    letter-spacing: 1.1px;
    color: #1d2026;
    margin-right: 16px;
    display: flex;
    align-items: center;
    gap: 20px;
}
.final-price .discount-badge {
    padding: 4px 8px;
    background: #18191e;
    border-radius: 3px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    max-height: 30px;
    line-height: 15px;
    letter-spacing: -0.25px;
}
.oldPrice {
    font-size: 20px;
    font-weight: 500;
    color: #69707d;
    text-decoration-line: line-through;
}
.btn {
    min-width: 272px;
    padding: 15px 10px;
    font-size: 14px;
    font-weight: 700;
}

.qty-input {
    color: #000;
    background: #f7f8fd;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
}
.qty-input .product-qty, .qty-input .qty-count {
    background: transparent;
    color: inherit;
    font-weight: bold;
    font-size: inherit;
    border: none;
    display: inline-block;
    min-width: 0;
    height: 2.5rem;
    line-height: 1;
}
.qty-input .product-qty:focus, .qty-input .qty-count:focus {
    outline: none;
}
.qty-input .product-qty {
    width: 80px;
    min-width: 0;
    display: inline-block;
    text-align: center;
    appearance: textfield;
}
.qty-input .product-qty::-webkit-outer-spin-button, .qty-input .product-qty::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
}
.qty-input .qty-count {
    padding: 0;
    cursor: pointer;
    width: 2.5rem;
    font-size: 1.25em;
    text-indent: -100px;
    overflow: hidden;
    position: relative;
}
.qty-input .qty-count:before, .qty-input .qty-count:after {
    content: "";
    height: 3px;
    width: 12px;
    position: absolute;
    display: block;
    background: #ff7d1b;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-weight: 900;
}
.qty-input .qty-count--add:after {
    transform: rotate(90deg);
}
.qty-input .qty-count:disabled {
    color: #ccc;
    background: #f2f2f2;
    cursor: not-allowed;
    border-color: transparent;
}
.qty-input .qty-count:disabled:before, .qty-input .qty-count:disabled:after {
    background: #ccc;
}
.disabledBtn {
    opacity: 0.4;
}
.disabledCartBtn {
    background: #b6bcc8;
    opacity: 0.3;
}
@media (min-width: 768px) {
    .icon-nav {
        display: none;
    }
}
@media (max-width: 768px) {
    .container {
        padding: 0;
    }
    .product-container {
        padding: 0;
        display: block;
    }
    .product-images-container img {
        max-width: 100%;
        border-radius: 0;
        max-height: 300px;
        object-fit: cover;
    }
    .product-info-container {
        padding: 20px;
    }
    .product-images-thumbs {
        display: none;
    }
    .icon-nav {
        padding: 10px;
        background: #fff;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
        transition: 0.2s;
        cursor: pointer;
    }
    .icon-nav:hover {
        background: #d0d0d0;
    }
    .icon-nav img {
        max-width: 16px;
        max-height: 16px;
    }
    .previous-icon {
        left: 15px;
    }
    .next-icon {
        right: 15px;
    }
    .product-name {
        font-size: 28px;
        line-height: 34px;
    }
    .product-description {
        margin-top: 20px;
    }
    .price-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .final-price, .oldPrice {
        margin: 0;
    }
    .qty-input, .btn-primary {
        width: 100%;
        min-height: 52px;
    }
    .qty-input {
        justify-content: space-between;
    }
    .d-inline-flex {
        gap: 15px !important;
    }
}
</style>
