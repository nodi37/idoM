import { Configuration, Value } from '@itgorillaz/configify';
import { IsString } from 'class-validator';

@Configuration()
export class BasicAuthConfig {
  @IsString()
  @Value('BASIC_AUTH_USER')
  authUser: string;

  @IsString()
  @Value('BASIC_AUTH_PASS')
  authPassword: string;
}
