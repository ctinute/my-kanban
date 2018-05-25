/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {html, LitElement} from '@polymer/lit-element';
import './mk-tabs-overlay.js';

class MkTabs extends LitElement {
    static get properties() {
        return {
            /**
             * The index of the selected element.
             */
            selectedIndex: Number,
        };
    }

    _render() {
        return html`
    <style>
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #container {
        position: relative;
      }
    </style>
    <div id="container">
      <shop-tabs-overlay target="${this.children[this.selectedIndex]}"></shop-tabs-overlay>
      <slot></slot>
    </div>`;
    }
}

customElements.define('shop-tabs', MkTabs);
