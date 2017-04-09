
//=============================================================================
// Three Tier God
// ThreeTierGold.js
//=============================================================================

//=============================================================================
/*:
 * @plugindesc A Plugin that allows you to display three-tiered currency in the Gold Window.
 * @author Portkey89
 *
 * @param On Switch
 * @desc If this game switch is on, the game will display the multi-currency.
 * Input a number.
 * @default 1
 * 
 * @param Smallest Currency Icon
 * @desc The Icon # for the smallest currency unit, ie. Bronze
 * @default 1
 * 
 * @param Medium Currency Icon
 * @desc The Icon # for the medium currency unit, ie. Silver
 * @default 2
 * 
 * @param Largest Currency Icon
 * @desc The Icon # for the largest currency unit, ie. Gold
 * @default 3
 *
 * @param Small Units in Medium Currency
 * @desc The amount of small units that make up the medium unit, ie. 10 || indicating 10 Bronze = 1 Silver
 * @default 1
 * 
 * @param Medium Units in Largest Currency
 * @desc The amount of medium units that make up the largest unit, ie. 5 || indicating 5 Silver = 1 Gold
 * @default 1
 *
 * @help
 *
 * Tiered Gold Window
 * Version 0.01
 * Portkey89
 *
 * 
 * This plugin allows you to have multiple currencies that come in increasing quantities of each other.
 */
 //=============================================================================

//The below will pass our above parameters into simpler, more readable values
var onSwitchNumber = Number(PluginManager.parameters('ThreeTierGold')["On Switch"]) || {}; 
var smallIcon = Number(PluginManager.parameters('ThreeTierGold')["Smallest Currency Icon"]) || {};
var mediumIcon = Number(PluginManager.parameters('ThreeTierGold')["Medium Currency Icon"]) || {};
var largestIcon = Number(PluginManager.parameters('ThreeTierGold')["Largest Currency Icon"]) || {};
var smallinMedium = Number(PluginManager.parameters('ThreeTierGold')["Small Units in Medium Currency"]) || {};
var mediuminLarge = Number(PluginManager.parameters('ThreeTierGold')["Medium Units in Largest Currency"]) || {};
//Additional new variables
var smallGold = 0;
var smallGoldMath = 0;
var mediumGold = 0;
var mediumGoldMath = 0;
var largeGold = 0;
var Gold = 0;


//-----------------------------------------------------------------------------
// GOLD CALCULATOR
//
// This function will split any number input into the respective tiered gold.
//
//-----------------------------------------------------------------------------

function calculate(Gold) {
        console.log(smallinMedium + " " + mediuminLarge);
        console.log(Gold);
             smallGold = Gold || {};
             smallGoldMath = Math.floor(smallGold / smallinMedium);
             smallGold %= smallinMedium;
             mediumGold = smallGoldMath;
             mediumGoldMath = Math.floor(mediumGold / mediuminLarge);
             mediumGold %= mediuminLarge;
             largeGold = mediumGoldMath;
        return smallGold
        return mediumGold
        return largeGold
};

//-----------------------------------------------------------------------------
// GOLD IN MAIN MENU
//
// This section will replace the gold window in the main menu if the switch
// defined in the plugin parameters is on.
//
//-----------------------------------------------------------------------------

function Window_TTGold() {
    this.initialize.apply(this, arguments);
};

Window_TTGold.prototype = Object.create(Window_Base.prototype);
Window_TTGold.prototype.constructor = Window_TTGold;

Window_TTGold.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_TTGold.prototype.windowWidth = function() {
    return 240;
};

Window_TTGold.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_TTGold.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    onSwitchState = $gameSwitches.value(onSwitchNumber);
    if (onSwitchState == true) {
    var Gold = $gameParty.gold();
    calculate(Gold);
    if (Gold == 0) {smallGold = 0}; 
    if (Gold == 0) {mediumGold = 0}; 
    if (Gold == 0) {largeGold = 0}; 
    this.drawIcon(smallIcon, 169, 0);
    this.drawText(smallGold, -25, 0, width, 'right');
    this.drawIcon(mediumIcon, 100, 0);
    this.drawText(mediumGold, -95, 0, width, 'right');
    this.drawIcon(largestIcon, 31, 0);
    this.drawText(largeGold, -164, 0, width, 'right');
    }
    else {
    this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, x, 0, width);
    };
};

Window_TTGold.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createTTGoldWindow();
    this.createStatusWindow();
};

Scene_Menu.prototype.createTTGoldWindow = function() {
    this._ttGoldWindow = new Window_TTGold(0, 0);
    this._ttGoldWindow.y = Graphics.boxHeight - this._ttGoldWindow.height;
    this.addWindow(this._ttGoldWindow);
};

//-----------------------------------------------------------------------------
// GOLD IN SHOP MENU
//
// This section will replace the gold window in the shop menu if the switch
// defined in the plugin parameters is on.
//
//-----------------------------------------------------------------------------
