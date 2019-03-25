var pluginInfo = document.getElementById("pluginId");  
var domTag;           
var currIndex = 1;    // This variable is used to navigate across the pages. 
var startingIndex = 0;  //starting index from where the data will be visible.
var endingIndex ;      // ending index till where data will be visible.
var totalPages = 9;   //no of total pages.

/* */
function goPrevPage(recordsHeading,records,id){
  viewRecords(recordsHeading,records,id,"prev");
}

/* */
function goNextPage(recordsHeading, records, id){
  viewRecords(recordsHeading,records,id,"next");
}

/* */
function createPrevBtn(){
  TAG_PROPERTIES.TagName = "input";
  TAG_PROPERTIES.type = "button";
  TAG_PROPERTIES.value = "PREVIOUS";
  TAG_PROPERTIES.attributeValue = "prev";
  prevBtn = createDynamicHtmlTags(TAG_PROPERTIES);
  return prevBtn;
}

/* */
function createNextBtn(){
  TAG_PROPERTIES.TagName = "input";
  TAG_PROPERTIES.type = "button";
  TAG_PROPERTIES.value = "NEXT";
  TAG_PROPERTIES.attributeValue = "next";
  nextBtn = createDynamicHtmlTags(TAG_PROPERTIES);
  return nextBtn;
}

// It sets the properties of the tag created.
const TAG_PROPERTIES = {
  "TagName" : "div",
  "type" : "",
  "value" : "",
  "attributeKey" : "id",
  "attributeValue" : ""
};

/* */
function createDynamicHtmlTags(setPropertiesOfTag){
  domTag = document.createElement(setPropertiesOfTag.TagName);
  if (setPropertiesOfTag.type != undefined && setPropertiesOfTag.value != undefined){
    domTag.setAttribute("type",setPropertiesOfTag.type);
    domTag.setAttribute("value",setPropertiesOfTag.value);
  }
  if (setPropertiesOfTag.attributeKey != undefined && setPropertiesOfTag.attributeValue != undefined){
    domTag.setAttribute(setPropertiesOfTag.attributeKey , setPropertiesOfTag.attributeValue);
  }
  return domTag;
}  

/* This class creates the UI and */
function PaginationTable(data,containerId){
  var globalState = {
    tableColHeading : header,
    records : data,
    dropDownList : [5,10,15,20,25],
    noOfRecordsPerPage : 5
  };    

  function init(){
    createView();
    createTableHeader();
    createTableBody();
    createTableActions();
  }

  function createTableHeader(){
    var headerTitleHeadingsConatainer = document.getElementById("headingId");
    headerTitleHeadingsConatainer.innerHTML = "";
    //This loop is creating the headings of the columns in table.    
    for(var index = 0; index < globalState.tableColHeading.length; index++){
      headerTitleHeadingsConatainer.innerHTML += "<div id = headerNav>" + globalState.tableColHeading[index] + "</div>";
    }
  }
    
  function createTableBody(){
    viewRecords(globalState.tableColHeading,globalState.records,globalState.noOfRecordsPerPage,1);
  }

  function createTableActions(){
    var selectTag = createSelectTag(globalState.dropDownList);
    var pagination = document.getElementById("pagination");
    pagination.appendChild(selectTag);
    var selectedId = document.getElementById("selectId");
    selectedId.onchange = function(){
      startingIndex = 0;
      currIndex = 1;
      globalState.noOfRecordsPerPage = selectedId.value;
      console.log(typeof globalState.records.length);
      console.log(typeof globalState.noOfRecordsPerPage);
      
      totalPages = Math.ceil(globalState.records.length/parseInt(globalState.noOfRecordsPerPage));
      console.log(totalPages);
      checkStatusOfButtons(prevBtn,nextBtn);
      viewRecords(globalState.tableColHeading,globalState.records,selectedId.value);
    }
    prevBtn = createPrevBtn();
    pagination.appendChild(prevBtn);
    prevBtn.onclick = function(){
      currIndex--;
      checkStatusOfButtons(prevBtn,nextBtn);
      goPrevPage(globalState.tableColHeading,globalState.records,globalState.noOfRecordsPerPage);
    };
    nextBtn = createNextBtn();
    pagination.appendChild(nextBtn);
    nextBtn.onclick = function(){
      currIndex++;
      checkStatusOfButtons(prevBtn,nextBtn);
      goNextPage(globalState.tableColHeading,globalState.records,globalState.noOfRecordsPerPage);
    };
    checkStatusOfButtons(prevBtn,nextBtn);
  }

  init();  //Initialization of constructor.

}

/* */
function checkStatusOfButtons(prevBtn,nextBtn){
  console.log("status cehcking...");
  console.log(totalPages);
  console.log("curr index: ",currIndex);
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  if(currIndex == 1)
    prevBtn.disabled = true;
  if(currIndex == totalPages)
    nextBtn.disabled = true;
}

/* */
function createView(){
    
  TAG_PROPERTIES.attributeValue = "headingId";
  headerTitleHeadingsConatainer = createDynamicHtmlTags(TAG_PROPERTIES);
  pluginInfo.appendChild(headerTitleHeadingsConatainer);

  TAG_PROPERTIES.attributeValue = "dataFetch";
  dataInfoContainer = createDynamicHtmlTags(TAG_PROPERTIES);
  pluginInfo.appendChild(dataInfoContainer);

  TAG_PROPERTIES.attributeValue = "paginationContainer";
  paginationContainer = createDynamicHtmlTags(TAG_PROPERTIES);
  pluginInfo.appendChild(paginationContainer);

  TAG_PROPERTIES.attributeValue = "pagination";
  paginationInnerContainer = createDynamicHtmlTags(TAG_PROPERTIES);
  paginationContainer.appendChild(paginationInnerContainer);

}

/* */
function createSelectTag(dropDownList){
  TAG_PROPERTIES.TagName = "select";
  TAG_PROPERTIES.attributeValue = "selectId";
  selectTag = createDynamicHtmlTags(TAG_PROPERTIES);
  var optionOfSelect = [];
  for(var index = 0; index < dropDownList.length; index = index + 1) {
    optionOfSelect[index] = document.createElement("option");
    optionOfSelect[index].innerHTML += dropDownList[index];
    selectTag.appendChild(optionOfSelect[index]);
  }
  return selectTag;
}

/* */
function viewRecords(recordsHeading, studentRecords, noOfRecordsPerPage,choice){
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

  console.log("start index: ",startingIndex);
  console.log("end index: ",endingIndex);
  for(var index = startingIndex; index < endingIndex; index++){
    for(var innerKey = 0; innerKey < recordsHeading.length; innerKey++){
      recordArea.innerHTML += "<div id = 'record'>" + studentRecords[index][recordsHeading[innerKey]] + "</div>";
    }
    recordArea.innerHTML += "<br><br>";
    count++;
  }
 // startingIndex = startingIndex + count;  

  console.log("start index: ",startingIndex);
  console.log("end index: ",endingIndex);
  
}
