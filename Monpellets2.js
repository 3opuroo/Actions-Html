const executeCode = async () => {
    try {
  
      let typee, gazar, type, txt, multiplier, block
      let url = 'https://smartstore.chatbot.mn/chatbot/connect'
  
      switch(param.__payload.intentId){
          case "133489":
              block = "block_13378_fb3fb7d1e831c9b05e86cd7f31da67fc"; 
              typee = "vegetable"
              gazar = "хүлэмжийн талбай"
              break;
          case "133487":
              block = "block_13378_173fcad3ce24d34e7ff68f28cd503621"; 
              typee = "square"
              gazar = "ил талбай"
              break;
      }
  
      const v = (parseInt(param[typee].value) * 0.15)
      
      const msgBuilder = (txt, url, block) => {
        let buttons = [];
        buttons.push(
          {
            title: "Захиалах",
            type: "web_url",
            url: url,
            messenger_extensions: true,
            webview_height_ratio: "tall" 
          },
          {
            title: "Буцах",
            type: "postback",
            payload: block,
          }
        );
        let message2 = {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text: txt,
              buttons,
            },
          },
        };
  
        return message2;
      };
  
      if (v <= 1) {
        txt = `${param[typee].value} м2 ${gazar} бордоход ${v} кг бордоо орох ба та 1кг-ийн савлагаатай бордооноос 1 ширхэгийг хэрэглэхэд тохиромжтой. Та 1 ширхэг 1кг бордоо захиалах уу?`;
        // url = 'https://smartstore.chatbot.mn/productDetail/18627'
        await sendMessage(bot, sender.sender_id, msgBuilder(txt, url, block));
      } else if (1 < v && v < 15) {
        txt = `${param[typee].value} м2 ${gazar} бордоход ${v} кг бордоо орох ба та 1кг-ийн савлагаатай бордооноос ${Math.ceil(
          v
        )} ширхэгийг хэрэглэхэд тохиромжтой. Та ${Math.ceil(
          v
        )} ширхэг 1кг бордоо захиалах уу?`;
        // url = 'https://smartstore.chatbot.mn/productDetail/18627'
        await sendMessage(bot, sender.sender_id, msgBuilder(txt, url, block));
      } else if (15 < v && v < 1000) {
        txt = `${param[typee].value} м2 ${gazar} бордоход ${v} кг бордоо орох ба та 15кг-ийн савлагаатай бордооноос ${Math.ceil(
          v / 15
        )} ширхэгийг хэрэглэхэд тохиромжтой. Та ${Math.ceil(
          v / 15
        )} ширхэг 15кг бордоо захиалах уу?`;
        // url = "https://smartstore.chatbot.mn/productDetail/26656"
        await sendMessage(bot, sender.sender_id, msgBuilder(txt, url, block));
      } else if (1000 < v) {
        txt = `${param[typee].value} м2 ${gazar} бордоход ${v} кг бордоо орох ба та бордоог задгай савлагаатайгаар захиалахад тохиромжтой. Та ${v}кг бордоо захиалах уу?`;
        // url = "https://smartstore.chatbot.mn/productDetail/18629"
        await sendMessage(bot, sender.sender_id, msgBuilder(txt, url, block));
      }
      
  
    } catch (err) {
      // console.log('error imida->',err);
      // logger.error("capitron=>salbar catch error", err.toString());
      sendMessage(bot, sender.sender_id, {
        //   text: "Уучлаарай, мэдээлэл дуудахад алдаа гарлаа",
        text: err.message,
      });
    }
  };
  
  executeCode();