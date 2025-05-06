// 获取页面元素
const scoreElement = document.getElementById("score");
const holes = document.querySelectorAll(".hole");
const startButton = document.getElementById("start-button");

let score = 0; // 初始得分
let gameInterval; // 游戏计时器
let moleInterval; // 地鼠出现的计时器

// 显示地鼠
function showMole() {
  // 随机选择一个坑
  const randomHoleIndex = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHoleIndex];

  // 创建地鼠
  const mole = document.createElement("div");
  mole.classList.add("mole");

  // 确保每个坑只显示一个地鼠
  if (hole.querySelector(".mole")) {
    return;
  }

  hole.appendChild(mole); // 将地鼠添加到坑中

  // 设置一段时间后隐藏地鼠
  setTimeout(() => {
    mole.remove(); // 移除地鼠
  }, 1000); // 地鼠在坑中显示1秒
}

// 点击地鼠增加分数
holes.forEach(hole => {
  hole.addEventListener("click", (event) => {
    if (event.target.classList.contains("mole")) {
      score += 1; // 增加分数
      scoreElement.textContent = score; // 更新得分
      event.target.remove(); // 移除被点击的地鼠
    }
  });
});

// 开始游戏
function startGame() {
  score = 0; // 重置分数
  scoreElement.textContent = score;
  startButton.disabled = true; // 禁用开始按钮
  startButton.textContent = "游戏进行中...";

  moleInterval = setInterval(showMole, 1500); // 每1.5秒出现一个地鼠
  gameInterval = setTimeout(endGame, 30000); // 游戏持续30秒
}

// 结束游戏
function endGame() {
  clearInterval(moleInterval); // 停止地鼠出现
  startButton.disabled = false; // 启用开始按钮
  startButton.textContent = "开始游戏"; // 恢复按钮文字
  alert(`游戏结束！你的得分是：${score}`);
}

// 为开始按钮添加点击事件
startButton.addEventListener("click", startGame);
