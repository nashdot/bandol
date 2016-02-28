export const keys = Object.keys;

export function blank() {
  return Object.create(null);
}

export function forOwn(object, func) {
  Object.keys(object).forEach(key => {
    func(object[key], key);
  });
}
