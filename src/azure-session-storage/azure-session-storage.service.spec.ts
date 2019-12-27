import { Test, TestingModule } from '@nestjs/testing';
import { AzureSessionStorageService } from './azure-session-storage.service';

describe('AzureSessionStorageService', () => {
  let service: AzureSessionStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureSessionStorageService],
    }).compile();

    service = module.get<AzureSessionStorageService>(AzureSessionStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
