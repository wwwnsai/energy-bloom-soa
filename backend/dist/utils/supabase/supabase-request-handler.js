var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pRetry, { AbortError } from "p-retry";
export const handleSupabaseRequest = (requestFunction, // Explicitly type the requestFunction
description) => __awaiter(void 0, void 0, void 0, function* () {
    return pRetry(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestFunction();
        }
        catch (error) {
            const typedError = error;
            console.error(`Error during ${description}:`, typedError);
            if (shouldRetry(typedError)) {
                throw typedError;
            }
            else {
                throw new AbortError(`Non-retryable error during ${description}: ${typedError.message}`);
            }
        }
    }), {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 5000,
        onFailedAttempt: (error) => {
            console.warn(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
        },
    });
});
const shouldRetry = (error) => {
    if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
        return true;
    }
    return false;
};
