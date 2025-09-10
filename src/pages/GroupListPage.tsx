import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {Col, Row} from 'react-bootstrap';
import { Empty } from 'src/components/Empty';
import {GroupContactsCard} from 'src/components/GroupContactsCard';import { groupsStore } from 'src/store/groupsStore';


export const GroupListPage = observer(() => {
  useEffect(() => {
    groupsStore.getGroups()
  }, [])
  if (groupsStore.loading) {
    return (
      <div>Loading ...</div>
    )
  } if (groupsStore.error) {
    return <div>Error</div>;
  }
  if(!groupsStore.groups){
    return <Empty/>;
  }
  return (
    <Row xxl={4}>
      {groupsStore.groups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
