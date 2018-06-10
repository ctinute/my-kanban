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
import './components/mk-stage-list';


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
      </style>
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

  // _render({phase}) {
  //   let styles = this._renderStyles();
  //   let toolbar = this._renderToolbar(phase);
  //   return html`
  //     ${styles}
  //     <app-header-layout>
  //       <app-header slot="header" fixed condenses effects="waterfall">
  //         ${toolbar}
  //       </app-header>
  //       <div class="content">
  //         <div class="stage-list">
  //           <sortable-list class="stages" on-sort-finish="${this._onSortStageComplete}" items="${Object.values(phase.stages)}" sortable=".stage">
  //             ${this._computedPhaseStageDetails(phase.stageDetails, phase.stages).map((stage, index) => this._renderStage(stage, index === 0)) }
  //           </sortable-list>
  //           <div class="new-stage">
  //             <paper-button ripple on-click="${() => this._openCreateTaskDialog()}">New stage...</paper-button>
  //           </div>
  //         </div>
  //       </div>
  //     </app-header-layout>
  //   `;
  // }

  _createDisplayStages(phase) {
    let stages = [];
    for (let stageId of phase.stages) {
      let tasks = [];
      if (phase.stageDetails[stageId].tasks) {
        for (let taskId of phase.stageDetails[stageId].tasks) {
          tasks.push(phase.taskDetails[taskId]);
        }
      }
      stages.push({
        id: stageId,
        name: phase.stageDetails[stageId].name,
        tasks,
      });
    }
    return stages;
  }

  _render({phase}) {
    let styles = this._renderStyles();
    let toolbar = this._renderToolbar(phase);
    let stages = this._createDisplayStages(phase);
    return html`
      ${styles}
      <app-header-layout>
        <app-header slot="header" fixed condenses effects="waterfall">
          ${toolbar}
        </app-header>
        <div class="content">
          <div class="stage-list">
            <div class="stages">
              <mk-stage-list stages="${stages}"></mk-stage-list>
            </div>
          </div>
        </div>
      </app-header-layout>
    `;
  }
}

customElements.define('mk-phase', MkPhase);
