var express = require('express');
var router = express.Router();

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { s_exec } = require('child_process');
async function ls() {
	const { stdout, stderr } = await exec('ls');
	console.log('stdout: ', stdout);
	console.log('stderr: ', stderr);
}

async function custom_exec(cmd){
	const { stdout, stderr } = await exec(cmd);
	if(stdout)
		console.log('stdout: ', stdout);
	if(stderr)
		console.log('stderr: ', stderr);
}

async function tc(delay){
	console.log(delay+" is ok.");
	let cmd = 'tc qdisc add dev enp0s3 root netem delay '+delay+'ms';
	const { stdout, stderr } = await exec(cmd);

	if(stdout)
		console.log('stdout: ', stdout);
	if(stderr)
		console.log('stderr: ', stderr);
	else{
		//for 1 ~ 10
		//start_time
		//test();
		const { stdout, stderr } = await exec('ping -c 10 8.8.8.8');

		if(stdout)
			console.log('stdout: ', stdout);
		if(stderr)
			console.log('stderr: ', stderr);
		//end_time
		//result = end_time - start_time
		//array.add(result);

		//send(array)
		custom_exec('tc qdisc show dev enp0s3')
			.then(()=>{
				console.log('test end.');
				custom_exec('sudo tc qdisc del dev enp0s3 root');

			});
	}

}

function test(){
//	custom_exec('ping -c 10 8.8.8.8');
	let cmd = 'ping -c 10 8.8.8.8';
}

function http2client(){
	const http2 = require('http2');
//	const fs;
}

/* GET home page. */
router.get('/', function(req, res, next) {
	let delay = req.query.delay;
	tc(delay);
  res.render('index', { title: 'Express' });
});

module.exports = router;
