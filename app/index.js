import Bundle from './Bundle.js';
import validateKeys from './utils/validateKeys.js';

const ALLOWED_KEYS = [
  'entry'
];

function bandol(options) {
  if (!options || !options.entry) {
    return Promise.reject(new Error('You must supply options.entry to bandol'));
  }

  const error = validateKeys(options, ALLOWED_KEYS);

  if (error) {
    return Promise.reject(error);
  }

  const bundle = new Bundle(options);

  return bundle.build().then(() => {
    return {
      generate: opts => {
        return bundle.generate(opts);
      }
    };
  });
}

export default bandol;
