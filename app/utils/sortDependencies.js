
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

  for (const item of ctx.items.values()) {
    if (ctx.visited.indexOf(item.id) !== -1) {
      continue;
    }
    topologicalSort(item, ctx);
  }
  return ctx.stack;
}
