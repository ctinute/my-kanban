import {html} from '@polymer/lit-element';
import {MkScreen} from './mk-screen';

export default class MkHome extends MkScreen {
  constructor() {
    super();
  }

  static get properties() {
    return {};
  }

  _stateChanged(state) {
    // if (this.active) {
    //
    // }
  }

  _render(props) {
    const style = html`
      <style>
        :host {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;                
        }
      </style>`;
    return html`
      ${style}
      <div>
        <img src="../../images/landing/arrow.svg" alt="" width="50%" height="50%">
        <div style="width: 100%; text-align: center">Start by clicking this</div>
      </div>
    `;
  }
}

customElements.define('mk-home', MkHome);
