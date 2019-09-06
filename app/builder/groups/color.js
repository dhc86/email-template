import { component } from '../main.controller';

export default component('ipColor', {
  template: `
    <div class="form-row text-inputs">
      <label>{{$ctrl.label | translate}}</label>
      <div class="color-inputs">
        <color-input class="color-input-container" model="$ctrl.color"></color-input>
      </div>
    </div>
  `,
  bindings: {
    color: '=',
    label: '@'
  }
});
