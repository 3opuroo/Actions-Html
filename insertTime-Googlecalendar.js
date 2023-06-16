const executeCode = async () => {
  let { username = {}, phone = {}, time = {} } = param;
  username = username.value;
  phone = phone.value;
  // time = `${time.value}:00`;

  let startDate = moment(`${param.__payload.date} ${param.__payload.time}`).format();
  let endDate = moment(startDate).add(1, "hours").format();

  // if (param.__payload.date === moment().format("YYYY-MM-DD") && moment(`${moment().format("YYYY-MM-DD")} ${time}`).format("HH:ss") < moment().format("HH:ss")) {
  //   await sendMessage(bot, sender.sender_id, {
  //     text: "Та зөвхөн боломжит цагт захиалга өгнө үү.",
  //   });
  //   // await sendMessage(bot, sender.sender_id, {
  //   //   text: "Дахин эхлэх",
  //   //   quick_replies: [
  //   //     {
  //   //       title: "Дахин эхлэх",
  //   //       content_type: "text",
  //   //       payload: `/api/intent/call?intentId=141537&calendarId=${param.__payload.calendarId}&doctor=${param.__payload.doctor}&date=${param.__payload.groupedDate[i].date}`,
  //   //     },
  //   //   ],
  //   // });
  //   return;
  // }

  try {
    let result = await fetchWithTimeout(
      `https://chatbot.mn/api/cuticul/calendar/${param.__payload.calendarId}/event`,
      {
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          summary: param.__payload.doctor,
          description: `${username}, ${phone}`,
          start: {
            dateTime: startDate,
          },
          end: {
            dateTime: endDate,
          },
        }),
        method: "POST",
      },
      10000
    );

    if (result.result.data.status === "confirmed") {
      let text1 = `Таны бөглөсөн мэдээлэл:\n`;
      text1 += `⭐ Нэр: ${username}\n`;
      text1 += `⭐ Утасны дугаар: ${phone}\n`;
      text1 += `⭐ Эмч: ${param.__payload.doctor}\n`;
      text1 += `⭐ Захиалгын цаг: ${param.__payload.date} ${param.__payload.time}`;

      let message = {
        text: text1,
      };
      await sendMessage(bot, sender.sender_id, message);

      let message1 = {
        text: "Таны мэдээллийг бүртгэж авлаа. Та цагаа цуцлах бол дугаарт залгаж цуцална уу. Баярлалаа",
      };
      await sendMessage(bot, sender.sender_id, message1);
    }

    if (
      result.result.data === "Уучлаарай таны захиалсан цаг захиалгатай байна."
    ) {
      await sendMessage(bot, sender.sender_id, {
        text: "Уучлаарай таны сонгосон цаг захиалгатай байна.",
      });
    }
    if (result.result.data === "Та цагийн хуваарийн дагуу захиалга өгнө үү") {
      await sendMessage(bot, sender.sender_id, {
        text: "Та цагийн хуваарийн дагуу захиалга өгнө үү",
      });
    }
  } catch (err) {
    logger.error("capitron=>salbar catch error", err.toString());
    sendMessage(bot, sender.sender_id, {
      text: "Уучлаарай, мэдээлэл дуудахад алдаа гарлаа",
    });
  }
};
executeCode();
