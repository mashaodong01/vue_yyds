import { isObject, hasOwnProperty, isEqual } from "../shared/utils";
import { useReactive } from "../reactive";
import { update } from "../render";
import { statePool } from "../compiler/state";

const get = createGetter();
const set = createSetter();

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    if (isObject(res)) {
      return useReactive(res);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const isKeyExist = hasOwnProperty(target, key),
      oldValue = target[key],
      res = Reflect.set(target, key, value, receiver);

    if (!isKeyExist) {
    } else if (!isEqual(value, oldValue)) {
      update(statePool, key, value);
    }
    return res;
  };
}

const mutableHandler = {
  get,
  set,
};

export { mutableHandler };
