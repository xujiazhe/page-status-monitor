/**
 * Created by xujiazhe on 16/4/10.
 */


module.exports = {
    mail: {
        from: '"name" <name@126.com>', // sender address
        to: 'name@126.com', // list of receivers
        subject: '药物到了', // Subject line
        html: '<b>Hello world 🐴</b>'// html body
    },
    smtp: {
        host: "smtp.126.com", // 主机
        port: 25, // SMTP 端口
        auth: {
            user: "name@mail.com", // 账号
            pass: "" // 密码
        }
    }
};
