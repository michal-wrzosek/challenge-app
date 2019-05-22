export type Subscription = {
  unsubscribe: () => void;
};

export type Subscriber<T> = (value: T) => any;

export class Subject<T> {
  counter: number = 0;
  value: T = null as any;
  subscribers: { [key: string]: Subscriber<T> } = {};
  constructor(value: T) {
    this.value = value;
  }

  next = (nextValue: T) => {
    this.value = nextValue;
    Object.values(this.subscribers).forEach((subscriber: Subscriber<T>) =>
      subscriber(nextValue)
    );
  };

  subscribe = (fn: Subscriber<T>): Subscription => {
    const index = `${this.counter++}`;
    this.subscribers[index] = fn;
    return {
      unsubscribe: () => {
        delete this.subscribers[index];
      },
    };
  };

  destroy = () => {
    this.value = null as any;
  };

  getValue = () => this.value;
}
