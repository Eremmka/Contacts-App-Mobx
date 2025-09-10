import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { contactsStore } from 'src/store/contactsStore';
import { groupsStore } from 'src/store/groupsStore';

export const ContactListPage: FC = observer(() => {
  const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([]);
  
  useEffect(() => {
    contactsStore.getContacts();
    groupsStore.getGroups();
  }, []);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    if (!contactsStore.contacts) {
      return;
    }

    let findContacts: ContactDto[] = [...contactsStore.contacts];
    
    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({ name }) => (
        name.toLowerCase().includes(fvName)
      ));
    }

    if (fv.groupId) {
      if (!groupsStore.groups) {
        return;
      }
      const groupContacts = groupsStore.groups.find(({ id }) => id === fv.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({ id }) => (
          groupContacts.contactIds.includes(id)
        ));
      }
    }
    setFilteredContacts(findContacts);
  };

  const error = contactsStore.error || groupsStore.error;
  const loading = contactsStore.loading || groupsStore.loading;

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!contactsStore.contacts?.length || !groupsStore.groups?.length) {
    return <div>No contacts found</div>;
  }

  const contactsToShow = filteredContacts.length > 0 ? filteredContacts : contactsStore.contacts;

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm 
          groupContactsList={groupsStore.groups} 
          initialValues={{}} 
          onSubmit={onSubmit} 
        />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {contactsToShow.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});