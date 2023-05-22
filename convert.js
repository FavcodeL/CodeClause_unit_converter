// ====================================
//  Global Variable & Data Definitions
// ====================================
var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Area";
unit[0] = new Array("Square meter (m^2)", "Acre (acre)", "Are", "Hectare", "Square centimeter", "Square kilometer", "Square foot (ft^2)", "Square inch (in^2)", "Square mile (mi^2)", "Square yard (yd^2)");
factor[0] = new Array(1, 4046.856, 100, 10000, .0001, 1000000, 9.290304E-02, 6.4516E-04, 2589988, .8361274);

property[1] = "Time";
unit[1] = new Array("Second (sec)", "Day (mean solar)", "Hour (mean solar)", "Minute (mean solar)", "Month (mean calendar)", "Year (calendar)");
factor[1] = new Array(1, 8.640E4, 3600, 60, 2628000, 31536000);

property[2] = "Length";
unit[2] = new Array("Meter (m)", "Centimeter (cm)", "Kilometer (km)",  "Foot (ft)", "Inch (in)", "Micrometer (mu-m)", "Millimeter (mm)", "Nanometer (nm)", "Mile (int'l nautical)", "Yard (yd)");
factor[2] = new Array(1, .01, 1000, .3048, .0254, .000001, .001, 1E-9, 1852, .9144);

property[3] = "Mass";
unit[3] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)", "Carat (metric)(ct)", "Hundredweight (long)", "Hundredweight (short)", "Pound mass (lbm)", "Pound mass (troy)", "Ounce mass (ozm)", "Ounce mass (troy)", "Slug", "Ton (assay)", "Ton (long)", "Ton (short)", "Ton (metric)", "Tonne");
factor[3] = new Array(1, .001, 1e-6, .000000001, .0002, 50.80235, 45.35924, .4535924, .3732417, .02834952, .03110348, 14.5939, .02916667, 1016.047, 907.1847, 1000, 1000);

property[4] = "Force";
unit[4] = new Array("Newton (N)", "Dyne (dy)", "Kilogram force (kgf)", "Kilopond force (kpf)", "Kip (k)", "Ounce force (ozf)", "Pound force (lbf)", "Poundal");
factor[4] = new Array(1, .00001, 9.806650, 9.806650, 4448.222, .2780139, .4535924, .138255);

property[5] = "Energy";
unit[5] = new Array("Joule (J)", "BTU (mean)", "BTU (thermochemical)", "Calorie (SI) (cal)", "Calorie (mean)(cal)", "Calorie (thermo)", "Electron volt (eV)", "Erg (erg)", "Foot-pound force", "Foot-poundal", "Horsepower-hour", "Kilocalorie (SI)(kcal)", "Kilocalorie (mean)(kcal)", "Kilowatt-hour (kW hr)", "Ton of TNT", "Volt-coulomb (V Cb)", "Watt-hour (W hr)", "Watt-second (W sec)");
factor[5] = new Array(1, 1055.87, 1054.35, 4.1868, 4.19002, 4.184, 1.6021E-19, .0000001, 1.355818, 4.214011E-02, 2684077.3, 4186.8, 4190.02, 3600000, 4.2E9, 1, 3600, 1);

// ===========
//  Functions
// ===========

function UpdateMenu(propertyMenu, unitMenu) {
    // Updates the units displayed in the unitMenu according to the selection of property in the propMenu.
    var i;
    i = propertyMenu.selectedIndex;
    FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
    // Fills the options of myMenu with the elements of myArray and replaces the elements, so old ones will be deleted.
    var i;
    myMenu.length = myArray.length;
    for (i = 0; i < myArray.length; i++) {
        myMenu.options[i].text = myArray[i];
    }
}

function CalculateUnit(convertForm, resultForm) {
    // A simple wrapper function to validate input before making the conversion
    var convertValue = convertForm.input.value;

    // First check if the user has given numbers or anything that can be made to one...
    convertValue = parseFloat(convertValue);
    if (!isNaN(convertValue) || convertValue == 0) {
        // If we can make a valid floating-point number, put it in the text box and convert!
        convertForm.input.value = convertValue;
        ConvertFromTo(convertForm, resultForm);
    }
}

function ConvertFromTo(convertForm, resultForm) {
    // Converts the contents of the sourceForm input box to the units specified in the targetForm unit menu and puts the result in the targetForm input box.In other words, this is the heart of the whole script...
    
    // Start by checking which property we are working in...
    var propIndex = document.selection_form.options.selectedIndex;

     // Let's determine what unit are we converting FROM (i.e. source) and the factor needed to convert that unit to the base unit.
    var convertIndex = convertForm.menu.selectedIndex;
    var convertFactor = factor[propIndex][convertIndex];

    // Cool! Let's do the same thing for the target unit - the units we are converting TO:
    var resultIndex = resultForm.menu.selectedIndex;
    var resultFactor = factor[propIndex][resultIndex];

    // Simple, huh? let's do the math: a) convert the source TO the base unit: (The input has been checked by the CalculateUnit function).

    var result = convertForm.input.value;
    result = result * convertFactor;
    
    // not done yet... now, b) use the targetFactor to convert FROM the base unit to the target unit...
    result = result / resultFactor;
    
    // Ta-da! All that's left is to update the target input box:
    resultForm.input.value = result;
}

    // This fragment initializes the property dropdown menu using the data defined above in the 'Data Definitions' section
    window.onload = function (e) {
    FillMenuWithArray(document.selection_form.options, property);
    UpdateMenu(document.selection_form.options, document.formA.menu);
    UpdateMenu(document.selection_form.options, document.formB.menu)
}

