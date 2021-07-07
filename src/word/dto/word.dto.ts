import { IsString } from "class-validator"

/**
 * Represents the body sent to the api: <br>
 * - actionType: which action perform -> search or validate.
 * - word: the word to be validated or searched.
 */
export class WordDto {
    @IsString()
    readonly word: string;
}
