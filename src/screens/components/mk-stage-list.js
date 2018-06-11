import {html, LitElement} from '@polymer/lit-element';
import 'sortablejs';

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
      animation: 150,
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
        animation: 150,
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
        app-header-layout {
            height: 100%;
            width: 100%;
            overflow-x: scroll;
            overflow-y: hidden;
        }
        app-header-layout > .content {
          padding: 16px 0;
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
          white-space: nowrap;
          height: 100%;
          width: 256px;
          margin: 0 16px;
          padding: 8px;
        }
        .stage > .header {
            font-size: 1.2em;
            font-weight: bold;
            text-align: center;
            height: 2.5em;
            line-height: 2.5em;
            margin-bottom: 8px;
            border-bottom: 1px solid darkgrey;
            cursor: move;
        }
        
        
        .tasks {
          width: 100%;
        }
        .task {
          height: 48px;
          line-height: 48px;
          width: 100%;
          margin: 8px 0;
          padding: 4px 8px;
          display: block;
          cursor: pointer;
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
    const canCreateTask = (index === 0);
    let taskList = stage.tasks ?
      html`${stage.tasks.map((task, index) => this._renderTask(task, index))}` :
      html `No task`;
    let actions = canCreateTask ? html`<paper-button ripple on-click="${() => this._openCreateTaskDialog()}">New task...</paper-button>` : null;
    return html`
      <paper-card class="stage" id="stage-${stage.id}">
        <div class="header">
          ${stage.name}
        </div>
        <div class="content" id="${stage.id}" data-index-number="${index}">
          ${taskList}
        </div>
        <div class="actions">
          ${actions}
        </div>
      </paper-card>
    `;
  }

  _renderTask(task, index) {
    return html`
      <paper-card class="task" data-index="${index}">
        ${task.title}
      </paper-card>
    `;
  }
}

customElements.define('mk-stage-list', MkStageList);
