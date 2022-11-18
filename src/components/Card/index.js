import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

function CardComp({id,title, body, img, btnText, clickExterno}) {

  return ( 
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={img} alt='product' />
    
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        {body}
      </Card.Text>
      <Button 
        onClick={clickExterno} 
        variant="primary"
        value={id}
      >{btnText}</Button>
    </Card.Body>
  </Card>
   );
}

export default CardComp;