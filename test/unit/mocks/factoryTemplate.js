export default `
import { MockService } from '../service/mockService.js';
import { MockRepository } from '../repository/mockRepository.js';

export class MockFactory {
  static getInstance() {
    const repository = new MockRepository();
    const service = new MockService({ repository });
    return service;
  }
}
`;
