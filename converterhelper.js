class Converter {
    //this is the base unit we want to convert to something else
    constructor(unitToConvert) {
        //we'll store this unit internally as _unitToConvert
        let check = parseFloat(unitToConvert);
        if(isNaN(check)) {
            throw new Error("Error: you must pass a number to constructor!");
        } else {
            this._unitToConvert = check;
        }
        
    }
}

//define a class named MetricToImperial here, which extends the Converter class shown above.
//Class that extends Converter
class MetricToImperial extends Converter{
    constructor(unitToConvert){
        super(unitToConvert);
    }
//instances of class to return the proper amount when called
convertMeterstoFeet(){return this._unitToConvert * 3.2808}
convertMeterstoMiles(){return this._unitToConvert * 0.00062137}
convertLiterstoGallons(){return this._unitToConvert * 0.26417}
convertLiterstoQuarts(){return this._unitToConvert * 1.056688}
convertKilostoPounds(){return this._unitToConvert * 2.2046}
convertCelsiustoFahrenheit() {return this._unitToConvert * 1.8 +32}

}

//takes a number and check to make sure it is a float and rounds to 2 decimals
function toTwoDecimalPlaces(float){
    let isFloat = parseFloat(float);
    if (isNaN(isFloat)){
        throw new Error("Error: This number is not a floating-point number!")
    } else {return isFloat.toFixed(2);}
}