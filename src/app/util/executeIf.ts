import {MonoTypeOperatorFunction, Observable, Operator, Subscriber, TeardownLogic} from 'rxjs';

export function executeIf<T>(predicate: () => boolean, block: (value: T) => void): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.lift(new ExecuteIfOperator(predicate, block));
}

class ExecuteIfOperator<T> implements Operator<T, T> {

  constructor(private readonly predicate: () => boolean,
              private readonly block: (value: T) => void) {
  }

  call(subscriber: Subscriber<T>, source: any): TeardownLogic {
    return source.subscribe(new ExecuteIfSubscriber(subscriber, this.predicate, this.block));
  }

}

class ExecuteIfSubscriber<T> extends Subscriber<T> {

  // tslint:disable-next-line:variable-name
  private readonly _predicate: () => boolean;

  // tslint:disable-next-line:variable-name
  private readonly _block: (err: T) => void;

  constructor(destination: Subscriber<T>, predicate: () => boolean, block: (err: T) => void) {
    super(destination);
    this._predicate = predicate;
    this._block = block;
  }

  protected _next(value: T) {
    try {
      if (this._predicate.call(this)) {
        this._block.call(this, value);
      }
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.destination.next(value);
  }

}
