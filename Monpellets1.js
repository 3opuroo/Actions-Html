const executeCode = async () => {
    try {
  
      let typee, gazar, type, txt, multiplier, block
      let url = 'https://smartstore.chatbot.mn/chatbot/connect'
  
      switch(param.__payload.intentId){
          case "133484":
              type = "Тасалгааны цэцэг"; 
              block = "block_13378_60cf8e9fc50812179756d15aa123e81b"; 
              multiplier = 10
              typee = "flower"
              gazar = "хөрсөнд"
              break;
          case "133486":
              type = "Жимс жимсгэнэ"; 
              block = "block_13378_0247dce3d785198a54e2cb41733e0265"; 
              multiplier = 50
              typee = "fruit"
              gazar = "суулгацанд"
              break;
          case "133488":
              type = "Мод бут"; 
              block = "block_13378_65bdb2a4c2c0d02de382cc407cbe44af"; 
              multiplier = 250
              typee = "tree"
              gazar = "модлог ургамалд"
              break;
      }
  
      const v = (parseInt(param[typee].value) * multiplier) / 1000
      
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
        txt = `${type} бордоход ${param[typee].value} ${
          param.__payload.intentId === "133484" ? "литр" : "ширхэг"
        } ${gazar} ${v} кг бордоо орох ба та 1кг-ийн савлагаатай бордооноос 1 ширхэгийг хэрэглэхэд тохиромжтой. Та 1 ширхэг 1кг бордоо захиалах уу?`;
        // url = 'https://smartstore.chatbot.mn/productDetail/18627'
        await sendMessage(bot, sender.sender_id, msgBuilder(txt, url, block));
      } else if (1 < v && v < 15) {
        txt = `${type} бордоход ${param[typee].value} ${
          param.__payload.intentId === "133484" ? "литр" : "ширхэг"
        } ${gazar} ${v} кг бордоо орох ба та 1кг-ийн савлагаатай бордооноос ${Math.ceil(
          v
        )} ширхэгийг хэрэглэхэд тохиромжтой. Та ${Math.ceil(
          v
        )} ширхэг 1кг бордоо захиалах уу?`;
        // url = 'https://smartstore.chatbot.mn/productDetail/18627'
        await sendMessage(bot, sender.sender_id, msgBuilder(txt, url, block));
      } else if (15 < v && v < 1000) {
        txt = `${type} бордоход ${param[typee].value} ${
          param.__payload.intentId === "133484" ? "литр" : "ширхэг"
        } ${gazar} ${v} кг бордоо орох ба та 15кг-ийн савлагаатай бордооноос ${Math.ceil(
          v / 15
        )} ширхэгийг хэрэглэхэд тохиромжтой. Та ${Math.ceil(
          v / 15
        )} ширхэг 15кг бордоо захиалах уу?`;
        // url = "https://smartstore.chatbot.mn/productDetail/26656"
        await sendMessage(bot, sender.sender_id, msgBuilder(txt, url, block));
      } else if (1000 < v) {
        txt = `${type} бордоход ${param[typee].value} ${
          param.__payload.intentId === "133484" ? "литр" : "ширхэг"
        } ${gazar} ${v} кг бордоо орох ба та бордоог задгай савлагаатайгаар захиалахад тохиромжтой. Та ${v}кг бордоо захиалах уу?`;
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