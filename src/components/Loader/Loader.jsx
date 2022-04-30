import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio
        height="100"
        width="100"
        color="rgb(81, 43, 184)"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
