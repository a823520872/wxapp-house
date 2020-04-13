export default {
    getNumFromStr(num, i) {
        const [float0, float1] = (+num).toFixed(2).split('.')
        if ('00' === float0) {
            float0 = ''
        } else {
            if (float0.charAt(1) === '0') {
                float0 = float0.charAt(0)
            }
            float0 = '.' + float0
        }
        if (typeof i === 'number') {
            return [float0, float1][i]
        }
        return float0 + float1
    },
    numberFilter(num = 0) {
        num = +num
        if (num < 10000) {
            return num + ''
        } else if (num < 100000000) {
            num = (num / 10000).toFixed(1)
            num = this.getNumFromStr(num)
            return num + '万'
        } else {
            num = (num / 100000000).toFixed(1)
            num = this.getNumFromStr(num)
            return num + '亿'
        }
    },
}
