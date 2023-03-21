const executeCode = async () => {
    try {
      let email = 'care@rentpay.mn'
        let result = await fetchWithTimeout(
            `https://chatbot.mn/api/document/contract/generate`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
              contract_type: "rentpay",
              agent: param.agent.value,
              agentNumber: param.agentNumber.value,
	            contract_id: param.agentNumber.value, //agent num
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
	            rentMonth: param.rentMonth.value,
              bankName: param.bankName.value,
              accountNum: param.accountNum.value,
              factoringAgent: param.factoringAgent.value,
              office: "Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг<br />8-р хороо, city tower<br />2 давхарт, 203тоот<br />Холбоо барих: 72728000",
	            contractDate: param.contractDate.value,
	            paymentDay: param.paymentDay.value,
	            partnerLastName: param.partnerLastName.value,
	            partnerFirstName: param.partnerFirstName.value,
              partnerRD: param.partnerRD.value,
              partnerNumber: param.partnerNumber.value
              }),
              method: "POST",
            },
            10000
          );
            
          sendMail(email, result.result.url)
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
    </html>`
    let mailParam = {
        to: email,
        subject: 'Гэрээ',
        payload: payload
    }

    fetchWithTimeout('https://chatbot.mn/api/common/mail/send', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(mailParam)
        })
        .then((json) => {
            console.log('Send order mail result', json)
        })
        .catch((err) => {
            console.log('Send order mail err', err.message)
        })
}
  
  executeCode();
  