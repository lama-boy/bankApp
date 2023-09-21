/*
* commonClass.js 에 class Ele 와 Checker.
* TODO paging class commonClass.js 에 만들기
*/

$(document).ready(function () {
  let arr = ["Tags", "User", "Company", "Notice", "CS"];
  make_body_nav(arr);
});

/*
 ** body_header 을 만든다.
 ** nav 형태로 admin 이 관리할 테이블을 가져온다.
 ** 가져온 table 을 통해 column 을 생성하거나 칼럼명수정, 저장 할 수 있다.
 */
function make_body_nav(list) {
  // body 에 bodyHeader( nav ) 붙이기
  // $('#tagName')
  const body_nav = new Ele($('#body'), "bodyHeader");
  body_nav.appendTag("navbar navbar-expand-sm bg-dark navbar-dark");
  $("#bodyHeader").append($('<div id = "bodyHeaderNav">'));

  // navigation Left
  list.forEach((e) => {
    $("#bodyHeaderNav").append($('<div id = "' + e + '" class = "navEles">'));
    $("#" + e).html(e);
    indicateClicked($("#" + e));
    $("#" + e).on("click", (e) => tagClicked(e.target.id));
  });
}

// nav 메뉴들의 클릭 유무를 표시한다.
function indicateClicked(tag) {
  tag.attr("data-clicked", "false");
}

// 새 창을 열어서 테이블의 칼럼을 추가할 수 있다.
// 여기서 테이블은 nav 의 Tags 에 해당한다.
function newWindow(link) {
  var newWindow = window.open("", "_blank", "width=400,height=300");

  newWindow.onload = function () {
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

/* tag 클릭 시 실행되는 함수.
 같은 메뉴 재클릭, 전체중 클릭된 ele 가 있는지를 체크한다. 
 재클릭시 창이 닫히고 클릭된 ele 가 있는데 다른 요소를 클릭할 경우
 기존 창을 떼고 새로운 창을 열어준다. 새로운 창의 id 는 클릭한 
 ele + DetailOuterWrapper 로 표시했다.
 */
function tagClicked(navTag) {
  let checker = new Checker(navTag,$('.navEles'));
  
  if (!checker.anyOfClickedBool($(".navEles"))) {
    console.log("실행됨 66");
    attatchDetailOuterWrapper(navTag);
    return;
  }
  if (checker.checkSelfClicked($(".navEles"), navTag)) {
    console.log("실행됨 71");
    detatch($(".DetailOuterWrapper--"));
    console.log(navTag);
    $("#" + navTag).attr("data-clicked", "false");
    return;
  }
  if (!checker.checkSelfClicked($(".navEles"), navTag) &&
    checker.anyOfClickedBool($(".navEles"))
  ) {
    detatch($(".DetailOuterWrapper--"));
    $(".navEles").each((idx, e) => e.setAttribute("data-clicked", "false"));
    attatchDetailOuterWrapper(navTag);
    return;
  }
  
}

// tagId + DetailOuterWrapper 창을 생성.
function attatchDetailOuterWrapper(tagId) {
  console.log("122 줄 " + tagId);
  $("#" + tagId).attr("data-clicked", "true");
  let detailOuterWrapper = new Ele($("#body"), tagId + "DetailOuterWrapper");
  detailOuterWrapper.appendTag("DetailOuterWrapper");
  detailOuterWrapper.tagCss("100%", "93%", "aqua", "block");
  loadNavDetails(tagId);
}


// ele 를 제거하는 함수.
// 여기서는 DetailOuterWrapper 을 떼어내는 데에만 쓰인다.
function detatch(list) {
  console.log(list);
  list[0].remove();
}

//------------------ Inner DetailOuterWrapper -------------------

// navEles 중 하나인 Tags를 load 한다.
function loadNavDetails(tagId) {
  switch (tagId) {
    case "Tags":
      loadTagsDetails();
      break;
    case "User":
      loadUserDetails();
      break;
    case "Company":
      loadCompanyDetails();
      break;
    case "Notice":
      loadNoticeDetails();
      break;
    case "CS":
      loadCSDetails();
      break;
  }
}

// TagDetails
function loadTagsDetails() {
  let arr = ["service", "facilities"];
  let tagDetailsWrapper = new Ele(
    $("#TagsDetailOuterWrapper"),
    "tagDetailsWrapper"
  );
  tagDetailsWrapper.appendTag("");
  tagDetailsWrapper.tagCss("90%", "100%", "whitesmoke", "flex");
  $("#tagDetailsWrapper").css("margin", "auto");

  arr.forEach((e) => {
    display(e);
  });
}

function display(tagName) {
  $.get("/loadTagDetails/" + tagName, function (data) {
    let details = new Ele($('#tagDetailsWrapper'),tagName + "Details");
    details.appendTag('detailsBoxes');
    details.tagCss('33%','400px','grey','inline-block');
    $('#' + tagName + "Details").css('overflow','scroll');
    $('#' + tagName + "Details").css('border','1px solid black');
    let detailHeader = new Ele($('#' + tagName + "Details"), tagName + "DetailHeader");
    detailHeader.appendTag("detailHeader");
    detailHeader.tagCss('100%','10%','white','flex');
    $('#' + tagName + "DetailHeader").css('justify-content', 'space-between');
    let detailHeaderName = new Ele($('#' + tagName + 'DetailHeader'),tagName + 'detailHeaderName');
    detailHeaderName.appendTag("detailHeaderName");
    detailHeaderName.tagCss('20%','100%','white','block');
    detailHeaderName.makeHtml(tagName);
    let addButton = new Ele($('#' + tagName + 'DetailHeader'),tagName + 'AddButton');
    addButton.appendTag('addButtons');
    addButton.tagCss('10%','100%','white','inline-block');
    addButton.makeHtml('+');
    $('#' + tagName + 'AddButton').on('click', e => console.log(e.target) );
    

    // header flex, header left : tagName html / header right : buttons div + - column 수정
    data.forEach((e, idx) =>{
      let detailBody = new Ele($('#' + tagName + "Details"), tagName + "DetailBody" + idx);
      detailBody.appendTag("detailBody");
      detailBody.tagCss('100%','9%','whitesmoke','inline-block');
      detailBody.makeHtml(e);
    })
  });
}

// UserDetails
function loadUserDetails() {
  $.get("/loadUserDetails", function (data) {
    console.log(data);
  });
}

// CompanyDetails
function loadCompanyDetails() {
  $.get("/loadCompanyDetails", function (data) {
    console.log(data);
  });
}

// NoticeDetails
function loadNoticeDetails() {
  $.get("/loadNoticeDetails", function (data) {});
}

// CSDetails
function loadCSDetails() {
  $.get("/loadCSDetails", function (data) {});
}
