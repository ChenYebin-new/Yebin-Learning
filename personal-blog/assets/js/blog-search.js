(function () {
  const input = document.querySelector("#post-search");
  const cards = Array.from(document.querySelectorAll("[data-post]"));
  const result = document.querySelector("#search-result");
  const empty = document.querySelector("#empty-state");
  if (!input) return;

  input.addEventListener("input", function () {
    const keyword = input.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(function (card) {
      const matches = card.dataset.post.toLowerCase().includes(keyword);
      card.classList.toggle("hidden", !matches);
      if (matches) visible += 1;
    });
    empty.classList.toggle("hidden", visible !== 0);
    result.textContent = keyword ? "找到 " + visible + " 篇匹配笔记" : "共 " + cards.length + " 篇学习笔记";
  });
})();
