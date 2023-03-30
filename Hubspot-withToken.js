const executeCode = async () => {
    let { phone = {}, address = {} } = param;
    phone = phone.value;
    address = address.value;
  
    try {
      let result = await fetchWithTimeout(
        `https://api.hubapi.com/contacts/v1/lists/all/contacts/recent?`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "pat-na1-7ee9c824-c228-48b3-8489-38f7e6793223"
          },
          method: "GET",
        },
        10000
      );
  
      let identities = result.result.contacts.map((e) => ({
        vid: e.vid,
        value: e["identity-profiles"][0].identities[0].value,
      }));
      let fbid = identities.find(
        (e) => e.value.split("-")[2] === sender.sender_id
      );
      let newid = fbid?.value.split('-')[2]

      if (newid) {
      
        let text1 = `Таны бөглөсөн мэдээлэл:\n`;
        text1 += `⭐холбоо барих дугаар: ${phone}\n`;
        text1 += `⭐амьдардаг аймагт: ${address}\n`;
  
        let message = {
          text: text1,
        };
        await sendMessage(bot, sender.sender_id, message);
  
        let message1 = {
          text: "Таны мэдээллийг бүртгэж авлаа. Тун удахгүй манай Онлайн зээлийн мэргэжилтэн тантай холбогдох болно. Баярлалаа",
        };
        await sendMessage(bot, sender.sender_id, message1);
        
        await fetchWithTimeout(
          `https://api.hubapi.com/contacts/v1/contact/vid/${fbid.vid}/profile?`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: "pat-na1-7ee9c824-c228-48b3-8489-38f7e6793223"
            },
            body: JSON.stringify({
              properties: [
                { property: "phone", value: phone },
                { property: "country", value: address },
              ],
            }),
            method: "POST",
          },
          10000
        );
      } 
  
      
        //   let text1 = `Таны бөглөсөн мэдээлэл:\n`;
        //       text1 += `⭐холбоо барих дугаар: ${phone}\n`;
        //       text1 += `⭐амьдардаг аймагт: ${address}\n`;
      
        //       let message = {
        //           text: text1,
        //       }
        //       await sendMessage(bot, sender.sender_id, message);
      
        //       let message1 = {
        //           text: 'Таны мэдээлэлийг бүртгэж авлаа. Тун удахгүй манай Онлайн зээлийн мэргэжилтэн тантай холбогдох болно. Танд өөр асууж тодруулах зүйл байвал 7533-5599 дугаарт холбогдоно уу. Баярлалаа',
        //       }
        //       await sendMessage(bot, sender.sender_id, message1);
              
        //       await fetchWithTimeout(
        //           `https://api.hubapi.com/contacts/v1/contact?hapikey=1c5db04c-cc12-4e92-8f1a-2d2753c8c946`,
        //           {
        //               headers: {
        //                   "Content-type": "application/json",
        //               },
        //               body: JSON.stringify({
        //                   properties: [
        //                       { property: 'firstname', value: sender.firstname },
        //                       { property: 'lastname', value: sender.lastname },
        //                       { property: 'phone', value: phone },
        //                       { property: 'country', value: address },
        //                   ]
        //               }
        //               ),
        //               method: "POST",
        //           },
        //           10000
        //       );
          
  
    } catch (err) {
      logger.error("capitron=>salbar catch error", err.toString());
      sendMessage(bot, sender.sender_id, {
        text: 'Уучлаарай, мэдээлэл дуудахад алдаа гарлаа',
      });
    }
  };
  executeCode();
  
