import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { groupsStore } from 'src/store/groupsStore';
import { observer } from 'mobx-react-lite';

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();

  useEffect(() => {
    if(groupId) {
      groupsStore.getCurrentGroup(groupId);
    }
  }, [groupId]);

  if (groupsStore.loading) {
    return <div>Loading...</div>;
  }
  if (groupsStore.error) {
    return <div>Error</div>;
  }
  if (!groupsStore.currentGroup) {
    return <Empty />;
  }

  return (
    <Row className="g-4">
      <Col xxl={12}>
        <Row xxl={3}>
          <Col className="mx-auto">
            <GroupContactsCard groupContacts={groupsStore.currentGroup.group} />
          </Col>
        </Row>
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {groupsStore.currentGroup.groupContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});