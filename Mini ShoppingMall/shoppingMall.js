const kindList = ["t", "p", "s"];
const colorList = ["blue", "yellow", "pink"];
const sexList = ["female", "male"];
const sizeList = ["small", "large"];
const clothesList = [];

const articleList = document.querySelector("#articleList");
const btns = document.querySelectorAll("nav button");

class Clothes {
  constructor(kind, color, sex, size) {
    this.kind = kind;
    this.color = color;
    this.sex = sex;
    this.size = size;
  }
}

function createArticle(clothes) {
  const article = document.createElement("li");
  const article_img = document.createElement("img");
  const article_data = document.createElement("span");

  article.className = "article";
  article_img.src = `imgs/${clothes.color}_${clothes.kind}.png`;
  article_data.textContent = `${clothes.sex}, ${clothes.size} size`;

  articleList.appendChild(article);
  article.appendChild(article_img);
  article.appendChild(article_data);
}

// 이게... 맞는 걸까..? 아닌것 같은데...ㅋㅋ...
kindList.forEach((kind) => {
  colorList.forEach((color) => {
    sexList.forEach((sex) => {
      sizeList.forEach((size) => {
        clothesList.push(new Clothes(kind, color, sex, size));
      });
    });
  });
});

clothesList.forEach((clothes) => createArticle(clothes));

function clickButton() {
  articleList.innerHTML = "";
  clothesList.forEach((clothes) => {
    if (clothes[this.className] === this.name) {
      createArticle(clothes);
    }
  });
}

btns.forEach((btn) => btn.addEventListener("click", clickButton));
