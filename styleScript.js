let colorSpans = document.querySelectorAll(".colors span");
let fontColorBtn = colorSpans[0];
let backgroundColorBtn = colorSpans[1];

let fontStyles = document.querySelectorAll(".b-u-i span");
let boldBtn =fontStyles[0];
let italicBtn = fontStyles[1];
let underlineBtn = fontStyles[2];
let strikethroughBtn = fontStyles[3];

let alignmentSpans = document.querySelectorAll(".alignment span");
let leftAlignBtn = alignmentSpans[0]
let centerAlignBtn = alignmentSpans[1]
let rightAlignBtn = alignmentSpans[2]

//==================FONT STYLING SECTION

let fontSizeDD = document.getElementById('cell-font-size');
fontSizeDD.onchange = function () {
    oldCell.style.fontSize = this.value +"px";
    let address = oldCell.getAttribute("data-address");
    dataObj[address].fontSize=this.value +"px";
};

let changeFontStyle = function (font) {
  oldCell.style.fontFamily = font.value;
  let address = oldCell.getAttribute("data-address");
  dataObj[address].fontFamily=font.value;
}

//===============FONT WEIGHT/STYLE/TEXT-DECORATION SECTION=======================

boldBtn.addEventListener("click",function(e){
  oldCell.style.fontWeight ="bold";
  let address = oldCell.getAttribute("data-address");
  dataObj[address].fontWeight="bold";
});

boldBtn.addEventListener("dblclick",function(){
  if(oldCell.style.fontWeight=="bold"){
    oldCell.style.removeProperty('font-weight')
    let address = oldCell.getAttribute("data-address");
    dataObj[address].fontWeight="normal";
  }
});

underlineBtn.addEventListener("click",function(e){
  oldCell.style.textDecoration ="underline";
  let address = oldCell.getAttribute("data-address");
  dataObj[address].underline="underline";
});

underlineBtn.addEventListener("dblclick",function(){
  if(oldCell.style.textDecoration=="underline"){
    oldCell.style.removeProperty('text-decoration')
    let address = oldCell.getAttribute("data-address");
    dataObj[address].underline="none";
  }
});

strikethroughBtn.addEventListener("click",function(e){
  oldCell.style.textDecorationLine ="line-through";
  let address = oldCell.getAttribute("data-address");
  dataObj[address].strikethrough="line-through";
});

strikethroughBtn.addEventListener("dblclick",function(){
  if(oldCell.style.textDecorationLine=="line-through"){
    oldCell.style.removeProperty('text-decoration-line')
    let address = oldCell.getAttribute("data-address");
    dataObj[address].strikethrough="none";
  }
});

italicBtn.addEventListener("click",function(e){
  oldCell.style.fontStyle ="italic";
  let address = oldCell.getAttribute("data-address");
  dataObj[address].italics="italic";
});

italicBtn.addEventListener("dblclick",function(){
  if(oldCell.style.fontStyle=="italic"){
    oldCell.style.removeProperty('font-style')
    let address = oldCell.getAttribute("data-address");
    dataObj[address].italics="normal";
  }
});

//===============ALIGNMENT SECTION================================

leftAlignBtn.addEventListener("click",function(){
    oldCell.style.textAlign = "left"
    let address = oldCell.getAttribute("data-address");
    dataObj[address].textAlign = "left";
})

rightAlignBtn.addEventListener("click",function(){
    oldCell.style.textAlign = "right"
    let address = oldCell.getAttribute("data-address");
    dataObj[address].textAlign = "right";
})


centerAlignBtn.addEventListener("click",function(){
    oldCell.style.textAlign = "center"
    let address = oldCell.getAttribute("data-address");
    dataObj[address].textAlign = "center";
})

//====================COLOR'S SECTION================================

fontColorBtn.addEventListener("click", function () {
  let colorPicker = document.createElement("input");
  colorPicker.type = "color";

  colorPicker.addEventListener("change", function (e) {
    oldCell.style.color = e.currentTarget.value;
    let address = oldCell.getAttribute("data-address");
    dataObj[address].color = e.currentTarget.value;
  });

  colorPicker.click();
});

backgroundColorBtn.addEventListener("click", function () {
  let colorPicker = document.createElement("input");
  colorPicker.type = "color";

  colorPicker.addEventListener("change", function (e) {
    oldCell.style.backgroundColor = e.currentTarget.value;
    let address = oldCell.getAttribute("data-address");
    dataObj[address].backgroundColor = e.currentTarget.value;

    console.log(dataObj[address]);
  });

  colorPicker.click();
});