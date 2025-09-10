import { makeAutoObservable } from "mobx";
import { api } from "src/api";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

interface Store {
  groups: GroupContactsDto[] | undefined;
  currentGroup: {
    group: GroupContactsDto;
    groupContacts: ContactDto[];
  } | undefined;
  loading: boolean;
  error: string | undefined;
  getGroups(): Generator<Promise<any>, void, GroupContactsDto[]>;
  getCurrentGroup(groupId: string): Generator<Promise<any>, void, any>;
}

export const groupsStore = makeAutoObservable<Store>({
  groups: undefined,
  currentGroup: undefined,
  loading: false,
  error: undefined,

  *getGroups() {
    this.loading = true;
    this.error = undefined;
    try {
      const groups: GroupContactsDto[] = yield api.getGroups();
      this.groups = groups;
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  },

  *getCurrentGroup(groupId: string) {
    this.loading = true;
    this.error = undefined;
    try {
      const groupContacts: ContactDto[] = yield api.getCurrentGroupContacts(groupId);
      const group: GroupContactsDto = yield api.getCurrentGroups(groupId);
      
      this.currentGroup = {
        group: group,
        groupContacts: groupContacts
      };
    } catch (error) {
      this.error = (error as Error).message;
      this.currentGroup = undefined;
    } finally {
      this.loading = false;
    }
  }
});