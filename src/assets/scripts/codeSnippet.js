import json from "./../JSON/data.json";

export const colors = ["yellow", "red", "gray"];

export const getdata = function(cb) {
  var localData = window.localStorage.getItem("localData");
  if (localData) {
    var data = JSON.parse(localData);
    cb(data);
  } else {
    cb(json);
  }
};

export const setLocalStorage = function(data) {
  window.localStorage.setItem("localData", JSON.stringify(data));
};

function compare(a, b) {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }
  return 0;
}

export const sortArray = function(arr) {
  var sortedArr = arr.sort(compare);
  return sortedArr;
};

export const inputAnimation = function() {
  $(".col-3 input").val("");
  $(".input-effect input").focusout(function() {
    if ($(this).val() != "") {
      $(this).addClass("has-content");
    } else {
      $(this).removeClass("has-content");
    }
  });
};

export const formSubmit = function() {};

export const resetForm = function() {
  $("#title").val([]);
  $("#assignee").val([]);
  $("#date").val([]);
  $("#attachment").val([]);
  $("#comment").val([]);
};
