$(document).ready(function () {
  $("#body_header").append($('<div id = "headerHtml">'));
  $("#headerHtml").html("adminPage");
  let body_Top = new Tab($("#body_body"), "body_Top");
  body_Top.appendTag("");
  body_Top.tagCss("100%", "5%", "gray", "flex");
  //navLeft
  let nav_left = new Tab($("#body_Top"), "nav_left");
  nav_left.appendTag("");
  nav_left.tagCss("10%", "100%", "", "flex");

  let nav_menu = new Tab($("#nav_left"), "nav_menu");
  let nav_tag = new Tab($("#nav_left"), "nav_tag");

  nav_menu.appendTag("navs");
  nav_tag.appendTag("navs");
  nav_menu.tagCss("50%", "100%", "red", "block");
  nav_tag.tagCss("50%", "100%", "blue", "block");

  nav_menu.indicateClicked();
  nav_tag.indicateClicked();

  $("#nav_menu").html("메뉴");
  $("#nav_tag").html("태그");
  $("#nav_menu").on("click", nav_menu_clicked);
  $("#nav_tag").on("click", nav_tag_clicked);

  //navRight
  let nav_right = new Tab($("#body_Top"), "nav_right");
  nav_right.appendTag("");
  nav_right.tagCss("5%", "100%", "green", "block");
  $("#nav_right").html("+");
  $("#nav_right").on("click", () => newWindow("/saveRoot/"));
});

function newWindow(link) {
  var newWindow = window.open("pop-up-page", "_blank", "width=400,height=300");

  newWindow.onload = function () {
    console.log('실행됨');
    var contentDiv = newWindow.document.createElement("div");
    contentDiv.innerHTML =
      '<form id="dataForm"><input type="text" id="inputField"><button type="button" id="submitButton">Submit</button></form>';
    newWindow.document.body.appendChild(contentDiv);

    contentDiv
      .querySelector("#submitButton")
      .addEventListener("click", function () {
        var inputData = contentDiv.querySelector("#inputField").value;
        $.get(link + inputData, function (data) {
          $("#nav_tag").click();
          $("#nav_tag").click();
        });
        newWindow.close();
      });
  };
}

function nav_menu_clicked() {
  if (!clickBool($("#nav_menu"))) {
    $("#nav_menu").attr("data-clicked", "true");
    attatchMenuNav();
    if (clickBool($("#nav_tag"))) {
      $("#nav_tag").attr("data-clicked", "false");
      detatch($("#tagDetailWrapper"));
    }
    return;
  }

  if (clickBool($("#nav_menu"))) {
    $("#nav_menu").attr("data-clicked", "false");
    detatch($("#menuDetailWrapper"));
    return;
  }
}

function nav_tag_clicked() {
  if (!clickBool($("#nav_tag"))) {
    $("#nav_tag").attr("data-clicked", "true");
    attatchTagNav();
    if (clickBool($("#nav_menu"))) {
      $("#nav_menu").attr("data-clicked", "false");
      detatch($("#menuDetailWrapper"));
    }
    return;
  }

  if (clickBool($("#nav_tag"))) {
    $("#nav_tag").attr("data-clicked", "false");
    detatch($("#tagDetailWrapper"));
    return;
  }
}

function clickBool(ele) {
  return ele.attr("data-clicked") == "true";
}

function attatchMenuNav() {
  $("#nav_menu").attr("data-clicked", true);
  let menuDetailWrapper = new Tab($("#body_body"), "menuDetailWrapper");
  menuDetailWrapper.appendTag("detailWrappers");
  menuDetailWrapper.tagCss("99.8%", "95%", "aqua", "block");
  loadMenus();
}

function attatchTagNav() {
  $("#nav_tag").attr("data-clicked", true);
  let tagDetailWrapper = new Tab($("#body_body"), "tagDetailWrapper");
  tagDetailWrapper.appendTag("detailWrappers");
  tagDetailWrapper.tagCss("99.8%", "95%", "aqua", "block");
  loadTags();
}

function loadMenus() {
  $.get("/getRootMenus", function (data) {
    data.forEach((e) => {
      let rootMenu = new Tab($("#menuDetailWrapper"), e.menuName);
      rootMenu.appendTag("rootMenus");
      rootMenu.tagCss("25%", "50%", "whitesmoke", "inline-block");
    });
  });

  $.get("/loadMenus", function (data) {
    console.log(data);
    loadMenuDatas(data);
  });
}

function loadTags() {
  $.get("/loadRootTags", function (data) {
    console.log(data);
    data.forEach((e) => {
      let rootTag = new Tab($("#tagDetailWrapper"), e.tagName + "Div");
      rootTag.appendTag("rootTagDivs");
      rootTag.tagCss("25%", "50%", "whitesmoke", "inline-block");

      let rootTagTop = new Tab(
        $("#" + e.tagName + "Div"),
        e.tagName + "Div_Top"
      );
      rootTagTop.appendTag("Div_Top");
      rootTagTop.tagCss("100%", "10%", "white", "flex");

      let topTagHtml = new Tab(
        $("#" + e.tagName + "Div_Top"),
        e.tagName + "Div_Top_HTML"
      );
      topTagHtml.appendTag("topTagHtmls");
      topTagHtml.tagCss("10%", "100%", "white", "block");
      topTagHtml.makeHtml(e.tagName);

      let topAddBtn = new Tab(
        $("#" + e.tagName + "Div_Top"),
        e.tagName + "Div_Top_AddBtn"
      );
      topAddBtn.appendTag("TopAddBtns");
      topAddBtn.tagCss("10%", "100%", "white", "block");
      topAddBtn.makeHtml("+");

      let tagDetailBody = new Tab(
        $("#" + e.tagName + "Div"),
        e.tagName + "Div_Body"
      );
      tagDetailBody.appendTag("Div_body");
      tagDetailBody.tagCss("100%", "90%", "orange", "block");

      $("#" + e.tagName + "Div_Top_AddBtn").on("click", () =>
        addBtnClicked(e.tagName)
      );

      loadTagDatas(e);
    });
  });
}

function loadMenuDatas(data) {
  data.forEach((e) => {
    console.log(data);
  });
}

function loadTagDatas(parentTag) {
  $.get("/loadTags/" + parentTag.tagName, function (data) {
    data.forEach((e) => {
      let childTag = new Tab(
        $("#" + parentTag.tagName + "Div_Body"),
        parentTag.tagName + "_" + e.tagName
      );
      childTag.appendTag("childTags");
      childTag.tagCss("100%", "10%", "aqua", "inline-block");
      $("#" + parentTag.tagName + "_" + e.tagName).html(e.tagName);
      console.log($("#" + parentTag.tagName + "_" + e.tagName));
      $("#" + parentTag.tagName + "_" + e.tagName).on("dblclick", (e) =>
        divDblClicked(e)
      );
    });
  });
}

function divDblClicked(e) {
  console.log(e.target.id);
  $("#" + e.target.id).attr("contenteditable", "true");
  $("#" + e.target.id).focus();
  let parentTagName = $("#" + e.target.id)
    .parent()
    .siblings()
    .children()
    .first()
    .text();
  let originalName = $("#" + e.target.id).text();
  console.log(parentTagName);
  $("#" + e.target.id).on("blur keypress", (e) => {
    if (e.type == "blur" || e.type == "keypress && e.which ==13") {
      let editedName = $("#" + e.target.id).text();
      $("#" + e.target.id).attr("contenteditable", "false");
      console.log(
        "/editTagName/" + parentTagName + "-" + originalName + "-" + editedName
      );
      $.get(
        "/editTagName/" + parentTagName + "-" + originalName + "-" + editedName,
        function (data) {
          console.log("실행됨");
        }
      );
    }
  });
}

function detatch(detatchEle) {
  detatchEle.remove();
}

function addBtnClicked(e) {
  newWindow("/saveTags/" + e + "-");
}

class Tab {
  constructor(parentTag, tagName) {
    this.parentTag = parentTag;
    this.tagName = tagName;
  }

  appendTag(className) {
    this.parentTag.append(
      $('<div class = "' + className + '" id = "' + this.tagName + '">')
    );
  }

  tagCss(width, height, color, display) {
    $("#" + this.tagName).css("width", width);
    $("#" + this.tagName).css("height", height);
    $("#" + this.tagName).css("background-color", color);
    $("#" + this.tagName).css("display", display);
  }

  indicateClicked() {
    $("#" + this.tagName).attr("data-clicked", "false");
  }

  makeHtml(html) {
    console.log(this.tagName);
    $("#" + this.tagName).html(html);
  }
}
