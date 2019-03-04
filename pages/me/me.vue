<template>
	<view class="content content_bg_ff">
		<view class="hd">
			<view class="avatar" @tap="getAuth">
				<image v-if="userInfo" :src="userInfo.avatarUrl" mode="aspectFit"></image>
			</view>
			<view class="main">
				<view class="box">
					<view class="name m_textover">
						<view v-if="userInfo">{{ userInfo.nickName }}</view>
						<button v-else class="m_button" type="primary" plain open-type="getUserInfo" @getuserinfo="getUserInfo">
							登录
						</button>
					</view>
					<view class="tabs m_flex">
						<view class="tab" @tap="goPage('/pages/me/collection')">
							<view class="icon">
								<image src="/static/image/me/collection.png" mode="aspectFit"></image>
							</view>
							<view>我的收藏</view>
						</view>
						<view class="tab">
							<view class="icon">
								<image src="/static/image/me/praise.png" mode="aspectFit"></image>
							</view>
							<view>我赞过的</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="split"></view>
		<view class="bd">
			<view class="cell m_flex_justify m_flex_middle" @tap="goPage('/pages/me/publish')">
				<view class="cell_hd">我的发布</view>
				<view class="cell_fd right_icon"></view>
			</view>
			<view class="cell m_flex_justify m_flex_middle" @tap="goPage('/pages/me/invitation')">
				<view class="cell_hd">推荐好友</view>
				<view class="cell_fd">获得88元分享基金</view>
			</view>
			<view class="cell m_flex_justify m_flex_middle" @tap="linkAdmin">
				<view class="cell_hd">联系村长</view>
				<view class="cell_fd">全能村长，24小时在线</view>
			</view>
		</view>
		<v-auth ref="auth"></v-auth>
		<v-modal ref="modal">
			<view slot="content">
				<view class="modal">
					<view class="link m_flex_justify">
						<view>手机号：13123456789</view>
						<button class="m_button main" plain @tap="call">拨打</button>
					</view>
					<view class="link m_flex_justify">
						<view>微信号：13123456789</view>
						<button class="m_button main" plain @tap="copy">复制</button>
					</view>
				</view>
			</view>
		</v-modal>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import VAuth from "../../components/auth.vue";
	export default {
		components: {
			VAuth
		},
		computed: {
			...mapState(["userInfo"])
		},
		data() {
			return {};
		},
		onReady() {
			// if (!this.userInfo) {
			// 	this.getUserInfo();
			// }
		},
		methods: {
			...mapActions(["goPage"]),
			getUserInfo(e) {
				this.$refs.auth.getUserInfo(e);
			},
			linkAdmin() {
				this.$refs.modal.show({
					title: "联系方式",
					confirmText: "确定",
					success() {}
				});
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: "114"
				});
			},
			copy() {
				uni.setClipboardData({
					data: "hello",
					success() {
						uni.showToast({
							title: "复制成功",
							icon: "success"
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.hd {
		background-color: $main-color;
		font-size: 28upx;
		color: $uni-text-color-inverse;
		overflow: hidden;

		.avatar {
			position: relative;
			width: 131upx;
			height: 131upx;
			margin: 87upx auto 35upx;
			border-radius: 50%;
			background-color: $uni-bg-color;
			overflow: hidden;
			border: 2upx solid #fff;
		}

		.main {
			position: relative;
			width: 750upx;
			height: 250upx;
			overflow: hidden;
		}
		.box {
			position: absolute;
			top: 0;
			left: 50%;
			width: 750upx;
			height: 330upx;
			padding: 0 202upx;
			border-radius: 50%;
			background-color: #fff;
			transform: translate3d(-50%, 0, 0);
		}

		.name {
			padding-top: 10upx;
			height: 95upx;
			line-height: 95upx;
			text-align: center;
			color: $text-color;
		}

		.m_button {
			padding: 0 30upx;
			border: none;
			font-size: 33upx;
			color: $text-color;
		}
		.tabs {
			padding: 10upx 30upx;
			justify-content: space-around;
			line-height: 49upx;
			color: $text-color;
		}
		.tab {
			padding: 20upx 30upx 15upx;
		}
		.icon {
			width: 40upx;
			height: 40upx;
			margin: 0 auto;
		}
	}
	.split {
		width: 100%;
		height: 18upx;
		background-color: #eee;
	}
	.bd {
		.cell {
			height: 108upx;
			padding: 0 30upx;
			line-height: 108upx;
			font-size: 33upx;
			border-bottom: 1upx solid $border-color;
			color: $text-color;

			&_fd {
				font-size: 25upx;
				color: $text-color-inverse;
			}
		}
	}
</style>
