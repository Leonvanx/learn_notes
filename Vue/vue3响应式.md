Vue's reactivity core, particularly in Vue 3, utilizes a system based on Dep (Dependency) and Effect to achieve automatic dependency tracking and updates.

- **Effect (ReactiveEffect)**: 

  An effect is a function that performs a side effect and needs to be re-run when its dependencies change. Examples of effects include component render functions, computed properties, and watchers (e.g., `watchEffect`, `watch`). These effects are automatically tracked by Vue. When an effect is actively running, any reactive properties accessed within it are registered as its dependencies.

- **Dep (Dependency Set)**: 

  A Dep is essentially a `Set` that stores all the effects that depend on a particular reactive property. When a reactive property's value changes, its associated Dep is "triggered," and all the effects within that Dep are re-executed.

How it works:

- **Tracking Dependencies**: 

  When an effect (e.g., a component's render function) is executed, Vue internally sets a "current active effect."

- **Property Access (Get)**: 

  When a reactive property is accessed within this active effect, Vue's reactivity system (using ES Proxies for `reactive` objects or getters for `ref`s) intercepts the "get" operation. It then adds the currently active effect to the `Dep` associated with that specific property.

- **Property Mutation (Set)**: 

  When a reactive property's value is changed, Vue intercepts the "set" operation. It then retrieves the `Dep` associated with that property and iterates through all the effects stored within it, re-running each one.

This mechanism ensures that only the relevant parts of the application are re-rendered or re-computed when reactive data changes, leading to efficient and performant updates.
