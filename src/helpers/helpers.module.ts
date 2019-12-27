import { Module } from '@nestjs/common';
import { replaceErrors } from './replace-errors.helper';

@Module({})
export class HelpersModule {
    replaceErrors(key: any, value: any) : any {
        return replaceErrors(key, value);
    }
}
