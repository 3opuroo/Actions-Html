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
    let endDate = cDate.add(parseInt(param.zuuchlahMonth.value), "M");
    let paymentToNum = parseFloat(param.payment.value.split(",").join(""));

    let result = await fetchWithTimeout(
      `https://chatbot.mn/api/document/contract/generate`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 7,
          contract_type: "rentpay",
          agent,
          agentNumber,
          contract_id: agentNumber, //agent num
          tureesluulegchRD: param.tureesluulegchRD.value,
          tureesluulegchLast: param.tureesluulegchLast.value,
          tureesluulegchFirst: param.tureesluulegchFirst.value,
          tureesluulegchNum: param.tureesluulegchNum.value,
          address: param.address.value,
          realStateNum: param.realStateNum.value,
          payment: param.payment.value,
          office:
            "Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг<br />8-р хороо, city tower, 2 давхарт 203 тоот<br />Холбоо барих: 72728000",
          cDateY: moment(param.contractDate.value).format("YYYY"),
          cDateM: moment(param.contractDate.value).format("MM"),
          cDateD: moment(param.contractDate.value).format("DD"),
          eYear: endDate.format("YYYY"),
          eMonth: endDate.format("MM"),
          eDay: endDate.format("DD"),
          ownerName: `${param.tureesluulegchLast.value[0]}.${param.tureesluulegchFirst.value}`,
          zuuchlahContractNumber: `${moment().format("YY")}/${
            param.zuuchlahContractNumber.value
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
    sendMessage(bot, sender.sender_id, {
      text: err.message,
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
