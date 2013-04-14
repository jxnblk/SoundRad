'use strict';

/* Controllers */

function HomeCtrl($scope) {
  
  // SC API Init
  var apiKey = '49499a48fd69e1ee9664517359e8442a';
  console.log(apiKey);
  SC.initialize({
    client_id: '49499a48fd69e1ee9664517359e8442a',
    redirect_uri: 'http://jxnblk.com/sc'
  });
  var scAccessToken = localStorage['sc-access-token'];
  var userName = 'jxnblk';
  if (scAccessToken) {
    $.getJSON('https://api.soundcloud.com/me.json?oauth_token=' + scAccessToken, function(me) {
      $('.sc-connect-status').text('Logged in as:');
      $('.sc-username').text(me.username);
      userName = me.username;
    });
  console.log(userName);
  };
  
  
  // SC Connect
  $scope.connect = function(){
    console.log('clicked connect');
  };
  
  
  
  $scope.tracks = 'derp';
};



// I do not understand how to use this controllers module. Totally different from the tutorial.
angular.module('sndcat.controllers', []).
  controller('HomeCtrl', [function HomeCtrl($scope) {
    
  }])
  .controller('SetsCtrl', [function() {

  }])
  .controller('LikesCtrl', [function() {

  }]);
  
  
  

