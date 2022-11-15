// add first load grid 4x4 with eventListener for each square
let gridSide = 4;
createGrid(gridSide);

// add two eLlisteners to grid to detect whether mouse pressed or not to help detect dragging
let shadingEffect = false;
let setRandomColor = false;
let eraseMode = false;
let mousePressed = false;
document.querySelector(".grid").addEventListener("mousedown", (event) => {
   mousePressed = true;
});
document.querySelector(".grid").addEventListener("mouseup", (event) => {
   mousePressed = false;
});

// set default paint color and eLlistener for colors in palette, selected color gets border
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

// function creates grid with size parameter
function createGrid(gridSide) {
   document.querySelector(".grid").innerHTML = "";
   let squareWidth = (Math.floor((600 / gridSide) * 10)) / 10 + "px";
   for (let i = 0; i < gridSide * gridSide; i++) {
      let div = document.createElement("div");
      div.style.width = squareWidth;
      div.style.backgroundColor = "rgb(121, 205, 216)";
      div.classList.add("square");
      div.addEventListener("mouseover", (event) => {
         // standard painting without additional modes
         mousePressed && !setRandomColor && !shadingEffect ? event.target.style.backgroundColor = paintColor:null;
         // set square background random color if random color button pressed 
         function random256() {
            return Math.floor(Math.random()*256);
         }
         let randomColor = "rgb("+ random256()+","+ random256()+","+ random256()+")";
         mousePressed && setRandomColor ? event.target.style.backgroundColor = randomColor :null;
         // set shading effect;
         mousePressed && shadingEffect ? event.target.style.backgroundColor = shadeBrush(event.target.style.backgroundColor) :null;
         });
      document.querySelector(".grid").appendChild(div);
   }
};

// Shading brush function gets rgb of current tile and decrease brighness
function shadeBrush(startColor){
   console.log(startColor);
   let rgbArray = startColor.match(/\d+/g);
   rgbArray.forEach((item, index)=>{
      rgbArray[index] -= 20;
      rgbArray[index] < 0 ? rgbArray[index] = 0: null;
   });
   console.log(rgbArray);   
   let newColor = `rgb(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]})`;
   return(newColor);
}

// Button with popup to set grid side size
document.querySelector(".set-grid").addEventListener("click", (event) => {
   shadingEffect = false;
   setRandomColor = false;
   eraseMode = false;
   gridSide = Number(prompt("Grid side size(1-64): "));
   if (gridSide > 64 || gridSide === 0) {
      alert("Grid size can't be more than 64 or equals to 0.")
   } else createGrid(gridSide);
});

// Clear grid to default color
document.querySelector(".clear-grid").addEventListener("click", (event)=>{
   document.querySelectorAll(".square").forEach(item=>{
      item.style.backgroundColor = "rgb(121, 205, 216)";
   });
});

// Erase button set paintColor to default and removes borders from selected color circle
document.querySelector(".erase-button").addEventListener("click", (event) => {
   eraseMode = !eraseMode;
   setRandomColor = false;
   shadingEffect = false;
   document.querySelectorAll(".color").forEach(item => {
      item.style.border = "none";
   });
   eraseMode ? (
      paintColor = "rgb(121, 205, 216)",
      event.target.style.backgroundColor = "rgb(255, 145, 182)",
      document.querySelector(".shading").style.backgroundColor = "rgb(255, 255, 255)",
      document.querySelector(".random-color").style.backgroundColor = "rgb(255, 255, 255)"
      ):event.target.style.backgroundColor = "rgb(255, 255, 255)";
});

// Random color button behaviour. Sets off shading effect
document.querySelector(".random-color").addEventListener("click", (event) => {
   setRandomColor = !setRandomColor;
   eraseMode = false;
   shadingEffect = false;
   setRandomColor ? (
      event.target.style.backgroundColor = "rgb(255, 145, 182)",
      document.querySelector(".erase-button").style.backgroundColor = "rgb(255, 255, 255)",
      document.querySelector(".shading").style.backgroundColor = "rgb(255, 255, 255)"  
   ):event.target.style.backgroundColor = "rgb(255, 255, 255)";
});

// Shading button behaviour. Set off to random color
document.querySelector(".shading").addEventListener("click", (event) => {
   shadingEffect = !shadingEffect;
   eraseMode = false;
   setRandomColor = false;
   shadingEffect ? (
      event.target.style.backgroundColor = "rgb(255, 145, 182)",
      document.querySelector(".random-color").style.backgroundColor = "rgb(255, 255, 255)",
      document.querySelector(".erase-button").style.backgroundColor = "rgb(255, 255, 255)"  
   ):event.target.style.backgroundColor = "rgb(255, 255, 255)";
});


