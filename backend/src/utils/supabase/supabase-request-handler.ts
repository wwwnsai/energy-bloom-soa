import pRetry, { AbortError } from "p-retry";

// Define the type for requestFunction
type RequestFunction = () => Promise<any>;

export const handleSupabaseRequest = async (
  requestFunction: RequestFunction, // Explicitly type the requestFunction
  description: string
) => {
  return pRetry(
    async () => {
      try {
        return await requestFunction();
      } catch (error) {
        const typedError = error as any; 
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
      onFailedAttempt: (error: any) => {
        console.warn(
          `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
        );
      },
    }
  );
};

const shouldRetry = (error: any): boolean => { // Optionally type the error parameter as 'any'
  if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
    return true;
  }
  return false;
};
