const Card = (props) => {
  const { num, color, id, compareClickedAndSelected } = props;

  return (
    <div
      className='card'
      id={id}
      style={{ color: color }}
      onClick={compareClickedAndSelected}
    >
      <p>{num}</p>
    </div>
  )
}

export default Card;
