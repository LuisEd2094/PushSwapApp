function barsAnimation(numbers){
    var barsContainer = document.getElementById('barsContainer');
    var relativeValues = [];

    // Sort the original array in ascending order
    var sortedValues = numbers.slice().sort(function(a, b) {
    return a - b;
    });

    // Iterate over the sorted array
    for (var i = 0; i < numbers.length; i++) {
    // Find the relative position of each value in the original array
    var relativePosition = sortedValues.indexOf(numbers[i]) + 1;
    
    // Store the relative position in the new array
    relativeValues.push(relativePosition);
    }
    console.log(relativeValues);
    relativeValues.forEach(function(value) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = 20 + 'px';
      var widthPercentage = (value / relativeValues.length) * 100;

      // Set the bar's width
      bar.style.width = widthPercentage + '%';
      var hue = Math.floor(((relativeValues.length - value) / (relativeValues.length - 1)) * 120); // Ranges from 0 to 120 (red to green)
      // Set the bar's background color using HSL format
      bar.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
      barsContainer.appendChild(bar);
    });
}

