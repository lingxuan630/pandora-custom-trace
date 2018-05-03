/**
 * a custom trace module for pandora
 * By lingxuan630
 * email: lingxuan630@gmail.com
 */

const pandora = require('dorapan');

class Report extends pandora.Patcher {
  constructor() {
    super();

    this.traceManager = this.getTraceManager();

    this.report = this.report.bind(this);
  }

  createSpan(tracer, spanName) {
    let span = null;

    const currentSpan = tracer.getCurrentSpan();

    if (!currentSpan) {
      console.info('No current span, skip trace');
      return span;
    }

    return this._createSpan(tracer, currentSpan, spanName);
  }

  _createSpan(tracer, currentSpan, spanName) {
    const traceId = tracer.traceId;

    return tracer.startSpan(spanName, {
      childOf: currentSpan,
      traceId
    });
  }

  report(spanName = 'custom', tags) {
    if (typeof spanName === 'object') {
      tags = spanName;
      spanName = 'custom';
    }

    if (!this.traceManager) {
      console.error('customTrace:', 'can not get traceManager');
      return false;
    }

    const tracer = this.traceManager.getCurrentTracer();

    if (!tracer) {
      console.info('customTrace:', 'current tracer is empty');
      return false;
    }
    const span = this.createSpan(tracer, spanName);

    if (tags && typeof tags === 'object') {
      span.addTags(tags);
    }

    let reportTags;
    try {
      reportTags = JSON.stringify(tags);
    } catch (e) {
      reportTags = tags;
    }

    console.log(spanName, reportTags);
  }
}

module.exports = new Report();
