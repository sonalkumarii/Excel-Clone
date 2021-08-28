let body = document.querySelector("body");
body.spellcheck = false;

let menuBarPTags = document.querySelectorAll(".menu-bar p");
let columnTags = document.querySelector(".column-tags");
let rowNumbers = document.querySelector(".row-numbers");
let grid = document.querySelector(".grid");
let oldCell;
let formulaSelectCell = document.querySelector("#selected-cell-formula");
let forumlaInput = document.querySelector("#complete-formula");

let dataObj = {};

//===============================FILE SECTION========================================

let fileOptions = menuBarPTags[0];

fileOptions.addEventListener("click", function (e) {
    if (e.currentTarget.classList.length == 0) {
      e.currentTarget.innerHTML = `File
      <span>
       <span>Clear</span>
       <span>Open</span>
       <span>Save</span>
      </span>`;
  
      let allFileOptions = e.currentTarget.querySelectorAll("span>span");
  
      //clear
      allFileOptions[0].addEventListener("click", function () {
        let allCells = document.querySelectorAll(".cell");
        
        for (let i = 0; i < allCells.length; i++) {
          allCells[i].innerText = "";
          allCells[i].style.backgroundColor="white";
          let cellAdd = allCells[i].getAttribute("data-address");
          dataObj[cellAdd] = {
            value: "",
            formula: "",
            upstream: [],
            downstream: [],
            fontSize: 10+"px",
            fontFamily: "Arial",
            fontWeight: "normal",
            color: "black",
            backgroundColor: "white",
            underline: "none",
            strikethrough : "none",
            italics: "normal",
            textAlign: "left",
          };
        }
      });
  
      //open
      allFileOptions[1].addEventListener("click", function () {
        dataObj = JSON.parse(localStorage.getItem("sheet"));
  
        for (let j = 1; j <= 100; j++) {
          for (let i = 0; i < 26; i++) {
            let address = String.fromCharCode(i + 65) + j;
            let cellObj = dataObj[address];
            let cellOnUi = document.querySelector(`[data-address=${address}]`);
            cellOnUi.innerText = cellObj.value;
            cellOnUi.style.backgroundColor = cellObj.backgroundColor;
            cellOnUi.style.fontWeight = cellObj.fontWeight;
            cellOnUi.style.fontStyle = cellObj.italics;
            cellOnUi.style.textAlign = cellObj.textAlign;
            cellOnUi.style.color = cellObj.color;
            cellOnUi.style.fontFamily = cellObj.fontFamily;
            cellOnUi.style.fontSize = cellObj.fontSize +"px";
            cellOnUi.style.textDecoration = cellObj.underline;
            cellOnUi.style.textDecorationLine = cellObj.strikethrough;
          }
        }
      });
  
      //save
      allFileOptions[2].addEventListener("click", function () {
        let string= dataObj;
        localStorage.setItem("sheet", JSON.stringify(string));
      });
    } else {
      e.currentTarget.innerHTML = `File`;
    }
});

//==============================================MENU BAR=============================================================

for(let i=0;i<menuBarPTags.length;i++){
    menuBarPTags[i].addEventListener("click",function(e){
        if(e.currentTarget.classList.contains("menu-bar-option-selected")){
            e.currentTarget.classList.remove("menu-bar-option-selected");
        }else{

            for(let j=0;j<menuBarPTags.length;j++){
                if(menuBarPTags[j].classList.contains("menu-bar-option-selected"))
                    menuBarPTags[j].classList.remove("menu-bar-option-selected");
            }

            e.currentTarget.classList.add("menu-bar-option-selected");
        }
    });
}

//==========================================GRID=======================================================

for (let i = 0; i < 26; i++) {
    let div = document.createElement("div");
    div.classList.add("column-tag-cell");
    div.innerText = String.fromCharCode(65 + i);
    columnTags.append(div);
}

for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.classList.add("row-number-cell");
    div.innerText = i;
    rowNumbers.append(div);
}
  
for (let j = 1; j <= 100; j++) {
    let row = document.createElement("div");
    row.classList.add("row");
  
    for (let i = 0; i < 26; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        let address = String.fromCharCode(i + 65) + j;
        cell.setAttribute("data-address", address);
    
        dataObj[address] = {
        value: "",
        formula: "",
        upstream: [],
        downstream: [],
        fontSize: 10 + "px",
        fontFamily: "Arial",
        fontWeight: "normal",
        color: "black",
        backgroundColor: "white",
        underline: "none",
        strikethrough : "none",
        italics: "normal",
        textAlign: "left",
    }
  
    cell.addEventListener("click", function (e) {
        if (oldCell) {
            oldCell.classList.remove("grid-selected-cell");
        }
        
        e.currentTarget.classList.add("grid-selected-cell");
  
        let cellAddress = e.currentTarget.getAttribute("data-address");
  
        formulaSelectCell.value = cellAddress;
  
        oldCell = e.currentTarget;
    });
  
    cell.addEventListener("input", function (e) {
        console.log(e.currentTarget.innerText);
        let address = e.currentTarget.getAttribute("data-address");
        dataObj[address].value = Number(e.currentTarget.innerText);
  
        dataObj[address].formula = "";
  
        let currCellUpstream = dataObj[address].upstream;
  
        for (let i = 0; i < currCellUpstream.length; i++) {
            removeFromUpstream(address, currCellUpstream[i]);
        }
  
        dataObj[address].upstream = [];
  
        let currCellDownstream = dataObj[address].downstream;
  
        for (let i = 0; i < currCellDownstream.length; i++) {
            updateDownstreamElements(currCellDownstream[i]);
        }
    });
  
        cell.contentEditable = true;
        row.append(cell);
    }
    grid.append(row);
  }
  
//===================================FORMULA INPUT============================================

forumlaInput.addEventListener("change", function (e) {
    let formula = e.currentTarget.value; 
    let selectedCellAddress = oldCell.getAttribute("data-address");
    dataObj[selectedCellAddress].formula = formula;
    let formulaArr = formula.split(" "); 
    let elementsArray = [];
  
    for (let i = 0; i < formulaArr.length; i++) {
      if (
        formulaArr[i] != "+" &&
        formulaArr[i] != "-" &&
        formulaArr[i] != "*" &&
        formulaArr[i] != "/" &&
        isNaN(Number(formulaArr[i]))
      ) {
        elementsArray.push(formulaArr[i]);
      }
    }
  
    let oldUpstream = dataObj[selectedCellAddress].upstream;
  
    for (let k = 0; k < oldUpstream.length; k++) {
      removeFromUpstream(selectedCellAddress, oldUpstream[k]);
    }
  
    dataObj[selectedCellAddress].upstream = elementsArray;
  
    for (let j = 0; j < elementsArray.length; j++) {
      addToDownstream(selectedCellAddress, elementsArray[j]);
    }
  
    let valObj = {};
  
    for (let i = 0; i < elementsArray.length; i++) {
      let formulaDependency = elementsArray[i];
  
      valObj[formulaDependency] = dataObj[formulaDependency].value;
    }
  
    for (let j = 0; j < formulaArr.length; j++) {
      if (valObj[formulaArr[j]] != undefined) {
        formulaArr[j] = valObj[formulaArr[j]];
      }
    }
  
    formula = formulaArr.join(" ");
    let newValue = eval(formula);
  
    dataObj[selectedCellAddress].value = newValue;
  
    let selectedCellDownstream = dataObj[selectedCellAddress].downstream;
  
    for (let i = 0; i < selectedCellDownstream.length; i++) {
      updateDownstreamElements(selectedCellDownstream[i]);
    }
  
    oldCell.innerText = newValue;
    forumlaInput.value = "";
  });
  
  function addToDownstream(tobeAdded, inWhichWeAreAdding) {
    let reqDownstream = dataObj[inWhichWeAreAdding].downstream;
  
    reqDownstream.push(tobeAdded);
  }

function removeFromUpstream(dependent, onWhichItIsDepending) {
    let newDownstream = [];
  
    let oldDownstream = dataObj[onWhichItIsDepending].downstream;
  
    for (let i = 0; i < oldDownstream.length; i++) {
        if (oldDownstream[i] != dependent) 
          newDownstream.push(oldDownstream[i]);
    }
    dataObj[onWhichItIsDepending].downstream = newDownstream;
}
  
function updateDownstreamElements(elementAddress) {
    let valObj = {};
  
    let currCellUpstream = dataObj[elementAddress].upstream;
  
    for (let i = 0; i < currCellUpstream.length; i++) {
        let upstreamCellAddress = currCellUpstream[i];
        let upstreamCellValue = dataObj[upstreamCellAddress].value;
  
        valObj[upstreamCellAddress] = upstreamCellValue;
    }

    let currFormula = dataObj[elementAddress].formula;
    
    let formulaArr = currFormula.split(" ");

    for (let j = 0; j < formulaArr.length; j++) {
        if (valObj[formulaArr[j]]) {
            formulaArr[j] = valObj[formulaArr[j]];
        }
    }
  
    currFormula = formulaArr.join(" ");
  
    let newValue = eval(currFormula);
  
    dataObj[elementAddress].value = newValue;
  
    let cellOnUI = document.querySelector(`[data-address=${elementAddress}]`);
    cellOnUI.innerText = newValue;
  
    let currCellDownstream = dataObj[elementAddress].downstream;
  
    if (currCellDownstream.length > 0) {
        for (let k = 0; k < currCellDownstream.length; k++) {
            updateDownstreamElements(currCellDownstream[k]);
        }
    }
}