import { describe, jest, expect, test, beforeEach } from "@jest/globals";

import { InjectHttpInterceptor } from "./agent.js";
import { Server } from "http";

const originalHttp = jest.createMockFromModule("http");

describe("HTTP Interceptor Agent", () => {
  const eventName = "request";
  const request = null;

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should not change header", () => {
    const response = {
      setHeader: jest.fn(),
    };
    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).not.toHaveBeenCalled();
  });

  test("should activate header interceptor", () => {
    InjectHttpInterceptor();
    const response = {
      setHeader: jest.fn(),
    };

    const serverInstance = new Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).toBeCalledWith("X-Instrumented-By", "Fredowisk");
  });
});
