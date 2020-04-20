/*Craig Bergmeyer
Script.js
INFO 2134
Thoendel
April 12, 2020*/


window.addEventListener('load', function() {

    //define variables from which elements to make event listeners
    let action = document.getElementById('action');
    let convertFrom = document.getElementById('convertFrom');
    let userInput = document.getElementById('userInput');

    //list event listeners
    // I was going to change this back to 'click' but really liked the instant feedback of the input
    userInput.addEventListener('input', userEntered);
    convertFrom.addEventListener('change', checkSelection);
    action.addEventListener('click', displayResults);

});

    //called by input in text entered
    function userEntered() {
        //reset everything once something new is entered
        //came from necessity if you tried to change the number at the top
        // 'meters' could still be selected and would not trigger a change event 
        //to fill convert to box
        resetEverything();
        //get the user input
        let userNum = document.getElementById('userInput');
        //sent info to validate Data (and returns a boolean)

        if (validateData(userNum)){
            // if data is valid, call display conversion function
            displayConversionInfo();
        }
    }
    //function to validate data
    function validateData(userNum){
        //set variable for error message
        let whichError = '';
        //check input for a value
        if (userNum.value == ''){
            whichError = 'You must input a value';
            displayErrorMessage(whichError);
            //call focus back to input
            userNum.focus();
            //return false to userEntered Function
            return false;
        }else if (isNaN(userNum.value)){
            //call focus back to input
            userNum.focus();
            //set error message and call function to show error info
            whichError = 'You must input a valid number';
            displayErrorMessage(whichError);            
            //return false to userEntered Function
            return false;
        }else {
            //return true to userEntered Function
            return true;
        }
    }

    //function to display the error message given by validateData function
    function displayErrorMessage(whichError){
            //resets everything to start fresh in case of a prior error message
            resetEverything();
            // set the element to be created and give it an id
            let errorMessage = document.createElement('p');
            errorMessage.id = 'errorHeader';
            //enter the text for the error header and append it
            let errorCode = document.createTextNode('Error! Please correct the following items before you can proceed:');
            errorMessage.appendChild(errorCode);
            // places header text in document
            let  errorHolder = document.getElementById('errorHolder');
            errorHolder.appendChild(errorMessage);
           
            


            //Create a list and gives the list an id
            let errorList = document.createElement('li');
            errorList.id = 'errorList';
            // Enters the error text to be displayed
            errorCode = document.createTextNode(whichError); 
            // adds the text Node to the list element 
            errorList.appendChild(errorCode); 
            //sets the position to insert the text
            let insertError = document.getElementById('errorHolder');
            //inserts the text
            insertError.appendChild(errorList);
            //allow errorClass to be seen
            if (insertError.className == 'hidden'){
                insertError.className = 'visible';
            }
    }

    //If all the above is good this gets called by user Entered function
    function displayConversionInfo(){
        document.getElementById('convertFromHolder').className = 'visible';
    }

// 
// Big Space to seperate functions for change event listener 
// 
// 
// 
// 
// 
// 
// 
// checks the selection to make sure a valid selection was made
function checkSelection(){
        //call variables
        let convertSelection = convertFrom.options[convertFrom.selectedIndex].value;
        let display = false;
        //make sure an option other than the first is selected
        if(convertSelection != '-- Select an Option --' ){
            display = true;
            //call function to display or hide Convert to element
            displayConvertTo(display);
            //call function to remove options each time
            removeConvertTo();
            //call function to fill options based on selection
            fillConvertTo(convertSelection);
            
        }else {
            display = false
            //call function to display or hide Convert to element
            displayConvertTo(display);
            //call function to remove options
            removeConvertTo();
        }
    }
    //function to toggle visibilty of convertToHolder
    function displayConvertTo(display){
        //make visible if true was sent
        if (display){
            document.getElementById('convertToHolder').className = 'visible';
        //hide if false was sent
        }else {
            document.getElementById('convertToHolder').className = 'hidden';

        }
    }
    //function to remove the options from selcetion
    function removeConvertTo(){
            let removeOptions = document.getElementById('convertTo')
            removeOptions.innerText='';
    }
    //fnction to fill ConvertTo selection options
    function fillConvertTo(measurement){
        //set variables that will be reused in each case
        let option1 = document.createElement('option');
        let option1Text = document.createTextNode('');
        let option2 = document.createElement('option');
        let option2Text = document.createTextNode('');
        let options = document.getElementById('convertTo');
        let insertOption = document.getElementById('convertToHolder');
        
        //switch seemed easier than an if/elseif

        switch(measurement){
            case 'Meters':
                //set id of option 1
                option1.id = 'Feet';
                //add text to option 1
                option1Text = document.createTextNode('Feet');
                option1.appendChild(option1Text);
                //set id of option 2
                option2.id = 'Miles';
                //set text of option2 
                option2Text = document.createTextNode('Miles');
                option2.appendChild(option2Text);
                //add options and insert in convertTo
                options.appendChild(option1);
                options.appendChild(option2);
                insertOption.appendChild(options);
                break;
             case 'Liters':
                //set id of option 1
                option1.id = 'Gallons';
                //add text to option 1
                option1Text = document.createTextNode('Gallons');
                option1.appendChild(option1Text);
                //set id of option 2
                option2.id = 'Quarts';
                //set text of option2 
                option2Text = document.createTextNode('Quarts');
                option2.appendChild(option2Text);
                //add options and insert in convertTo
                options.appendChild(option1);
                options.appendChild(option2);
                insertOption.appendChild(options);
                break;

            case 'Kilos':
                //set id of option 1
                option1.id = 'Pounds';
                //add text to option 1
                option1Text = document.createTextNode('Pounds');
                option1.appendChild(option1Text);
                //add option and insert in convertTo
                options.appendChild(option1);
                insertOption.appendChild(options);
                break;

            case 'Celsius':
                //set id of option 1
                option1.id = 'Fahrenheit';
                //add text to option 1
                option1Text = document.createTextNode('Fahrenheit');
                option1.appendChild(option1Text);
                options.appendChild(option1);
                //add options and insert in convertTo
                insertOption.appendChild(options);
                break;
        }

    }
    
// 
// Big Space to seperate functions for change event listener 
// 
// 
// 
// 
// 
// 
// 
    //function called by clicking
    function displayResults(){
        //call function to clear results each time, but wasn't needed 
        //clearResults();
        //call function to convert the measurements
        convertMeasurements();
    }
    //turns out this wasn't needed since innerText overwrites the previous result
    // function clearResults(){

    // }

    function convertMeasurements(){
        //set variables to be used in calculations and switch/ifs
        let convertTo = document.getElementById('convertTo');
        let convertToSelection = convertTo.options[convertTo.selectedIndex].value;
        let convertFrom = document.getElementById('convertFrom');
        let convertFromSelection = convertFrom.options[convertFrom.selectedIndex].value;
        let userNum = document.getElementById('userInput').value;
        //get the convert from selection
        switch(convertFromSelection){
            case 'Meters':
                //test against the convert to options, create a new instance of Metric to Imperial class which extends Converter class
                //calls the correct instance method and the to Two Decimal Method and sends on to the display
                if (convertToSelection == 'Feet'){
                    let feet = new MetricToImperial(userNum);
                    showResults(toTwoDecimalPlaces(feet.convertMeterstoFeet()));
                }else if (convertToSelection == 'Miles'){
                   let miles = new MetricToImperial(userNum);
                    showResults(toTwoDecimalPlaces(miles.convertMeterstoMiles()));
                }
                break;
            case 'Liters':
                //test against the convert to options, create a new instance of Metric to Imperial class which extends Converter class
                //calls the correct instance method and the to Two Decimal Method and sends on to the display             case 'Liters':
                if (convertToSelection == 'Gallons'){
                    let gallons = new MetricToImperial(userNum); 
                    showResults(toTwoDecimalPlaces(gallons.convertLiterstoGallons()));
                }else if (convertToSelection == 'Quarts'){
                    let quarts = new MetricToImperial(userNum);
                    showResults(toTwoDecimalPlaces(quarts.convertLiterstoQuarts()));
                }
                break;
                //test against the convert to options, create a new instance of Metric to Imperial class which extends Converter class
                //calls the correct instance method and the to Two Decimal Method and sends on to the display
                //left the if statement if there in case more options were to be added
            case 'Kilos':
               if (convertToSelection == 'Pounds'){
                   let pounds = new MetricToImperial(userNum);
                    showResults(toTwoDecimalPlaces(pounds.convertKilostoPounds()));
                }
               break;
                //test against the convert to options, create a new instance of Metric to Imperial class which extends Converter class
                //calls the correct instance method and the to Two Decimal Method and sends on to the display
                //left the if statement if there in case more options were to be added
            case 'Celsius':
                if (convertToSelection == 'Fahrenheit'){
                   let fahrenheit = new MetricToImperial(userNum);
                    showResults(toTwoDecimalPlaces(fahrenheit.convertCelsiustoFahrenheit()));
                }
                break;
        }     
    }
    //function to display the results on the page
    function showResults(result){
        //set result holder element
        let resultHolder = document.getElementById('resultHolder');
        //make the results area visible
        if (resultHolder.className == 'hidden'){
            resultHolder.className = 'visible';
        }

        // set up to have the results displayed
        let convertTo = document.getElementById('convertTo');
        let convertToSelection = convertTo.options[convertTo.selectedIndex].value;
        let convertFrom = document.getElementById('convertFrom');
        let convertFromSelection = convertFrom.options[convertFrom.selectedIndex].value;
        let userNum = document.getElementById('userInput').value; 

            
        // sets the error text to be displayed
        let displayer = userNum + ' ' + convertFromSelection + ' equals ' + result + ' ' + convertToSelection; 
        // adds the text to be displayed 
        resultHolder.innerText = (displayer); 
            
    }

    
    //function to reset all the elements back to original
    function resetEverything(){
        if (document.getElementById('errorHolder').className == 'visible'){
            document.getElementById('errorHolder').className = 'hidden';
            document.getElementById('errorHolder').innerText = '';
        }
        if (document.getElementById('convertFromHolder').className == 'visible'){
            document.getElementById('convertFromHolder').className = 'hidden';
            document.getElementById('convertFrom').value = '-- Select an Option --';    
        }
        if (document.getElementById('convertToHolder').className == 'visible'){
            document.getElementById('convertToHolder').className = 'hidden';
            document.getElementById('convertTo').innerText = '';    
        }
    }
    







