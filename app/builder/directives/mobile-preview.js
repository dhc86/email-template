import { directive } from '../main.controller';

export default directive('mobilePreview', [
  '$timeout',
  $timeout => {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        html: '='
      },
      template: '<iframe width="320" border="0"></iframe>',
      link(scope, iframe, attrs) {
        scope.insertHtml = function(html) {
          const { document } = iframe[0].contentWindow;
          document.open();
          document.write(html);
          document.close();
        };

        $timeout(() => {
          scope.$watch(() => scope.html, scope.insertHtml);
        });
      }
    };
  }
]);
