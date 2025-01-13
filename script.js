
// let p1First = true;
// let rounds = 0;
// let lastTake = 0;

const COIN_COUNT_MIN = 12;
const COIN_COUNT_MAX = 24;

// 获取 DOM 元素
const coinCountElement = document.getElementById("coin-count");
const takeOneBtn = document.getElementById("take-one");
const takeTwoBtn = document.getElementById("take-two");
const resetBtn = document.getElementById("reset");
const messageElement = document.getElementById("message");

function getRandomInt(min, max) {
	// 确保 min 是范围的最小值，max 是范围的最大值
	min = Math.ceil(min); // 向上取整，确保是整数
	max = Math.floor(max); // 向下取整，确保是整数
	// 生成 [min, max] 范围内的随机整数
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let totalCoins = getRandomInt(COIN_COUNT_MIN, COIN_COUNT_MAX);
let remainingCoins = totalCoins;

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
	if (remainingCoins >= 2) {
		if ((remainingCoins - 1) % 3 === 0) {
			cpuTake = 1;
		} else if ((remainingCoins - 2) % 3 === 0) {
			cpuTake = 2;
		} else {
			cpuTake = Math.random() < 0.5 ? 1 : 2;
		}
	} else {
		cpuTake = remainingCoins;
	}

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
	totalCoins = getRandomInt(COIN_COUNT_MIN, COIN_COUNT_MAX);
	remainingCoins = totalCoins;
	updateDisplay();
	messageElement.textContent = "";
	takeOneBtn.disabled = false;
	takeTwoBtn.disabled = false;
}

// 添加事件监听
takeOneBtn.addEventListener("click", () => takeCoins(1));
takeTwoBtn.addEventListener("click", () => takeCoins(2));
resetBtn.addEventListener("click", () => resetGame());

// 初始化游戏显示
updateDisplay();

// 可选：添加重置按钮（未在 HTML 中定义）
// 您可以在 HTML 中添加一个重置按钮，并在此处实现其功能
