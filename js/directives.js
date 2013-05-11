'use strict';

/* Directives */


angular.module('scat.directives', [])

  .directive('clickOut', function($document){
    return {
      restrict: 'A',
      link: function(scope, elem, attr, ctrl) {
        elem.bind('click', function(e) {
          // this part keeps it from firing the click on the document.
          e.stopPropagation();
        });
        $document.bind('click', function() {
          // magic here.
          scope.$apply(attr.clickOut);
        })
      }
    }
  });