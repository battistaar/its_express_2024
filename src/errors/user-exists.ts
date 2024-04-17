export class UserExistsError extends Error {
  constructor() {
    super();
    this.name = 'UserExists';
    this.message = 'username already in use';
  }
}