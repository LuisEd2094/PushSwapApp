function barsAnimation(numbers, moves){
    var relativeValues = [];
    var sortedValues = numbers.slice().sort(function(a, b) {
    return a - b;
    });
    
    for (var i = 0; i < numbers.length; i++) {
      var relativePosition = sortedValues.indexOf(numbers[i]) + 1;
      relativeValues.push(relativePosition);
    }
    firstDraw(relativeValues);
    makeMoves(moves);
}


async function makeMoves(moves){
  for (let i = 0; i < moves.length; i++){
    var move = moves[i];
    const transforTime = 0.01;
    const transitionString = 'transform ' + transforTime + 's ease-in-out'
    const promiseWait = transforTime * 1000;

    console.log(move);
    
    if (move == 'sa' || move == 'sb'){
        moveSX(transitionString, promiseWait, move.slice(-1));
        await new Promise(resolve => setTimeout(resolve, promiseWait));
      }
    else if (move == 'rra' || move == 'rrb'){
      moveRRX (transitionString, promiseWait, move.slice(-1));
      await new Promise(resolve => setTimeout(resolve, promiseWait));
    }
    else if (move == 'ra' || move ==  'rb')
    {
      moveRX(transitionString, promiseWait, move.slice(-1));
      await new Promise(resolve => setTimeout(resolve, promiseWait));
    }
    else if (move == 'pb' || move == 'pa')
    {
      if (move == 'pb')
        origin = 'a'
      else
        origin = 'b'
      movePX(transitionString,promiseWait, move.slice(-1), origin);
      await new Promise(resolve => setTimeout(resolve, promiseWait));
    }
    else if (move == 'rr'){
      moveRX(transitionString, promiseWait, 'a');
      //await new Promise(resolve => setTimeout(resolve, promiseWait));
      moveRX(transitionString, promiseWait, 'b');
      await new Promise(resolve => setTimeout(resolve, promiseWait));
    }
    else if (move == 'rrr'){
      moveRRX (transitionString, promiseWait, 'a');
     // await new Promise(resolve => setTimeout(resolve, promiseWait));
      moveRRX (transitionString, promiseWait, 'b');
      await new Promise(resolve => setTimeout(resolve, promiseWait));
      
    }
    await new Promise(resolve => setTimeout(resolve, promiseWait ));
  }
}


async function movePX(transitionString, promiseWait, destination, origin){

  const barToMove = document.getElementById('stack-' + origin).firstChild;
  const stackTarget = document.getElementById('stack-' + destination);
  const targetPosition = stackTarget.getBoundingClientRect().right;
  const currentPosition = barToMove.getBoundingClientRect().right;
  const toMove = targetPosition - currentPosition;
  const barsUp = document.querySelectorAll('#stack-' + origin + ' :not(:first-child');
  const barsDown = document.querySelectorAll('#stack-' + destination);

  await new Promise(resolve => setTimeout(resolve, promiseWait));
  barToMove.style.transition = transitionString;
  barToMove.style.transform = 'translateX('+ toMove +'px)';

  if (barsUp.length > 0){
    applyTransform(transitionString, '-100', barsUp);
  }
  if (barsDown.length > 0){
    applyTransform(transitionString, '100', barsDown);
  } 
  await new Promise(resolve => setTimeout(resolve, promiseWait));
  stackTarget.insertBefore(barToMove, stackTarget.firstChild);

  barToMove.style.transition = '';
  barToMove.style.transform = '';

  barsDown.forEach(element => {
    element.style.transition = '';
    element.style.transform = ''
  });
  barsUp.forEach(element => {
    element.style.transition = '';
    element.style.transform = ''
  });
  await new Promise(resolve => setTimeout(resolve, promiseWait));

}


function applyTransform(transitionString, change, transitionElements){
  console.log(transitionElements, change);
  transitionElements.forEach(element => {
    element.style.transition = transitionString
    element.style.transform = 'translateY(' + change + '%)'
  });
}

async function moveRX(transitionString, promiseWait, stack){
  
  const [lastBar, firstBar, translateYValue, transitionElements, parent] = assignVariables(stack);
  
  await new Promise(resolve => setTimeout(resolve, promiseWait));
  lastBar.style.transition = transitionString
  firstBar.style.transition = transitionString
  lastBar.style.transform = 'translateY(-100%)';
  firstBar.style.transform = 'translateY(' + translateYValue + '%)';

  applyTransform(transitionString, '-100', transitionElements);
  await new Promise(resolve => setTimeout(resolve, promiseWait));

  parent.insertBefore(firstBar, parent.lastChild.nextSibling);
  lastBar.style.transition = '';
  firstBar.style.transition = '';
  lastBar.style.transform = '';
  firstBar.style.transform = '';

  transitionElements.forEach(element => {
    element.style.transition = '';
    element.style.transform = ''
  });



}


async function moveSX(transitionString, promiseWait, stack){
  var firstBar = document.getElementById('stack-' + stack).firstChild;
  var secondBar = document.getElementById('stack-' + stack).children.item(1);
  const parent = firstBar.parentNode;



  await new Promise(resolve => setTimeout(resolve, promiseWait));

  firstBar.style.transition = transitionString;
  secondBar.style.transition = transitionString;
  firstBar.style.transform = 'translateY(100%)';
  secondBar.style.transform = 'translateY(-100%)';


  await new Promise(resolve => setTimeout(resolve, promiseWait));


  parent.insertBefore(secondBar, firstBar);
  parent.insertBefore(firstBar, secondBar.nextSibling);
  firstBar.style.transition = '';
  secondBar.style.transition = '';
  firstBar.style.transform = '';
  secondBar.style.transform = '';

}


async function moveRRX(transitionString, promiseWait, stack){
  
  const [lastBar, firstBar, translateYValue, transitionElements, parent] = assignVariables(stack);

  await new Promise(resolve => setTimeout(resolve, promiseWait));
  lastBar.style.transition = transitionString
  firstBar.style.transition = transitionString

  
  lastBar.style.transform = 'translateY(-' + translateYValue + '%)';
  firstBar.style.transform = 'translateY(100%)';

  applyTransform(transitionString, '100', transitionElements);
  /*transitionElements.forEach(element => {
    element.style.transition = transitionString
    element.style.transform = 'translateY(100%)'
  });*/
  await new Promise(resolve => setTimeout(resolve, promiseWait));
  parent.insertBefore(lastBar, firstBar);
  parent.insertBefore(firstBar, lastBar.nextSibling);
  lastBar.style.transition = '';
  firstBar.style.transition = '';
  lastBar.style.transform = '';
  firstBar.style.transform = '';

  transitionElements.forEach(element => {
    element.style.transition = '';
    element.style.transform = ''
  });

}





function firstDraw(relativeValues){
  var barsContainer = document.querySelector('.bars-container');
  var leftDiv = createStacks('stack-a')
  var rightDiv = createStacks('stack-b')

  if(!barsContainer){
    barsContainer = document.createElement('div');
    barsContainer.classList.add('bars-container');
    document.body.appendChild(barsContainer)
  }
  else{
    barsContainer.innerHTML = '';
  }
  barsContainer.appendChild(leftDiv);
  barsContainer.appendChild(rightDiv);


  relativeValues.forEach(function(value) {
    var bar = document.createElement('div');
    var barHeightPercentage = (1 / relativeValues.length) * 100; 
    var widthPercentage = (value / relativeValues.length) * 100;
    var hue = Math.floor(((relativeValues.length - value) / (relativeValues.length - 1)) * 120); 

    bar.className = 'bar';
    bar.style.height = barHeightPercentage + '%';
    bar.style.width = widthPercentage + '%';
    bar.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
    leftDiv.appendChild(bar);
  });

}


function createStacks(stackName){
  var stack = document.createElement('div');
  stack.setAttribute('id', stackName);
  stack.classList.add('stack')
  
  return (stack);
}


function assignVariables(stack) {
  var lastBar = document.getElementById('stack-' + stack).lastChild;
  var firstBar = document.getElementById('stack-' + stack).firstChild;
  const translateYValue = (document.getElementById('stack-' + stack).childElementCount - 1) * 100;
  const transitionElements = document.querySelectorAll('#stack-'+ stack + ' :not(:first-child):not(:last-child)');
  const parent = lastBar.parentNode;

  return [lastBar, firstBar, translateYValue, transitionElements, parent];
}