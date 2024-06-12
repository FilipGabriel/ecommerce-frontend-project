<template>
    <div>
        <Transition name="bounce">
            <div v-if="modalVisible" class="modal show" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style="display: block;">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" v-click-outside="closeModal">
                        <div class="text-right mb-4">
                            <img src="@/assets/icon-close-white.svg" alt="icon close" class="close-icon" @click="closeModal">
                        </div>

                        <div class="product-images-container">
                            <div class="position-relative">
                                <div class="icon-nav previous-icon" @click="changeImage('prev')">
                                    <img src="@/assets/icon-previous.svg" alt="icon previous">
                                </div>
                                <img :src="images[activeImageKey]" alt="" class="main-product-image">
                                <div class="icon-nav next-icon" @click="changeImage('next')">
                                    <img src="@/assets/icon-next.svg" alt="icon next">
                                </div>
                            </div>
                            <div class="product-images-thumbs">
                                <div v-for="(image, key) in images" :key="key" class="product-image-thumb" :class="{ activeImage: activeImageKey === key}" @click="$emit('syncActiveImage', key)">
                                    <img :src="image" alt="">
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    props: {
        modalVisible: false,
        images: Array,
        activeImageKey: Number
    },
    methods: {
        closeModal() {
           this.$emit('closeModal')
        },
        changeImage(direction) {
            let newValue = this.activeImageKey;

            if (direction === 'prev') {
                newValue = newValue > 0 ? newValue - 1 : this.images.length - 1;
            } else if (direction === 'next') {
                newValue = newValue < this.images.length - 1 ? newValue + 1 : 0;
            }

            this.$emit('syncActiveImage', newValue);
        }
    }
}
</script>

<style scoped>
.modal-dialog {
    width: 100%;
    max-width: fit-content;
}
.modal-content {
    background: transparent;
    outline: none;
    border: none;
}
.text-right {
    text-align: right;
}
.close-icon {
    width: 23px;
}
.product-images-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.product-images-container img {
    max-width: 550px;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
}
@media (min-width: 768px) {
    .main-product-image {
        min-width: 550px;
    }
}
.product-images-thumbs {
    display: flex;
    margin-top: 32px;
    justify-content: space-between;
    gap: 20px;
    max-width: 450px;
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
.icon-nav {
    padding: 12px;
    background: #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
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
    max-width: 20px;
    max-height: 20px;
}
.previous-icon {
    left: -30px;
}
.next-icon {
    right: -30px;
}
.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    transition: opacity 0.25s ease;
}
.bounce-leave-to {
    opacity: 0;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
    }
}
</style>