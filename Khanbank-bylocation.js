const executeCode = async () => {
    try {
    
        let _text = "Та байршилаа сонгоно уу?"
        let _title1 = "Улаанбаатар"
        let _title2 = "Орон нутаг"
    
        
    if(param.lang === "en"){
        _text = "Please choose location area."
        _title1 = "Ulaanbaatar"
        _title2 = "Rural area"
    }
    // const msgBuilder = (t1, title1, ) => {
    //     // let msg = {text: `Та Google map-аас "${b}" нэрээр хайж бүх ${t} байршлын мэдээллийг харах боломжтой. ${u}`}
    //     let msg1 = {
    //         text: _text,
    //         quick_replies: [
    //             {
    //                 title: _title1,
    //                 content_type: "text",
    //                 payload: `/api/action/call?actionId=311&type=${param.type}&location=ub`
    //             },
    //             {
    //                 title: _title2,
    //                 content_type: "text",
    //                 payload: `/api/action/call?actionId=311&type=${param.type}&location=rural`
    //             },
    //         ]
    //     }
    //     return {
    //         // msg,
    //         msg1
    //     }
    // }

    let msg1 = {
        text: _text,
        quick_replies: [
            {
                title: _title1,
                content_type: "text",
                payload: `/api/action/call?actionId=311&location=ub&lang=${param.lang}&type=${param.type}`
            },
            {
                title: _title2,
                content_type: "text",
                payload: `/api/action/call?actionId=311&location=rural&lang=${param.lang}&type=${param.type}`
            },
        ]
    }

    await sendMessage(bot, sender.sender_id, msg1)

    // let kioskMsg = {
    //         text: `Та Google map-аас "Khan Kiosk" нэрээр хайж бүх Киоскын байршлын мэдээллийг газрын зургаар харах боломжтой.`,
    //         quick_replies: [
    //             {
    //                 title: "Жагсаалтаар харах",
    //                 content_type: "text",
    //                 payload: `/api/action/call?actionId=314&type=list`
    //             },
    //             {
    //                 title: "Газрын зургаар харах",
    //                 content_type: "text",
    //                 payload: `/api/action/call?actionId=314&type=map`
    //             },
    //         ]
    //     }

        // switch(param.type){
        //     case "branch":
        //         bankName = "Khan Bank"
        //         type = "салбарын"
        //         url = "https://www.google.com/maps/search/khan+bank/"
        //         //await sendMessage(bot, sender.sender_id, msgBuilder(bankName, type, url).msg);
        //         await sendMessage(bot, sender.sender_id, msgBuilder(bankName, type, url).msg1)
        //         break;
        //     case "atm":
        //         bankName = "Khan ATM"
        //         type = "ATM-н"
        //         url = "https://www.google.com/maps/search/khan+bank+atm/"
        //         //await sendMessage(bot, sender.sender_id, msgBuilder(bankName, type, url).msg);
        //         await sendMessage(bot, sender.sender_id, msgBuilder(bankName, type, url).msg1)
        //         break;
            // case "express":
            //     type = "ЭКСПРЕСС БАНК-ны"
            //     await sendMessage(bot, sender.sender_id, msgBuilder(bankName, type, url).msg1)
            //     break;
            // case "kiosk":
            //     await sendMessage(bot, sender.sender_id, kioskMsg)
            //     break;
        // }
    
    } catch (err) {
      // console.log('error imida->',err);
      logger.error("capitron=>salbar catch error", err.toString());
      sendMessage(bot, sender.sender_id, {
      //   text: "Уучлаарай, мэдээлэл дуудахад алдаа гарлаа",
      text: err.message
      });
    }
  };
  
  executeCode();