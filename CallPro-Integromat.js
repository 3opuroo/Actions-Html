
const executeCode = async () => {
    try {
        let { phonenumber = {}, email = {}, companyName = {}, additionalINF = {} } = param;
        phonenumber = phonenumber.value || '';  
        email = email.value || '';
        companyName = companyName.value || '';  
        //additionalINF = additionalINF.value || '';

        let serviceName = ""
        switch(param.__form_id){
            case 5359:
                serviceName = "Call Pro"
                break;
            case 5360:
                serviceName = "Message Pro"
                break;
            case 5361:
                serviceName = "CRM"
                break
            case 5362:
                serviceName = "Telemarketing"
                break;
            case 5363:
                serviceName = "Meeting.mn"
                break;
            case 5364:
                serviceName = "Oticket"
                break
            case 5365:
                serviceName = "Hybrid PBX"
                break;
            case 5366:
                serviceName = "RTC"
                break;
            case 5367:
                serviceName = "Viber"
                break
            case 5368:
                serviceName = "Boostly"
                break;
            case 5369:
                serviceName = "Microsoft teams"
                break;
        }

        let result = await fetch('https://hook.integromat.com/6gado1h2ow6p2qqogjbkg8jxd6um99uf', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                companyName,
                phonenumber,
                email,
                serviceName
            })
        });

        if (result && result.status == '200') {
           let message = {
			text: 'Таны хүсэлтийг хүлээн авлаа. Манай худалдааны төлөөлөгч тантай эргэн холбогдох болно.'
		}
            sendMessage(bot, sender.sender_id, message);             
        } 

  }
  catch (err) {
    console.log('promise catch', err)
  }
}
executeCode();