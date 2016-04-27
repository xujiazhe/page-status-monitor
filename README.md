crontab -e

#每天检查 页面,如果这个网站的东西有货了,就短信通知我
 0 0 * * * cd /path/to/index.js; node index.js 2>&1 >>.log
