import * as Immutable from 'immutable'
import { memoize } from 'lodash'
import { Atom } from './atom'
import { ValueError } from '../exceptions'

export interface INotifiable<T> {
  notify(sub_name: string, old_val: T, new_val: T): void
}

interface IStateFunction<T> {
  (state: T, ...args: any[]): T
}

interface ISubscriptionFunction<T> {
  (state: T, ...args: any[]): any
}

export interface IStore<T> {
  subscribe(caller: INotifiable<T>, sub_name: string, ...args: any[]);
  dispatch(event: string, ...args: any[]);
  reg_event(event_name: string, fn: IStateFunction<T>);
  reg_sub(sub_name: string, fn: IStateFunction<T>)
}

export class GlobalStore<T> implements IStore<T> {
  /**
   * One true source of state for the app
   */
  protected one_true_atom: Atom<T>

  /**
   * Table of event names to functions that will transform the state when
   * that event is dispatched
   */
  private dispatch_table: Map<string, IStateFunction<T>>

  /**
   * Table of subscription names to functions that generate the value for
   * that subscription
   */
  private subscription_table: Map<string, IStateFunction<T>>

  /**
   * Table of subscription names to another table of INotifiables mapped to
   * the arguments that they pass to the subscription function
   */
  private subscribers: Map<string, Map<INotifiable<T>, any[]>>;

  constructor(initial_state: T) {
    this.one_true_atom = new Atom(initial_state)
    this.dispatch_table = new Map()
    this.subscription_table = new Map()
    this.subscribers = new Map()
    this.one_true_atom.addWatcher('update_subscribers',
                                  this.notify_subscribers.bind(this))
  }


  /**
   * Subscribes the given INotifiable to the subscription given by val and
   * passes the given ...args to the subscription fn
   */
  public subscribe(caller: INotifiable<T>, sub_name: string, ...args: any[]) {
    let subs = this.subscribers.get(sub_name)
    if(subs === undefined) {
      subs = new Map()
      this.subscribers.set(sub_name, subs)
    }
    subs.set(caller, args)

    return this.currentSubscriptionValue(sub_name, ...args)
  }

  /**
   * Dispatches the given event with the given args
   */
  public dispatch(event: string, ...args: any[]) {
    let fn = this.dispatch_table.get(event)
    if(!fn) {
      throw new ValueError(`invalid event to dispatch: ${event}`)
    }
    this.one_true_atom.swap(fn, ...args)
  }

  /**
   * Registers the given function to be used when the given event is
   * dispatched for generating the new state value. Silently overrides
   * any other function that was set for the subscription. This function
   * must be PURE otherwise it will not behave correctly
   */
  public reg_event(event_name: string, fn: IStateFunction<T>) {
    this.dispatch_table.set(event_name, fn)
  }

  /**
   * Registers the given function to be used for the generation of the
   * value for the subscription. Silently overrides any other function
   * that was set for the subscription. This function must be PURE
   * otherwise it will not behave correctly
   */
  public reg_sub(sub_name: string, fn: ISubscriptionFunction<T>) {
    this.subscription_table.set(sub_name, memoize(fn))
  }

  private currentSubscriptionValue(sub_name: string, ...args: any[]) {
    let sub_fn = this.subscription_table.get(sub_name)
    if(sub_fn === undefined) {
      throw new ValueError(`No subscription function set for ${sub_name}`)
    }
    else {
      return sub_fn(this.one_true_atom.deref(), ...args)
    }
  }
  /**
   * Notifies all subscribers whenever the value for a subscription changes
   */
  private notify_subscribers(event_name: string, old_val: T, new_val, T): void {
    for(let {0: sub_name, 1: sub_fn} of this.subscription_table) {
      let subscribers = this.subscribers.get(sub_name)
      // If no subscription function is set or no subscribers
      // are set for the subscription, simply return
      if(subscribers === undefined) {
        return;
      }

      let new_sub_val = sub_fn(new_val)
      let old_sub_val = sub_fn(old_val)

      if(!Immutable.is(new_sub_val, old_sub_val)) {
        for(let {0: notifiable} of subscribers) {
          notifiable.notify(sub_name, old_sub_val, new_sub_val)
        }
      }
    }
  }
}
