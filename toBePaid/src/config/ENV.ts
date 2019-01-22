let env = 'mock';
let host = '';

switch (env) {
    case "mock":
        host = "http://47.92.122.205:3000/mock/13/";
        break;
    case "env":
        host = "http://006yinh.qnbug.cn/api/";
        break;
    case "prod":
        host = "https://www.taskhome.com.cn/api/";
        break;
}

export const ENV = {
    host: host
};