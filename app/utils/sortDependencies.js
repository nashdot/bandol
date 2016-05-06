
function topologicalSort(item, ctx) {
  ctx.visited.push(item.id);
  for (let i = 0; i < item.dependencies.length; i++) {
    const dependency = ctx.items.get(item.dependencies[i]);
    if (ctx.visited.indexOf(dependency.id) !== -1) {
      continue;
    }
    topologicalSort(dependency, ctx);
  }
  ctx.stack.push(item);
}

export default function sortDependencies(items) {
  const ctx = {
    stack: [],
    visited: [],
    items: items
  };

  const iterator = ctx.items.values();
  while (true) {
    const current = iterator.next();
    if (current.done || ctx.visited.indexOf(current.value.id) !== -1) {
      break;
    }
    topologicalSort(current.value, ctx);
  }

  return ctx.stack;
}
