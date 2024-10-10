"use strict";
"use server";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateUsageAndPrice = exports.updateElectricityUsage = exports.addElectricityUsage = exports.getMonthlyUsage = void 0;

var _index = require("../../constants/index.js");

var _server = require("../../utils/supabase/server.js");

var _supabaseRequestHandler = require("../../utils/supabase/supabase-request-handler.js");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _cache = require("next/cache.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { hashData, verifyData } from '@/src/utils/crypto';
var getMonthlyUsage = function getMonthlyUsage(user_id) {
  return regeneratorRuntime.async(function getMonthlyUsage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _supabaseRequestHandler.handleSupabaseRequest)(function _callee() {
            var supabase, currentMonth, currentYear, _ref, data, error;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    supabase = (0, _server.createClient)();
                    currentMonth = (0, _dayjs["default"])().month() + 1;
                    currentYear = (0, _dayjs["default"])().year();
                    console.log("Filtering for month: ".concat(currentMonth, ", year: ").concat(currentYear));
                    _context.next = 7;
                    return regeneratorRuntime.awrap(supabase.from("usages").select("*").eq("user_id", user_id).eq("month", currentMonth).eq("year", currentYear));

                  case 7:
                    _ref = _context.sent;
                    data = _ref.data;
                    error = _ref.error;

                    if (!error) {
                      _context.next = 12;
                      break;
                    }

                    throw new Error(error.message);

                  case 12:
                    if (!(!data || data.length === 0)) {
                      _context.next = 15;
                      break;
                    }

                    console.log("No usage data found for the current month.");
                    return _context.abrupt("return", {
                      usage: 0,
                      price: 0
                    });

                  case 15:
                    return _context.abrupt("return", {
                      usage: data[0].usage,
                      price: data[0].price
                    });

                  case 18:
                    _context.prev = 18;
                    _context.t0 = _context["catch"](0);
                    console.error("Error fetching monthly usage data:", _context.t0);
                    throw new Error("Failed to fetch monthly usage data. Please try again later.");

                  case 22:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[0, 18]]);
          }, "fetching monthly usage data"));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getMonthlyUsage = getMonthlyUsage;

var addElectricityUsage = function addElectricityUsage(_ref2) {
  var user_id, usage, price;
  return regeneratorRuntime.async(function addElectricityUsage$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user_id = _ref2.user_id, usage = _ref2.usage, price = _ref2.price;
          return _context4.abrupt("return", (0, _supabaseRequestHandler.handleSupabaseRequest)(function _callee2() {
            var supabase, createdAt, currentMonth, currentYear, _ref3, data, error;

            return regeneratorRuntime.async(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    supabase = (0, _server.createClient)();
                    createdAt = (0, _dayjs["default"])().toISOString();
                    currentMonth = (0, _dayjs["default"])().month() + 1;
                    currentYear = (0, _dayjs["default"])().year();
                    console.log("Adding this usage from actions:", {
                      user_id: user_id,
                      month: currentMonth,
                      year: currentYear,
                      usage: usage,
                      price: price,
                      created_at: createdAt,
                      updated_at: createdAt
                    });
                    _context3.next = 8;
                    return regeneratorRuntime.awrap(supabase.from("usages").insert([{
                      user_id: user_id,
                      month: currentMonth,
                      year: currentYear,
                      usage: usage,
                      price: price,
                      created_at: createdAt,
                      updated_at: createdAt
                    }]));

                  case 8:
                    _ref3 = _context3.sent;
                    data = _ref3.data;
                    error = _ref3.error;

                    if (!error) {
                      _context3.next = 13;
                      break;
                    }

                    throw new Error(error.message);

                  case 13:
                    (0, _cache.revalidatePath)("/");
                    return _context3.abrupt("return", data);

                  case 17:
                    _context3.prev = 17;
                    _context3.t0 = _context3["catch"](0);
                    console.error("Error adding electricity usage:", _context3.t0);
                    throw new Error("Failed to add electricity usage. Please try again later.");

                  case 21:
                  case "end":
                    return _context3.stop();
                }
              }
            }, null, null, [[0, 17]]);
          }, "adding electricity usage"));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.addElectricityUsage = addElectricityUsage;

var updateElectricityUsage = function updateElectricityUsage(_ref4) {
  var user_id, usage, price;
  return regeneratorRuntime.async(function updateElectricityUsage$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          user_id = _ref4.user_id, usage = _ref4.usage, price = _ref4.price;
          return _context6.abrupt("return", (0, _supabaseRequestHandler.handleSupabaseRequest)(function _callee3() {
            var supabase, updatedAt, currentMonth, currentYear, _ref5, data, error;

            return regeneratorRuntime.async(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    supabase = (0, _server.createClient)();
                    updatedAt = (0, _dayjs["default"])().toISOString();
                    currentMonth = (0, _dayjs["default"])().month() + 1;
                    currentYear = (0, _dayjs["default"])().year();
                    console.log("Updating this usage from actions:", {
                      user_id: user_id,
                      usage: usage,
                      price: price,
                      updated_at: updatedAt
                    });
                    _context5.next = 8;
                    return regeneratorRuntime.awrap(supabase.from("usages").update({
                      user_id: user_id,
                      usage: usage,
                      price: price,
                      updated_at: updatedAt
                    }).eq("user_id", user_id).eq("month", currentMonth).eq("year", currentYear));

                  case 8:
                    _ref5 = _context5.sent;
                    data = _ref5.data;
                    error = _ref5.error;

                    if (!error) {
                      _context5.next = 13;
                      break;
                    }

                    throw new Error(error.message);

                  case 13:
                    (0, _cache.revalidatePath)("/house/my-smart-meter");
                    return _context5.abrupt("return", data);

                  case 17:
                    _context5.prev = 17;
                    _context5.t0 = _context5["catch"](0);
                    console.error("Error updating electricity usage:", _context5.t0);
                    throw new Error("Failed to update electricity usage. Please try again later.");

                  case 21:
                  case "end":
                    return _context5.stop();
                }
              }
            }, null, null, [[0, 17]]);
          }, "updating electricity usage"));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.updateElectricityUsage = updateElectricityUsage;

var calculateUsageAndPrice = function calculateUsageAndPrice(_ref6) {
  var user_id;
  return regeneratorRuntime.async(function calculateUsageAndPrice$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          user_id = _ref6.user_id;
          return _context8.abrupt("return", (0, _supabaseRequestHandler.handleSupabaseRequest)(function _callee4() {
            var supabase, _ref7, devices, error, now, currentMonthStart, currentMinute, rawUsage, usage, price, isFirstDayOfMonth, _ref8, existingUsage, checkError, hasCurrentMonthUsage;

            return regeneratorRuntime.async(function _callee4$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    supabase = (0, _server.createClient)();
                    _context7.next = 4;
                    return regeneratorRuntime.awrap(supabase.from("devices").select("device_unit_usage, created_at").eq("user_id", user_id));

                  case 4:
                    _ref7 = _context7.sent;
                    devices = _ref7.data;
                    error = _ref7.error;

                    if (!error) {
                      _context7.next = 9;
                      break;
                    }

                    throw new Error(error.message);

                  case 9:
                    now = (0, _dayjs["default"])();
                    currentMonthStart = (0, _dayjs["default"])().startOf("month");
                    currentMinute = now.diff(currentMonthStart, "minute");
                    console.log("Minutes since the start of the month:", currentMinute);
                    rawUsage = devices.reduce(function (total, device) {
                      var deviceCreatedAt = (0, _dayjs["default"])(device.created_at);
                      var minutesSinceCreation = deviceCreatedAt.isSame(currentMonthStart, "minute") ? Math.min(currentMinute - deviceCreatedAt.minute(), currentMinute) : currentMinute;
                      var usageToday = device.device_unit_usage * Math.max(minutesSinceCreation, 0);
                      var totalUsage = (total + usageToday) / 60;
                      return totalUsage;
                    }, 0);
                    usage = parseFloat(rawUsage.toFixed(2));
                    price = parseFloat((usage * _index.UNIT_PRICE).toFixed(2));
                    console.log("Today's usage (in minutes):", {
                      usage: usage,
                      price: price
                    }); //   const storedHash = hashData(usage);
                    //   console.log("Data Verification:", verifyData(usage, storedHash));
                    //   console.log("Hashed Usage Data:", storedHash);

                    isFirstDayOfMonth = new Date().getDate() === 1;
                    console.log("Is first day of month:", isFirstDayOfMonth);
                    _context7.next = 21;
                    return regeneratorRuntime.awrap(supabase.from("usages").select("*").eq("user_id", user_id).eq("month", now.month() + 1).eq("year", now.year()));

                  case 21:
                    _ref8 = _context7.sent;
                    existingUsage = _ref8.data;
                    checkError = _ref8.error;

                    if (!checkError) {
                      _context7.next = 26;
                      break;
                    }

                    throw new Error(checkError.message);

                  case 26:
                    hasCurrentMonthUsage = existingUsage.length > 0;
                    console.log("Has current month usage:", hasCurrentMonthUsage);

                    if (!(!hasCurrentMonthUsage || !hasCurrentMonthUsage && isFirstDayOfMonth)) {
                      _context7.next = 33;
                      break;
                    }

                    _context7.next = 31;
                    return regeneratorRuntime.awrap(addElectricityUsage({
                      user_id: user_id,
                      usage: usage,
                      price: price
                    }));

                  case 31:
                    _context7.next = 35;
                    break;

                  case 33:
                    _context7.next = 35;
                    return regeneratorRuntime.awrap(updateElectricityUsage({
                      user_id: user_id,
                      usage: usage,
                      price: price
                    }));

                  case 35:
                    if (!(!hasCurrentMonthUsage || !hasCurrentMonthUsage && isFirstDayOfMonth)) {
                      _context7.next = 40;
                      break;
                    }

                    _context7.next = 38;
                    return regeneratorRuntime.awrap(addElectricityUsage({
                      user_id: user_id,
                      usage: usage,
                      price: price
                    }));

                  case 38:
                    _context7.next = 42;
                    break;

                  case 40:
                    _context7.next = 42;
                    return regeneratorRuntime.awrap(updateElectricityUsage({
                      user_id: user_id,
                      usage: usage,
                      price: price
                    }));

                  case 42:
                    return _context7.abrupt("return", {
                      usage: usage,
                      price: price
                    });

                  case 45:
                    _context7.prev = 45;
                    _context7.t0 = _context7["catch"](0);
                    console.error("Error calculating today's usage:", _context7.t0);
                    throw new Error("Failed to calculate today's usage. Please try again later.");

                  case 49:
                  case "end":
                    return _context7.stop();
                }
              }
            }, null, null, [[0, 45]]);
          }, "calculating usage"));

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  });
}; // NOTE: FOR TESTING PURPOSES ONLY (USING SECONDS INSTEAD OF HOURS)
//   export const getTodayUsage = async ({ user_id }: GetTodayUsageParams) => {
//     try {
//       const supabase = createClient();
//       const { data: devices, error } = await supabase
//         .from("devices")
//         .select("device_unit_usage, created_at")
//         .eq("user_id", user_id);
//       if (error) {
//         console.error("Error:", error);
//         throw new Error(error.message);
//       }
//       // Use seconds instead of hours for testing purposes
//       const currentSecond = dayjs().second();
//       const todayDate = dayjs().startOf("minute"); // Start of the current minute for testing
//       const totalUsage = devices.reduce((total, device) => {
//         const deviceCreatedAt = dayjs(device.created_at);
//         // Calculate "seconds" since creation today
//         const secondsSinceCreationToday = deviceCreatedAt.isSame(
//           todayDate,
//           "minute"
//         )
//           ? Math.min(currentSecond - deviceCreatedAt.second(), currentSecond)
//           : currentSecond;
//         // Calculate today's usage for this device using seconds instead of hours
//         const usageToday =
//           device.device_unit_usage * Math.max(secondsSinceCreationToday, 0);
//         return total + usageToday;
//       }, 0);
//       const totalPriceToday = totalUsage * UNIT_PRICE;
//       console.log("Today's usage (in seconds):", {
//         totalUsage,
//         totalPriceToday,
//       });
//       return {
//         totalUsage,
//         totalPriceToday,
//       };
//     } catch (error) {
//       console.error("Error calculating today's usage (in seconds):", error);
//       throw new Error(
//         "Failed to calculate today's usage. Please try again later."
//       );
//     }
//   };


exports.calculateUsageAndPrice = calculateUsageAndPrice;