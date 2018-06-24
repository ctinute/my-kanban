import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-button/paper-button';

export default class MkDialogCreateTask extends LitElement {
  static get properties() {
    return {
      task: Object,
    };
  }

  constructor() {
    super();
    this.task = {
      id: null,
      name: null,
      description: null,
      projectId: null,
      phaseId: null,
      stageId: null,
    };
  }

  _submit(task) {
    this.dispatchEvent(new CustomEvent('submit', {detail: {task}}));
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  // noinspection JSMethodCanBeStatic
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

  _render({task}) {
    let styles = this._renderStyles();
    return html`
      ${styles}
      <div class="header">
        <h2>New task</h2>
      </div>
      <div class="body">
        <paper-input
          label="Name"
          always-float-label
          value="${task.name}"
          on-change="${(e) => task.name = e.target.value})"
          required
          error-message="This field is required !!!">
        </paper-input>
        <paper-textarea
          label="Description"
          rows="3"
          always-float-label
          value="${task.description}"
          on-change="${(e) => task.description = e.target.value})"
          required
          error-message="This field is required !!!">
        </paper-textarea>
      </div>
      <div class="actions">
        <paper-button dialog-dismiss on-click="${() => this._cancel()}">Cancel</paper-button>
        <paper-button dialog-confirm on-click="${() => this._submit(task)}">Create</paper-button>
      </div>`;
  }
}

customElements.define('mk-dialog-create-task', MkDialogCreateTask);
