/* ============================================================
   INTERVIEW PREP — Saurabh Dhull | Custom Software Engineer
   Categories: Core JS, React, Node, DB, Auth, Real-Time,
   Performance, Testing, TypeScript, System Design, DevOps,
   Coding, Output Prediction, HR
   ============================================================ */

const questions = [
  // ─── CORE JAVASCRIPT ────────────────────────────────────────
  {
    category: "Core JavaScript",
    q: "var vs let vs const — explain differences",
    tags: ["popular"],
    a: `// Scope: var is function-scoped; let/const are block-scoped
// Hoisting: var is hoisted (initialized as undefined); let/const are hoisted but NOT initialized (TDZ)
// Re-declaration: var allows re-declaration; let/const do not
// Re-assignment: const cannot be reassigned (but object properties can mutate)

console.log(x); // undefined (hoisted)
var x = 5;

console.log(y); // ReferenceError: Cannot access before initialization (TDZ)
let y = 5;

const z = { name: "John" };
z.name = "Doe"; // Allowed — const only prevents reassignment, not mutation`
  },
  {
    category: "Core JavaScript",
    q: "== vs === — how do they differ?",
    tags: ["popular"],
    a: `// ==  — loose equality (coerces types before comparing)
// === — strict equality (no type coercion)

console.log(5 == "5");   // true  (string "5" coerced to number 5)
console.log(5 === "5");  // false (number !== string)

console.log(null == undefined);  // true  (special rule)
console.log(null === undefined); // false

console.log(false == 0);  // true
console.log(false === 0); // false

// Rule: always prefer === unless you explicitly need coercion`
  },
  {
    category: "Core JavaScript",
    q: "What is hoisting?",
    tags: ["popular"],
    a: `// Hoisting = JS moves declarations to the top of their scope during compilation
// var declarations are hoisted and initialized as undefined
// let/const are hoisted but NOT initialized (Temporal Dead Zone)

console.log(a); // undefined (hoisted but not yet assigned)
var a = 10;

foo(); // "Hello" — function declarations are fully hoisted
function foo() { console.log("Hello"); }

bar(); // TypeError: bar is not a function — var bar is hoisted as undefined
var bar = function() { console.log("Hi"); };`
  },
  {
    category: "Core JavaScript",
    q: "Temporal Dead Zone (TDZ) — what is it?",
    tags: ["advanced"],
    a: `// TDZ = the time between entering scope and variable declaration
// During TDZ, accessing let/const throws ReferenceError

{
  // TDZ starts here for x
  console.log(x); // ReferenceError
  let x = 10;     // TDZ ends here
}

// typeof operator is also unsafe in TDZ
typeof y; // ReferenceError (let y) — unlike var where typeof is safe`
  },
  {
    category: "Core JavaScript",
    q: "What are closures? Give an example.",
    tags: ["popular"],
    a: `// Closure = function "remembers" its lexical scope even when executed outside it
// Inner function has access to outer function's variables

function outer(x) {
  return function inner(y) {
    return x + y;  // inner remembers x even after outer has returned
  };
}

const add5 = outer(5);
console.log(add5(3)); // 8

// Practical uses: data privacy, currying, memoization, event handlers`
  },
  {
    category: "Core JavaScript",
    q: "How does the 'this' keyword work?",
    tags: ["popular"],
    a: `// 'this' depends on execution context (how a function is called):

// 1. Global context → window (or global in Node)
console.log(this); // window

// 2. Regular function → window (strict: undefined)
function show() { console.log(this); }
show(); // window (undefined in strict mode)

// 3. Object method → the object itself
const obj = { name: "JS", show() { console.log(this.name); } };
obj.show(); // "JS"

// 4. Arrow function → inherits 'this' from parent scope (lexical this)

// 5. Constructor function (new) → the new instance

// 6. call/apply/bind → explicitly set 'this'`
  },
  {
    category: "Core JavaScript",
    q: "call, apply, bind — differences?",
    tags: ["popular"],
    a: `// All three explicitly set 'this'. Differences:
// call  — args passed individually, invoked immediately
// apply — args passed as array, invoked immediately
// bind  — returns new function with bound 'this', NOT invoked immediately

function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

const person = { name: "John" };

console.log(greet.call(person, "Hello", "!"));   // "Hello, John!"
console.log(greet.apply(person, ["Hi", "!!"]));  // "Hi, John!!"

const bound = greet.bind(person, "Hey");
console.log(bound("?")); // "Hey, John?"`
  },
  {
    category: "Core JavaScript",
    q: "Arrow functions vs regular functions",
    tags: ["popular"],
    a: `// 1. this binding: arrow inherits from parent (lexical); regular has own 'this'
// 2. arguments: arrow has NO arguments object; regular does
// 3. constructor: arrow cannot be used with 'new'
// 4. hoisting: regular function declarations are hoisted; arrow are NOT
// 5. syntax: arrow is more concise

const obj = {
  name: "Test",
  regular: function() { console.log(this.name); },
  arrow: () => console.log(this.name)  // 'this' is window, NOT obj
};

obj.regular(); // "Test"
obj.arrow();   // undefined (window.name is undefined)`
  },
  {
    category: "Core JavaScript",
    q: "Prototypal Inheritance — how does it work?",
    tags: ["advanced"],
    a: `// Every JS object has an internal [[Prototype]] (accessed via __proto__ or Object.getPrototypeOf)
// Properties/methods are looked up along the prototype chain until found or null

const parent = { greet() { return "Hello"; } };
const child = { name: "Child" };

child.__proto__ = parent;
console.log(child.greet()); // "Hello" — inherited from parent
console.log(child.name);    // "Child" — own property

function Animal(type) { this.type = type; }
Animal.prototype.speak = function() { return "I'm a " + this.type; };

const dog = new Animal("dog");
console.log(dog.speak()); // "I'm a dog"
console.log(dog instanceof Animal); // true`
  },
  {
    category: "Core JavaScript",
    q: "Event Loop — explain microtasks vs macrotasks",
    tags: ["popular", "advanced"],
    a: `// JS is single-threaded. Event Loop manages async execution:
// Priority: Synchronous > Microtasks > Macrotasks

// Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver
// Macrotasks: setTimeout, setInterval, I/O, UI rendering

console.log(1);                    // sync
setTimeout(() => console.log(2));  // macrotask
Promise.resolve().then(() => console.log(3)); // microtask
console.log(4);                    // sync

// Output: 1, 4, 3, 2
// Why: sync runs first, microtask queue empties before next macrotask`
  },
  {
    category: "Core JavaScript",
    q: "Promises vs Async/Await",
    tags: ["popular"],
    a: `// Promise: object representing eventual completion/failure of async operation
// async/await: syntactic sugar over Promises — makes async code read like sync

// Promise chain:
fetch("/api/user")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/await (same thing):
async function getUser() {
  try {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// await can only be used inside async function`
  },
  {
    category: "Core JavaScript",
    q: "Event Delegation — what is it?",
    tags: ["popular"],
    a: `// Instead of attaching event listeners to many child elements,
// attach ONE listener to a parent and use event.target to identify which child fired it
// Benefit: works for dynamically added elements, better performance

document.querySelector("#list").addEventListener("click", function(e) {
  if (e.target.matches(".item")) {
    console.log("Item clicked:", e.target.textContent);
  }
});

// Event phases: capturing (top→down) → at target → bubbling (bottom→up)`
  },
  {
    category: "Core JavaScript",
    q: "Debouncing vs Throttling",
    tags: ["popular"],
    a: `// Debounce: delay execution until user STOPS triggering for N ms
//           Used for: search input, auto-save, resize handler
// Throttle: execute at most ONCE every N ms (no matter how many triggers)
//           Used for: scroll handler, mousemove, game loop

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`
  },
  {
    category: "Core JavaScript",
    q: "Shallow vs Deep Copy — how to make each?",
    tags: ["popular"],
    a: `// Shallow copy: copies top-level properties; nested objects still referenced
const original = { a: 1, b: { c: 2 } };

const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);
shallow1.b.c = 99;
console.log(original.b.c); // 99 — mutation affects original!

// Deep copy:
const deep1 = JSON.parse(JSON.stringify(original));      // loses functions/undefined
const deep2 = structuredClone(original);                  // modern API — handles most types`
  },
  {
    category: "Core JavaScript",
    q: "Spread (...) vs Rest (...)?",
    tags: ["popular"],
    a: `// Spread: expands an array/object into individual elements
// Rest: collects multiple elements into a single array/object

// Spread:
const arr = [1, 2, 3];
console.log(Math.max(...arr)); // 3
const merged = [...arr, 4, 5]; // [1,2,3,4,5]

// Rest:
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4));  // 10

const [first, ...rest] = [1, 2, 3, 4];
console.log(first, rest); // 1, [2,3,4]`
  },
  {
    category: "Core JavaScript",
    q: "map, filter, reduce — explain with examples",
    tags: ["popular"],
    a: `// map     → transforms each element, returns new array (same length)
// filter  → keeps elements that pass a test, returns subset
// reduce  → accumulates values into a single result

const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);           // [2, 4, 6, 8, 10]
const evens   = nums.filter(n => n % 2 === 0);  // [2, 4]
const sum     = nums.reduce((acc, n) => acc + n, 0); // 15

// Chaining:
const result = nums.filter(n => n > 2).map(n => n * 10).reduce((a, b) => a + b, 0);
console.log(result); // 120`
  },
  {
    category: "Core JavaScript",
    q: "null vs undefined — differences?",
    tags: ["popular"],
    a: `// undefined: variable declared but not assigned / property doesn't exist
// null: intentional absence of any object value (assigned explicitly)

let a;
console.log(a); // undefined

const obj = {};
console.log(obj.x); // undefined

const b = null;
console.log(b); // null

console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (historical bug)
console.log(null == undefined);  // true
console.log(null === undefined); // false`
  },
  {
    category: "Core JavaScript",
    q: "IIFE — what is it and why use it?",
    tags: ["popular"],
    a: `// IIFE = Immediately Invoked Function Expression
// Runs as soon as it's defined. Creates a new scope — avoids polluting global scope

(function() {
  var privateVar = "I am private";
  console.log(privateVar);
})();
// privateVar is NOT accessible outside

// Modern alternative: just use { } block scope with let/const`
  },
  {
    category: "Core JavaScript",
    q: "Currying — what is it? Give an example.",
    tags: ["advanced"],
    a: `// Currying = transforming a function that takes multiple arguments
// into a sequence of nested functions each taking a single argument

function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

const curry = (a) => (b) => (c) => a + b + c;

// Practical: create partially-applied functions for reuse
const add5 = curry(5);
console.log(add5(3)(2)); // 10`
  },
  {
    category: "Core JavaScript",
    q: "Memoization — what is it? Implement it.",
    tags: ["advanced"],
    a: `// Memoization = caching function results to avoid recomputation

function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    cache[key] = fn.apply(this, args);
    return cache[key];
  };
}

// Usage:
const slowFib = (n) => n <= 1 ? n : slowFib(n - 1) + slowFib(n - 2);
const fastFib = memoize(slowFib);
console.time("fastFib(40)");
console.log(fastFib(40)); // 102334155 — milliseconds vs seconds`
  },
  {
    category: "Core JavaScript",
    q: "Generator Functions — what and why?",
    tags: ["advanced"],
    a: `// Generator functions can pause execution (yield) and resume later
// Returns an iterator with .next()

function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

// Use cases: infinite sequences, custom iteration, redux-saga`
  },
  {
    category: "Core JavaScript",
    q: "Set, Map, WeakSet, WeakMap — differences",
    tags: ["advanced"],
    a: `// Set: unique values
// Map: key-value pairs (keys can be ANY type)
// WeakSet: only objects, held weakly (garbage-collected)
// WeakMap: keys must be objects, held weakly, no .size/.keys/.entries

const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [1, 2, 3]

const map = new Map();
map.set("name", "John");
console.log(map.get("name")); // "John"

// WeakMap — keys are GC'd when no other refs exist
const cache = new WeakMap();
function process(obj) {
  if (!cache.has(obj)) cache.set(obj, expensiveComputation(obj));
  return cache.get(obj);
}`
  },
  {
    category: "Core JavaScript",
    q: "typeof vs instanceof",
    tags: ["popular"],
    a: `// typeof → returns string of primitive type
// instanceof → checks if object is instance of a constructor (walks prototype chain)

console.log(typeof "hello");   // "string"
console.log(typeof null);      // "object" — known JS bug
console.log(typeof []);        // "object"

console.log([] instanceof Array);    // true
console.log([] instanceof Object);   // true (Array extends Object)
console.log(Array.isArray([])); // true — reliable check`
  },
  {
    category: "Core JavaScript",
    q: "try/catch/finally — error handling patterns",
    tags: ["popular"],
    a: `// try: wrap code that might throw
// catch: handle the error
// finally: ALWAYS runs (whether error or not)

class ValidationError extends Error {
  constructor(message) { super(message); this.name = "ValidationError"; }
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) console.log("Validation:", err.message);
  else throw err; // rethrow unknown
} finally {
  console.log("Always runs — cleanup here");
}`
  },
  {
    category: "Core JavaScript",
    q: "JSON methods — parse & stringify",
    tags: ["popular"],
    a: `// JSON.parse(str)     → JSON string → JS object
// JSON.stringify(obj) → JS object → JSON string

const jsonStr = '{"name":"John","age":30}';
const obj = JSON.parse(jsonStr);
console.log(obj.name); // "John"

// Limitations: loses functions, undefined, Symbol, BigInt, circular refs`
  },

  // ─── REACT.JS ──────────────────────────────────────────────
  {
    category: "React.js",
    q: "What is the Virtual DOM and how does it work?",
    tags: ["popular", "react"],
    a: `// Virtual DOM = lightweight JS representation of the real DOM
// Why: real DOM manipulation is slow; Virtual DOM batches updates

// How it works:
// 1. Render → creates Virtual DOM tree
// 2. Diffing (reconciliation) → compares prev VDOM with new VDOM
// 3. Patching → computes minimal set of DOM operations
// 4. Commit → applies changes to real DOM

// React uses Fiber architecture:
// - Incremental rendering (splits work into chunks)
// - Ability to pause/abort work (concurrent mode)
// - Prioritizes high-priority updates (user input > data fetch)`
  },
  {
    category: "React.js",
    q: "React Hooks — explain useState, useEffect, useRef, useCallback, useMemo, useReducer",
    tags: ["popular", "react"],
    a: `// useState — state in functional components
const [count, setCount] = useState(0);

// useEffect — side effects (API calls, subscriptions, DOM manipulation)
useEffect(() => {
  fetchData();
  return () => cleanup(); // cleanup on unmount
}, [deps]); // runs when deps change, empty [] = mount only

// useRef — mutable ref that persists across renders (no re-render)
const inputRef = useRef(null);
inputRef.current.focus();

// useCallback — memoizes a function reference (prevents child re-renders)
const handleClick = useCallback(() => doSomething(a), [a]);

// useMemo — memoizes a computed value (expensive calculations)
const sorted = useMemo(() => arr.sort(), [arr]);

// useReducer — complex state logic (like Redux-lite)
const [state, dispatch] = useReducer(reducer, initialState);`
  },
  {
    category: "React.js",
    q: "Class lifecycle methods vs useEffect",
    tags: ["react"],
    a: `// Mounting:
// componentDidMount → useEffect(() => {}, [])

// Updating:
// componentDidUpdate(prevProps) → useEffect(() => {}, [prop])

// Unmounting:
// componentWillUnmount → useEffect(() => { return () => {}; }, [])

// getDerivedStateFromProps → rarely needed; usually lift state up

// shouldComponentUpdate → React.memo (functional) / PureComponent (class)

// Example:
useEffect(() => {
  console.log("Mounted + Updated when count changes");
  return () => console.log("Cleanup runs before unmount or re-run");
}, [count]);`
  },
  {
    category: "React.js",
    q: "Keys in React — why are they important?",
    tags: ["popular", "react"],
    a: `// Keys help React identify which items changed, added, or removed
// They should be STABLE, UNIQUE, and PREDICTABLE

// ❌ Bad — using index as key (when list can change):
{todos.map((todo, index) => <Todo key={index} todo={todo} />)}
// Index-based keys cause bugs with: reordering, deletion, filtering

// ✅ Good — using unique id:
{todos.map(todo => <Todo key={todo.id} todo={todo} />)}

// ✅ Stable non-id fallback (when no id exists):
{todos.map((todo, i) => <Todo key={todo.text + i} todo={todo} />)}`
  },
  {
    category: "React.js",
    q: "React.memo, useMemo, useCallback — when to use each?",
    tags: ["react"],
    a: `// React.memo → wraps a component to skip re-render if props haven't changed
const Heavy = React.memo(function Heavy({ data }) {
  return <div>{/* expensive render */}</div>;
});

// useMemo → memoizes a VALUE to avoid expensive computations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);

// useCallback → memoizes a FUNCTION reference (passing to child)
const onDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id));
}, []);

// When to use:
// - React.memo: pure components that re-render often with same props
// - useMemo: expensive calculations (sorting, filtering, math)
// - useCallback: callbacks passed to memoized children
// Rule: don't optimize prematurely — measure first!`
  },
  {
    category: "React.js",
    q: "Controlled vs Uncontrolled components",
    tags: ["popular", "react"],
    a: `// Controlled: React manages the form state (single source of truth)
const Controlled = () => {
  const [value, setValue] = useState("");
  return <input value={value} onChange={e => setValue(e.target.value)} />;
};

// Uncontrolled: DOM manages its own state (ref-based)
const Uncontrolled = () => {
  const ref = useRef();
  const handleSubmit = () => console.log(ref.current.value);
  return <input ref={ref} defaultValue="hello" />;
};

// Preference: CONTROLLED for most cases
// Uncontrolled: file inputs, simple forms, performance-critical`
  },
  {
    category: "React.js",
    q: "What is the Context API and when would you use it vs Redux?",
    tags: ["popular", "react"],
    a: `// Context API: built-in React solution for prop drilling
// Use for: theme, locale, auth user, simple global state

const ThemeContext = createContext("light");
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}

// Context vs Redux:
// Context: simpler, no extra deps, fine for low-frequency updates
// Redux: middleware (thunk/saga), devtools, normalized state,
//        prevents re-render issues with useSelector batching
// For complex apps: Redux Toolkit > bare Context`
  },
  {
    category: "React.js",
    q: "Higher-Order Component (HOC) vs Render Props vs Hooks",
    tags: ["react", "advanced"],
    a: `// HOC — function that wraps a component to add behavior
function withAuth(Component) {
  return function Authenticated(props) {
    const user = useAuth();
    return user ? <Component {...props} user={user} /> : <Login />;
  };
}

// Render Props — component that takes a function as its child
<MouseTracker render={(pos) => <p>{pos.x}, {pos.y}</p>} />

// Custom Hooks (modern preferred approach):
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}
// Usage: const { x, y } = useMousePosition();
// Hooks > HOC > Render Props for most cases`
  },
  {
    category: "React.js",
    q: "What is Reconciliation in React?",
    tags: ["react", "advanced"],
    a: `// Reconciliation = algorithm that diffs two Virtual DOM trees
// Algorithm:
// 1. Different element types? → tear down and rebuild entire subtree
// 2. Same type? → update attributes, recurse on children
// 3. Keys? → use them to match children across renders

// Fiber architecture (React 16+) breaks work into units:
// - Each fiber = a unit of work (corresponds to a component)
// - Can pause, abort, or prioritize work
// - Enables Concurrent Mode and Suspense

// Without keys:
// <div> → <span> → FULL unmount + remount

// With keys:
// [<li key="a">, <li key="b">] → [<li key="b">, <li key="a">]
// React reorders nodes instead of destroying/creating`
  },
  {
    category: "React.js",
    q: "How do you optimize React performance?",
    tags: ["popular", "react"],
    a: `// 1. React.memo() — skip re-render if props unchanged
// 2. useMemo + useCallback — memoize values and functions
// 3. Code splitting — React.lazy + Suspense
// 4. Virtualization — react-window / react-virtualized for long lists
// 5. Debounced inputs — prevent excessive re-renders on keystroke
// 6. Avoid anonymous functions in JSX (breaks memoization)
// 7. Use proper keys in lists
// 8. Lazy load images — loading="lazy"
// 9. Bundle analysis — find large deps with webpack-bundle-analyzer
// 10. useTransition (React 18) — mark non-urgent updates

const HeavyList = React.lazy(() => import("./HeavyList"));
<Suspense fallback={<Spinner />}>
  <HeavyList />
</Suspense>`
  },
  {
    category: "React.js",
    q: "React 18 features — concurrent rendering, transitions, Suspense",
    tags: ["react", "advanced"],
    a: `// React 18 key features:

// 1. Automatic Batching — multiple setState in same handler = one render
setCount(c => c + 1);
setFlag(f => !f);
// React 18 batches these automatically (even in setTimeout/promises)

// 2. Transitions — mark non-urgent updates
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setSearchQuery(input); // this update can be interrupted
});

// 3. Suspense on server — SSR streaming
// 4. useId() — generates unique IDs for accessibility
// 5. useDeferredValue — defer re-rendering for slow values
// 6. New Root API:
const root = createRoot(document.getElementById("root"));
root.render(<App />); // vs ReactDOM.render()`
  },

  // ─── NODE.JS / EXPRESS ──────────────────────────────────────
  {
    category: "Node.js / Express",
    q: "How does the Node.js Event Loop work?",
    tags: ["popular", "node"],
    a: `// Node.js is single-threaded, non-blocking I/O using Event Loop
// Libuv provides the Event Loop implementation

// Phases in order (each phase has a FIFO callback queue):
// 1. timers → setTimeout, setInterval callbacks
// 2. pending callbacks → I/O callbacks deferred to next iteration
// 3. idle, prepare → internal use
// 4. poll → retrieve new I/O events (blocking)
// 5. check → setImmediate callbacks
// 6. close callbacks → close event callbacks

// Between each phase: microtask queues are drained:
// - process.nextTick queue (highest priority)
// - Promise callbacks

console.log("start");
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
console.log("end");
// Output: start, end, nextTick, promise, timeout, immediate`
  },
  {
    category: "Node.js / Express",
    q: "Express.js middleware — how does it work?",
    tags: ["popular", "node"],
    a: `// Middleware = functions that have access to req, res, and next
// They can: execute code, modify req/res, end request, call next middleware

// Application-level middleware:
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // pass control to next middleware
});

// Route-level middleware:
app.get("/api/users", authMiddleware, (req, res) => {
  res.json(users);
});

// Error-handling middleware (4 args — must have exactly (err, req, res, next)):
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Common middleware: express.json(), cors(), morgan, helmet, passport`
  },
  {
    category: "Node.js / Express",
    q: "Streams in Node.js — what are they and types?",
    tags: ["node", "advanced"],
    a: `// Streams = process data chunk by chunk instead of loading entire thing
// Perfect for: large files, network responses, video streaming

// 4 types:
// 1. Readable → source of data (fs.createReadStream)
// 2. Writable → destination (fs.createWriteStream)
// 3. Duplex → both readable and writable (net.Socket)
// 4. Transform → modifies data while reading/writing (zlib.Gzip)

// Read file using stream (memory efficient):
const readStream = fs.createReadStream("bigfile.txt", { encoding: "utf8" });
readStream.on("data", chunk => console.log("Chunk:", chunk.length));
readStream.on("end", () => console.log("Done"));

// Pipe — automatic flow control:
readStream.pipe(zlib.createGzip()).pipe(fs.createWriteStream("file.gz"));

// Backpressure: when consumer is slower than producer
// .pipe() handles it automatically via drain events`
  },
  {
    category: "Node.js / Express",
    q: "How do you handle errors in Node.js/Express?",
    tags: ["popular", "node"],
    a: `// 1. Synchronous: try/catch
// 2. Async: catch errors in promises / async functions
// 3. Express async handler wrapper:

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/data", asyncHandler(async (req, res) => {
  const data = await db.find();
  res.json(data);
}));

// 4. Global error handler (must be last middleware):
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(\`[\${status}] \${message}\`);
  res.status(status).json({ error: message });
});

// 5. Uncaught exceptions / unhandled rejections:
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1); // best practice: crash and restart
});`
  },
  {
    category: "Node.js / Express",
    q: "What is the Cluster module in Node.js?",
    tags: ["node", "advanced"],
    a: `// Cluster allows a Node.js app to spawn multiple processes (workers)
// to utilize all CPU cores. Each worker handles requests independently.

const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);
  // Fork workers
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // auto-restart
  });
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Hello from worker " + process.pid);
  }).listen(8000);
}

// Alternative: PM2 process manager (handles clustering + auto-restart)
// pm2 start app.js -i max`
  },
  {
    category: "Node.js / Express",
    q: "What is the difference between process.nextTick() and setImmediate()?",
    tags: ["advanced", "node"],
    a: `// nextTick()  → runs BEFORE the next macrotask (at end of current phase)
// setImmediate() → runs in the CHECK phase (after macrotasks)

// Priority: nextTick > Promise > timers > setImmediate

console.log("1");
setTimeout(() => console.log("2"), 0);
setImmediate(() => console.log("3"));
process.nextTick(() => console.log("4"));
console.log("5");

// Output: 1, 5, 4, 2, 3
// Note: setTimeout vs setImmediate order may vary in poll phase`
  },

  // ─── TYPESCRIPT ────────────────────────────────────────────
  {
    category: "TypeScript",
    q: "TypeScript vs JavaScript — key differences?",
    tags: ["popular"],
    a: `// TypeScript = JavaScript + static typing
// TS compiles to JS (transpilation)

// Key benefits:
// 1. Static type checking at compile time
// 2. Better IDE support (autocomplete, refactoring)
// 3. Interfaces, generics, enums, decorators
// 4. Catches bugs BEFORE runtime
// 5. Self-documenting code

// JS → TS:
let name = "John";     // JS
let name: string = "John"; // TS

// Type inference — TS often knows the type without explicit annotation
let age = 25; // TS infers number

// any vs unknown:
let a: any = "hello";      // disables type checking
let b: unknown = "hello";  // must narrow type before use`
  },
  {
    category: "TypeScript",
    q: "Interfaces vs Types — when to use which?",
    tags: ["popular"],
    a: `// INTERFACE — describes shape of an object (can be extended)
interface User {
  name: string;
  age: number;
}
interface Admin extends User {
  role: "admin" | "superadmin";
}

// TYPE — union, intersection, primitives, tuple, mapped types
type Status = "active" | "inactive";
type Point = { x: number; y: number };
type NamedPoint = Point & { name: string };

// Key differences:
// - Interface can be merged (declaration merging)
// - Type alias cannot be extended (but can use intersection &)
// - Use interface for OOP-style, type for complex unions

// Rule of thumb:
// library/API types → interface (extensible)
// unions/tuples/mapped → type`
  },
  {
    category: "TypeScript",
    q: "Generics in TypeScript — explain with example",
    tags: ["popular", "advanced"],
    a: `// Generics = create reusable components that work with ANY type

// Simple generic function:
function identity<T>(arg: T): T {
  return arg;
}
const result = identity<string>("hello"); // type = string
const inferred = identity(42);            // type = number

// Generic interface:
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
const userResponse: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "OK"
};

// Generic constraint — T must have a .length property:
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
getLength("hello"); // 5
getLength([1,2,3]); // 3`
  },
  {
    category: "TypeScript",
    q: "Utility Types — Partial, Required, Pick, Omit, Record",
    tags: ["popular", "advanced"],
    a: `// Partial<T> → all properties become optional
interface User { id: number; name: string; email: string; }
const updateUser: Partial<User> = { name: "New Name" };

// Required<T> → all properties become required
const fullUser: Required<Partial<User>> = { id: 1, name: "a", email: "a@b" };

// Pick<T, K> → pick specific keys
const userPreview: Pick<User, "id" | "name"> = { id: 1, name: "John" };

// Omit<T, K> → omit specific keys
const userWithoutId: Omit<User, "id"> = { name: "John", email: "j@b.com" };

// Record<K, T> → object with keys K and values T
const roles: Record<string, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read"]
};

// Readonly<T> → makes all properties readonly
// Exclude<T, U> / Extract<T, U> → union filtering
// NonNullable<T> → removes null/undefined
// ReturnType<T> → extract return type of a function`
  },

  // ─── DATABASE & CACHING ────────────────────────────────────
  {
    category: "Database & Caching",
    q: "MongoDB vs MySQL — when to use which?",
    tags: ["popular"],
    a: `// MONGODB (NoSQL — document database):
// - Schema-less (flexible documents)
// - JSON-like documents (BSON)
// - Horizontal scaling (sharding) built-in
// - Great for: prototyping, unstructured data, real-time analytics
// - Use when: data shape changes often, need fast iteration,
//   hierarchical data (nested documents)

// MYSQL (SQL — relational database):
// - Strict schema with relationships
// - ACID compliant (transactions)
// - Powerful JOINs and complex queries
// - Great for: financial data, complex reporting, strict consistency
// - Use when: relationships between entities, need referential integrity

// Rule of thumb: use SQL unless you have a reason not to.
// Many modern apps use both — SQL for core + MongoDB for flexible data.`
  },
  {
    category: "Database & Caching",
    q: "Indexing in databases — what and why?",
    tags: ["popular"],
    a: `// Index = data structure (B-tree, hash) that speeds up data retrieval
// Trade-off: faster reads, slower writes (must update index on insert/update)

// Without index: FULL TABLE SCAN (slow for millions of rows)
// With index: B-tree lookup → O(log n)

// MongoDB:
db.users.createIndex({ email: 1 }); // ascending index
db.users.createIndex({ name: "text", bio: "text" }); // text search

// MySQL:
CREATE INDEX idx_email ON users(email);
CREATE UNIQUE INDEX idx_email ON users(email); // unique constraint

// Compound index — covers multiple fields:
db.orders.createIndex({ userId: 1, createdAt: -1 });
// Order matters: put high-selectivity fields first

// Covered query — all needed fields are in the index itself`
  },
  {
    category: "Database & Caching",
    q: "Redis — common use cases and data structures",
    tags: ["popular"],
    a: `// Redis = in-memory key-value store (sub-millisecond latency)
// Used for: caching, session store, rate limiting, pub/sub, queues

// Common data structures:
SET key "value"                     // String
HSET user:1 name "John"             // Hash
LPUSH queue task1                   // List
SADD tags "javascript"              // Set (unique, unordered)
ZADD leaderboard 100 "player1"      // Sorted Set (unique, ordered by score)
PUBLISH channel message             // Pub/Sub

// EXPIRE — auto-delete keys (TTL):
SET session:abc "data" EX 3600      // expires in 1 hour

// Caching pattern:
async function getUser(id) {
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);

  const user = await db.findUser(id);
  await redis.setEx(\`user:\${id}\`, 3600, JSON.stringify(user));
  return user;
}

// My experience: 50% response time reduction with Redis caching`
  },
  {
    category: "Database & Caching",
    q: "SQL vs NoSQL — when would you pick each?",
    tags: ["popular"],
    a: `// PICK SQL (PostgreSQL/MySQL) when:
// - Complex relationships and JOINs
// - Strict data integrity (ACID)
// - Structured data that doesn't change shape often
// - Complex reporting/analytics queries
// - Transactions across multiple records

// PICK NoSQL (MongoDB/DynamoDB/Firebase) when:
// - Rapid prototyping / flexible schema
// - Hierarchical or nested data
// - Horizontal scaling is critical
// - High write throughput
// - Eventually consistent reads are acceptable

// Many production systems are polyglot:
// - SQL for orders/payments (strict consistency)
// - MongoDB/Firebase for content/catalog (flexible)
// - Redis for caching/sessions (speed)`
  },

  // ─── AUTHENTICATION & SECURITY ─────────────────────────────
  {
    category: "Authentication & Security",
    q: "JWT vs Session-based Auth — differences?",
    tags: ["popular"],
    a: `// JWT (JSON Web Token):
// - Stateless: token carries user data, no server-side storage
// - Format: header.payload.signature (base64-encoded)
// - Scale: easy to scale horizontally (no shared session store)
// - Cons: cannot revoke individual tokens (must wait for expiry)

// JWT flow:
// Login → server creates {user, role, exp} signed with SECRET → client stores
// Every request → client sends Authorization: Bearer <token>
// Server verifies signature, extracts user info

// Session-based:
// - Stateful: server stores session in memory/DB/Redis
// - Session ID in cookie (httpOnly, secure, sameSite)
// - Easy to revoke (delete session from store)
// - Requires shared session store for multi-server

// My preference: JWT for API/mobile, Sessions for server-rendered web
// Best of both: JWT short-lived (15 min) + refresh token (7 days)`
  },
  {
    category: "Authentication & Security",
    q: "Common web security vulnerabilities — XSS, CSRF, SQL Injection",
    tags: ["popular"],
    a: `// 1. XSS (Cross-Site Scripting):
// Attacker injects malicious scripts into web pages
// Prevention: sanitize user input, use CSP headers, escape output
// React handles this by default (JSX escapes values)

// 2. CSRF (Cross-Site Request Forgery):
// Attacker tricks user into making unwanted requests
// Prevention: CSRF tokens, SameSite cookies, double-submit cookies
// SameSite=Strict or Lax prevents CSRF in modern browsers

// 3. SQL Injection:
// Attacker injects SQL via form inputs
// Prevention: parameterized queries (NEVER string concatenation)
// ✅ db.query("SELECT * FROM users WHERE id = $1", [userId])
// ❌ db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

// Additional measures:
// - HTTPS everywhere
// - helmet middleware (sets security headers)
// - Rate limiting (brute force protection)
// - Input validation (whitelist, not blacklist)`
  },
  {
    category: "Authentication & Security",
    q: "OAuth 2.0 flow — how does it work?",
    tags: ["advanced"],
    a: `// OAuth 2.0 = delegated authorization (login with Google/GitHub)

// Roles: Resource Owner (user), Client (app), Auth Server (Google), Resource Server (API)

// Authorization Code Flow (most common, most secure):
// 1. User clicks "Login with Google"
// 2. App redirects to Google: ?client_id=...&redirect_uri=...&scope=...&response_type=code
// 3. User logs in, grants permission
// 4. Google redirects back to app with ?code=AUTH_CODE
// 5. Backend exchanges code for tokens: POST /token with client_secret
// 6. Google returns: { access_token, refresh_token, id_token }
// 7. App uses access_token to call Google APIs on behalf of the user

// Implicit Flow (deprecated) — PKCE flow now recommended for SPAs
// JWT as access token (self-contained, no DB lookup needed)`
  },

  // ─── REAL-TIME ─────────────────────────────────────────────
  {
    category: "Real-Time",
    q: "WebSockets vs Server-Sent Events (SSE) vs Polling",
    tags: ["popular"],
    a: `// POLLING (old way):
// Client asks "any updates?" every N seconds
// ✅ Simple, works everywhere
// ❌ Wasted requests, latency = poll interval

// SSE (Server-Sent Events) — one-directional (server → client):
// ✅ Built-in browser support (EventSource API)
// ✅ Auto-reconnect, simple, lightweight
// ❌ No client→server via same connection
// ❌ Limited to ~6 connections per browser
// Use for: notifications, live feeds, stock tickers

// WEBSOCKETS — full-duplex (bi-directional):
// ✅ Real-time both ways
// ✅ Efficient (persistent connection, minimal overhead)
// ❌ Complex (need to handle reconnection, heartbeats)
// Use for: chat, live collaboration, gaming, real-time dashboards

// My experience: WebSockets via Socket.io for chat platform
// (auto-reconnect, rooms, fallback to long-polling)`
  },
  {
    category: "Real-Time",
    q: "Socket.io — key features and why use it?",
    tags: ["popular"],
    a: `// Socket.io = WebSocket library with fallbacks and added features

// Key features:
// 1. Auto-reconnection — handles disconnects gracefully
// 2. Rooms — broadcast to subsets of connected clients
// 3. Namespaces — multiplex multiple channels on one connection
// 4. Fallback — uses long-polling if WebSocket not available
// 5. Heartbeats — detects dead connections

// Server:
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log(\`Client connected: \${socket.id}\`);

  socket.join("room-1"); // join a room
  io.to("room-1").emit("message", data); // broadcast to room

  socket.on("disconnect", () => console.log("Client left"));
});

// Client:
const socket = io("http://localhost:3000");
socket.emit("join", { room: "room-1" });
socket.on("message", (data) => console.log(data));

// My project: built enterprise real-time chat using Socket.io +
// Firebase Realtime DB for message persistence`
  },

  // ─── STATE MANAGEMENT ──────────────────────────────────────
  {
    category: "State Management",
    q: "Redux — core concepts and when to use it",
    tags: ["popular"],
    a: `// Redux core concepts:
// STORE — holds the entire app state (single source of truth)
// ACTION — plain object describing "what happened"
// REDUCER — pure function (prevState, action) → newState
// DISPATCH — sends action to reducer
// SELECTOR — reads/filters data from store

// Basic example:
// Action:
{ type: "INCREMENT", payload: 1 }

// Reducer:
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT": return state + action.payload;
    default: return state;
  }
}

// Store:
const store = createStore(counter);
store.dispatch({ type: "INCREMENT", payload: 1 });
console.log(store.getState()); // 1

// When to use Redux:
// - Complex state shared across many components
// - State needs to be persisted + rehydrated
// - Middleware for side effects (thunks/sagas)
// - Time-travel debugging
// Otherwise: useState + useContext is simpler

// Modern: Redux Toolkit (RTK) — less boilerplate, built-in thunks`
  },
  {
    category: "State Management",
    q: "Redux Toolkit vs Context API — comparison",
    tags: ["popular"],
    a: `// Context API:
// ✅ Built-in, no extra deps
// ✅ Simple for small apps
// ❌ Re-renders all consumers even if unrelated state changes
// ❌ No devtools, no middleware

// Redux Toolkit:
// ✅ Predictable state updates (reducers)
// ✅ Devtools (time-travel, action tracing)
// ✅ Middleware (side effects: API calls, logging)
// ✅ createSlice, createAsyncThunk reduce boilerplate
// ✅ Optimized re-renders (useSelector tracks specific slices)

// RTK example:
const userSlice = createSlice({
  name: "user",
  initialState: { name: "", loading: false },
  reducers: {
    setUser: (state, action) => { state.name = action.payload; }
  }
});

// When to use each:
// Context: theme, locale, simple auth state (low frequency)
// Redux: complex forms, real-time data, normalized cache,
//        multi-user collaboration features`
  },

  // ─── PERFORMANCE OPTIMIZATION ──────────────────────────────
  {
    category: "Performance Optimization",
    q: "Core Web Vitals — LCP, FID/INP, CLS explained",
    tags: ["popular"],
    a: `// Core Web Vitals = Google metrics for user experience

// LCP (Largest Contentful Paint) — loading performance
// When does the main content load?
// Target: < 2.5s
// Fix: optimize images, preload key resources, SSR, CDN

// FID (First Input Delay) → INP (Interaction to Next Paint)
// How responsive is the page to user input?
// Target: < 100ms (INP)
// Fix: code splitting, avoid long tasks, use web workers, debounce

// CLS (Cumulative Layout Shift) — visual stability
// Does the page layout shift unexpectedly?
// Target: < 0.1
// Fix: set explicit width/height on images, avoid inserting content
// above existing content, use fonts with size-adjust`
  },
  {
    category: "Performance Optimization",
    q: "Techniques to improve frontend performance",
    tags: ["popular"],
    a: `// 1. CODE SPLITTING — load only what's needed
React.lazy(() => import("./HeavyComponent"));
// Webpack splits into separate chunks

// 2. LAZY LOADING — images, below-fold content
<img loading="lazy" src="..." />
IntersectionObserver for custom lazy loading

// 3. MEMOIZATION — avoid unnecessary re-renders
React.memo, useMemo, useCallback

// 4. BUNDLE OPTIMIZATION — tree shaking, minification
// Analyze: webpack-bundle-analyzer

// 5. CACHING:
// Browser cache (Cache-Control headers)
// Service Worker cache (workbox)
// API response cache (Redis, CDN)

// 6. IMAGE OPTIMIZATION:
// WebP/AVIF format, responsive images (srcset), CDN

// 7. VIRTUALIZATION for long lists:
// react-window, react-virtualized — only render visible items

// 8. AVOID RENDER-BLOCKING resources:
// async/defer on scripts, inline critical CSS`
  },
  {
    category: "Performance Optimization",
    q: "How does caching work at different layers?",
    tags: ["popular"],
    a: `// Caching layers (from browser → server):

// 1. Browser Cache (Service Worker / HTTP Cache):
// Cache-Control: max-age=86400, public
// ETag / Last-Modified headers for validation

// 2. CDN Cache:
// Cloudflare, Akamai, AWS CloudFront
// Edge locations serve cached assets close to user
// Cache-Control: s-maxage=86400

// 3. Application Cache (In-memory / Redis):
// Store computed results, session data, DB query results
// Invalidate on update (cache-aside pattern)

// 4. Database Cache:
// Query cache, buffer pool, connection pooling

// Cache-Aside Pattern (most common):
async function getData(key) {
  let data = await cache.get(key);
  if (!data) {
    data = await db.query("SELECT ...");
    await cache.set(key, data, { EX: 3600 });
  }
  return data;
}

// My experience: Reduced backend response by 50% using Redis caching`
  },

  // ─── VERSION CONTROL & DEVOPS ──────────────────────────────
  {
    category: "Version Control & DevOps",
    q: "Git branching strategies — Git Flow vs GitHub Flow",
    tags: ["popular"],
    a: `// GIT FLOW (older, complex):
// main → production-ready
// develop → integration branch
// feature/* → new features (branched from develop)
// release/* → preparing release (branched from develop → merges to main + develop)
// hotfix/* → urgent fixes (branched from main → merges to main + develop)
// ✅ Good for: scheduled releases, complex projects
// ❌ Overhead: many branches, heavy ceremony

// GITHUB FLOW (simpler, modern):
// main → always deployable
// feature branches → branch off main, PR to main when done
// ✅ Simple, continuous deployment friendly
// ✅ Perfect for: SaaS, small teams, CI/CD

// TRUNK-BASED DEVELOPMENT (CI/CD ideal):
// Short-lived feature branches (hours, not days)
// Frequent merges to main (multiple times/day)
// Feature flags to hide incomplete features

// For Accenture: likely Git Flow or GitHub Flow depending on project`
  },
  {
    category: "Version Control & DevOps",
    q: "CI/CD Pipeline — what stages should it have?",
    tags: ["popular"],
    a: `// CI/CD = Continuous Integration / Continuous Deployment

// Pipeline stages:
// 1. CODE → developer pushes to branch
// 2. BUILD → compile/transpile dependencies
// 3. LINT → code quality checks (ESLint, Prettier)
// 4. TEST → unit tests, integration tests
// 5. BUILD → production build
// 6. DEPLOY → deploy to staging
// 7. E2E → end-to-end tests on staging
// 8. DEPLOY → deploy to production (if all checks pass)

// GitHub Actions example:
// .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

// Key principles:
// - Fail fast (fail at first error)
// - Immutable artifacts (build once, deploy many)
// - Environment parity (dev ≈ staging ≈ prod)`
  },

  // ─── SYSTEM DESIGN ────────────────────────────────────────
  {
    category: "System Design",
    q: "How would you design a scalable chat application?",
    tags: ["popular", "system-design"],
    a: `// Requirements: 1-on-1 chat, group chat, presence, push notifications

// Architecture:
// 1. Load Balancer (NGINX / HAProxy) → distributes connections
// 2. WebSocket Servers (Node.js + Socket.io) — horizontal scale
// 3. Redis Pub/Sub — broadcast messages across WebSocket servers
// 4. Message Queue (RabbitMQ / Kafka) — async message processing
// 5. Database:
//    - MongoDB/Firebase for messages (high write throughput)
//    - PostgreSQL for user data (relationships)
// 6. Cache (Redis):
//    - Online presence (key: userId, value: socketId, TTL)
//    - Recent messages (last 50 per chat)

// Message flow:
// User A → WS Server 1 → Redis Pub/Sub → WS Server 2 → User B
// WS Server 1 → Message Queue → DB write

// My experience: Built multi-tenant real-time chat with React + Firebase
// + Service Workers for push notifications. 1000+ active users.`
  },
  {
    category: "System Design",
    q: "Microservices vs Monolith — when to choose each?",
    tags: ["popular", "system-design"],
    a: `// MONOLITH — single deployable unit
// ✅ Simpler development, deployment, debugging
// ✅ Single database, no network overhead
// ✅ Easier transactions (ACID)
// ❌ Scales vertically only (bigger server)
// ❌ Long-term: codebase becomes hard to maintain

// MICROSERVICES — independently deployable services
// ✅ Independent scaling, deployment, tech stacks
// ✅ Fault isolation (one service failure ≠ all fail)
// ✅ Team autonomy (each team owns a service)
// ❌ Complex: network calls, distributed transactions, service discovery
// ❌ Debugging across services is hard

// When to choose:
// START with monolith! Split only when:
// - The codebase is too large for a team to manage
// - Different parts need to scale independently
// - Different teams need to work independently
// - One part needs a different tech stack`
  },

  // ─── TESTING ───────────────────────────────────────────────
  {
    category: "Testing",
    q: "Unit vs Integration vs E2E testing — differences",
    tags: ["popular"],
    a: `// UNIT TESTING — test individual functions/components in isolation
// Fast, runs on every commit, high coverage
// Tools: Jest, Vitest, Mocha
test("adds 1 + 2 = 3", () => {
  expect(add(1, 2)).toBe(3);
});

// INTEGRATION TESTING — test how modules work together
// Medium speed, tests API endpoints + DB interactions
// Tools: supertest (HTTP), React Testing Library
test("GET /api/users returns list", async () => {
  const res = await request(app).get("/api/users");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

// E2E TESTING — test user flows in a real browser
// Slow, few critical paths, expensive to maintain
// Tools: Cypress, Playwright, Selenium
cy.visit("/login");
cy.get("[data-test=email]").type("user@test.com");
cy.get("[data-test=password]").type("password");
cy.get("[data-test=submit]").click();
cy.url().should("include", "/dashboard");

// Testing Trophy (not pyramid):
// Most effort on Integration > Static analysis > Unit > E2E`
  },
  {
    category: "Testing",
    q: "React Testing Library — how do you test components?",
    tags: ["react"],
    a: `// RTL encourages testing user behavior, not implementation details

// Basic component test:
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("counter increments on click", async () => {
  render(<Counter />);
  const button = screen.getByRole("button", { name: /increment/i });

  await userEvent.click(button);
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});

// Async test:
test("loads user data", async () => {
  render(<UserProfile userId={1} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByText(/john/i)).toBeInTheDocument();
});

// Query priority:
// 1. getByRole (accessibility-first)
// 2. getByLabelText (form labels)
// 3. getByPlaceholderText
// 4. getByText
// 5. getByTestId (last resort)`
  },

  // ─── AGILE / SCRUM ─────────────────────────────────────────
  {
    category: "Agile / Scrum",
    q: "Scrum ceremonies and roles — explain briefly",
    tags: ["popular"],
    a: `// Roles:
// Product Owner — defines features, prioritizes backlog
// Scrum Master — coaches team, removes blockers
// Development Team — builds the product (cross-functional, self-organizing)

// Ceremonies:
// 1. SPRINT PLANNING — team commits to work for the sprint (2 weeks)
// 2. DAILY STANDUP — what I did, what I'll do, blockers (15 min)
// 3. SPRINT REVIEW — demo completed work to stakeholders
// 4. SPRINT RETROSPECTIVE — reflect on what went well/what to improve

// Artifacts:
// Product Backlog — prioritized list of features
// Sprint Backlog — items committed for current sprint
// Increment — potentially shippable product at end of sprint

// My experience: daily standups, 2-week sprints, JIRA for tracking`
  },

  // ─── CODING CHALLENGES ──────────────────────────────────────
  {
    category: "Coding Challenges",
    q: "Reverse a string",
    tags: ["popular", "accenture"],
    a: `function reverseStr(str) {
  return str.split("").reverse().join("");
}

// Manual loop:
function reverseManual(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
}

console.log(reverseStr("hello")); // "olleh"`
  },
  {
    category: "Coding Challenges",
    q: "Find duplicates in an array",
    tags: ["popular", "accenture"],
    a: `function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of arr) {
    if (seen.has(item)) duplicates.add(item);
    else seen.add(item);
  }
  return [...duplicates];
}

console.log(findDuplicates([1,2,3,2,4,3,5])); // [2, 3]`
  },
  {
    category: "Coding Challenges",
    q: "Flatten a nested array",
    tags: ["popular", "accenture"],
    a: `function flatten(arr) {
  return arr.reduce((acc, item) =>
    acc.concat(Array.isArray(item) ? flatten(item) : item), []
  );
}

console.log(flatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]

// Built-in:
[1, [2, [3]]].flat(Infinity)`
  },
  {
    category: "Coding Challenges",
    q: "Check if a string is a palindrome",
    tags: ["popular", "accenture"],
    a: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

// Two-pointer:
function isPalindrome2(str) {
  let l = 0, r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) return false;
    l++; r--;
  }
  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true`
  },
  {
    category: "Coding Challenges",
    q: "FizzBuzz",
    tags: ["popular", "accenture"],
    a: `function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
}

// One-liner:
const fb = (n) => Array.from({length: n}, (_, i) =>
  (++i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i
);`
  },
  {
    category: "Coding Challenges",
    q: "Find missing number in an array of 1..n",
    tags: ["popular", "accenture"],
    a: `function findMissing(arr) {
  const n = arr.length + 1;
  const expected = (n * (n + 1)) / 2;
  const actual = arr.reduce((a, b) => a + b, 0);
  return expected - actual;
}

console.log(findMissing([1, 2, 4, 5, 6])); // 3`
  },
  {
    category: "Coding Challenges",
    q: "Two Sum — find pair that sums to target",
    tags: ["popular", "accenture"],
    a: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
// O(n) time, O(n) space`
  },
  {
    category: "Coding Challenges",
    q: "Remove falsy values from an array",
    tags: ["accenture"],
    a: `function removeFalsy(arr) {
  return arr.filter(Boolean);
  // Removes: false, 0, "", null, undefined, NaN
}

console.log(removeFalsy([0, 1, false, 2, "", 3, null, undefined, NaN, 4]));
// [1, 2, 3, 4]`
  },
  {
    category: "Coding Challenges",
    q: "Deep clone an object (manual implementation)",
    tags: ["advanced"],
    a: `function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (seen.has(obj)) return seen.get(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  const copy = Array.isArray(obj) ? [] : {};
  seen.set(obj, copy);

  for (const key of Object.keys(obj)) {
    copy[key] = deepClone(obj[key], seen);
  }
  return copy;
}

// Modern: structuredClone(obj) — built-in`
  },
  {
    category: "Coding Challenges",
    q: "Implement Promise.all from scratch",
    tags: ["advanced"],
    a: `function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    const results = [];
    let completed = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(val => { results[i] = val; completed++;
          if (completed === promises.length) resolve(results); })
        .catch(reject);
    });
  });
}

myPromiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log);`
  },
  {
    category: "Coding Challenges",
    q: "Implement debounce function",
    tags: ["popular", "accenture"],
    a: `function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function(...args) {
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
    if (callNow) fn.apply(this, args);
  };
}`
  },
  {
    category: "Coding Challenges",
    q: "Anagram check — are two strings anagrams?",
    tags: ["accenture"],
    a: `function isAnagram(s1, s2) {
  const clean = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (clean(s1).length !== clean(s2).length) return false;

  const count = {};
  for (const ch of clean(s1)) count[ch] = (count[ch] || 0) + 1;
  for (const ch of clean(s2)) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false`
  },
  {
    category: "Coding Challenges",
    q: "Longest substring without repeating characters",
    tags: ["accenture", "advanced"],
    a: `function lengthOfLongestSubstring(s) {
  let maxLen = 0, left = 0;
  const seen = new Map();

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1; // move left past the duplicate
    }
    seen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // 1 ("b")`
  },
  {
    category: "Coding Challenges",
    q: "Group anagrams together",
    tags: ["accenture", "advanced"],
    a: `function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const sorted = str.split("").sort().join("");
    if (!map.has(sorted)) map.set(sorted, []);
    map.get(sorted).push(str);
  }

  return [...map.values()];
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]`
  },

  // ─── OUTPUT PREDICTION ──────────────────────────────────────
  {
    category: "Output Prediction",
    q: "console.log(0.1 + 0.2 === 0.3) — what prints?",
    tags: ["accenture", "popular"],
    a: `// Output: false
// IEEE 754 floating point: 0.1 + 0.2 = 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true — fix`
  },
  {
    category: "Output Prediction",
    q: "console.log(typeof NaN) — what prints?",
    tags: ["accenture", "popular"],
    a: `// Output: "number"
// NaN is a Number type (despite "Not-a-Number")
console.log(typeof NaN);     // "number"
console.log(NaN === NaN);    // false — NaN is not equal to itself
console.log(Number.isNaN(NaN)); // true — correct check`
  },
  {
    category: "Output Prediction",
    q: "console.log([] == ![]) — what prints?",
    tags: ["accenture", "popular"],
    a: `// Output: true
// Step coercion:
// ![] → false (array is truthy, negated → false)
// [] == false → "" == false → 0 == 0 → true
console.log([] == ![]);  // true
console.log([] === ![]); // false`
  },
  {
    category: "Output Prediction",
    q: "console.log(1 + '2' + '2') — what prints?",
    tags: ["accenture"],
    a: `// Output: "122"
// First + with string → concatenation
// 1 + "2" → "12"
// "12" + "2" → "122"
console.log(1 + "2" + "2"); // "122"`
  },
  {
    category: "Output Prediction",
    q: "console.log(1 + +'2' + '2') — what prints?",
    tags: ["accenture"],
    a: `// Output: "32"
// +'2' → 2 (unary plus → number)
// 1 + 2 → 3
// 3 + "2" → "32"
console.log(1 + +"2" + "2"); // "32"`
  },
  {
    category: "Output Prediction",
    q: "console.log(3 > 2 > 1) — what prints?",
    tags: ["accenture", "popular"],
    a: `// Output: false
// 3 > 2 → true
// true > 1 → 1 > 1 → false (true coerced to 1)
console.log(3 > 2 > 1); // false
// Correct: (3 > 2 && 2 > 1) → true`
  },
  {
    category: "Output Prediction",
    q: "console.log(typeof typeof 1) — what prints?",
    tags: ["accenture"],
    a: `// Output: "string"
// typeof 1 → "number"
// typeof "number" → "string"
console.log(typeof typeof 1); // "string"`
  },
  {
    category: "Output Prediction",
    q: "[1, 2, 3].map(parseInt) — what does this return?",
    tags: ["accenture", "popular"],
    a: `// Output: [1, NaN, NaN]
// map passes (element, index, array) to parseInt
// parseInt(1, 0) → 1   (radix 0 = default 10)
// parseInt(2, 1) → NaN  (radix 1 invalid)
// parseInt(3, 2) → NaN  (binary can't have 3)

// Fix:
console.log([1,2,3].map(num => parseInt(num))); // [1, 2, 3]
// or: .map(Number)`
  },
  {
    category: "Output Prediction",
    q: "Closure loop output? for(var i... setTimeout...)",
    tags: ["popular", "accenture"],
    a: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (all share same 'i')

// Fix 1: let (block scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// Fix 2: IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100); // 0, 1, 2
  })(i);
}`
  },
  {
    category: "Output Prediction",
    q: "console.log(1 && 2 || 0 && 3) — what prints?",
    tags: ["accenture"],
    a: `// && has higher precedence than ||
// 1 && 2 → 2
// 0 && 3 → 0 (short-circuit)
// 2 || 0 → 2 (short-circuit)
console.log(1 && 2 || 0 && 3); // 2`
  },
  {
    category: "Output Prediction",
    q: "console.log('5' - 3) and console.log('5' + 3) — what prints?",
    tags: ["accenture"],
    a: `console.log("5" - 3); // 2  (subtraction → numeric coercion)
console.log("5" + 3); // "53" (plus with string → concatenation)
console.log("5" * "2"); // 10 (multiplication → numeric coercion)
console.log("hello" - 1); // NaN`
  },
  {
    category: "Output Prediction",
    q: "What does 'use strict' do?",
    tags: ["accenture"],
    a: `// "use strict" enables stricter error checking:
// 1. Prevents accidental globals
// 2. 'this' in functions = undefined (not window)
// 3. No duplicate params
// 4. Cannot delete variables
// 5. No with() statement

"use strict";
x = 3.14; // ReferenceError

function show() {
  "use strict";
  console.log(this); // undefined
}`
  },
  {
    category: "Output Prediction",
    q: "console.log([] + {}) and console.log({} + []) — what prints?",
    tags: ["accenture", "advanced"],
    a: `console.log([] + {}); // "[object Object]"
// [].toString() = "" + {}.toString() = "[object Object]"

console.log({} + []); // "[object Object]"
// (or 0 in some contexts — {} is treated as block, +[] = 0)`
  },

  // ─── HR & GENERAL ───────────────────────────────────────────
  {
    category: "HR & General",
    q: "Tell me about yourself (self-introduction)",
    tags: ["accenture"],
    a: `// Structure: Present → Past → Future (tailor to your resume)

"I'm Saurabh Dhull, a Senior Full Stack Developer with 3+ years
of experience building scalable SaaS platforms, real-time
communication systems, and AI-powered applications.

I specialize in React.js, Next.js, Node.js, and have strong
experience with Firebase, Redis, and multi-tenant architecture.
I've delivered systems supporting 1000+ active users and
improved backend response times by 50% through Redis caching.

I'm excited about this opportunity at Accenture because I want
to work on large-scale enterprise projects and continue growing
as a software engineer in a globally renowned organization."`
  },
  {
    category: "HR & General",
    q: "What are your strengths and weaknesses?",
    tags: ["accenture"],
    a: `// STRENGTHS (from resume):
// - Performance optimization (reduced response times by 50%)
// - AI integration (built AI-powered workflow systems)
// - Full-stack capability (React + Node + databases)
// - Real-time systems (chat platforms, 1000+ users)

// WEAKNESS:
"Sometimes I take too much ownership and hesitate to delegate.
I've been actively improving by trusting my team more and
focusing on enabling others rather than doing everything myself."`
  },
  {
    category: "HR & General",
    q: "Why do you want to work at Accenture?",
    tags: ["accenture"],
    a: `"Accenture offers exposure to cutting-edge technologies and
large-scale enterprise projects across multiple domains.
I'm drawn to the continuous learning culture and the
opportunity to work with global teams solving complex
business problems. The emphasis on innovation and professional
development aligns perfectly with my career goals."`
  },
  {
    category: "HR & General",
    q: "Where do you see yourself in 5 years?",
    tags: ["accenture"],
    a: `"In 1-2 years, I see myself mastering Accenture's tech stack
and contributing at a high level. In 3-5 years, I aspire to
take on technical leadership — mentoring junior developers,
leading architecture decisions, and becoming a trusted SME
in modern web technologies. I want to grow into a Senior
or Lead Developer role within Accenture."`
  },
  {
    category: "HR & General",
    q: "Why should we hire you?",
    tags: ["accenture"],
    a: `"You should hire me because I combine strong technical skills
with real-world delivery experience. I've built AI-powered
systems, real-time communication platforms, and mobile CRM
solutions — all serving 1000+ users with high performance.
I write clean, maintainable code, I'm passionate about
learning, and I'm looking for a long-term career where I
can make an impact from day one."`
  },
  {
    category: "HR & General",
    q: "Explain a challenging project you worked on",
    tags: ["accenture"],
    a: `// Use STAR method: Situation, Task, Action, Result

"My most challenging project was an enterprise real-time chat
platform serving 1000+ active users across multiple tenants.
We needed live messaging, presence tracking, push notifications,
and role-based access — all with sub-100ms latency.

I led the frontend architecture using React.js integrated with
Firebase Realtime Database for live sync, and built Service
Workers for push notifications. On the backend, I implemented
multi-tenant data isolation and session management.

The result: a fully functional communication platform with
reliable real-time updates, 50% reduction in backend response
times through Redis caching, and successful adoption by users."`
  },

  // ─── ADVANCED / MISC ───────────────────────────────────────
  {
    category: "Advanced / Misc",
    q: "Service Workers — what are they used for?",
    tags: ["advanced"],
    a: `// Service Worker = script running in background (separate thread)
// Acts as programmable network proxy

// Use cases:
// 1. Offline support (PWA) — serve cached assets
// 2. Push notifications — even when page closed
// 3. Background sync — retry failed requests
// 4. Cache-first loading — faster repeat visits

// Lifecycle: Register → Install → Activate → Idle → Terminate
// Cannot access DOM. Requires HTTPS.`
  },
  {
    category: "Advanced / Misc",
    q: "Web Workers vs Service Workers",
    tags: ["advanced"],
    a: `// Web Worker: CPU-intensive tasks in background thread
// - postMessage communication
// - Heavy calculations, data parsing, image processing
// - Lives for page lifetime

// Service Worker: network proxy for offline/caching
// - Register/Install/Activate lifecycle
// - Push notifications, background sync
// - Shared across pages of same origin`
  },
  {
    category: "Advanced / Misc",
    q: "CORS — what is it and how do you fix it?",
    tags: ["popular"],
    a: `// CORS = Cross-Origin Resource Sharing
// Browser blocks requests from different origin (protocol + domain + port)

// Server must send headers:
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization

// Preflight (OPTIONS): sent before "non-simple" requests
// Dev fix: proxy server (CORS-anywhere, or own backend proxy)`
  },
  {
    category: "Advanced / Misc",
    q: "localStorage vs sessionStorage vs cookies",
    tags: ["popular", "accenture"],
    a: `// localStorage:    persists until manually cleared, ~5-10MB, not sent to server
// sessionStorage:  cleared when tab closes, ~5-10MB, not sent to server
// cookies:         can be persistent, max 4KB, sent with every HTTP request

localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme")); // "dark"

// Cookie flags:
document.cookie = "token=abc; path=/; max-age=86400; HttpOnly; Secure; SameSite=Strict";`
  },
  {
    category: "Advanced / Misc",
    q: "Symbol type — what is it used for?",
    tags: ["advanced"],
    a: `// Symbol = unique, immutable primitive (ES6)
// Use: unique property keys, avoiding name collisions

const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // false

const obj = { [sym1]: "secret", visible: "public" };
console.log(Object.keys(obj)); // ["visible"]
console.log(obj[sym1]); // "secret"

// Well-known symbols:
const arr = [1, 2, 3];
const iter = arr[Symbol.iterator]();
console.log(iter.next()); // { value: 1, done: false }`
  },
  {
    category: "Advanced / Misc",
    q: "Proxy and Reflect — what are they?",
    tags: ["advanced"],
    a: `// Proxy: intercepts object operations via "traps"
// Reflect: provides default behavior methods

const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : "Not found!";
  }
};
const p = new Proxy({ name: "John" }, handler);
console.log(p.name); // "John"
console.log(p.foo);  // "Not found!"`
  },
  {
    category: "Advanced / Misc",
    q: "What is the difference between deep and shallow comparison in React?",
    tags: ["react"],
    a: `// Shallow comparison: compares references (===) — used by React.memo
// Deep comparison: compares values recursively

const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false (different references)

// React uses Object.is() for comparison (like === but NaN-safe)
// What React.memo compares:
prevProps === nextProps (shallow)

// If you pass objects/arrays inline in JSX, they create new refs every render:
<Child data={{ x: 1 }} /> // ❌ new object each render — breaks memo

// Fix: memoize with useMemo / useCallback, or keep outside render`
  },
];

// ─── UI RENDERING ─────────────────────────────────────────────
(function() {
  const container = document.getElementById("questions-container");
  const searchInput = document.getElementById("search");
  const tagFilters = document.getElementById("tagFilters");
  const catFilters = document.getElementById("categoryFilters");
  const stats = document.getElementById("stats");
  const totalStats = document.getElementById("totalStats");
  const categories = [...new Set(questions.map(q => q.category))];
  const allTags = [...new Set(questions.flatMap(q => q.tags || []))];
  const DOT_COLORS = {
    "Core JavaScript": "#38bdf8",
    "React.js": "#7dd3fc",
    "Node.js / Express": "#86efac",
    "TypeScript": "#3178c6",
    "Database & Caching": "#f59e0b",
    "Authentication & Security": "#f87171",
    "Real-Time": "#a78bfa",
    "State Management": "#f472b6",
    "Performance Optimization": "#34d399",
    "Version Control & DevOps": "#f97316",
    "System Design": "#e879f9",
    "Testing": "#14b8a6",
    "Agile / Scrum": "#64748b",
    "Coding Challenges": "#facc15",
    "Output Prediction": "#fb923c",
    "HR & General": "#94a3b8",
    "Advanced / Misc": "#a5b4fc"
  };

  let activeFilter = "all";
  let searchTerm = "";

  // Sidebar: tag filters
  const allItem = document.createElement("button");
  allItem.className = "cat-item active";
  allItem.innerHTML = '<span class="dot" style="background:var(--accent)"></span>All';
  allItem.dataset.filter = "all";
  tagFilters.appendChild(allItem);

  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = "cat-item";
    const dotColor = tag === "accenture" ? "#7c3aed"
      : tag === "popular" ? "#e11d48"
      : tag === "advanced" ? "#d97706"
      : tag === "react" ? "#38bdf8"
      : tag === "node" ? "#22c55e"
      : tag === "system-design" ? "#e879f9" : "#94a3b8";
    btn.innerHTML = `<span class="dot" style="background:${dotColor}"></span>${tag.charAt(0).toUpperCase() + tag.slice(1)}`;
    btn.dataset.filter = tag;
    tagFilters.appendChild(btn);
  });

  // Sidebar: category filters
  categories.forEach(cat => {
    const count = questions.filter(q => q.category === cat).length;
    const btn = document.createElement("button");
    btn.className = "cat-item";
    const dotColor = DOT_COLORS[cat] || "#64748b";
    btn.innerHTML = `<span class="dot" style="background:${dotColor}"></span>${cat} <span class="count">${count}</span>`;
    btn.dataset.filter = cat;
    catFilters.appendChild(btn);
  });

  // ─── FILTER HANDLING ───
  function applyFilter(filter) {
    document.querySelectorAll(".cat-item").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(`[data-filter="${filter}"]`).forEach(el => el.classList.add("active"));
    activeFilter = filter;
    render();
  }

  function setupCategoryFilter(container) {
    container.addEventListener("click", function(e) {
      const target = e.target.closest(".cat-item");
      if (!target) return;
      applyFilter(target.dataset.filter);
    });
  }
  setupCategoryFilter(tagFilters);
  setupCategoryFilter(catFilters);

  // Search
  searchInput.addEventListener("input", function() {
    searchTerm = this.value.toLowerCase().trim();
    render();
  });

  function render() {
    const filtered = questions.filter(q => {
      if (activeFilter !== "all") {
        if (q.category === activeFilter) return true;
        if (q.tags && q.tags.includes(activeFilter)) return true;
        return false;
      }
      return true;
    }).filter(q => {
      if (!searchTerm) return true;
      return q.q.toLowerCase().includes(searchTerm) ||
             q.a.toLowerCase().includes(searchTerm) ||
             q.category.toLowerCase().includes(searchTerm);
    });

    const grouped = {};
    filtered.forEach(q => {
      if (!grouped[q.category]) grouped[q.category] = [];
      grouped[q.category].push(q);
    });

    stats.textContent = `Showing ${filtered.length} of ${questions.length}`;
    totalStats.textContent = `${questions.length} questions`;

    let html = "";
    const categoryOrder = categories.filter(c => grouped[c]);

    if (filtered.length === 0) {
      html = '<div class="q-item empty-state"><strong>No questions found</strong>Try a different search or filter</div>';
    }

    categoryOrder.forEach(cat => {
      html += `<div class="category"><div class="category-title">${cat} <span class="count-badge">${grouped[cat].length}</span></div>`;
      grouped[cat].forEach(q => {
        const formattedAnswer = q.a.split("\n").map(line => {
          const t = line.trim();
          if (t.startsWith("//")) return `<span class="comment">${line}</span>`;
          return line;
        }).join("\n");

        const tagsHtml = (q.tags || []).map(t =>
          `<span class="badge ${t}">${t}</span>`
        ).join("");

        html += `
          <div class="q-item">
            <div class="question">
              <span>${q.q} ${tagsHtml}</span>
              <span class="arrow">\u25b8</span>
            </div>
            <div class="answer"><pre>${formattedAnswer}</pre></div>
          </div>`;
      });
      html += "</div>";
    });

    container.innerHTML = html;

    container.querySelectorAll(".question").forEach(el => {
      el.addEventListener("click", function() {
        const item = this.parentElement;
        item.classList.toggle("open");
      });
    });
  }

  render();

  // Mobile sidebar toggle
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function(e) {
      e.stopPropagation();
      sidebar.classList.toggle("open");
      overlay.classList.toggle("open");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }

  // Close sidebar when a filter is clicked (mobile)
  document.querySelectorAll(".cat-item").forEach(el => {
    el.addEventListener("click", closeSidebar);
  });
})();
