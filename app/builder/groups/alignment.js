import { component } from '../main.controller';

export default component('ipAlignment', {
  template: `
    <div class="form-row">
      <div class="md-btn-group md-btn-group-justify">
        <button type="button" class="md-btn-custom md-btn-sm md-btn" ng-class="{'active': $ctrl.align == 'left'}" ng-click="$ctrl.align = 'left'" translate="left"></button>
        <button type="button" class="md-btn-custom md-btn-sm md-btn" ng-class="{'active': $ctrl.align == 'center'}" ng-click="$ctrl.align = 'center'" translate="center"></button>
        <button type="button" class="md-btn-custom md-btn-sm md-btn" ng-class="{'active': $ctrl.align == 'right'}" ng-click="$ctrl.align = 'right'" translate="right"></button>
      </div>
    </div>
  `,
  bindings: {
    align: '='
  }
});
