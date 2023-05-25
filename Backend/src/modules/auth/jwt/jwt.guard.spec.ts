import { JWTGuard } from './jwt.guard';

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new JWTGuard()).toBeDefined();
  });
});
