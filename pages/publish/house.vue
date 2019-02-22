<template>
	<view>
		<button type="primary" class="m_button primary" @tap="chooseImg">上传照片</button>
		<button class="m_button primary" plain @tap="confirm">确认发布</button>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	methods: {
		...mapActions(['goPage']),
        chooseImg() {
            uni.chooseImage({
            	sourceType: 'album',
                success(e) {
                    console.log(e);
                    if (e.errMsg === 'chooseImage:ok') {
                        console.log(e.tempFilePaths);
                        console.log(e.tempFiles);
                    }
                }
            })
        },
		confirm() {
			this.goPage(`/pages/publish/publish_succ`);
		}
	}
};
</script>

<style></style>
