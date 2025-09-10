import {memo} from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { ContactDto } from 'src/types/dto/ContactDto';

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
}

export const ContactCard = memo<ContactCardProps>(({contact, withLink = false}) => {
  return (
    <Card key={contact.id}>
      <Card.Img variant="top" src={contact.photo} />
      <Card.Body>
        <Card.Title>
          {withLink ? (
            <Link to={`/contact/${contact.id}`}>
              {contact.name}
            </Link>
          ) : (
            contact.name
          )}
        </Card.Title>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Link to={`tel:${contact.phone}`} target="_blank">
                {contact.phone}
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>{contact.birthday}</ListGroup.Item>
            <ListGroup.Item>{contact.address}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card.Body>
    </Card>
  );
});