export default `
export class MockRepository {
  constructor() {}

  create(repoCreateDTO) {
    return Promise.reject("Method not impleented!");
  }

  read(query) {
    return Promise.reject("Method not impleented!");
  }

  update(repoUpdateDTO) {
    return Promise.reject("Method not impleented!");
  }

  delete(id) {
    return Promise.reject("Method not impleented!");
  }
}
`;
