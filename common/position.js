export default params => {
    return params.map((item, i) => {
        const ratio = item.width / item.height
        const ratioTarget = i === 0 ? 490 / 256 : 238 / 158
        const isWider = ratioTarget > ratio
        if (i === 0) {
            item.dWidth = 490
            item.dHeight = 256
            item.dx = 22
            item.dy = 176
        } else {
            item.dWidth = 240
            item.dHeight = 158
            item.dx = i % 2 === 1 ? 22 : 274
            item.dy = Math.ceil(i / 2) * 170 + 274
        }
        item.sWidth = Math.ceil(isWider ? item.width : item.height * ratioTarget)
        item.sHeight = Math.ceil(isWider ? item.width / ratioTarget : item.height)
        item.sx = (item.width - item.sWidth) / 2
        item.sy = (item.height - item.sHeight) / 2
        return item
    })
}
