type ResponseHandler = (res: Response) => void;
type ErrorHandler = (err: Error) => void;
type RetryHandler = () => void;
type CancelFunc = () => void;

const RETRY_INTERVAL_MS = 3000;

function subscribe(
  url: string,
  onResponse: ResponseHandler,
  onError: ErrorHandler,
  onRetry: RetryHandler
): CancelFunc {
  const options = { cancel: false };

  async function subscribeHelper() {
    if (options.cancel) return;

    try {
      const response = await fetch(url);

      if (options.cancel) return;

      if (response.status === 504) {
        // Connection timeout
        // happens when the connection was pending for too long
        // let's reconnect
        await subscribeHelper();
      } else if (response.status !== 200) {
        // Show Error
        onError(new Error(response.statusText));
        // Reconnect in few seconds
        await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS));
        onRetry();
        await subscribeHelper();
      } else {
        // Got a response
        onResponse(response);
        await subscribeHelper();
      }
    } catch (e) {
      // Show Error
      onError(e as Error);
      // Reconnect in few seconds
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS));
      onRetry();
      await subscribeHelper();
    }
  }

  subscribeHelper();
  return () => (options.cancel = true);
}
export default subscribe;
