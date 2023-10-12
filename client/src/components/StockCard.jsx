import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const StockCard = ({ title, cost, imgSrc }) => {
  return (
    <Card width="100%">
      <Card.Img variant="top" src={process.env.PUBLIC_URL + imgSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>R {cost}</Card.Text>
        <Button variant="primary">Buy</Button>
      </Card.Body>
    </Card>
  );
};

export default StockCard;
