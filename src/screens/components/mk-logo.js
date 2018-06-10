import {html} from '@polymer/lit-element';
import MkDrawerItem from './mk-drawer-item';

class MkLogo extends MkDrawerItem {
  _render({icon, text, minimized, active}) {
    const styles = html`
            <style include="shared-styles">
            :host {
                height: 64px;
                display: flex;
                align-items: center;
                overflow: hidden;
                background-color: grey;
            }

            :host([drawer-minimized]) {
                height: 48px;
            }
        </style>`;

    return html`
            ${styles}
            <paper-icon-item class="${active ? 'active' : ''}">
                <div class="icon">
                    <img src="${icon}" alt="logo" width="36" height="36"/>
                </div>
                <div class="text">
                    ${text}
                </div>
            </paper-icon-item>`;
  }
}

customElements.define('mk-logo', MkLogo);
