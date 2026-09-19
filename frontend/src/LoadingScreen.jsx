import "./LoadingScreen.css";

function LoadingScreen({ text = "Memuat data...", subtext = "Mohon tunggu sebentar" }) {
  return (
    <div className="loading-screen-container">
      <div className="loading-card">
        <div className="loading-spinner-wrapper">
          <div className="loading-spinner-ring"></div>
          <div className="loading-spinner-core"></div>
        </div>
        <h3 className="loading-title">{text}</h3>
        <p className="loading-subtitle">{subtext}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
