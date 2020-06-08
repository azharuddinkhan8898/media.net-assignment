export const sort = function(handleSorting) {
  var el = document.querySelectorAll("#sortable");
  el.forEach(function(el) {
    $(el).sortable({
      connectWith: ".task-cards",
      stop: function(event, ui) {
        todoSort("end", $(ui.item).index(), $(ui.item));
      },
      start: function(event, ui) {
        todoSort("start", $(ui.item).index(), $(ui.item));
      }
    });
    $(el).disableSelection();
  });
  var startParent;
  var startIndex;
  var endParent;
  var endIndex;
  function todoSort(p, i, el) {
    //console.log(p, el.parent().attr("data-parent"), i);
    if (p == "start") {
      //console.log("start");
      startParent = el.parent().attr("data-parent");
      startIndex = i;
    } else {
      endParent = el.parent().attr("data-parent");
      endIndex = i;
      if (startParent === endParent) {
          if(startIndex === endIndex){
            //console.log("same position");
          } else {
            handleSorting("sort", startParent, startIndex, endParent, endIndex)
          }
        
      } else {
        handleSorting("move", startParent, startIndex, endParent, endIndex)
      }
    }
  }
};
