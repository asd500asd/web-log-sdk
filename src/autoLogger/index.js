import _ from 'lodash';
import axios from 'axios';

import bom from '../common/bom';
import event from '../common/eventUtil';
import getDomPath from '../utils/getDomPath';
import sliceText from '../utils/sliceText';
import defaultOption from './option';
import getEvent from '../common/getEvent';
import getBoundingClientRect from '../utils/getBoundingClientRect';

const {
  doc,
  ref,
  title,
  loc,
} = bom;

class AutoLogger {

  constructor(option) {
    this.option = _.assign(this.defaultOption, option);
    this._init();
  }

  get defaultOption() {
    return defaultOption;
  }

  _autoClickCollection = () => {
    event.on(doc.body, 'click', this._autoClickHandle);
  }

  _autoClickHandle = (e) => {
    try {
      const { targetElement, event } = getEvent(e);
      const nodeName = targetElement.nodeName && targetElement.nodeName.toLocaleLowerCase() || '';
      const text = targetElement.innerText || targetElement.value;
      const domPath = getDomPath(targetElement) || '';
      const rect = getBoundingClientRect(targetElement);
      const documentElement = document.documentElement || document.body.parentNode;
      const scrollX = (documentElement && typeof documentElement.scrollLeft == 'number' ? documentElement : document.body).scrollLeft;
      const scrollY = (documentElement && typeof documentElement.scrollTop == 'number' ? documentElement : document.body).scrollTop;
      const pageX = event.pageX || event.clientX + scrollX;
      const pageY = event.pageY || event.clientY + scrollY;

      const eventData = {
        // event type
        et: 'click',
        // event desc
        ed: 'auto_click',
        text: sliceText(text),
        nodeName,
        domPath,
        offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
        offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
        pageX,
        pageY,
        scrollX,
        scrollY,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      const logData = this.buildLogData(eventData);
      this.log(logData);
    } catch (err) {
      console.log(err);
    }

  }
  _init() {
    try {
      if (this.option.autoClick) {
        this._autoClickCollection();
      }
    } catch (err) {
      console.log(err);
    }
  }

  buildLogData = (eventData) => {
    eventData
    return {
      eventData: {
        ...eventData,
        rUrl: ref,
        docTitle: title,
        cUrl: loc.href,
        t: new Date().getTime(),
      },
      optParams: this.option.optParams,
      platform: this.option.platform,
      appID: this.option.appID,
      sdk: this.option.sdk,
    };
  }

  log = (logData) => {
    const { debug, postMsgOpts } = this.option;
    if (debug) {
      console.log(logData);
    }
    postMsgOpts.forEach((opt) => {
      const { targetWindow, targetOrigin } = opt;
      targetWindow.postMessage({ logData: JSON.stringify(logData) }, targetOrigin)
    });

    const logUrl = this.option.logUrl;
    logUrl && axios.post({
      url: logUrl,
      data,
    });
  }
}

export default AutoLogger;