import {html, LitElement} from '@polymer/lit-element';

class MkTaskItem extends LitElement {
  static get properties() {
    return {
      task: Object,
      onTaskClick: Function,
    };
  }

  _renderStyles() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }

  _render({task, onTaskClick}) {
    return html`
      <div on-click="${onTaskClick}">
        ${task.title}
      </div>
    `;
  }
}

customElements.define('mk-task-item', MkTaskItem);
