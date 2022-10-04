import Http from "http";
function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit;

  Http.Server.prototype.emit = function (...args) {
    const [type, req, response] = args;
    if (type === "request") {
      response.setHeader("X-Instrumented-By", "Fredowisk");
    }
    return oldEmit.apply(this, args);
  };
}

export { InjectHttpInterceptor };
