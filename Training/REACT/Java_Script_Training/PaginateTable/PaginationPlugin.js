// Implemented Pagination Table

var domTag;                 // This variable is defining the dom tag that will be created.
var currIndex = 1;         // This variable is used to navigate across the pages. 
var startingIndex = 0;    //starting index from where the data will be visible.
var endingIndex ;        // ending index till where data will be visible.
var totalPages = 9;     //no of total pages.

// Constructor setting the properties of DOM tag created.
function SetTagProperties() {
  this.tagName = "div";
  this.type = "";
  this.value = "";
  this.attributeKey = "id";
  this.attributeValue = "";
};

/* @createDynamicHtmlTag creates the tag dynamically. */
function createDynamicHtmlTags(setPropertiesOfTag){
  domTag = document.createElement(setPropertiesOfTag.tagName);
  if (setPropertiesOfTag.type != "" && setPropertiesOfTag.value != ""){
    domTag.setAttribute("type",setPropertiesOfTag.type);
    domTag.setAttribute("value",setPropertiesOfTag.value);
  }
  domTag.setAttribute(setPropertiesOfTag.attributeKey , setPropertiesOfTag.attributeValue);
  return domTag;
}  

/* @createView method creates the view of DOM. */
function createView(pluginInfo){
  var headerObj = new SetTagProperties();
  headerObj.attributeValue = "headingId";
  tableHeadingsContainer = createDynamicHtmlTags(headerObj); 
  pluginInfo.appendChild(tableHeadingsContainer);
  
  var dataObj = new SetTagProperties();
  dataObj.attributeValue = "dataFetch";
  dataInfoContainer = createDynamicHtmlTags(dataObj);
  pluginInfo.appendChild(dataInfoContainer);
  
  var paginateContainerObj = new SetTagProperties();
  paginateContainerObj.attributeValue = "paginationContainer";
  paginationContainer = createDynamicHtmlTags(paginateContainerObj);
  pluginInfo.appendChild(paginationContainer);

  var paginaObj = new SetTagProperties();
  paginaObj.attributeValue = "pagination";
  paginationInnerContainer = createDynamicHtmlTags(paginaObj);
  paginationContainer.appendChild(paginationInnerContainer);
}

/* @createTableHeader creates the Table Header.
  It is setting the values in header's column.
*/
function createTableHeader(tableColHeading){
  var tableHeadingsContainer = document.getElementById("headingId");
  tableHeadingsContainer.innerHTML = "";
  //This loop is creating the columns heading of table.    
  for(var index = 0; index < tableColHeading.length; index++){
    tableHeadingsContainer.innerHTML += "<div id = headerNav>" + tableColHeading[index] + "</div>";
  }
}

/* @createSelectTag creates the select tag and returns it. */
function createSelectTag(dropDownList){
  var selTag = new SetTagProperties();
  selTag.tagName = "select";
  selTag.attributeValue = "selectId";
  selectTag = createDynamicHtmlTags(selTag);
  var optionOfSelect = [];
  //Setting options inside select tag.
  for(var index = 0; index < dropDownList.length; index = index + 1) {
    optionOfSelect[index] = document.createElement("option");
    optionOfSelect[index].innerHTML += dropDownList[index];
    selectTag.appendChild(optionOfSelect[index]);
  }
  return selectTag;
}

/* @checkStatusOfButtons checks the status of button whether to disable or enable it. */
function checkStatusOfButtons(prevBtn,nextBtn){
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  if(currIndex == 1)
    prevBtn.disabled = true;
  if(currIndex == totalPages)
    nextBtn.disabled = true;
}

/* @selectOnChange method works whenever the value of select tag is changed.
   It resets the starting index & current page no and updating total pages.
   'noOfRecordsPerPage' shows the no of records that will be visible on one page.
   'records' is an array of student's records.
   'tableColHeading' is an array of table columns headings.
*/
function selectOnChange(noOfRecordsPerPage, records, tableColHeading){
  var selectedId = document.getElementById("selectId");
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");
  startingIndex = 0;         //Reseting starting index.
  currIndex = 1;            //Reseting current page no.
  totalPages = Math.ceil(records.length/parseInt(noOfRecordsPerPage));  //Updating total pages.
  checkStatusOfButtons(prevBtn,nextBtn);  //Checking of statuses of button.
  var currPageAreaId = document.getElementById("currPageAreaId");
  currPageAreaId.innerHTML = currIndex+" out of "+totalPages;
  viewRecords(tableColHeading,records,selectedId.value);
}

/* @createPrevBtn creates the previous button and return it. */
function createPrevBtn(){
  var prevBtnObj = new SetTagProperties();
  prevBtnObj.tagName = "input";
  prevBtnObj.type = "button";
  prevBtnObj.value = "PREVIOUS";
  prevBtnObj.attributeValue = "prev";
  prevBtn = createDynamicHtmlTags(prevBtnObj);
  return prevBtn;
}

/* @createNextBtn creates the next button and return it. */
function createNextBtn(){
  var nextBtnObj = new SetTagProperties();
  nextBtnObj.tagName = "input";
  nextBtnObj.type = "button";
  nextBtnObj.value = "NEXT";
  nextBtnObj.attributeValue = "next";
  nextBtn = createDynamicHtmlTags(nextBtnObj);
  return nextBtn;
}

/* @goPrevPage calls @viewrecords method that shows the record of next page. */
function goPrevPage(recordsHeading,records,id){
  var currPageAreaId = document.getElementById("currPageAreaId");
  currPageAreaId.innerHTML = currIndex+" out of "+totalPages;
  viewRecords(recordsHeading,records,id,"prev");
}

/* @goNextPage calls @viewRecords method that shows the record of previous page. */
function goNextPage(recordsHeading, records, id){
  var currPageAreaId = document.getElementById("currPageAreaId");
  currPageAreaId.innerHTML = currIndex+" out of "+totalPages;
  viewRecords(recordsHeading,records,id,"next");
}

/* @viewRecords prints the record in table body. 
   'recordsHeading' is an array of table column headings.
   'studentdsRecords' holds the stduent's records.
   'noOfRecordsPerPage' shows the no of records that will be seen on a page.
   'choice' will tell whether it will be a previous button invoking 
      or next button or on changing the value of select tag.
*/
function viewRecords(recordsHeading, studentRecords, noOfRecordsPerPage, choice){
  var recordArea = document.getElementById("dataFetch");
  recordArea.innerHTML = "";
  recordArea.innerHTML = "<br>";
  var count = 0;
  endingIndex = noOfRecordsPerPage;

  if(choice == "prev"){
    startingIndex = parseInt(startingIndex)  - parseInt(noOfRecordsPerPage);
    endingIndex = parseInt(startingIndex) + parseInt(noOfRecordsPerPage);
  }

  if(choice == "next"){
    startingIndex = parseInt(startingIndex) + parseInt(noOfRecordsPerPage);
    if(studentRecords.length < (parseInt(startingIndex)+parseInt(noOfRecordsPerPage))){
      endingIndex = studentRecords.length;
    }
    else{
      endingIndex = parseInt(startingIndex)+parseInt(noOfRecordsPerPage);
    }
  }

  for(var index = startingIndex; index < endingIndex; index++){
    for(var innerKey = 0; innerKey < recordsHeading.length; innerKey++){
      recordArea.innerHTML += "<div id = 'record'>" + studentRecords[index][recordsHeading[innerKey]] + "</div>";
    }
    recordArea.innerHTML += "<br><br>";
    count++;
  }
  
}

/* This class initializes the constructor that is creating the UI. 
   Parameter 'data' is representing the student's record that is displayed on DOM.
   Parameter 'containerId' is representing the main div tag's id present in index.html file. 
*/
function PaginationTable(data,containerId){

  var pluginInfo = document.getElementById(containerId);

  // This object is keeping the behaviour of the class.
  var globalState = {
    tableColHeading : header,                 //'header' is an array of table column headings.
    records : data,                          
    dropDownList : [5,10,15,20,25],         
    noOfRecordsPerPage : 5
  };    

  // Default constructor.
  function init(){
    createView(pluginInfo);                                      //Creates the view of DOM.
    createTableHeader(globalState.tableColHeading);             //Creates the table header. 
    createTableBody();                                         //Creates table body.
    createTableActions();                                     //Creates actions that can be performed on table.
  }
    
  // @createTableBody calls the function @viewRecords that prints the data in table body.
  function createTableBody(){
    viewRecords(globalState.tableColHeading,globalState.records,globalState.noOfRecordsPerPage,1);
  }

  /* @createTableActions creates select tag by calling @createSelectTag method.
      It defines the onchange method for select tag created.
      It creates previous and next button.
      It defines the onclick method for previous and next button.
  */ 
  function createTableActions(){
    var selectTag = createSelectTag(globalState.dropDownList);  //Creating select tag.
    var pagination = document.getElementById("pagination");
    pagination.appendChild(selectTag);
    var selectedId = document.getElementById("selectId");
    selectedId.onchange = function(){
      globalState.noOfRecordsPerPage = selectedId.value;        //Resting no of records per page.
      selectOnChange(globalState.noOfRecordsPerPage, globalState.records, globalState.tableColHeading);
    }

    prevBtn = createPrevBtn();   //Creating Previous Button that when clicked can view previous page.
    pagination.appendChild(prevBtn);
    prevBtn.onclick = function(){
      currIndex--;
      checkStatusOfButtons(prevBtn,nextBtn);  //Checking of statuses of button.
      goPrevPage(globalState.tableColHeading,globalState.records,globalState.noOfRecordsPerPage);
    };

    nextBtn = createNextBtn();  //Creating Next Button that when clicked can view next page.
    pagination.appendChild(nextBtn);
    nextBtn.onclick = function(){
      currIndex++;
      checkStatusOfButtons(prevBtn,nextBtn);  //Checking of statuses of button.
      goNextPage(globalState.tableColHeading,globalState.records,globalState.noOfRecordsPerPage);
    };

    var currPageAreaObj = new SetTagProperties();
    currPageAreaObj.attributeValue = "currPageAreaId";
    currPageArea = createDynamicHtmlTags(currPageAreaObj);
    pagination.appendChild(currPageArea);
    var currPageAreaId = document.getElementById("currPageAreaId");
    currPageAreaId.innerHTML = currIndex+" out of "+totalPages;
    //checkStatusOfButtons(prevBtn,nextBtn);  //Checking of statuses of button.
  }
  
  init();  //Initialization of constructor.

}
