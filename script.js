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
    q: "var vs let vs const — key differences?",
    tags: ["popular"],
    a: `// var → function-scoped, hoisted with undefined, can redeclare
// let/const → block-scoped, hoisted but uninitialized (TDZ), no redeclare
// const → cannot reassign, but object properties can mutate

var x = 5;
console.log(x); // 5

let y = 5;
console.log(y); // 5 (TDZ applies before this line)

const z = { name: "John" };
z.name = "Doe"; // allowed — const only blocks reassignment, not mutation`
  },
  {
    category: "Core JavaScript",
    q: "== vs === — how do they differ?",
    tags: ["popular"],
    a: `// == loose equality — coerces types before comparing
// === strict equality — no type coercion, preferred

console.log(5 == "5");   // true  ("5" coerced to number)
console.log(5 === "5");  // false

console.log(null == undefined);  // true  (special JS rule)
console.log(null === undefined); // false

console.log(false == 0);  // true
console.log(false === 0); // false

// Always use === unless you explicitly need coercion`
  },
  {
    category: "Core JavaScript",
    q: "What is hoisting in JavaScript?",
    tags: ["popular"],
    a: `// Hoisting = declarations moved to top of scope during compilation
// var → hoisted + initialized as undefined
// let/const → hoisted but uninitialized (TDZ)
// function declarations → fully hoisted (callable before definition)

console.log(a); // undefined
var a = 10;

foo(); // "Hello" — function declaration fully hoisted
function foo() { console.log("Hello"); }

bar(); // TypeError — var bar hoisted as undefined, not a function yet
var bar = function() { console.log("Hi"); };`
  },
  {
    category: "Core JavaScript",
    q: "What is the Temporal Dead Zone (TDZ)?",
    tags: ["advanced"],
    a: `// TDZ = period between entering scope and variable declaration
// Accessing let/const during TDZ throws ReferenceError

{
  // TDZ starts here
  console.log(x); // ReferenceError
  let x = 10;     // TDZ ends here
}

// typeof also unsafe in TDZ with let/const
typeof y; // ReferenceError (unlike var where typeof returns "undefined")`
  },
  {
    category: "Core JavaScript",
    q: "What are closures — explain with example",
    tags: ["popular"],
    a: `// Closure = function remembers its lexical scope even when executed outside it
// Inner function retains access to outer function's variables

function outer(x) {
  return function inner(y) {
    return x + y; // inner remembers x after outer returned
  };
}

const add5 = outer(5);
console.log(add5(3)); // 8

// Uses: data privacy, currying, memoization, module pattern`
  },
  {
    category: "Core JavaScript",
    q: "How does the 'this' keyword behave in different contexts?",
    tags: ["popular"],
    a: `// 'this' depends on how function is called:

// 1. Global → window/global
console.log(this); // window

// 2. Regular function → window (undefined in strict mode)
function show() { console.log(this); }
show(); // window

// 3. Object method → the object itself
const obj = { name: "JS", show() { console.log(this.name); } };
obj.show(); // "JS"

// 4. Arrow function → inherits 'this' from parent scope (lexical)

// 5. Constructor (new) → new instance

// 6. call/apply/bind → explicitly set this`
  },
  {
    category: "Core JavaScript",
    q: "call vs apply vs bind — what's the difference?",
    tags: ["popular"],
    a: `// call — args passed individually, invoked immediately
// apply — args as array, invoked immediately
// bind — returns new function with bound this, NOT invoked

function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

const person = { name: "John" };

console.log(greet.call(person, "Hello", "!"));  // "Hello, John!"
console.log(greet.apply(person, ["Hi", "!!"])); // "Hi, John!!"

const bound = greet.bind(person, "Hey");
console.log(bound("?")); // "Hey, John?"`
  },
  {
    category: "Core JavaScript",
    q: "Arrow functions vs regular functions — differences",
    tags: ["popular"],
    a: `// Arrow vs regular:
// this: arrow inherits lexically; regular has own this
// arguments: arrow has none; regular does
// constructor: arrow cannot use new
// hoisting: function declarations hoisted; arrows are not

const obj = {
  name: "Test",
  regular: function() { console.log(this.name); },
  arrow: () => console.log(this.name) // this = window, not obj
};

obj.regular(); // "Test"
obj.arrow();   // undefined`
  },
  {
    category: "Core JavaScript",
    q: "How does prototypal inheritance work in JS?",
    tags: ["advanced"],
    a: `// Every JS object has internal [[Prototype]] (__proto__ / Object.getPrototypeOf)
// Properties looked up along prototype chain until found or null

const parent = { greet() { return "Hello"; } };
const child = { name: "Child" };
child.__proto__ = parent;
console.log(child.greet()); // "Hello" — inherited
console.log(child.name);    // "Child" — own property

function Animal(type) { this.type = type; }
Animal.prototype.speak = function() { return "I'm a " + this.type; };

const dog = new Animal("dog");
console.log(dog.speak()); // "I'm a dog"
console.log(dog instanceof Animal); // true`
  },
  {
    category: "Core JavaScript",
    q: "Event Loop — microtasks vs macrotasks explained",
    tags: ["popular", "advanced"],
    a: `// JS is single-threaded. Event Loop manages async execution order.
// Priority: Sync > Microtasks > Macrotasks

// Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver
// Macrotasks: setTimeout, setInterval, I/O, UI rendering

console.log(1);                    // sync
setTimeout(() => console.log(2));  // macrotask
Promise.resolve().then(() => console.log(3)); // microtask
console.log(4);                    // sync

// Output: 1, 4, 3, 2
// Why: sync first, microtask queue empties before next macrotask`
  },
  {
    category: "Core JavaScript",
    q: "Promises vs Async/Await — how are they related?",
    tags: ["popular"],
    a: `// Promise: object representing eventual completion/failure of async op
// async/await: syntactic sugar over Promises, reads like sync code

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

// await only usable inside async function`
  },
  {
    category: "Core JavaScript",
    q: "What is event delegation and why use it?",
    tags: ["popular"],
    a: `// Attach ONE listener to parent, use event.target to identify child
// Benefits: works for dynamic elements, better performance

document.querySelector("#list").addEventListener("click", function(e) {
  if (e.target.matches(".item")) {
    console.log("Item clicked:", e.target.textContent);
  }
});

// Event phases: capturing (top→down) → target → bubbling (bottom→up)`
  },
  {
    category: "Core JavaScript",
    q: "Debouncing vs Throttling — differences and use cases",
    tags: ["popular"],
    a: `// Debounce: runs AFTER user stops triggering for N ms
// Use: search input, auto-save, resize
// Throttle: runs at most ONCE every N ms
// Use: scroll, mousemove, game loop

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
    q: "Shallow copy vs Deep copy — how to create each?",
    tags: ["popular"],
    a: `// Shallow: copies top-level only, nested objects still referenced
const original = { a: 1, b: { c: 2 } };

const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);
shallow1.b.c = 99;
console.log(original.b.c); // 99 — mutation affects original!

// Deep copy:
const deep1 = JSON.parse(JSON.stringify(original));      // loses functions/undefined
const deep2 = structuredClone(original);                  // modern API`
  },
  {
    category: "Core JavaScript",
    q: "Spread operator vs Rest parameter — differences",
    tags: ["popular"],
    a: `// Spread: expands array/object into individual elements
// Rest: collects multiple elements into single array/object

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
    a: `// map → transforms each element, returns new array (same length)
// filter → keeps elements passing a test, returns subset
// reduce → accumulates into single result

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
    q: "null vs undefined — what's the difference?",
    tags: ["popular"],
    a: `// undefined: variable declared but not assigned / property missing
// null: intentional absence of value (assigned explicitly)

let a;
console.log(a); // undefined

const obj = {};
console.log(obj.x); // undefined

const b = null;
console.log(b); // null

console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (historical JS bug)
console.log(null == undefined);  // true
console.log(null === undefined); // false`
  },
  {
    category: "Core JavaScript",
    q: "What is an IIFE and when would you use it?",
    tags: ["popular"],
    a: `// IIFE = Immediately Invoked Function Expression
// Runs immediately, creates private scope — avoids global pollution

(function() {
  var privateVar = "I am private";
  console.log(privateVar);
})();
// privateVar not accessible outside

// Modern alternative: just use { } block with let/const`
  },
  {
    category: "Core JavaScript",
    q: "What is currying in JavaScript — give example",
    tags: ["advanced"],
    a: `// Currying = transform f(a,b,c) into f(a)(b)(c)
// Each nested function takes one argument

function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

const curry = (a) => (b) => (c) => a + b + c;

// Useful for partially-applied functions
const add5 = curry(5);
console.log(add5(3)(2)); // 10`
  },
  {
    category: "Core JavaScript",
    q: "What is memoization — implement a generic memoize function",
    tags: ["advanced"],
    a: `// Memoization = cache function results to avoid recomputation

function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    cache[key] = fn.apply(this, args);
    return cache[key];
  };
}

const slowFib = (n) => n <= 1 ? n : slowFib(n - 1) + slowFib(n - 2);
const fastFib = memoize(slowFib);
console.log(fastFib(40)); // 102334155 — milliseconds vs seconds`
  },
  {
    category: "Core JavaScript",
    q: "What are generator functions and when to use them?",
    tags: ["advanced"],
    a: `// Generator functions can pause (yield) and resume later
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
    q: "Set vs Map vs WeakSet vs WeakMap — when to use each",
    tags: ["advanced"],
    a: `// Set: unique values
// Map: key-value pairs (any type keys)
// WeakSet: objects only, held weakly (GC eligible)
// WeakMap: object keys only, held weakly, no .size/.keys/.entries

const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [1, 2, 3]

const map = new Map();
map.set("name", "John");
console.log(map.get("name")); // "John"

// WeakMap — keys GC'd when no other refs exist
const cache = new WeakMap();
function process(obj) {
  if (!cache.has(obj)) cache.set(obj, expensiveComputation(obj));
  return cache.get(obj);
}`
  },
  {
    category: "Core JavaScript",
    q: "typeof vs instanceof — how to check types in JS",
    tags: ["popular"],
    a: `// typeof → returns string of primitive type
// instanceof → checks if object is instance of constructor (walks prototype chain)

console.log(typeof "hello");   // "string"
console.log(typeof null);      // "object" — known JS bug
console.log(typeof []);        // "object"

console.log([] instanceof Array);    // true
console.log([] instanceof Object);   // true
console.log(Array.isArray([])); // true — reliable check`
  },
  {
    category: "Core JavaScript",
    q: "How does try/catch/finally work for error handling?",
    tags: ["popular"],
    a: `// try: wrap code that might throw
// catch: handle the error
// finally: ALWAYS runs (error or not)

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
    q: "JSON.parse and JSON.stringify — how and when to use",
    tags: ["popular"],
    a: `// JSON.parse(str) → JSON string → JS object
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
    a: `// Virtual DOM = lightweight JS representation of real DOM
// Real DOM manip is slow; Virtual DOM batches updates

// How it works:
// 1. Render → creates Virtual DOM tree
// 2. Diffing (reconciliation) → compares prev vs new VDOM
// 3. Patching → computes minimal DOM operations
// 4. Commit → applies changes to real DOM

// React Fiber architecture:
// - Incremental rendering (splits work into chunks)
// - Can pause/abort work (concurrent mode)
// - Prioritizes high-priority updates (input > fetch)`
  },
  {
    category: "React.js",
    q: "Explain common React hooks — useState, useEffect, useRef, useCallback, useMemo, useReducer",
    tags: ["popular", "react"],
    a: `// useState — state in functional components
const [count, setCount] = useState(0);

// useEffect — side effects (API calls, subscriptions, DOM)
useEffect(() => {
  fetchData();
  return () => cleanup(); // cleanup on unmount
}, [deps]); // runs when deps change, [] = mount only

// useRef — mutable ref persisting across renders (no re-render)
const inputRef = useRef(null);
inputRef.current.focus();

// useCallback — memoizes function reference (prevents child re-renders)
const handleClick = useCallback(() => doSomething(a), [a]);

// useMemo — memoizes computed value (expensive calcs)
const sorted = useMemo(() => arr.sort(), [arr]);

// useReducer — complex state logic (Redux-lite)
const [state, dispatch] = useReducer(reducer, initialState);`
  },
  {
    category: "React.js",
    q: "Class lifecycle methods vs useEffect — mapping",
    tags: ["react"],
    a: `// Mounting: componentDidMount → useEffect(() => {}, [])
// Updating: componentDidUpdate → useEffect(() => {}, [prop])
// Unmounting: componentWillUnmount → useEffect(() => () => {}, [])
// shouldComponentUpdate → React.memo / PureComponent

useEffect(() => {
  console.log("Mounted + Updated when count changes");
  return () => console.log("Cleanup on unmount or re-run");
}, [count]);`
  },
  {
    category: "React.js",
    q: "Why are keys important in React lists?",
    tags: ["popular", "react"],
    a: `// Keys help React identify which items changed, added, removed
// Should be STABLE, UNIQUE, PREDICTABLE

// Bad — using index as key (when list can change):
{todos.map((todo, index) => <Todo key={index} todo={todo} />)}
// Index keys cause bugs with reordering, deletion, filtering

// Good — using unique id:
{todos.map(todo => <Todo key={todo.id} todo={todo} />)}

// Stable fallback (when no id exists):
{todos.map((todo, i) => <Todo key={todo.text + i} todo={todo} />)}`
  },
  {
    category: "React.js",
    q: "React.memo vs useMemo vs useCallback — when to use each",
    tags: ["react"],
    a: `// React.memo — wraps component to skip re-render if props unchanged
const Heavy = React.memo(function Heavy({ data }) {
  return <div>{/* expensive render */}</div>;
});

// useMemo — memoizes a VALUE to avoid expensive computations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);

// useCallback — memoizes a FUNCTION reference (passing to child)
const onDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id));
}, []);

// When to use:
// - React.memo: pure components re-rendering often with same props
// - useMemo: expensive calculations (sorting, filtering)
// - useCallback: callbacks passed to memoized children
// Don't optimize prematurely — measure first`
  },
  {
    category: "React.js",
    q: "Controlled vs Uncontrolled components — differences",
    tags: ["popular", "react"],
    a: `// Controlled: React manages form state (single source of truth)
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

// Preference: Controlled for most cases
// Uncontrolled: file inputs, simple forms, performance-critical`
  },
  {
    category: "React.js",
    q: "Context API vs Redux — when to use which?",
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
    q: "HOC vs Render Props vs Hooks — patterns comparison",
    tags: ["react", "advanced"],
    a: `// HOC — function wrapping a component to add behavior
function withAuth(Component) {
  return function Authenticated(props) {
    const user = useAuth();
    return user ? <Component {...props} user={user} /> : <Login />;
  };
}

// Render Props — component taking a function as its child
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
// Hooks > HOC > Render Props for most cases`
  },
  {
    category: "React.js",
    q: "How does Reconciliation work in React?",
    tags: ["react", "advanced"],
    a: `// Reconciliation = algorithm diffing two Virtual DOM trees
// 1. Different element types? → teardown + rebuild entire subtree
// 2. Same type? → update attributes, recurse on children
// 3. Keys? → match children across renders

// Fiber (React 16+) breaks work into units:
// - Each fiber = unit of work (maps to a component)
// - Can pause, abort, or prioritize
// - Enables Concurrent Mode and Suspense

// Without keys: full unmount + remount on reorder
// With keys: React reorders nodes instead of destroy/create`
  },
  {
    category: "React.js",
    q: "How do you optimize React app performance?",
    tags: ["popular", "react"],
    a: `// 1. React.memo() — skip re-render if props unchanged
// 2. useMemo + useCallback — memoize values and functions
// 3. Code splitting — React.lazy + Suspense
// 4. Virtualization — react-window for long lists
// 5. Debounced inputs — prevent excessive re-renders
// 6. Avoid anonymous functions in JSX (breaks memo)
// 7. Use proper keys in lists
// 8. Lazy load images — loading="lazy"
// 9. Bundle analysis — find large deps
// 10. useTransition (React 18) — mark non-urgent updates

const HeavyList = React.lazy(() => import("./HeavyList"));
<Suspense fallback={<Spinner />}>
  <HeavyList />
</Suspense>`
  },
  {
    category: "React.js",
    q: "React 18 new features — concurrent rendering, transitions, Suspense",
    tags: ["react", "advanced"],
    a: `// React 18 key features:

// 1. Automatic Batching — multiple setState in same handler = one render
setCount(c => c + 1);
setFlag(f => !f);
// React 18 batches automatically (even in setTimeout/promises)

// 2. Transitions — mark non-urgent updates
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setSearchQuery(input); // interruptible
});

// 3. Suspense on server — SSR streaming
// 4. useId() — generates unique IDs for accessibility
// 5. useDeferredValue — defer re-rendering slow values
// 6. New Root API:
const root = createRoot(document.getElementById("root"));
root.render(<App />);`
  },

  // ─── NODE.JS / EXPRESS ──────────────────────────────────────
  {
    category: "Node.js / Express",
    q: "How does the Node.js Event Loop work?",
    tags: ["popular", "node"],
    a: `// Node.js single-threaded, non-blocking I/O via Event Loop (libuv)

// Event Loop phases (each has FIFO callback queue):
// 1. timers → setTimeout, setInterval
// 2. pending callbacks → deferred I/O
// 3. idle, prepare → internal
// 4. poll → retrieve I/O events (blocking)
// 5. check → setImmediate
// 6. close callbacks → close events

// Between phases: microtask queues drained:
// - process.nextTick (highest priority)
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
    q: "How does Express.js middleware work?",
    tags: ["popular", "node"],
    a: `// Middleware = functions with access to req, res, next
// Can: execute code, modify req/res, end request, call next

// Application-level:
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // pass to next middleware
});

// Route-level:
app.get("/api/users", authMiddleware, (req, res) => {
  res.json(users);
});

// Error-handling (4 args — err, req, res, next):
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Common: express.json(), cors(), morgan, helmet, passport`
  },
  {
    category: "Node.js / Express",
    q: "What are Node.js streams and their types?",
    tags: ["node", "advanced"],
    a: `// Streams = process data chunk by chunk (not entire file at once)
// Perfect for: large files, network, video streaming

// 4 types:
// 1. Readable → data source (fs.createReadStream)
// 2. Writable → destination (fs.createWriteStream)
// 3. Duplex → both readable + writable (net.Socket)
// 4. Transform → modifies data while reading/writing (zlib.Gzip)

const readStream = fs.createReadStream("bigfile.txt", { encoding: "utf8" });
readStream.on("data", chunk => console.log("Chunk:", chunk.length));
readStream.on("end", () => console.log("Done"));

// Pipe — automatic flow control:
readStream.pipe(zlib.createGzip()).pipe(fs.createWriteStream("file.gz"));

// Backpressure: consumer slower than producer — .pipe() handles it`
  },
  {
    category: "Node.js / Express",
    q: "How do you handle errors in Node.js and Express?",
    tags: ["popular", "node"],
    a: `// 1. Sync: try/catch
// 2. Async: catch errors in promises/async functions
// 3. Express async handler wrapper:

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/data", asyncHandler(async (req, res) => {
  const data = await db.find();
  res.json(data);
}));

// 4. Global error handler (last middleware):
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(\`[\${status}] \${err.message}\`);
  res.status(status).json({ error: err.message });
});

// 5. Uncaught exceptions / unhandled rejections:
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1); // crash + restart recommended
});`
  },
  {
    category: "Node.js / Express",
    q: "What is the Cluster module and when to use it?",
    tags: ["node", "advanced"],
    a: `// Cluster = spawn multiple processes to utilize all CPU cores

const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} running\`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // auto-restart
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Hello from worker " + process.pid);
  }).listen(8000);
}

// Alternative: PM2 — pm2 start app.js -i max`
  },
  {
    category: "Node.js / Express",
    q: "process.nextTick() vs setImmediate() — what's the difference?",
    tags: ["advanced", "node"],
    a: `// nextTick() → runs BEFORE next macrotask (end of current phase)
// setImmediate() → runs in CHECK phase (after macrotasks)

// Priority: nextTick > Promise > timers > setImmediate

console.log("1");
setTimeout(() => console.log("2"), 0);
setImmediate(() => console.log("3"));
process.nextTick(() => console.log("4"));
console.log("5");

// Output: 1, 5, 4, 2, 3`
  },

  // ─── TYPESCRIPT ────────────────────────────────────────────
  {
    category: "TypeScript",
    q: "TypeScript vs JavaScript — key differences",
    tags: ["popular"],
    a: `// TypeScript = JavaScript + static typing (transpiles to JS)

// Benefits:
// 1. Static type checking at compile time
// 2. Better IDE support (autocomplete, refactoring)
// 3. Interfaces, generics, enums, decorators
// 4. Catches bugs BEFORE runtime
// 5. Self-documenting code

let name: string = "John"; // explicit type
let age = 25; // type inference → number

// any vs unknown:
let a: any = "hello";      // disables type checking
let b: unknown = "hello";  // must narrow before use`
  },
  {
    category: "TypeScript",
    q: "Interfaces vs Types in TypeScript — when to use each",
    tags: ["popular"],
    a: `// INTERFACE — describes object shape, can be extended
interface User {
  name: string;
  age: number;
}
interface Admin extends User {
  role: "admin" | "superadmin";
}

// TYPE — unions, intersections, primitives, tuples, mapped types
type Status = "active" | "inactive";
type Point = { x: number; y: number };
type NamedPoint = Point & { name: string };

// Key differences:
// - Interface: declaration merging (extensible)
// - Type: cannot extend, but can use intersection (&)
// - Interface for OOP-style, type for complex unions

// Rule: library/API types → interface; unions/tuples → type`
  },
  {
    category: "TypeScript",
    q: "How do generics work in TypeScript — example",
    tags: ["popular", "advanced"],
    a: `// Generics = reusable components working with ANY type

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

// Generic constraint — T must have .length:
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
getLength("hello"); // 5
getLength([1,2,3]); // 3`
  },
  {
    category: "TypeScript",
    q: "Utility types — Partial, Required, Pick, Omit, Record explained",
    tags: ["popular", "advanced"],
    a: `// Partial<T> → all properties optional
interface User { id: number; name: string; email: string; }
const update: Partial<User> = { name: "New Name" };

// Required<T> → all required
const full: Required<Partial<User>> = { id: 1, name: "a", email: "a@b" };

// Pick<T, K> → pick specific keys
const preview: Pick<User, "id" | "name"> = { id: 1, name: "John" };

// Omit<T, K> → remove specific keys
const withoutId: Omit<User, "id"> = { name: "John", email: "j@b.com" };

// Record<K, T> → object type with keys K and values T
const roles: Record<string, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read"]
};

// Readonly<T> → all readonly
// Exclude/Extract → union filtering
// ReturnType<T> → extract return type of function`
  },

  // ─── DATABASE & CACHING ────────────────────────────────────
  {
    category: "Database & Caching",
    q: "MongoDB vs MySQL — when to use each",
    tags: ["popular"],
    a: `// MONGODB (NoSQL — document DB):
// - Schema-less, JSON-like documents (BSON)
// - Horizontal scaling (sharding) built-in
// - Good for: prototyping, unstructured data, real-time analytics
// - Use when: data shape changes often, hierarchical data

// MYSQL (SQL — relational DB):
// - Strict schema with relationships, ACID compliant
// - Powerful JOINs and complex queries
// - Good for: financial data, strict consistency, reporting
// - Use when: relationships between entities matter

// Rule: use SQL unless you have reason not to
// Many apps use both — SQL for core + MongoDB for flexible data`
  },
  {
    category: "Database & Caching",
    q: "What is database indexing and why is it important?",
    tags: ["popular"],
    a: `// Index = data structure (B-tree, hash) speeding up retrieval
// Trade-off: faster reads, slower writes (index updated on insert/update)

// Without index: FULL TABLE SCAN (slow for millions)
// With index: B-tree → O(log n)

// MongoDB:
db.users.createIndex({ email: 1 });
db.users.createIndex({ name: "text", bio: "text" });

// MySQL:
CREATE INDEX idx_email ON users(email);
CREATE UNIQUE INDEX idx_email ON users(email);

// Compound index — covers multiple fields:
db.orders.createIndex({ userId: 1, createdAt: -1 });
// Order matters: put high-selectivity fields first`
  },
  {
    category: "Database & Caching",
    q: "Redis use cases and common data structures",
    tags: ["popular"],
    a: `// Redis = in-memory key-value store (sub-ms latency)
// Use: caching, session store, rate limiting, pub/sub, queues

// Common data structures:
SET key "value"                     // String
HSET user:1 name "John"             // Hash
LPUSH queue task1                   // List
SADD tags "javascript"              // Set (unique)
ZADD leaderboard 100 "player1"      // Sorted Set
PUBLISH channel message             // Pub/Sub

// EXPIRE — auto-delete keys:
SET session:abc "data" EX 3600      // 1 hour TTL

// Caching pattern:
async function getUser(id) {
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);
  const user = await db.findUser(id);
  await redis.setEx(\`user:\${id}\`, 3600, JSON.stringify(user));
  return user;
}

// My experience: 50% response time reduction with Redis`
  },
  {
    category: "Database & Caching",
    q: "SQL vs NoSQL — when to choose each",
    tags: ["popular"],
    a: `// PICK SQL (PostgreSQL/MySQL) when:
// - Complex relationships and JOINs
// - Strict data integrity (ACID)
// - Structured data, stable schema
// - Transactions across multiple records

// PICK NoSQL (MongoDB/DynamoDB) when:
// - Rapid prototyping, flexible schema
// - Hierarchical or nested data
// - Horizontal scaling is critical
// - Eventually consistent reads acceptable

// Many production systems are polyglot:
// SQL for orders/payments, NoSQL for content, Redis for cache`
  },

  // ─── AUTHENTICATION & SECURITY ─────────────────────────────
  {
    category: "Authentication & Security",
    q: "JWT vs Session-based authentication — differences",
    tags: ["popular"],
    a: `// JWT (JSON Web Token) — stateless:
// Token carries user data, no server storage
// Format: header.payload.signature (base64)
// Easy to scale (no shared session store)
// Con: cannot revoke individual tokens (wait for expiry)

// Flow: Login → server creates signed token → client stores
// Every request: Authorization: Bearer <token>
// Server verifies signature, extracts user info

// Session-based — stateful:
// Server stores session in memory/DB/Redis
// Session ID in cookie (httpOnly, secure, sameSite)
// Easy to revoke (delete session)
// Needs shared session store for multi-server

// Best: JWT short-lived (15 min) + refresh token (7 days)`
  },
  {
    category: "Authentication & Security",
    q: "Common web security vulnerabilities — XSS, CSRF, SQL injection",
    tags: ["popular"],
    a: `// 1. XSS (Cross-Site Scripting):
// Attacker injects malicious scripts into web pages
// Prevention: sanitize input, CSP headers, escape output
// React handles this by default (JSX escapes values)

// 2. CSRF (Cross-Site Request Forgery):
// Attacker tricks user into unwanted requests
// Prevention: CSRF tokens, SameSite cookies
// SameSite=Strict/Lax prevents CSRF in modern browsers

// 3. SQL Injection:
// Attacker injects SQL via form inputs
// Prevention: parameterized queries (NEVER string concat)
// ✅ db.query("SELECT * FROM users WHERE id = $1", [userId])
// ❌ db.query(\`SELECT * FROM users WHERE id = \${userId}\`)

// Additional: HTTPS, helmet middleware, rate limiting, input validation`
  },
  {
    category: "Authentication & Security",
    q: "How does the OAuth 2.0 flow work?",
    tags: ["advanced"],
    a: `// OAuth 2.0 = delegated authorization (login with Google/GitHub)

// Roles: Resource Owner (user), Client (app), Auth Server, Resource Server

// Authorization Code Flow (most secure):
// 1. User clicks "Login with Google"
// 2. App redirects to Google with client_id, redirect_uri, scope
// 3. User logs in, grants permission
// 4. Google redirects back with ?code=AUTH_CODE
// 5. Backend exchanges code for tokens (with client_secret)
// 6. Google returns { access_token, refresh_token, id_token }
// 7. App uses access_token to call APIs on behalf of user

// Implicit Flow deprecated — PKCE now recommended for SPAs`
  },

  // ─── REAL-TIME ─────────────────────────────────────────────
  {
    category: "Real-Time",
    q: "WebSockets vs Server-Sent Events vs Polling — comparison",
    tags: ["popular"],
    a: `// POLLING: client asks "any updates?" every N seconds
// ✅ Simple, works everywhere
// ❌ Wasted requests, latency = poll interval

// SSE (Server-Sent Events) — server→client only:
// ✅ Built-in (EventSource API), auto-reconnect, lightweight
// ❌ No client→server on same connection, limited ~6 connections
// Use: notifications, live feeds, stock tickers

// WEBSOCKETS — full-duplex:
// ✅ Real-time both ways, persistent, minimal overhead
// ❆ Complex (reconnection, heartbeats)
// Use: chat, live collaboration, gaming, real-time dashboards

// My project: Socket.io for chat with auto-reconnect + rooms`
  },
  {
    category: "Real-Time",
    q: "What is Socket.io and its key features?",
    tags: ["popular"],
    a: `// Socket.io = WebSocket library with fallbacks and extras

// Key features:
// 1. Auto-reconnection — handles disconnects gracefully
// 2. Rooms — broadcast to subsets of clients
// 3. Namespaces — multiplex channels on one connection
// 4. Fallback — long-polling when WebSocket unavailable
// 5. Heartbeats — detects dead connections

// Server:
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.join("room-1");
  io.to("room-1").emit("message", data);
});

// Client:
const socket = io("http://localhost:3000");
socket.on("message", (data) => console.log(data));`
  },

  // ─── STATE MANAGEMENT ──────────────────────────────────────
  {
    category: "State Management",
    q: "Redux core concepts — when should you use it?",
    tags: ["popular"],
    a: `// Redux core:
// STORE — single source of truth for app state
// ACTION — plain object describing "what happened"
// REDUCER — pure function (prevState, action) → newState
// DISPATCH — sends action to reducer
// SELECTOR — reads/filters data from store

// Example:
// Action: { type: "INCREMENT", payload: 1 }

// Reducer:
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT": return state + action.payload;
    default: return state;
  }
}

const store = createStore(counter);
store.dispatch({ type: "INCREMENT", payload: 1 });
console.log(store.getState()); // 1

// When to use:
// - Complex state shared across many components
// - Middleware for side effects (thunks/sagas)
// - Time-travel debugging
// Otherwise: useState + useContext is simpler
// Modern: Redux Toolkit (RTK) — less boilerplate`
  },
  {
    category: "State Management",
    q: "Redux Toolkit vs Context API — which to choose",
    tags: ["popular"],
    a: `// Context API:
// ✅ Built-in, no extra deps, simple for small apps
// ❌ Re-renders all consumers on any state change
// ❌ No devtools, no middleware

// Redux Toolkit:
// ✅ Predictable updates (reducers), devtools, middleware
// ✅ createSlice + createAsyncThunk reduce boilerplate
// ✅ Optimized re-renders (useSelector tracks slices)

// RTK example:
const userSlice = createSlice({
  name: "user",
  initialState: { name: "", loading: false },
  reducers: {
    setUser: (state, action) => { state.name = action.payload; }
  }
});

// When:
// Context: theme, locale, simple auth (low frequency)
// Redux: complex forms, real-time data, normalized cache`
  },

  // ─── PERFORMANCE OPTIMIZATION ──────────────────────────────
  {
    category: "Performance Optimization",
    q: "Core Web Vitals — LCP, INP, CLS explained",
    tags: ["popular"],
    a: `// Core Web Vitals = Google UX metrics

// LCP (Largest Contentful Paint) — loading
// Target: < 2.5s
// Fix: optimize images, preload key resources, SSR, CDN

// INP (Interaction to Next Paint) — responsiveness
// Target: < 100ms
// Fix: code splitting, avoid long tasks, web workers

// CLS (Cumulative Layout Shift) — visual stability
// Target: < 0.1
// Fix: explicit width/height on images, avoid inserting above content`
  },
  {
    category: "Performance Optimization",
    q: "Techniques to improve frontend performance",
    tags: ["popular"],
    a: `// 1. CODE SPLITTING — load only what's needed
React.lazy(() => import("./HeavyComponent"));

// 2. LAZY LOADING — images, below-fold content
<img loading="lazy" src="..." />
IntersectionObserver for custom lazy loading

// 3. MEMOIZATION — avoid unnecessary re-renders
React.memo, useMemo, useCallback

// 4. BUNDLE OPTIMIZATION — tree shaking, minification

// 5. CACHING — browser (Cache-Control), service worker, Redis, CDN

// 6. IMAGE OPTIMIZATION — WebP/AVIF, srcset, CDN

// 7. VIRTUALIZATION — react-window for long lists

// 8. AVOID RENDER-BLOCKING — async/defer scripts, inline critical CSS`
  },
  {
    category: "Performance Optimization",
    q: "How does caching work at different layers?",
    tags: ["popular"],
    a: `// Caching layers (browser → server):

// 1. Browser Cache (Service Worker / HTTP):
// Cache-Control: max-age=86400, public
// ETag / Last-Modified for validation

// 2. CDN Cache: Cloudflare, CloudFront
// Edge locations near user, s-maxage header

// 3. Application Cache (Redis / in-memory):
// Store computed results, session data, DB queries

// 4. Database Cache: query cache, buffer pool, connection pooling

// Cache-Aside Pattern:
async function getData(key) {
  let data = await cache.get(key);
  if (!data) {
    data = await db.query("SELECT ...");
    await cache.set(key, data, { EX: 3600 });
  }
  return data;
}`
  },

  // ─── VERSION CONTROL & DEVOPS ──────────────────────────────
  {
    category: "Version Control & DevOps",
    q: "Git branching strategies — Git Flow vs GitHub Flow",
    tags: ["popular"],
    a: `// GIT FLOW (complex, older):
// main → production, develop → integration
// feature/* → new features, release/* → prep releases
// hotfix/* → urgent fixes (from main)
// ✅ Scheduled releases, complex projects
// ❌ Heavy ceremony, many branches

// GITHUB FLOW (simpler):
// main → always deployable
// feature branches → PR to main when done
// ✅ Simple, CI/CD friendly, small teams

// TRUNK-BASED:
// Short-lived branches (hours), frequent merges to main
// Feature flags for incomplete work
// Ideal for CI/CD`
  },
  {
    category: "Version Control & DevOps",
    q: "What stages should a CI/CD pipeline include?",
    tags: ["popular"],
    a: `// CI/CD = Continuous Integration / Continuous Deployment

// Pipeline stages:
// 1. CODE → developer pushes
// 2. BUILD → compile/dependencies
// 3. LINT → code quality (ESLint)
// 4. TEST → unit + integration tests
// 5. BUILD → production build
// 6. DEPLOY → staging
// 7. E2E → end-to-end tests
// 8. DEPLOY → production

// GitHub Actions example:
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

// Key: fail fast, immutable artifacts, environment parity`
  },

  // ─── SYSTEM DESIGN ────────────────────────────────────────
  {
    category: "System Design",
    q: "How would you design a scalable chat application?",
    tags: ["popular", "system-design"],
    a: `// Requirements: 1-on-1 chat, group chat, presence, push notifications

// Architecture:
// 1. Load Balancer (NGINX) → distribute connections
// 2. WebSocket Servers (Node + Socket.io) — horizontal scale
// 3. Redis Pub/Sub — broadcast across WS servers
// 4. Message Queue (RabbitMQ/Kafka) — async processing
// 5. Database: MongoDB for messages, PostgreSQL for users
// 6. Cache (Redis): online presence, recent messages

// Message flow:
// User A → WS Server 1 → Redis Pub/Sub → WS Server 2 → User B

// My project: multi-tenant chat with React + Firebase, 1000+ users`
  },
  {
    category: "System Design",
    q: "Microservices vs Monolith — when to choose each",
    tags: ["popular", "system-design"],
    a: `// MONOLITH — single deployable unit
// ✅ Simpler dev, deploy, debug
// ✅ Single DB, no network overhead, ACID easy
// ❌ Scales vertically only, codebase gets messy

// MICROSERVICES — independently deployable
// ✅ Independent scaling, deployment, tech stacks
// ✅ Fault isolation, team autonomy
// ❌ Complex: network calls, distributed transactions, debugging

// When to choose:
// START with monolith! Split only when:
// - Codebase too large for team to manage
// - Different parts need independent scaling
// - Different teams need autonomy
// - One part needs different tech stack`
  },

  // ─── TESTING ───────────────────────────────────────────────
  {
    category: "Testing",
    q: "Unit vs Integration vs E2E testing — differences",
    tags: ["popular"],
    a: `// UNIT TESTING — test individual functions in isolation
// Fast, runs on every commit, high coverage
// Tools: Jest, Vitest, Mocha
test("adds 1 + 2 = 3", () => {
  expect(add(1, 2)).toBe(3);
});

// INTEGRATION TESTING — test modules working together
// Medium speed, tests API + DB interactions
// Tools: supertest, React Testing Library
test("GET /api/users returns list", async () => {
  const res = await request(app).get("/api/users");
  expect(res.status).toBe(200);
});

// E2E TESTING — test user flows in real browser
// Slow, few critical paths
// Tools: Cypress, Playwright
cy.visit("/login");
cy.get("[data-test=email]").type("user@test.com");
cy.get("[data-test=submit]").click();
cy.url().should("include", "/dashboard");

// Testing Trophy: Integration > Static > Unit > E2E`
  },
  {
    category: "Testing",
    q: "How do you test React components with Testing Library?",
    tags: ["react"],
    a: `// RTL encourages testing user behavior, not implementation

// Basic component test:
import { render, screen } from "@testing-library/react";
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
// 1. getByRole (accessibility)
// 2. getByLabelText (form labels)
// 3. getByPlaceholderText
// 4. getByText
// 5. getByTestId (last resort)`
  },

  // ─── AGILE / SCRUM ─────────────────────────────────────────
  {
    category: "Agile / Scrum",
    q: "Scrum ceremonies and roles — brief explanation",
    tags: ["popular"],
    a: `// Roles:
// Product Owner — defines features, prioritizes backlog
// Scrum Master — coaches team, removes blockers
// Dev Team — builds product (cross-functional, self-organizing)

// Ceremonies:
// 1. SPRINT PLANNING — commit to work for sprint (2 weeks)
// 2. DAILY STANDUP — what I did, what I'll do, blockers (15 min)
// 3. SPRINT REVIEW — demo to stakeholders
// 4. SPRINT RETRO — reflect on what went well/improve

// Artifacts:
// Product Backlog — prioritized features
// Sprint Backlog — current sprint items
// Increment — potentially shippable product`
  },

  // ─── CODING CHALLENGES ──────────────────────────────────────
  {
    category: "Coding Challenges",
    q: "Reverse a string — write a function",
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
    q: "Flatten a nested array — implement",
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
    q: "FizzBuzz — implement the classic problem",
    tags: ["popular", "accenture"],
    a: `function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
}

fizzBuzz(15);
// Output: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz

// One-liner:
const fb = (n) => Array.from({length: n}, (_, i) =>
  (++i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i
);`
  },
  {
    category: "Coding Challenges",
    q: "Find missing number in array of 1..n",
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
    q: "Deep clone an object — manual implementation",
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

const original = { a: 1, b: { c: [1, 2], d: new Date() } };
const cloned = deepClone(original);
cloned.b.c.push(3);
console.log(original.b.c); // [1, 2] — original unchanged
console.log(cloned.b.c);   // [1, 2, 3]

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
    q: "Implement a debounce function",
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
}

// Usage: const log = debounce((msg) => console.log(msg), 200);
// Only last call fires after 200ms of no triggers`
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
      left = seen.get(ch) + 1;
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
    q: "Group anagrams — efficient solution",
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
// IEEE 754: 0.1 + 0.2 = 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true — fix`
  },
  {
    category: "Output Prediction",
    q: "console.log(typeof NaN) — what prints?",
    tags: ["accenture", "popular"],
    a: `// Output: "number"
// NaN is type Number (despite "Not-a-Number")
console.log(typeof NaN);     // "number"
console.log(NaN === NaN);    // false — NaN not equal to itself
console.log(Number.isNaN(NaN)); // true — correct check`
  },
  {
    category: "Output Prediction",
    q: "console.log([] == ![]) — what prints and why?",
    tags: ["accenture", "popular"],
    a: `// Output: true
// Step coercion: ![] → false, [] == false → "" == false → 0 == 0 → true
console.log([] == ![]);  // true
console.log([] === ![]); // false`
  },
  {
    category: "Output Prediction",
    q: "console.log(1 + '2' + '2') — output?",
    tags: ["accenture"],
    a: `// Output: "122"
// 1 + "2" → "12" (string concat), "12" + "2" → "122"
console.log(1 + "2" + "2"); // "122"`
  },
  {
    category: "Output Prediction",
    q: "console.log(1 + +'2' + '2') — output?",
    tags: ["accenture"],
    a: `// Output: "32"
// +"2" → 2 (unary plus), 1 + 2 → 3, 3 + "2" → "32"
console.log(1 + +"2" + "2"); // "32"`
  },
  {
    category: "Output Prediction",
    q: "console.log(3 > 2 > 1) — what prints?",
    tags: ["accenture", "popular"],
    a: `// Output: false
// 3 > 2 → true, true > 1 → 1 > 1 → false
console.log(3 > 2 > 1); // false
// Correct: (3 > 2 && 2 > 1) → true`
  },
  {
    category: "Output Prediction",
    q: "console.log(typeof typeof 1) — output?",
    tags: ["accenture"],
    a: `// Output: "string"
// typeof 1 → "number", typeof "number" → "string"
console.log(typeof typeof 1); // "string"`
  },
  {
    category: "Output Prediction",
    q: "[1, 2, 3].map(parseInt) — what does this return?",
    tags: ["accenture", "popular"],
    a: `// Output: [1, NaN, NaN]
// map passes (element, index) to parseInt
// parseInt(1, 0) → 1, parseInt(2, 1) → NaN, parseInt(3, 2) → NaN

// Fix:
console.log([1,2,3].map(num => parseInt(num))); // [1, 2, 3]
// or .map(Number)`
  },
  {
    category: "Output Prediction",
    q: "Closure loop — for(var i...) with setTimeout output?",
    tags: ["popular", "accenture"],
    a: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (all share same i)

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
    q: "console.log(1 && 2 || 0 && 3) — output?",
    tags: ["accenture"],
    a: `// Output: 2
// && higher precedence than ||
// 1 && 2 → 2, 0 && 3 → 0, 2 || 0 → 2
console.log(1 && 2 || 0 && 3); // 2`
  },
  {
    category: "Output Prediction",
    q: "console.log('5' - 3) vs console.log('5' + 3) — outputs?",
    tags: ["accenture"],
    a: `// Output: 2, "53", 10, NaN
console.log("5" - 3); // 2  (subtraction → numeric coercion)
console.log("5" + 3); // "53" (plus with string → concatenation)
console.log("5" * "2"); // 10 (multiplication forces numeric coercion)
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

"use strict";
x = 3.14; // ReferenceError

function show() {
  "use strict";
  console.log(this); // undefined
}`
  },
  {
    category: "Output Prediction",
    q: "console.log([] + {}) vs console.log({} + []) — outputs?",
    tags: ["accenture", "advanced"],
    a: `// Output: "[object Object]" (both cases)
console.log([] + {}); // "[object Object]"
// [].toString() = "" + {}.toString() = "[object Object]"

console.log({} + []); // "[object Object]"
// (or 0 in some contexts — {} as block, +[] = 0)`
  },

  // ─── HR & GENERAL ───────────────────────────────────────────
  {
    category: "HR & General",
    q: "Tell me about yourself — self-introduction",
    tags: ["accenture"],
    a: `// Structure: Present → Past → Future (tailor to resume)

"I'm Saurabh Dhull, a Senior Full Stack Developer with 3+ years
building scalable SaaS, real-time communication systems, and
AI-powered applications. I specialize in React, Next.js, Node.js,
Firebase, Redis, and multi-tenant architecture.

I've delivered systems supporting 1000+ active users and reduced
backend response times by 50% through Redis caching.

I'm excited about this opportunity because I want to work on
large-scale enterprise projects and continue growing at a
globally renowned organization."`
  },
  {
    category: "HR & General",
    q: "What are your strengths and weaknesses?",
    tags: ["accenture"],
    a: `// STRENGTHS (from resume):
// - Performance optimization (50% faster response)
// - AI integration (AI-powered workflow systems)
// - Full-stack capability (React + Node + DB)
// - Real-time systems (chat, 1000+ users)

// WEAKNESS:
"Sometimes I take too much ownership and hesitate to delegate.
I'm actively improving by trusting my team more and enabling
others rather than doing everything myself."`
  },
  {
    category: "HR & General",
    q: "Why do you want to work at Accenture?",
    tags: ["accenture"],
    a: `"Accenture offers exposure to cutting-edge tech and large-scale
enterprise projects across multiple domains. I'm drawn to the
continuous learning culture and the opportunity to work with
global teams solving complex business problems."`
  },
  {
    category: "HR & General",
    q: "Where do you see yourself in 5 years?",
    tags: ["accenture"],
    a: `"In 1-2 years, mastering Accenture's tech stack and contributing
at a high level. In 3-5 years, taking on technical leadership —
mentoring juniors, leading architecture, and becoming an SME
in modern web technologies. I want to grow into a Senior or
Lead Developer role."`
  },
  {
    category: "HR & General",
    q: "Why should we hire you?",
    tags: ["accenture"],
    a: `"You should hire me because I combine strong technical skills
with real-world delivery. I've built AI-powered systems,
real-time communication platforms, and mobile CRM solutions
— all serving 1000+ users with high performance. I write
clean code, I'm passionate about learning, and I'm looking
for a long-term career where I can make an impact day one."`
  },
  {
    category: "HR & General",
    q: "Explain a challenging project you worked on",
    tags: ["accenture"],
    a: `// Use STAR method: Situation, Task, Action, Result

"My most challenging project was an enterprise real-time chat
platform serving 1000+ active users across multiple tenants.
We needed live messaging, presence, push notifications, and
RBAC — all with sub-100ms latency.

I led frontend architecture with React + Firebase Realtime DB,
built Service Workers for push notifications, and implemented
multi-tenant data isolation.

Result: fully functional communication platform with reliable
real-time updates and 50% reduction in backend response times
through Redis caching."`
  },

  // ─── ADVANCED / MISC ───────────────────────────────────────
  {
    category: "Advanced / Misc",
    q: "What are Service Workers used for?",
    tags: ["advanced"],
    a: `// Service Worker = background script (separate thread)
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
    q: "Web Workers vs Service Workers — differences",
    tags: ["advanced"],
    a: `// Web Worker: CPU tasks in background thread
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
    q: "What is CORS and how do you fix it?",
    tags: ["popular"],
    a: `// CORS = Cross-Origin Resource Sharing
// Browser blocks requests from different origin (protocol+domain+port)

// Server must send headers:
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization

// Preflight (OPTIONS): sent before "non-simple" requests
// Dev fix: proxy server (CORS-anywhere or backend proxy)`
  },
  {
    category: "Advanced / Misc",
    q: "localStorage vs sessionStorage vs cookies — comparison",
    tags: ["popular", "accenture"],
    a: `// localStorage: persists until cleared, ~5-10MB, not sent to server
// sessionStorage: cleared when tab closes, ~5-10MB, not sent to server
// cookies: can persist, max 4KB, sent with every HTTP request

localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme")); // "dark"

// Cookie flags:
document.cookie = "token=abc; path=/; max-age=86400; HttpOnly; Secure; SameSite=Strict";`
  },
  {
    category: "Advanced / Misc",
    q: "What is the Symbol type used for in JS?",
    tags: ["advanced"],
    a: `// Symbol = unique, immutable primitive (ES6)
// Use: unique property keys, avoid name collisions

const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // false — always unique

const obj = { [sym1]: "secret", visible: "public" };
console.log(Object.keys(obj)); // ["visible"]
console.log(obj[sym1]); // "secret"`
  },
  {
    category: "Advanced / Misc",
    q: "What are Proxy and Reflect in JavaScript?",
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
    q: "Deep vs shallow comparison in React — what's the difference?",
    tags: ["react"],
    a: `// Shallow: compares references (===) — used by React.memo
// Deep: compares values recursively

const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false (different references)

// React.memo uses Object.is() (like ===, NaN-safe)
// Inline objects/arrays in JSX create new refs every render:
<Child data={{ x: 1 }} /> // new object each render — breaks memo

// Fix: memoize with useMemo/useCallback, or keep outside render`
  },

  // ─── NEW: CORE JS ──────────────────────────────────────────────
  {
    category: "Core JavaScript",
    q: "Optional chaining (?.) and Nullish coalescing (??) explained",
    tags: ["popular"],
    a: `// Optional chaining (?.) — safe nested property access, no error on missing
const user = { profile: { name: "John" } };
console.log(user?.profile?.name);  // "John"
console.log(user?.address?.city); // undefined (no error)

// Nullish coalescing (??) — RHS only when LHS is null/undefined
// Unlike || which treats all falsy values (0, '', false) as missing
const score = 0;
console.log(score || 100);  // 100 (0 is falsy)
console.log(score ?? 100);  // 0   (0 is NOT null/undefined)

const name = "";
console.log(name || "Guest");   // "Guest"
console.log(name ?? "Guest");   // ""`
  },
  {
    category: "Core JavaScript",
    q: "Promise combinators — all, allSettled, race, any differences",
    tags: ["advanced"],
    a: `// Promise.all — rejects fast on first rejection
// Promise.allSettled — waits for ALL to settle (resolve or reject)
// Promise.race — settles on first settled promise (resolve or reject)
// Promise.any — settles on first FULFILLED (rejects if ALL reject)

const p1 = Promise.resolve(1);
const p2 = Promise.reject("err");
const p3 = new Promise(r => setTimeout(() => r(3), 100));

// allSettled: returns [{status, value/reason}, ...]
Promise.allSettled([p1, p2, p3]).then(console.log);
// [{status:"fulfilled",value:1}, {status:"rejected",reason:"err"}, {status:"fulfilled",value:3}]

// race: first settled wins (could reject)
Promise.race([p1, p3]).then(console.log); // 1

// any: first fulfilled wins (ignores rejects)
Promise.any([p2, p3]).then(console.log); // 3

// Note: Promise.any rejects with AggregateError if ALL reject`
  },
  {
    category: "Core JavaScript",
    q: "Array flat(), flatMap(), at() — what do they do?",
    tags: ["popular"],
    a: `// flat(depth) — flattens nested arrays to specified depth
const nested = [1, [2, [3]]];
console.log(nested.flat());       // [1, 2, [3]] (default depth = 1)
console.log(nested.flat(2));      // [1, 2, 3]
console.log(nested.flat(Infinity)); // [1, 2, 3]

// flatMap — map + flat(1) in one pass
const arr = ["hello world", "foo bar"];
console.log(arr.flatMap(s => s.split(" "))); // ["hello", "world", "foo", "bar"]

// at(index) — access with negative indexing
const nums = [10, 20, 30, 40];
console.log(nums.at(-1));  // 40 (last)
console.log(nums.at(-2));  // 30`
  },
  {
    category: "Core JavaScript",
    q: "Useful Object methods — entries, values, fromEntries, hasOwn",
    tags: ["popular"],
    a: `// Object.entries(obj) → [[key, value], ...]
// Object.values(obj) → [value, ...]
// Object.fromEntries([[key, value], ...]) → {key: value}
// Object.hasOwn(obj, prop) → true/false (modern hasOwnProperty)

const user = { name: "John", age: 30 };

const entries = Object.entries(user);
console.log(entries); // [["name","John"], ["age",30]]

const back = Object.fromEntries(entries);
console.log(back); // {name: "John", age: 30}

// Filter object keys using entries + fromEntries
const filtered = Object.fromEntries(
  Object.entries(user).filter(([k]) => k !== "age")
);
console.log(filtered); // {name: "John"}

// hasOwn — safer than hasOwnProperty (works with Object.create(null))
console.log(Object.hasOwn(user, "name")); // true
console.log(Object.hasOwn(user, "toString")); // false`
  },
  {
    category: "Core JavaScript",
    q: "Logical assignment operators — &&=, ||=, ??= explained",
    tags: ["popular", "advanced"],
    a: `// Logical assignment combines logical operators with assignment (ES2021)
let a = 0, b = 5, c = null;

// ||= — assigns if LHS is falsy
a ||= 10;  // a = 10
console.log(a); // 10

// &&= — assigns if LHS is truthy
b &&= 20;  // b = 20
console.log(b); // 20

// ??= — assigns if LHS is null/undefined
c ??= 30;  // c = 30
console.log(c); // 30

// Practical: set defaults without overwriting valid falsy values
let retries = 0;
retries ??= 3;  // 0 is NOT nullish → stays 0 (correct)
// retries ||= 3 would incorrectly set to 3`
  },

  // ─── NEW: CODING CHALLENGES ─────────────────────────────────────
  {
    category: "Coding Challenges",
    q: "Valid Parentheses — check balanced brackets",
    tags: ["popular", "accenture"],
    a: `function isValid(s) {
  const stack = [];
  const pairs = { ")": "(", "}": "{", "]": "[" };

  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}

console.log(isValid("()[]{}")); // true
console.log(isValid("([)]"));   // false
// O(n) time, O(n) space`
  },
  {
    category: "Coding Challenges",
    q: "First non-repeating character in a string",
    tags: ["popular", "accenture"],
    a: `function firstNonRepeating(s) {
  const count = {};
  for (const ch of s) count[ch] = (count[ch] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}

console.log(firstNonRepeating("leetcode")); // 0 (l)
console.log(firstNonRepeating("aabb"));     // -1
// O(n) time, O(1) space`
  },
  {
    category: "Coding Challenges",
    q: "Maximum subarray sum — Kadane's Algorithm",
    tags: ["popular", "accenture", "advanced"],
    a: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
// O(n) time, O(1) space`
  },
  {
    category: "Coding Challenges",
    q: "Merge two sorted arrays",
    tags: ["popular", "accenture"],
    a: `function mergeSorted(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) result.push(arr1[i++]);
    else result.push(arr2[j++]);
  }

  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);

  return result;
}

console.log(mergeSorted([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
// O(n+m) time, O(n+m) space`
  },
  {
    category: "Coding Challenges",
    q: "Check if two strings are rotations of each other",
    tags: ["accenture"],
    a: `function areRotations(s1, s2) {
  if (s1.length !== s2.length) return false;
  return (s1 + s1).includes(s2);
}

console.log(areRotations("abcde", "cdeab")); // true
console.log(areRotations("abcde", "abced")); // false

// If s2 is a rotation of s1, s2 is always a substring of s1+s1`
  },

  // ─── NEW: OUTPUT PREDICTION ─────────────────────────────────────
  {
    category: "Output Prediction",
    q: "console.log(true + false) — output?",
    tags: ["accenture", "popular"],
    a: `// Output: 1
// true → 1, false → 0
console.log(true + false); // 1
console.log(true + true);  // 2`
  },
  {
    category: "Output Prediction",
    q: "console.log(!!'false' == !!'true') — output?",
    tags: ["accenture", "popular"],
    a: `// Output: true
// !!"false" = true (non-empty string is truthy)
// !!"true" = true, true == true → true
console.log(!!"false" == !!"true"); // true`
  },
  {
    category: "Output Prediction",
    q: "console.log(0 || '' || 'Hello' || undefined) — output?",
    tags: ["accenture"],
    a: `// Output: "Hello"
// || returns first TRUTHY value (short-circuit)
// 0→falsy, ""→falsy, "Hello"→truthy → stop
console.log(0 || "" || "Hello" || undefined); // "Hello"

// && returns first FALSY:
console.log(1 && "A" && null && "B"); // null`
  },
  {
    category: "Output Prediction",
    q: "console.log([...'hello']) — output?",
    tags: ["accenture", "popular"],
    a: `// Output: ["h", "e", "l", "l", "o"]
// Spread on string iterates characters
console.log([..."hello"]); // ["h", "e", "l", "l", "o"]

// Works with emoji too:
console.log([..."😀👍"]); // ["😀", "👍"]`
  },
  {
    category: "Output Prediction",
    q: "console.log(3 + 4 + '5') — output?",
    tags: ["accenture"],
    a: `// Output: "75"
// Left-to-right: 3 + 4 = 7, then 7 + "5" = "75"
console.log(3 + 4 + "5"); // "75"

// Compare:
console.log("5" + 3 + 4); // "534"`
  },
  {
    category: "Output Prediction",
    q: "isNaN vs Number.isNaN — what's the difference?",
    tags: ["accenture"],
    a: `// Output: true, true, true, false
console.log(Number.isNaN(NaN));  // true — strict (only NaN)
console.log(isNaN(NaN));         // true — coerces first

console.log(isNaN("hello"));         // true — coerces to NaN
console.log(Number.isNaN("hello"));  // false — no coercion

// Rule: use Number.isNaN() for reliable check`
  },

  // ─── NAMASTE JAVASCRIPT — Akshay Saini ─────────────────────────
  // Season 1: JS Fundamentals
  {
    category: "Namaste JS",
    q: "How does Execution Context work in JavaScript?",
    tags: ["namaste-js", "season1", "popular"],
    a: `// Execution Context = environment where JS code is evaluated
// Two phases: Creation + Execution

// Global EC created when JS starts:
// 1. Creation: window object, this=window, vars hoisted (undefined), functions stored
// 2. Execution: code runs line by line, values assigned

// Call Stack manages ECs (LIFO):
// [global EC] → [foo() EC] → [bar() EC] → pops when done

console.log(a); // undefined (hoisted in creation phase)
var a = 10;
console.log(a); // 10

// Each function call gets its own EC with:
// - Variable Environment (local memory)
// - Lexical Environment (scope chain reference)`
  },
  {
    category: "Namaste JS",
    q: "Hoisting — what gets hoisted and what doesn't",
    tags: ["namaste-js", "season1", "popular"],
    a: `// Hoisting = declarations moved to top of scope during creation phase

// 1. var — hoisted with undefined
console.log(x); // undefined
var x = 5;

// 2. function declaration — fully hoisted
sayHi(); // "Hi!"
function sayHi() { console.log("Hi!"); }

// 3. let/const — hoisted but uninitialized (TDZ)
// console.log(y); // ReferenceError
let y = 10;

// 4. function expression — NOT hoisted (treated as variable)
var greet = function() { console.log("Hey"); };
// greet(); // TypeError if called before declaration

// Key: only var declarations and function declarations usable before definition`
  },
  {
    category: "Namaste JS",
    q: "Scope Chain and Lexical Environment — explain",
    tags: ["namaste-js", "season1", "popular"],
    a: `// Lexical Environment = Local Memory + Lexical Parent Reference
// Scope Chain = chain of Lexical Environments

// Function can access: own vars, parent's vars, global vars

function outer() {
  const a = 10;

  function inner() {
    const b = 20;
    console.log(a + b); // 30 — inner accesses 'a' from outer
  }

  inner();
}
outer();

// Scope resolution:
// inner's scope → outer's scope → global scope
// JS walks up until found or ReferenceError

// Lexical Parent = where function is physically defined, NOT where called`
  },
  {
    category: "Namaste JS",
    q: "Block Scope and Shadowing in JavaScript",
    tags: ["namaste-js", "season1"],
    a: `// Block = { } — creates scope for let/const (NOT for var)

{
  var a = 10;   // scoped to function/global
  let b = 20;   // block scoped
  const c = 30; // block scoped
}
console.log(a); // 10 — accessible
// console.log(b); // ReferenceError

// Shadowing — inner variable with same name as outer
let x = 100;
{
  let x = 200; // shadows outer x
  console.log(x); // 200
}
console.log(x); // 100

// var ignores block scope:
var y = 50;
{
  var y = 60; // affects outer y
}
console.log(y); // 60

// Illegal: let outer, var inner → error`
  },
  {
    category: "Namaste JS",
    q: "Closures in depth — what, why, practical use cases",
    tags: ["namaste-js", "season1", "popular"],
    a: `// Closure = function bundled with its lexical environment
// Inner function "remembers" outer vars even after outer returns

function createCounter() {
  let count = 0; // persists in closure
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Practical uses:
// 1. Data privacy / encapsulation
// 2. Module pattern
// 3. Function factories (currying)
// 4. Memoization
// 5. setTimeout loop fix

// Classic interview:
for (var i = 1; i <= 3; i++) {
  setTimeout(function() { console.log(i); }, i * 1000);
}
// Output: 4, 4, 4

// Fix with IIFE:
for (var i = 1; i <= 3; i++) {
  (function(j) {
    setTimeout(function() { console.log(j); }, j * 1000);
  })(i);
}
// Output: 1, 2, 3`
  },
  {
    category: "Namaste JS",
    q: "Function Statement vs Expression vs Declaration",
    tags: ["namaste-js", "season1"],
    a: `// Function Statement (Declaration) — hoisted
function greet() { console.log("Hello"); }

// Function Expression — stored in variable, NOT hoisted
const greet2 = function() { console.log("Hi"); };

// Anonymous Function — function without name
const add = function(a, b) { return a + b; };

// Named Function Expression
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1); // named for recursion
};
// 'fact' accessible only inside function body

// First Class Functions — JS treats functions as values:
// 1. Assign to variable
// 2. Pass as argument
// 3. Return from function`
  },
  {
    category: "Namaste JS",
    q: "First Class Functions vs Callback Functions",
    tags: ["namaste-js", "season1", "popular"],
    a: `// First Class Functions = functions treated as values

// 1. Assign to variable:
const fn = function() { console.log("assigned"); };

// 2. Pass as argument (Callback):
function process(arr, callback) {
  for (let i = 0; i < arr.length; i++) callback(arr[i]);
}
process([1, 2, 3], console.log);

// 3. Return from function (Higher-Order):
function multiplyBy(factor) {
  return function(number) { return number * factor; };
}
const double = multiplyBy(2);
console.log(double(5)); // 10

// Callbacks: sync (forEach, map) or async (setTimeout, fetch)
// Callback queue stores async callbacks
// Event loop moves them to call stack when empty`
  },
  {
    category: "Namaste JS",
    q: "Event Loop — explain the complete picture",
    tags: ["namaste-js", "season1", "popular"],
    a: `// JS single-threaded, non-blocking via Event Loop
// Components: Call Stack, Web APIs, Callback Queue, Microtask Queue

// 1. Call Stack — executes synchronous code (LIFO)
// 2. Web APIs — browser provides (DOM, setTimeout, fetch)
// 3. Callback Queue — macrotasks (setTimeout, setInterval, DOM events)
// 4. Microtask Queue — higher priority (Promise.then, MutationObserver)

// Execution order:
// 1. All sync code
// 2. ALL microtasks
// 3. ONE macrotask
// 4. Repeat

console.log("1");                        // sync
setTimeout(() => console.log("2"), 0);    // macrotask
Promise.resolve().then(() => console.log("3")); // microtask
console.log("4");                        // sync

// Output: 1, 4, 3, 2`
  },
  {
    category: "Namaste JS",
    q: "setTimeout — trust issues and how it really works",
    tags: ["namaste-js", "season1"],
    a: `// setTimeout guarantees MINIMUM delay, not exact timing
// Waits for call stack empty + callback queue to reach it

// Trust issue 1: Timer starts AFTER current execution
console.log("start");
setTimeout(() => console.log("timeout"), 0);
let i = 0;
while (i < 1000000000) i++; // blocks ~1s
console.log("end");
// Output: start, end, timeout (timeout waited for while loop!)

// Trust issue 2: Nested setTimeout minimum delay (4ms after 5 levels)

// Trust issue 3: setTimeout + closure with var
for (var i = 1; i <= 3; i++) {
  setTimeout(function() { console.log(i); }, i * 1000);
}
// Output: 4, 4, 4 — all see same i
// Fix: use let (block scoped) or IIFE closure`
  },
  {
    category: "Namaste JS",
    q: "Promises and Async/Await — in-depth explanation",
    tags: ["namaste-js", "season1", "popular"],
    a: `// Promise = object for eventual completion/failure of async operation
// States: pending → fulfilled / rejected

const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data loaded"), 1000);
});

promise
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log("Done"));

// Chaining:
fetch("/api/user")
  .then(res => res.json())
  .then(user => fetch("/api/orders/" + user.id))
  .then(res => res.json())
  .then(orders => console.log(orders))
  .catch(err => console.error("Any failure", err));

// Async/Await — sugar over Promises
async function getOrders() {
  try {
    const res = await fetch("/api/user");
    const user = await res.json();
    const ordersRes = await fetch("/api/orders/" + user.id);
    return await ordersRes.json();
  } catch (err) {
    console.error(err);
  }
}

// await only inside async function
// async function always returns a Promise`
  },
  {
    category: "Namaste JS",
    q: "'this' keyword in different contexts explained",
    tags: ["namaste-js", "season1", "popular"],
    a: `// 'this' depends on HOW a function is called

// 1. Global → window
console.log(this); // window

// 2. Regular function → window (undefined in strict)
function show() { console.log(this); }
show(); // window

// 3. Object method → the object
const obj = { name: "JS", show() { console.log(this.name); } };
obj.show(); // "JS"

// 4. Arrow function → inherits from parent (lexical this)
const obj2 = {
  name: "Test",
  show: () => console.log(this.name) // this = window
};

// 5. Event handler → the element
button.addEventListener("click", function() {
  console.log(this); // button element
});

// 6. Constructor → new instance
function Person(n) { this.name = n; }
const p = new Person("John");
console.log(p.name); // "John"`
  },
  {
    category: "Namaste JS",
    q: "call, apply, bind — detailed explanation",
    tags: ["namaste-js", "season1", "popular"],
    a: `// call(thisArg, arg1, arg2...) — invoked immediately, args individually
function greet(greeting) {
  return greeting + ", " + this.name;
}
const user = { name: "John" };
console.log(greet.call(user, "Hello")); // "Hello, John"

// apply(thisArg, [argsArray]) — invoked immediately, args as array
console.log(greet.apply(user, ["Hi"])); // "Hi, John"

// bind(thisArg, arg1...) — returns NEW function, NOT invoked
const boundGreet = greet.bind(user, "Hey");
console.log(boundGreet()); // "Hey, John"

// Method borrowing:
const arr = [1, 2, 3];
const max = Math.max.apply(null, arr); // old
const max2 = Math.max(...arr);         // modern

// Polyfill of bind:
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...moreArgs) {
    return fn.apply(context, [...args, ...moreArgs]);
  };
};`
  },
  {
    category: "Namaste JS",
    q: "Prototypal Inheritance and the Prototype Chain",
    tags: ["namaste-js", "season1", "advanced"],
    a: `// Every JS object has hidden [[Prototype]] (__proto__)
// Property lookup walks prototype chain until found or null

const animal = { eats: true };
const rabbit = { jumps: true };
rabbit.__proto__ = animal;

console.log(rabbit.jumps); // true (own)
console.log(rabbit.eats);  // true (inherited)

// Constructor functions:
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  return "Hi, I'm " + this.name;
};

const john = new Person("John");
console.log(john.sayHello()); // "Hi, I'm John"

// 'new' keyword:
// 1. Creates empty object {}
// 2. Links [[Prototype]] to Person.prototype
// 3. 'this' points to new object
// 4. Returns object (unless function returns object)

// Prototype chain:
// john → Person.prototype → Object.prototype → null`
  },
  {
    category: "Namaste JS",
    q: "Higher-Order Functions — map, filter, reduce explained",
    tags: ["namaste-js", "season2", "popular"],
    a: `// Higher-Order Functions = functions that take/return other functions

const nums = [1, 2, 3, 4, 5];

// map — transform each element
const doubled = nums.map(n => n * 2);  // [2, 4, 6, 8, 10]

// filter — keep elements passing test
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// reduce — accumulate into single value
const sum = nums.reduce((acc, n) => acc + n, 0); // 15

// Chaining:
const result = nums
  .filter(n => n > 2)
  .map(n => n * 10)
  .reduce((a, b) => a + b, 0);
console.log(result); // 120

// Polyfill for map:
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};`
  },
  {
    category: "Namaste JS",
    q: "Debouncing and Throttling — implement both",
    tags: ["namaste-js", "season2", "popular"],
    a: `// DEBOUNCE — fires AFTER user stops triggering for N ms
// Use: search input, auto-save, resize

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// THROTTLE — fires at most ONCE every N ms
// Use: scroll, mousemove, game loop

function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Key: Debounce = "wait until pause", Throttle = "pace execution"`
  },
  {
    category: "Namaste JS",
    q: "How does currying work in JavaScript?",
    tags: ["namaste-js", "season2", "advanced"],
    a: `// Currying = transform f(a,b,c) → f(a)(b)(c)
// Uses closures to remember arguments

// Manual:
function multiply(a) {
  return function(b) { return a * b; };
}
const double = multiply(2);
console.log(double(5)); // 10

// Arrow:
const curry = (a) => (b) => (c) => a + b + c;
console.log(curry(1)(2)(3)); // 6

// Currying with bind:
function sum(a, b, c) { return a + b + c; }
const add5 = sum.bind(null, 5);
console.log(add5(3, 2)); // 10

// Uses: partial application, specialized functions, event handlers

// Infinite currying — sum(1)(2)(3)...()
function infiniteSum(a) {
  return function(b) {
    return b !== undefined ? infiniteSum(a + b) : a;
  };
}
console.log(infiniteSum(1)(2)(3)(4)()); // 10`
  },
  {
    category: "Namaste JS",
    q: "Polyfills — implement your own bind, map, filter, reduce",
    tags: ["namaste-js", "season2", "popular"],
    a: `// Polyfill for Function.prototype.bind:
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...moreArgs) {
    return fn.apply(context, [...args, ...moreArgs]);
  };
};

// Polyfill for Array.prototype.map:
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// Polyfill for Array.prototype.filter:
Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) result.push(this[i]);
  }
  return result;
};

// Polyfill for Array.prototype.reduce:
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  if (arguments.length < 2) {
    accumulator = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};`
  },
  {
    category: "Namaste JS",
    q: "Error Handling — try/catch/finally and custom errors",
    tags: ["namaste-js", "season2"],
    a: `// try — wrap risky code
// catch — handle error
// finally — ALWAYS runs (cleanup)

try {
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("Something went wrong:", error.message);
} finally {
  console.log("Cleanup — always runs");
}

// Custom errors:
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

function fetchData() {
  throw new NetworkError("Server unreachable", 503);
}

try {
  fetchData();
} catch (err) {
  if (err instanceof NetworkError) {
    console.log(\`Network: \${err.statusCode} - \${err.message}\`);
  } else {
    throw err; // rethrow unknown
  }
}

// Async error handling:
async function getData() {
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new NetworkError("Bad response", res.status);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    return null;
  }
}`
  },
  {
    category: "Namaste JS",
    q: "Generator Functions and Iterators explained",
    tags: ["namaste-js", "season2", "advanced"],
    a: `// Generator = function that can be paused/resumed with yield
// Returns iterator with .next() and .return()

function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Infinite generator:
function* idMaker() {
  let id = 0;
  while (true) yield id++;
}
const ids = idMaker();
console.log(ids.next().value); // 0
console.log(ids.next().value); // 1

// Uses: custom iterators, infinite sequences, redux-saga, lazy eval

// Async generator:
async function* fetchPages(urls) {
  for (const url of urls) {
    yield await fetch(url).then(r => r.json());
  }
}

for await (const page of fetchPages(["/api/1", "/api/2"])) {
  console.log(page);
}`
  },
];
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
    "Advanced / Misc": "#a5b4fc",
    "Namaste JS": "#fbbf24"
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

  // Separator
  const sep = document.createElement("div");
  sep.style.cssText = "height:1px;background:var(--border);margin:4px 0;";
  tagFilters.appendChild(sep);

  // Category quick filters
  const quickCats = ["Coding Challenges", "Output Prediction", "Advanced / Misc"];
  quickCats.forEach(cat => {
    const count = questions.filter(q => q.category === cat).length;
    const btn = document.createElement("button");
    btn.className = "cat-item";
    const dotColor = DOT_COLORS[cat] || "#64748b";
    btn.innerHTML = `<span class="dot" style="background:${dotColor}"></span>${cat} <span class="count">${count}</span>`;
    btn.dataset.filter = cat;
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
    document.getElementById("totalStats").textContent = `${questions.length} questions`;

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

    if (!quizMode) {
      container.innerHTML = html;
      container.querySelectorAll(".question").forEach(el => {
        el.addEventListener("click", function() {
          const item = this.parentElement;
          item.classList.toggle("open");
        });
      });
    }
  }

  function formatAnswer(a) {
    return a.split("\n").map(line => {
      const t = line.trim();
      if (t.startsWith("//")) return `<span class="comment">${line}</span>`;
      return line;
    }).join("\n");
  }

  // ─── QUIZ MODE ───
  let quizMode = false;
  let quizIndex = 0;
  let quizQuestions = [];

  const startQuizBtn = document.getElementById("startQuizBtn");
  const exitQuizBtn = document.getElementById("exitQuizBtn");
  const quizView = document.getElementById("quizView");
  const quizQuestionText = document.getElementById("quizQuestionText");
  const quizAnswer = document.getElementById("quizAnswer");
  const quizProgress = document.getElementById("quizProgress");
  const quizCategory = document.getElementById("quizCategory");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function getFilteredQuestions() {
    return questions.filter(q => {
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
  }

  function startQuiz() {
    quizQuestions = getFilteredQuestions();
    if (quizQuestions.length === 0) return;
    quizMode = true;
    quizIndex = 0;
    container.style.display = "none";
    quizView.style.display = "block";
    showQuizQuestion();
  }

  function exitQuiz() {
    quizMode = false;
    quizView.style.display = "none";
    container.style.display = "block";
  }

  function showQuizQuestion() {
    const q = quizQuestions[quizIndex];
    quizQuestionText.innerHTML = q.q;
    quizAnswer.innerHTML = `<pre>${formatAnswer(q.a)}</pre>`;
    quizProgress.textContent = `${quizIndex + 1} / ${quizQuestions.length}`;
    quizCategory.textContent = q.category;
    prevBtn.disabled = quizIndex === 0;
    nextBtn.textContent = quizIndex === quizQuestions.length - 1 ? "Finish" : "Next \u2192";
    prevBtn.style.opacity = quizIndex === 0 ? "0.4" : "1";
  }

  if (startQuizBtn) {
    startQuizBtn.addEventListener("click", startQuiz);
  }

  if (exitQuizBtn) {
    exitQuizBtn.addEventListener("click", exitQuiz);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function() {
      if (quizIndex > 0) { quizIndex--; showQuizQuestion(); }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function() {
      if (quizIndex < quizQuestions.length - 1) {
        quizIndex++;
        showQuizQuestion();
      } else {
        exitQuiz();
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", function(e) {
    if (!quizMode) return;
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") exitQuiz();
  });

  // Re-bind start quiz when filters change
  const origApplyFilter = applyFilter;
  applyFilter = function(filter) {
    origApplyFilter(filter);
    if (quizMode) {
      quizQuestions = getFilteredQuestions();
      quizIndex = 0;
      if (quizQuestions.length > 0) showQuizQuestion();
      else exitQuiz();
    }
  };

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

  document.querySelectorAll(".cat-item").forEach(el => {
    el.addEventListener("click", closeSidebar);
  });
})();
