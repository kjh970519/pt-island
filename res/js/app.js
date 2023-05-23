(function() {

    // getHours - 시간
    // getMinutes - 분
    // getSeconds - 초

    var test = setInterval(function() {

        $(".tab-pane").empty();
        getRemainingTime();

    }, 1000);

    function getRemainingTime() {
        let now = new Date();
        now.setSeconds(now.getSeconds() + 2); // 네이버시계랑 2초 차이가 있어 맞춰줌

        console.log(now);

        let isTodayIsland = false;
        for (let i=0; i < islandData.length; i++) {

            let cnt = 0;

            let islandOpenTime;
            let remainingTime;

            let nextIslandOpenTime;
            let nextRemainingTime;
            for (let j=0; j < islandData[i].appearTime.length; j++) {

                // 섬 열리는 시간
                islandOpenTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), islandData[i].appearTime[j].hour, islandData[i].appearTime[j].minute, islandData[i].appearTime[j].second);
                remainingTime = (islandOpenTime.getTime() - now.getTime()) / 1000;

                // 다음 섬 열리는 시간이 오늘이 아닐 경우 날짜를 +1
                if (!islandData[i].appearTime[j+1]) {        
                    // 다음 섬 열리는 시간
                    nextIslandOpenTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), islandData[i].appearTime[0].hour, islandData[i].appearTime[0].minute, islandData[i].appearTime[0].second);
                    nextIslandOpenTime.setDate(nextIslandOpenTime.getDate() + 1);
                    nextRemainingTime = (nextIslandOpenTime.getTime() - now.getTime()) / 1000;
                }
                else {     
                    // 다음 섬 열리는 시간
                    let nextIslandOpenTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), islandData[i].appearTime[j+1].hour, islandData[i].appearTime[j+1].minute, islandData[i].appearTime[j+1].second);
                    nextRemainingTime = (nextIslandOpenTime.getTime() - now.getTime()) / 1000;
                }
                if (remainingTime > 0) {

                    createCard(islandData[i].islandName, islandData[i].img, timeConversion(remainingTime), islandData[i].reward, timeConversion(nextRemainingTime));

                    isTodayIsland = true;

                    cnt++;
                    if (cnt == 1) break;
                }                
            }
            if (!isTodayIsland) {
                // 섬 열리는 시간
                islandOpenTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), islandData[i].appearTime[0].hour, islandData[i].appearTime[0].minute, islandData[i].appearTime[0].second);
                islandOpenTime.setDate(islandOpenTime.getDate() + 1);
                remainingTime = (islandOpenTime.getTime() - now.getTime()) / 1000;

                createCard(islandData[i].islandName, islandData[i].img, timeConversion(remainingTime), null, timeConversion(nextRemainingTime));
            }
        };
    }

    function createCard(islandName, img, remainingTime, reward, nextRemainingTime) 
    {
        let mind = reward.mind;
        let adventure = reward.adventure;
        let heart = reward.heart;

        let rewards = [];
        let isMind = '';
        let isAdventure = '';
        let isHeart = '';
        if (mind) {
            isMind = "mind";
            rewards.push(mind);
        }
        if (adventure) {
            isAdventure = "adventure";
            rewards.push(adventure);
        }
        if (heart) {
            isHeart = "heart";
            rewards.push(heart);
        }

        let cardData    = `<div class="card mb-3 islands ${isMind} ${isAdventure} ${isHeart}" style="max-width: 720px;">`;
        cardData       +=   `<div class="row g-0">`;
        cardData       +=       `<div class="col-md-4 w-25">`;
        cardData       +=           `<img src="res/imgs/${img}.png" class="img-fluid rounded-start w-100">`;
        cardData       +=       `</div>`;
        cardData       +=       `<div class="col-md-8 w-75">`;
        cardData       +=            `<div class="card-body">`;
        cardData       +=               `<h4 class="card-title">${islandName}</h4>`;
        cardData       +=               `<p class="card-text">`;
        cardData       +=               `<span class="fs-5">등장까지 남은 시간 : </span><span class="remaining-time fs-5">${remainingTime}</span><br><br>`;
        cardData       +=               `<span class="text-danger">기대 보상 : </span><span class="reward text-danger">${rewards.join(', ')}</span><br>`;
        cardData       +=               `<span class="fs-6">다음 등장까지 남은 시간 : </span><span class="next-remaining-time fs-6">${nextRemainingTime}</span><br>`;
        cardData       +=           `</div>`;
        cardData       +=       `</div>`;
        cardData       +=   `</div>`;
        cardData       += `</div>`;

        $(".tab-pane").append(cardData);
    }

    function timeConversion(seconds)
    {
        let hour = parseInt(seconds / 3600);
        let minute = parseInt((seconds % 3600) / 60);
        let second = Math.floor(seconds % 60);

        return `${hour}시간 ${minute}분 ${second}초`;
    }

})();