import template from './template.html';
import { scoped } from './style.less';

export default {
  element: {
    type: 'social',
    icon: 'share',
    primary_head: 'social_icons'
  },
  defaults: {
    align: 'center',
    padding: ['10px', '15px', '10px', '15px'],
    backgroundColor: '#eeeeee',
    links: {
      facebook: {
        link: 'https://www.facebook.com/envato',
        active: true
      },
      twitter: {
        link: 'https://twitter.com/envatomarket',
        active: true
      },
      linkedin: {
        link: '',
        active: false
      },
      youtube: {
        link: 'https://www.youtube.com/user/Envato',
        active: true
      },
      instagram: {
        link: '',
        active: false
      }
    }
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    class Social {
      constructor($element, ngbutils) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
      }

      $doCheck() {
        const { align, padding, backgroundColor } = this.options;
        this.$el.css({
          textAlign: align,
          padding: this.ngbutils.createPadding(padding),
          backgroundColor
        });
      }
    }
  ]
};
