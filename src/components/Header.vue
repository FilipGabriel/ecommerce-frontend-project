<template>
    <header class="container position-relative">
        <transition name="left-drawer">
            <div v-if="mobile_menu_opened" class="left-drawer" v-click-outside="toggleMobileMenu">
                <img src="@/assets/icon-close.svg" alt="close icon" @click="toggleMobileMenu()">
                <div class="mobile-menu-list mt-5">
                    <a class="" href="#">Collections</a>
                    <a class="" href="#">Men</a>
                    <a class="" href="#">Women</a>
                    <a class="" href="#">About</a>
                    <a class="" href="#">Contact</a>
                </div>
            </div>
        </transition>


        <div class="header">
            <button class="navbar-toggler" type="button" @click="toggleMobileMenu()">
                <img src="@/assets/icon-menu.svg" alt="menu icon">
            </button>

            <img src="@/assets/logo.svg" alt="Logo" class="logo">

            <nav class="navbar collapse navbar-collapse" id="navbarNav">
                <a class="nav-link active" href="#">Collections</a>
                <a class="nav-link" href="#">Men</a>
                <a class="nav-link" href="#">Women</a>
                <a class="nav-link" href="#">About</a>
                <a class="nav-link" href="#">Contact</a>
            </nav>

            <div class="user-controls position-relative">
                <!--      @mouseover="cart_opened = true" @mouseleave="cart_opened = false"          -->
                <div class="position-relative icon-hover" @mouseover="cart_opened = true" @mouseleave="cart_opened = false">
                    <div class="cursor-pointer position-relative p-2">
                        <img src="@/assets/icon-cart.svg" alt="Cart Icon" class="icon">
                        <span v-if="totalCartQuantity && totalCartQuantity > 0" class="cart-counter">{{ totalCartQuantity }}</span>
                    </div>

                    <div v-if="cart_opened" class="cart-dropdown">
                        <div class="cart-dropdown-container">
                            <div class="cart-header">
                                <p>Cart</p>
                            </div>
                            <div class="cart-content">
                                <div v-if="cart_items && cart_items.length > 0">
                                    <div v-for="(item, key) in cart_items" :key="key" class="cart-item row g-3 align-items-center">
                                        <div class="col-2">
                                            <img :src="item.images[0]" :alt="item.name">
                                        </div>
                                        <div class="col-9">
                                            <p class="mb-0">{{ item.name }}</p>
                                            <p class="mb-0">${{ item.price.toFixed(2).toLocaleString('en-US') }} x {{ item.qty }} <strong style="color: #1f2024">${{ (item.price * item.qty).toFixed(2).toLocaleString('en-US') }}</strong></p>
                                        </div>
                                        <div class="col-1 delete-icon" @click="deleteProduct(item.id)">
                                            <img src="@/assets/icon-delete.svg" alt="icon delete">
                                        </div>
                                    </div>
                                    <div class="btn btn-primary w-100 mt-3">Checkout</div>
                                </div>
                                <div v-else class="empty-cart">
                                    <p>Your cart is empty.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <img src="@/assets/image-avatar.png" alt="User Avatar" class="avatar">
            </div>
        </div>
    </header>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            mobile_menu_opened: false,
            cart_opened: false,
            cart_dropdown_opened: false,
            /*cart_items: [{
                image: 'image-product-1-thumbnail.jpg',
                name: 'Fall Limited Edition Sneakers',
                price: 125,
                qty: 3
            }]*/
        }
    },
    computed: {
        cart() {
            return this.$store.getters['cart/cart']
        },
        totalCartQuantity() {
            return this.$store.getters['cart/totalCartQuantity']
        },
        cart_items() {
            return this.$store.getters['cart/cart']
        }
    },
    methods: {
        toggleMobileMenu() {
            let newValue = !this.mobile_menu_opened
            this.$store.dispatch('layout/setModalOpen', newValue)
            this.mobile_menu_opened = newValue
        },
        deleteProduct(id) {
            this.$store.dispatch('cart/removeCartItem', id)
        }
    }
}
</script>

<style scoped>
.left-drawer-enter-active, .left-drawer-leave-active {
    transition: transform 0.3s ease;
}
.left-drawer-enter-from, .left-drawer-leave-to {
    transform: translateX(-100%);
}
.left-drawer-enter-to, .left-drawer-leave {
    transform: translateX(0);
}

.header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    background-color: #fff;
    gap: 50px;
    border-bottom: 1px solid #e9e9e9;
}

.logo {
    max-width: 135px;
}

.navbar {
    display: grid;
    grid-auto-flow: column;
    gap: 20px;
    padding: 0;
    justify-content: start;
}

.nav-link {
    color: #6e6f73;
    font-size: 14px;
    padding: 40px 8px;
    transition: 0.1s;
    position: relative;
    display: inline-block;
}
.nav-link:hover {
    background: transparent;
    color: #3c3d3f;
    font-weight: 600;
}
.nav-link::after {
    content: "";
    display: block;
    width: 0;
    height: 3px;
    background: #fd7f1b;
    transition: width 0.3s;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
}
.nav-link:hover::after {
    width: 100%; /* Extinde linia la toată lățimea textului */
}

.user-controls {
    display: inline-flex;
    align-items: center;
    gap: 35px;
}
.user-controls .icon {
    filter: invert(47%) sepia(7%) saturate(206%) hue-rotate(191deg) brightness(89%) contrast(81%);
    max-width: 27px;
    transition: 0.2s;
}

.icon-hover:hover img {
    filter: none;
}
.cart-counter {
    position: absolute;
    right: -4px;
    top: 4px;
    background: #fd7f1b;
    padding: 0 7px;
    border-radius: 10px;
    font-size: 11px;
    line-height: 14px;
    color: #fff;
}
.user-controls .avatar {
    max-width: 55px;
    border-radius: 100%;
    border: 2px solid transparent;
    transition: border-color 0.3s ease-in-out;
    cursor: pointer;
}
.user-controls .avatar:hover {
    border: 2px solid #fd7f1b;
}

@media (min-width: 768px) {
    .navbar-toggler {
        display: none;
    }
}
@media (max-width: 768px) {
    .navbar {
        display: none; /* Ascunde meniul pe mobile */
    }
    .header {
        padding: 15px 20px;
        gap: 20px;
    }
    .container {
        max-width: 100%;
    }
    .user-controls .avatar {
        max-width: 40px;
    }
    .navbar-toggler {
        display: block; /* Afișează butonul hamburger pe mobile */
    }
    .collapse.show {
        display: grid; /* Afișează meniul când este deschis pe mobile */
        grid-auto-flow: row;
        gap: 10px;
        background-color: #fff;
        padding: 10px;
        border-top: 1px solid #e9e9e9;
    }
    .user-controls {
        gap: 15px; /* Ajustează spațierea pe mobile */
    }
}
.left-drawer {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    background: #fff;
    min-width: 60vw;
    height: 100vh;
    padding: 20px;
}
.mobile-menu-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.mobile-menu-list a {
    color: #1f2024;
    font-weight: 700;
    font-size: 16px;
}
.cart-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 15px;
}
.cart-dropdown-container {
    background: #fff;
    border-radius: 8px;
    box-shadow: rgba(17, 12, 46, 0.10) 0 9px 21px 0;
}
@media (min-width: 768px) {
    .cart-dropdown {
        min-width: 360px;
    }
}
@media (max-width: 768px) {
    .cart-dropdown {
        position: fixed;
        top: 60px;
        z-index: 100;
        width: 100%;
        max-width: 95%;
    }
}
.cart-header {
    border-bottom: 1px solid #e9e9e9;
    padding: 20px;
}
.cart-header p {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 0;
}
.cart-content {
    padding: 20px;
}
.cart-item img {
    width: 100%;
    object-fit: contain;
    border-radius: 3px;
}
.cart-item p {
    font-size: 14px;
    color: #6e6f73;
}
.empty-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    margin-bottom: 0;
}
.empty-cart p {
    font-weight: 600;
    font-size: 14px;
    color: #6e6f73;
}
.delete-icon {
    cursor: pointer;
    text-align: center;
    transition: 0.2s ease-in-out;
}
.delete-icon:hover img {
    filter: invert(9%) sepia(99%) saturate(7413%) hue-rotate(8deg) brightness(81%) contrast(111%);
}
.delete-icon img {
    min-width: 13px;
}
</style>
