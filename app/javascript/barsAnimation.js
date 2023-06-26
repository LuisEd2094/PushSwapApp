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
    const move = moves[i];
    const transforTime = 0.5;
    const transitionString = 'transform ' + transforTime + 's ease-in-out'
    const promiseWait = transforTime * 1000;

    console.log(move);
    if (move == 'sa'){
        moveSA(transitionString, promiseWait);
        await new Promise(resolve => setTimeout(resolve, promiseWait));
      }
    else if (move == 'rra'){
      moveRRA (transitionString, promiseWait);
      await new Promise(resolve => setTimeout(resolve, promiseWait));
    }
    else if (move == 'ra')
    {
      moveRA(transitionString, promiseWait);
      await new Promise(resolve => setTimeout(resolve, promiseWait));
    }
    await new Promise(resolve => setTimeout(resolve, promiseWait ));
  }
}



async function moveRA(transitionString, promiseWait){
  var lastBar = document.getElementById('stack-a').lastChild;
  var firstBar = document.getElementById('stack-a').firstChild;
  const translateYValue = (document.getElementById('stack-a').childElementCount - 1) * 100;
  const transitionElements = document.querySelectorAll('#stack-a :not(:first-child):not(:last-child)');

  await new Promise(resolve => setTimeout(resolve, promiseWait));
  lastBar.style.transition = transitionString
  firstBar.style.transition = transitionString

  
  lastBar.style.transform = 'translateY(-100%)';
  firstBar.style.transform = 'translateY(' + translateYValue + '%)';

  transitionElements.forEach(element => {
    element.style.transition = transitionString
    element.style.transform = 'translateY(-100%)'
  });
  await new Promise(resolve => setTimeout(resolve, promiseWait));

  const parent = lastBar.parentNode;
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


async function moveSA(transitionString, promiseWait){
  var lastBar = document.getElementById('stack-a').firstChild;
  var firstBar = document.getElementById('stack-a').children.item(1);


  await new Promise(resolve => setTimeout(resolve, promiseWait));

  lastBar.style.transition = transitionString;
  firstBar.style.transition = transitionString;
  lastBar.style.transform = 'translateY(100%)';
  firstBar.style.transform = 'translateY(-100%)';


  await new Promise(resolve => setTimeout(resolve, promiseWait));


  const parent = lastBar.parentNode;
  parent.insertBefore(firstBar, lastBar);
  parent.insertBefore(lastBar, firstBar.nextSibling);
  lastBar.style.transition = '';
  firstBar.style.transition = '';
  lastBar.style.transform = '';
  firstBar.style.transform = '';

}


async function moveRRA(transitionString, promiseWait){
  
  var lastBar = document.getElementById('stack-a').lastChild;
  var firstBar = document.getElementById('stack-a').firstChild;
  const translateYValue = (document.getElementById('stack-a').childElementCount - 1) * 100;
  const transitionElements = document.querySelectorAll('#stack-a :not(:first-child):not(:last-child)');

  await new Promise(resolve => setTimeout(resolve, promiseWait));
  lastBar.style.transition = transitionString
  firstBar.style.transition = transitionString

  
  lastBar.style.transform = 'translateY(-' + translateYValue + '%)';
  firstBar.style.transform = 'translateY(100%)';

  transitionElements.forEach(element => {
    element.style.transition = transitionString
    element.style.transform = 'translateY(100%)'
  });
  await new Promise(resolve => setTimeout(resolve, promiseWait));
  const parent = lastBar.parentNode;
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
  var leftDiv = document.createElement('div');
  var rightDiv = document.createElement('div');

  if(!barsContainer){
    barsContainer = document.createElement('div');
    barsContainer.classList.add('bars-container');
    barsContainer.style.height = '1000px';
    document.body.appendChild(barsContainer)
  }
  else{
    barsContainer.innerHTML = '';
  }

  leftDiv.style.width = '50%';
  leftDiv.style.height = '100%';
  leftDiv.setAttribute('id', 'stack-a');
  rightDiv.style.width = '50%';
  rightDiv.style.height = '100%';
  rightDiv.setAttribute('id', 'stack-b');

  barsContainer.appendChild(leftDiv);
  barsContainer.appendChild(rightDiv);


  relativeValues.forEach(function(value) {
    var bar = document.createElement('div');
    bar.className = 'bar';
    var barHeightPercentage = (1 / relativeValues.length) * 100; 
    bar.style.height = barHeightPercentage + '%';
    var widthPercentage = (value / relativeValues.length) * 100;
    bar.style.width = widthPercentage + '%';
    var hue = Math.floor(((relativeValues.length - value) / (relativeValues.length - 1)) * 120); 
    bar.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
    leftDiv.appendChild(bar);
  });

}