import Bundle from './Bundle.js';
import validateKeys from './utils/validateKeys.js';
import sortDependencies from './utils/sortDependencies.js';

const ALLOWED_KEYS = [
  'entry'
];

async function bandol(options) {
  if (!options || !options.entry) {
    return Promise.reject(new Error('You must supply options.entry to bandol'));
  }

  const error = validateKeys(options, ALLOWED_KEYS);

  if (error) {
    return Promise.reject(error);
  }

  const bundle = new Bundle(options);
  await bundle.build();

  return {
    bundle: bundle,
    generate: opts => {
      return bundle.generate(opts);
    },
    printResources: () => {
      console.log('Resources:');
      for (const r of bundle.resources.values()) {
        console.log(r.id);
        console.log(`=> ${JSON.stringify(r.dependencies)}`);
      }
    },
    printSorted: () => {
      console.log('Sorted:');
      const sorted = sortDependencies(bundle.resources);

      for (let i = 0; i < sorted.length; i++) {
        console.log(sorted[i].id);
      }
    }
  };
}

export default bandol;
