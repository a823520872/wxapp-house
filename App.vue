<script>
	export default {
		onLaunch: function () {
            if (wx.canIUse && wx.canIUse("getUpdateManager")) {
                let updateManager = wx.getUpdateManager();
                updateManager.onUpdateReady(function() {
                    updateManager.applyUpdate();
                });
            }
			this.login().then(res => {
				const { code } = res
				console.log(code);
				this.$ajax('/api/WXLogin', {
					code
				})
			})
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		methods: {
			login() {
				return new Promise((resolve, reject) => {
					uni.login({
						success: resolve
					})
				})
			},
			
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
