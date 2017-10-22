/*
This module clones the exception hierarcy of python3 to the degree that
it makes sense to do so. Exceptions that have no meaning on the frontend
are left out and exceptions that need to be added to deal with new situations
are added

https://docs.python.org/3.6/library/exceptions.html

The purpose of this module is to add more rigidity to the error handling
practices on the frontend
*/

/**
Base exception from which all other exceptions inherit
*/
export class Exception extends Error {}

/**
 * The base class for the exceptions that are raised when a key or index used
 * on a mapping or sequence is invalid: IndexError, KeyError.
 */
export class LookupError extends Exception {}

/**
 * Raised when a sequence subscript is out of range.
 */
export class IndexError extends Exception {}


/**
 * Raised when a built-in operation or function receives
 * an argument that has the right type but an inappropriate
 * value, and the situation is not described by a more precise
 * exception such as IndexError.
 */
export class ValueError extends Exception {}

/**
 * Raised in the case of arguments to a function are invalid
 */
export class IllegalArgumentException extends ValueError {}
