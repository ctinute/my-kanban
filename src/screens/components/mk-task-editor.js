/* eslint-disable brace-style */
import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';

// noinspection JSUnusedGlobalSymbols
export default class MkTaskEditor extends LitElement {
  constructor() {
    super();
    if (!this.task) {
      this.task = {
        id: null,
        name: null,
        description: null,
        projectId: null,
        phaseId: null,
        stageId: null,
      };
    }
  }

  static get properties() {
    return {
      task: Object,
    };
  }

  _notifyChange(task) {
    this.dispatchEvent(new CustomEvent('edit-task', {detail: {task}}));
  }

  _render({task}) {
    return html`
      <style>
        :host {
          display: block;
          overflow: hidden;
        }
      </style>
      <div class="container">
        <paper-input
          label="Title"
          always-float-label
          value="${task.name}"
          on-change="${(e) => {
      task.name = e.target.value;
      this._notifyChange(task);
    }})"
          required
          error-message="This field is required !!!">
        </paper-input>
        <paper-textarea
          label="Description"
          rows="3"
          always-float-label
          value="${task.description}"
          on-blur="${(e) => {
      task.description = e.target.value;
      this._notifyChange(task);
    }}"
          required
          error-message="This field is required !!!">
        </paper-textarea>
      </div>`;
  }
}

customElements.define('mk-task-editor', MkTaskEditor);
