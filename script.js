// 游戏相关变量
let coinCount = 0; // 当前硬币总数
let isPlayerTurn = true; // 是否轮到玩家回合
let gameOver = false; // 游戏是否结束

// 页面元素获取
const coinCountSpan = document.getElementById("coinCount");
const confirmTurnBtn = document.getElementById("confirmTurn");
const takeOneBtn = document.getElementById("takeOne");
const takeTwoBtn = document.getElementById("takeTwo");
const restartBtn = document.getElementById("restart");
const logDiv = document.getElementById("log");

// 初始化游戏
startGame();

// 绑定事件
confirmTurnBtn.addEventListener("click", confirmTurn);
takeOneBtn.addEventListener("click", () => playerTakeCoins(1));
takeTwoBtn.addEventListener("click", () => playerTakeCoins(2));
restartBtn.addEventListener("click", startGame);

// 初始化/重新开始游戏
function startGame() {
	// 随机生成硬币数 (12~24之间)
	coinCount = Math.floor(Math.random() * 15) + 12;
	coinCountSpan.textContent = coinCount;

	// 重置游戏状态
	gameOver = false;
	isPlayerTurn = true; // 默认设置，等用户确认先后手
	clearLog();

	// 先手后手按钮可用
	enableRadioButtons(true);
	confirmTurnBtn.disabled = false;

	// 让“拿一枚”和“拿两枚”按钮不可用，等确定先后手后再启用
	takeOneBtn.disabled = true;
	takeTwoBtn.disabled = true;

	addLog("新的游戏开始了，请选择先手或后手。");
}

// 确认先后手
function confirmTurn() {
	const turnChoice = document.querySelector('input[name="turn"]:checked');
	if (!turnChoice) {
		alert("请先选择您要先手还是后手！");
		return;
	}
	isPlayerTurn = turnChoice.value === "first";
	addLog(`您选择了${isPlayerTurn ? "先手" : "后手"}。`);

	// 一旦确认后，不能再改先后手和重新点击按钮
	enableRadioButtons(false);
	confirmTurnBtn.disabled = true;

	// 如果是玩家先手，就等待玩家操作；若是电脑先手，则电脑先操作
	if (!isPlayerTurn && !gameOver) {
		addLog("轮到电脑先手...");
		computerTurn();
	}
	updateButtonState();
}

// 玩家操作：拿硬币
function playerTakeCoins(num) {
	if (gameOver || !isPlayerTurn) return;

	coinCount -= num;
	addLog(`玩家拿了${num}枚硬币，剩余硬币数：${coinCount}`);
	checkWin("玩家");
	if (gameOver) return;

	// 轮到电脑
	isPlayerTurn = false;
	updateButtonState();
	setTimeout(() => {
		computerTurn();
	}, 500);
}

// 电脑操作
function computerTurn() {
	if (gameOver) return;

	// 电脑简单策略：如果剩余硬币<=2，就一次性拿完；否则随机拿1或2
	// let num = coinCount <= 2 ? coinCount : (Math.random() < 0.5 ? 1 : 2);
	// coinCount -= num;

	if ((coinCount - 1) % 3 === 0) {
		num = 1;
	} else if ((coinCount - 2) % 3 === 0) {
		num = 2;
	} else {
		num = Math.random() < 0.5 ? 1 : 2;
	}
	coinCount -= num;

	addLog(`电脑拿了${num}枚硬币，剩余硬币数：${coinCount}`);
	checkWin("电脑");
	if (gameOver) return;

	// 轮到玩家
	isPlayerTurn = true;
	updateButtonState();
}

// 检查是否胜利
function checkWin(who) {
	if (coinCount <= 0) {
		addLog(`${who}拿到了最后的硬币，${who}获胜！`);
		gameOver = true;
		updateButtonState();
	}
}

// 更新按钮状态
function updateButtonState() {
	// 如果游戏还在进行，玩家回合时启用“拿一枚”、“拿两枚”，否则禁用
	if (!gameOver && isPlayerTurn) {
		takeOneBtn.disabled = false;
		takeTwoBtn.disabled = false;
	} else {
		takeOneBtn.disabled = true;
		takeTwoBtn.disabled = true;
	}
}

// 在日志中添加记录
function addLog(message) {
	const p = document.createElement("p");
	p.textContent = message;
	logDiv.appendChild(p);
	// 让日志自动滚动到底部
	logDiv.scrollTop = logDiv.scrollHeight;
}

// 清空日志
function clearLog() {
	logDiv.innerHTML = "";
}

// 控制先后手的单选按钮是否可用
function enableRadioButtons(enabled) {
	const radios = document.querySelectorAll('input[name="turn"]');
	radios.forEach((radio) => {
		radio.disabled = !enabled;
		radio.checked = false;
	});
}
