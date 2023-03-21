const executeCode = async () => {
    try {
        let { currentIndex = 0} = param || {};
    if (currentIndex) {
      currentIndex = parseInt(currentIndex);
    }
        let districts = [
            {name: "Сүхбаатар", enName: "Sukhbaatar", provinceCode: 2004},
            {name: "Чингэлтэй", enName: "Chingeltei", provinceCode: 2005},
            {name: "Баянгол", enName: "Bayangol", provinceCode: 2006},
            {name: "Баянзүрх", enName: "Bayanzurkh", provinceCode: 2003},
            {name: "Хан-уул", enName: "Khan-Uul", provinceCode: 2007},
            {name: "Сонгинохайрхан", enName: "Songinokhairkhan", provinceCode: 2008},
            {name: "Налайх", enName: "Nalaikh", provinceCode: 2002},
            {name: "Багануур", enName: "Baganuur", provinceCode: 9001},
        ]

        let ruralAreas= [
            [{name: "Архангай", enName: "Arkhangai", provinceCode: '01'},
            {name: "Баян-Өлгий", enName: "Bayan-Ulgii", provinceCode: '02'},
            {name: "Баянхонгор", enName: "Bayankhongor", provinceCode: '03'},
            {name: "Булган", enName: "Bulgan", provinceCode: '04'},
            {name: "Говь-Алтай", enName: "Govi-Altai", provinceCode: '05'},
            {name: "Говьсүмбэр", enName: "Govisumber", provinceCode: '22'},
            {name: "Дархан-Уул", enName: "Darkhan-Uul", provinceCode: '19'},
            {name: "Дорноговь", enName: "Dornogovi", provinceCode: '06'},
            {name: "Дорнод", enName: "Dornod", provinceCode: '07'}],
            [{name: "Дундговь", enName: "Dundgovi", provinceCode: '08'},
            {name: "Завхан", enName: "Zavkhan", provinceCode: '09'},
            //{name: "Замын-Үүд", enName: "Zamiin-Uud", provinceCode: 2004},
            {name: "Орхон", enName: "Orkhon", provinceCode: '21'},
            {name: "Өвөрхангай", enName: "Uvurkhangai", provinceCode: '10'},
            {name: "Өмнөговь", enName: "Umnogovi", provinceCode: '11'},
            {name: "Сүхбаатар", enName: "Sukhbaatar", provinceCode: '12'},
            {name: "Сэлэнгэ", enName: "Selenge", provinceCode: '13'},
            {name: "Төв", enName: "Tuv", provinceCode: '14'},
            {name: "Увс", enName: "Uvs", provinceCode: '15'}],
            [{name: "Ховд", enName: "Khovd", provinceCode: '16'},
            {name: "Хөвсгөл", enName: "Khuvsgol", provinceCode: '17'},
            {name: "Хэнтий", enName: "Khentii", provinceCode: '18'}]
        ]
        
        let quickReplies = []
        let locationName = districts
        let text = "Дүүргээ сонгоно уу!"
        let _name = "name"
        let _title = "Бусад"
        
        if(param.lang === "en"){
            text = "Choose district!"
            _name = "enName"
        }

        if(param.location === "rural"){
            locationName = ruralAreas[currentIndex]
            text = "Аймгаа сонгоно уу!"
        }

        if(param.location === "rural" && param.lang === "en"){
            locationName = ruralAreas[currentIndex]
            text = "Choose province!"
            _name = "enName"
            _title = "More"
        }


        for(let i = 0; i < locationName.length; i++){
              quickReplies.push({
                title: locationName[i][_name],
                content_type: "text",
                payload: `/api/action/call?actionId=312&provinceCode=${locationName[i].provinceCode}&location=${param.location}&lang=${param.lang}&type=${param.type}`
            }) 
        }

        if(quickReplies.length === 9){
            locationName = ruralAreas
            text,
            quickReplies.push(
                {
                    title: _title,
                    content_type: "text",
                    payload: `/api/action/call?actionId=311&location=${param.location}&currentIndex=${currentIndex + 1}&lang=${param.lang}`
                }
            )
        }
 
        let districtMsg = {
            text,
            quick_replies: quickReplies
        }
        
        
        await sendMessage(bot, sender.sender_id, districtMsg)
        
    } catch (err) {
      // console.log('error imida->',err);
      logger.error("capitron=>salbar catch error", err.toString());
      sendMessage(bot, sender.sender_id, {
      //   text: "Уучлаарай, мэдээлэл дуудахад алдаа гарлаа",
      text: err.message
      });
    }
  };
  
  executeCode();