
## 1. What are some best practices for CI/CD when working with Node.js applications?

When working with **Node.js** applications in a **CI/CD (Continuous Integration / Continuous Deployment)** environment, adopting best practices ensures stability, speed, security, and smooth delivery. Here's a practical list of CI/CD best practices tailored to Node.js:

---

### ✅ 1. **Project Structure & Code Quality**

* **Follow a consistent project structure** (e.g., `src/`, `test/`, `config/`, `scripts/`)
* Use a **code linter** like ESLint with consistent style rules.
* Run **Prettier** to auto-format code.
* Use **TypeScript** (or at least JSDoc) for type safety in large projects.

---

### ✅ 2. **Automated Testing**

* Write **unit tests** (e.g., with `Jest`, `Mocha`, or `Vitest`).
* Add **integration tests** to test APIs, DB interactions, etc.
* Run tests on every commit or PR in the pipeline.
* Maintain high test coverage (use tools like `nyc` or `c8`).

---

### ✅ 3. **Environment Configuration**

* Use `.env` files and **dotenv** package (never commit them).
* Manage secrets with tools like:

  * GitHub Actions Secrets
  * HashiCorp Vault
  * AWS Secrets Manager

---

### ✅ 4. **Dependency Management**

* Use **exact versions** in `package-lock.json`.
* Run `npm audit` in your pipeline to catch vulnerable dependencies.
* Use **`npm ci`** in CI (faster and more reliable than `npm install`).
* Clean up unused packages regularly.

---

### ✅ 5. **CI/CD Pipeline Configuration**

#### Tools:

* GitHub Actions, GitLab CI, CircleCI, Jenkins, Bitbucket Pipelines

#### Key Steps:

1. **Checkout code** from repo
2. **Install dependencies** (`npm ci`)
3. **Lint the code** (`eslint .`)
4. **Run tests** (`npm test`)
5. **Check coverage**
6. **Build the app** (`npm run build`)
7. **Security scans** (`npm audit`, `snyk`)
8. **Deploy** to staging/production

---

### ✅ 6. **Build & Versioning**

* Auto-increment versions using `semantic-release` or manually via `npm version`.
* Include commit hash or build number in the build metadata.
* Separate **build** from **deployment** stages in CI.

---

### ✅ 7. **Deployment Best Practices**

* Use **zero-downtime deployment** (e.g., blue-green deployments).
* Containerize your app using Docker.
* Use environment-specific configs (dev/staging/prod).
* Prefer **rolling updates** or **canary releases**.
* Automate **rollback on failure**.

---

### ✅ 8. **Monitoring & Alerts**

* Log to stdout/stderr; aggregate logs via tools like:

  * ELK Stack
  * Datadog
  * Loggly
* Set up health checks (`/healthz`, `/readyz`)
* Add alerts for build/deploy/test failures.

---

### ✅ 9. **Branching Strategy**

* Use **Git flow**, **Trunk-based**, or **Feature branch** strategies.
* Protect the `main` branch: require PR reviews, CI passing checks.

---

### ✅ 10. **Security**

* Run `npm audit` or `snyk test` in CI.
* Avoid hardcoding secrets or credentials.
* Limit access to CI/CD tools.
* Sign builds or use checksum validation for deployments.

---

### ✅ Example: GitHub Actions CI Workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build

```

## 2. How would you use JWT (JSON Web Tokens) for stateless authentication?

To use **JWT (JSON Web Tokens)** for **stateless authentication**, follow these steps:
```
1. User Login & Token Generation
2. Send Token to Client
3. Client Stores the Token
4. Client Sends Token with Requests
5. Backend Verifies Token
6. Statelessness
7. Token Expiry & Refresh

Note: 
1. For all scanario use 403(Missing token, expired token, invalid token).
2. User is logged in, but trying to access an admin-only route.
```
---
## 3. What are some strategies for securing API routes in a Node.js/Express application?
Here are some **key strategies** to secure API routes in a **Node.js/Express** application:

#### ✅ **Authentication**

* Use **JWT** or **OAuth2** to verify the user's identity.
* Protect routes with middleware:

```js
app.use('/api/protected', authMiddleware, protectedRouteHandler);
```

#### ✅ **Authorization**

* Check **user roles/permissions** before allowing access:

```js
if (req.user.role !== 'admin') {
  return res.status(403).json({ message: 'Access denied' });
}
```

#### ✅ **Input Validation & Sanitization**

* Use `express-validator` or `Joi` to validate and sanitize inputs to avoid injection attacks.

#### ✅ **Rate Limiting**

* Prevent abuse or brute-force attacks with `express-rate-limit`:

```js
const rateLimit = require('express-rate-limit');
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

#### ✅ **CORS Protection**

* Only allow trusted origins:

```js
app.use(cors({ origin: 'https://yourdomain.com' }));
```

#### ✅ **HTTPS Only**

* Use **HTTPS** to encrypt all requests.
* Redirect HTTP to HTTPS in production.

#### ✅ **Helmet for Secure Headers**

* Use `helmet` to set HTTP headers that prevent attacks:

```js
const helmet = require('helmet');
app.use(helmet());
```

#### ✅ **CSRF Protection (for cookies-based auth)**

* Use `csurf` middleware if using sessions or cookies.

#### ✅ **Hide Tech Stack**

* Remove or modify the `X-Powered-By` header:

```js
app.disable('x-powered-by');
```

#### ✅ **Logging & Monitoring**

* Log access and errors.
* Use tools like `morgan`, `winston`, or external platforms (Datadog, Sentry).

---
## 4. What is middleware in Node.js?
```
Middleware is the function that works between the request and response cycle. Middleware gets execute after the server received the request and before the controller send the response.
```

## 5. Buffer vs Streams
Here are the **main types of middleware** in **Node.js/Express**:

#### ✅ **Application-Level Middleware**

* Applied to all or specific routes using `app.use()` or `app.METHOD()`.

```js
app.use((req, res, next) => {
  console.log('App-level middleware');
  next();
});
```

#### ✅ **Router-Level Middleware**

* Similar to app-level but bound to an `express.Router()`.

```js
const router = express.Router();
router.use((req, res, next) => {
  console.log('Router-level middleware');
  next();
});
```
#### ✅ **Built-in Middleware**

* Provided by Express:

  * `express.json()` – Parse JSON request bodies
  * `express.urlencoded()` – Parse URL-encoded data
  * `express.static()` – Serve static files

```js
app.use(express.json());
```

#### ✅  **Third-Party Middleware**

* Installed via npm for common tasks:

  * `morgan` – logging
  * `cors` – CORS handling
  * `helmet` – security headers
  * `express-session`, `cookie-parser`, etc.

```js
const cors = require('cors');
app.use(cors());
```
#### ✅ **Error-Handling Middleware**

* Must have 4 arguments: `(err, req, res, next)`
* Used to catch and handle errors globally

```js
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

#### ✅ **Custom Middleware**

* Your own logic: auth, logging, timing, etc.

```js
function authMiddleware(req, res, next) {
  if (!req.headers.authorization) return res.sendStatus(401);
  next();
}
```
---

## 6. What is Streams? Type of streams in NodeJS
Streams are a powerful way to handle data in chunks, rather than loading it all into memory at once. They allow efficient, non-blocking processing of large data—ideal for files, network operations, or real-time data.

Here’s a refined and complete version of your answer with the types of streams included:

---

### ✅ **What is Streams in Node.js?**

**Streams** are a powerful way to handle **data in chunks**, rather than loading it all into memory at once. They allow **efficient, non-blocking** processing of large data—ideal for files, network operations, or real-time data.

### 📚 **Types of Streams in Node.js**

1. **Readable Stream**

   * Used to **read** data (e.g., `fs.createReadStream()`)
   * Emits: `data`, `end`, `error`

2. **Writable Stream**

   * Used to **write** data (e.g., `fs.createWriteStream()`)
   * Methods: `write()`, `end()`

3. **Duplex Stream**

   * Can **read and write** (e.g., `net.Socket`)

4. **Transform Stream**

   * Duplex + can **modify data** (e.g., `zlib.createGzip()`)

---

## 7. How does the worker_threads module differ from the cluster module, and when would you use one over the other?

## 8. How would you implement a secure API in Node.js? What best practices would you follow for authentication, authorization.
Here's a **clear and simple answer** on how to implement a **secure API in Node.js**, with **authentication and authorization best practices**:

#### 🔒 Use HTTPS

* Always serve your API over **HTTPS** to encrypt data in transit.

#### 🔑 Implement Authentication

* Use **JWT (JSON Web Tokens)** for stateless auth.
* On login, generate a token and send it to the client.
* On each request, **verify the token** in a middleware.

```js
// Sample JWT middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
```

#### 🔐 Add Authorization

* Check **user roles/permissions** before allowing access to protected routes.

```js
function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
}
```

#### 🛡️ Secure Input Handling

* Use **input validation and sanitization** (`express-validator`, `Joi`) to prevent injection attacks.

#### 🚫 Protect Against Common Attacks

* Use `helmet` to set secure HTTP headers.
* Use `cors()` to restrict origins.
* Use `express-rate-limit` to prevent brute-force attacks.

#### 📁 Hide Sensitive Info

* Never expose `.env` or secrets in client responses.
* Use `dotenv` and environment variables for configs.

#### 🧪 Logging and Monitoring

* Log all failed attempts.
* Monitor APIs for suspicious activity using tools like `winston`, Sentry, or Datadog.

---
## 9. What are common security vulnerabilities in Node.js applications, and how would you mitigate them (e.g., SQL Injection, XSS, CSRF)?
 
## 10. Can you explain the difference between readable and writable streams in Node.js?

## 11. In Node.js, what is the best practice for error handling in asynchronous code?

#### 1. **Use `try/catch` with `async/await`**

```js
async function getData() {
  try {
    const result = await someAsyncTask();
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
  }
}
```

#### 2. **Use `.catch()` for Promises**

```js
someAsyncTask()
  .then(result => console.log(result))
  .catch(err => console.error('Error:', err.message));
```

#### 3. **Use Centralized Error-Handling Middleware (Express)**

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});
```

#### 4. **Avoid Unhandled Promise Rejections**

* Always handle `.catch()` or use `try/catch`.
* Use a global handler in production:

```js
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
```

#### 5. **Create Custom Error Classes (Optional)**

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```
---

## 12 package.json vs package.lock.json
package.json
```
package.json is a metadata file that contains project-specific information such as dependencies, version, scripts, and configuration settings required to manage, build, and run a Node.js project.
```
package-lock.json
```
package-lock.json is an auto-generated file that records the exact versions of installed dependencies, ensuring consistent installs across different environments.
```

## 16. What are some of the core modules in Node.js?

## 17. What is npm in Node.js?

## 18. Describe the fs module and how to use it to interact with the file system (e.g., reading, writing files).

The `fs` (File System) module is a **built-in Node.js module** that allows you to **interact with the file system**, such as **reading**, **writing**, **updating**, and **deleting files** and directories.

---

### 🧰 **How to Use `fs` (Examples)**

#### 📖 1. **Read a File (Async)**

```js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

---

#### ✍️ 2. **Write to a File (Async)**

```js
fs.writeFile('output.txt', 'Hello, world!', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});
```

---

#### 📦 3. **Append to a File**

```js
fs.appendFile('log.txt', 'New log entry\n', (err) => {
  if (err) throw err;
});
```

---

#### ❌ 4. **Delete a File**

```js
fs.unlink('old.txt', (err) => {
  if (err) throw err;
  console.log('File deleted');
});
```

---

### 🔄 Sync vs Async

* `fs.readFile()` – **Async (non-blocking)**
* `fs.readFileSync()` – **Sync (blocking)**
---

## 19. What is a package manager in Node.js, and what are some commonly used ones?


## 20. Discuss npm (Node Package Manager) and Yarn, and explain their role in managing dependencies in a Node.js project.

## 21. How would you create a simple HTTP server in Node.js?
```
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set status and headers
  res.end('Hello, World!'); // Send response
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

```

## 22. Can you explain the role of npm in managing dependencies in Node.js? What strategies do you use to ensure that dependencies are up-to-date and secure?

### ✅ **1. Callbacks**

* Basic and traditional approach
* Pass a function to be called when the task completes

```js
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

🧠 *Cons:* Can lead to **callback hell** and harder to manage.

### ✅ **2. Promises**

* Clean, readable way to handle async tasks
* Supports `.then()` and `.catch()`

```js
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### ✅ **3. async/await**

* Built on Promises
* Allows writing async code like it's synchronous
* Use `try/catch` for error handling

```js
async function loadData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### ✅ **4. Event Emitters**

* Useful for long-running or custom asynchronous workflows
* Emit and listen for events

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('done', data => console.log('Finished:', data));
emitter.emit('done', 'Task completed!');
```

### ✅ **5. Streams**

* Handle large data asynchronously in chunks (e.g., files, network)

```js
const fs = require('fs');
fs.createReadStream('bigfile.txt')
  .on('data', chunk => console.log('Chunk:', chunk));
```

---

### 🔁 Summary

| Strategy     | Best For                          |
| ------------ | --------------------------------- |
| Callbacks    | Simple, small tasks               |
| Promises     | Cleaner chaining, async flow      |
| async/await  | Readable, linear async logic      |
| EventEmitter | Event-based or pub/sub patterns   |
| Streams      | Handling large or continuous data |

---
## 24. Describe what a callback function is and how it is used in asynchronous operations.
### ✅ **What is a Callback Function in Node.js?**

A **callback function** is a **function passed as an argument** to another function, which is **executed after the task is complete**, especially in **asynchronous operations**.
### 📖 **Example: Using a Callback with `fs.readFile()`**

```js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) return console.error('Error:', err);
  console.log('File content:', data);
});
```

* `readFile` starts reading the file.
* The callback is **called later**, once the file is read (or an error occurs).
* This keeps the app **non-blocking** and efficient.

### 🔁 Summary

| Feature | Description                         |
| ------- | ----------------------------------- |
| Purpose | Handle result of an async operation |
| Timing  | Runs **after** the task completes   |
| Benefit | Keeps Node.js apps **non-blocking** |

---
## 25. What is the difference between process.nextTick(), setImmediate(), and setTimeout() in Node.js?

### 🕐 **1. `process.nextTick()`**

* Executes **after the current operation**, **before** the event loop continues.
* Used to **queue microtasks**.

```js
process.nextTick(() => {
  console.log('nextTick');
});
```

📌 **Executes first**, even before `setTimeout()` or `setImmediate()`.

### 🕑 **2. `setImmediate()`**

* Executes **in the next iteration** (tick) of the **event loop**.
* Useful for **I/O-heavy callbacks**.

```js
setImmediate(() => {
  console.log('setImmediate');
});
```

📌 **Fires after I/O events**, and after `nextTick`.


### 🕒 **3. `setTimeout(fn, 0)`**

* Executes after at least a **minimum delay**, typically in the **next event loop cycle**.
* Delay is not guaranteed to be exactly 0.

```js
setTimeout(() => {
  console.log('setTimeout');
}, 0);
```

📌 Slightly **slower than `setImmediate()`** in some cases.

---

## 27. Write a basic example of using the http module to create a simple web server.

### ✅ **Simple HTTP Server Example**

```js
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response
  res.end('Hello, World!');
});

// Start listening on port 3000
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

### 🧠 What It Does:

* Creates a server that listens on **port 3000**
* Responds with `"Hello, World!"` to any request

---
## 28. What is the use of async and await in Node.js?

`async` and `await` are used to **handle asynchronous operations** in a cleaner, more readable way — like synchronous code — without chaining `.then()` or using callbacks.

### 📌 **Key Points:**

* `async` makes a function return a **Promise**.
* `await` pauses the function execution until the **Promise is resolved or rejected**.

### 📖 **Example:**

```js
function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Data loaded"), 1000);
  });
}

async function getData() {
  const result = await fetchData();
  console.log(result); // Output: Data loaded
}

getData();
```


### 🎯 **Benefits:**

* Simplifies async code
* Avoids **callback hell**
* Easier to read and maintain than `.then()` chains

---
## 29. What is the difference between synchronous and asynchronous programming?

### ✅ **Difference Between Synchronous and Asynchronous Programming**

**Synchronous:**

```js
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data); // Waits until file is fully read
```

**Asynchronous:**

```js
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data); // Doesn't block other operations
});
```

### 🧠 Summary:

* **Synchronous** = waits for each task to finish.
* **Asynchronous** = continues executing other code while waiting for a task.
---
## 30. Write a basic example of using the http module to create a simple web server.

## 31. What is the use of async and await in Node.js?

## 32. What is the difference between synchronous and asynchronous programming?

### 🔁 **Synchronous Programming**

* Executes **one task at a time** in sequence.
* **Waits** for each operation to complete before moving to the next.
* Can **block** the program if a task takes time.

📌 Example:

```js
console.log("Start");
let data = fs.readFileSync("file.txt", "utf8");
console.log(data);
console.log("End");
```

### 🔄 **Asynchronous Programming**

* Executes **tasks in parallel** or in the background.
* **Does not block** the flow; continues to the next line.
* Uses **callbacks**, **promises**, or **async/await**.

📌 Example:

```js
console.log("Start");
fs.readFile("file.txt", "utf8", (err, data) => {
  console.log(data);
});
console.log("End");
```

### 🧠 Summary Table

| Feature         | Synchronous      | Asynchronous                    |
| --------------- | ---------------- | ------------------------------- |
| Execution Order | Line by line     | May skip and return later       |
| Blocking        | Yes              | No                              |
| Speed           | Slower for I/O   | Faster and efficient            |
| Common Tools    | `readFileSync()` | `readFile()`, Promises, `await` |

---

## 33. Write a basic example of using the http module to create a simple web server.

## 34. What is the use of async and await in Node.js?

## 35. How to secure Rest API?

## 36. How does Node.js handle uncaught exceptions and unhandled promise rejections?
Node.js provides global handlers to manage errors that are **not caught** by your code, helping prevent crashes or exposing sensitive data.

### ❗️ **1. Uncaught Exceptions**

* These are errors not caught by `try/catch`.

✅ **Handle using:**

```js
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  // Optional: clean up resources, then exit
  process.exit(1);
});
```

### ❌ **2. Unhandled Promise Rejections**

* These occur when a promise is rejected but `.catch()` or `try/catch` is not used.

✅ **Handle using:**

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Optional: clean up and exit
  process.exit(1);
});
```

> Node.js may crash in future versions if these go unhandled, so always catch your promises!

### ✅ **Best Practices**

* Always use `try/catch` with `async/await`
* Always attach `.catch()` to promises
* Use a centralized error handler in Express apps
---

## 37. What are some considerations when implementing caching in a distributed system?

## 38. How would you optimize a Node.js application for performance?

## 39. What is the importance of the v8 module in Node.js?

## 40. Can you explain how Node.js uses the V8 engine for compiling JavaScript code?

1. **Compile JavaScript to Machine Code**

   * V8 converts JavaScript into **highly optimized machine code** using **Just-In-Time (JIT)** compilation.

2. **Execute Code Efficiently**

   * This compiled code runs **directly on the CPU**, making Node.js fast and efficient.

3. **Power the Node.js Runtime**

   * Node.js relies on V8 to **execute all JavaScript logic**, from app logic to handling async operations.

### 🧠 Summary:

> Node.js uses the V8 engine to compile and run JavaScript as fast native machine code, enabling high-performance server-side applications.
---
## 41. Explain the use of the Buffer class in Node.js.

The `Buffer` class in Node.js is used to **handle binary data** directly in memory — especially useful when working with:

* Files
* Network streams
* TCP sockets
* Binary protocols

### 📌 **Common Uses**

```js
const buffer = Buffer.from('Hello');
console.log(buffer); // <Buffer 48 65 6c 6c 6f>
```

* `Buffer.from()` — creates a buffer from a string or array
* `buffer.toString()` — converts buffer back to string
* `buffer.length` — size in bytes

---
## 42. How does this improve performance and scalability?

## 43. What is the difference between fs.readFileSync() and fs.readFile()?

### 📘 **`fs.readFileSync()`** – **Synchronous**

* **Blocks** the event loop until the file is fully read.
* Slows down the entire application if used in high-traffic or large files.

```js
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
```

✅ Use when:

* Simplicity is more important than performance
* In scripts or startup code

### 📗 **`fs.readFile()`** – **Asynchronous**

* **Non-blocking**, runs in the background.
* Keeps the app responsive and efficient.

```js
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

✅ Use when:

* Building servers or handling multiple requests
* Prioritizing performance and scalability

### 🧠 **Summary Table**

| Feature     | `fs.readFileSync()` | `fs.readFile()`       |
| ----------- | ------------------- | --------------------- |
| Type        | Synchronous         | Asynchronous          |
| Blocking    | Yes                 | No                    |
| Use Case    | Small scripts       | Web servers, APIs     |
| Performance | Slower              | Faster (non-blocking) |

---

## 44. When should you use the synchronous and asynchronous versions of the fs module functions in real-world applications?

## 45. What strategies do you use for scaling Node.js applications?
Here are **key strategies** to scale Node.js applications effectively:

### ✅ **1. Clustering**

* Use the `cluster` module to spawn **multiple processes** and utilize **multi-core CPUs**.

### ✅ **2. Load Balancing**

* Use **Nginx** or cloud load balancers to distribute traffic across multiple Node.js instances.

### ✅ **3. Horizontal Scaling**

* Deploy multiple app instances across **different servers or containers** (e.g., using Docker, Kubernetes).

### ✅ **4. Caching**

* Use **Redis** or in-memory cache to reduce database load and improve response time.

### ✅ **5. Asynchronous & Non-blocking Code**

* Avoid blocking the event loop; use `async/await`, Promises, and Streams for heavy tasks.

### ✅ **6. Use Message Queues**

* Offload heavy tasks using queues like **RabbitMQ** or **Kafka** to process them in the background.

### ✅ **7. Database Optimization**

* Use indexes, read replicas, and database clustering for better performance under load.

---
## 46. How would you deploy a Node.js application to a cloud platform like AWS or Google Cloud?

## 47. What are the limitations or challenges of using ES Modules in Node.js, and how can they be resolved?
### ⚠️ **Limitations or Challenges of Using ES Modules (ESM) in Node.js**

And ✅ how to resolve them:

### 1. ❌ **Cannot Use `require()` in ESM Files**

* ESM uses `import`/`export`, not `require`/`module.exports`.

✅ **Solution:**

* Convert CommonJS modules to ESM
* Or use dynamic import:

  ```js
  const pkg = await import('some-package');
  ```

### 2. ❌ **No `__dirname` and `__filename`**

* These are only available in CommonJS.

✅ **Solution:**
Use the following workaround:

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

### 3. ❌ **Cannot Use Bare Imports Without `.js` Extension**

```js
import myModule from './myModule'; // ❌ error
```

✅ **Solution:**
Always include the file extension:

```js
import myModule from './myModule.js'; // ✅
```
### 4. ❌ **Limited Support in Older Packages**

* Some npm packages still use only CommonJS.

✅ **Solution:**

* Use dynamic `import()`, or find an ESM-compatible version.

### 5. ⚠️ **Mixed Module Compatibility Issues**
* Mixing `require()` and `import` can be tricky.

✅ **Solution:**

* Stick to **one module system** in each file/project (preferably ESM in modern apps).
---
## 49. What are the advantages of using Node.js?

1. **Handle multiple requests at once** using non-blocking, asynchronous architecture.
2. **Run JavaScript fast** using the V8 engine for high performance.
3. **Use JavaScript everywhere** on both frontend and backend.
4. **Access a large package ecosystem** through npm for faster development.
5. **Support scalable architecture** using clustering, microservices, and horizontal scaling easily.
6. **Build real-time applications easily** like chat apps or live notifications using WebSockets.
7. **Get strong community support** with regular updates, tools, and documentation.
---
## 50. Step to create package.

## 51. How does Buffer handle binary data in Node.js, and what are some common use cases?

The `Buffer` class in Node.js is used to **store and manipulate raw binary data** directly in memory. Unlike strings, buffers allow **byte-level operations** — ideal for handling files, network packets, and other binary formats.

### ⚙️ **How It Works**

* `Buffer` allocates a fixed-size chunk of memory.
* Stores data in bytes (`0–255` values).
* Supports methods for reading/writing data (e.g., `toString()`, `write()`, `slice()`).

```js
const buf = Buffer.from('Hello');
console.log(buf); // <Buffer 48 65 6c 6c 6f>
```
### 📦 **Common Use Cases**

1. **File System I/O**
   Reading/writing binary files like images, PDFs, etc.

2. **Network Operations**
   Processing TCP/UDP streams, sockets.

3. **Stream Handling**
   Handling data chunks in streams efficiently.

4. **Encoding/Decoding**
   Convert between UTF-8, Base64, Hex, etc.

5. **Binary Protocols**
   Communicate with hardware or low-level APIs.

---

## 52. What is the Node.js cluster module, and how does it help in scaling Node.js applications?

The `cluster` module allows you to **spawn multiple child processes** (workers) that share the same server port, enabling **multi-core CPU usage** in Node.js applications.

* Node.js runs on a **single thread** by default.
* On multi-core systems, only **one core** is used.
* The `cluster` module helps you use **all CPU cores** for better performance.

### ⚙️ **How It Works**

* The master process spawns **worker processes** using `fork()`.
* Each worker is an **independent Node.js process**, sharing server ports via IPC.

```js
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // Create worker
  }
} else {
  http.createServer((req, res) => {
    res.end(`Handled by worker ${process.pid}`);
  }).listen(3000);
}
```

### 🚀 **How It Helps in Scaling**

* Distributes incoming traffic across all CPU cores.
* Improves **concurrency**, **throughput**, and **fault isolation**.
* Each worker handles part of the load, reducing bottlenecks.
---

## 53. Can you explain the concept of event-driven architecture in Node.js and how it can be used to build scalable applications?

## 54. What are some potential pitfalls with handling buffers in Node.js?

### ⚠️ **1. Memory Leaks**

Keeping large or unused buffers in memory can slow down or crash your app.

### ⚠️ **2. Buffer Overflow**

Writing more data than the buffer size can cause errors or data loss.

### ⚠️ **3. Wrong Encoding**

Using the wrong text encoding can corrupt your data.

### ⚠️ **4. Security Risk**

Using `Buffer.allocUnsafe()` may expose old memory content.

### ⚠️ **5. Slow Concatenation**

Using `+` to join buffers is slow — use `Buffer.concat()` instead.

---
## 55. What is yarn and how does it differ from npm?

## 56. What is the difference between require and import in Node.js?

### ✅ **`require`** (CommonJS)

* Used in **CommonJS** modules.
* Loads modules **synchronously**.
* Works in **older** versions of Node.js (default system).

```js
const fs = require('fs');
```
### ✅ **`import`** (ES Modules)

* Used in **ESM (ECMAScript Modules)**.
* Loads modules **asynchronously**.
* Requires `"type": "module"` in `package.json` or `.mjs` file extension.

```js
import fs from 'fs';
```
### 🔄 **Key Differences**

| Feature        | `require`            | `import`                             |
| -------------- | -------------------- | ------------------------------------ |
| Module system  | CommonJS             | ES Modules                           |
| Sync/Async     | Synchronous          | Asynchronous                         |
| File extension | Optional             | Required (`.js`, `.mjs`)             |
| Top-level use  | Can be used anywhere | Only at top-level (not in functions) |
| Used with      | `.js` (default)      | `.mjs` or `"type": "module"`         |

### 🧠 Summary:

> Use `require` for traditional Node.js apps and `import` for modern ES module-based projects.
---
## 57. How to improve node js performance?

## 58. How do you use tools like Redis or in-memory caching to optimize performance?
### ⚡ How to Use Redis or In-Memory Caching to Optimize Performance

Caching improves performance by **storing frequently used data in memory**, so you avoid repeated database or API calls.

### ✅ **1. Redis (Distributed In-Memory Cache)**
Redis is a powerful in-memory data store used for caching in production apps.

#### 🔧 Install Redis client:

```bash
npm install redis
```
#### 🔌 Example in Node.js:
```js
const redis = require('redis');
const client = redis.createClient();
await client.connect();

app.get('/user/:id', async (req, res) => {
  const id = req.params.id;

  // Check Redis cache
  const cachedUser = await client.get(id);
  if (cachedUser) return res.send(JSON.parse(cachedUser));

  // Fallback to DB
  const user = await getUserFromDB(id);

  // Store in cache
  await client.set(id, JSON.stringify(user), { EX: 60 }); // 60s expiry
  res.send(user);
});
```
### ✅ **2. node-cache (Local In-Memory Cache)**
Use `node-cache` for small-scale or single-instance apps.

#### 🔧 Install:

```bash
npm install node-cache
```
#### 🔌 Example:

```js
const NodeCache = require('node-cache');
const cache = new NodeCache();

app.get('/product/:id', async (req, res) => {
  const id = req.params.id;
  const cached = cache.get(id);
  if (cached) return res.send(cached);

  const product = await getProductFromDB(id);
  cache.set(id, product, 60);
  res.send(product);
});
```
### 🧠 Summary:

| Tool           | Best For                               |
| -------------- | -------------------------------------- |
| **Redis**      | Large, scalable, multi-server apps     |
| **node-cache** | Small apps or development environments |

> Use caching to **reduce latency**, **lower DB load**, and **speed up response time**. Redis is preferred for production.

### 💡 **node-cache and Redis work in a similar way**
They both:
* Store key-value pairs in memory
* Support expiration times (TTL)
* Allow quick retrieval of frequently used data

### 🚀 **Best Practice:**

| Environment     | Use Tool     | Why                               |
| --------------- | ------------ | --------------------------------- |
| **Development** | `node-cache` | Simple, fast, no setup required   |
| **Production**  | `Redis`      | Scalable, persistent, distributed |

---
## 59. What are Streams in Node.js?

## 60. Explain the different types of streams (Readable, Writable, Duplex, and Transform).

## 61. How does Node.js handle concurrency?

## 62. What is the purpose of middleware in Express.js?

## 63. Can you explain how middleware functions work in the request-response cycle of an Express application?

## 64. What are WebSockets, and how are they different from traditional HTTP requests?

**WebSockets** are a protocol that provides a **full-duplex, persistent connection** between the client and server. This means **both can send data to each other at any time** without needing to re-establish the connection.

### 🔄 **WebSockets vs. HTTP**

| Feature        | **WebSockets**                          | **HTTP**                             |
| -------------- | --------------------------------------- | ------------------------------------ |
| **Connection** | Persistent (kept open)                  | Request/response (closed after each) |
| **Data Flow**  | Two-way (client ↔ server)               | One-way (client → server → response) |
| **Speed**      | Fast after initial handshake            | Slower due to repeated handshakes    |
| **Use Case**   | Real-time apps (chat, games, live data) | Standard API calls, page requests    |

### 📦 **Common Use Cases for WebSockets**

* Chat applications
* Online gaming
* Live stock or sports updates
* Collaborative editing (Google Docs–like apps)

### 🧠 Summary:

> **WebSockets** allow real-time, two-way communication over a single connection, unlike **HTTP**, which is request-response based.
---

## 65. How would you implement real-time communication using WebSockets in a Node.js application?

### ✅ **1. Install `ws` (WebSocket library)**

```bash
npm install ws
```

### ✅ **2. Basic WebSocket Server in Node.js**

```js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log('Received:', message);
    // Broadcast message to all clients
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${message}`);
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
```

### ✅ **3. Example Client (Browser JavaScript)**

```html
<script>
  const socket = new WebSocket('ws://localhost:3000');

  socket.onopen = () => {
    socket.send('Hello from client!');
  };

  socket.onmessage = (event) => {
    console.log('Server says:', event.data);
  };
</script>
```
---

## 66. What are memory leaks in Node.js, and how can you detect them?

## 67. What is the difference between process.nextTick(), setImmediate(), and setTimeout() in terms of the event loop and execution order?

## 68. Explain the concept of "CORS" (Cross-Origin Resource Sharing) in Node.js.

## 69. How do you implement CORS in Node.js and Express?

```js
const express = require('express');
const app = express();

// Custom CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.get('/api', (req, res) => {
  res.json({ message: 'CORS manually handled!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

### ⚙️ **To Allow Specific Origin:**

```js
res.header('Access-Control-Allow-Origin', 'http://example.com');
```
---
## 71. Define promises and how they are used for handling asynchronous code more cleanly compared to callbacks.

A **Promise** in JavaScript is an object that represents the **future result** of an asynchronous operation.

It has 3 states:

* **Pending** – Initial state
* **Fulfilled** – Operation completed successfully
* **Rejected** – Operation failed

### ✅ **Why Use Promises Instead of Callbacks?**

* Avoids **callback hell** (nested callbacks)
* Makes async code **cleaner and easier to read**
* Supports chaining with `.then()` and `.catch()`

### ✅ **Example: Using Promise**

```js
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data received');
    }, 1000);
  });
}

getData()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```
### 🧠 Summary:

> Promises provide a cleaner, more readable way to handle asynchronous code than callbacks, with better error handling and chaining.
---

## 72. How do you handle database connection pooling in Node.js for performance optimization?

**Connection pooling** means reusing a set of active database connections instead of creating a new one for every request — which boosts **performance** and **reduces overhead**.

#### MongoDB Pooling with Mongoose
```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', {
  maxPoolSize: 10, // Limit the number of active connections
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```
### ⚙️ **2. Benefits of Connection Pooling**
* ✅ **Faster performance** (no connection setup delay)
* ✅ **Limits resource usage** (prevents too many connections)
* ✅ **Handles high traffic smoothly**

### 🧠 Summary:
> Use a **connection pool** with your DB client to reuse connections efficiently. It reduces latency and improves performance, especially in high-load apps.
---
## 73. What are the differences between concurrency and parallelism in the context of Node.js? How can you achieve parallelism with Node.js?
> In Node.js, **Concurrency** refers to handling multiple tasks at once through asynchronous, non-blocking I/O using a single thread, while **parallelism** involves executing multiple tasks **simultaneously** by leveraging multiple CPU cores using modules like `cluster` or `worker_threads`.

## 74. Discuss how Node.js uses the event loop and non-blocking I/O to handle multiple requests concurrently without using threads.

## 75.  What are circuit breakers, and why are they needed?
🔌 A **circuit breaker** is a design pattern that **prevents a failing service from being repeatedly called**, allowing the system to remain responsive and stable.

### 🧠 Why is it Needed?
In microservices, if one service is down or slow:
* Repeated calls to that service can **overload the system**.
* It causes **cascading failures** across the application.

Circuit breakers help by:
* Detecting failures
* **Cutting off calls** to the failing service temporarily
* Giving time for recovery

### ⚙️ How It Works:
1. **Closed** (🟢 Normal):
   Calls flow as usual.

2. **Open** (🔴 Error):
   After several failures, the circuit "breaks" and blocks calls for a period.

3. **Half-Open** (🟡 Test):
   It allows a few test calls to check if the service has recovered.

### ✅ Example with Node.js (using `opossum`):
```bash
npm install opossum
```

```js
const circuitBreaker = require('opossum');

function riskyCall() {
  return axios.get('http://unstable-service');
}

const breaker = circuitBreaker(riskyCall, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
});

breaker.fallback(() => 'Service is temporarily unavailable.');

breaker.fire().then(console.log).catch(console.error);
```

### ✅ Benefits:
* Prevents **system overload**
* Increases **fault tolerance**
* Improves **resilience** and **user experience**

### 🧠 Summary:
> A **circuit breaker** stops repeated calls to a failing service, helping your system stay stable and responsive. It's critical for **resilient microservices**.
---
## 76. What are some implementations of circuit breakers?
Here are some popular **implementations of circuit breakers** across different environments, including Node.js:

### ✅ **1. Opossum (Node.js)**

* Lightweight circuit breaker library for Node.js.
* Easy to integrate with HTTP requests or async functions.

```bash
npm install opossum
```

```js
const circuitBreaker = require('opossum');
const axios = require('axios');

const breaker = circuitBreaker(() => axios.get('http://service'), {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
});
```
### ✅ **2. Hystrix (Java - Netflix)**

* One of the first and most well-known circuit breaker libraries.
* Now in maintenance mode, but widely used in Java-based systems.

### ✅ **3. Resilience4j (Java)**

* Successor to Hystrix.
* Lightweight, modular, and supports multiple fault tolerance patterns (retry, bulkhead, rate limiter).

### ✅ **4. Istio (Service Mesh)**

* Kubernetes-native solution.
* Provides circuit-breaking via configuration (no code needed).
* Example in YAML:

```yaml
outlierDetection:
  consecutiveErrors: 5
  interval: 10s
  baseEjectionTime: 30s
```

### ✅ **5. Envoy Proxy**

* A powerful sidecar proxy used in service meshes.
* Supports circuit breaking and retry policies.

### ✅ **6. Spring Cloud Circuit Breaker (Java)**
* Abstraction layer that works with Resilience4j, Hystrix, or Sentinel.
* Integrates easily with Spring Boot apps.

### 🧠 **Summary Table:**

| Library/Tool        | Language/Platform | Notes                           |
| ------------------- | ----------------- | ------------------------------- |
| **Opossum**         | Node.js           | Simple and effective            |
| **Hystrix**         | Java              | Deprecated but still used       |
| **Resilience4j**    | Java              | Modern, modular, well-supported |
| **Istio**           | Kubernetes        | No code, config-based           |
| **Envoy**           | Any (via proxy)   | Used in microservice networks   |
| **Spring Cloud CB** | Java (Spring)     | High-level abstraction          |
---
## 77. What is service discovery? Why is it needed in a microservice architecture?
**Service Discovery** is a mechanism that allows microservices to **find and communicate with each other dynamically** — without hardcoding IPs or hostnames.

### 🧠 Why is it Needed?
In microservices architecture:

* Services are **deployed independently**.
* They may **scale up/down** or **change IP addresses** (especially in containerized environments like Docker or Kubernetes).
* Hardcoding service locations is **fragile and error-prone**.

So, service discovery solves this by **automating how services locate each other**.

### 🔁 Types of Service Discovery:
| Type            | How it Works                                                                    |
| --------------- | ------------------------------------------------------------------------------- |
| **Client-side** | The service queries a registry to find another service and calls it directly.   |
| **Server-side** | A load balancer (or API Gateway) queries the registry and forwards the request. |

### ⚙️ Key Components:
1. **Service Registry**
   A database of live services and their addresses
   (e.g., **Consul**, **Eureka**, **etcd**, **Kubernetes DNS**)

2. **Service Registration**
   When a service starts, it registers itself with the registry.

3. **Service Deregistration**
   When a service stops or crashes, it's removed from the registry.

### 🧱 Example:
```txt
User Service wants to call Order Service:

User Service → Service Registry → Finds Order Service IP/Port → Calls it directly
```
### ✅ Summary:
> **Service discovery** is essential in microservices to allow services to **communicate reliably**, even when their network locations **dynamically change**. It improves scalability, reliability, and flexibility.
---

## 78. What is a SPOF?,  What are some common strategies for avoiding SPOFs?
###

**SPOF (Single Point of Failure)** is a part of a system that, if it fails, will stop the entire system from working.

> If one component fails and there's no backup or redundancy, the whole system goes down.

### 🚫 **Examples of SPOFs:**
* A single database server
* A load balancer with no failover
* A single network switch or power source

### 🛡️ Common Strategies to Avoid SPOF:
| Strategy                     | Purpose                                                            |
| ---------------------------- | ------------------------------------------------------------------ |
| **Load Balancing**           | Distribute traffic across multiple servers                         |
| **Replication (DB/Cache)**   | Use master-slave or replica sets (e.g., MongoDB replica sets)      |
| **Failover Systems**         | Automatically switch to standby systems                            |
| **Redundant Infrastructure** | Use multiple servers, power supplies, and networks                 |
| **Cloud Regions & Zones**    | Deploy across multiple data centers (e.g., AWS availability zones) |
| **Backups and Monitoring**   | Recover quickly and detect issues early                            |
### 🧠 Summary:
> A SPOF is any component that can crash the whole system if it fails. Avoid it by adding **redundancy**, **replication**, and **automated failover** mechanisms.
---
## 79. Name some common tools used in building microservice architectures.
Here’s a list of **commonly used tools and technologies** specifically suited for building a **Node.js microservices architecture**:

### 🚀 **1. Core Development Tools**
| Tool                      | Purpose                                       |
| ------------------------- | --------------------------------------------- |
| **Express.js / Fastify**  | Web frameworks to build APIs/microservices    |
| **TypeScript**            | Adds static typing and better maintainability |
| **ESLint + Prettier**     | Code quality and formatting                   |
| **Node.js Cluster / PM2** | Process management and load balancing         |

### 🔐 **2. Authentication & Security**
| Tool                   | Purpose                    |
| ---------------------- | -------------------------- |
| **Passport.js**        | Authentication middleware  |
| **JWT (jsonwebtoken)** | Stateless token-based auth |
| **Helmet**             | Sets secure HTTP headers   |
| **bcrypt**             | Password hashing           |

### 📦 **3. Inter-Service Communication**
| Tool                            | Purpose                             |
| ------------------------------- | ----------------------------------- |
| **Axios / node-fetch**          | HTTP communication between services |
| **gRPC (with `@grpc/grpc-js`)** | Binary RPC between services         |
| **RabbitMQ / Kafka / NATS**     | Message brokers for async comms     |

### 📊 **4. Monitoring & Observability**
| Tool                | Purpose                       |
| ------------------- | ----------------------------- |
| **Prometheus**      | Collects metrics              |
| **Grafana**         | Visualizes metrics            |
| **Winston / Pino**  | Logging libraries for Node.js |
| **Jaeger / Zipkin** | Distributed tracing           |

### ☁️ **5. Containerization & Deployment**
| Tool                 | Purpose                          |
| -------------------- | -------------------------------- |
| **Docker**           | Containerizes each microservice  |
| **Kubernetes (K8s)** | Manages container orchestration  |
| **Helm**             | Kubernetes package manager       |
| **Istio / Linkerd**  | Service mesh for traffic control |

### 🌐 **6. API Gateway**
| Tool                | Purpose                             |
| ------------------- | ----------------------------------- |
| **Express Gateway** | API Gateway built on Express        |
| **Kong / NGINX**    | Powerful, production-ready gateways |
| **Traefik**         | Cloud-native reverse proxy/gateway  |

### 🧰 **7. Data Management**
| Tool                     | Purpose                               |
| ------------------------ | ------------------------------------- |
| **MongoDB / PostgreSQL** | Databases for services                |
| **Mongoose / Prisma**    | ODM/ORM for DB access in Node.js      |
| **Redis**                | In-memory store for caching or queues |

---
## 80. Explain the workings of Java Microservices Architecture.
Microservices architecture in Node.js means breaking your application into **independent, small services** that communicate over a network — usually via **HTTP APIs**, **gRPC**, or **message brokers** (e.g., Kafka, RabbitMQ).

### 🧩 **Key Components:**
1. **Multiple Independent Services**

   * Each service handles a specific business function (e.g., auth, payment, orders).
   * Services are loosely coupled and independently deployable.

2. **Communication Layer**

   * Services talk via **REST APIs**, **GraphQL**, **gRPC**, or **event messaging** (pub/sub).
   * Can use **message queues** for async communication.

3. **API Gateway**

   * A single entry point for clients.
   * Handles routing, rate-limiting, authentication.

4. **Database per Service**

   * Each service has its **own database** to avoid tight coupling.

5. **Service Discovery**

   * Services register themselves and find each other (via service registry like Consul).

### ⚙️ **How It Works:**
1. **Client → API Gateway**

   * The user sends a request to the API gateway.

2. **Gateway → Microservices**

   * The gateway forwards the request to the right microservice.

3. **Service Communication**

   * Services may talk to each other if needed (e.g., orders service asks auth service to validate user).

4. **Data Isolation**

   * Each service manages its own database and logic.

5. **Deployment & Scaling**

   * Services are deployed independently.
   * You can scale only the services that need more resources.

### 🧠 **Why Use Node.js for Microservices?**
* Fast and non-blocking (event loop + async I/O)
* Lightweight and great for building APIs
* Huge npm ecosystem for plug-and-play modules

### 📦 **Tech Stack Example:**
| Component         | Tool Used               |
| ----------------- | ----------------------- |
| Service Framework | Express.js / Fastify    |
| Communication     | HTTP / gRPC / RabbitMQ  |
| Gateway           | NGINX / Express Gateway |
| Auth              | JWT / OAuth2            |
| Deployment        | Docker + Kubernetes     |
| Monitoring        | Prometheus + Grafana    |

### ✅ **Benefits:**
* Independent deployment
* Fault isolation
* Tech flexibility
* Easier scaling

### ⚠️ **Challenges:**
* Complex deployment
* Distributed debugging
* Data consistency
--
## 81. Event-Driven Programming Paradigm in Node.js
### ✅ **Event-Driven Programming Paradigm in Node.js**

**Event-driven programming** is a core concept in Node.js, where the flow of the program is controlled by **events** and **callbacks**.

### ⚙️ **How It Works:**

* Node.js uses an **event loop** that listens for events (like HTTP requests, file reads).
* When an event occurs, a **callback function** (event handler) is triggered.

### 📦 **Built-in Example: `EventEmitter`**

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', () => {
  console.log('Hello from event!');
});

emitter.emit('greet');
```

### 🚀 **Where It's Used in Node.js:**

* **HTTP servers** handle `request` and `response` events.
* **Streams** emit `data`, `end`, `error` events.
* **File system** operations use callbacks after events complete.
* **Custom apps** can emit and handle their own events.

### 🧠 **Summary:**

> Node.js uses the **event-driven paradigm** to efficiently manage I/O and user interactions through **events and callbacks**, enabling high performance and scalability on a single thread.
---
## 82. Non-Blocking I/O in Node.js
**Non-blocking I/O** means that Node.js **doesn't wait** for I/O operations (like reading files or querying a database) to complete before moving to the next task.

### ⚙️ **How It Works:**

* Node.js uses the **event loop** and **callbacks/promises**.
* I/O tasks are sent to the background (libuv or thread pool).
* When the task is done, Node.js gets the result via an **event** and continues processing.

### 📦 **Example:**

```js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log('File content:', data);
});

console.log('This runs while file is being read!');
```

> The file is read in the background, and Node.js continues executing the next line.

### 🚀 **Benefits:**

* Handles **many operations at once**.
* Improves performance and **scalability**.
* Ideal for **I/O-heavy** apps (APIs, real-time apps).
---
## 83. Clustering in Node.js
## 84. Handling Child Processes in Node.js
Node.js allows you to **run other programs or scripts in parallel** using the built-in `child_process` module. This is useful for:

* CPU-heavy tasks
* Running shell commands
* Creating worker processes

### 🔧 **Common Methods from `child_process`:**

| Method    | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| `exec()`  | Runs a shell command, returns output as a buffer                    |
| `spawn()` | Starts a process, streams output (better for large data)            |
| `fork()`  | Spawns a new Node.js process (used for inter-process communication) |

### 📦 **Examples:**

#### 🟩 `exec()` – Run a shell command

```js
const { exec } = require('child_process');

exec('ls', (err, stdout, stderr) => {
  if (err) return console.error(err);
  console.log('Files:', stdout);
});
```
#### 🟩 `spawn()` – Stream data from process

```js
const { spawn } = require('child_process');

const child = spawn('node', ['otherScript.js']);

child.stdout.on('data', data => {
  console.log(`Output: ${data}`);
});
```
#### 🟩 `fork()` – Run another Node.js file with IPC

```js
const { fork } = require('child_process');

const child = fork('worker.js');

child.on('message', msg => {
  console.log('Message from child:', msg);
});

child.send({ task: 'start' });
```
---
## 85. Scaling a Node.js Application for High Traffic Loads.

## 86. Implementing Authentication and Authorization in a Node.js Microservices Architecture.

In a microservices setup, security must be **centralized, stateless, and scalable**. Here's how to implement authentication and authorization effectively:

### ✅ **1. Use API Gateway for Central Authentication**

* API Gateway handles **incoming client requests** and checks authentication before forwarding to microservices.
* Helps centralize logic and avoid duplication.

### ✅ **2. Implement JWT-Based Authentication (Stateless)**
#### 🔐 Auth Service (Single responsibility)
* Handles **user login, signup, and token generation**.
* On login, it issues a **JWT (JSON Web Token)** signed with a secret.

```js
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: user._id, role: user.role }, 'secret_key', { expiresIn: '1h' });
```

* Token is passed with each request in `Authorization` header:

```
Authorization: Bearer <token>
```

### ✅ **3. Verify JWT in Microservices**
Each microservice includes a middleware to:

* Verify token using shared secret or public key
* Extract user info (ID, role) for **authorization**

```js
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, 'secret_key');
  req.user = decoded;
  next();
};
```

### ✅ **4. Role-Based Authorization**

Each service can apply **access rules**:

```js
if (req.user.role !== 'admin') {
  return res.status(403).send('Access denied');
}
```
### ✅ **5. Optional: OAuth2 or Identity Provider**
Use services like:

* **Auth0**, **Keycloak**, **Firebase Auth**
* Handles token issuing, user management, etc.

### 🧠 Summary

| Component        | Role                                  |
| ---------------- | ------------------------------------- |
| **API Gateway**  | Central auth & routing                |
| **Auth Service** | Login, registration, token generation |
| **JWT**          | Stateless token used across services  |
| **Middleware**   | Validates token & handles roles       |
| **RBAC**         | Role-based access in microservices    |

---
## 88. Security Vulnerabilities in Node.js Applications and Mitigation.

### 🔐 **Common Security Vulnerabilities in Node.js & How to Mitigate Them**

### 1. **Injection Attacks (e.g., NoSQL, SQL Injection)**

* 🧨 **Risk:** Attacker manipulates queries via user input.
* ✅ **Mitigation:**

  * Validate & sanitize inputs
  * Use query builders or ORM (e.g., Mongoose, Sequelize)

### 2. **Cross-Site Scripting (XSS)**

* 🧨 **Risk:** Malicious scripts injected into pages.
* ✅ **Mitigation:**

  * Escape output
  * Use libraries like `helmet`
  * Sanitize user inputs

### 3. **Cross-Site Request Forgery (CSRF)**

* 🧨 **Risk:** Unauthorized actions performed via user session.
* ✅ **Mitigation:**

  * Use CSRF tokens (`csurf` middleware)
  * SameSite cookies

### 4. **Insecure Dependencies**

* 🧨 **Risk:** Outdated or vulnerable packages.
* ✅ **Mitigation:**

  * Run `npm audit fix`
  * Use tools like `npm audit`, `snyk`, or `OWASP Dependency-Check`

### 5. **Exposing Sensitive Data**

* 🧨 **Risk:** Secrets like DB passwords pushed to code/public repos.
* ✅ **Mitigation:**

  * Use `.env` files and `dotenv`
  * Never hard-code credentials

### 6. **Denial of Service (DoS)**

* 🧨 **Risk:** Overloading the server with too many requests.
* ✅ **Mitigation:**

  * Use rate-limiting (`express-rate-limit`)
  * Validate request size and structure

### 7. **Directory Traversal**

* 🧨 **Risk:** Accessing unauthorized files via `../` in paths.
* ✅ **Mitigation:**

  * Sanitize file paths
  * Use `path.join()` and `path.normalize()`
---

## 89. What is middleware in the context of Express.js? How is it used?

## 90. Explain the concept of streams in Node.js. When would you use them?

## 91. What are some security best practices when developing a Node.js application?

## 92.  What is the role of the process object in Node.js? Give examples of its usage.

## 93. What is session management in Express.js? How can it be implemented?
**Session management** allows you to **store user data** (like login status) across multiple HTTP requests. It’s commonly used for authentication, shopping carts, and tracking user activity.

### 🔐 **How It Works:**

* A session is created on the server when a user logs in.
* A **unique session ID** is sent to the client as a **cookie**.
* On every request, the client sends this session ID back.
* The server uses it to retrieve the stored session data.

### 🛠️ **How to Implement Sessions in Express:**

#### ✅ 1. Install dependencies:

```bash
npm install express express-session
```
#### ✅ 2. Setup session middleware:

```js
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'mySecretKey',          // used to sign the session ID cookie
  resave: false,                  // don't save session if unmodified
  saveUninitialized: false,       // don't create session until something stored
  cookie: { secure: false }       // set secure: true in production with HTTPS
}));
```
#### ✅ 3. Using session in routes:

```js
app.get('/login', (req, res) => {
  req.session.user = { name: 'John' };
  res.send('User logged in');
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user.name}`);
  } else {
    res.status(401).send('Please log in');
  }
});
```
### 🧠 **Summary:**

> Session management in Express stores user data across requests using `express-session`. It uses cookies to identify and track users securely.
---
## 94. How do you handle file uploads in an Express.js application?

### 📁 **Handling File Uploads in Express.js**

To handle file uploads in Express.js, the most common approach is using the **`multer`** middleware.

### ✅ **1. Install `multer`**

```bash
npm install multer
```
### ✅ **2. Set Up `multer` in Your App**

```js
const express = require('express');
const multer  = require('multer');
const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  }
});

const upload = multer({ storage: storage });
```
### ✅ **3. Create a Route to Handle Upload**

```js
// Single file upload
app.post('/upload', upload.single('myFile'), (req, res) => {
  res.send(`File uploaded: ${req.file.filename}`);
});
```
---
## 95. How do you handle CORS (Cross-Origin Resource Sharing) in a Node.js application?

## 96. Explain the purpose of the express.static() middleware in Express.js.

## 97. How do you handle sessions and cookies in an Express.js application?

#### 📦 **Purpose of `express.static()` Middleware in Express.js**

The `express.static()` middleware is used to **serve static files** such as:

* HTML
* CSS
* JavaScript
* Images
* Fonts

These files are served directly to the client **without any additional processing**.

### ✅ **Example Usage:**

```js
const express = require('express');
const app = express();

// Serve static files from the "public" folder
app.use(express.static('public'));
```
📁 If you have this file structure:

```
project/
├── public/
│   └── logo.png
└── app.js
```

Then `http://localhost:3000/logo.png` will serve the image automatically.

### 🔐 **Optional Config Example:**

```js
app.use(express.static('public', {
  maxAge: '1d',       // cache files for 1 day
  index: false        // disable automatic index.html
}));
```
### 🧠 **Summary:**

> `express.static()` is used to serve static assets efficiently from a folder, like images, stylesheets, or frontend JS, in an Express.js app.
---
## 98. Event-Driven Programming Paradigm in Node.js
## 99. Name the key components of Microservices.

---
## 100. Why is Node.js Single-threaded?
> **Node.js is single-threaded** because it is built on JavaScript's **asynchronous, non-blocking** nature. This design makes development simpler, easier to maintain, and allows Node.js to handle **many concurrent requests efficiently**.

## 101. If Node.js is single-threaded, then how does it handle concurrency?

## 102. What is an EventEmitter in Node.js?
The **`EventEmitter`** is a core Node.js class (from the `events` module) that allows **objects to emit and listen for events** — enabling **event-driven programming**.

### ✅ **Why Use It?**

* Helps decouple code (emit events in one place, handle them in another).
* Great for building custom event-based systems.

### 📦 **Example: Basic Usage**

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Listener
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit event
emitter.emit('greet', 'Alice');
```
🟢 Output: `Hello, Alice!`

### ⚙️ **Common Methods:**

| Method               | Description                    |
| -------------------- | ------------------------------ |
| `.on(event, fn)`     | Register a listener            |
| `.emit(event, data)` | Trigger an event and send data |
| `.once(event, fn)`   | Listen only once               |
| `.removeListener()`  | Remove an event listener       |

---
## 103. What are the two types of API functions in Node.js?
### ✅ **Two Types of API Functions in Node.js:**
1. **Asynchronous (Non-blocking) Functions**
   * Don’t block the execution thread.
   * Use callbacks, Promises, or async/await.
   * Example:
     ```js
     fs.readFile('file.txt', (err, data) => {
       console.log(data.toString());
     });
     ```
2. **Synchronous (Blocking) Functions**
   * Block further code execution until the operation completes.
   * Typically used in startup/config logic.
   * Example:
     ```js
     const data = fs.readFileSync('file.txt');
     console.log(data.toString());
     ```
### 🧠 Summary:
> Node.js provides both async and sync APIs, but **asynchronous APIs** are preferred for scalability and performance.
---
## 104. What are the security implementations that are present in Node.js?

## 105. What is Libuv?
**`libuv`** is a C library used by Node.js to handle **asynchronous I/O operations**.
It’s the **backbone** that powers Node.js's **non-blocking, event-driven architecture**.

### ✅ **Key Responsibilities of `libuv`:**
1. **Event Loop Management**

   * Drives the main loop that processes events & callbacks.

2. **Thread Pool for Blocking Operations**

   * Handles file I/O, DNS, and crypto in background threads.

3. **Asynchronous I/O**

   * Allows Node.js to perform non-blocking file and network operations.

4. **Cross-Platform Support**

   * Works on Windows, Linux, macOS — so Node.js runs consistently across platforms.

### 📦 Example Use:
When you write:
```js
fs.readFile('file.txt', (err, data) => {
  console.log(data.toString());
});
```
* The file read is passed to **libuv**, which runs it in a **background thread**.
* When done, it pushes the callback to the **event loop**.

### 🧠 **Summary:**
> `libuv` is the low-level library that gives Node.js its power to handle **asynchronous operations** and **concurrency** efficiently on a single thread.
---

## 106. What is the use of the connect module in Node.js?
The `connect` module is a lightweight **middleware framework** for building **HTTP servers** in Node.js. It provides a way to:
* **Error-handling middleware** – manages errors that occur during the request/response cycle.
* **Cookie-parsing middleware** – extracts cookies from the request headers.
* **Session middleware** – manages user sessions across requests.

> 🧱 It’s the foundation on which **Express.js** is built.

### ✅ **Key Features:**

* Minimal and flexible.
* Middleware-based architecture.
* Can be used to build custom web servers without Express.

### 📦 **Example:**

```js
const connect = require('connect');
const http = require('http');

const app = connect();

// Simple middleware
app.use((req, res, next) => {
  console.log('Request received:', req.url);
  next(); // pass to next middleware
});

app.use((req, res) => {
  res.end('Hello from Connect!');
});

http.createServer(app).listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```
### 🧠 **Summary:**

> The `connect` module is a middleware engine for Node.js HTTP servers, enabling reusable middleware and forming the basis for frameworks like **Express.js**.
---
































































