/**
 * Created by xujiazhe on 16/4/27.
 */
var http = require("http");

var cheerio = require("cheerio");
var nodemailer = require("nodemailer");

var settings = require('./settings');

var smtpTransport = nodemailer.createTransport("SMTP", smtp);
var omsi_inpsiral_buy_url = 'http://omsi.in/?s=Inspiral+SR&post_type=product';

function url_get(url, callback) {
    http.get(url, function (res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            callback(data);
        });
    }).on("error", function () {
        callback(null);
    });
}


url_get(omsi_inpsiral_buy_url, function (data) {
    if (data === null) {
        var mailOptions = settings.mail;
        mailOptions.subject = 'some error when url_get';
        mailOptions.html = '<p>出错了</p>'
        sendEmail(mailOptions);
        console.log('some error when url_get');
        return;
    }

    var $ = cheerio.load(data);
    var $buy_buttons = $('#content > ul > li > div > a:nth-child(2)');
    var item_onsale_count = 0;

    $buy_buttons.each(function (i, item) {
        var text = $(item).text();
        //  Add to cart       Read More
        if (text == "Add to cart") {
            item_onsale_count++;
        }
    });

    if (item_onsale_count !== 0) {
        var mailOptions = settings.mail;
        sendEmail(mailOptions);
    }else {
        smtpTransport.close();
    }
});

// 开启一个 SMTP 连接池
function sendEmail(mailOptions){
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // 如果没用，关闭连接池
    });
}