const executeCode = async () => {
  try {
    let agent, agentNumber, email;

    switch (param.agent.value) {
      case "Б.Зоригоо":
        agent = "Б.Зоригоо";
        agentNumber = "98101478";
        email = "b3opuroo@gmail.com";
        break;
      case "Г.Баярмаа":
        agent = "Г.Баярмаа";
        agentNumber = "85010019";
        email = "bayarmaa@rentpay.mn";
        break;
      case "С.Баярчимэг":
        agent = "С.Баярчимэг";
        agentNumber = "85850018";
        email = "bayarchimeg@rentpay.mn";
        break;
      case "Б.Мягмардаш":
        agent = "Б.Мягмардаш";
        agentNumber = "85850014";
        email = "myagmardash@rentpay.mn";
        break;
      case "О.Одонтунгалаг":
        agent = "О.Одонтунгалаг";
        agentNumber = "85850013";
        email = "odontungalag@rentpay.mn";
        break;
      case "Ц.Оймандах":
        agent = "Ц.Оймандах";
        agentNumber = "85850016";
        email = "oimandakh@rentpay.mn";
        break;
      case "М.Өлзийбилэг":
        agent = "М.Өлзийбилэг";
        agentNumber = "85010023";
        email = "ulziibileg1@gmail.com";
        break;
      case "О.Ууганцэцэг":
        agent = "О.Ууганцэцэг";
        agentNumber = "85850021";
        email = "uugantsetseg@rentpay.mn";
        break;
      case "Б.Цэлмэг":
        agent = "Б.Цэлмэг";
        agentNumber = "85850012";
        email = "tselmeg@rentpay.mn";
        break;
      case "Б.Ууганбаатар":
        agent = "Б.Ууганбаатар";
        agentNumber = "85010028";
        email = "uuganbaatar@rentpay.mn";
        break;
      case "М.Тэмүүлин":
        agent = "М.Тэмүүлин";
        agentNumber = "85010016";
        email = "temuulin@rentpay.mn";
        break;
      case "Б.Мөнхбат":
        agent = "Б.Мөнхбат";
        agentNumber = "89087200";
        email = "munkhbat@rentpay.mn";
        break;
    }

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    let cDate = moment(param.contractDate.value, "YYYY/MM/DD");
    let endDate = cDate.add(parseInt(param.rentMonth.value), "M");
    let pDay = parseInt(param.paymentDay.value);
    let paymentToNum = parseFloat(param.payment.value.split(",").join(""));

    let sum = paymentToNum * parseInt(param.rentMonth.value);

    let result = await fetchWithTimeout(
      `https://chatbot.mn/api/document/contract/generate`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 5,
          contract_type: "rentpay",
          agent,
          agentNumber,
          contract_id: agentNumber, //agent num
          tureeslegchRD: param.tureeslegchRD.value,
          tureeslegchLast: param.tureeslegchLast.value,
          tureeslegchFirst: param.tureeslegchFirst.value,
          tureeslegchNum: param.tureeslegchNum.value,
          tureesluulegchRD: param.tureesluulegchRD.value,
          tureesluulegchLast: param.tureesluulegchLast.value,
          tureesluulegchFirst: param.tureesluulegchFirst.value,
          tureesluulegchNum: param.tureesluulegchNum.value,
          address: param.address.value,
          realStateNum: param.realStateNum.value,
          mkv: param.mkv.value,
          roomNum: param.roomNum.value,
          payment: param.payment.value,
          threeMonthPayment:
            param.rentMonth.value === "3" ? "" : param.payment.value,
          rentMonth: param.rentMonth.value,
          bankName: param.bankName.value,
          accountNum: param.accountNum.value,
          factoringAgent: param.factoringAgent.value,
          office:
            "Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг<br />8-р хороо, city tower, 2 давхарт 203 тоот<br />Холбоо барих: 72728000",
          paymentDay: param.paymentDay.value,
          partnerLastName:
            param.partnerLastName.value || "...............................",
          partnerFirstName:
            param.partnerFirstName.value || "...............................",
          partnerRD: param.partnerRD.value || "...............................",
          partnerNumber:
            param.partnerNumber.value || "...............................",
          cDateY: moment(param.contractDate.value).format("YYYY"),
          cDateM: moment(param.contractDate.value).format("MM"),
          cDateD: moment(param.contractDate.value).format("DD"),
          eYear: endDate.format("YYYY"),
          eMonth: endDate.format("MM"),
          eDay: endDate.format("DD"),
          sum: numberWithCommas(sum),
          firstMonth: moment(param.contractDate.value).format("YYYY.MM.DD"),
          secondMonth: moment(param.contractDate.value)
            .add(1, "M")
            .set("date", pDay)
            .format("YYYY.MM.DD"),
          thirdMonth: moment(param.contractDate.value)
            .add(2, "M")
            .set("date", pDay)
            .format("YYYY.MM.DD"),
          fourthMonth:
            param.rentMonth.value === "3"
              ? ""
              : moment(param.contractDate.value)
                  .add(3, "M")
                  .set("date", pDay)
                  .format("YYYY.MM.DD"),
          fifthMonth:
            param.rentMonth.value === "3"
              ? ""
              : moment(param.contractDate.value)
                  .add(4, "M")
                  .set("date", pDay)
                  .format("YYYY.MM.DD"),
          sixthMonth:
            param.rentMonth.value === "3"
              ? ""
              : moment(param.contractDate.value)
                  .add(5, "M")
                  .set("date", pDay)
                  .format("YYYY.MM.DD"),
          firstRemain: numberWithCommas(sum - paymentToNum),
          secondRemain: numberWithCommas(sum - paymentToNum * 2),
          thirdRemain: numberWithCommas(sum - paymentToNum * 3),
          fourthRemain:
            param.rentMonth.value === "3"
              ? ""
              : numberWithCommas(sum - paymentToNum * 4),
          fifthRemain:
            param.rentMonth.value === "3"
              ? ""
              : numberWithCommas(sum - paymentToNum * 5),
          sixthRemain:
            param.rentMonth.value === "3"
              ? ""
              : numberWithCommas(sum - paymentToNum * 6),
          ownerName: `${param.tureesluulegchLast.value[0]}.${param.tureesluulegchFirst.value}`,
          buyerName: `${param.tureeslegchLast.value[0]}.${param.tureeslegchFirst.value}`,
          holslohContractNumber: `${moment().format("YY")}/${
            param.holslohContractNumber.value
          }`,
          zuuchlahContractNumber: `${moment().format("YY")}/${
            param.zuuchlahContractNumber.value
          }`,
          factoringContractNumber: `${moment().format("YY")}/${
            param.factoringContractNumber.value
          }`,
        }),
        method: "POST",
      },
      10000
    );

    sendMail(email, result.result.url);
    sendMessage(bot, sender.sender_id, {
      text: "Мэдээллийг амжилттай баталгаажуулж, таны имэйл хаяг руу илгээлээ",
    });
  } catch (err) {
    logger.error("Numer catch error", err.toString());
    sendMessage(bot, sender.sender_id, {
      text: "Уучлаарай, мэдээлэл дуудахад алдаа гарлаа",
    });
  }
};

const sendMail = (email, url) => {
  let payload = `<html>
    <head>
        <title>Гэрээ</title>
    </head>
    <body>
        <div>
            <h3>Эрхэм харилцагч таньд энэ өдрийн мэнд хүргэе!</h3>
            <p>Таны гэрээ баталгаажсан бөгөөд доорх линкээр орж гэрээгээ татаж авна уу.</p>
            <p><a href="${url}"><strong>Гэрээ татах</strong></a></p>
            <p>Чатбот ХХК</p>
        </div>
    </body>
    </html>`;
  let mailParam = {
    to: email,
    subject: "Гэрээ",
    payload: payload,
  };

  fetchWithTimeout("https://chatbot.mn/api/common/mail/send", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(mailParam),
  })
    .then((json) => {
      console.log("Send order mail result", json);
    })
    .catch((err) => {
      console.log("Send order mail err", err.message);
    });
};

executeCode();
