import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  get() {
    return {
      user: {
        name: 'test',
        email: 'test@example.com',
      },
    };
  }
}
