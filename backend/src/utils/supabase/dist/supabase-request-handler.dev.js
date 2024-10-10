"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSupabaseRequest = void 0;

var _pRetry = _interopRequireWildcard(require("p-retry"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var handleSupabaseRequest = function handleSupabaseRequest(requestFunction, description) {
  return regeneratorRuntime.async(function handleSupabaseRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _pRetry["default"])(function _callee() {
            var typedError;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(requestFunction());

                  case 3:
                    return _context.abrupt("return", _context.sent);

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](0);
                    typedError = _context.t0;
                    console.error("Error during ".concat(description, ":"), typedError);

                    if (!shouldRetry(typedError)) {
                      _context.next = 14;
                      break;
                    }

                    throw typedError;

                  case 14:
                    throw new _pRetry.AbortError("Non-retryable error during ".concat(description, ": ").concat(typedError.message));

                  case 15:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[0, 6]]);
          }, {
            retries: 3,
            factor: 2,
            minTimeout: 1000,
            maxTimeout: 5000,
            onFailedAttempt: function onFailedAttempt(error) {
              console.warn("Attempt ".concat(error.attemptNumber, " failed. There are ").concat(error.retriesLeft, " retries left."));
            }
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.handleSupabaseRequest = handleSupabaseRequest;

var shouldRetry = function shouldRetry(error) {
  // Optionally type the error parameter as 'any'
  if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
    return true;
  }

  return false;
};