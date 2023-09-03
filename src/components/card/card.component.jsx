import "./card.style.css";

const Card = ({ monster: { id, name, email } }) => {
  // const { id, name, email } = monster; //this is same s this above, but that upper is shorter and actually better
  return (
    <div className="card-container" key={id}>
      <img
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
        alt={`monster ${name}`}
      />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};
export default Card; 
