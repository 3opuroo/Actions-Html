const executeCode = async () => {
  try {
    var encodedDoctor = encodeURIComponent(param.doctor);
    let result = await fetchWithTimeout(
      `https://chatbot.mn/api/cuticul/calendar/${param.calendarId}?doctor=${encodedDoctor}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "GET",
      },
      10000
    );
    let dates = result.result.data;
    if (dates == "No upcoming events found.") {
      dates = [];
      for (let d = 0; d < 5; d++) {
        let now = new Date();
        let days = now.setDate(now.getDate() + d);
        let weekDay = now.getDay();
        let startEvent = 10;
        let endEvent = 18;

        if (weekDay >= 1 && weekDay <= 5) {
          startEvent = 9;
          endEvent = 20;
        }
        for (let h = startEvent; h < endEvent; h++) {
          let hours = now.setHours(h, 0, 0);
          dates.push(moment(hours).format());
        }
      }
    }

    let filteredDate = dates
      .filter((e) => new Date(e).getTime() > new Date())
      .map((e) => {
        return {
          date: moment(e).format("YYYY-MM-DD"),
          time: moment(e).format("HH:ss"),
        };
      });

    const groupedDate = Object.values(
      filteredDate.reduce((acc, el) => {
        acc[el.date] = acc[el.date] || { date: el.date, time: [] };
        acc[el.date].time.push(el.time);
        return acc;
      }, {})
    );

    await sendMessage(bot, sender.sender_id, { text: "Бусад боломжит өдрүүд" });

    let elementList = [];
    for (let i = 1; i < groupedDate.length; i++) {
      let element = {};
      element.title = `${groupedDate[i].date}`;
      element.subtitle = `${groupedDate[i].time.toString()}`;
      let buttonList = [];
      let button = {
        title: `Захиалах`,
        type: "postback",
        payload: `/api/action/call?actionId=746&calendarId=${param.calendarId}&doctor=${param.doctor}&date=${groupedDate[i].date}`,
      };
      buttonList.push(button);
      element.buttons = buttonList;
      elementList.push(element);
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

    let quick_replies = [];
    for (let i = 0; i < groupedDate[0].time.length; i++) {
      let quick_reply = {
        title: groupedDate[0].time[i],
        content_type: "text",
        payload: `/api/intent/call?intentId=145707&calendarId=${param.calendarId}&doctor=${param.doctor}&date=${groupedDate[0].date}&time=${groupedDate[0].time[i]}`,
      };

      quick_replies.push(quick_reply);
    }

    let message01 = {
      text: `${param.doctor} эмчид ${groupedDate[0].date}-ны өдөр доорх цагуудад захиалга өгөх боломжтой. Та цагаа сонгон бүртгүүлнэ үү`,
      quick_replies,
    };

    await sendMessage(bot, sender.sender_id, message01);
  } catch (err) {
    logger.error("capitron=>salbar catch error", err.toString());
    sendMessage(bot, sender.sender_id, {
      text: err.message,
    });
  }
};
executeCode();
