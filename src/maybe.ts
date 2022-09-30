const Nothing = Symbol("Nothing");

export class Maybe<T> {
  constructor(private value: T | typeof Nothing) {}

  static just<T>(value: T): Maybe<T> {
    if (value === null || value === undefined) {
      return Maybe.nothing<T>();
    }

    return new Maybe<T>(value);
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(Nothing);
  }

  static from<T>(value: T): Maybe<T> {
    return Maybe.just(value);
  }

  public map<U>(f: (value: T) => U): Maybe<U> {
    if (this.value === Nothing) return Maybe.nothing<U>();

    return Maybe.just<U>(f(this.value));
  }

  public match<U>(
    { just, nothing }: { just: (value: T) => U; nothing: () => U },
  ): U {
    if (this.value === Nothing) return nothing();

    return just(this.value);
  }

  public flatMap<U>(f: (value: T) => Maybe<U>): Maybe<U> {
    if (this.value === Nothing) return Maybe.nothing<U>();

    return f(this.value);
  }
}
