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

            
            numbersArray.forEach(function(number) {
                var parsedNumber = parseInt(number, 10);
                if (isNaN(parsedNumber) || number.trim() === '' || !/^[-+]?\d+$/.test(number)){
                    errorMessages.push('Invalid Number ' + number);
                    isValid = false;
                }
                else if (numbersArray.length > 1000){
                    errorMessages.push('Number count exceedes the limit. Maximun of 1000 are accepted.')
                    isValid = false
                }
            });
            if (!isValid){
                var errorMessageContainer = document.createElement('div');
                errorMessageContainer.classList.add('error-message');
                errorMessageContainer.innerText = errorMessages.join('\n');
                numbersInput.parentElement.appendChild(errorMessageContainer);
            }
            else{
                numberForm.submit();
            }
        });
    }
})