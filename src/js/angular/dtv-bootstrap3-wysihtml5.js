(function () {
  "use strict";

  angular.module("risevision.widget.common.wysihtml5", [])
    .directive("wysihtml5", function () {
      function link(scope, element) {
        $(element).wysihtml5({
          "stylesheets": scope.stylesheets
        });
      }

      return {
        restrict: "A",
        scope: {
          "stylesheets": "="
        },
        link: link
      };
    });
}());
