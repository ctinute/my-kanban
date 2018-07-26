import {html, LitElement} from '@polymer/lit-element';
import './mk-task-editor';

class MkTaskItem extends LitElement {
  constructor() {
    super();
    this.mode = 'OVERVIEW';
  }

  static get properties() {
    return {
      task: Object,
      mode: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  _fireSelect() {
    this.selected = true;
    this.dispatchEvent(new CustomEvent('select-task', {detail: {task: this.task}}));
  }

  _fireEditTaskEvent(task) {
    this.dispatchEvent(new CustomEvent('edit-task', {detail: {task}}));
  }


  _fireUpdate(task) {
    // TODO: implement edit/update
    this.dispatchEvent(new CustomEvent('update-task', {detail: {task}}));
  }

  _fireDelete(task) {
    // TODO: implement delete
    this.dispatchEvent(new CustomEvent('delete-task', {detail: {task}}));
  }

  _shouldRender(props) {
    return props.task !== undefined;
  }

  _renderStyles() {
    return html`
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          border-radius: 8px;
          padding: 0 8px;
          background-color: white;
          overflow: hidden;
        }
        .container {
          width: 100%;
        }
        #title {
          height: 48px;
          line-height: 48px;
        }
        #description {
          overflow: hidden;
          max-height: 999px;
          transition: max-height;
          transition-duration: 0.3s;
          transition-delay: 0.3s;
        }
        .OVERVIEW #description {
          max-height: 0;
        }
        .info {
          overflow: hidden;
          transition: max-height;
          transition-duration: 0.3s;
          transition-delay: 0.3s;
          max-height: 999px;
        }
        .EDIT .info {
          max-height: 0;
        }
        .editor {
          overflow: hidden;
          transition: max-height;
          transition-duration: 0.3s;
          transition-delay: 0.3s;
          max-height: 0;
        }
        .EDIT .editor {
          max-height: 999px;
        }
      </style>
    `;
  }

  _render({task, selected, mode}) {
    let editor = mode === 'EDIT' ? html`<mk-task-editor task="${task}" on-edit-task="${(e) => this._fireEditTaskEvent(e.detail.task)}"></mk-task-editor>` : null;
    let styles = this._renderStyles();
    return html`
      ${styles}
      <div class$="${'container ' + mode}">
        <div class="info">
          <div id="title">
            ${task.name}
          </div>
          <div id="description">
            ${task.description}
          </div>
        </div>
        <div class="editor">
          ${editor}
        </div>
      </div>
    `;
  }
}

customElements.define('mk-task-item', MkTaskItem);
