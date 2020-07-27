import {MonoTypeOperatorFunction, Observable, Operator, Subscriber, TeardownLogic} from 'rxjs';

export function catchErrorIf<T>(predicate: () => boolean, callback: (err: any) => void): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.lift(new CatchIfOperator(predicate, callback));
}

class CatchIfOperator<T> implements Operator<T, T> {

  constructor(private readonly predicate: () => boolean,
              private readonly callback: (err: any) => void) {
  }

  call(subscriber: Subscriber<T>, source: any): TeardownLogic {
    return source.subscribe(new CatchIfSubscriber(subscriber, this.predicate, this.callback));
  }

}

class CatchIfSubscriber<T> extends Subscriber<T> {

  // tslint:disable-next-line:variable-name
  private readonly _predicate: () => boolean;

  // tslint:disable-next-line:variable-name
  private readonly _callback: (err: any) => void;

  constructor(destination: Subscriber<T>, predicate: () => boolean, callback: (err: any) => void) {
    super(destination);
    this._predicate = predicate;
    this._callback = callback;
  }

  protected _error(err: any) {
    try {
      if (this._predicate.call(this)) {
        this._callback.call(this, err);
      }
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.destination.error(err);
  }

}

