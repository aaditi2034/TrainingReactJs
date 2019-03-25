/* */
function PaginationTable(data, containerId) {
  var globalState = {
    tableColHeading: header,
    records: data,
    dropDownList: [5, 10, 15, 20, 25],
    noOfRecordsPerPage: 5
  };
  function init() {
    createView();
    createTableHeader();
    createTableBody();
    createTableActions();
  }
  function createTableHeader() {
    var headerTitleHeadingsConatainer = document.getElementById("headingId");
    headerTitleHeadingsConatainer.innerHTML = "";
    //This loop is creating the headings of the columns in table.    
    for (var index = 0; index < globalState.tableColHeading.length; index++) {
      headerTitleHeadingsConatainer.innerHTML += "<div id = headerNav>" + globalState.tableColHeading[index] + "</div>";
    }
  }
  function createTableBody() {
    viewRecords(globalState.tableColHeading, globalState.records, globalState.noOfRecordsPerPage, 1);
  }
  function createTableActions() {
    var selectTag = createSelectTag(globalState.dropDownList);
    var pagination = document.getElementById("pagination");
    pagination.appendChild(selectTag);
    var selectedId = document.getElementById("selectId");
    selectedId.onchange = function () {
      startingIndex = 0;
      globalState.noOfRecordsPerPage = selectedId.value;
      totalPages = Math.ceil(globalState.records.length / globalState.noOfPagesPerPage);
      checkStatusOfButtons(prevBtn, nextBtn);
      viewRecords(globalState.tableColHeading, globalState.records, selectedId.value);
    };
    prevBtn = createPrevBtn();
    pagination.appendChild(prevBtn);
    prevBtn.onclick = function () {
      checkStatusOfButtons(prevBtn, nextBtn);
      goPrevPage(globalState.tableColHeading, globalState.records, globalState.noOfRecordsPerPage);
    };
    nextBtn = createNextBtn();
    pagination.appendChild(nextBtn);
    nextBtn.onclick = function () {
      checkStatusOfButtons(prevBtn, nextBtn);
      goNextPage(globalState.tableColHeading, globalState.records, globalState.noOfRecordsPerPage);
    };
    checkStatusOfButtons(prevBtn, nextBtn);
  }
  init(); //Initialization of constructor.
}
