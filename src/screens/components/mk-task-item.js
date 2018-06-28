import {html, LitElement} from '@polymer/lit-element';

class MkTaskItem extends LitElement {
  constructor() {
    super();
    this.selected = true;
  }

  static get properties() {
    return {
      task: Object,
      selected: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
      },
    };
  }

  _fireSelect() {
    this.selected = true;
    this.dispatchEvent(new CustomEvent('select-task', {detail: {task: this.task}}));
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
        }
        :host([selected]) {
          
        }
        .container {
          height: 48px;
          line-height: 48px;
          padding: 0 8px;
          width: 100%;
          border-radius: 8px;
          background-color: white;
        }
      </style>
    `;
  }

  _render({task, selected}) {
    let styles = this._renderStyles();
    return html`
      ${styles}
      <paper-card class="container">
        <div>
          ${task.name}
        </div>
      </paper-card>
    `;
  }
}

customElements.define('mk-task-item', MkTaskItem);
