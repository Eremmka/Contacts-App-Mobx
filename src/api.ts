import { ContactDto } from "./types/dto/ContactDto";
import { GroupContactsDto } from "./types/dto/GroupContactsDto";

class Api {
  async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in fetchData:', error);
      throw error;
    }
  }

  async getGroups(): Promise<GroupContactsDto[]> {
    try {
      const response = await fetch('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in getGroups:', error);
      throw error;
    }
  }
  
  async getCurrentGroupContacts(groupId: string): Promise<ContactDto[]> {
    try {
      const [responseGroups, responseContacts] = await Promise.all([
        fetch('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json'),
        fetch('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json')
      ]);

      if (!responseGroups.ok || !responseContacts.ok) {
        throw new Error('Failed to fetch groups or contacts');
      }

      const [dataContacts, dataGroups] = await Promise.all([
        responseContacts.json() as Promise<ContactDto[]>,
        responseGroups.json() as Promise<GroupContactsDto[]>
      ]);

      const group = dataGroups.find(group => group.id === groupId);
      if (!group) {
        throw new Error(`Group with id ${groupId} not found`);
      }

      const groupContacts = dataContacts.filter(contact => 
        group.contactIds.includes(contact.id)
      );
      
      return groupContacts;
    } catch (error) {
      console.error('Error in getCurrentGroupContacts:', error);
      throw error;
    }
  }

  async getCurrentGroups(groupId: string): Promise<GroupContactsDto> {
    try {
      const responseGroups = await fetch('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json');
      
      if (!responseGroups.ok) {
        throw new Error(`HTTP error! status: ${responseGroups.status}`);
      }

      const dataGroups: GroupContactsDto[] = await responseGroups.json();
      const group = dataGroups.find(group => group.id === groupId);
      
      if (!group) {
        throw new Error(`Group with id ${groupId} not found`);
      }
      
      return group;
    } catch (error) {
      console.error('Error in getCurrentGroups:', error);
      throw error;
    }
  }

  async getContacts(): Promise<ContactDto[]> {
    try {
      const response = await fetch('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error in getContacts:', error);
      throw error;
    }
  }

  async getFavoriteContacts(): Promise<ContactDto[]> {
    try {
      const data = await this.fetchData<ContactDto[]>('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json');
      return data.slice(0, 4);
    } catch (error) {
      console.error('Error in getFavoriteContacts:', error);
      throw error;
    }
  }

  async getCurrentContact(contactId: string): Promise<ContactDto> {
    try {
      const response = await fetch('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ContactDto[] = await response.json();
      const contact = data.find(contact => contact.id === contactId);
      
      if (!contact) {
        throw new Error(`Contact with id ${contactId} not found`);
      }
      
      return contact;
    } catch (error) {
      console.error('Error in getCurrentContact:', error);
      throw error;
    }
  }
}

export const api = new Api();