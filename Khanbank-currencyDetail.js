const executeCode = async () => {
    try {

        let text = `${param.name}:\n\n`;
        text += `Бэлэн авах: ${param.buy_cash}₮\n`;
        text += `Бэлэн зарах: ${param.sell_cash}₮\n`;
        text += `Бэлэн бус авах: ${param.buy}₮\n`;
        text += `Бэлэн бус зарах: ${param.sell}₮`;
        
        let currencyMsg = {
        text,
            quick_replies: [
                {
                    title: `Бусад ханш`,
                    content_type: "text",
                    payload: `/api/action/call?actionId=316`
                }
            ]
        }
        
        await sendMessage(bot, sender.sender_id, currencyMsg)
        
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