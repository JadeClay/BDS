const CopyrightFooter = () => {
  return (
    <div className="copyright-text">
      <p>
        © {new Date().getFullYear()} Una pagina de{" "}
        <a
          href="https://linktr.ee/progpsrd?fbclid=PAAaazy3rMautW1Ws8_QD32pTUyu7Yej3N7uWJUzTgUIVfkrz6Izrx-DyfDQM_aem_AXhIeBpTCSUXAKo20E_VuzJr-eEgBUJZOWmS74l3imroz5eYLlUc3O-MuxsACnNeLkY"
          target="_blank"
          rel="noopener noreferrer"
        >
          PRO GPS & TECHNOLOGY
        </a>
        . Todos los derechos reservados.
      </p>
    </div>
  );
};

export default CopyrightFooter;
