const btn_easy = document.querySelector(".easy");
const shades_container = document.querySelector(".shades_container");
const btn_hard = document.querySelector(".hard");
const rgb_value = document.querySelector(".rgb_value");
const colors_play = document.querySelector(".colors_play");
const header = document.querySelector(".header");
const try_again = document.querySelector(".try_again");
var arr = [];
var diff = 1;

function pre_load_easy(){
   if(diff===1){
    try_again.textContent = "";
    shades_container.classList.remove("trans");
    shades_container.innerHTML = `<div class="colors one">
                                    <div class="shade"></div>
                                    <div class="shade"></div>
                                    <div class="shade"></div>
                                  </div>`
    const shade_array = document.querySelectorAll(".shade");
    rgb(shade_array);
    diff = 0;
   }
}

window.addEventListener("DOMContentLoaded", pre_load_easy);

btn_easy.addEventListener("click", pre_load_easy);

btn_hard.addEventListener("click", hard_colors);

function rgb(item){
    arr = rgb_generator();
    rgb_value.textContent = `RGB(${arr[0]}, ${arr[1]}, ${arr[2]})`;
    var rand = Math.floor(Math.random()*item.length);
    item[rand].style.backgroundColor = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
    color_assignment(item);
    color_click(item);
}

function rgb_generator(){
  var arr_gen = [];
  for(let i=0; i<3; i++){
      arr_gen.push(Math.floor(Math.random()*255));
  }
  return arr_gen;
}

function color_assignment(item){
  item.forEach(function(item){
    var new_arr = rgb_generator();
    if(new_arr[0]===arr[0]&&
      new_arr[1]===arr[1]&&
      new_arr[2]===arr[2]){
        color_assignment(item);
      }
    else {
      if(item.style.backgroundColor!=`rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`){
        item.style.backgroundColor = `rgb(${new_arr[0]}, ${new_arr[1]}, ${new_arr[2]})`
      }
    } 
  }); 
}

colors_play.addEventListener("click", new_colors);

function color_click(item) {
  item.forEach(function(i){
    i.addEventListener("click", function(){
      if(i.style.backgroundColor===`rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`){
        remove_events();
        header.style.backgroundColor = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
        item.forEach(function(a){
          a.style.backgroundColor=`rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
        });
        try_again.textContent = "PLAY AGAIN!";
        try_again.classList.add("again");
        if(try_again.textContent!="TRY AGAIN!" && try_again.textContent!=""){
          try_again.addEventListener("click", function(){
            try_again.textContent = "";
            header.style.backgroundColor = "aqua";
            rgb(item);
            add_events();
          });
        }
      }
      else {
        try_again.classList.remove("again");
        i.style.backgroundColor = "#302a29";
        try_again.textContent = "TRY AGAIN!";
      }
    });
  });
}

function new_colors(){
  try_again.textContent = "";
  const shades_arr = document.querySelectorAll(".shade");
  rgb(shades_arr);
}

function hard_colors (){
  if(diff===0){
    try_again.textContent = "";
    shades_container.innerHTML = `<div class="colors one">
                                  <div class="shade"></div>
                                  <div class="shade"></div>
                                  <div class="shade"></div>
                                </div>
                                <div class="colors two">
                                  <div class="shade"></div>
                                  <div class="shade"></div>
                                  <div class="shade"></div>
                                </div>`
  const shade_two = document.querySelector(".two");
  shade_two.style.display = "flex";
  shades_container.classList.add("trans");
  const shade_array = document.querySelectorAll(".shade");
  rgb(shade_array);
  diff = 1;
  }
}

function remove_events (){
  colors_play.removeEventListener("click", new_colors);
  btn_easy.removeEventListener("click", pre_load_easy);
  btn_hard.removeEventListener("click", hard_colors);
}

function add_events(){
  colors_play.addEventListener("click", new_colors);
  btn_easy.addEventListener("click", pre_load_easy);
  btn_hard.addEventListener("click", hard_colors);
}