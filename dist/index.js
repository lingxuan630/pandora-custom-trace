'use strict';

const pandora = require('dorapan');

class Report extends pandora.Patcher {
  constructor() {
    super();

    this.traceManager = this.getTraceManager();

    if (!this.traceManager) {
      console.error('customTrace:', 'can not get traceManager');
    }

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

  report(spanName = 'custom', content) {
    const tracer = this.traceManager.getCurrentTracer();

    const span = this.createSpan(tracer, spanName);

    span.addTags(content);
  }
}

module.exports = new Report();
