import { component } from '../main.controller';

export default component('ipFont', {
  template: `
    <h3>{{'font' | translate}}</h3>
    <div class="form-row range-inputs" ng-if="$ctrl.hasProperty('size')">
      <label for="font-size">{{'size' | translate}}</label>
      <input type="range" min="10" max="40" id="font-size" ng-model="$ctrl.font['size']">
      <span>{{$ctrl.font['size']}}px</span>
    </div>
    <div class="form-row text-inputs" ng-if="$ctrl.hasProperty('color')">
      <label for="font-color">{{'color' | translate}}</label>
      <div class="color-inputs">
        <color-input class="color-input-container" model="$ctrl.font['color']"></color-input>
      </div>
    </div>
    <div class="grid two">
      <div class="form-row text-inputs" ng-if="$ctrl.hasProperty('family')">
        <label for="font-family">{{'family' | translate}}</label>
        <select class="md-input" id="font-family" ng-model="$ctrl.font['family']">
          <option ng-style="{fontFamily: option}" ng-repeat="option in $ctrl.getFontFamily()"
            ng-value="option">{{option | translate}}</option>
        </select>
      </div>
      <div class="form-row text-inputs" ng-if="$ctrl.hasProperty('weight')">
        <label for="font-weight">{{'weight' | translate}}</label>
        <select class="md-input" id="font-weight" ng-model="$ctrl.font['weight']">
          <option ng-repeat="option in $ctrl.getFontWeights()" ng-value="option">{{option
            | translate}}</option>
        </select>
      </div>
    </div>
  `,
  bindings: {
    font: '='
  },
  controller: [
    'ngjs',
    class IpFont {
      constructor(ngjs) {
        this.ngjs = ngjs;
      }
      hasProperty(prop) {
        return this.font.hasOwnProperty(prop);
      }

      getFontFamily() {
        return [...this.ngjs.fonts];
      }

      getFontWeights() {
        return [...this.ngjs.fontWeights];
      }

      insertDefaults() {
        this.font = { ...this.ngjs.defaultFont, ...this.font };
      }

      $onInit() {
        this.insertDefaults();
      }

      $doCheck() {
        if (!this.font.hasOwnProperty('family')) {
          this.insertDefaults();
        }
      }
    }
  ]
});
