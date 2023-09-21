// ele 를 append 하는 class
class Ele {
    constructor(parentTag, tagName) {
      this.parentTag = parentTag;
      this.tagName = tagName;
    }
  
    // className 을 공란으로하면 append만 실행된다.
    // id 는 tagName 을 사용한다.
    // className 은 naming convention 에 의해 -- 를 붙이고 사용한다.
    appendTag(className) {
      if (className != "") {
        this.parentTag.append(
          $('<div class = "' + className + '--" id = "' + this.tagName + '">')
        );
      } else {
        this.parentTag.append($('<div id = "' + this.tagName + '">'));
      }
    }
  
    // css 를 간편하게
    tagCss(width, height, color, display) {
      $("#" + this.tagName).css("width", width);
      $("#" + this.tagName).css("height", height);
      $("#" + this.tagName).css("background-color", color);
      $("#" + this.tagName).css("display", display);
    }
  
    // tagName 에 html을.
    makeHtml(html) {
      console.log(this.tagName);
      $("#" + this.tagName).html(html);
    }
  }
  
  // class Checker{
  //     constructor(tagName,tagList){
  //         this.tagName = tagName;
  //         this.tagList = tagList;
  //     }

  //     anyOfClickedBool(){
  //       return 
  //     }
  // }
  
  
  // TODO
  class Paging{
  
  }
  
  /*
  class Pagination {
      constructor(data, itemsPerPage) {
        this.data = data;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
      }
    
      get totalPages() {
        return Math.ceil(this.data.length / this.itemsPerPage);
      }
    
      get currentPageData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.data.slice(startIndex, endIndex);
      }
    
      displayPage(pageNumber) {
        this.currentPage = pageNumber;
        this.render();
      }
    
      render() {
        const container = document.getElementById('data-container'); // HTML에 데이터를 표시할 요소
        container.innerHTML = ''; // 이전 데이터를 지웁니다.
    
        this.currentPageData.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.textContent = item;
          container.appendChild(itemElement);
        });
    
        this.renderPaginationButtons();
      }
    
      renderPaginationButtons() {
        const paginationContainer = document.getElementById('pagination-container'); // 페이지 네비게이션을 표시할 요소
        paginationContainer.innerHTML = ''; // 이전 페이지 네비게이션을 지웁니다.
    
        for (let i = 1; i <= this.totalPages; i++) {
          const button = document.createElement('button');
          button.textContent = i;
          button.addEventListener('click', () => this.displayPage(i));
          paginationContainer.appendChild(button);
        }
      }
    }
    
    // 데이터 배열 예시
    const data = [
      'Item 1',
      'Item 2',
      'Item 3',
      // ... 더 많은 아이템
      'Item N'
    ];
    
    // 페이지당 아이템 개수
    const itemsPerPage = 5;
    
    // Pagination 클래스 인스턴스 생성
    const pagination = new Pagination(data, itemsPerPage);
    
    // 초기 페이지 렌더링
    pagination.render();
    */



  //-----------------------------------------------------------------------------------


  
    /*
    class Pagination {
    constructor(data, itemsPerPage, pagesToShow) {
      this.data = data;
      this.itemsPerPage = itemsPerPage;
      this.currentPage = 1;
      this.pagesToShow = pagesToShow;
    }
  
    get totalPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    }
  
    get currentPageData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.data.slice(startIndex, endIndex);
    }
  
    displayPage(pageNumber) {
      this.currentPage = pageNumber;
      this.render();
    }
  
    render() {
      const container = document.getElementById('data-container');
      container.innerHTML = '';
  
      this.currentPageData.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = item;
        container.appendChild(itemElement);
      });
  
      this.renderPaginationButtons();
    }
  
    renderPaginationButtons() {
      const paginationContainer = document.getElementById('pagination-container');
      paginationContainer.innerHTML = '';
  
      const startPage = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
      const endPage = Math.min(this.totalPages, startPage + this.pagesToShow - 1);
  
      for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => this.displayPage(i));
        paginationContainer.appendChild(button);
      }
    }
  }
  
  const data = [
    'Item 1',
    'Item 2',
    'Item 3',
    // ... 더 많은 아이템
    'Item N'
  ];
  
  const itemsPerPage = 5;
  const pagesToShow = 5; // 보여줄 페이지 수 지정
  
  const pagination = new Pagination(data, itemsPerPage, pagesToShow);
  pagination.render(); 
    */
  