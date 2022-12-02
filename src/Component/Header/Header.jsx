import "./Header.css";
function Header({ onClick }) {
  return (
    <div className="Header">
      <button
        className="addNewTAsk"
        onClick={onClick}
      >
        ADD
      </button>
    </div>
  );
}

export default Header;
