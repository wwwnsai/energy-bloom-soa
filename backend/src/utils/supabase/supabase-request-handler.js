import pRetry, { AbortError } from "p-retry";

export const handleSupabaseRequest = async (
  requestFunction,
  description
) => {
  return pRetry(
    async () => {
      try {
        return await requestFunction();
      } catch (error) {
        const typedError = error; 
        console.error(`Error during ${description}:`, typedError);
        if (shouldRetry(typedError)) {
          throw typedError;
        } else {
          throw new AbortError(
            `Non-retryable error during ${description}: ${typedError.message}`
          );
        }
      }
    },
    {
      retries: 3,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 5000,
      onFailedAttempt: (error) => {
        console.warn(
          `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
        );
      },
    }
  );
};

const shouldRetry = (error) => { // Optionally type the error parameter as 'any'
  if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
    return true;
  }
  return false;
};
