import { useSelector } from 'react-redux';

function MessageToast() {
  // 從 Redux 取出訊息陣列
  const messages = useSelector((state) => state.message);

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 2000 }}
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`toast-header text-white bg-${msg.type}`}>
            <strong className="me-auto">{msg.title}</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{msg.text}</div>
        </div>
      ))}
    </div>
  );
}

export default MessageToast;
