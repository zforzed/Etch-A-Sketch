// add first load grid 4x4 with eventListener for each square
let gridSide = 4;
createGrid(gridSide);

// add two eL to grid to detect whether mouse pressed or not to help detect dragging
let mousePressed = false;
document.querySelector(".grid").addEventListener("mousedown", (event) => {
   mousePressed = true;
});
document.querySelector(".grid").addEventListener("mouseup", (event) => {
   mousePressed = false;
});

// set default paint color and eL for colors in palette, selected color gets border
let paintColor = "rgb(163, 195, 199)";
document.querySelectorAll(".color").forEach(item=>{
   item.addEventListener("click", (event)=>{
      paintColor = window.getComputedStyle(event.target).backgroundColor;
      document.querySelectorAll(".color").forEach(item=>{
         item.style.border = "none";
      });
      event.target.style.border = "2px solid rgb(67, 67, 67)";
   });
});

function createGrid(gridSide) {
   document.querySelector(".grid").innerHTML = "";
   let squareWidth = (Math.floor((600 / gridSide) * 10)) / 10 + "px";
   for (let i = 0; i < gridSide * gridSide; i++) {
      let div = document.createElement("div");
      div.style.width = squareWidth;
      div.classList.add("square");
      div.addEventListener("mouseover", (event) => {
         mousePressed ? event.target.style.backgroundColor = paintColor:null;
         });
      document.querySelector(".grid").appendChild(div);
   }
};

// Button with popup to set grid side size
document.querySelector(".set-grid").addEventListener("click", (event) => {
   gridSide = Number(prompt("Grid side size(1-64): "));
   if (gridSide > 64) {
      alert("Grid size can't be more than 64.")
   } else createGrid(gridSide);
});

// Clear grid to default color
document.querySelector(".clear-grid").addEventListener("click", (event)=>{
   document.querySelectorAll(".square").forEach(item=>{
      item.style.backgroundColor = "rgb(121, 205, 216)";
   });
});

// Erase button set paintColor and removes borders from selected color circle
document.querySelector(".erase-button").addEventListener("click", (event) => {
   paintColor = "rgb(121, 205, 216)";
   document.querySelectorAll(".color").forEach(item => {
      item.style.border = "none";
   });
});



