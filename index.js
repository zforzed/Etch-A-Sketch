let div = document.createElement('div');
for (let i=0; i<16; i++) {
   document.querySelector(".container").innerHTML += "<div class='square'></div>";
}

document.querySelectorAll(".square").forEach(item => {
   item.addEventListener("mouseover", (event) => {
      event.target.classList.add("square-hover");
   });
});
