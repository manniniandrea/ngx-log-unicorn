import {Observer} from 'rxjs';
import {NgxLogUnicornMessage} from '../interfaces/ngx-log-unicorn-message.interface';
import {NgxLogUnicornService} from '../ngx-log-unicorn.service';

export abstract class NgxLogUnicornConsumer implements Observer<NgxLogUnicornMessage> {
  protected _logger: NgxLogUnicornService = null;


  complete(): void {
  }

  error(err: any): void {
  }

  next(value: NgxLogUnicornMessage): void {
  }

  protected abstract _loggerBound(): void;

  public bindToLogger(logger: NgxLogUnicornService) {
    this._logger = logger;
    this._loggerBound();
  }

}
