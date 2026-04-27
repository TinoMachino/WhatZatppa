"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonTransform = jsonTransform;
const STRICT_DEPTH_LIMIT = 250;
const LENIENT_DEPTH_LIMIT = 5000;
const MAX_ARRAY_LENGTH = 10000;
const ERROR_PATH_MAX_DEPTH = 10;
const OMIT = Symbol('OMIT');
const OBJECT = Symbol('object');
function jsonTransform(input, transform, { strict = false, maxDepth = strict ? STRICT_DEPTH_LIMIT : LENIENT_DEPTH_LIMIT, } = {}) {
    const scalar = transformPrimitive(input, transform, strict);
    if (scalar === OMIT) {
        throw new TypeError('Invalid undefined value at $');
    }
    if (scalar !== OBJECT) {
        return scalar;
    }
    const root = Array.isArray(input)
        ? { type: 'array', depth: 0, copy: null, input }
        : { type: 'object', depth: 0, copy: null, input: input };
    const stack = [root];
    while (stack.length > 0) {
        const frame = stack.pop();
        if (frame.type === 'array') {
            const { depth, input, parent } = frame;
            if (input.length > MAX_ARRAY_LENGTH) {
                throw new TypeError(`Array is too long (length ${input.length}) at ${stringifyPath(parent)}`);
            }
            for (let index = 0; index < input.length; index++) {
                const child = input[index];
                const result = transformPrimitive(child, transform, strict, {
                    frame,
                    index,
                });
                if (result === OMIT) {
                    frame.copy ?? (frame.copy = performCopy(parent, input.slice()));
                    frame.copy[index] = null;
                }
                else if (result === OBJECT) {
                    addToStack(stack, depth, child, { frame, index }, maxDepth);
                }
                else if (result !== child) {
                    frame.copy ?? (frame.copy = performCopy(parent, input.slice()));
                    frame.copy[index] = result;
                }
            }
        }
        else {
            const { depth, input, parent } = frame;
            for (const [key, child] of Object.entries(input)) {
                const childParent = { frame, key };
                const result = transformPrimitive(child, transform, strict, childParent);
                if (result === OMIT) {
                    frame.copy ?? (frame.copy = performCopy(parent, { ...input }));
                    delete frame.copy[key];
                }
                else if (result === OBJECT) {
                    addToStack(stack, depth, child, childParent, maxDepth);
                }
                else if (result !== child) {
                    frame.copy ?? (frame.copy = performCopy(parent, { ...input }));
                    frame.copy[key] = result;
                }
            }
        }
    }
    return (root.copy ?? root.input);
}
function addToStack(stack, depth, child, parent, maxDepth) {
    if (depth >= maxDepth) {
        throw new TypeError(`Input is too deeply nested at ${stringifyPath(parent)}`);
    }
    if (Array.isArray(child)) {
        stack.push({
            type: 'array',
            depth: depth + 1,
            parent,
            input: child,
            copy: null,
        });
    }
    else {
        stack.push({
            type: 'object',
            depth: depth + 1,
            parent,
            input: child,
            copy: null,
        });
    }
}
function performCopy(parent, newValue) {
    let currentCopy = newValue;
    let currentParent = parent;
    while (currentParent) {
        if (currentParent.frame.copy != null) {
            if (isArrayParent(currentParent)) {
                currentParent.frame.copy[currentParent.index] = currentCopy;
            }
            else {
                currentParent.frame.copy[currentParent.key] = currentCopy;
            }
            break;
        }
        if (isArrayParent(currentParent)) {
            currentParent.frame.copy = currentParent.frame.input.slice();
            currentParent.frame.copy[currentParent.index] = currentCopy;
        }
        else {
            currentParent.frame.copy = { ...currentParent.frame.input };
            currentParent.frame.copy[currentParent.key] = currentCopy;
        }
        currentCopy = currentParent.frame.copy;
        currentParent = currentParent.frame.parent;
    }
    return newValue;
}
function isArrayParent(ref) {
    return ref.frame.type === 'array';
}
function transformPrimitive(input, transform, strictMode, parent) {
    switch (typeof input) {
        case 'object':
            if (input === null)
                return input;
            if (!Array.isArray(input)) {
                const transformed = transform(input);
                if (transformed !== undefined)
                    return transformed;
            }
            return OBJECT;
        case 'number':
            if (!strictMode || Number.isSafeInteger(input))
                return input;
            throw new TypeError(`Invalid number (got ${input}) at ${stringifyPath(parent)}`);
        case 'boolean':
        case 'string':
            return input;
        case 'undefined':
            return OMIT;
        default:
            throw new TypeError(`Invalid ${typeof input} at ${stringifyPath(parent)}`);
    }
}
function stringifyPath(parent) {
    const segments = [];
    while (parent) {
        segments.push(parent);
        parent = parent.frame.parent;
    }
    if (segments.length > ERROR_PATH_MAX_DEPTH) {
        return `$${segments
            .slice(-ERROR_PATH_MAX_DEPTH)
            .reverse()
            .map(stringifyParentRefIndex)
            .join('')}(...)`;
    }
    return `$${segments.reverse().map(stringifyParentRefIndex).join('')}`;
}
function stringifyParentRefIndex(parent) {
    if (isArrayParent(parent)) {
        return `[${parent.index}]`;
    }
    else if (/^[a-zA-Z_$][a-zA-Z0-9_]*$/.test(parent.key)) {
        return `.${parent.key}`;
    }
    else {
        return `[${JSON.stringify(parent.key)}]`;
    }
}
//# sourceMappingURL=json-transform.js.map