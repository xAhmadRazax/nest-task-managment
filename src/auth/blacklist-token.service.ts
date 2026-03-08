import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistTokens } from './entities/blackListToken.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistTokenService {
  constructor(
    @InjectRepository(BlacklistTokens)
    private readonly blackListTokenRepo: Repository<BlacklistTokens>,
  ) {}

  blacklistToken(token: string) {
    return this.blackListTokenRepo.save({ token: token });
  }
  async isTokenBlackListed(token: string): Promise<boolean> {
    const blackListToken = await this.blackListTokenRepo.findOne({
      where: { token },
    });
    return !!blackListToken;
  }
}
