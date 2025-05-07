<script src="game.js"></script>
const scoreElement = document.getElementById("score");
const holes = document.querySelectorAll(".hole");
const startButton = document.getElementById("start-button");

let score = 0; // 初始得分
let moleInterval; // 地鼠显示的定时器

// 显示地鼠
function showMole() {
  const randomHoleIndex = Math.floor(Math.random() * holes.length); // 随机选择一个坑
  const hole = holes[randomHoleIndex]; // 获取坑
  const mole = document.createElement("div");
  mole.classList.add("mole");

  // 确保坑内没有重复地鼠
  if (hole.querySelector(".mole")) {
    return;
  }

  hole.appendChild(mole); // 将地鼠添加到坑中

  setTimeout(() => {
    mole.remove(); // 1秒后移除地鼠
  }, 1000); // 地鼠在坑中显示1秒
}

// 点击地鼠增加分数
holes.forEach(hole => {
  hole.addEventListener("click", (event) => {
    if (event.target.classList.contains("mole")) {
      score += 1;
      scoreElement.textContent = score; // 更新得分
      event.target.remove(); // 移除被点击的地鼠
    }
  });
});

// 开始游戏
function startGame() {
  score = 0; // 重置分数
  scoreElement.textContent = score; // 更新得分
  startButton.disabled = true; // 禁用开始按钮
  startButton.textContent = "游戏进行中..."; // 修改按钮文本

  moleInterval = setInterval(showMole, 1500); // 每1.5秒显示一个地鼠
  setTimeout(endGame, 30000); // 30秒后结束游戏
}

// 结束游戏
function endGame() {
  clearInterval(moleInterval); // 停止地鼠定时出现
  startButton.disabled = false; // 启用开始按钮
  startButton.textContent = "开始游戏"; // 恢复按钮文本
  alert(`游戏结束！你的得分是：${score}`);
}

// 为开始按钮添加点击事件
startButton.addEventListener("click", startGame);

