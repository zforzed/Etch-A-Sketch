let gridSide = 4;
// add first load grid 4x4 with eventListener for each square
createGrid(gridSide);
function createGrid(gridSide) {
   document.querySelector(".container").innerHTML=""; 
   let squareWidth = (Math.floor((100/gridSide)*10))/10+"%";
   for (let i = 0; i < gridSide*gridSide; i++) {
      document.querySelector(".container").innerHTML += "<div class='square' style='width:"+squareWidth+"'></div>";
   }
   document.querySelectorAll(".square").forEach(item => {
      item.addEventListener("mouseover", (event) => {
         event.target.classList.add("square-hover");
      });
   });
}
// button with popup to set grid side size
document.querySelector("button").addEventListener("click", (event) => {
   gridSide = Number(prompt("Grid side size: "));
   createGrid(gridSide);
});


