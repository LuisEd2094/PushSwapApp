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


function makeMoves(moves){
  //const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < moves.length; i++){
    const move = moves[i];
    var bar1 = document.querySelector('.bar:first-child');
    var bar2 = document.querySelector('.bar:nth-child(2)');
    if (move == 'sa'){
      setTimeout(() => {
        bar1.style.transition = 'transform 0.5s ease-in-out';
        bar2.style.transition = 'transform 0.5s ease-in-out';
        bar1.style.transform = 'translateY(100%)';
        bar2.style.transform = 'translateY(-100%)';
      }, 100);
      setTimeout(() =>{
      const parent = bar1.parentNode;
      parent.insertBefore(bar2, bar1);
      parent.insertBefore(bar1, bar2.nextSibling);
      bar1.style.transition = '';
      bar2.style.transition = '';
      bar1.style.transform = 'none';
      bar2.style.transform = 'none';
    }, 600)
    }
    
  }


}

function firstDraw(relativeValues){
  var barsContainer = document.querySelector('.bars-container');

  if(!barsContainer){
    barsContainer = document.createElement('div');
    barsContainer.classList.add('bars-container');
    barsContainer.style.height = '1000px';
    document.body.appendChild(barsContainer)
  }
  else{
    barsContainer.innerHTML = '';
  }
  var leftDiv = document.createElement('div');
  leftDiv.style.width = '50%';
  leftDiv.style.height = '100%';

  var rightDiv = document.createElement('div');
  rightDiv.style.width = '50%';
  rightDiv.style.height = '100%';

  barsContainer.appendChild(leftDiv);
  barsContainer.appendChild(rightDiv);
  
  relativeValues.forEach(function(value) {
    var bar = document.createElement('div');
    bar.className = 'bar';
    var barHeightPercentage = (1 / relativeValues.length) * 100; // Calculate the height percentage based on the number of bars
    bar.style.height = barHeightPercentage + '%';
    var widthPercentage = (value / relativeValues.length) * 100;

    // Set the bar's width
    bar.style.width = widthPercentage + '%';
    var hue = Math.floor(((relativeValues.length - value) / (relativeValues.length - 1)) * 120); // Ranges from 0 to 120 (red to green)
    // Set the bar's background color using HSL format
    bar.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
    leftDiv.appendChild(bar);
  });

}