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
  //const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < moves.length; i++){
    const move = moves[i];
    console.log(move)
    if (move == 'sa'){
        var bar1 = document.querySelector('.bar-left-container:first-child');
        var bar2 = document.querySelector('.bar-left-container:nth-child(2)');

        await new Promise(resolve => setTimeout(resolve, 100));

        console.log("making animation")
        bar1.style.transition = 'transform 0.1s ease-in-out';
        bar2.style.transition = 'transform 0.1s ease-in-out';
        bar1.style.transform = 'translateY(100%)';
        bar2.style.transform = 'translateY(-100%)';
        console.log("wating to move dom")

        await new Promise(resolve => setTimeout(resolve, 100));


        const parent = bar1.parentNode;
        parent.insertBefore(bar2, bar1);
        parent.insertBefore(bar1, bar2.nextSibling);
        bar1.style.transition = '';
        bar2.style.transition = '';
        bar1.style.transform = '';
        bar2.style.transform = '';
      console.log("moved DOM")
    }
    else if (move == 'rra'){
      
      console.log("doing rra") 
      var bar1 = document.querySelector('.bar-left-container:last-child');
      var bar2 = document.querySelector('.bar-left-container:first-child');
      const transitionElements = document.querySelectorAll('.bar-left-container:not(:first-child):not(:last-child)');

      await new Promise(resolve => setTimeout(resolve, 100));
      bar1.style.transition = 'transform 0.1s ease-in-out';
      bar2.style.transition = 'transform 0.1s ease-in-out';
      bar1.style.transform = 'translateY(-200%)';
      bar2.style.transform = 'translateY(100%)';

      transitionElements.forEach(element => {
        element.style.transition = 'transform 0.1s ease-in-out';
        element.style.transform = 'translateY(100%)'
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      const parent = bar1.parentNode;
      parent.insertBefore(bar1, bar2);
      parent.insertBefore(bar2, bar1.nextSibling);
      bar1.style.transition = '';
      bar2.style.transition = '';
      bar1.style.transform = '';
      bar2.style.transform = '';

      transitionElements.forEach(element => {
        element.style.transition = '';
        element.style.transform = ''
      });
    }
    await new Promise(resolve => setTimeout(resolve, 100));
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
    console.log("restting")
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
    bar.className = 'bar-left-container';
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