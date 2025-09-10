import { makeAutoObservable } from "mobx";
import { api } from "src/api";
import { ContactDto } from "src/types/dto/ContactDto";

interface Store {
  contacts: ContactDto[] | undefined;
  currentContact: ContactDto | undefined;
  favoriteContacts: ContactDto[] | undefined;
  loading: boolean;
  error: string | undefined;
  getContacts(): Generator<Promise<any>, void, ContactDto[]>;
  getCurrentContact(contactId: string): Generator<Promise<any>, void, ContactDto>;
  getFavoriteContacts(): Generator<Promise<any>, void, ContactDto[]>;
}

export const contactsStore = makeAutoObservable<Store>({
  contacts: undefined,
  currentContact: undefined,
  favoriteContacts: undefined,
  loading: false,
  error: undefined,

  *getContacts() {
    this.loading = true;
    this.error = undefined;
    try {
      const contacts: ContactDto[] = yield api.getContacts();
      this.contacts = contacts;
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  },

  *getCurrentContact(contactId: string) {
    this.loading = true;
    this.error = undefined;
    try {
      const contact: ContactDto = yield api.getCurrentContact(contactId);
      this.currentContact = contact;
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  },

  *getFavoriteContacts() {
    this.loading = true;
    this.error = undefined;
    try {
      const favorites: ContactDto[] = yield api.getFavoriteContacts();
      this.favoriteContacts = favorites;
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  }
}); 