import type { Reporter, FullConfig, Suite, FullResult, TestError } from '@playwright/test/reporter';
export interface RotaReporterOptions { outputFolder?: string; title?: string; }
declare class RotaReporter implements Reporter {
  constructor(options?: RotaReporterOptions);
  printsToStdio(): boolean;
  onBegin(config: FullConfig, suite: Suite): void;
  onError(error: TestError): void;
  onEnd(result: FullResult): void | { status: 'failed' };
}
export default RotaReporter;
