import { directive } from '../main.controller';

export default directive('inputFileUpload', [
  'ngbutils',
  'ngjs',
  function({ notify, translate }, ngjs) {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        element: '=',
        model: '='
      },
      template: `
        <div class="upload">
            <div class="current-image">
                <img ng-src="{{model}}" />
            </div>
            <div class="upload-image">
                <p>{{'upload-an-image' | translate}}</p>
                <a onclick="return false" ng-click="browseClick()" href="#">
                  {{'browse' | translate}}
                </a>
            </div>
            <div class="uploading">
                <i class="material-icons icon-spin">hdr_strong</i>
            </div>
        </div>
        <input type="text" class="md-input" ng-model="model" />
      `,
      link: (scope, elem, attrs) => {
        const { browse } = ngjs.listeners;
        const uploadLink = elem[0].querySelector('.upload-image a');
        const uploadingIcon = elem[0].querySelector('.uploading');

        scope.browseClick = async () => {
          if (!browse.length) {
            notify(
              "You didn't add any 'browse' listeners, consider to add one!"
            ).error();
          } else {
            uploadLink.innerText = translate('uploading');
            uploadingIcon.classList.add('active');
            try {
              const path = await Promise.race(browse.map(cb => cb()));
              if (path.length) {
                scope.$evalAsync(() => {
                  scope.model = path;
                });
              }
            } catch (error) {
              console.error(error);
              // notify(error.statusText).error();
            } finally {
              uploadLink.innerText = translate('browse');
              uploadingIcon.classList.remove('active');
            }
          }
        };
      }
    };
  }
]);
