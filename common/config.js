const config = {
    contact_mobile: '18922717216',
    wechat_number: 'huahua_big',
    house_mode: 'aspectFill'
    // gss: encodeURIComponent('https://gssban.com/admin/web/phone/index.html?cityType=3')
}
const info = uni.getSystemInfoSync()
config.isAndroid = info.platform === 'android'
config.isIphoneX = !config.isAndroid && info.screenHeight >= 812

export default config
