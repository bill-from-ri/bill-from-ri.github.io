// Toggle news visibility
const button = document.getElementById("toggle-news");
const allNews = document.querySelectorAll(".news-list");
let expanded = false;

button.addEventListener("click", () => {
  expanded = !expanded;
  allNews.forEach((el, index) => {
    if (index >= 3) {
      el.classList.toggle("hidden", !expanded);
    }
  });
  button.textContent = expanded ? "Show Less" : "Show More";
});