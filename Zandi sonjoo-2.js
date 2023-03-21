const executeCode = async () => {

    try {

        let sum, exercise, heartRateScore, normalHeartRateScore
        let smokerValue = 30

        let age = parseInt(param.age.value)
        let height = parseInt(param.height.value)

        let normalWeight = height - 100
        let weight = parseInt(param.weight.value)
        weight = (normalWeight - weight) * 5

        if (param.smokerA.value) smokerValue = -(param.smokerA.value)

        let heartRate = parseInt(param.heartRate.value)

        switch (param.exercise.value) {
            case 'Өдөр бүр':
                exercise = 30
                break
            case '7 хоногт 4 удаа':
                exercise = 25
                break
            case '7 хоногт 3 удаа':
                exercise = 20
                break
            case '7 хоногт 2 удаа':
                exercise = 10
                break
            case '7 хоногт 1 удаа':
                exercise = 5
                break
            case 'Огт хичээллэдэггүй':
                exercise = -10
                break
        }

        heartRate < 90 ? normalHeartRateScore = 90 - heartRate : normalHeartRateScore = 0

        let heartRateDiff = parseInt(param.heartRateAfter.value) - heartRate

        if (heartRateDiff <= 10) { heartRateScore = 30 }
        else if (heartRateDiff > 10 && heartRateDiff <= 15) { heartRateScore = 15 }
        else heartRateScore = 0

        sum = age + weight + smokerValue + exercise + normalHeartRateScore + heartRateScore

            if(sum <= 20){
                text = `Та эрүүл мэнддээ маш ихээр анхаарал тавих хэрэгтэй. Юмыг яаж мэдэх вэ гээд эмчид үзүүлээд ер нь хийлгэж байх ёстой шинжилгээнүүдийг бүгдийг нь хийлгээд зөвлөгөө авахад илүүдэх юм ер байхгүй. Илүүдэл жинтэй бол жингээ хаях, тамхинаас гарах, гүйлтээр хичээллэх зэргээр эрүүл мэнддээ хамгийн наад захын анхаарал тавьж эхлэх хэрэгтэй. Үгүй бол эрүүл мэнд чинь “Надад битгий гомдоорой. Би зөндөө анхааруулсан шүү” гээд яваад өгч магадгүй юм.`
            } else if (sum > 21 && sum <= 60){
                text = `Илүүдэл жин, тамхи таталт, биеийн идэвх сул зэрэг эрсдлийн хүчин зүйлсээ засах тал дээр анхаарах хэрэгтэй. Эрүүл мэндийнхээ янзыг үзэх бус харин хамтрах хэрэгтэй.`
            } else if (sum > 61 && sum <= 100){
                text = `Муугүй үр дүн гарч. Тэсвэрээ хөгжүүлэх дээр үргэлжлүүлэн сайн анхаараарай.`
            } else text = `Эрүүл мэндтэй холбоотой ямар ч асуудал алга гээд хэлчихвэл нэг их хэтрүүлэг болохгүй байх. Биеийн эсэргүүцэл сайн, тэсвэр өндөр. Энэ байдлаа алдахгүйг хичээгээрэй.`

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