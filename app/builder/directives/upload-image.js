import { directive } from '../main.controller';

export default directive('uploadImage', [
  'ngbutils',
  'ngjs',
  function(ngbutils, ngjs) {
    return {
      restrict: 'A',
      replace: false,
      link(scope, el, attrs) {
        const parent = el.parent();
        parent.addClass('upload-image');
        parent.prepend(`
          <button type="button" class="md-btn upload-image">
            <span>${ngbutils.translate('upload-an-image')}</span>
          </button>
        `);

        const button = parent.find('button');
        button.on('click', async function(e) {
          e.stopImmediatePropagation();
          button.prop('disabled', true);
          button.addClass('disabled');
          try {
            const path = await Promise.race(
              ngjs.listeners.browse.map(cb => cb())
            );
            if (path.length) {
              scope.$evalAsync(() => {
                scope.$ctrl.options[attrs.uploadImage || 'image'] = path;
              });
            }
          } catch (error) {
            console.error(error);
          } finally {
            button.prop('disabled', false);
            button.removeClass('disabled');
          }
        });
      }
    };
  }
]);
