var count = -25;
let carsTable;
var yearsDict = {};
let years;
var pwrDict = {};
let powers;
var torqDict = {};
let torques;
var mpgcDict = {};
let mpgcs;
var mpghDict = {};
let mpghs;
var heightDict = {};
let heights;
var widthDict = {};
let widths;
var lengthDict = {};
let lengths;
var sum;
var values;
var yrs = ["2009", "2010", "2011", "2012"];

// Preload function for loading the csv file
function preload() {
    carsTable = loadTable("cars.csv", "csv", "header");
}

// Setup function
function setup() {
    // Create the canvas at size 500px x 500px
    createCanvas(500, 500);

    // Get the column data from all of the following columns
    years = carsTable.getColumn("Identification.Year");
    powers = carsTable.getColumn("Engine Information.Engine Statistics.Horsepower");
    torques = carsTable.getColumn("Engine Information.Engine Statistics.Torque");
    mpgcs = carsTable.getColumn("Fuel Information.City mpg");
    mpghs = carsTable.getColumn("Fuel Information.Highway mpg");
    heights = carsTable.getColumn("Dimensions.Height");
    widths = carsTable.getColumn("Dimensions.Width");
    lengths = carsTable.getColumn("Dimensions.Length");

    // Turn them all into dictionaries based on year
    createDict(pwrDict, powers);
    createDict(torqDict, torques);
    createDict(mpgcDict, mpgcs);
    createDict(mpghDict, mpghs);
    createDict(heightDict, heights);
    createDict(widthDict, widths);
    createDict(lengthDict, lengths);
}

// Function to turn column data into dictionary
function createDict(dict, values) {
    for(var i=0;i<years.length;i++) {
        if(dict[years[i]] == null) {
            dict[years[i]] = [values[i]];
        } else {
            dict[years[i]].push(values[i]);
        }
    }

    return dict;
}

// Function to calculate the mean from an array of values
function mean(values) {
    sum = 0;
    for(var i=0;i<values.length;i++) {
        sum += parseInt(values[i]);
    }

    return sum / values.length;
}

// Function to draw the heatmap square for power and torque (PT) data
function drawSquarePT(values, x, y) {
    var avg = mean(values);
    fill((255 - (avg / 200) ** 15), 0, 0);

    rect(x, y, 40, 40);
    fill(255, 255, 255);
//    text(parseInt(avg), x+8, y+5, 40, 40);
}

// Function to draw the heatmap square for mpg data
function drawSquareMPG(values, x, y) {
    var avg = mean(values);
    fill((255 - (avg / 2) ** 2), 0, 0);

    rect(x, y, 40, 40);
    fill(255, 255, 255);
//    text(parseInt(avg), x+8, y+5, 40, 40);
}

// Function to draw the theatmap square for dimension (LWH) data
function drawSquareDims(values, x, y) {
    var avg = mean(values);
    fill((255 - (avg / 107) ** 14), 0, 0);

    rect(x, y, 40, 40);
    fill(255, 255, 255);
//    text(parseInt(avg), x+8, y+5, 40, 40);
}

// Draw method
function draw() {
    background(255, 255, 255);

    var width = 60;
    var height = 40;

    fill(0, 0, 0);
    text("hp", width + 10, 15);
    text("lb/ft", width + 50, 15);
    text("city\nmpg", width + 110, 15);
    text("hwy\nmpg", width + 150, 15);
    text("height\n(in.)", width + 210, 15);
    text("width\n(in.)", width + 250, 15);
    text("length\n(in.)", width + 290, 15);

    for(var yr=0;yr<yrs.length;yr++) {
        fill(0, 0, 0);
        text(yrs[yr], 20, height + 25);
        drawSquarePT(pwrDict[yrs[yr]], width, height);
        drawSquarePT(torqDict[yrs[yr]], width + 40, height);
        rect(width + 80, height, 20, 40);
        drawSquareMPG(mpgcDict[yrs[yr]], width + 100, height);
        drawSquareMPG(mpghDict[yrs[yr]], width + 140, height);
        rect(width + 180, height, 20, 40);
        drawSquareDims(heightDict[yrs[yr]], width + 200, height);
        drawSquareDims(widthDict[yrs[yr]], width + 240, height);
        drawSquareDims(lengthDict[yrs[yr]], width + 280, height);
        height += 40;
    }
}
