grid.addEventListener("scroll", function (e) {

    let currDistanceFromTop = e.currentTarget.scrollTop; //vertical
    let currDistanceFromleft = e.currentTarget.scrollLeft;
  
    columnTags.style.transform = `translateX(-${currDistanceFromleft}px)`;
  
    rowNumbers.style.transform = `translateY(-${currDistanceFromTop}px)`;
    
  
});

// let prevTopScroll;
// let prevLeftScroll;

// grid.addEventListener("scroll",function (e){
//     let currTopScroll = e.currentTarget.scrollTop;
//     let currLeftScroll = e.currentTarget.scrollLeft;

//     if(currTopScroll != prevTopScroll && currLeftScroll != prevLeftScroll){
//         prevTopScroll=currTopScroll;
//         prevLeftScroll=currLeftScroll;
//         columnTags.classList.add("column-tags-atke");
//         rowNumbers.classList.add("row-numbers-atke");
//     }else if(currLeftScroll != prevLeftScroll){
//         //Horizontal scroll has happen and happening

//         prevLeftScroll=currLeftScroll;
//         columnTags.classList.remove("column-tags-atke");
//         rowNumbers.classList.add("row-numbers-atke");
//     }else if(currTopScroll != prevTopScroll){
//         //vertical scroll has happen and happening
//         prevTopScroll=currTopScroll;

//         //fix the column tag
//         columnTags.classList.add("column-tags-atke");
//         rowNumbers.classList.remove("row-numbers-atke");
//     }
// });