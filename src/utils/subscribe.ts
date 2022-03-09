type ResponseHandler = (res: Response) => void;
type ErrorHandler = (err: Error) => void;
type CancelFunc = () => void;

function subscribe(
  url: string,
  onResponse: ResponseHandler,
  onError: ErrorHandler
): CancelFunc {
  const options = { cancel: false };

  async function subscribeHelper() {
    if (options.cancel) return;

    const response = await fetch(url);

    if (options.cancel) return;

    if (response.status == 502) {
      // Connection timeout
      // happens when the connection was pending for too long
      // let's reconnect
      await subscribeHelper();
    } else if (response.status != 200) {
      // Show Error
      onError(new Error(response.statusText));
      // Reconnect in one second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await subscribeHelper();
    } else {
      // Got a response
      onResponse(response);
      await subscribeHelper();
    }
  }

  subscribeHelper();
  return () => (options.cancel = true);
}
export default subscribe;