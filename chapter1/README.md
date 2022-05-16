- Everything that is external to the application is running in background and when ready it goes back to the event loop and to the application itself.

- Because of the asynchronous functions.

** Promises
- Pending
- Fulfilled - success - return a function
- Rejected

** Async/Await
- Easy to see the application flow
- Does not change the application performance
- Came from C# community
- Use when you need to manipulate the function result

** Event Emitter
- Used to continuous actions
- Node.js uses the EventEmitter with almost everything
- Used on browsers (.onClick)
- Works with Observer/PubSub Design Pattern