
let hamburger = document.querySelector("button");
hamburger.addEventListener("click",function() {
    document.getElementById("left-side").style.display = "none";
    document.getElementById("container").style.gridTemplateColumns = "2fr 1fr";
})