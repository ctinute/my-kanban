import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toggle-button';

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
    let toggleCanCreateTask = () => {
      stage.canCreateTask = !stage.canCreateTask;
    };
    return html`
      ${styles}
      <div class="header">
        <h2>New stage</h2>
      </div>
      <div class="body">
        <paper-input
          label="Name"
          always-float-label
          value="${stage.name}"
          on-change="${(e) => stage.name = e.target.value})"
          required
          error-message="This field is required !!!">
        </paper-input>
        <paper-input
          label="Limit task"
          type="number"
          always-float-label
          value="${stage.limit}"
          on-change="${(e) => stage.limit = e.target.value})"
          required
          error-message="This field is required !!!">
        </paper-input>
        <div class="inline">
          <label for="create-task-toogle">Can create task ?</label>
          <paper-toggle-button id="create-task-toogle" checked="${stage.canCreateTask}" on-click="${toggleCanCreateTask}"></paper-toggle-button>
        </div>
      </div>
      <div class="actions">
        <paper-button dialog-dismiss on-click="${() => this._cancel()}">Cancel</paper-button>
        <paper-button dialog-confirm on-click="${() => this._submit(stage)}">Create</paper-button>
      </div>`;
  }
}

customElements.define('mk-dialog-create-stage', MkDialogCreateStage);
