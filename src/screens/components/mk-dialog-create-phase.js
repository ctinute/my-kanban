import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

// noinspection JSUnusedGlobalSymbols
export default class MkDialogCreatePhase extends LitElement {
  static get properties() {
    return {
      phase: Object,
    };
  }

  constructor() {
    super();
    this.phase = {
      name: null,
    };
  }

  _submit(phase) {
    this.dispatchEvent(new CustomEvent('submit', {detail: {phase}}));
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  // noinspection JSMethodCanBeStatic
  _renderStyles() {
    return html`<style>:host{display: block;}</style>`;
  }

  _render({phase, projectId}) {
    let styles = this._renderStyles();
    return html`
      ${styles}
      <div class="modal-header">
        <h2>New Phase: ${projectId}</h2>
      </div>
      <div class="modal-content">
        <paper-input 
          required 
          label="Phase name" 
          value="${phase.name}" 
          on-change="${(e) => phase.name = e.target.value})"
          error-message="This field is required !!!">
        </paper-input>
      </div>
      <div class="modal-actions">
        <paper-button dialog-dismiss on-click="${() => this._cancel()}" ">Cancel</paper-button>
        <paper-button dialog-confirm on-click="${() => this._submit(phase)}">Create</paper-button>
      </div>`;
  }
}

customElements.define('mk-dialog-create-phase', MkDialogCreatePhase);
