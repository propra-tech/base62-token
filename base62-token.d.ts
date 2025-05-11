// Type definitions for base62-token 1.1.1
// Project: https://github.com/therootcompany/base62-token.js

declare module "base62-token" {
  interface TokenGenerator {
    /**
     * Generate a prefixed, 32-bit checksummed, random token
     * @param pre - token prefix (usually 4 characters in the style of 'xxx_')
     * @param charlen - the number of characters to generate
     * @returns a prefixed, 32-bit checksummed, random token
     */
    generate(pre: string, charlen: number): string;

    /**
     * Generate a 32-bit checksum in 6 base62 characters
     * @param str - a prefixed token, without the checksum part
     * @returns a 32-bit checksum in 6 base62 characters
     */
    _checksum(str: string): string;

    /**
     * Verify a token's checksum
     * @param token - a prefixed, 32-bit checksummed token
     * @returns whether or not the checksum matches the token
     */
    verify(token: string): boolean;

    /**
     * Returns the dictionary used by this token generator
     * @returns the dictionary as a string
     */
    _dict(): string;
  }

  interface Base62Token {
    /** The number of bits per character in a base62 encoding (approx. 5.954) */
    BITS_PER_CHARACTER: number;

    /**
     * Creates a Token Generator & Verifier using the given dictionary.
     * @param dict - a secure (random) base62 (alphanumeric) dictionary
     * @returns a token generator object
     */
    create(dict: string): TokenGenerator;

    /**
     * Calculate the minimum bits of entropy guaranteed by a given number of characters
     * @param charlen - the number of random characters in a string
     * @returns the (minimum) guaranteed bits of entropy in a string of length 'charlen'
     */
    calcMinBits(charlen: number): number;

    /**
     * Calculate the minimum chars needed (excluded known-prefix) to arrive at the target bit entropy
     * @param bitlen - the target bit-entropy, in bits (ex: 128, 160, 256)
     * @returns the number of characters required to guarantee a minimum of the target entropy
     */
    calcMinChars(bitlen: number): number;

    /**
     * Base62 encode a number
     * @param alphabet - a base62 alphabet
     * @param n - a 32-bit unsigned integer (i.e. the >>> shifted CRC32 checksum)
     * @param pad - the .padStart() amount (6 chars for a 32-bit checksum)
     * @returns the base62 encoded value
     */
    encode(alphabet: string, n: number, pad?: number): string;

    /**
     * Generate a token with checksum
     * @param alphabet - a base62 alphabet
     * @param pre - token prefix (usually 4 characters in the style of 'xxx_')
     * @param charlen - the number of characters to generate
     * @returns a prefixed, 32-bit checksummed, random token
     */
    generate(alphabet: string, pre: string, charlen: number): string;

    /**
     * Generate a checksum for a string
     * @param alphabet - a base62 alphabet
     * @param str - the string to checksum
     * @returns a 32-bit checksum in 6 base62 characters
     */
    checksum(alphabet: string, str: string): string;

    /**
     * Verify a token's checksum
     * @param alphabet - a base62 alphabet
     * @param token - a prefixed, 32-bit checksummed token
     * @returns whether or not the checksum matches the token
     */
    verify(alphabet: string, token: string): boolean;

    /**
     * Generate a base62 dictionary
     * @returns a lexographic base62 dictionary
     */
    generateDictionary(): string;

    /**
     * Knuth-Shuffle an array
     * @param array - the array to shuffle
     * @returns the shuffled array
     */
    _shuffle<T>(array: T[]): T[];

    /**
     * Generate a random string using the alphabet
     * @param alphabet - a base62 alphabet
     * @param charlen - the number of characters to generate
     * @returns a random string of specified length
     */
    _rnd(alphabet: string | string[], charlen: number): string;
  }

  const BaseToken: Base62Token;
  export = BaseToken;
}
