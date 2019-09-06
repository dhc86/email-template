import { component } from '../main.controller';

export default component('ipPadding', {
  template: `
    <h3>{{$ctrl.label | translate}}</h3>
    <div class="form-row padding-inputs">
      <label for="builder_el_o_top" translate="builder_el_o_top"></label>
      <input id="builder_el_o_top" type="text" class="md-input" ng-model="$ctrl.model[0]">
      <label for="builder_el_o_right" translate="builder_el_o_right"></label>
      <input id="builder_el_o_right" type="text" class="md-input" ng-model="$ctrl.model[1]">
    </div>
    <div class="form-row padding-inputs">
      <label for="builder_el_o_bottom" translate="builder_el_o_bottom"></label>
      <input id="builder_el_o_bottom" type="text" class="md-input" ng-model="$ctrl.model[2]">
      <label for="builder_el_o_left" translate="builder_el_o_left"></label>
      <input id="builder_el_o_left" type="text" class="md-input" ng-model="$ctrl.model[3]">
    </div>
  `,
  bindings: {
    model: '=',
    label: '@'
  }
  // controller: [class Padding {}]
});
