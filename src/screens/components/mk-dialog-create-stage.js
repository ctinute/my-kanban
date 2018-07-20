import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import './mk-stage-editor';

export default class MkDialogCreateStage extends LitElement {
  static get properties() {
    return {
      stage: Object,
    };
  }

  constructor() {
    super();
    this.stage = {
      id: null,
      name: null,
      canCreateTask: true,
      limit: 0,
      tasks: [],
    };
  }

  _submit(stage) {
    this.dispatchEvent(new CustomEvent('submit', {detail: {stage}}));
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  _renderStyles() {
    return html`
      <style>
        :host {
            display: block;
        }
        .actions {
        margin-top: 16px;
        }
      </style>
    `;
  }

  _render({stage}) {
    let styles = this._renderStyles();
    return html`
      ${styles}
      <div class="header">
        <h2>New stage</h2>
      </div>
      <div class="body">
        <mk-stage-editor stage="${stage}"></mk-stage-editor>
      <div class="actions">
        <paper-button dialog-dismiss on-click="${() => this._cancel()}">Cancel</paper-button>
        <paper-button dialog-confirm on-click="${() => this._submit(stage)}">Create</paper-button>
      </div>`;
  }
}

customElements.define('mk-dialog-create-stage', MkDialogCreateStage);
