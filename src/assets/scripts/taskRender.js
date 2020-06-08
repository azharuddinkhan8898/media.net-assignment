import { sortArray } from "./codeSnippet";
const image = require("./../images/image.jpg");
const chatbot = require("./../images/chatbot.jpg")
export const taskRender = function(data) {
  var html = "";
  //data = sortArray(data);
  data.forEach(el => {
    var snippet = `<div class="task-card" data-id="${el.id}" data-index="${
      el.index
    }">
    <span class="delete-button"><img src="${require("./../images/trash.png")}"/></span>
    <h4 class="${el.barColor}">
      ${el.title}
    </h4>
    ${
      el.image !== ""
        ? el.image == "image.jpg" ? `<div class="image">
        <img src="${image}" alt="">
      </div>` : `<div class="image">
      <img src="${chatbot}" alt="">
    </div>`
        : ``
    }
    <div class="bottom">
      <div class="left">
      ${
        el.deadline !== ""
          ? `
          <div class="info notify">
          <span class="icon notify"></span>
          <span>${el.deadline}</span>
        </div>
          `
          : ``
      }
      ${
        el.comment !== 0
          ? `
          <div class="info">
          <span class="icon comment"></span>
          <span>${el.comment}</span>
        </div>
          `
          : ``
      }
      ${
        el.attachment !== 0
          ? `<div class="info">
          <span class="icon attachment"></span>
          <span>${el.attachment}</span>
        </div>`
          : ``
      }
      </div>
      <div class="right">
        ${el.assignedTo
          .map(el => {
            return `<div class="user ${el}"></div>`;
          })
          .join("")}
      </div>
    </div>
  </div>`;
    html += snippet;
    snippet = "";
  });
  return html;
};
