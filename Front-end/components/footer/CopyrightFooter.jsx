const CopyrightFooter = () => {
  return (
    <div className="copyright-text">
      <p>
        © {new Date().getFullYear()} Una pagina de{" "}
        <a
          href="https://progps.com.do/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pro GPS and Technology
        </a>
        . Todos los derechos reservados.
      </p>
    </div>
  );
};

export default CopyrightFooter;
