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
    let _title = "Буцах";
    let weekend = "Амарна";

    let numToEmoji = (num) => {
      if (num === "1") return "✅";
      else return "❌";
    };

    let timeToText = (n1, n2, n3, n4) => {
      if (n1 === "00:00" && n2 === "00:00" && n3 === "00:00" && n4 === "00:00")
        return weekend;
      else return "";
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
      _title = "Back";
      weekend = "Closed";
    }

    let text1;
    if (param.type === "atm" || param.type === "express") {
      text1 = `${address}\n\n`;
      text1 += `${phone}: ${param.phone}\n\n`;
      text1 += `${param.timeTable.replace(/(<([^>]+)>)/gi, "")}`;
    } else if (param.type === "kiosk") {
      text1 = `${address}\n\n`;
      text1 += `${phone}: ${param.phone}\n\n`;
      text1 += `${monday} - ${sunday}: ${param.mondayStart} - ${param.sundayEnd}\n`;
    } else {
      text1 = `${address}\n\n`;
      text1 += `Express: ${numToEmoji(param.express)}\n`;
      text1 += `Kiosk: ${numToEmoji(param.kiosk)}\n`;
      text1 += `${wheelchair}: ${numToEmoji(param.wheelchair)}\n`;
      text1 += `${phone}: ${param.phone}\n\n`;
      text1 += `${monday}: ${
        param.mondayStart === "00:00"
          ? "Амарна"
          : `${param.mondayStart} - ${param.mondayEnd}`
      }\n`;
      text1 += `${tuesday}: ${
        param.tuesdayStart === "00:00"
          ? "Амарна"
          : `${param.tuesdayStart} - ${param.tuesdayEnd}`
      }\n`;
      text1 += `${wednesday}: ${
        param.wednesdayStart === "00:00"
          ? "Амарна"
          : `${param.wednesdayStart} - ${param.wednesdayEnd}`
      }\n`;
      text1 += `${thursday}: ${
        param.thursdayStart === "00:00"
          ? "Амарна"
          : `${param.thursdayStart} - ${param.thursdayEnd}`
      }\n`;
      text1 += `${friday}: ${
        param.fridayStart === "00:00"
          ? "Амарна"
          : `${param.fridayStart} - ${param.fridayEnd}`
      }\n`;
      text1 += `${saturday}: ${
        param.saturdayStart === "00:00"
          ? "Амарна"
          : `${param.saturdayStart} - ${param.saturdayEnd}`
      }\n`;
      text1 += `${sunday}: ${
        param.sundayStart === "00:00"
          ? "Амарна"
          : `${param.sundayStart} - ${param.sundayEnd}`
      }\n`;
    }
    let message2 = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: text1,
          buttons: [
            {
              title: _title,
              type: "postback",
              payload: `/api/action/call?actionId=322&lang=${
                param.lang
              }&currentIndex=${currentIndex - 1}&provinceCode=${
                param.provinceCode
              }&type=${param.type}`,
            },
          ],
        },
      },
    };

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
