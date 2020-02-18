import {promisic} from "./util";
import {config} from "../config/config";

class Http {
    static async request({url, data, method = "GET"}) {
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appKey: config.appKey,
                clientkey: "I2Pu5Um6kvDtpb6u"
            }
        })
        return res.data
    }
}

export {
    Http
}


