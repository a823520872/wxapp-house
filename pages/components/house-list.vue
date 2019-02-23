<template>
	<view>
		<view class="list">
			<view v-for="(li, i) in list" :key="i" class="cell" @tap="goPage(`/pages/index/house`)">
				<view class="hd">
					<view class="m_flex_justify">
						<view class="title m_textover">单间</view>
						<view class="price">¥1000/月</view>
						<button class="m_button ghost" type="primary" plain @tap.stop="linkLandlord">联系房东</button>
					</view>
					<view class="time">前天 18:00</view>
					<view class="intro">
						<view class="intro_cell m_textover">楼层：【6楼】</view>
						<view class="intro_cell m_textover">地址：【上社】【荷光路】【大利家】【路边第3栋】</view>
						<view class="intro_cell m_textover">亮点：【洗衣机】【空调】【有阳台】【光线好】【大】</view>
						<view class="intro_cell m_textover">备注：光线很好，房间很大</view>
					</view>
				</view>
				<view class="bd m_flex_justify">
					<view class="img_box"></view>
					<view class="img_box"></view>
					<view class="img_box"></view>
				</view>
				<!-- <view class="fd m_flex">
					<view class="m_flex_item">阅读量：500</view>
					<view class="m_flex_item">信息描述：1</view>
					<view class="m_flex_item">收藏</view>
				</view> -->
			</view>
		</view>
		<v-modal ref="modal">
			<view slot="content">
				<view class="link m_flex_justify">
					<view>手机号：13123456789</view>
					<button class="m_button primary" plain @tap="call">拨打</button>
				</view>
				<view class="link m_flex_justify">
					<view>微信号：13123456789</view>
					<button class="m_button primary" plain @tap="copy">复制</button>
				</view>
			</view>
		</v-modal>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {
		...mapActions(['goPage']),
		linkLandlord() {
			this.$refs.modal.show({
				title: '联系方式',
				confirmText: '确定'
			});
		},
		collect() {},
		call() {
			uni.makePhoneCall({
				phoneNumber: '114'
			});
		},
		copy() {
			uni.setClipboardData({
				data: 'hello',
				success() {
					uni.showToast({
						title: '复制成功',
						icon: 'success'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	.cell {
		padding: 20upx 30upx 10upx;
		margin-bottom: 24upx;
		background-color: #fff;
	}

	.title {
		max-width: 50%;
		font-size: 28upx;
	}

	.time {
		font-size: 24upx;
		color: $uni-text-color-grey;
	}

	.price {
		font-size: 24upx;
		color: $uni-color-error;
	}

	.intro {
		padding: 10upx 0;
		font-size: 24upx;

		.intro_cell {
			padding: 4upx 0;
		}
	}

	.bd {
		padding-top: 10upx;
		padding-bottom: 10upx;
	}

	.img_box {
		width: 210upx;
		height: 210upx;
		background-color: $uni-bg-color-grey;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.fd {
		height: 48upx;
		line-height: 48upx;
		font-size: 24upx;

		.m_flex_item {
			padding: 0 24upx;
		}
	}
}
.link {
	padding: 10upx 0;
}
</style>
