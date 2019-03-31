var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

    const {get} = require('http2-client');
    const h1Target = 'http://www.example.com/';
    const h2Target = 'https://www.example.com/';
    get(h1Target, (res)=>{
        console.log(`
          Url : ${h1Target}
          Status : ${res.statusCode}
          HttpVersion : ${res.httpVersion}
        `);
    });

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //self-signed인 로컬 서버에 요청하는 것이므로 이 설정을 걸어줍시다
    // var spdy = require('spdy');
    // var https = require('https');
    // var agent = spdy.createAgent({
    //     host: 'localhost',
    //     port: 8089,
    //     spdy: {
    //         plain: false //secure를 사용하므로 false를 해줍시다.
    //     }
    // });
    //
    // https.get({host: 'localhost', agent: agent}, function (response) { //response는 stream입니다. //다 끝났으면 agent를 닫아주세요
    //     response.on('data', function (data) {
    //         console.log('response stream: ' + data.toString('utf-8'));
    //         res.send(data);
    //     });
    //     response.on('end', function () {
    //         console.log('response stream end');
    //     });
    //
    //
    //     agent.close();
    // }).end();

    res.send('respond with a resource from ProxyServer');
});

module.exports = router;
