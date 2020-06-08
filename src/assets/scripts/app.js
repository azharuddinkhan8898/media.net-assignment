import {
  getdata,
  inputAnimation,
  colors,
  setLocalStorage,
  resetForm
} from "./codeSnippet";
import { sort } from "./sort";
import { taskRender } from "./taskRender";
var mainData;
$(function() {
  inputAnimation();
  $(".selectpicker").selectpicker();
  getdata(function(data) {
    window.localStorage.setItem("localData", JSON.stringify(data));
    mainData = data;
    renderHtml(data);
  });
  function renderHtml(data) {
    var todo = $(".todo .task-cards");
    var inProgress = $(".inProgress .task-cards");
    var inReview = $(".inReview .task-cards");
    var done = $(".done .task-cards");
    todo.empty().append(taskRender(data.todo));
    inProgress.empty().append(taskRender(data.inProgress));
    inReview.empty().append(taskRender(data.inReview));
    done.empty().append(taskRender(data.done));
    sort(handleSorting);
  }
  $(".add-button").click(function() {
    $(".popup-wrapper").addClass("on");
    resetForm();
  });
  $(".popup-wrapper .popup-backdrop").click(function(e) {
    e.stopPropagation();
    $(".popup-wrapper").removeClass("on");
    resetForm();
  });
  $(".input-wrapper button.form-button").click(function() {
    var title = $("#title").val();
    if (title === "") {
      $(".title-error").css("display", "block");
      return;
    }
    var assignee = $("#assignee").val();
    var lowerAssignee = assignee.map(el => {
      return el.toLowerCase();
    });
    var date = $("#date").val();
    var dateObj = new Date(date);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var strDate = date !== "" ? months[month - 1] + ", " + day : "";
    var attachments = $("#attachment").val() == "" ? 0 : $("#attachment").val();
    var comments = $("#comment").val() == "" ? 0 : $("#comment").val();
    var obj = {
      barColor: colors[Math.floor(Math.random() * 3)],
      title: title,
      attachment: attachments,
      comment: comments,
      deadline: strDate,
      assignedTo: lowerAssignee,
      image: "",
      index: mainData.todo.length,
      id: Math.floor(Math.random() * 10000)
    };
    $(".popup-wrapper").removeClass("on");
    mainData.todo.push(obj);
    setLocalStorage(mainData);
    renderHtml(mainData);
    console.log($(".todo .task-cards")[0].scrollHeight);
    $(".todo .task-cards")[0].scrollTo(
      0,
      $(".todo .task-cards")[0].scrollHeight
    );
  });

  function handleSorting(action, startParent, startIndex, endParent, endIndex) {
    if (action === "sort") {
      var currentArr = mainData[startParent];
      var currentObj = currentArr[startIndex];
      var newArr = currentArr.filter(el => {
        return el.id != currentObj.id;
      });
      newArr.splice(endIndex, 0, currentObj);
      mainData[startParent] = newArr;
    } else {
      var firstArr = mainData[startParent];
      var secondArr = mainData[endParent];
      var currentObj = firstArr[startIndex];
      var newFirstArr = firstArr.filter(el => {
        return el.id != currentObj.id;
      });
      mainData[startParent] = newFirstArr;
      secondArr.splice(endIndex, 0, currentObj);
      mainData[endParent] = secondArr;
    }
    setLocalStorage(mainData);
  }

  $("body").on("click", ".delete-button", function() {
    var deleteConfirm = confirm("Are you sure you want to delete this task?");
    if (deleteConfirm) {
      var parent = $(this)
        .parent()
        .parent()
        .attr("data-parent");
      var id = $(this)
        .parent()
        .attr("data-id");
      var currentArr = mainData[parent];
      var newArr = currentArr.filter(el => {
        return el.id != id;
      });
      console.log(newArr);
      mainData[parent] = newArr;
      setLocalStorage(mainData);
      $(this)
        .parent()
        .remove();
    }
  });

  $(".popup .input-wrapper input#title").on("input", function() {
    $(".title-error").css("display", "none");
  });
});
