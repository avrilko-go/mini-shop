import {Http} from "./http";

class Paging {
    req
    url
    count
    start
    locker = false
    moreData = true
    accumulator = []

    constructor(req, count = 10, start = 0) {
        this.req = req
        this.count = count
        this.start = start
        this.url = req.url
    }

    async getMoreData() {
        if (!this.moreData) {
            return
        }

        if (!this._getLocker()) {
            return
        }
        const data = await this._actualGetData()
        this._releaseLocker()

        return data
    }

    _getCurrentUrl() {
        let url = this.url
        let params = `start=${this.start}&count=${this.count}`
        if (url.includes('?')) { // 有问号
            url += `&${params}`
        } else {
            url += `?${params}`
        }
        this.req.url = url
        return this.req
    }

    async _actualGetData() {
        let req = this._getCurrentUrl()
        let paging = await Http.request(req)
        if (!paging) {
            return null
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: [],
            }
        }
        this.moreData = Paging._moreData(paging.total_page, paging.page)
        if (this.moreData) {
            this.start += this.count
        }
        this._accumulate(paging.items)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator,
        }
    }

    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }
}

export {
    Paging
}
