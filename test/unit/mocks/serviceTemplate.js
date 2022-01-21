export default `
export class MockService {
  constructor({ repository: MockRepository}) {
    this.mockRepository = MockRepository;
  }

  create(repoCreateDTO) {
    return this.mockRepository.create(repoCreateDTO)
  }

  read(query) {
    return this.mockRepository.read(query)
  }

  update(repoUpdateDTO) {
    return this.mockRepository.update(repoUpdateDTO)
  }

  delete(id) {
    return this.mockRepository.delete(id)
  }
}
`;
