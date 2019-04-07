<template>
    <view>
        <web-view :src="src"></web-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            src: ""
        };
    },
    onLoad(res) {
        this.src = decodeURIComponent(res.src);
    }
};
</script>
