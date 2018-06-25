import {html, LitElement} from '@polymer/lit-element';
import 'sortablejs';
import './mk-stage-column';
import './mk-task-item';

class MkStageList extends LitElement {
  constructor() {
    super();
    this.shouldMoveTaskEventFire = true;
    this.selectedIndex = -1;
    this.shouldRerender = true;
  }

  static get properties() {
    return {
      phase: Object,
      stages: Array,
      selectedIndex: Number,
      shouldMoveTaskEventFire: Boolean,
      shouldRerender: Boolean,
    };
  }

  _onSelectStage() {
    this.shouldRerender = true;
    this.dispatchEvent(new CustomEvent('select-stage', {
      detail: {
        selected: this.selectedIndex !== -1,
        stageId: this.selectedIndex !== -1 ? this.selectedStage.id : null,
      },
    }));
  }

  _onMoveStage(oldIndex, newIndex) {
    // console.log('set skip next render');
    this.shouldRerender = false;
    this.dispatchEvent(new CustomEvent('move-stage', {detail: {oldIndex, newIndex}}));
  }

  _onCreateTask(stageId) {
    this.shouldRerender = true;
    this.dispatchEvent(new CustomEvent('create-task', {
      detail: {
        stageId,
      },
    }));
  }

  _onMoveTask(from, to, oldIndex, newIndex) {
    // console.log('set skip next render');
    this.shouldRerender = false;
    from = from.id;
    to = to.id;
    // skip emitting 1 event if moving card to another stage
    if (from !== to) {
      this.shouldMoveTaskEventFire = !this.shouldMoveTaskEventFire;
    }
    if (this.shouldMoveTaskEventFire) {
      this.dispatchEvent(new CustomEvent('move-task', {detail: {from, to, oldIndex, newIndex}}));
    }
  }

  _firstRendered() {
    this._initSortable();
  }

  _initSortable() {
    let stageListContainer = this.shadowRoot.querySelector('#list');
    Sortable.create(stageListContainer, {
      animation: 100,
      draggable: '.stage',
      handle: '.header',
      chosenClass: 'item-old',
      dragClass: 'item-dragging',
      ghostClass: 'item-new',
      onSort: (evt) => {
        this._onMoveStage(evt.oldIndex, evt.newIndex);
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
          this._onMoveTask(evt.from, evt.to, evt.oldIndex, evt.newIndex);
        },
      });
    }
  }

  // noinspection JSMethodCanBeStatic
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
          padding: 8px 0;
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
          max-height: 100%;
          display: inline-block;
          vertical-align: top;
          width: 256px;
          margin: 0 16px;
          box-sizing: border-box;
          border-radius: 4px;
        }
        .stage.active {
          background-color: #e3f2fd;
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
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

  _onStageSelected(index, stage) {
    if (index !== this.selectedIndex) {
      this.selectStage(index);
      this.selectedStage = stage;
    } else {
      this.deSelectStage();
      this.selectedStage = null;
    }
    this._onSelectStage(stage);
  }

  selectStage(index) {
    this.shouldRerender = true;
    this.selectedIndex = index;
  }

  deSelectStage() {
    this.shouldRerender = true;
    this.selectedIndex = -1;
  }


  _shouldRender(props, changedProps, oldProps) {
    // console.log('should render: ' + this.shouldRerender);
    return this.shouldRerender;
  }

  _renderStage(stage, index, isActive) {
    let classes = `stage ${isActive ? 'active' : ''}`;
    let taskList = stage.tasks.length > 0 ?
      html`${stage.tasks.map((task) => this._renderTask(task, isActive))}` : null;
    // html `<div class="no-task">No task. Drop new task here !</div>`;
    return html`
      <mk-stage-column 
        class$="${classes}" 
        stage="${stage}" 
        canCreateTask="${stage.canCreateTask}" 
        on-create-task-button-click="${() => this._onCreateTask(stage.id)}"
        on-select="${() => this._onStageSelected(index, stage)}">
        <div class="content" id="${stage.id}" data-index-number="${index}">
          ${taskList}
        </div>
      </mk-stage-column>
    `;
  }

  // noinspection JSMethodCanBeStatic
  _createDisplayStages(phase) {
    // console.log('_createDisplayStages');
    let stages = [];
    // re-order stage details
    for (let i = 0; i < phase.stages.length; i++) {
      let stage = JSON.parse(JSON.stringify(phase.stageDetails[phase.stages[i]]));
      // add cards to stage detail
      if (stage.tasks) {
        for (let j = 0; j < stage.tasks.length; j++) {
          stage.tasks[j] = phase.taskDetails[stage.tasks[j]];
        }
      } else {
        stage.tasks = [];
      }
      stages.push(stage);
    }
    return stages;
  }

  // noinspection JSMethodCanBeStatic
  _renderTask(task, hostColumnActive) {
    return html`
      <paper-card class="task" elevation="${hostColumnActive ? 0 : 1}">
        <mk-task-item task="${task}">
      </paper-card>
    `;
  }

  _render({phase, selectedIndex}) {
    let stages = this._createDisplayStages(phase);
    return html`
      ${this._renderStyles()}
      <div id="list">
        ${stages.map((stage, index) => this._renderStage(stage, index, index === selectedIndex))}
      </div>  
    `;
  }
}

customElements.define('mk-stage-list', MkStageList);
