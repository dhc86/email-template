import { component } from '../main.controller';

export default component('ipBorder', {
  template: `
    <h3 translate="border"></h3>
    <div class="form-row range-inputs" ng-if="$ctrl.hasProperty('size')">
      <label for="border-size">{{'size' | translate}}</label>
      <input type="range" min="0" max="20" id="border-size" ng-model="$ctrl.border['size']">
      <span>{{$ctrl.border['size']}}px</span>
    </div>
    <div class="grid two">
      <div class="form-row text-inputs" ng-if="$ctrl.hasProperty('style')">
        <label for="border-style">{{'style' | translate}}</label>
        <select class="md-input" id="border-style" ng-model="$ctrl.border['style']">
          <option ng-repeat="option in ['dotted', 'solid', 'dashed']" ng-value="option">{{option
            | translate}}</option>
        </select>
      </div>
      <div class="form-row text-inputs" ng-if="$ctrl.hasProperty('color')">
        <label for="border-color">{{'color' | translate}}</label>
        <div class="color-inputs">
          <color-input class="color-input-container" model="$ctrl.border['color']"></color-input>
        </div>
      </div>
    </div>
    <div class="form-row range-inputs" ng-if="$ctrl.hasProperty('radius')">
      <label for="border-radius">{{'radius' | translate}}</label>
      <input type="range" min="0" max="50" id="border-radius" ng-model="$ctrl.border['radius']">
      <span class="md-color-gray">{{$ctrl.border['radius']}}px</span>
    </div>
  `,
  bindings: {
    border: '='
  },
  controller: [
    class IpBorder {
      hasProperty(prop) {
        return this.border.hasOwnProperty(prop);
      }
    }
  ]
});
