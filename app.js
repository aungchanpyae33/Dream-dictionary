const contentContainer = document.querySelector("section");
const inputElement = document.querySelector("input")
const ButtonElement = document.querySelector(".search")
const backButton = document.querySelector('.back');
const space = document.querySelector('main');
const spanElement = document.querySelector("span")
const headerElement = document.querySelector(".header");
const specContainer = document.querySelector(".spec-container");
contentContainer.style.display = "none"
let toAlphabet = true;
let data;
generateContent();
function see() {
  specContainer.innerHTML = "";
  space.classList.remove("space-top");
  spanElement.hidden = true;
  headerElement.style.display = "none"
  contentContainer.style.display = "grid"
}
let condidtion = true;
let backInput = false;
async function generateContent() {
  const url = "DreamDictionary.json"
  const fetchData = await fetch(url)
  const getData = await fetchData.json()
  const { BlogDetail, BlogHeader } = getData;

  for (let i = 0; i < BlogHeader.length; i++) {
    content = document.createElement("div")
    const { BlogHead, BlogTitle, BlogId } = BlogHeader[i]
    content.innerHTML = `<h1>${BlogHead}</h1 >
                         <h3>${BlogTitle}</h3> `
    content.className = "content"
    content.id = BlogId;
    contentContainer.appendChild(content)
    getContent(BlogId, BlogDetail)
  }

  ButtonElement.addEventListener("click", () => {
    spanElement.hidden = true;
    getContentFromInput(BlogDetail)
  })
}
function getContent(BlogId, BlogDetail) {
  const contentElement = document.getElementById(`${BlogId}`)
  contentElement.addEventListener("click", () => {
    headerElement.classList.remove("mop")
    headerElement.classList.remove("header1")
    backButton.style.display = "inline-block"
    headerElement.style.display = "flex"
    condidtion = false;
    data = BlogDetail.filter(item => {
      return item.BlogId === BlogId
    })
    hideContent();
    showInput(data)
    inputElement.addEventListener("keyup", () => {
      const value1 = inputElement.value;
      if (value1 === "") {
        return;
      }
      else {
        let htmlElement = ""
        for (let i = 0; i < data.length; i++) {
          if (data[i].BlogContent.includes(value1)) {
            const html = `<div class="spec-item">${data[i].BlogContent}</div>`
            htmlElement += html;
          }
        }
        specContainer.innerHTML = htmlElement;
      }
    })
  })
}
function getContentFromInput(BlogDetail) {
  const value1 = inputElement.value;
  if (value1 === "") {
    spanElement.hidden = false;
    specContainer.style.display = "none";
    return;
  }
  hideContent()
  let htmlElement = ""
  for (let i = 0; i < BlogDetail.length; i++) {
    if (BlogDetail[i].BlogContent.includes(value1)) {
      const html = `<div class="spec-item">${BlogDetail[i].BlogContent}</div>`
      htmlElement += html;
    }
    backInput = false;
  }
  specContainer.innerHTML = htmlElement;
  inputElement.value = ""
}

function hideContent() {
  contentContainer.style.display = "none"
  specContainer.style.display = "block"
}
function back() {
  if (backInput) {
    specContainer.style.display = "block"
    backInput = false;
    return;
  }
  if (toAlphabet) {
    inputElement.hidden = true;
    headerElement.classList.add("header1")
    ButtonElement.hidden = true;
    contentContainer.style.display = "grid"
    specContainer.style.display = "none"
    document.querySelector(".see").hidden = true;
    toAlphabet = false
    return;
  }
  backHomePage()
}
function showInput(data) {
  let htmlElement = ""
  for (let i = 0; i < data.length; i++) {
    const html = `<div class="spec-item">${data[i].BlogContent}</div>`
    htmlElement += html;
  }
  specContainer.innerHTML = htmlElement;
  document.querySelector(".see").hidden = true;
  inputElement.hidden = false;
  ButtonElement.hidden = true;
  toAlphabet = true;
}
function backHomePage() {
  headerElement.classList.add("mop")
  space.classList.add("space-top")
  contentContainer.style.display = "none"
  backButton.style.display = "none"
  inputElement.hidden = false;
  specContainer.style.display = "none"
  ButtonElement.hidden = false;
  document.querySelector(".see").hidden = false;
  spanElement.hidden = false;
  toAlphabet = true;
  inputElement.value = ""
}