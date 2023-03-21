const executeCode = async () => {
    try {
      let { register = {} } = param || {};
      register = param.register.value;
  
      let result = await fetchWithTimeout(
        `https://rico.mn/bot/check/user/register/num`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            register_no: register,
            fb_id: sender.sender_id,
          }),
          method: "POST",
        },
        10000
      );
      
      //const urlRegex = //g;
      //urlRegex.test('url')
      

      if (result.result.description === "Амжилттай бүртгэгдлээ ") {
        let url = result.result.loan_url.replace(/\\/g, "")
         let message= {
      attachment:{
        type:"template",
        payload:{
          template_type:"button",
          text:"Та зээлтэй байна. Доорх линкээр орж харна уу.",
          buttons:[
            {
              type:"web_url",
              url: url,
              title:"Мэдээлэл харах"
            },
          ]
        }
      }
    }
        await sendMessage(bot, sender.sender_id, message);
      } else if(result.result.description === "Таны регистер тохирохгүй байна") {
        let message= {
            attachment:{
              type:"template",
              payload:{
                template_type:"button",
                text:"Та Соно зээлийн апп-д бүртгэлгүй байна. Доорх линкээр орж бүртгүүлнэ үү?",
                buttons:[
                  {
                    type:"web_url",
                    url:"https://play.google.com/store/apps/details?id=mn.rico.sono",
                    title:"Android"
                  },
                  {
                    type:"web_url",
                    url:"https://apps.apple.com/mn/app/sono-mongolia/id1448956579",
                    title:"iPhone"
                  },
                ]
              }
            }
          }
          await sendMessage(bot, sender.sender_id, message);
      } else {
        await sendMessage(bot, sender.sender_id, {
            text: result.result.description,
          });
      }
    } catch (err) {
      logger.error("Numer catch error", err.toString());
      sendMessage(bot, sender.sender_id, {
        text: "Уучлаарай, мэдээлэл дуудахад алдаа гарлаа",
      });
    }
  };
  
  executeCode();
  