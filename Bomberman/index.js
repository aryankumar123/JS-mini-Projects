const body = document.getElementsByTagName("body")[0];
const bombs = [];
let score = 0;
let gameOver = false;
let visitedNodes = [];

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
  window.location.reload();
});

function incrementscore(){
  score++;
  let scoreElement = document.getElementById("score");
  scoreElement.innerHTML = score;
}

function showAllBombs(){
  const allbombs = document.getElementsByClassName("bomb");
  for(let bomb of allbombs){
    bomb.style.background = "red";
  }
}

function creategrid(){
  for(let i=0; i<9;i++){
    //create 9 rows
    const row = document.createElement("div");
    row.style.display = "flex";
    for(let j=0; j<9;j++){
      const column = document.createElement("div");
      column.style.width="30px";
      column.style.height="30px";
      column.style.background = "gray";
      column.style.border = "1px solid black"
      const currentIndex = i * 9 + j;

      if(bombs.includes(currentIndex)){
        column.className = "bomb";
      }

      column.addEventListener("click",() => {
        if(!gameOver){
          if(bombs.includes(currentIndex)){
            column.style.background = "red";
            gameOver = true;
          showAllBombs();
          }else{
            column.style.background = "green";
            if(!visitedNodes.includes(currentIndex)){
              incrementscore();
              visitedNodes.push(currentIndex);
            }
            
          }

        }
        
      });



      row.appendChild(column);
    }
    body.appendChild(row);
  }
}

function generateRandomNumber(){
  //get random number;
  let randomnumber = Math.random();
  randomnumber = randomnumber.toFixed(2);
  randomnumber = randomnumber * 100;
  randomnumber = randomnumber % 81;
  randomnumber = Math.floor(randomnumber);
  return randomnumber;
  // console.log(randomnumber);
}
function placebombs(){
  while(bombs.length < 9){
    const randomnumber =generateRandomNumber();
    if(!bombs.includes(randomnumber)){
      bombs.push(randomnumber);
    }
  }

}


 

// console.log(bombs);
placebombs();

creategrid();