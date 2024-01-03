export const go = async function (page2 = false, url, inputElement, cc) {
  const fetchData = await fetch(url);
  const getData = await fetchData.json();
  const BlogHeader = getData.BlogHeader;
  const BlogDetail = getData.BlogDetail;

  if (page2) {
    return { BlogHeader, BlogDetail };
  }
  document.querySelector("button").addEventListener("click", () => {
    document.querySelector(".description").style.display = "none";
    getContentFromInput(BlogDetail, inputElement, cc);
  });
};
export function getContentFromInput(BlogDetail, input, cc) {
  const value1 = input.value;
  if (value1 === "") {
    return;
  }
  let htmlElement = "";
  for (let i = 0; i < BlogDetail.length; i++) {
    if (BlogDetail[i].BlogContent.includes(value1)) {
      const html = `<div class="spec-item">${BlogDetail[i].BlogContent}</div>`;
      htmlElement += html;
    }
    cc.innerHTML = htmlElement;
  }
}
