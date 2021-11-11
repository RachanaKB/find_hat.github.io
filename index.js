const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
gameStatus = true;

class Field {
  constructor(field){
    this.field = field;
    this.x = 0;
    this.y = 0;
  }
print(){
  console.log(this.field.map(i=>{
    return i.join('')
  }).join('\n'));
}
static generateField(height, width, percentage) {
  let gameArray = [];
  for(let i=0;i<height;i++) {
    let array = [];
    for(let j=0;j<width;j++) {
      if((Math.floor(Math.random()*100))< percentage) {
        array.push(hole);
      }else{
        array.push(fieldCharacter);
      }
    }
    gameArray.push(array);
  }
  do{
    gameArray[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hat;
  }while(gameArray[0][0]==hat)
  gameArray[0][0] = pathCharacter;
  return gameArray;
}
userMove(){
  let move = prompt('Which Direction would you like to move (Type "u" for up, "d" for down, "r" for right, "l" for left)   :  '
)
switch (move.toLowerCase()) {
  case 'u':
    this.x -= 1;
    break;
  case 'd':
    this.x += 1;
    break;
  case 'r':
    this.y += 1;
    break;
  case 'l':
    this.y -= 1;
    break;
  default:
    console.log('Please enter valid input');

}
}
checkWin(){
    if(this.field[this.x] == undefined){
      console.log('out of bound');
      gameStatus = false;
    }else{
        switch(this.field[this.x][this.y]){
    case '░':
      this.field[this.x][this.y] = pathCharacter;
      break;
    case 'O':
      console.log('Loses by landing on a hole.');
      gameStatus = false;
      break;
    case '^':
      console.log('you found hat.');
      gameStatus = false;
      break;
    case undefined :
      console.log('out of bound.');
      gameStatus = false;
      break;
  }
    }
}
}
const myField = new Field(Field.generateField(10, 10, 30))

while(gameStatus){
  myField.print();
  myField.userMove();
  myField.checkWin();
}
console.log('gameOver');

