import { useToast } from '../contexts/ToastContext';

const Homepage = () => {
  const { addToast } = useToast();
  const test = () => {
    addToast('testing', 'success', 3000, 'top-left');
    addToast('testing', 'error', 3000, 'top-left');
    addToast('testing', 'info', 3000, 'top-left');
    addToast('testing', 'warning', 3000, 'top-left');
  };
  return (
    <div>
      <h1 onClick={test}>Toast Test</h1>
    </div>
  );
};

export default Homepage;
