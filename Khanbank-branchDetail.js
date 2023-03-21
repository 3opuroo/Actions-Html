const executeCode = async () => {
  try {
    let pageSize = 9;
    let { currentIndex = 0 } = param || {};
    if (currentIndex) {
      currentIndex = parseInt(currentIndex);
    }

    let address = `Хаяг: ${param.addressMN}`;
    let wheelchair = "Налуу зам";
    let currency = "Валютын арилжаа";
    let card = "Картын үйлчилгээ";
    let international = "Олон улсын гүйлгээ";
    let saving = "Хадгаламжийн үйлчилгээ";
    let monday = "Даваа";
    let tuesday = "Мягмар";
    let wednesday = "Лхагва";
    let thursday = "Пүрэв";
    let friday = "Баасан";
    let saturday = "Бямба";
    let sunday = "Ням";
    let phone = "Утас";
    let timetable = "Цагийн хуваарь";
    let _title = "Буцах"
    let weekend = "Амарна"

    let numToEmoji = (num) => {
      if (num === "1") return "✅";
      else return "❌";
    };

    let timeToText = (n1, n2, n3, n4) => {
      if (n1 === "00:00" && n2 === "00:00" && n3 === "00:00" && n4 === "00:00") return weekend;
      else return ""
    };

    if (param.lang === "en") {
      address = `Address: ${param.addressEN}`;
      wheelchair = "Wheelchair access";
      currency = "Foreign exchange";
      card = "Card service";
      international = "International money transfer";
      saving = "Saving service";
      monday = "Mon";
      tuesday = "Tuesday";
      wednesday = "Wednesday";
      thursday = "Thursday";
      friday = "Fri";
      saturday = "Sat";
      sunday = "Sun";
      phone = "Phone";
      timetable = "Timetable";
      _title = 'Back'
      weekend = "Closed"
    }

    let text1
    if(param.type === "atm" || param.type === "express") {
      text1 = `${address}\n\n`;
    text1 += `${phone}: ${param.phone}\n\n`;
    text1 += `${param.timeTable.replace(/(<([^>]+)>)/gi, "")}`;
    } else if(param.type === "kiosk"){
      text1 = `${address}\n\n`;
    text1 += `${phone}: ${param.phone}\n\n`;
    text1 += `${monday} - ${sunday}: ${param.mondayStart} - ${param.sundayEnd}\n`;
    } else {
    text1 = `${address}\n\n`;
    text1 += `ATM: ${numToEmoji(param.atm)}\n`;
    text1 += `Express: ${numToEmoji(param.express)}\n`;
    text1 += `Kiosk: ${numToEmoji(param.kiosk)}\n`;
    text1 += `${wheelchair}: ${numToEmoji(param.wheelchair)}\n`;
    text1 += `${currency}: ${numToEmoji(param.currency)}\n`;
    text1 += `${card}: ${numToEmoji(param.card)}\n`;
    text1 += `${international}: ${numToEmoji(param.international)}\n`;
    text1 += `${saving}: ${numToEmoji(param.saving)}\n\n`;
    text1 += `${phone}: ${param.phone}\n\n`;
    text1 += `${monday} - ${friday}: ${param.mondayStart} - ${param.fridayEnd}\n`;
    text1 += `${saturday}, ${sunday}: ${timeToText(param.saturdayStart, param.saturdayEnd, param.sundayStart, param.sundayEnd)}`;
    }
    let message2 = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: text1,
                buttons: [
                    {
                        "title": _title,
                        "type": "postback",
                        "payload": `/api/action/call?actionId=312&lang=${param.lang}&currentIndex=${currentIndex - 1}&provinceCode=${param.provinceCode}&type=${param.type}`
                    },
                ]
            }
        }
    }

    await sendMessage(bot, sender.sender_id, message2);
    //await sendMessage(bot, sender.sender_id, {text: filteredDistrict[0].name});
  } catch (err) {
    // console.log('error imida->',err);
    sendMessage(bot, sender.sender_id, {
      //   text: "Уучлаарай, мэдээлэл дуудахад алдаа гарлаа",
      text: err.message,
    });
  }
};

executeCode();
