import {html, LitElement} from '@polymer/lit-element';
import 'sortablejs';
import './mk-stage';
import './mk-task-item';

class MkStageList extends LitElement {
  constructor() {
    super();
    this.shouldMoveTaskEventFire = true;
  }

  static get properties() {
    return {
      stages: Array,
      shouldMoveTaskEventFire: Boolean,
    };
  }

  _moveStage(oldIndex, newIndex) {
    this.dispatchEvent(new CustomEvent('move-stage', {detail: {oldIndex, newIndex}}));
  }

  _moveTask(from, to, oldIndex, newIndex) {
    from = from.id;
    to = to.id;
    // only emit 1 event
    this.shouldMoveTaskEventFire = !this.shouldMoveTaskEventFire;
    if (this.shouldMoveTaskEventFire) {
      this.dispatchEvent(new CustomEvent('move-task', {detail: {from, to, oldIndex, newIndex}}));
    }
  }

  _didRender() {
    let stageListContainer = this.shadowRoot.querySelector('#list');
    Sortable.create(stageListContainer, {
      animation: 100,
      draggable: '.stage',
      handle: '.header',
      chosenClass: 'item-old',
      dragClass: 'item-dragging',
      ghostClass: 'item-new',
      onSort: (evt) => {
        this._moveStage(evt.oldIndex, evt.newIndex);
      },
    });
    let taskListContainer = stageListContainer.getElementsByClassName('content');
    for (let cardList of taskListContainer) {
      Sortable.create(cardList, {
        group: 'card',
        draggable: '.task',
        animation: 100,
        chosenClass: 'item-old',
        dragClass: 'item-dragging',
        ghostClass: 'item-new',
        onSort: (evt) => {
          this._moveTask(evt.from, evt.to, evt.oldIndex, evt.newIndex);
        },
      });
    }
  }

  _render({stages}) {
    return html`
      ${this._renderStyles()}
      <div id="list">
        ${stages.map((stage, index) => this._renderStage(stage, index))}
      </div>  
    `;
  }

  _renderStyles() {
    return html`
      <style>
        :host {
            display: block;
        }
        #list {
            white-space: nowrap;
            width: auto;
            height: 100%;
        }
        .content {
            min-height: 16px;
        }
        .stages,
        .new-stage {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
        }
        .stage {
          display: inline-block;
          vertical-align: top;
          width: 256px;
          margin: 0 16px;
          padding: 8px;
        }
        .task {
          height: 48px;
          line-height: 48px;
          width: 100%;
          margin: 8px 0;
          padding: 4px 8px;
          display: block;
          cursor: pointer;
          border-radius: 4px;
        }
        .no-task {
          text-align: center;
          opacity: 0.8;
          padding: 16px 0;
        }
        .item-new {
          opacity: 0.2;
          border: 1px dashed black;
        }
        .item-dragging {
          opacity: 1;
        }
      </style>
    `;
  }

  _renderStage(stage, index) {
    let taskList = stage.tasks.length > 0 ?
      html`${stage.tasks.map((task) => this._renderTask(task))}` : null;
      // html `<div class="no-task">No task. Drop new task here !</div>`;
    return html`
      <mk-stage 
        class="stage" 
        stage="${stage}" 
        canCreateTask="${(index === 0)}" 
        onCreateTaskButtonClick="${() => {}}">
        <div class="content" id="${stage.id}" data-index-number="${index}">
          ${taskList}
        </div>
      </mk-stage>
    `;
  }

  _renderTask(task) {
    return html`
      <paper-card class="task">
        <mk-task-item task="${task}">
      </paper-card>
    `;
  }
}

customElements.define('mk-stage-list', MkStageList);
