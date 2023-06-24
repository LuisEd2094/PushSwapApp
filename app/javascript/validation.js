document.addEventListener('turbo:load', function() {
    const numberForm = document.getElementById('number-form');

    if (numberForm) {
        numberForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const numbersInput = document.getElementById('numbers-input');
            const numbers = numbersInput.value.trim();
            const numbersArray = numbers.split(/[,\s]+/);

            var isValid = true;
            var errorMessages = [];
            var errorMessageContainer = document.querySelector('.error-message');

            
            numbersArray.forEach(function(number) {
                if (!isValid)
                    return;
                var parsedNumber = parseInt(number, 10);
                if (isNaN(parsedNumber) || number.trim() === '' || !/^[-+]?\d+$/.test(number)){
                    errorMessages.push('Please only enter numbers or a list of comma separated numbers.');
                    isValid = false;
                }
                else if (numbersArray.length > 1000){
                    errorMessages.push('Number count exceedes the limit. Maximun of 1000 are accepted.')
                    isValid = false
                }
            });

            if (!isValid) {
                if (!errorMessageContainer) {
                  errorMessageContainer = document.createElement('div');
                  errorMessageContainer.classList.add('error-message');
                  numbersInput.parentElement.appendChild(errorMessageContainer);
                }
              
                errorMessageContainer.innerText = errorMessages.join('\n');
              } else {
                if (errorMessageContainer) {
                  errorMessageContainer.remove();
                  numberForm.submit();
                }
              }
        });
    }
})