const executeCode = async () => {
    try {
        let today = moment(new Date).format("YYYY-MM-DD");
        let pageSize = 9
        let date = "2022-09-07"
        let url = `https://kb-api.bits.mn/api/back/rates?date=${date}`
        let { currentIndex = 0} = param || {};
    if (currentIndex) {
      currentIndex = parseInt(currentIndex);
    }
    let result = await fetchWithTimeout(
        `${url}`,
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

    json.map((e) => {
        switch (e.currency) {
          case "USD":
            e.name = "🇺🇸 Америк доллар";
            break;
          case "EUR":
            e.name = "🇪🇺 Евро";
            break;
          case "CNY":
            e.name = "🇨🇳 Хятадын юань";
            break;
          case "RUB":
            e.name = "🇷🇺 Оросын рубль";
            break;
          case "JPY":
            e.name = "🇯🇵 Японы иен";
            break;
          case "GBP":
            e.name = "🇬🇧 Английн фунт";
            break;
          case "CHF":
            e.name = "🇨🇭 Швейцар франк";
            break;
          case "KRW":
            e.name = "🇰🇷 БНСУ-н вон";
            break;
          case "HKD":
            e.name = "🇭🇰 Гонконг доллар";
            break;
          case "AUD":
            e.name = "🇦🇺 Австрали доллар";
            break;
          case "CAD":
            e.name = "🇨🇦 Канад доллар";
            break;
          case "SGD":
            e.name = "🇸🇬 Сингапур доллар";
            break;
          case "NZD":
            e.name = "🇳🇿 Шинэ Зеланд доллар";
            break;
          case "XAU":
            e.name = "🥇 Алт";
            break;
          case "XAG":
            e.name = "🥈 Мөнгө";
            break;
        }
      });
    
    let chunked = []
    for (let i = 0; i < json.length; i += pageSize) {
        chunked.push(json.slice(i, i + pageSize));
      }
      let currencyList = chunked[currentIndex]
        let quickReplies = []
        for(let i = 0; i < currencyList.length; i++){
              quickReplies.push({
                title: currencyList[i].name,
                content_type: "text",
                payload: `/api/action/call?actionId=317&buy_cash=${currencyList[i].cashBuyRate}&sell_cash=${currencyList[i].cashSellRate}&buy=${currencyList[i].buyRate}&sell=${currencyList[i].sellRate}&name=${currencyList[i].name}`
            }) 
        }

        if(quickReplies.length === pageSize){
            quickReplies.push(
                {
                    title: `Бусад`,
                    content_type: "text",
                    payload: `/api/action/call?actionId=316&currentIndex=${currentIndex + 1}`
                }
            )
        }
 
        let currencyMsg = {
            text: 'Ханш харах валютаа сонгоно уу?',
            quick_replies: quickReplies
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