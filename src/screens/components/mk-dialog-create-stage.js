import {LitElement, html} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-input.js';

export default class MkDialogCreateStage extends LitElement {
  static get properties() {
    return {
      stage: Object,
      _onSubmit: Function,
      _onCancel: Function,
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

  _render({stage, _onSubmit, _onCancel}) {
    return html`
      <div class="header">
        <h2>New stage</h2>
      </div>
      <div class="body">
        <paper-input
          label="Name"
          value="${stage.name}"
          on-change="${(e) => stage.name = e.target.value})"
          required
          error-message="This field is required !!!">
        </paper-input>
        <paper-input
          label="Limit task"
          type="number"
          value="${stage.limit}"
          on-change="${(e) => stage.limit = e.target.value})"
          required
          error-message="This field is required !!!">
        </paper-input>
        <paper-toggle-button></paper-toggle-button>
      </div>
      <div class="actions">
        <paper-button dialog-dismiss on-click="${() => _onSubmit(stage)}">Cancel</paper-button>
        <paper-button dialog-confirm on-click="${() => _onCancel()}">Create</paper-button>
      </div>`;
  }
}

customElements.define('mk-dialog-create-stage', MkDialogCreateStage);
