'use strict';

soundrad.directive('dropbar', function ($window) {
    return {
      restrict: 'A',
      scope: { isOpen: '=' },
      link: function (scope, elem, attrs) {
        console.log('D R O P B A R');
        var dropbar = elem[0];
        var height = dropbar.offsetHeight;
        dropbar.style.transition = 'none';
        dropbar.style.height = 0;
        var setHeight = function() {
          dropbar.style.transition = '';
          if (scope.isOpen == true) dropbar.style.height = height + 'px';
          else dropbar.style.height = 0;
        };
        scope.$watch('isOpen', function() {
          setHeight();
        });
        window.onresize = function(){
          dropbar.style.transition = 'none';
          dropbar.style.height = 'auto';
          height = dropbar.offsetHeight;
          if (scope.isOpen == true) dropbar.style.height = height + 'px';
          if (scope.isOpen == false) dropbar.style.height = 0;
        };
      }
    };
  });


// To do
// - disclosure directive
// - preloader directive

