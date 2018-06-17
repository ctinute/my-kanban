/* eslint-disable no-console */
import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button';
import '@polymer/paper-card';
import './components/mk-stage-list';
import './components/mk-dialog-create-stage';
import {Actions} from '../actions';


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

  _createStage(stage) {
    stage.phaseId = this.phase.id;
    store.dispatch(Actions.stage.add(stage));
  }
  _openCreateStageDialog() {
    let dialog = html`
      <mk-dialog-create-stage
        on-submit="${(e) => console.log('cancelled')}"
        on-cancel="${()=>console.log('cancelled')}"></mk-dialog-create-stage>`;
    store.dispatch(Actions.app.showDialog(dialog, null));
  }

  _renderStyles() {
    return html`
      <style>
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        .content {
            width: 100%;
            height: 100%;
        }
        app-header-layout > .content {
          padding: 16px 0;
          height: 100%;
        }
        
        .horizontal-list {
          width: auto;
          white-space: nowrap;
          overflow-y: hidden;
          overflow-x: scroll;
        }
        .horizontal-list > .list-item {
          display: inline-block;
          vertical-align: top;
        }
        
        mk-stage-list {
            height: 100%;
            width: auto;
        }
        
        #new-stage {
          display: inline-block;
          vertical-align: top;
          width: 256px;
          margin: 0 16px;
          padding: 8px;
          font-size: 1.2em;
          line-height: 2.5em;
          height: 2.5em;
          text-align: center;
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

  _render({phase}) {
    let styles = this._renderStyles();
    let toolbar = this._renderToolbar(phase);
    let stages = this._createDisplayStages(phase);
    return html`
      ${styles}
      <app-header slot="header" fixed condenses effects="waterfall">
        ${toolbar}
      </app-header>
      <div class="content horizontal-list">
        <mk-stage-list 
          class="list-item"
          stages="${stages}"
          on-move-stage="${(e) => console.log(e)}"
          on-move-task="${(e) => console.log(e)}">
        </mk-stage-list>
        <div class="list-item">
          <paper-button id="new-stage" flat on-click="${this._openCreateStageDialog}">New stage</paper-button>
        </div>
      </div>
    `;
  }

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
}

customElements.define('mk-phase', MkPhase);
