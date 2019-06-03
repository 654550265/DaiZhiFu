let env = 'prod';
let host = '';

switch (env) {
    case 'mock':
        host = 'http://47.92.122.205:3000/mock/13/';
        break;
    case 'env':
        host = 'http://localhost:4200/';
        break;
    case 'prod':
        host = 'http://cirkul.cn/';
        break;
}

export const ENV = {
    host: host,
    BankNames: [{
        text: '中国工商银行',
        isAcv: false,
        type: 1
    }, {
        text: '中国农业银行',
        isAcv: false,
        type: 2
    }, {
        text: '中国建设银行',
        isAcv: false,
        type: 3
    }, {
        text: '中国银行',
        isAcv: false,
        type: 4
    }, {
        text: '交通银行',
        isAcv: false,
        type: 5
    }, {
        text: '招商银行',
        isAcv: false,
        type: 6
    }, {
        text: '中信银行',
        isAcv: false,
        type: 7
    }, {
        text: '兴业银行',
        isAcv: false,
        type: 8
    }, {
        text: '中国民生银行',
        isAcv: false,
        type: 9
    }, {
        text: '中国光大银行',
        isAcv: false,
        type: 10
    }]
};

/**
 * debug开发者模式
 */
export const DEBUG = {
    //是否debug模式，true:是, false:否
    IS_DEBUG: true
};

/**
 * 热更新发布的key
 */
export const CODE_PUSH_DEPLOYMENT_KEY = {
    ANDROID: {
        Production: 'TB-u0CplUsgLihogXdpjZdvOpqE_a00f89c3-6618-46d2-bee3-93b3972dd119',
        Staging: 'w0XT17H6Aw8huAVY6-mciDIdJoOva00f89c3-6618-46d2-bee3-93b3972dd119'
    },
    IOS: {
        Production: 'WS_mEwG5s5kDONErdyRiAkPouk1Ua00f89c3-6618-46d2-bee3-93b3972dd119',
        Staging: 'Ho47p9cdJA-6TJwJg5V49mvEVnyNa00f89c3-6618-46d2-bee3-93b3972dd119'
    }
};