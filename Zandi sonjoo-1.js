const executeCode = async () => {

    try {

        let answers = [
            param.q1.value,
            param.q2.value,
            param.q3.value,
            param.q4.value,
            param.q5.value,
            param.q6.value,
            param.q7.value,
            param.q8.value,
            param.q9.value,
            param.q10.value,
            param.q11.value,
            param.q12.value,
            param.q13.value,
        ]

        const answersToNum = answers?.map(e => {
            switch (e) {
                case 'Хэзээ ч үгүй':
                    return e = 0
                case 'Хааяа':
                    return e = 1
                case 'Үе үе боловч байнга тал руугаа':
                    return e = 2
                case 'Олон удаа':
                    return e = 3
                case 'Үргэлж':
                    return e = 4
            }
        })

        const sum = answersToNum.reduce((a, b) => a + b, 0)
        let text

        if(sum > 0 && sum < 15){
            text = "Та стрессээ өөрөө тайлах боломжтой"
        } else if (sum > 16 && sum < 25){
            text = "Та стресст автсан бөгөөд түүнийгээ тайлах арга хэмжээ авахад оройтоогүй байна."
        } else if (sum > 26 && sum < 35){
            text = "Та туйлдлын байдалд хүрэх боломжтой\n/Туйлдал гэдэг нь стресстэй холбоотой эмгэг өөрчлөлт юм. Мэргэжлийн эмчид хандах шаардлагатай./"
        } else text = "Та туйлдлын байдалд хүрсэн байна.\n/Туйлдал гэдэг нь стресстэй холбоотой эмгэг өөрчлөлт юм. Мэргэжлийн эмчид хандах шаардлагатай./"

        let message2 = {
            text
        }

        sendMessage(bot, sender.sender_id, message2)

    } catch (err) {
        console.error('executeCode error', err)
        sendMessage(bot, sender.sender_id, { text: err.message })
    }
}

try {
    executeCode()
} catch (err) {
    console.log('promise catch', err)
}