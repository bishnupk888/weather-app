
import './loader.css'; // Import your loader styles

const Loader = () => {
  return (
    <div className="loader">
      <img src="/loader/sunLoader.gif" alt="Loading..." />
      <p>LOADING..</p>
    </div>
  );
};

export default Loader;