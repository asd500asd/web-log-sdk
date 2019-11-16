import _ from 'lodash';
import axios from 'axios';

import bom from '../utils/bom';
import event from '../utils/event';
import getDomPath from '../utils/getDomPath';
import sliceText from '../utils/sliceText';
import defaultOption from './option';
import getEvent from '../utils/getEvent';


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
      const { targetElement } = getEvent(e);
      const nodeName = targetElement.nodeName && targetElement.nodeName.toLocaleLowerCase() || '';
      const text = targetElement.innerText || targetElement.value;
      const domPath = getDomPath(targetElement) || '';

      const eventData = {
        // event type
        et: 'click',
        // event desc
        ed: 'auto_click',
        text: sliceText(text),
        nodeName,
        domPath,
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
    if (this.option.debug) {
      console.log(logData);
    }

    const logUrl = this.option.logUrl;
    logUrl && axios.post({
      url: logUrl,
      data,
    });
  }
}

export default AutoLogger;