import { observer } from 'mobx-react-lite';
import {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { contactsStore } from 'src/store/contactsStore';

export const FavoritListPage = observer(() => {

  useEffect(() => {
    contactsStore.getFavoriteContacts()
  }, []);

  if (contactsStore.loading) {
    return <div>Loading...</div>;
  }
  if (contactsStore.error) {
    return <div>Error</div>;
  }

  if (!contactsStore.favoriteContacts) {
    return <Empty />;
  }

  return (
    <Row xxl={4} className="g-4">
      {contactsStore.favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});