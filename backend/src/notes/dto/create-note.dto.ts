import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CategoryDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    name?: string;
}

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    @IsOptional()
    isArchived?: boolean;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    categories?: CategoryDto[];
}
