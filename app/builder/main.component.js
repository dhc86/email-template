import { cloneDeep, find, isEqual } from 'lodash';
import { component } from './main.controller';

import 'angular-dragula/dist/dragula.css';
import 'ngalertify/lib/alertify.js/dist/css/alertify.css';

import template from './layouts/modern/main.html';
import { scoped } from './layouts/modern/main.less';

import './directives';
import './groups';
import './mjml';

export default component('ngjsEmailBuilder', {
  template,
  transclude: true,
  bindings: {
    Email: '=?email',
    modules: '='
  },
  controller: [
    '$element',
    '$scope',
    'ngbutils',
    'dragulaService',
    'ngjs',
    'mjml',
    class NgjsEmailBuilder {
      constructor($element, $scope, ngbutils, dragulaService, ngjs, mjml) {
        $element.addClass(scoped);

        this.$el = $element;
        this.ngjs = ngjs;
        this.mjml = mjml;
        this.$scope = $scope;
        this.ngbutils = ngbutils;
        this.editGeneralSettings = false;

        this.elements = [...ngjs.elements].map(([type, { element }]) => {
          return {
            type,
            ...element
          };
        });

        /**
         * Default language
         * @type {string}
         */
        this.currentLanguage = 'en';

        /**
         * Dragula configuration for builder elements
         */
        dragulaService.options($scope, 'element', {
          isContainer(el) {
            return el.classList.contains('email-container');
          },
          copy: true,
          copySortSource: false,
          removeOnSpill: true,
          moves(el, source) {
            return !source.classList.contains('email-container');
          },
          invalid() {
            return false; // don't prevent any drags from initiating by default
          }
        });

        dragulaService.options($scope, 'module', {
          isContainer(el) {
            return el.classList.contains('email-container');
          },
          copy: true,
          copySortSource: false,
          removeOnSpill: true,
          moves(el, source) {
            return !source.classList.contains('email-container');
          },
          invalid() {
            return false; // don't prevent any drags from initiating by default
          }
        });

        /**
         * Dragula configuration for builder
         */
        dragulaService.options($scope, 'element-html', {
          copy: false,
          copySortSource: false,
          moves(el, source, handle) {
            return handle.classList.contains('move');
          },
          invalid() {
            return false; // don't prevent any drags from initiating by default
          }
        });
        /**
         * Drag and drop events for elements
         */
        $scope.$on('element.drop', (event, el, target, source, sibling) => {
          const element = this.getElementByDomElement(el);
          const index =
            (sibling && Array.from(target[0].children).indexOf(sibling[0])) ||
            -1;

          el.remove();
          this.$scope.$evalAsync(() => {
            if (index === -1) {
              this.Email.elements.push(element);
            } else {
              this.Email.elements.splice(index - 1, 0, element);
            }
            this.currentElement = element;
            this.ngbutils.trackEvent('Elements', 'drop', element.type);
          });
        });

        $scope.$on('module.drop', (event, el, target, source, sibling) => {
          let { module } = this.modules[el.attr('data-key')];
          if (typeof module === 'string') {
            module = JSON.parse(module);
          }
          const index =
            (sibling && Array.from(target[0].children).indexOf(sibling[0])) ||
            -1;

          el.remove();
          this.$scope.$evalAsync(() => {
            if (this.Email.elements.length) {
              const newElements = cloneDeep(module.elements).map(modEl => {
                modEl.id = this.ngbutils.uid();
                return modEl;
              });
              if (index === -1) {
                this.Email.elements = [...newElements, ...this.Email.elements];
              } else {
                this.Email.elements.splice(index - 1, 0, ...newElements);
              }
            } else {
              this.Email = cloneDeep(module);
            }
            // this.currentElement = element;
            // this.ngbutils.trackEvent('Elements', 'drop', element.type);
          });
        });

        /**
         * Drag and drop events for elements inside the builder
         */
        $scope.$on(
          'element-html.drop',
          (event, el, target, source, sibling) => {
            const id = el.attr('id');
            let index =
              (sibling && Array.from(target[0].children).indexOf(sibling[0])) ||
              -1;
            if (index === -1) {
              index = this.Email.elements.length - 1;
            } else {
              index--;
            }
            const element = find(this.Email.elements, { id });
            const oldIndex = this.Email.elements.indexOf(element);
            this.$scope.$evalAsync(() => {
              if (index >= this.Email.elements.length) {
                const k = index - this.Email.elements.length;
                while (k-- + 1) {
                  this.Email.elements.push(undefined);
                }
              }
              this.Email.elements.splice(
                index,
                0,
                this.Email.elements.splice(oldIndex, 1)[0]
              );
            });
            // this.currentElement = undefined;
            return false;
          }
        );
      }

      $onInit() {
        if (!this.Email) {
          this.Email = this.ngjs.getDefaultEmailStructure();
        } else {
          this.Email = {
            ...this.ngjs.getDefaultEmailStructure(),
            ...this.Email
          };
        }
        this.cloneEmail = cloneDeep(this.Email);
        this.ngjs.listeners.init.forEach(cb => cb());
      }

      getParentStyles() {
        const { backgroundColor, font } = this.Email.emailOptions;
        return {
          backgroundColor,
          ...this.ngbutils.createFont(font)
        };
      }

      getEmailWrapperStyles() {
        const {
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          backgroundColor,
          font,
          direction,
          width
        } = this.Email.emailOptions;

        return {
          backgroundColor,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          direction,
          width: `${width}px`,
          ...this.ngbutils.createFont(font)
        };
      }

      getElementByDomElement(domElement) {
        const type = domElement.attr('data-type');
        if (!type) return;
        const { defaults } = this.ngjs.elements.get(type);
        return cloneDeep({ type, defaults, id: this.ngbutils.uid() });
      }

      getVariable(prop) {
        return this.ngjs.config[prop];
      }

      removeElement(id) {
        this.ngbutils.confirm(
          this.ngbutils.translate('are_you_sure'),
          () => {
            this.$scope.$evalAsync(() => {
              const el = find(this.Email.elements, { id });
              this.Email.elements.splice(this.Email.elements.indexOf(el), 1);
              this.ngbutils.trackEvent('Elements', 'remove', el.type);
              this.currentElement = undefined;
            });
          },
          null,
          this.ngbutils.translate('delete_element'),
          this.ngbutils.translate('do_not_remove_element')
        );
      }
      /**
       * Clone block element by id
       * @param id
       */
      cloneElement(id) {
        const el = find(this.Email.elements, { id });
        const newEl = cloneDeep(el);
        newEl.id = this.ngbutils.uid();
        this.ngbutils.trackEvent('Elements', 'clone', newEl.type);
        this.Email.elements.splice(
          this.Email.elements.indexOf(el) + 1,
          0,
          newEl
        );
      }
      /**
       * Edit block element by id
       * @param id
       */
      editElement(id = null) {
        if (this.preview) return;
        if (id === 'general') {
          this.editGeneralSettings = true;
        } else {
          this.editGeneralSettings = false;
          this.currentElement = find(this.Email.elements, { id });
        }
        this.ngbutils.trackEvent(
          'Email',
          'edit',
          this.currentElement ? this.currentElement.type : 'emailSettings'
        );
      }
      /**
       * Change languge
       * @param key
       * @returns {Server|Object|string}
       */
      changeLanguage(key) {
        this.currentLanguage = key;
        return $translate.use(key);
      }
      /**
       * Check if email has changed, to enable or disable save button
       * @returns {boolean}
       */
      hasChanges() {
        return !isEqual(this.Email, this.cloneEmail);
      }
      /**
       * Save email example
       */
      async saveEmailTemplate() {
        const { errors, html } = await this.mjml.compileEmail(this.Email);
        if (errors.length) {
          return this.ngbutils
            .notify(errors.map(e => e.formattedMessage).join(', '))
            .error();
        } else {
          this.ngjs.emit('save', { email: this.Email, html });
          this.$scope.$evalAsync(() => {
            this.html = html;
            this.cloneEmail = cloneDeep(this.Email);
            this.currentElement = undefined;
          });
          this.ngbutils
            .notify(this.ngbutils.translate('email_saved'))
            .success();
          this.ngbutils.trackEvent('Email', 'saved');
        }
      }

      /**
       * Open export container
       * @returns {*}
       */
      openExportContainer() {
        if (!this.Email.elements.length)
          return this.ngbutils
            .notify(this.ngbutils.translate('nothing_to_export'))
            .log();
        this.exportAsHtml = false;
        this.currentElement = 'export';
        // this.changeHtml();
      }

      addSocialNetwork(links, link) {
        if (!link) return;
        links[link].active = true;
      }

      addNewMenuItem() {
        this.currentElement.defaults.items.push(
          Object.assign({}, { title: 'Title', href: '' })
        );
      }

      deleteMenuItem(index) {
        this.currentElement.defaults.items.splice(index, 1);
      }

      /**
       * Download Email as HTML
       */
      downloadHtml() {
        const a = document.createElement('a');
        a.target = '_blank';
        this.ngbutils.trackEvent('Email', 'export', 'HTML');
        a.href = 'data:attachment/html,' + encodeURI(this.html);
        a.download = this.ngbutils.uid('export') + '.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      showModulesContainer() {
        this.editGeneralSettings = false;
        this.currentElement = null;
      }

      /**
       * Activate preview Email
       * @returns {*}
       */
      previewEmail() {
        if (!this.Email.elements.length)
          return this.ngbutils
            .notify(this.ngbutils.translate('nothing_to_preview'))
            .log();
        this.ngbutils.trackEvent('Email', 'preview');
        this.preview = true;
        this.currentElement = undefined;
      }

      /**
       * Delete all elements from builder
       * @returns {*}
       */
      deleteAllElements() {
        this.ngbutils.confirm(
          this.ngbutils.translate('before_delete_all_elements'),
          () => {
            this.ngjs.emit('delete', this.Email);
            this.$scope.$evalAsync(() => {
              this.Email = this.ngjs.getDefaultEmailStructure();
              this.cloneEmail = cloneDeep(this.Email);
              this.currentElement = undefined;
            });
          },
          null,
          this.ngbutils.translate('accept'),
          this.ngbutils.translate('deny')
        );
      }
    }
  ]
});
