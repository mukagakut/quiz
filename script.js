function calculateResult() {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);

    let nickname = formData.get('nickname');
    let score = 0;

    formData.forEach((value, key) => {
        if (key !== 'nickname') {
            score += parseInt(value);
        }
    });

    let result = '';
    if (score >= 60) {
        result = 'すごい！あなたこそ定演マネ！オススメ度☆6(あくまで独断と偏見です)';
    } else if (score >= 48 ) {
        result = '向いているかも！オススメ度☆5(あくまで独断と偏見です)';
    } else if (score >= 36 ) {
        result = 'ぜひご検討を！オススメ度☆4(あくまで独断と偏見です)';
    } else if (score >= 24 ) {
        result = '検討してみてほしい！オススメ度☆3(あくまで独断と偏見です)';
    } else if (score >= 12 ) {
        result = '相談とかしてみるとよきかも！オススメ度☆2(あくまで独断と偏見です)';
    } else {
        result = '今までとは全く違うニュータイプの定演マネ誕生もある！オススメ度☆1(あくまで独断と偏見です)';
    }

    // 結果を表示
    document.getElementById('result').innerText = result;

    // ローカルストレージに保存
    saveResult(nickname, result);
}

function saveResult(nickname, result) {
    // 現在の日付と時刻を取得
    const now = new Date();
    const timestamp = now.toLocaleString();

    // 保存するデータのオブジェクトを作成
    const resultData = {
        nickname: nickname,
        timestamp: timestamp,
        result: result
    };

    // 既存の結果を取得
    let results = JSON.parse(localStorage.getItem('results')) || [];

    // 新しい結果を追加
    results.push(resultData);

    // ローカルストレージに保存
    localStorage.setItem('results', JSON.stringify(results));

    // 保存された結果を表示
    displaySavedResults();
}

function displaySavedResults() {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    const savedResultsDiv = document.getElementById('savedResults');

    savedResultsDiv.innerHTML = ''; // 一度クリア

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.textContent = `${result.timestamp} - ${result.nickname}: ${result.result}`;
        savedResultsDiv.appendChild(resultElement);
    });
}

// ページ読み込み時に保存された結果を表示
window.onload = displaySavedResults;
