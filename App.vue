<script>
export default {
    onLaunch: function() {
        // #ifdef MP-WEIXIN
        if (wx.canIUse && wx.canIUse('getUpdateManager')) {
            let updateManager = wx.getUpdateManager()
            updateManager.onUpdateReady(function() {
                updateManager.applyUpdate()
            })
        }
        // #endif
    },
    onShow: function() {
        this.log('App Show')
    },
    onHide: function() {
        this.log('App Hide')
    }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import './common.scss';
</style>
