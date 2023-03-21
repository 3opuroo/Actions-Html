const executeCode = async () => {
  try {
    let pageSize = 9;
    let { currentIndex = 0 } = param || {};
    if (currentIndex) {
      currentIndex = parseInt(currentIndex);
    }

    let result = await fetchWithTimeout(
      `https://kb-api.bits.mn/api/back/brtest?lat=&long=&location=${param.provinceCode}&day=all&accessibility=false&${param.type}=true`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "GET",
      },
      10000
    );

    let json = (result || {}).result;
    if (!json || json.length < 1) {
      sendMessage(bot, sender.sender_id, {
        text: "Уучлаарай, мэдээлэл дуудахад алдаа гарлаа",
      });
      return;
    }

    // let filteredDistrict = json?.filter(
    //     (e) => e.address.includes(param.short) && e.type === param.type
    //   );

  //   let branches = [];
  //   let atm = [];
  //   let type = branches;

  //   if ((param.provinceCode == 20)) {
  //     let filtered = json.filter(e => e.provinceCode.includes(param.code))
  //     for (let i = 0; i < filtered.length; i++) {
  //       if (filtered[i].type === "2") atm.push(filtered[i]);
  //       if (filtered[i].type === "3") atm.push(filtered[i]);
  //       if (filtered[i].type === "8") atm.push(filtered[i]);
  //       if (filtered[i].type === "1") branches.push(filtered[i]);
  //       if (filtered[i].type === "4") branches.push(filtered[i]);
  //       if (filtered[i].type === "5") branches.push(filtered[i]);
  //       if (filtered[i].type === "7") branches.push(filtered[i]);
  //       if (filtered[i].type === "6") branches.push(filtered[i]);
  //     }
  //   } else {
  //       for (let i = 0; i < json.length; i++) {
  //           if (json[i].type === "2") atm.push(json[i]);
  //           if (json[i].type === "3") atm.push(json[i]);
  //           if (json[i].type === "8") atm.push(json[i]);
  //           if (json[i].type === "1") branches.push(json[i]);
  //           if (json[i].type === "4") branches.push(json[i]);
  //           if (json[i].type === "5") branches.push(json[i]);
  //           if (json[i].type === "7") branches.push(json[i]);
  //           if (json[i].type === "6") branches.push(json[i]);
  //         }
  //   }

   
    let _name = "nameMN";
    let _address = "addressMN";
    let _title1 = `Хаяг/цагийн хуваарь`;
    let _title2 = `Байршил (Map)`;
    let _title3 = "Бусад салбар";
    let _title4 = "Дараах";
    let _subtitle = `салбарын мэдээлэл харах боломжтой байна.`;

  //   if (param.type === "atm") {
  //     type = atm;
  //   }
    if (json.length === 0) {
      sendMessage(bot, sender.sender_id, {
        text: "Тус бүсийн мэдээлэл байхгүй байна",
      });
      return;
    }
    if (param.lang === "en") {
      _name = "nameEN";
      _address = "addressEN";
      _title1 = `Address/Timetable`;
      _title2 = `Location (Map)`;
      _title3 = `Other branches`;
      _title4 = "More";
      _subtitle = `more available`;
    }

    if (param.lang === "en" && param.type === "atm") {
      _name = "nameEN";
      _address = "addressEN";
      _title1 = `Address/Timetable`;
      _title2 = `Location (Map)`;
      _title3 = `Other branches`;
      _title4 = "More";
      _subtitle = `more available`;
    }

    let chunked = [];
    const total = json.length - pageSize * (currentIndex + 1);

    for (let i = 0; i < json?.length; i += pageSize) {
      const slicedArr = json.slice(
        i,
        i + pageSize + (i + pageSize + 1 === json.length ? 1 : 0)
      );

      chunked.push(slicedArr);
    }

    let locationList = chunked[currentIndex];

    let elementList = [];
    for (let i = 0; i <= locationList.length - 1; i++) {
      let element = {};
      element.title = locationList[i][_name];
      element.subtitle = locationList[i][_address];
      element.image_url = locationList[i].thumbImageurl;
      // if (param.type === "branch" && param.location === "ub") {
      //   element.subtitle = locationList[i].phone;
      //   element.image_url = locationList[i].image;
      // }

      let buttonList = [
        {
          title: _title1,
          type: "postback",
          payload: `/api/action/call?actionId=313
              &addressMN=${locationList[i].addressMN}&addressEN=${
            locationList[i].addressEN
          }&atm=${locationList[i].atm}&express=${
            locationList[i].express
          }&kiosk=${locationList[i].kiosk}&wheelchair=${
            locationList[i].is_wheelchair
          }&currency=${locationList[i].currency}&card=${
            locationList[i].card
          }&international=${locationList[i].international}&saving=${
            locationList[i].saving
          }&phone=${locationList[i].phone1}&mondayStart=${
            locationList[i].d1_start
          }&mondayEnd=${locationList[i].d1_end}&tuesdayStart=${
            locationList[i].d2_start
          }&tuesdayEnd=${locationList[i].d2_end}&wednesdayStart=${
            locationList[i].d3_start
          }&wednesdayEnd=${locationList[i].d3_end}&thursdayStart=${
            locationList[i].d4_start
          }&thursdayEnd=${locationList[i].d4_end}&fridayStart=${
            locationList[i].d5_start
          }&fridayEnd=${locationList[i].d5_end}&saturdayStart=${
            locationList[i].d6_start
          }&saturdayEnd=${locationList[i].d6_end}&sundayStart=${
            locationList[i].d7_start
          }&sundayEnd=${locationList[i].d7_end}&lang=${
            param.lang
          }&provinceCode=${param.provinceCode}&currentIndex=${
            currentIndex + 1
          }&type=${param.type}&timeTable=${locationList[i].time_table_description}`,
        },
        {
          title: _title2,
          type: "web_url",
          // url: `https://www.google.com/maps/place/${locationList[i].latitude},${locationList[i].longitude}`,
          url: `https://chatbot.mn/api/webform/khanbank/map?lat=${locationList[i].latitude}&lng=${locationList[i].longitude}&type=${locationList[i].type}`,
          messenger_extensions: true,
          webview_height_ratio: "tall",
        },
      ];
      element.buttons = buttonList;
      elementList.push(element);
    }
    if (elementList.length === 9 && total > 1) {
      elementList.push({
        title: _title3,
        subtitle: `${total + " " + _subtitle}`,
        buttons: [
          {
            title: _title4,
            type: "postback",
            payload: `/api/action/call?actionId=312&type=${
              param.type
            }&provinceCode=${param.provinceCode}&currentIndex=${
              currentIndex + 1
            }&lang=${param.lang}`,
          },
        ],
      });
    }

    let message = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          image_aspect_ratio: "horizontal",
          elements: elementList,
        },
      },
    };

    await sendMessage(bot, sender.sender_id, message);
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
