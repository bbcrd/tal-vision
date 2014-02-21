/**
 * @fileOverview Requirejs module containing the on-screen keyboard widget.
 *
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

require.def('lancaster-vision/appui/widgets/inputtext',
  [
    'antie/widgets/label',
    'antie/events/event'
  ],
  function(Label, Event) {

    return Label.extend({
      /**
       * @constructor
       * @ignore
       */
      init: function(id, text, options) {
        this._options = options || {};
        this._initialText = (text === undefined ? "" : text);
        this._super(id, text);

        this.addClass('input-text');

        if (options.placeholder) {
          this.addClass('placeholder');
          this.addClass('placeholder-active');
        }
      },

      setText: function setText(text){
        if (text === '' && this._options.placeholder) {
          text = this._initialText;
          this.addClass('placeholder-active');
          this.bubbleEvent(new Event('empty'));
        }
        else if (this._options.placeholder && this.hasClass('placeholder-active')) {
          this.removeClass('placeholder-active');
          this.bubbleEvent(new Event('not-empty'));
        }

        this._super(text);
      }
    });
  }
);