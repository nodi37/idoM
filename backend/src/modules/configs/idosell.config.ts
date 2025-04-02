import { Configuration, Value } from '@itgorillaz/configify';
import { IsString } from 'class-validator';

@Configuration()
export class IdosellConfig {
  @IsString()
  @Value('IDOSELL_TOKEN')
  authToken: string;

  @IsString()
  @Value('IDOSELL_DOMAIN')
  domain: string;
}
