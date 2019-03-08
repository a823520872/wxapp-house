class Canvas {
    constructor(id) {
        this.id = id
        this.ctx = uni.createCanvasContext(id)
    }
    arc(x, y, r) {
        this.ctx.arc(x, y, r, 0, Math.PI * 2, false)
        this.ctx.clip()
    }
    drawImage(path, ...arg) {
        this.ctx.drawImage(path, ...arg)
    }
    draw(reserve = false) {
        return new Promise((resolve, reject) => {
            this.ctx.draw(reserve, resolve)
        })
    }
    toFile(reserve = false) {
        const self = this
        return new Promise((resolve, reject) => {
            this.ctx.draw(reserve, () => {
                uni.canvasToTempFilePath({
                    canvasId: self.id,
                    success(res) {
                        resolve(res.tempFilePath)
                    },
                    fail: reject
                })
            })
        })
    }
}

export default Canvas
