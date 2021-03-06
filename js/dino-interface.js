var Dino = require('./../js/dino.js').dinoModule;
var GameMaster = require('./../js/dino.js').gameModule;
var War = require('./../js/war.js').warModule;

var displayNames1 = function(name) {
  $('#dino-team-one').append(name + "<br>");
};
var displayNames2 = function(name) {
  $('#dino-team-two').append(name + "<br>");
};
var displayDinoHealth = function(name1, health1, name2, health2, image1, image2) {
  console.log('displayDinoHealth called');
  $('#dino-one-name').text("Name: " + name1);
  $('#dino-one-health').text("Health: " + health1);
  $('#dino-image-one').html("<img src='" + image1 + "' alt='dino' width='250px'>");
  $('#dino-two-name').text("Name: " + name2);
  $('#dino-two-health').text("Health: " + health2);
  $('#dino-image-two').html("<img src='" + image2 + "' alt='dino' width='250px'>");
};
var displayDinoWinner = function(string) {
  $("#dino-winner").text(string);
};
var displayTeamWinner = function(string) {
  $("#team-winner").prepend(string);
  $("#team-winner").prepend("<img src='img/dino-meteor.gif' alt='winner-dino' width='300px'>");
};

$(document).ready(function() {
  var newArray = [];
  $('#play').click(function() {
    $('#dino-battle').hide();
    $('#dino-team-one').empty();
    $('#dino-team-two').empty();
    $('#team-winner').empty();
    // console.log("empty " + newArray);
    var game = new GameMaster();
    var newPromise = game.getDinoTeam(displayNames1, displayNames2);
    newPromise.then( function(resp) { newArray = resp; console.log(newArray);} );
    $('#battle').show();
    // $('#play').hide();
  });
  $("#battle").click(function() {
    $('#dino-battle').show();
    $('.dino-empty').empty();
    var teamOne = newArray[0];
    var teamTwo = newArray[1];
    var newWar = new War(teamOne, teamTwo);
    console.log(newWar.dino1.name, newWar.dino1.health);
    console.log(newWar.dino2.name, newWar.dino2.health);
    newWar.battle(displayDinoWinner, displayTeamWinner, displayDinoHealth);
  });
});
