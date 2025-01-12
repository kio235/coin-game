// 初始化剩余硬币数
let remainingCoins = 8;

// 获取 DOM 元素
const coinCountElement = document.getElementById("coin-count");
const takeOneBtn = document.getElementById("take-one");
const takeTwoBtn = document.getElementById("take-two");
const messageElement = document.getElementById("message");

// 更新界面显示
function updateDisplay() {
	coinCountElement.textContent = remainingCoins;
}

// 检查游戏是否结束
function checkGameOver(playerTook) {
	if (remainingCoins === 0) {
		// 判断是谁赢了
		if (playerTook) {
			messageElement.textContent = "恭喜你获胜！你拿到了最后一枚硬币。";
		} else {
			messageElement.textContent = "你输了！电脑拿到了最后一枚硬币。";
		}
		// 禁用按钮
		takeOneBtn.disabled = true;
		takeTwoBtn.disabled = true;
	}
}

// 玩家拿硬币
function takeCoins(count) {
	if (remainingCoins < count) {
		messageElement.textContent = "剩余硬币不足！";
		return;
	}
	remainingCoins -= count;
	updateDisplay();
	checkGameOver(true);
	if (remainingCoins > 0) {
		// 电脑回合
		computerTurn();
	}
}

// 电脑策略: 简单随机拿一枚或两枚硬币
function computerTurn() {
	// 简单策略：尽可能让剩余硬币为1，确保赢得游戏
	let cpuTake;
	// if (remainingCoins % 3 === 0) {
	// 	cpuTake = 2;
	// } else {
	// 	cpuTake = 1;
	// }
	switch(remainingCoins){
		case 7:
			cpuTake = 1;
			break;
		case 6:
			cpuTake = 2;
			break;
		case 5:
			cpuTake = 2;
			break;
		case 4:
			cpuTake = 1;
			break;
		case 3:
			cpuTake = 1;
			break;
		case 2:
			cpuTake = 2;
			break;
		case 1:
			cpuTake = 1;
			break;
	}

	// // 确保不拿超过剩余硬币
	// if (cpuTake > remainingCoins) {
	// 	cpuTake = remainingCoins;
	// }

	// 模拟电脑思考时间
	setTimeout(() => {
		remainingCoins -= cpuTake;
		updateDisplay();
		messageElement.textContent = `电脑拿了 ${cpuTake} 枚硬币。`;
		checkGameOver(false);
	}, 100);
}

// 重置游戏
function resetGame() {
	remainingCoins = 8;
	updateDisplay();
	messageElement.textContent = "";
	takeOneBtn.disabled = false;
	takeTwoBtn.disabled = false;
}

// 添加事件监听
takeOneBtn.addEventListener("click", () => takeCoins(1));
takeTwoBtn.addEventListener("click", () => takeCoins(2));

// 初始化游戏显示
updateDisplay();

// 可选：添加重置按钮（未在 HTML 中定义）
// 您可以在 HTML 中添加一个重置按钮，并在此处实现其功能
