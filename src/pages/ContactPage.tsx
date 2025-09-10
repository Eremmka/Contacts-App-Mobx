import { useEffect } from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { contactsStore } from 'src/store/contactsStore';

export const ContactPage = observer(() => {
  const { contactId } = useParams<{ contactId: string }>();
  
  useEffect(() => {
    if(contactId) {
      contactsStore.getCurrentContact(contactId)
    }
  }, [contactId]);

  if(!contactsStore.currentContact){
    return null;
  }
  if (contactsStore.loading) {
    return <div>Загрузка...</div>;
  }
  if (contactsStore.error) {
    return <div>Ошибка загрузки данных</div>;
  }
  if (!contactId) {
    return <div>ID контакта не указан</div>;
  }
  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        <ContactCard contact={contactsStore.currentContact}/>
      </Col>
    </Row>
  );
});