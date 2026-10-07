const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { render } = require('./render.cjs');
const clean = value => String(value ?? '').replace(/\u001b\[[0-9;]*m/g, '');
const error = e => ({ message: clean(e.message || e.value), stack: clean(e.stack), snippet: clean(e.snippet) });
class RotaReporter {
  constructor(options = {}) { this.options = options; this.globalErrors = []; }
  printsToStdio() { return false; }
  onBegin(config, suite) { this.config = config; this.suite = suite; }
  onError(e) { this.globalErrors.push(error(e)); }
  onEnd(result) {
    try {
      const folder = path.resolve(this.options.outputFolder || 'rota-report');
      // Preserve existing files; unique artifact names keep earlier report references valid.
      fs.mkdirSync(path.join(folder, 'assets'), { recursive: true });
      const warnings = [];
      const attachment = a => {
        const name = clean(a.name);
        try {
          if (!a.path && a.body == null) return { name, contentType: a.contentType, missing: true };
          const ext = a.path ? path.extname(a.path).replace(/[^.a-zA-Z0-9]/g, '') : ({'image/png':'.png','image/jpeg':'.jpg','video/webm':'.webm','application/zip':'.zip','application/json':'.json','text/plain':'.txt'}[a.contentType] || '.bin');
          const file = crypto.randomUUID() + ext;
          if (a.path) fs.copyFileSync(a.path, path.join(folder, 'assets', file));
          else fs.writeFileSync(path.join(folder, 'assets', file), a.body);
          return { name, contentType: a.contentType, url: 'assets/' + file };
        } catch { warnings.push('Ek kopyalanamadı: ' + name); return { name, contentType: a.contentType, missing: true }; }
      };
      const step = s => ({ title: clean(s.title), category: s.category, duration: s.duration, error: s.error ? error(s.error) : null, steps: (s.steps || []).map(step) });
      const tests = this.suite.allTests().map(t => {
        const project = t.parent.project();
        const file = path.relative(this.config.rootDir, t.location.file).split(path.sep).join('/');
        const titles = t.titlePath().slice(3);
        const key = JSON.stringify([file, t.location.line, t.location.column, titles]);
        return { id: t.id, key, title: titles.join(' › ') || t.title, file, line: t.location.line, project: project?.name || 'default', tags: t.tags || [], expectedStatus: t.expectedStatus, outcome: t.outcome(), annotations: t.annotations || [], attempts: t.results.map(r => ({ retry: r.retry, status: r.status, duration: r.duration, errors: r.errors.map(error), steps: r.steps.map(step), attachments: r.attachments.map(attachment), stdout: r.stdout.map(clean).join(''), stderr: r.stderr.map(clean).join('') })) };
      });
      const data = { title: this.options.title || 'Test Raporu', status: result.status, startTime: result.startTime?.toISOString() || new Date().toISOString(), duration: result.duration, tests, globalErrors: this.globalErrors, warnings };
      fs.writeFileSync(path.join(folder, 'report.json'), JSON.stringify(data, null, 2));
      fs.writeFileSync(path.join(folder, 'index.html'), render(data));
    } catch (e) {
      console.error('Rota reporter raporu oluşturamadı:', e.message);
      return { status: 'failed' };
    }
  }
}
module.exports = RotaReporter;
