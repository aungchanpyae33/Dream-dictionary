import { go, getContentFromInput } from "../component.js";

let page2 = true;
const url = "../DreamDictionary.json";
const content = document.querySelector(".content");
const note = document.querySelector(".note");
const inputElement = document.querySelector("input");

content.style.display = "flex";
content.style.fontSize = "20px";

let data = await go(page2, url, note);
for (let i = 0; i < data.BlogHeader.length; i++) {
  const p = document.createElement("p");
  p.className = "contentBox";
  p.id = `one${data.BlogHeader[i].BlogId}`;
  p.dataset.value = data.BlogHeader[i].BlogId;
  p.textContent = data.BlogHeader[i].BlogHead;
  content.appendChild(p);
}
document
  .querySelector("#one1")
  .appendChild(document.querySelector(".backhome"));

document.querySelectorAll(".contentBox").forEach((item) => {
  item.addEventListener("click", (e) => {
    let contentId = +e.target.dataset.value;
    console.log(contentId);
    let data1 = data.BlogDetail.filter((item) => {
      if (item.BlogId === contentId) {
        return item.BlogContent;
      }
    });
    gog(data1);
    inputElement.addEventListener("keyup", () => {
      getContentFromInput(data1, inputElement, note);
    });
  });
});

function gog(data1) {
  data1.forEach((item) => {
    style();
    const specItem = document.createElement("div");
    specItem.className = "spec-item";
    specItem.textContent = item.BlogContent;
    note.appendChild(specItem);
  });
}

function style() {
  content.style.display = "none";
  document.querySelector(".nav").hidden = false;
  document.querySelector(".backhome").hidden = true;
}
