const util = require('util');
const exec = util.promisify(require('child_process').exec);

// tc 명령어는 나가는 traffic에 한하여 제한하므로 서버 여는 동시에 실행
// 
class trafficShaping {
    constructor(){        
        var settings = {
            port: portNum,
        };
        this.portNum = portNum
        this.server = new mosca.Server(settings);
    }

    async custom_exec(cmd){
        const { stdout, stderr } = await exec(cmd);
        if(stdout)
            console.log('stdout: ', stdout);
        if(stderr)
            console.log('stderr: ', stderr);
    }    

    // traffic 제한 설정
    async tc(delay){
        console.log(delay+" is ok.");
        let cmd = 'tc qdisc add dev enp0s3 root netem delay '+delay+'ms';
        const { stdout, stderr } = await exec(cmd);
    
        if(stdout)
            console.log('stdout: ', stdout);
        if(stderr)
            console.log('stderr: ', stderr);
        else{
            console.log('traffic shaping complete');
            
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

}

module.exports = trafficShaping;