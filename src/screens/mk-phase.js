import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import 'dr-niels-sortable-list/sortable-list';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button';
import '@polymer/paper-card';


export default class MkPhase extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      user: Object,
      projectId: String,
      phaseId: String,
      project: Object,
      phase: Object,
    };
  }

  _stateChanged(state) {
    this.user = state.auth.user;
    this.projectId = state.route.data.projectId;
    this.phaseId = state.route.data.phaseId;
    this.project = state.userData.projects[this.projectId];
    this.phase = this.project ? this.project.phases[this.phaseId] : null;
  }

  _onSortStageComplete(e) {
    console.log(e)
    const sortedItem = e.detail.target.items;
    console.log(sortedItem);
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
        .tasks {
          width: 100%;
        }
        .task {
          height: 48px;
          width: 100%;
          margin: 8px 0;
          padding: 4px 8px;
          display: block;
        }
      </style>
    `;
  }

  _computedPhaseStageDetails(stageDetails, stages) {
    return stages.map((stageId) => stageDetails[stageId]);
  }

  _computedStageTaskDetails(taskDetails, tasks) {
    return tasks.map((taskId) => taskDetails[taskId]);
  }

  _renderTask(task) {
    console.log(task);
    return html`
      <paper-card class="task">
        ${task}
      </paper-card>
    `;
  }

  _renderStage(stage, canCreateTask) {
    console.log(stage);
    let taskList = stage.tasks ?
      html`
        <sortable-list class="tasks" 
          on-sort-finish="${this._onSortStageComplete}" 
          items="${Object.values(stage.tasks)}" 
          sortable=".task">
          ${stage.tasks.map((task) => this._renderTask(task))}
        </sortable-list>` :
      html `No task`;
    let actions = canCreateTask ? html`<paper-button ripple on-click="${() => this._openCreateTaskDialog()}">New task...</paper-button>` : null;
    return html`
      <paper-card class="stage">
        <div class="header">
          ${stage.name}
        </div>
        <div class="content">
          ${taskList}
        </div>
        <div class="actions">
          ${actions}
        </div>
      </paper-card>
    `;
  }

  _renderToolbar(phase) {
    return html`
      <app-toolbar>
        <div main-title>${phase.name}</div>
        <paper-icon-button icon="delete"></paper-icon-button>
        <paper-icon-button icon="search"></paper-icon-button>
        <paper-icon-button icon="close"></paper-icon-button>
        <paper-progress value="10" indeterminate bottom-item></paper-progress>
      </app-toolbar>
    `;
  }

  _render({phase}) {
    let styles = this._renderStyles();
    let toolbar = this._renderToolbar(phase);
    return html`
      ${styles}
      <app-header-layout>
        <app-header slot="header" fixed condenses effects="waterfall">
          ${toolbar}
        </app-header>
        <div class="content">
          <div class="stage-list">
            <sortable-list class="stages" on-sort-finish="${this._onSortStageComplete}" items="${Object.values(phase.stages)}" sortable=".stage">
              ${this._computedPhaseStageDetails(phase.stageDetails, phase.stages).map((stage, index) => this._renderStage(stage, index === 0)) }
            </sortable-list>
            <div class="new-stage">
              <paper-button ripple on-click="${() => this._openCreateTaskDialog()}">New stage...</paper-button>
            </div>
          </div>
        </div>
      </app-header-layout>
    `;
  }
}

customElements.define('mk-phase', MkPhase);
