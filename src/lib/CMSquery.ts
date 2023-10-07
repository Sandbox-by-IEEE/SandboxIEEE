import { useQuerySubscription } from 'react-datocms/use-query-subscription';

type ChannelErrorData = {
  /** The code of the error (ie. `INVALID_QUERY`) */
  code: string;
  /** An human friendly message explaining the error */
  message: string;
  /** If the error is not fatal (ie. the query is invalid), the query will be retried after some time */
  fatal: boolean;
  /** The raw error response, if available */
  response?: any;
};

interface callbackType {
  fatalError?: (arg?: unknown) => void;
  success?: (arg?: unknown) => void;
}

function query(query: string) {
  return {
    query,
    token: `${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
  };
}

export default function useCMSQuery<T>(
  stringQuery: string,
  callback?: callbackType,
): {
  data: T | undefined;
  status: 'connecting' | 'connected' | 'closed';
  error: ChannelErrorData | null;
} {
  const { data, error, status } = useQuerySubscription<T>(query(stringQuery));

  if (status == 'connected' && callback && callback.success) {
    callback.success();
  }
  if (error?.fatal && callback && callback.fatalError) {
    callback.fatalError();
  }

  return { data, error, status };
}

export { query };
