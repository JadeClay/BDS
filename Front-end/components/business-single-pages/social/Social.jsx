const Social = ({facebook, instagram}) => {
  return (
    <div className="social-links">
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        style={{fontSize:20}}
      >
        <i className={`fab fa-facebook-f`}></i>
      </a>
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        style={{fontSize:20}}
      >
        <i className={`fab fa-instagram`}></i>
      </a>
    </div>
  );
};

export default Social;
