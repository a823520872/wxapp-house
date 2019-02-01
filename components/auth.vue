<template>
	<view>
		<v-modal ref="user_modal">
			<block slot="footer">
				<button type="primary"
						class="m_button plain"
				        open-type="getUserInfo"
				        @getuserinfo="getUserInfoByBtn">去授权</button>
			</block>
		</v-modal>
	</view>
</template>

<script>
import { mapMutations } from 'vuex'
	export default {
		props: {

		},
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations(['setUserInfo']),
			getUserInfoByBtn(e) {
				console.log(e);
				const { errMsg, encryptedData, iv, userInfo } = e.detail
				if (errMsg === 'getUserInfo:ok') {
					console.log(e.detail);
					this.setUserInfo(userInfo)
				}
			},
			getUserInfo(e) {
				if (e) {
					this.getUserInfoByBtn(e)
				} else {
					this.$refs.user_modal.show({
						content: '为了更好的用户体验，需要获取您的个人信息',
						cancelText: '取消'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
</style>
