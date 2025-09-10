import {ContactDto} from './ContactDto';

export interface GroupContactsDto {
  id: string;
  name: string,
  description: string,
  photo: string,
  contactIds: ContactDto['id'][]
}
