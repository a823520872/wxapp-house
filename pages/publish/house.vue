<template>
	<view class="content">
		<view class="hd">
			<view class="bg"><image src="/static/image/publish/house_bg.png" mode="aspectFit"></image></view>
			<view class="warn">请如实填写信息，如有虚假会有账号封禁及扣除保证金等处罚</view>
			<view class="main m_flex_column m_flex_middle">
				<view class="photo_box m_flex_column m_flex_middle m_flex_center" @tap="chooseImg">
					<image class="photo" src="/static/image/publish/photo.png" mode="aspectFit"></image>
					<text>上传照片</text>
				</view>
				<view class="tips">上传房间、厨房、厕所、阳台、楼照租房率更高哦~</view>
			</view>
		</view>
		<view class="bd">
			<view class="cells">
				<view class="cells_title m_flex_middle">基本信息</view>
				<view class="cell m_flex_center m_flex_middle">
					<picker class="m_flex_item" :range="[]" @change="">
						<view class="cell_box m_flex_item">
							<view class="cell_hd">租金</view>
							<view class="cell_bd">请输入房源租金</view>
						</view>
					</picker>
				</view>
				<view class="cell m_flex_center m_flex_middle">
					<picker class="m_flex_item" :range="[]" @change="">
						<view class="cell_box m_flex_item">
							<view class="cell_hd">地址</view>
							<view class="cell_bd">请选择</view>
						</view>
					</picker>
					<picker class="m_flex_item" :range="[]" @change="">
						<view class="cell_box m_flex_item">
							<view class="cell_hd">标志建筑</view>
							<view class="cell_bd">请选择</view>
						</view>
					</picker>
					<picker class="m_flex_item" :range="[]" @change="">
						<view class="cell_box m_flex_item">
							<view class="cell_hd">路边距离</view>
							<view class="cell_bd">请选择</view>
						</view>
					</picker>
				</view>
				<view class="cell m_flex_center m_flex_middle">
					<picker class="m_flex_item" :range="[]" @change="">
						<view class="cell_box m_flex_item">
							<view class="cell_hd">房型</view>
							<view class="cell_bd">请选择</view>
						</view>
					</picker>
					<picker class="m_flex_item" :range="[]" @change="">
						<view class="cell_box m_flex_item">
							<view class="cell_hd">楼层</view>
							<view class="cell_bd">请选择</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="cells">
				<view class="cells_title m_flex_middle">联系方式</view>
				<view class="cell m_flex_middle">
					<view class="cell_box m_flex_item">
						<view class="cell_hd">联系电话</view>
						<view class="cell_bd">18922125666</view>
					</view>
				</view>
				<view class="cell m_flex_middle">
					<view class="cell_box m_flex_item">
						<view class="cell_hd">微信号</view>
						<view class="cell_bd">18922125666</view>
					</view>
				</view>
			</view>
		</view>
		<view class="empty"></view>
		<view class="fd" @tap="confirm">下一步</view>
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
			});
		},
		confirm() {
			this.goPage(`/pages/publish/publish_succ`);
		}
	}
};
</script>

<style lang="scss" scoped>
.hd {
	position: relative;
	.bg {
		width: 750upx;
		height: 375upx;
	}
	.warn {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 55upx;
		padding: 0 30upx;
		line-height: 55upx;
		background-color: #283136;
		font-size: 25upx;
		color: #fff;
	}
	.main {
		position: absolute;
		top: 55upx;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.photo_box {
		width: 166upx;
		height: 166upx;
		margin-top: 56upx;
		border: 1upx solid #cad3d7;
		background-color: #738995;
		border-radius: 50%;
		font-size: 25upx;
		color: #fff;
	}
	.photo {
		width: 56upx;
		height: 42upx;
		padding-bottom: 5upx;
	}
	.tips {
		margin-top: 39upx;
		font-size: 25upx;
		color: #fff;
	}
}
.bd {
	text-align: center;
	.cells {
		padding: 0 30upx;
		background-color: #fff;

		& + .cells {
			margin-top: 18upx;
		}

		&_title {
			height: 90upx;
			line-height: 90upx;
			font-size: 33upx;

			&::before {
				content: ' ';
				display: inline-block;
				width: 5upx;
				height: 22upx;
				margin-right: 7upx;
				background-color: $main-color;
			}
		}
	}
	.cell {
		height: 132upx;
		border-top: 1upx solid $border-color;

		picker {
			position: relative;
			& + picker::before {
				content: ' ';
				position: absolute;
				top: 50%;
				left: 0;
				width: 0;
				height: 69upx;
				border-left: 1upx solid #a8a8a8;
				transform: translateY(-50%);
			}
		}

		&_hd {
			font-size: 33upx;
			padding-bottom: 5upx;
		}

		&_bd {
			font-size: 25upx;
			color: $text-color-inverse;
		}
	}
}
.empty {
	height: 100upx;
}
.fd {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100upx;
	line-height: 100upx;
	text-align: center;
	font-size: 33upx;
	background-color: $main-color;
	color: #fff;
}
</style>
