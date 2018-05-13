import { observable } from 'mobx';

class OnlineStore {
  @observable online;

  constructor() {
    this.online = navigator.onLine;
    window.addEventListener('online', () => {
      this.online = true;
    });
    window.addEventListener('offline', () => {
      this.online = false;
    });
  }
}

export default new OnlineStore();
