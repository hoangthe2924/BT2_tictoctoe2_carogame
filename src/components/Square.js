import "./Square.css"

function Square({value, highlight, onClick}) {
    const isHighlight = highlight;
    const classes = "square " + (isHighlight ? "highlight-square" : "");
    return (
      <button className={classes} onClick={onClick}>
        {value}
      </button>
    );
}

export default Square;