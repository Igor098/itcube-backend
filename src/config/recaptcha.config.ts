import { isDev } from '@/libs/common/utils/is-dev.util';
import { type ConfigService } from '@nestjs/config';
import { type GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';

export const getRecaptchaConfig = async (
  configService: ConfigService,
): Promise<GoogleRecaptchaModuleOptions> => ({
  secretKey: configService.getOrThrow<string>('GOOGLE_RECAPTCHA_SECRET_KEY'),
  response: (req) => req.headers.recaptcha,
  skipIf: isDev(configService),
});
