import { useDispatch } from 'react-redux';
import { useCallback } from 'react'; // 1. 引入 useCallback
import { createAsyncMessage } from '../slice/messageSlice';

function useMessage() {
  const dispatch = useDispatch();

  // 2. 用 useCallback 包起來，依賴陣列放 [dispatch]
  const showSuccess = useCallback(
    (message) => {
      dispatch(createAsyncMessage({ success: true, message }));
    },
    [dispatch],
  );

  const showError = useCallback(
    (error) => {
      const message = error?.response?.data?.message || error || '發生錯誤';
      dispatch(createAsyncMessage({ success: false, message }));
    },
    [dispatch],
  );

  return {
    showSuccess,
    showError,
  };
}

export default useMessage;
