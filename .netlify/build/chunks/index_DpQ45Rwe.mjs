import { at as getDefaultExportFromCjs } from './astro/server_e4nm4Znd.mjs';
import { Writable } from 'node:stream';

/** Types of elements found in htmlparser2's DOM */
var ElementType;
(function (ElementType) {
    /** Type for the root element of a document */
    ElementType["Root"] = "root";
    /** Type for Text */
    ElementType["Text"] = "text";
    /** Type for <? ... ?> */
    ElementType["Directive"] = "directive";
    /** Type for <!-- ... --> */
    ElementType["Comment"] = "comment";
    /** Type for <script> tags */
    ElementType["Script"] = "script";
    /** Type for <style> tags */
    ElementType["Style"] = "style";
    /** Type for Any tag */
    ElementType["Tag"] = "tag";
    /** Type for <![CDATA[ ... ]]> */
    ElementType["CDATA"] = "cdata";
    /** Type for <!doctype ...> */
    ElementType["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */
function isTag$1(elem) {
    return (elem.type === ElementType.Tag ||
        elem.type === ElementType.Script ||
        elem.type === ElementType.Style);
}
// Exports for backwards compatibility
/** Type for the root element of a document */
const Root = ElementType.Root;
/** Type for Text */
const Text$1 = ElementType.Text;
/** Type for <? ... ?> */
const Directive = ElementType.Directive;
/** Type for <!-- ... --> */
const Comment$1 = ElementType.Comment;
/** Type for <script> tags */
const Script = ElementType.Script;
/** Type for <style> tags */
const Style = ElementType.Style;
/** Type for Any tag */
const Tag = ElementType.Tag;
/** Type for <![CDATA[ ... ]]> */
const CDATA$1 = ElementType.CDATA;
/** Type for <!doctype ...> */
const Doctype = ElementType.Doctype;

/**
 * This object will be used as the prototype for Nodes when creating a
 * DOM-Level-1-compliant structure.
 */
class Node {
    constructor() {
        /** Parent of the node */
        this.parent = null;
        /** Previous sibling */
        this.prev = null;
        /** Next sibling */
        this.next = null;
        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
        this.startIndex = null;
        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
        this.endIndex = null;
    }
    // Read-write aliases for properties
    /**
     * Same as {@link parent}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get parentNode() {
        return this.parent;
    }
    set parentNode(parent) {
        this.parent = parent;
    }
    /**
     * Same as {@link prev}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get previousSibling() {
        return this.prev;
    }
    set previousSibling(prev) {
        this.prev = prev;
    }
    /**
     * Same as {@link next}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get nextSibling() {
        return this.next;
    }
    set nextSibling(next) {
        this.next = next;
    }
    /**
     * Clone this node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */
    cloneNode(recursive = false) {
        return cloneNode(this, recursive);
    }
}
/**
 * A node that contains some data.
 */
class DataNode extends Node {
    /**
     * @param data The content of the data node
     */
    constructor(data) {
        super();
        this.data = data;
    }
    /**
     * Same as {@link data}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get nodeValue() {
        return this.data;
    }
    set nodeValue(data) {
        this.data = data;
    }
}
/**
 * Text within the document.
 */
class Text extends DataNode {
    constructor() {
        super(...arguments);
        this.type = ElementType.Text;
    }
    get nodeType() {
        return 3;
    }
}
/**
 * Comments within the document.
 */
class Comment extends DataNode {
    constructor() {
        super(...arguments);
        this.type = ElementType.Comment;
    }
    get nodeType() {
        return 8;
    }
}
/**
 * Processing instructions, including doc types.
 */
class ProcessingInstruction extends DataNode {
    constructor(name, data) {
        super(data);
        this.name = name;
        this.type = ElementType.Directive;
    }
    get nodeType() {
        return 1;
    }
}
/**
 * A `Node` that can have children.
 */
class NodeWithChildren extends Node {
    /**
     * @param children Children of the node. Only certain node types can have children.
     */
    constructor(children) {
        super();
        this.children = children;
    }
    // Aliases
    /** First child of the node. */
    get firstChild() {
        var _a;
        return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
    }
    /** Last child of the node. */
    get lastChild() {
        return this.children.length > 0
            ? this.children[this.children.length - 1]
            : null;
    }
    /**
     * Same as {@link children}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get childNodes() {
        return this.children;
    }
    set childNodes(children) {
        this.children = children;
    }
}
class CDATA extends NodeWithChildren {
    constructor() {
        super(...arguments);
        this.type = ElementType.CDATA;
    }
    get nodeType() {
        return 4;
    }
}
/**
 * The root node of the document.
 */
class Document extends NodeWithChildren {
    constructor() {
        super(...arguments);
        this.type = ElementType.Root;
    }
    get nodeType() {
        return 9;
    }
}
/**
 * An element within the DOM.
 */
class Element extends NodeWithChildren {
    /**
     * @param name Name of the tag, eg. `div`, `span`.
     * @param attribs Object mapping attribute names to attribute values.
     * @param children Children of the node.
     */
    constructor(name, attribs, children = [], type = name === "script"
        ? ElementType.Script
        : name === "style"
            ? ElementType.Style
            : ElementType.Tag) {
        super(children);
        this.name = name;
        this.attribs = attribs;
        this.type = type;
    }
    get nodeType() {
        return 1;
    }
    // DOM Level 1 aliases
    /**
     * Same as {@link name}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get tagName() {
        return this.name;
    }
    set tagName(name) {
        this.name = name;
    }
    get attributes() {
        return Object.keys(this.attribs).map((name) => {
            var _a, _b;
            return ({
                name,
                value: this.attribs[name],
                namespace: (_a = this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
                prefix: (_b = this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
            });
        });
    }
}
/**
 * @param node Node to check.
 * @returns `true` if the node is a `Element`, `false` otherwise.
 */
function isTag(node) {
    return isTag$1(node);
}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
 */
function isCDATA(node) {
    return node.type === ElementType.CDATA;
}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Text`, `false` otherwise.
 */
function isText(node) {
    return node.type === ElementType.Text;
}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Comment`, `false` otherwise.
 */
function isComment(node) {
    return node.type === ElementType.Comment;
}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */
function isDirective(node) {
    return node.type === ElementType.Directive;
}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */
function isDocument(node) {
    return node.type === ElementType.Root;
}
/**
 * Clone a node, and optionally its children.
 *
 * @param recursive Clone child nodes as well.
 * @returns A clone of the node.
 */
function cloneNode(node, recursive = false) {
    let result;
    if (isText(node)) {
        result = new Text(node.data);
    }
    else if (isComment(node)) {
        result = new Comment(node.data);
    }
    else if (isTag(node)) {
        const children = recursive ? cloneChildren(node.children) : [];
        const clone = new Element(node.name, { ...node.attribs }, children);
        children.forEach((child) => (child.parent = clone));
        if (node.namespace != null) {
            clone.namespace = node.namespace;
        }
        if (node["x-attribsNamespace"]) {
            clone["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
        }
        if (node["x-attribsPrefix"]) {
            clone["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
        }
        result = clone;
    }
    else if (isCDATA(node)) {
        const children = recursive ? cloneChildren(node.children) : [];
        const clone = new CDATA(children);
        children.forEach((child) => (child.parent = clone));
        result = clone;
    }
    else if (isDocument(node)) {
        const children = recursive ? cloneChildren(node.children) : [];
        const clone = new Document(children);
        children.forEach((child) => (child.parent = clone));
        if (node["x-mode"]) {
            clone["x-mode"] = node["x-mode"];
        }
        result = clone;
    }
    else if (isDirective(node)) {
        const instruction = new ProcessingInstruction(node.name, node.data);
        if (node["x-name"] != null) {
            instruction["x-name"] = node["x-name"];
            instruction["x-publicId"] = node["x-publicId"];
            instruction["x-systemId"] = node["x-systemId"];
        }
        result = instruction;
    }
    else {
        throw new Error(`Not implemented yet: ${node.type}`);
    }
    result.startIndex = node.startIndex;
    result.endIndex = node.endIndex;
    if (node.sourceCodeLocation != null) {
        result.sourceCodeLocation = node.sourceCodeLocation;
    }
    return result;
}
function cloneChildren(childs) {
    const children = childs.map((child) => cloneNode(child, true));
    for (let i = 1; i < children.length; i++) {
        children[i].prev = children[i - 1];
        children[i - 1].next = children[i];
    }
    return children;
}

// Default options
const defaultOpts = {
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false,
};
class DomHandler {
    /**
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */
    constructor(callback, options, elementCB) {
        /** The elements of the DOM */
        this.dom = [];
        /** The root element for the DOM */
        this.root = new Document(this.dom);
        /** Indicated whether parsing has been completed. */
        this.done = false;
        /** Stack of open tags. */
        this.tagStack = [this.root];
        /** A data node that is still being written to. */
        this.lastNode = null;
        /** Reference to the parser instance. Used for location information. */
        this.parser = null;
        // Make it possible to skip arguments, for backwards-compatibility
        if (typeof options === "function") {
            elementCB = options;
            options = defaultOpts;
        }
        if (typeof callback === "object") {
            options = callback;
            callback = undefined;
        }
        this.callback = callback !== null && callback !== void 0 ? callback : null;
        this.options = options !== null && options !== void 0 ? options : defaultOpts;
        this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
    }
    onparserinit(parser) {
        this.parser = parser;
    }
    // Resets the handler back to starting state
    onreset() {
        this.dom = [];
        this.root = new Document(this.dom);
        this.done = false;
        this.tagStack = [this.root];
        this.lastNode = null;
        this.parser = null;
    }
    // Signals the handler that parsing is done
    onend() {
        if (this.done)
            return;
        this.done = true;
        this.parser = null;
        this.handleCallback(null);
    }
    onerror(error) {
        this.handleCallback(error);
    }
    onclosetag() {
        this.lastNode = null;
        const elem = this.tagStack.pop();
        if (this.options.withEndIndices) {
            elem.endIndex = this.parser.endIndex;
        }
        if (this.elementCB)
            this.elementCB(elem);
    }
    onopentag(name, attribs) {
        const type = this.options.xmlMode ? ElementType.Tag : undefined;
        const element = new Element(name, attribs, undefined, type);
        this.addNode(element);
        this.tagStack.push(element);
    }
    ontext(data) {
        const { lastNode } = this;
        if (lastNode && lastNode.type === ElementType.Text) {
            lastNode.data += data;
            if (this.options.withEndIndices) {
                lastNode.endIndex = this.parser.endIndex;
            }
        }
        else {
            const node = new Text(data);
            this.addNode(node);
            this.lastNode = node;
        }
    }
    oncomment(data) {
        if (this.lastNode && this.lastNode.type === ElementType.Comment) {
            this.lastNode.data += data;
            return;
        }
        const node = new Comment(data);
        this.addNode(node);
        this.lastNode = node;
    }
    oncommentend() {
        this.lastNode = null;
    }
    oncdatastart() {
        const text = new Text("");
        const node = new CDATA([text]);
        this.addNode(node);
        text.parent = node;
        this.lastNode = text;
    }
    oncdataend() {
        this.lastNode = null;
    }
    onprocessinginstruction(name, data) {
        const node = new ProcessingInstruction(name, data);
        this.addNode(node);
    }
    handleCallback(error) {
        if (typeof this.callback === "function") {
            this.callback(error, this.dom);
        }
        else if (error) {
            throw error;
        }
    }
    addNode(node) {
        const parent = this.tagStack[this.tagStack.length - 1];
        const previousSibling = parent.children[parent.children.length - 1];
        if (this.options.withStartIndices) {
            node.startIndex = this.parser.startIndex;
        }
        if (this.options.withEndIndices) {
            node.endIndex = this.parser.endIndex;
        }
        parent.children.push(node);
        if (previousSibling) {
            node.prev = previousSibling;
            previousSibling.next = node;
        }
        node.parent = parent;
        this.lastNode = null;
    }
}

const e=/\n/g;function n(n){const o=[...n.matchAll(e)].map((e=>e.index||0));o.unshift(-1);const s=t(o,0,o.length);return e=>r(s,e)}function t(e,n,r){if(r-n==1)return {offset:e[n],index:n+1};const o=Math.ceil((n+r)/2),s=t(e,n,o),l=t(e,o,r);return {offset:s.offset,low:s,high:l}}function r(e,n){return function(e){return Object.prototype.hasOwnProperty.call(e,"index")}(e)?{line:e.index,column:n-e.offset}:r(e.high.offset<n?e.high:e.low,n)}function o(e,t="",r={}){const o="string"!=typeof t?t:r,l="string"==typeof t?t:"",c=e.map(s),f=!!o.lineNumbers;return function(e,t=0){const r=f?n(e):()=>({line:0,column:0});let o=t;const s=[];e:for(;o<e.length;){let n=false;for(const t of c){t.regex.lastIndex=o;const c=t.regex.exec(e);if(c&&c[0].length>0){if(!t.discard){const e=r(o),n="string"==typeof t.replace?c[0].replace(new RegExp(t.regex.source,t.regex.flags),t.replace):c[0];s.push({state:l,name:t.name,text:n,offset:o,len:c[0].length,line:e.line,column:e.column});}if(o=t.regex.lastIndex,n=true,t.push){const n=t.push(e,o);s.push(...n.tokens),o=n.offset;}if(t.pop)break e;break}}if(!n)break}return {tokens:s,offset:o,complete:e.length<=o}}}function s(e,n){return {...e,regex:l(e,n)}}function l(e,n){if(0===e.name.length)throw new Error(`Rule #${n} has empty name, which is not allowed.`);if(function(e){return Object.prototype.hasOwnProperty.call(e,"regex")}(e))return function(e){if(e.global)throw new Error(`Regular expression /${e.source}/${e.flags} contains the global flag, which is not allowed.`);return e.sticky?e:new RegExp(e.source,e.flags+"y")}(e.regex);if(function(e){return Object.prototype.hasOwnProperty.call(e,"str")}(e)){if(0===e.str.length)throw new Error(`Rule #${n} ("${e.name}") has empty "str" property, which is not allowed.`);return new RegExp(c(e.str),"y")}return new RegExp(c(e.name),"y")}function c(e){return e.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g,"\\$&")}

function token(
onToken,
onEnd) {
    return (data, i) => {
        let position = i;
        let value = undefined;
        if (i < data.tokens.length) {
            value = onToken(data.tokens[i], data, i);
            if (value !== undefined) {
                position++;
            }
        }
        return (value === undefined)
            ? { matched: false }
            : {
                matched: true,
                position: position,
                value: value
            };
    };
}
function mapInner(r, f) {
    return (r.matched) ? ({
        matched: true,
        position: r.position,
        value: f(r.value, r.position)
    }) : r;
}
function mapOuter(r, f) {
    return (r.matched) ? f(r) : r;
}
function map(p, mapper) {
    return (data, i) => mapInner(p(data, i), (v, j) => mapper(v, data, i, j));
}
function option(p, def) {
    return (data, i) => {
        const r = p(data, i);
        return (r.matched)
            ? r
            : {
                matched: true,
                position: i,
                value: def
            };
    };
}
function choice(...ps) {
    return (data, i) => {
        for (const p of ps) {
            const result = p(data, i);
            if (result.matched) {
                return result;
            }
        }
        return { matched: false };
    };
}
function otherwise(pa, pb) {
    return (data, i) => {
        const r1 = pa(data, i);
        return (r1.matched)
            ? r1
            : pb(data, i);
    };
}
function takeWhile(p,
test) {
    return (data, i) => {
        const values = [];
        let success = true;
        do {
            const r = p(data, i);
            if (r.matched && test(r.value, values.length + 1, data, i, r.position)) {
                values.push(r.value);
                i = r.position;
            }
            else {
                success = false;
            }
        } while (success);
        return {
            matched: true,
            position: i,
            value: values
        };
    };
}
function many(p) {
    return takeWhile(p, () => true);
}
function many1(p) {
    return ab(p, many(p), (head, tail) => [head, ...tail]);
}
function ab(pa, pb, join) {
    return (data, i) => mapOuter(pa(data, i), (ma) => mapInner(pb(data, ma.position), (vb, j) => join(ma.value, vb, data, i, j)));
}
function left(pa, pb) {
    return ab(pa, pb, (va) => va);
}
function right(pa, pb) {
    return ab(pa, pb, (va, vb) => vb);
}
function abc(pa, pb, pc, join) {
    return (data, i) => mapOuter(pa(data, i), (ma) => mapOuter(pb(data, ma.position), (mb) => mapInner(pc(data, mb.position), (vc, j) => join(ma.value, mb.value, vc, data, i, j))));
}
function middle(pa, pb, pc) {
    return abc(pa, pb, pc, (ra, rb) => rb);
}
function all(...ps) {
    return (data, i) => {
        const result = [];
        let position = i;
        for (const p of ps) {
            const r1 = p(data, position);
            if (r1.matched) {
                result.push(r1.value);
                position = r1.position;
            }
            else {
                return { matched: false };
            }
        }
        return {
            matched: true,
            position: position,
            value: result
        };
    };
}
function flatten(...ps) {
    return flatten1(all(...ps));
}
function flatten1(p) {
    return map(p, (vs) => vs.flatMap((v) => v));
}
function chainReduce(acc,
f) {
    return (data, i) => {
        let loop = true;
        let acc1 = acc;
        let pos = i;
        do {
            const r = f(acc1, data, pos)(data, pos);
            if (r.matched) {
                acc1 = r.value;
                pos = r.position;
            }
            else {
                loop = false;
            }
        } while (loop);
        return {
            matched: true,
            position: pos,
            value: acc1
        };
    };
}
function reduceLeft(acc, p,
reducer) {
    return chainReduce(acc, (acc) => map(p, (v, data, i, j) => reducer(acc, v, data, i, j)));
}
function leftAssoc2(pLeft, pOper, pRight) {
    return chain(pLeft, (v0) => reduceLeft(v0, ab(pOper, pRight, (f, y) => [f, y]), (acc, [f, y]) => f(acc, y)));
}
function chain(p,
f) {
    return (data, i) => mapOuter(p(data, i), (m1) => f(m1.value, data, i, m1.position)(data, m1.position));
}

const ws$1 = `(?:[ \\t\\r\\n\\f]*)`;
const nl = `(?:\\n|\\r\\n|\\r|\\f)`;
const nonascii = `[^\\x00-\\x7F]`;
const unicode = `(?:\\\\[0-9a-f]{1,6}(?:\\r\\n|[ \\n\\r\\t\\f])?)`;
const escape = `(?:\\\\[^\\n\\r\\f0-9a-f])`;
const nmstart = `(?:[_a-z]|${nonascii}|${unicode}|${escape})`;
const nmchar = `(?:[_a-z0-9-]|${nonascii}|${unicode}|${escape})`;
const name = `(?:${nmchar}+)`;
const ident = `(?:[-]?${nmstart}${nmchar}*)`;
const string1 = `'([^\\n\\r\\f\\\\']|\\\\${nl}|${nonascii}|${unicode}|${escape})*'`;
const string2 = `"([^\\n\\r\\f\\\\"]|\\\\${nl}|${nonascii}|${unicode}|${escape})*"`;
const lexSelector = o([
    { name: 'ws', regex: new RegExp(ws$1) },
    { name: 'hash', regex: new RegExp(`#${name}`, 'i') },
    { name: 'ident', regex: new RegExp(ident, 'i') },
    { name: 'str1', regex: new RegExp(string1, 'i') },
    { name: 'str2', regex: new RegExp(string2, 'i') },
    { name: '*' },
    { name: '.' },
    { name: ',' },
    { name: '[' },
    { name: ']' },
    { name: '=' },
    { name: '>' },
    { name: '|' },
    { name: '+' },
    { name: '~' },
    { name: '^' },
    { name: '$' },
]);
const lexEscapedString = o([
    { name: 'unicode', regex: new RegExp(unicode, 'i') },
    { name: 'escape', regex: new RegExp(escape, 'i') },
    { name: 'any', regex: new RegExp('[\\s\\S]', 'i') }
]);
function sumSpec([a0, a1, a2], [b0, b1, b2]) {
    return [a0 + b0, a1 + b1, a2 + b2];
}
function sumAllSpec(ss) {
    return ss.reduce(sumSpec, [0, 0, 0]);
}
const unicodeEscapedSequence_ = token((t) => t.name === 'unicode' ? String.fromCodePoint(parseInt(t.text.slice(1), 16)) : undefined);
const escapedSequence_ = token((t) => t.name === 'escape' ? t.text.slice(1) : undefined);
const anyChar_ = token((t) => t.name === 'any' ? t.text : undefined);
const escapedString_ = map(many(choice(unicodeEscapedSequence_, escapedSequence_, anyChar_)), (cs) => cs.join(''));
function unescape(escapedString) {
    const lexerResult = lexEscapedString(escapedString);
    const result = escapedString_({ tokens: lexerResult.tokens, options: undefined }, 0);
    return result.value;
}
function literal(name) {
    return token((t) => t.name === name ? true : undefined);
}
const whitespace_ = token((t) => t.name === 'ws' ? null : undefined);
const optionalWhitespace_ = option(whitespace_, null);
function optionallySpaced(parser) {
    return middle(optionalWhitespace_, parser, optionalWhitespace_);
}
const identifier_ = token((t) => t.name === 'ident' ? unescape(t.text) : undefined);
const hashId_ = token((t) => t.name === 'hash' ? unescape(t.text.slice(1)) : undefined);
const string_ = token((t) => t.name.startsWith('str') ? unescape(t.text.slice(1, -1)) : undefined);
const namespace_ = left(option(identifier_, ''), literal('|'));
const qualifiedName_ = otherwise(ab(namespace_, identifier_, (ns, name) => ({ name: name, namespace: ns })), map(identifier_, (name) => ({ name: name, namespace: null })));
const uniSelector_ = otherwise(ab(namespace_, literal('*'), (ns) => ({ type: 'universal', namespace: ns, specificity: [0, 0, 0] })), map(literal('*'), () => ({ type: 'universal', namespace: null, specificity: [0, 0, 0] })));
const tagSelector_ = map(qualifiedName_, ({ name, namespace }) => ({
    type: 'tag',
    name: name,
    namespace: namespace,
    specificity: [0, 0, 1]
}));
const classSelector_ = ab(literal('.'), identifier_, (fullstop, name) => ({
    type: 'class',
    name: name,
    specificity: [0, 1, 0]
}));
const idSelector_ = map(hashId_, (name) => ({
    type: 'id',
    name: name,
    specificity: [1, 0, 0]
}));
const attrModifier_ = token((t) => {
    if (t.name === 'ident') {
        if (t.text === 'i' || t.text === 'I') {
            return 'i';
        }
        if (t.text === 's' || t.text === 'S') {
            return 's';
        }
    }
    return undefined;
});
const attrValue_ = otherwise(ab(string_, option(right(optionalWhitespace_, attrModifier_), null), (v, mod) => ({ value: v, modifier: mod })), ab(identifier_, option(right(whitespace_, attrModifier_), null), (v, mod) => ({ value: v, modifier: mod })));
const attrMatcher_ = choice(map(literal('='), () => '='), ab(literal('~'), literal('='), () => '~='), ab(literal('|'), literal('='), () => '|='), ab(literal('^'), literal('='), () => '^='), ab(literal('$'), literal('='), () => '$='), ab(literal('*'), literal('='), () => '*='));
const attrPresenceSelector_ = abc(literal('['), optionallySpaced(qualifiedName_), literal(']'), (lbr, { name, namespace }) => ({
    type: 'attrPresence',
    name: name,
    namespace: namespace,
    specificity: [0, 1, 0]
}));
const attrValueSelector_ = middle(literal('['), abc(optionallySpaced(qualifiedName_), attrMatcher_, optionallySpaced(attrValue_), ({ name, namespace }, matcher, { value, modifier }) => ({
    type: 'attrValue',
    name: name,
    namespace: namespace,
    matcher: matcher,
    value: value,
    modifier: modifier,
    specificity: [0, 1, 0]
})), literal(']'));
const attrSelector_ = otherwise(attrPresenceSelector_, attrValueSelector_);
const typeSelector_ = otherwise(uniSelector_, tagSelector_);
const subclassSelector_ = choice(idSelector_, classSelector_, attrSelector_);
const compoundSelector_ = map(otherwise(flatten(typeSelector_, many(subclassSelector_)), many1(subclassSelector_)), (ss) => {
    return {
        type: 'compound',
        list: ss,
        specificity: sumAllSpec(ss.map(s => s.specificity))
    };
});
const combinator_ = choice(map(literal('>'), () => '>'), map(literal('+'), () => '+'), map(literal('~'), () => '~'), ab(literal('|'), literal('|'), () => '||'));
const combinatorSeparator_ = otherwise(optionallySpaced(combinator_), map(whitespace_, () => ' '));
const complexSelector_ = leftAssoc2(compoundSelector_, map(combinatorSeparator_, (c) => (left, right) => ({
    type: 'compound',
    list: [...right.list, { type: 'combinator', combinator: c, left: left, specificity: left.specificity }],
    specificity: sumSpec(left.specificity, right.specificity)
})), compoundSelector_);
function parse_(parser, str) {
    if (!(typeof str === 'string' || str instanceof String)) {
        throw new Error('Expected a selector string. Actual input is not a string!');
    }
    const lexerResult = lexSelector(str);
    if (!lexerResult.complete) {
        throw new Error(`The input "${str}" was only partially tokenized, stopped at offset ${lexerResult.offset}!\n` +
            prettyPrintPosition(str, lexerResult.offset));
    }
    const result = optionallySpaced(parser)({ tokens: lexerResult.tokens, options: undefined }, 0);
    if (!result.matched) {
        throw new Error(`No match for "${str}" input!`);
    }
    if (result.position < lexerResult.tokens.length) {
        const token = lexerResult.tokens[result.position];
        throw new Error(`The input "${str}" was only partially parsed, stopped at offset ${token.offset}!\n` +
            prettyPrintPosition(str, token.offset, token.len));
    }
    return result.value;
}
function prettyPrintPosition(str, offset, len = 1) {
    return `${str.replace(/(\t)|(\r)|(\n)/g, (m, t, r) => t ? '\u2409' : r ? '\u240d' : '\u240a')}\n${''.padEnd(offset)}${'^'.repeat(len)}`;
}
function parse1(str) {
    return parse_(complexSelector_, str);
}

function serialize(selector) {
    if (!selector.type) {
        throw new Error('This is not an AST node.');
    }
    switch (selector.type) {
        case 'universal':
            return _serNs(selector.namespace) + '*';
        case 'tag':
            return _serNs(selector.namespace) + _serIdent(selector.name);
        case 'class':
            return '.' + _serIdent(selector.name);
        case 'id':
            return '#' + _serIdent(selector.name);
        case 'attrPresence':
            return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}]`;
        case 'attrValue':
            return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}${selector.matcher}"${_serStr(selector.value)}"${(selector.modifier ? selector.modifier : '')}]`;
        case 'combinator':
            return serialize(selector.left) + selector.combinator;
        case 'compound':
            return selector.list.reduce((acc, node) => {
                if (node.type === 'combinator') {
                    return serialize(node) + acc;
                }
                else {
                    return acc + serialize(node);
                }
            }, '');
        case 'list':
            return selector.list.map(serialize).join(',');
    }
}
function _serNs(ns) {
    return (ns || ns === '')
        ? _serIdent(ns) + '|'
        : '';
}
function _codePoint(char) {
    return `\\${char.codePointAt(0).toString(16)} `;
}
function _serIdent(str) {
    return str.replace(
    /(^[0-9])|(^-[0-9])|(^-$)|([-0-9a-zA-Z_]|[^\x00-\x7F])|(\x00)|([\x01-\x1f]|\x7f)|([\s\S])/g, (m, d1, d2, hy, safe, nl, ctrl, other) => d1 ? _codePoint(d1) :
        d2 ? '-' + _codePoint(d2.slice(1)) :
            hy ? '\\-' :
                safe ? safe :
                    nl ? '\ufffd' :
                        ctrl ? _codePoint(ctrl) :
                            '\\' + other);
}
function _serStr(str) {
    return str.replace(
    /(")|(\\)|(\x00)|([\x01-\x1f]|\x7f)/g, (m, dq, bs, nl, ctrl) => dq ? '\\"' :
        bs ? '\\\\' :
            nl ? '\ufffd' :
                _codePoint(ctrl));
}
function normalize(selector) {
    if (!selector.type) {
        throw new Error('This is not an AST node.');
    }
    switch (selector.type) {
        case 'compound': {
            selector.list.forEach(normalize);
            selector.list.sort((a, b) => _compareArrays(_getSelectorPriority(a), _getSelectorPriority(b)));
            break;
        }
        case 'combinator': {
            normalize(selector.left);
            break;
        }
        case 'list': {
            selector.list.forEach(normalize);
            selector.list.sort((a, b) => (serialize(a) < serialize(b)) ? -1 : 1);
            break;
        }
    }
    return selector;
}
function _getSelectorPriority(selector) {
    switch (selector.type) {
        case 'universal':
            return [1];
        case 'tag':
            return [1];
        case 'id':
            return [2];
        case 'class':
            return [3, selector.name];
        case 'attrPresence':
            return [4, serialize(selector)];
        case 'attrValue':
            return [5, serialize(selector)];
        case 'combinator':
            return [15, serialize(selector)];
    }
}
function compareSpecificity(a, b) {
    return _compareArrays(a, b);
}
function _compareArrays(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        throw new Error('Arguments must be arrays.');
    }
    const shorter = (a.length < b.length) ? a.length : b.length;
    for (let i = 0; i < shorter; i++) {
        if (a[i] === b[i]) {
            continue;
        }
        return (a[i] < b[i]) ? -1 : 1;
    }
    return a.length - b.length;
}

class DecisionTree {
    constructor(input) {
        this.branches = weave(toAstTerminalPairs(input));
    }
    build(builder) {
        return builder(this.branches);
    }
}
function toAstTerminalPairs(array) {
    const len = array.length;
    const results = new Array(len);
    for (let i = 0; i < len; i++) {
        const [selectorString, val] = array[i];
        const ast = preprocess(parse1(selectorString));
        results[i] = {
            ast: ast,
            terminal: {
                type: 'terminal',
                valueContainer: { index: i, value: val, specificity: ast.specificity }
            }
        };
    }
    return results;
}
function preprocess(ast) {
    reduceSelectorVariants(ast);
    normalize(ast);
    return ast;
}
function reduceSelectorVariants(ast) {
    const newList = [];
    ast.list.forEach(sel => {
        switch (sel.type) {
            case 'class':
                newList.push({
                    matcher: '~=',
                    modifier: null,
                    name: 'class',
                    namespace: null,
                    specificity: sel.specificity,
                    type: 'attrValue',
                    value: sel.name,
                });
                break;
            case 'id':
                newList.push({
                    matcher: '=',
                    modifier: null,
                    name: 'id',
                    namespace: null,
                    specificity: sel.specificity,
                    type: 'attrValue',
                    value: sel.name,
                });
                break;
            case 'combinator':
                reduceSelectorVariants(sel.left);
                newList.push(sel);
                break;
            case 'universal':
                break;
            default:
                newList.push(sel);
                break;
        }
    });
    ast.list = newList;
}
function weave(items) {
    const branches = [];
    while (items.length) {
        const topKind = findTopKey(items, (sel) => true, getSelectorKind);
        const { matches, nonmatches, empty } = breakByKind(items, topKind);
        items = nonmatches;
        if (matches.length) {
            branches.push(branchOfKind(topKind, matches));
        }
        if (empty.length) {
            branches.push(...terminate(empty));
        }
    }
    return branches;
}
function terminate(items) {
    const results = [];
    for (const item of items) {
        const terminal = item.terminal;
        if (terminal.type === 'terminal') {
            results.push(terminal);
        }
        else {
            const { matches, rest } = partition(terminal.cont, (node) => node.type === 'terminal');
            matches.forEach((node) => results.push(node));
            if (rest.length) {
                terminal.cont = rest;
                results.push(terminal);
            }
        }
    }
    return results;
}
function breakByKind(items, selectedKind) {
    const matches = [];
    const nonmatches = [];
    const empty = [];
    for (const item of items) {
        const simpsels = item.ast.list;
        if (simpsels.length) {
            const isMatch = simpsels.some(node => getSelectorKind(node) === selectedKind);
            (isMatch ? matches : nonmatches).push(item);
        }
        else {
            empty.push(item);
        }
    }
    return { matches, nonmatches, empty };
}
function getSelectorKind(sel) {
    switch (sel.type) {
        case 'attrPresence':
            return `attrPresence ${sel.name}`;
        case 'attrValue':
            return `attrValue ${sel.name}`;
        case 'combinator':
            return `combinator ${sel.combinator}`;
        default:
            return sel.type;
    }
}
function branchOfKind(kind, items) {
    if (kind === 'tag') {
        return tagNameBranch(items);
    }
    if (kind.startsWith('attrValue ')) {
        return attrValueBranch(kind.substring(10), items);
    }
    if (kind.startsWith('attrPresence ')) {
        return attrPresenceBranch(kind.substring(13), items);
    }
    if (kind === 'combinator >') {
        return combinatorBranch('>', items);
    }
    if (kind === 'combinator +') {
        return combinatorBranch('+', items);
    }
    throw new Error(`Unsupported selector kind: ${kind}`);
}
function tagNameBranch(items) {
    const groups = spliceAndGroup(items, (x) => x.type === 'tag', (x) => x.name);
    const variants = Object.entries(groups).map(([name, group]) => ({
        type: 'variant',
        value: name,
        cont: weave(group.items)
    }));
    return {
        type: 'tagName',
        variants: variants
    };
}
function attrPresenceBranch(name, items) {
    for (const item of items) {
        spliceSimpleSelector(item, (x) => (x.type === 'attrPresence') && (x.name === name));
    }
    return {
        type: 'attrPresence',
        name: name,
        cont: weave(items)
    };
}
function attrValueBranch(name, items) {
    const groups = spliceAndGroup(items, (x) => (x.type === 'attrValue') && (x.name === name), (x) => `${x.matcher} ${x.modifier || ''} ${x.value}`);
    const matchers = [];
    for (const group of Object.values(groups)) {
        const sel = group.oneSimpleSelector;
        const predicate = getAttrPredicate(sel);
        const continuation = weave(group.items);
        matchers.push({
            type: 'matcher',
            matcher: sel.matcher,
            modifier: sel.modifier,
            value: sel.value,
            predicate: predicate,
            cont: continuation
        });
    }
    return {
        type: 'attrValue',
        name: name,
        matchers: matchers
    };
}
function getAttrPredicate(sel) {
    if (sel.modifier === 'i') {
        const expected = sel.value.toLowerCase();
        switch (sel.matcher) {
            case '=':
                return (actual) => expected === actual.toLowerCase();
            case '~=':
                return (actual) => actual.toLowerCase().split(/[ \t]+/).includes(expected);
            case '^=':
                return (actual) => actual.toLowerCase().startsWith(expected);
            case '$=':
                return (actual) => actual.toLowerCase().endsWith(expected);
            case '*=':
                return (actual) => actual.toLowerCase().includes(expected);
            case '|=':
                return (actual) => {
                    const lower = actual.toLowerCase();
                    return (expected === lower) || (lower.startsWith(expected) && lower[expected.length] === '-');
                };
        }
    }
    else {
        const expected = sel.value;
        switch (sel.matcher) {
            case '=':
                return (actual) => expected === actual;
            case '~=':
                return (actual) => actual.split(/[ \t]+/).includes(expected);
            case '^=':
                return (actual) => actual.startsWith(expected);
            case '$=':
                return (actual) => actual.endsWith(expected);
            case '*=':
                return (actual) => actual.includes(expected);
            case '|=':
                return (actual) => (expected === actual) || (actual.startsWith(expected) && actual[expected.length] === '-');
        }
    }
}
function combinatorBranch(combinator, items) {
    const groups = spliceAndGroup(items, (x) => (x.type === 'combinator') && (x.combinator === combinator), (x) => serialize(x.left));
    const leftItems = [];
    for (const group of Object.values(groups)) {
        const rightCont = weave(group.items);
        const leftAst = group.oneSimpleSelector.left;
        leftItems.push({
            ast: leftAst,
            terminal: { type: 'popElement', cont: rightCont }
        });
    }
    return {
        type: 'pushElement',
        combinator: combinator,
        cont: weave(leftItems)
    };
}
function spliceAndGroup(items, predicate, keyCallback) {
    const groups = {};
    while (items.length) {
        const bestKey = findTopKey(items, predicate, keyCallback);
        const bestKeyPredicate = (sel) => predicate(sel) && keyCallback(sel) === bestKey;
        const hasBestKeyPredicate = (item) => item.ast.list.some(bestKeyPredicate);
        const { matches, rest } = partition1(items, hasBestKeyPredicate);
        let oneSimpleSelector = null;
        for (const item of matches) {
            const splicedNode = spliceSimpleSelector(item, bestKeyPredicate);
            if (!oneSimpleSelector) {
                oneSimpleSelector = splicedNode;
            }
        }
        if (oneSimpleSelector == null) {
            throw new Error('No simple selector is found.');
        }
        groups[bestKey] = { oneSimpleSelector: oneSimpleSelector, items: matches };
        items = rest;
    }
    return groups;
}
function spliceSimpleSelector(item, predicate) {
    const simpsels = item.ast.list;
    const matches = new Array(simpsels.length);
    let firstIndex = -1;
    for (let i = simpsels.length; i-- > 0;) {
        if (predicate(simpsels[i])) {
            matches[i] = true;
            firstIndex = i;
        }
    }
    if (firstIndex == -1) {
        throw new Error(`Couldn't find the required simple selector.`);
    }
    const result = simpsels[firstIndex];
    item.ast.list = simpsels.filter((sel, i) => !matches[i]);
    return result;
}
function findTopKey(items, predicate, keyCallback) {
    const candidates = {};
    for (const item of items) {
        const candidates1 = {};
        for (const node of item.ast.list.filter(predicate)) {
            candidates1[keyCallback(node)] = true;
        }
        for (const key of Object.keys(candidates1)) {
            if (candidates[key]) {
                candidates[key]++;
            }
            else {
                candidates[key] = 1;
            }
        }
    }
    let topKind = '';
    let topCounter = 0;
    for (const entry of Object.entries(candidates)) {
        if (entry[1] > topCounter) {
            topKind = entry[0];
            topCounter = entry[1];
        }
    }
    return topKind;
}
function partition(src, predicate) {
    const matches = [];
    const rest = [];
    for (const x of src) {
        if (predicate(x)) {
            matches.push(x);
        }
        else {
            rest.push(x);
        }
    }
    return { matches, rest };
}
function partition1(src, predicate) {
    const matches = [];
    const rest = [];
    for (const x of src) {
        if (predicate(x)) {
            matches.push(x);
        }
        else {
            rest.push(x);
        }
    }
    return { matches, rest };
}

class Picker {
    constructor(f) {
        this.f = f;
    }
    pickAll(el) {
        return this.f(el);
    }
    pick1(el, preferFirst = false) {
        const results = this.f(el);
        const len = results.length;
        if (len === 0) {
            return null;
        }
        if (len === 1) {
            return results[0].value;
        }
        const comparator = (preferFirst)
            ? comparatorPreferFirst
            : comparatorPreferLast;
        let result = results[0];
        for (let i = 1; i < len; i++) {
            const next = results[i];
            if (comparator(result, next)) {
                result = next;
            }
        }
        return result.value;
    }
}
function comparatorPreferFirst(acc, next) {
    const diff = compareSpecificity(next.specificity, acc.specificity);
    return diff > 0 || (diff === 0 && next.index < acc.index);
}
function comparatorPreferLast(acc, next) {
    const diff = compareSpecificity(next.specificity, acc.specificity);
    return diff > 0 || (diff === 0 && next.index > acc.index);
}

function hp2Builder(nodes) {
    return new Picker(handleArray(nodes));
}
function handleArray(nodes) {
    const matchers = nodes.map(handleNode);
    return (el, ...tail) => matchers.flatMap(m => m(el, ...tail));
}
function handleNode(node) {
    switch (node.type) {
        case 'terminal': {
            const result = [node.valueContainer];
            return (el, ...tail) => result;
        }
        case 'tagName':
            return handleTagName(node);
        case 'attrValue':
            return handleAttrValueName(node);
        case 'attrPresence':
            return handleAttrPresenceName(node);
        case 'pushElement':
            return handlePushElementNode(node);
        case 'popElement':
            return handlePopElementNode(node);
    }
}
function handleTagName(node) {
    const variants = {};
    for (const variant of node.variants) {
        variants[variant.value] = handleArray(variant.cont);
    }
    return (el, ...tail) => {
        const continuation = variants[el.name];
        return (continuation) ? continuation(el, ...tail) : [];
    };
}
function handleAttrPresenceName(node) {
    const attrName = node.name;
    const continuation = handleArray(node.cont);
    return (el, ...tail) => (Object.prototype.hasOwnProperty.call(el.attribs, attrName))
        ? continuation(el, ...tail)
        : [];
}
function handleAttrValueName(node) {
    const callbacks = [];
    for (const matcher of node.matchers) {
        const predicate = matcher.predicate;
        const continuation = handleArray(matcher.cont);
        callbacks.push((attr, el, ...tail) => (predicate(attr) ? continuation(el, ...tail) : []));
    }
    const attrName = node.name;
    return (el, ...tail) => {
        const attr = el.attribs[attrName];
        return (attr || attr === '')
            ? callbacks.flatMap(cb => cb(attr, el, ...tail))
            : [];
    };
}
function handlePushElementNode(node) {
    const continuation = handleArray(node.cont);
    const leftElementGetter = (node.combinator === '+')
        ? getPrecedingElement
        : getParentElement;
    return (el, ...tail) => {
        const next = leftElementGetter(el);
        if (next === null) {
            return [];
        }
        return continuation(next, el, ...tail);
    };
}
const getPrecedingElement = (el) => {
    const prev = el.prev;
    if (prev === null) {
        return null;
    }
    return (isTag(prev)) ? prev : getPrecedingElement(prev);
};
const getParentElement = (el) => {
    const parent = el.parent;
    return (parent && isTag(parent)) ? parent : null;
};
function handlePopElementNode(node) {
    const continuation = handleArray(node.cont);
    return (el, next, ...tail) => continuation(next, ...tail);
}

// Generated using scripts/write-decode-map.ts
const htmlDecodeTree = new Uint16Array(
// prettier-ignore
"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
    .split("")
    .map((c) => c.charCodeAt(0)));

// Generated using scripts/write-decode-map.ts
const xmlDecodeTree = new Uint16Array(
// prettier-ignore
"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
    .split("")
    .map((c) => c.charCodeAt(0)));

// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a$1;
const decodeMap = new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
/**
 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
 */
const fromCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
(_a$1 = String.fromCodePoint) !== null && _a$1 !== void 0 ? _a$1 : function (codePoint) {
    let output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
};
/**
 * Replace the given code point with a replacement character if it is a
 * surrogate or is outside the valid range. Otherwise return the code
 * point unchanged.
 */
function replaceCodePoint(codePoint) {
    var _a;
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return 0xfffd;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}

var CharCodes$1;
(function (CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes$1 || (CharCodes$1 = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 0b100000;
var BinTrieFlags;
(function (BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber$1(code) {
    return code >= CharCodes$1.ZERO && code <= CharCodes$1.NINE;
}
function isHexadecimalCharacter(code) {
    return ((code >= CharCodes$1.UPPER_A && code <= CharCodes$1.UPPER_F) ||
        (code >= CharCodes$1.LOWER_A && code <= CharCodes$1.LOWER_F));
}
function isAsciiAlphaNumeric(code) {
    return ((code >= CharCodes$1.UPPER_A && code <= CharCodes$1.UPPER_Z) ||
        (code >= CharCodes$1.LOWER_A && code <= CharCodes$1.LOWER_Z) ||
        isNumber$1(code));
}
/**
 * Checks if the given character is a valid end character for an entity in an attribute.
 *
 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
 */
function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes$1.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function (EntityDecoderState) {
    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function (DecodingMode) {
    /** Entities in text nodes that can end with any character. */
    DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
    /** Only allow entities terminated with a semicolon. */
    DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
    /** Entities in attributes have limitations on ending characters. */
    DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
 * Token decoder with support of writing partial entities.
 */
class EntityDecoder {
    constructor(
    /** The tree used to decode entities. */
    decodeTree, 
    /**
     * The function that is called when a codepoint is decoded.
     *
     * For multi-byte named entities, this will be called multiple times,
     * with the second codepoint, and the same `consumed` value.
     *
     * @param codepoint The decoded codepoint.
     * @param consumed The number of bytes consumed by the decoder.
     */
    emitCodePoint, 
    /** An object that is used to produce errors. */
    errors) {
        this.decodeTree = decodeTree;
        this.emitCodePoint = emitCodePoint;
        this.errors = errors;
        /** The current state of the decoder. */
        this.state = EntityDecoderState.EntityStart;
        /** Characters that were consumed while parsing an entity. */
        this.consumed = 1;
        /**
         * The result of the entity.
         *
         * Either the result index of a numeric entity, or the codepoint of a
         * numeric entity.
         */
        this.result = 0;
        /** The current index in the decode tree. */
        this.treeIndex = 0;
        /** The number of characters that were consumed in excess. */
        this.excess = 1;
        /** The mode in which the decoder is operating. */
        this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
        this.decodeMode = decodeMode;
        this.state = EntityDecoderState.EntityStart;
        this.result = 0;
        this.treeIndex = 0;
        this.excess = 1;
        this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(str, offset) {
        switch (this.state) {
            case EntityDecoderState.EntityStart: {
                if (str.charCodeAt(offset) === CharCodes$1.NUM) {
                    this.state = EntityDecoderState.NumericStart;
                    this.consumed += 1;
                    return this.stateNumericStart(str, offset + 1);
                }
                this.state = EntityDecoderState.NamedEntity;
                return this.stateNamedEntity(str, offset);
            }
            case EntityDecoderState.NumericStart: {
                return this.stateNumericStart(str, offset);
            }
            case EntityDecoderState.NumericDecimal: {
                return this.stateNumericDecimal(str, offset);
            }
            case EntityDecoderState.NumericHex: {
                return this.stateNumericHex(str, offset);
            }
            case EntityDecoderState.NamedEntity: {
                return this.stateNamedEntity(str, offset);
            }
        }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(str, offset) {
        if (offset >= str.length) {
            return -1;
        }
        if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes$1.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(str, offset + 1);
        }
        this.state = EntityDecoderState.NumericDecimal;
        return this.stateNumericDecimal(str, offset);
    }
    addToNumericResult(str, start, end, base) {
        if (start !== end) {
            const digitCount = end - start;
            this.result =
                this.result * Math.pow(base, digitCount) +
                    parseInt(str.substr(start, digitCount), base);
            this.consumed += digitCount;
        }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(str, offset) {
        const startIdx = offset;
        while (offset < str.length) {
            const char = str.charCodeAt(offset);
            if (isNumber$1(char) || isHexadecimalCharacter(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 16);
                return this.emitNumericEntity(char, 3);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 16);
        return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(str, offset) {
        const startIdx = offset;
        while (offset < str.length) {
            const char = str.charCodeAt(offset);
            if (isNumber$1(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 10);
                return this.emitNumericEntity(char, 2);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 10);
        return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
        var _a;
        // Ensure we consumed at least one digit.
        if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
        }
        // Figure out if this is a legit end of the entity
        if (lastCp === CharCodes$1.SEMI) {
            this.consumed += 1;
        }
        else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
        }
        this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
        if (this.errors) {
            if (lastCp !== CharCodes$1.SEMI) {
                this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
        }
        return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(str, offset) {
        const { decodeTree } = this;
        let current = decodeTree[this.treeIndex];
        // The mask is the number of bytes of the value, including the current byte.
        let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        for (; offset < str.length; offset++, this.excess++) {
            const char = str.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
                return this.result === 0 ||
                    // If we are parsing an attribute
                    (this.decodeMode === DecodingMode.Attribute &&
                        // We shouldn't have consumed any characters after the entity,
                        (valueLength === 0 ||
                            // And there should be no invalid characters.
                            isEntityInAttributeInvalidEnd(char)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            // If the branch is a value, store it and continue
            if (valueLength !== 0) {
                // If the entity is terminated by a semicolon, we are done.
                if (char === CharCodes$1.SEMI) {
                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                }
                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                if (this.decodeMode !== DecodingMode.Strict) {
                    this.result = this.treeIndex;
                    this.consumed += this.excess;
                    this.excess = 0;
                }
            }
        }
        return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
        var _a;
        const { result, decodeTree } = this;
        const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
        this.emitNamedEntityData(result, valueLength, this.consumed);
        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
        return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
        const { decodeTree } = this;
        this.emitCodePoint(valueLength === 1
            ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
            : decodeTree[result + 1], consumed);
        if (valueLength === 3) {
            // For multi-byte values, we need to emit the second byte.
            this.emitCodePoint(decodeTree[result + 2], consumed);
        }
        return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
        var _a;
        switch (this.state) {
            case EntityDecoderState.NamedEntity: {
                // Emit a named entity if we have one.
                return this.result !== 0 &&
                    (this.decodeMode !== DecodingMode.Attribute ||
                        this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
            }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal: {
                return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
                return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                return 0;
            }
            case EntityDecoderState.EntityStart: {
                // Return 0 if we have no entity.
                return 0;
            }
        }
    }
}
/**
 * Creates a function that decodes entities in a string.
 *
 * @param decodeTree The decode tree.
 * @returns A function that decodes entities in a string.
 */
function getDecoder(decodeTree) {
    let ret = "";
    const decoder = new EntityDecoder(decodeTree, (str) => (ret += fromCodePoint(str)));
    return function decodeWithTrie(str, decodeMode) {
        let lastIndex = 0;
        let offset = 0;
        while ((offset = str.indexOf("&", offset)) >= 0) {
            ret += str.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            const len = decoder.write(str, 
            // Skip the "&"
            offset + 1);
            if (len < 0) {
                lastIndex = offset + decoder.end();
                break;
            }
            lastIndex = offset + len;
            // If `len` is 0, skip the current `&` and continue.
            offset = len === 0 ? lastIndex + 1 : lastIndex;
        }
        const result = ret + str.slice(lastIndex);
        // Make sure we don't keep a reference to the final string.
        ret = "";
        return result;
    };
}
/**
 * Determines the branch of the current node that is taken given the current
 * character. This function is used to traverse the trie.
 *
 * @param decodeTree The trie.
 * @param current The current node.
 * @param nodeIdx The index right after the current node and its value.
 * @param char The current character.
 * @returns The index of the next node, or -1 if no branch is taken.
 */
function determineBranch(decodeTree, current, nodeIdx, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        const value = char - jumpOffset;
        return value < 0 || value >= branchCount
            ? -1
            : decodeTree[nodeIdx + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    let lo = nodeIdx;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const midVal = decodeTree[mid];
        if (midVal < char) {
            lo = mid + 1;
        }
        else if (midVal > char) {
            hi = mid - 1;
        }
        else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
getDecoder(htmlDecodeTree);
getDecoder(xmlDecodeTree);

var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["Tab"] = 9] = "Tab";
    CharCodes[CharCodes["NewLine"] = 10] = "NewLine";
    CharCodes[CharCodes["FormFeed"] = 12] = "FormFeed";
    CharCodes[CharCodes["CarriageReturn"] = 13] = "CarriageReturn";
    CharCodes[CharCodes["Space"] = 32] = "Space";
    CharCodes[CharCodes["ExclamationMark"] = 33] = "ExclamationMark";
    CharCodes[CharCodes["Number"] = 35] = "Number";
    CharCodes[CharCodes["Amp"] = 38] = "Amp";
    CharCodes[CharCodes["SingleQuote"] = 39] = "SingleQuote";
    CharCodes[CharCodes["DoubleQuote"] = 34] = "DoubleQuote";
    CharCodes[CharCodes["Dash"] = 45] = "Dash";
    CharCodes[CharCodes["Slash"] = 47] = "Slash";
    CharCodes[CharCodes["Zero"] = 48] = "Zero";
    CharCodes[CharCodes["Nine"] = 57] = "Nine";
    CharCodes[CharCodes["Semi"] = 59] = "Semi";
    CharCodes[CharCodes["Lt"] = 60] = "Lt";
    CharCodes[CharCodes["Eq"] = 61] = "Eq";
    CharCodes[CharCodes["Gt"] = 62] = "Gt";
    CharCodes[CharCodes["Questionmark"] = 63] = "Questionmark";
    CharCodes[CharCodes["UpperA"] = 65] = "UpperA";
    CharCodes[CharCodes["LowerA"] = 97] = "LowerA";
    CharCodes[CharCodes["UpperF"] = 70] = "UpperF";
    CharCodes[CharCodes["LowerF"] = 102] = "LowerF";
    CharCodes[CharCodes["UpperZ"] = 90] = "UpperZ";
    CharCodes[CharCodes["LowerZ"] = 122] = "LowerZ";
    CharCodes[CharCodes["LowerX"] = 120] = "LowerX";
    CharCodes[CharCodes["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
/** All the states the tokenizer can be in. */
var State;
(function (State) {
    State[State["Text"] = 1] = "Text";
    State[State["BeforeTagName"] = 2] = "BeforeTagName";
    State[State["InTagName"] = 3] = "InTagName";
    State[State["InSelfClosingTag"] = 4] = "InSelfClosingTag";
    State[State["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
    State[State["InClosingTagName"] = 6] = "InClosingTagName";
    State[State["AfterClosingTagName"] = 7] = "AfterClosingTagName";
    // Attributes
    State[State["BeforeAttributeName"] = 8] = "BeforeAttributeName";
    State[State["InAttributeName"] = 9] = "InAttributeName";
    State[State["AfterAttributeName"] = 10] = "AfterAttributeName";
    State[State["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
    State[State["InAttributeValueDq"] = 12] = "InAttributeValueDq";
    State[State["InAttributeValueSq"] = 13] = "InAttributeValueSq";
    State[State["InAttributeValueNq"] = 14] = "InAttributeValueNq";
    // Declarations
    State[State["BeforeDeclaration"] = 15] = "BeforeDeclaration";
    State[State["InDeclaration"] = 16] = "InDeclaration";
    // Processing instructions
    State[State["InProcessingInstruction"] = 17] = "InProcessingInstruction";
    // Comments & CDATA
    State[State["BeforeComment"] = 18] = "BeforeComment";
    State[State["CDATASequence"] = 19] = "CDATASequence";
    State[State["InSpecialComment"] = 20] = "InSpecialComment";
    State[State["InCommentLike"] = 21] = "InCommentLike";
    // Special tags
    State[State["BeforeSpecialS"] = 22] = "BeforeSpecialS";
    State[State["SpecialStartSequence"] = 23] = "SpecialStartSequence";
    State[State["InSpecialTag"] = 24] = "InSpecialTag";
    State[State["BeforeEntity"] = 25] = "BeforeEntity";
    State[State["BeforeNumericEntity"] = 26] = "BeforeNumericEntity";
    State[State["InNamedEntity"] = 27] = "InNamedEntity";
    State[State["InNumericEntity"] = 28] = "InNumericEntity";
    State[State["InHexEntity"] = 29] = "InHexEntity";
})(State || (State = {}));
function isWhitespace(c) {
    return (c === CharCodes.Space ||
        c === CharCodes.NewLine ||
        c === CharCodes.Tab ||
        c === CharCodes.FormFeed ||
        c === CharCodes.CarriageReturn);
}
function isEndOfTagSection(c) {
    return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isNumber(c) {
    return c >= CharCodes.Zero && c <= CharCodes.Nine;
}
function isASCIIAlpha(c) {
    return ((c >= CharCodes.LowerA && c <= CharCodes.LowerZ) ||
        (c >= CharCodes.UpperA && c <= CharCodes.UpperZ));
}
function isHexDigit(c) {
    return ((c >= CharCodes.UpperA && c <= CharCodes.UpperF) ||
        (c >= CharCodes.LowerA && c <= CharCodes.LowerF));
}
var QuoteType;
(function (QuoteType) {
    QuoteType[QuoteType["NoValue"] = 0] = "NoValue";
    QuoteType[QuoteType["Unquoted"] = 1] = "Unquoted";
    QuoteType[QuoteType["Single"] = 2] = "Single";
    QuoteType[QuoteType["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
/**
 * Sequences used to match longer strings.
 *
 * We don't have `Script`, `Style`, or `Title` here. Instead, we re-use the *End
 * sequences with an increased offset.
 */
const Sequences = {
    Cdata: new Uint8Array([0x43, 0x44, 0x41, 0x54, 0x41, 0x5b]),
    CdataEnd: new Uint8Array([0x5d, 0x5d, 0x3e]),
    CommentEnd: new Uint8Array([0x2d, 0x2d, 0x3e]),
    ScriptEnd: new Uint8Array([0x3c, 0x2f, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74]),
    StyleEnd: new Uint8Array([0x3c, 0x2f, 0x73, 0x74, 0x79, 0x6c, 0x65]),
    TitleEnd: new Uint8Array([0x3c, 0x2f, 0x74, 0x69, 0x74, 0x6c, 0x65]), // `</title`
};
class Tokenizer {
    constructor({ xmlMode = false, decodeEntities = true, }, cbs) {
        this.cbs = cbs;
        /** The current state the tokenizer is in. */
        this.state = State.Text;
        /** The read buffer. */
        this.buffer = "";
        /** The beginning of the section that is currently being read. */
        this.sectionStart = 0;
        /** The index within the buffer that we are currently looking at. */
        this.index = 0;
        /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
        this.baseState = State.Text;
        /** For special parsing behavior inside of script and style tags. */
        this.isSpecial = false;
        /** Indicates whether the tokenizer has been paused. */
        this.running = true;
        /** The offset of the current buffer. */
        this.offset = 0;
        this.currentSequence = undefined;
        this.sequenceIndex = 0;
        this.trieIndex = 0;
        this.trieCurrent = 0;
        /** For named entities, the index of the value. For numeric entities, the code point. */
        this.entityResult = 0;
        this.entityExcess = 0;
        this.xmlMode = xmlMode;
        this.decodeEntities = decodeEntities;
        this.entityTrie = xmlMode ? xmlDecodeTree : htmlDecodeTree;
    }
    reset() {
        this.state = State.Text;
        this.buffer = "";
        this.sectionStart = 0;
        this.index = 0;
        this.baseState = State.Text;
        this.currentSequence = undefined;
        this.running = true;
        this.offset = 0;
    }
    write(chunk) {
        this.offset += this.buffer.length;
        this.buffer = chunk;
        this.parse();
    }
    end() {
        if (this.running)
            this.finish();
    }
    pause() {
        this.running = false;
    }
    resume() {
        this.running = true;
        if (this.index < this.buffer.length + this.offset) {
            this.parse();
        }
    }
    /**
     * The current index within all of the written data.
     */
    getIndex() {
        return this.index;
    }
    /**
     * The start of the current section.
     */
    getSectionStart() {
        return this.sectionStart;
    }
    stateText(c) {
        if (c === CharCodes.Lt ||
            (!this.decodeEntities && this.fastForwardTo(CharCodes.Lt))) {
            if (this.index > this.sectionStart) {
                this.cbs.ontext(this.sectionStart, this.index);
            }
            this.state = State.BeforeTagName;
            this.sectionStart = this.index;
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.state = State.BeforeEntity;
        }
    }
    stateSpecialStartSequence(c) {
        const isEnd = this.sequenceIndex === this.currentSequence.length;
        const isMatch = isEnd
            ? // If we are at the end of the sequence, make sure the tag name has ended
                isEndOfTagSection(c)
            : // Otherwise, do a case-insensitive comparison
                (c | 0x20) === this.currentSequence[this.sequenceIndex];
        if (!isMatch) {
            this.isSpecial = false;
        }
        else if (!isEnd) {
            this.sequenceIndex++;
            return;
        }
        this.sequenceIndex = 0;
        this.state = State.InTagName;
        this.stateInTagName(c);
    }
    /** Look for an end tag. For <title> tags, also decode entities. */
    stateInSpecialTag(c) {
        if (this.sequenceIndex === this.currentSequence.length) {
            if (c === CharCodes.Gt || isWhitespace(c)) {
                const endOfText = this.index - this.currentSequence.length;
                if (this.sectionStart < endOfText) {
                    // Spoof the index so that reported locations match up.
                    const actualIndex = this.index;
                    this.index = endOfText;
                    this.cbs.ontext(this.sectionStart, endOfText);
                    this.index = actualIndex;
                }
                this.isSpecial = false;
                this.sectionStart = endOfText + 2; // Skip over the `</`
                this.stateInClosingTagName(c);
                return; // We are done; skip the rest of the function.
            }
            this.sequenceIndex = 0;
        }
        if ((c | 0x20) === this.currentSequence[this.sequenceIndex]) {
            this.sequenceIndex += 1;
        }
        else if (this.sequenceIndex === 0) {
            if (this.currentSequence === Sequences.TitleEnd) {
                // We have to parse entities in <title> tags.
                if (this.decodeEntities && c === CharCodes.Amp) {
                    this.state = State.BeforeEntity;
                }
            }
            else if (this.fastForwardTo(CharCodes.Lt)) {
                // Outside of <title> tags, we can fast-forward.
                this.sequenceIndex = 1;
            }
        }
        else {
            // If we see a `<`, set the sequence index to 1; useful for eg. `<</script>`.
            this.sequenceIndex = Number(c === CharCodes.Lt);
        }
    }
    stateCDATASequence(c) {
        if (c === Sequences.Cdata[this.sequenceIndex]) {
            if (++this.sequenceIndex === Sequences.Cdata.length) {
                this.state = State.InCommentLike;
                this.currentSequence = Sequences.CdataEnd;
                this.sequenceIndex = 0;
                this.sectionStart = this.index + 1;
            }
        }
        else {
            this.sequenceIndex = 0;
            this.state = State.InDeclaration;
            this.stateInDeclaration(c); // Reconsume the character
        }
    }
    /**
     * When we wait for one specific character, we can speed things up
     * by skipping through the buffer until we find it.
     *
     * @returns Whether the character was found.
     */
    fastForwardTo(c) {
        while (++this.index < this.buffer.length + this.offset) {
            if (this.buffer.charCodeAt(this.index - this.offset) === c) {
                return true;
            }
        }
        /*
         * We increment the index at the end of the `parse` loop,
         * so set it to `buffer.length - 1` here.
         *
         * TODO: Refactor `parse` to increment index before calling states.
         */
        this.index = this.buffer.length + this.offset - 1;
        return false;
    }
    /**
     * Comments and CDATA end with `-->` and `]]>`.
     *
     * Their common qualities are:
     * - Their end sequences have a distinct character they start with.
     * - That character is then repeated, so we have to check multiple repeats.
     * - All characters but the start character of the sequence can be skipped.
     */
    stateInCommentLike(c) {
        if (c === this.currentSequence[this.sequenceIndex]) {
            if (++this.sequenceIndex === this.currentSequence.length) {
                if (this.currentSequence === Sequences.CdataEnd) {
                    this.cbs.oncdata(this.sectionStart, this.index, 2);
                }
                else {
                    this.cbs.oncomment(this.sectionStart, this.index, 2);
                }
                this.sequenceIndex = 0;
                this.sectionStart = this.index + 1;
                this.state = State.Text;
            }
        }
        else if (this.sequenceIndex === 0) {
            // Fast-forward to the first character of the sequence
            if (this.fastForwardTo(this.currentSequence[0])) {
                this.sequenceIndex = 1;
            }
        }
        else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
            // Allow long sequences, eg. --->, ]]]>
            this.sequenceIndex = 0;
        }
    }
    /**
     * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
     *
     * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
     * We allow anything that wouldn't end the tag.
     */
    isTagStartChar(c) {
        return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
    }
    startSpecial(sequence, offset) {
        this.isSpecial = true;
        this.currentSequence = sequence;
        this.sequenceIndex = offset;
        this.state = State.SpecialStartSequence;
    }
    stateBeforeTagName(c) {
        if (c === CharCodes.ExclamationMark) {
            this.state = State.BeforeDeclaration;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.Questionmark) {
            this.state = State.InProcessingInstruction;
            this.sectionStart = this.index + 1;
        }
        else if (this.isTagStartChar(c)) {
            const lower = c | 0x20;
            this.sectionStart = this.index;
            if (!this.xmlMode && lower === Sequences.TitleEnd[2]) {
                this.startSpecial(Sequences.TitleEnd, 3);
            }
            else {
                this.state =
                    !this.xmlMode && lower === Sequences.ScriptEnd[2]
                        ? State.BeforeSpecialS
                        : State.InTagName;
            }
        }
        else if (c === CharCodes.Slash) {
            this.state = State.BeforeClosingTagName;
        }
        else {
            this.state = State.Text;
            this.stateText(c);
        }
    }
    stateInTagName(c) {
        if (isEndOfTagSection(c)) {
            this.cbs.onopentagname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
    }
    stateBeforeClosingTagName(c) {
        if (isWhitespace(c)) ;
        else if (c === CharCodes.Gt) {
            this.state = State.Text;
        }
        else {
            this.state = this.isTagStartChar(c)
                ? State.InClosingTagName
                : State.InSpecialComment;
            this.sectionStart = this.index;
        }
    }
    stateInClosingTagName(c) {
        if (c === CharCodes.Gt || isWhitespace(c)) {
            this.cbs.onclosetag(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterClosingTagName;
            this.stateAfterClosingTagName(c);
        }
    }
    stateAfterClosingTagName(c) {
        // Skip everything until ">"
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.state = State.Text;
            this.baseState = State.Text;
            this.sectionStart = this.index + 1;
        }
    }
    stateBeforeAttributeName(c) {
        if (c === CharCodes.Gt) {
            this.cbs.onopentagend(this.index);
            if (this.isSpecial) {
                this.state = State.InSpecialTag;
                this.sequenceIndex = 0;
            }
            else {
                this.state = State.Text;
            }
            this.baseState = this.state;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.Slash) {
            this.state = State.InSelfClosingTag;
        }
        else if (!isWhitespace(c)) {
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
        }
    }
    stateInSelfClosingTag(c) {
        if (c === CharCodes.Gt) {
            this.cbs.onselfclosingtag(this.index);
            this.state = State.Text;
            this.baseState = State.Text;
            this.sectionStart = this.index + 1;
            this.isSpecial = false; // Reset special state, in case of self-closing special tags
        }
        else if (!isWhitespace(c)) {
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
    }
    stateInAttributeName(c) {
        if (c === CharCodes.Eq || isEndOfTagSection(c)) {
            this.cbs.onattribname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterAttributeName;
            this.stateAfterAttributeName(c);
        }
    }
    stateAfterAttributeName(c) {
        if (c === CharCodes.Eq) {
            this.state = State.BeforeAttributeValue;
        }
        else if (c === CharCodes.Slash || c === CharCodes.Gt) {
            this.cbs.onattribend(QuoteType.NoValue, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
        else if (!isWhitespace(c)) {
            this.cbs.onattribend(QuoteType.NoValue, this.index);
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
        }
    }
    stateBeforeAttributeValue(c) {
        if (c === CharCodes.DoubleQuote) {
            this.state = State.InAttributeValueDq;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.SingleQuote) {
            this.state = State.InAttributeValueSq;
            this.sectionStart = this.index + 1;
        }
        else if (!isWhitespace(c)) {
            this.sectionStart = this.index;
            this.state = State.InAttributeValueNq;
            this.stateInAttributeValueNoQuotes(c); // Reconsume token
        }
    }
    handleInAttributeValue(c, quote) {
        if (c === quote ||
            (!this.decodeEntities && this.fastForwardTo(quote))) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(quote === CharCodes.DoubleQuote
                ? QuoteType.Double
                : QuoteType.Single, this.index);
            this.state = State.BeforeAttributeName;
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.baseState = this.state;
            this.state = State.BeforeEntity;
        }
    }
    stateInAttributeValueDoubleQuotes(c) {
        this.handleInAttributeValue(c, CharCodes.DoubleQuote);
    }
    stateInAttributeValueSingleQuotes(c) {
        this.handleInAttributeValue(c, CharCodes.SingleQuote);
    }
    stateInAttributeValueNoQuotes(c) {
        if (isWhitespace(c) || c === CharCodes.Gt) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(QuoteType.Unquoted, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.baseState = this.state;
            this.state = State.BeforeEntity;
        }
    }
    stateBeforeDeclaration(c) {
        if (c === CharCodes.OpeningSquareBracket) {
            this.state = State.CDATASequence;
            this.sequenceIndex = 0;
        }
        else {
            this.state =
                c === CharCodes.Dash
                    ? State.BeforeComment
                    : State.InDeclaration;
        }
    }
    stateInDeclaration(c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.ondeclaration(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    }
    stateInProcessingInstruction(c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.onprocessinginstruction(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    }
    stateBeforeComment(c) {
        if (c === CharCodes.Dash) {
            this.state = State.InCommentLike;
            this.currentSequence = Sequences.CommentEnd;
            // Allow short comments (eg. <!-->)
            this.sequenceIndex = 2;
            this.sectionStart = this.index + 1;
        }
        else {
            this.state = State.InDeclaration;
        }
    }
    stateInSpecialComment(c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.oncomment(this.sectionStart, this.index, 0);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    }
    stateBeforeSpecialS(c) {
        const lower = c | 0x20;
        if (lower === Sequences.ScriptEnd[3]) {
            this.startSpecial(Sequences.ScriptEnd, 4);
        }
        else if (lower === Sequences.StyleEnd[3]) {
            this.startSpecial(Sequences.StyleEnd, 4);
        }
        else {
            this.state = State.InTagName;
            this.stateInTagName(c); // Consume the token again
        }
    }
    stateBeforeEntity(c) {
        // Start excess with 1 to include the '&'
        this.entityExcess = 1;
        this.entityResult = 0;
        if (c === CharCodes.Number) {
            this.state = State.BeforeNumericEntity;
        }
        else if (c === CharCodes.Amp) ;
        else {
            this.trieIndex = 0;
            this.trieCurrent = this.entityTrie[0];
            this.state = State.InNamedEntity;
            this.stateInNamedEntity(c);
        }
    }
    stateInNamedEntity(c) {
        this.entityExcess += 1;
        this.trieIndex = determineBranch(this.entityTrie, this.trieCurrent, this.trieIndex + 1, c);
        if (this.trieIndex < 0) {
            this.emitNamedEntity();
            this.index--;
            return;
        }
        this.trieCurrent = this.entityTrie[this.trieIndex];
        const masked = this.trieCurrent & BinTrieFlags.VALUE_LENGTH;
        // If the branch is a value, store it and continue
        if (masked) {
            // The mask is the number of bytes of the value, including the current byte.
            const valueLength = (masked >> 14) - 1;
            // If we have a legacy entity while parsing strictly, just skip the number of bytes
            if (!this.allowLegacyEntity() && c !== CharCodes.Semi) {
                this.trieIndex += valueLength;
            }
            else {
                // Add 1 as we have already incremented the excess
                const entityStart = this.index - this.entityExcess + 1;
                if (entityStart > this.sectionStart) {
                    this.emitPartial(this.sectionStart, entityStart);
                }
                // If this is a surrogate pair, consume the next two bytes
                this.entityResult = this.trieIndex;
                this.trieIndex += valueLength;
                this.entityExcess = 0;
                this.sectionStart = this.index + 1;
                if (valueLength === 0) {
                    this.emitNamedEntity();
                }
            }
        }
    }
    emitNamedEntity() {
        this.state = this.baseState;
        if (this.entityResult === 0) {
            return;
        }
        const valueLength = (this.entityTrie[this.entityResult] & BinTrieFlags.VALUE_LENGTH) >>
            14;
        switch (valueLength) {
            case 1: {
                this.emitCodePoint(this.entityTrie[this.entityResult] &
                    ~BinTrieFlags.VALUE_LENGTH);
                break;
            }
            case 2: {
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                break;
            }
            case 3: {
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
            }
        }
    }
    stateBeforeNumericEntity(c) {
        if ((c | 0x20) === CharCodes.LowerX) {
            this.entityExcess++;
            this.state = State.InHexEntity;
        }
        else {
            this.state = State.InNumericEntity;
            this.stateInNumericEntity(c);
        }
    }
    emitNumericEntity(strict) {
        const entityStart = this.index - this.entityExcess - 1;
        const numberStart = entityStart + 2 + Number(this.state === State.InHexEntity);
        if (numberStart !== this.index) {
            // Emit leading data if any
            if (entityStart > this.sectionStart) {
                this.emitPartial(this.sectionStart, entityStart);
            }
            this.sectionStart = this.index + Number(strict);
            this.emitCodePoint(replaceCodePoint(this.entityResult));
        }
        this.state = this.baseState;
    }
    stateInNumericEntity(c) {
        if (c === CharCodes.Semi) {
            this.emitNumericEntity(true);
        }
        else if (isNumber(c)) {
            this.entityResult = this.entityResult * 10 + (c - CharCodes.Zero);
            this.entityExcess++;
        }
        else {
            if (this.allowLegacyEntity()) {
                this.emitNumericEntity(false);
            }
            else {
                this.state = this.baseState;
            }
            this.index--;
        }
    }
    stateInHexEntity(c) {
        if (c === CharCodes.Semi) {
            this.emitNumericEntity(true);
        }
        else if (isNumber(c)) {
            this.entityResult = this.entityResult * 16 + (c - CharCodes.Zero);
            this.entityExcess++;
        }
        else if (isHexDigit(c)) {
            this.entityResult =
                this.entityResult * 16 + ((c | 0x20) - CharCodes.LowerA + 10);
            this.entityExcess++;
        }
        else {
            if (this.allowLegacyEntity()) {
                this.emitNumericEntity(false);
            }
            else {
                this.state = this.baseState;
            }
            this.index--;
        }
    }
    allowLegacyEntity() {
        return (!this.xmlMode &&
            (this.baseState === State.Text ||
                this.baseState === State.InSpecialTag));
    }
    /**
     * Remove data that has already been consumed from the buffer.
     */
    cleanup() {
        // If we are inside of text or attributes, emit what we already have.
        if (this.running && this.sectionStart !== this.index) {
            if (this.state === State.Text ||
                (this.state === State.InSpecialTag && this.sequenceIndex === 0)) {
                this.cbs.ontext(this.sectionStart, this.index);
                this.sectionStart = this.index;
            }
            else if (this.state === State.InAttributeValueDq ||
                this.state === State.InAttributeValueSq ||
                this.state === State.InAttributeValueNq) {
                this.cbs.onattribdata(this.sectionStart, this.index);
                this.sectionStart = this.index;
            }
        }
    }
    shouldContinue() {
        return this.index < this.buffer.length + this.offset && this.running;
    }
    /**
     * Iterates through the buffer, calling the function corresponding to the current state.
     *
     * States that are more likely to be hit are higher up, as a performance improvement.
     */
    parse() {
        while (this.shouldContinue()) {
            const c = this.buffer.charCodeAt(this.index - this.offset);
            switch (this.state) {
                case State.Text: {
                    this.stateText(c);
                    break;
                }
                case State.SpecialStartSequence: {
                    this.stateSpecialStartSequence(c);
                    break;
                }
                case State.InSpecialTag: {
                    this.stateInSpecialTag(c);
                    break;
                }
                case State.CDATASequence: {
                    this.stateCDATASequence(c);
                    break;
                }
                case State.InAttributeValueDq: {
                    this.stateInAttributeValueDoubleQuotes(c);
                    break;
                }
                case State.InAttributeName: {
                    this.stateInAttributeName(c);
                    break;
                }
                case State.InCommentLike: {
                    this.stateInCommentLike(c);
                    break;
                }
                case State.InSpecialComment: {
                    this.stateInSpecialComment(c);
                    break;
                }
                case State.BeforeAttributeName: {
                    this.stateBeforeAttributeName(c);
                    break;
                }
                case State.InTagName: {
                    this.stateInTagName(c);
                    break;
                }
                case State.InClosingTagName: {
                    this.stateInClosingTagName(c);
                    break;
                }
                case State.BeforeTagName: {
                    this.stateBeforeTagName(c);
                    break;
                }
                case State.AfterAttributeName: {
                    this.stateAfterAttributeName(c);
                    break;
                }
                case State.InAttributeValueSq: {
                    this.stateInAttributeValueSingleQuotes(c);
                    break;
                }
                case State.BeforeAttributeValue: {
                    this.stateBeforeAttributeValue(c);
                    break;
                }
                case State.BeforeClosingTagName: {
                    this.stateBeforeClosingTagName(c);
                    break;
                }
                case State.AfterClosingTagName: {
                    this.stateAfterClosingTagName(c);
                    break;
                }
                case State.BeforeSpecialS: {
                    this.stateBeforeSpecialS(c);
                    break;
                }
                case State.InAttributeValueNq: {
                    this.stateInAttributeValueNoQuotes(c);
                    break;
                }
                case State.InSelfClosingTag: {
                    this.stateInSelfClosingTag(c);
                    break;
                }
                case State.InDeclaration: {
                    this.stateInDeclaration(c);
                    break;
                }
                case State.BeforeDeclaration: {
                    this.stateBeforeDeclaration(c);
                    break;
                }
                case State.BeforeComment: {
                    this.stateBeforeComment(c);
                    break;
                }
                case State.InProcessingInstruction: {
                    this.stateInProcessingInstruction(c);
                    break;
                }
                case State.InNamedEntity: {
                    this.stateInNamedEntity(c);
                    break;
                }
                case State.BeforeEntity: {
                    this.stateBeforeEntity(c);
                    break;
                }
                case State.InHexEntity: {
                    this.stateInHexEntity(c);
                    break;
                }
                case State.InNumericEntity: {
                    this.stateInNumericEntity(c);
                    break;
                }
                default: {
                    // `this._state === State.BeforeNumericEntity`
                    this.stateBeforeNumericEntity(c);
                }
            }
            this.index++;
        }
        this.cleanup();
    }
    finish() {
        if (this.state === State.InNamedEntity) {
            this.emitNamedEntity();
        }
        // If there is remaining data, emit it in a reasonable way
        if (this.sectionStart < this.index) {
            this.handleTrailingData();
        }
        this.cbs.onend();
    }
    /** Handle any trailing data. */
    handleTrailingData() {
        const endIndex = this.buffer.length + this.offset;
        if (this.state === State.InCommentLike) {
            if (this.currentSequence === Sequences.CdataEnd) {
                this.cbs.oncdata(this.sectionStart, endIndex, 0);
            }
            else {
                this.cbs.oncomment(this.sectionStart, endIndex, 0);
            }
        }
        else if (this.state === State.InNumericEntity &&
            this.allowLegacyEntity()) {
            this.emitNumericEntity(false);
            // All trailing data will have been consumed
        }
        else if (this.state === State.InHexEntity &&
            this.allowLegacyEntity()) {
            this.emitNumericEntity(false);
            // All trailing data will have been consumed
        }
        else if (this.state === State.InTagName ||
            this.state === State.BeforeAttributeName ||
            this.state === State.BeforeAttributeValue ||
            this.state === State.AfterAttributeName ||
            this.state === State.InAttributeName ||
            this.state === State.InAttributeValueSq ||
            this.state === State.InAttributeValueDq ||
            this.state === State.InAttributeValueNq ||
            this.state === State.InClosingTagName) ;
        else {
            this.cbs.ontext(this.sectionStart, endIndex);
        }
    }
    emitPartial(start, endIndex) {
        if (this.baseState !== State.Text &&
            this.baseState !== State.InSpecialTag) {
            this.cbs.onattribdata(start, endIndex);
        }
        else {
            this.cbs.ontext(start, endIndex);
        }
    }
    emitCodePoint(cp) {
        if (this.baseState !== State.Text &&
            this.baseState !== State.InSpecialTag) {
            this.cbs.onattribentity(cp);
        }
        else {
            this.cbs.ontextentity(cp);
        }
    }
}

const formTags = new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea",
]);
const pTag = new Set(["p"]);
const tableSectionTags = new Set(["thead", "tbody"]);
const ddtTags = new Set(["dd", "dt"]);
const rtpTags = new Set(["rt", "rp"]);
const openImpliesClose = new Map([
    ["tr", new Set(["tr", "th", "td"])],
    ["th", new Set(["th"])],
    ["td", new Set(["thead", "th", "td"])],
    ["body", new Set(["head", "link", "script"])],
    ["li", new Set(["li"])],
    ["p", pTag],
    ["h1", pTag],
    ["h2", pTag],
    ["h3", pTag],
    ["h4", pTag],
    ["h5", pTag],
    ["h6", pTag],
    ["select", formTags],
    ["input", formTags],
    ["output", formTags],
    ["button", formTags],
    ["datalist", formTags],
    ["textarea", formTags],
    ["option", new Set(["option"])],
    ["optgroup", new Set(["optgroup", "option"])],
    ["dd", ddtTags],
    ["dt", ddtTags],
    ["address", pTag],
    ["article", pTag],
    ["aside", pTag],
    ["blockquote", pTag],
    ["details", pTag],
    ["div", pTag],
    ["dl", pTag],
    ["fieldset", pTag],
    ["figcaption", pTag],
    ["figure", pTag],
    ["footer", pTag],
    ["form", pTag],
    ["header", pTag],
    ["hr", pTag],
    ["main", pTag],
    ["nav", pTag],
    ["ol", pTag],
    ["pre", pTag],
    ["section", pTag],
    ["table", pTag],
    ["ul", pTag],
    ["rt", rtpTags],
    ["rp", rtpTags],
    ["tbody", tableSectionTags],
    ["tfoot", tableSectionTags],
]);
const voidElements = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
const foreignContextElements = new Set(["math", "svg"]);
const htmlIntegrationElements = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignobject",
    "desc",
    "title",
]);
const reNameEnd = /\s|\//;
class Parser {
    constructor(cbs, options = {}) {
        var _a, _b, _c, _d, _e;
        this.options = options;
        /** The start index of the last event. */
        this.startIndex = 0;
        /** The end index of the last event. */
        this.endIndex = 0;
        /**
         * Store the start index of the current open tag,
         * so we can update the start index for attributes.
         */
        this.openTagStart = 0;
        this.tagname = "";
        this.attribname = "";
        this.attribvalue = "";
        this.attribs = null;
        this.stack = [];
        this.foreignContext = [];
        this.buffers = [];
        this.bufferOffset = 0;
        /** The index of the last written buffer. Used when resuming after a `pause()`. */
        this.writeIndex = 0;
        /** Indicates whether the parser has finished running / `.end` has been called. */
        this.ended = false;
        this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
        this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : !options.xmlMode;
        this.lowerCaseAttributeNames =
            (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode;
        this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : Tokenizer)(this.options, this);
        (_e = (_d = this.cbs).onparserinit) === null || _e === void 0 ? void 0 : _e.call(_d, this);
    }
    // Tokenizer event handlers
    /** @internal */
    ontext(start, endIndex) {
        var _a, _b;
        const data = this.getSlice(start, endIndex);
        this.endIndex = endIndex - 1;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, data);
        this.startIndex = endIndex;
    }
    /** @internal */
    ontextentity(cp) {
        var _a, _b;
        /*
         * Entities can be emitted on the character, or directly after.
         * We use the section start here to get accurate indices.
         */
        const index = this.tokenizer.getSectionStart();
        this.endIndex = index - 1;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, fromCodePoint(cp));
        this.startIndex = index;
    }
    isVoidElement(name) {
        return !this.options.xmlMode && voidElements.has(name);
    }
    /** @internal */
    onopentagname(start, endIndex) {
        this.endIndex = endIndex;
        let name = this.getSlice(start, endIndex);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        this.emitOpenTag(name);
    }
    emitOpenTag(name) {
        var _a, _b, _c, _d;
        this.openTagStart = this.startIndex;
        this.tagname = name;
        const impliesClose = !this.options.xmlMode && openImpliesClose.get(name);
        if (impliesClose) {
            while (this.stack.length > 0 &&
                impliesClose.has(this.stack[this.stack.length - 1])) {
                const element = this.stack.pop();
                (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, element, true);
            }
        }
        if (!this.isVoidElement(name)) {
            this.stack.push(name);
            if (foreignContextElements.has(name)) {
                this.foreignContext.push(true);
            }
            else if (htmlIntegrationElements.has(name)) {
                this.foreignContext.push(false);
            }
        }
        (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name);
        if (this.cbs.onopentag)
            this.attribs = {};
    }
    endOpenTag(isImplied) {
        var _a, _b;
        this.startIndex = this.openTagStart;
        if (this.attribs) {
            (_b = (_a = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a, this.tagname, this.attribs, isImplied);
            this.attribs = null;
        }
        if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
            this.cbs.onclosetag(this.tagname, true);
        }
        this.tagname = "";
    }
    /** @internal */
    onopentagend(endIndex) {
        this.endIndex = endIndex;
        this.endOpenTag(false);
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */
    onclosetag(start, endIndex) {
        var _a, _b, _c, _d, _e, _f;
        this.endIndex = endIndex;
        let name = this.getSlice(start, endIndex);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        if (foreignContextElements.has(name) ||
            htmlIntegrationElements.has(name)) {
            this.foreignContext.pop();
        }
        if (!this.isVoidElement(name)) {
            const pos = this.stack.lastIndexOf(name);
            if (pos !== -1) {
                if (this.cbs.onclosetag) {
                    let count = this.stack.length - pos;
                    while (count--) {
                        // We know the stack has sufficient elements.
                        this.cbs.onclosetag(this.stack.pop(), count !== 0);
                    }
                }
                else
                    this.stack.length = pos;
            }
            else if (!this.options.xmlMode && name === "p") {
                // Implicit open before close
                this.emitOpenTag("p");
                this.closeCurrentTag(true);
            }
        }
        else if (!this.options.xmlMode && name === "br") {
            // We can't use `emitOpenTag` for implicit open, as `br` would be implicitly closed.
            (_b = (_a = this.cbs).onopentagname) === null || _b === void 0 ? void 0 : _b.call(_a, "br");
            (_d = (_c = this.cbs).onopentag) === null || _d === void 0 ? void 0 : _d.call(_c, "br", {}, true);
            (_f = (_e = this.cbs).onclosetag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", false);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */
    onselfclosingtag(endIndex) {
        this.endIndex = endIndex;
        if (this.options.xmlMode ||
            this.options.recognizeSelfClosing ||
            this.foreignContext[this.foreignContext.length - 1]) {
            this.closeCurrentTag(false);
            // Set `startIndex` for next node
            this.startIndex = endIndex + 1;
        }
        else {
            // Ignore the fact that the tag is self-closing.
            this.onopentagend(endIndex);
        }
    }
    closeCurrentTag(isOpenImplied) {
        var _a, _b;
        const name = this.tagname;
        this.endOpenTag(isOpenImplied);
        // Self-closing tags will be on the top of the stack
        if (this.stack[this.stack.length - 1] === name) {
            // If the opening tag isn't implied, the closing tag has to be implied.
            (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, name, !isOpenImplied);
            this.stack.pop();
        }
    }
    /** @internal */
    onattribname(start, endIndex) {
        this.startIndex = start;
        const name = this.getSlice(start, endIndex);
        this.attribname = this.lowerCaseAttributeNames
            ? name.toLowerCase()
            : name;
    }
    /** @internal */
    onattribdata(start, endIndex) {
        this.attribvalue += this.getSlice(start, endIndex);
    }
    /** @internal */
    onattribentity(cp) {
        this.attribvalue += fromCodePoint(cp);
    }
    /** @internal */
    onattribend(quote, endIndex) {
        var _a, _b;
        this.endIndex = endIndex;
        (_b = (_a = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a, this.attribname, this.attribvalue, quote === QuoteType.Double
            ? '"'
            : quote === QuoteType.Single
                ? "'"
                : quote === QuoteType.NoValue
                    ? undefined
                    : null);
        if (this.attribs &&
            !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
            this.attribs[this.attribname] = this.attribvalue;
        }
        this.attribvalue = "";
    }
    getInstructionName(value) {
        const index = value.search(reNameEnd);
        let name = index < 0 ? value : value.substr(0, index);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        return name;
    }
    /** @internal */
    ondeclaration(start, endIndex) {
        this.endIndex = endIndex;
        const value = this.getSlice(start, endIndex);
        if (this.cbs.onprocessinginstruction) {
            const name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */
    onprocessinginstruction(start, endIndex) {
        this.endIndex = endIndex;
        const value = this.getSlice(start, endIndex);
        if (this.cbs.onprocessinginstruction) {
            const name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */
    oncomment(start, endIndex, offset) {
        var _a, _b, _c, _d;
        this.endIndex = endIndex;
        (_b = (_a = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a, this.getSlice(start, endIndex - offset));
        (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */
    oncdata(start, endIndex, offset) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.endIndex = endIndex;
        const value = this.getSlice(start, endIndex - offset);
        if (this.options.xmlMode || this.options.recognizeCDATA) {
            (_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
            (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
        }
        else {
            (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, `[CDATA[${value}]]`);
            (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */
    onend() {
        var _a, _b;
        if (this.cbs.onclosetag) {
            // Set the end index for all remaining tags
            this.endIndex = this.startIndex;
            for (let index = this.stack.length; index > 0; this.cbs.onclosetag(this.stack[--index], true))
                ;
        }
        (_b = (_a = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * Resets the parser to a blank state, ready to parse a new HTML document
     */
    reset() {
        var _a, _b, _c, _d;
        (_b = (_a = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.tokenizer.reset();
        this.tagname = "";
        this.attribname = "";
        this.attribs = null;
        this.stack.length = 0;
        this.startIndex = 0;
        this.endIndex = 0;
        (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
        this.buffers.length = 0;
        this.bufferOffset = 0;
        this.writeIndex = 0;
        this.ended = false;
    }
    /**
     * Resets the parser, then parses a complete document and
     * pushes it to the handler.
     *
     * @param data Document to parse.
     */
    parseComplete(data) {
        this.reset();
        this.end(data);
    }
    getSlice(start, end) {
        while (start - this.bufferOffset >= this.buffers[0].length) {
            this.shiftBuffer();
        }
        let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
        while (end - this.bufferOffset > this.buffers[0].length) {
            this.shiftBuffer();
            slice += this.buffers[0].slice(0, end - this.bufferOffset);
        }
        return slice;
    }
    shiftBuffer() {
        this.bufferOffset += this.buffers[0].length;
        this.writeIndex--;
        this.buffers.shift();
    }
    /**
     * Parses a chunk of data and calls the corresponding callbacks.
     *
     * @param chunk Chunk to parse.
     */
    write(chunk) {
        var _a, _b;
        if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".write() after done!"));
            return;
        }
        this.buffers.push(chunk);
        if (this.tokenizer.running) {
            this.tokenizer.write(chunk);
            this.writeIndex++;
        }
    }
    /**
     * Parses the end of the buffer and clears the stack, calls onend.
     *
     * @param chunk Optional final chunk to parse.
     */
    end(chunk) {
        var _a, _b;
        if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".end() after done!"));
            return;
        }
        if (chunk)
            this.write(chunk);
        this.ended = true;
        this.tokenizer.end();
    }
    /**
     * Pauses parsing. The parser won't emit events until `resume` is called.
     */
    pause() {
        this.tokenizer.pause();
    }
    /**
     * Resumes parsing after `pause` was called.
     */
    resume() {
        this.tokenizer.resume();
        while (this.tokenizer.running &&
            this.writeIndex < this.buffers.length) {
            this.tokenizer.write(this.buffers[this.writeIndex++]);
        }
        if (this.ended)
            this.tokenizer.end();
    }
    /**
     * Alias of `write`, for backwards compatibility.
     *
     * @param chunk Chunk to parse.
     * @deprecated
     */
    parseChunk(chunk) {
        this.write(chunk);
    }
    /**
     * Alias of `end`, for backwards compatibility.
     *
     * @param chunk Optional final chunk to parse.
     * @deprecated
     */
    done(chunk) {
        this.end(chunk);
    }
}

const xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
const xmlCodeMap = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"],
]);
// For compatibility with node < 4, we wrap `codePointAt`
const getCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.prototype.codePointAt != null
    ? (str, index) => str.codePointAt(index)
    : // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        (c, index) => (c.charCodeAt(index) & 0xfc00) === 0xd800
            ? (c.charCodeAt(index) - 0xd800) * 0x400 +
                c.charCodeAt(index + 1) -
                0xdc00 +
                0x10000
            : c.charCodeAt(index);
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using XML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
function encodeXML(str) {
    let ret = "";
    let lastIdx = 0;
    let match;
    while ((match = xmlReplacer.exec(str)) !== null) {
        const i = match.index;
        const char = str.charCodeAt(i);
        const next = xmlCodeMap.get(char);
        if (next !== undefined) {
            ret += str.substring(lastIdx, i) + next;
            lastIdx = i + 1;
        }
        else {
            ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
            // Increase by 1 if we have a surrogate pair
            lastIdx = xmlReplacer.lastIndex += Number((char & 0xfc00) === 0xd800);
        }
    }
    return ret + str.substr(lastIdx);
}
/**
 * Creates a function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 *
 * @param regex Regular expression to match characters to escape.
 * @param map Map of characters to escape to their entities.
 *
 * @returns Function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 */
function getEscaper(regex, map) {
    return function escape(data) {
        let match;
        let lastIdx = 0;
        let result = "";
        while ((match = regex.exec(data))) {
            if (lastIdx !== match.index) {
                result += data.substring(lastIdx, match.index);
            }
            // We know that this character will be in the map.
            result += map.get(match[0].charCodeAt(0));
            // Every match will be of length 1
            lastIdx = match.index + 1;
        }
        return result + data.substring(lastIdx);
    };
}
/**
 * Encodes all characters that have to be escaped in HTML attributes,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */
const escapeAttribute = getEscaper(/["&\u00A0]/g, new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"],
]));
/**
 * Encodes all characters that have to be escaped in HTML text,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */
const escapeText = getEscaper(/[&<>\u00A0]/g, new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"],
]));

const elementNames = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath",
].map((val) => [val.toLowerCase(), val]));
const attributeNames = new Map([
    "definitionURL",
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan",
].map((val) => [val.toLowerCase(), val]));

/*
 * Module dependencies
 */
const unencodedElements = new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript",
]);
function replaceQuotes(value) {
    return value.replace(/"/g, "&quot;");
}
/**
 * Format attributes
 */
function formatAttributes(attributes, opts) {
    var _a;
    if (!attributes)
        return;
    const encode = ((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) === false
        ? replaceQuotes
        : opts.xmlMode || opts.encodeEntities !== "utf8"
            ? encodeXML
            : escapeAttribute;
    return Object.keys(attributes)
        .map((key) => {
        var _a, _b;
        const value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
        if (opts.xmlMode === "foreign") {
            /* Fix up mixed-case attribute names */
            key = (_b = attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
        }
        if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
            return key;
        }
        return `${key}="${encode(value)}"`;
    })
        .join(" ");
}
/**
 * Self-enclosing tags
 */
const singleTag = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
/**
 * Renders a DOM node or an array of DOM nodes to a string.
 *
 * Can be thought of as the equivalent of the `outerHTML` of the passed node(s).
 *
 * @param node Node to be rendered.
 * @param options Changes serialization behavior
 */
function render$1(node, options = {}) {
    const nodes = "length" in node ? node : [node];
    let output = "";
    for (let i = 0; i < nodes.length; i++) {
        output += renderNode(nodes[i], options);
    }
    return output;
}
function renderNode(node, options) {
    switch (node.type) {
        case Root:
            return render$1(node.children, options);
        // @ts-expect-error We don't use `Doctype` yet
        case Doctype:
        case Directive:
            return renderDirective(node);
        case Comment$1:
            return renderComment(node);
        case CDATA$1:
            return renderCdata(node);
        case Script:
        case Style:
        case Tag:
            return renderTag(node, options);
        case Text$1:
            return renderText(node, options);
    }
}
const foreignModeIntegrationPoints = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title",
]);
const foreignElements = new Set(["svg", "math"]);
function renderTag(elem, opts) {
    var _a;
    // Handle SVG / MathML in HTML
    if (opts.xmlMode === "foreign") {
        /* Fix up mixed-case element names */
        elem.name = (_a = elementNames.get(elem.name)) !== null && _a !== void 0 ? _a : elem.name;
        /* Exit foreign mode at integration points */
        if (elem.parent &&
            foreignModeIntegrationPoints.has(elem.parent.name)) {
            opts = { ...opts, xmlMode: false };
        }
    }
    if (!opts.xmlMode && foreignElements.has(elem.name)) {
        opts = { ...opts, xmlMode: "foreign" };
    }
    let tag = `<${elem.name}`;
    const attribs = formatAttributes(elem.attribs, opts);
    if (attribs) {
        tag += ` ${attribs}`;
    }
    if (elem.children.length === 0 &&
        (opts.xmlMode
            ? // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
                opts.selfClosingTags !== false
            : // User explicitly asked for self-closing tags, even in HTML mode
                opts.selfClosingTags && singleTag.has(elem.name))) {
        if (!opts.xmlMode)
            tag += " ";
        tag += "/>";
    }
    else {
        tag += ">";
        if (elem.children.length > 0) {
            tag += render$1(elem.children, opts);
        }
        if (opts.xmlMode || !singleTag.has(elem.name)) {
            tag += `</${elem.name}>`;
        }
    }
    return tag;
}
function renderDirective(elem) {
    return `<${elem.data}>`;
}
function renderText(elem, opts) {
    var _a;
    let data = elem.data || "";
    // If entities weren't decoded, no need to encode them back
    if (((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) !== false &&
        !(!opts.xmlMode &&
            elem.parent &&
            unencodedElements.has(elem.parent.name))) {
        data =
            opts.xmlMode || opts.encodeEntities !== "utf8"
                ? encodeXML(data)
                : escapeText(data);
    }
    return data;
}
function renderCdata(elem) {
    return `<![CDATA[${elem.children[0].data}]]>`;
}
function renderComment(elem) {
    return `<!--${elem.data}-->`;
}

// Helper methods
/**
 * Parses the data, returns the resulting document.
 *
 * @param data The data that should be parsed.
 * @param options Optional options for the parser and DOM builder.
 */
function parseDocument(data, options) {
    const handler = new DomHandler(undefined, options);
    new Parser(handler, options).end(data);
    return handler.root;
}

var cjs;
var hasRequiredCjs;

function requireCjs () {
	if (hasRequiredCjs) return cjs;
	hasRequiredCjs = 1;

	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};

	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return (options.clone !== false && options.isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, options)
			: value
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, options)
		})
	}

	function getMergeFunction(key, options) {
		if (!options.customMerge) {
			return deepmerge
		}
		var customMerge = options.customMerge(key);
		return typeof customMerge === 'function' ? customMerge : deepmerge
	}

	function getEnumerableOwnPropertySymbols(target) {
		return Object.getOwnPropertySymbols
			? Object.getOwnPropertySymbols(target).filter(function(symbol) {
				return Object.propertyIsEnumerable.call(target, symbol)
			})
			: []
	}

	function getKeys(target) {
		return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
	}

	function propertyIsOnObject(object, property) {
		try {
			return property in object
		} catch(_) {
			return false
		}
	}

	// Protects from prototype poisoning and unexpected merging up the prototype chain.
	function propertyIsUnsafe(target, key) {
		return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
			&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
				&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			getKeys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		getKeys(source).forEach(function(key) {
			if (propertyIsUnsafe(target, key)) {
				return
			}

			if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
				destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
			} else {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			}
		});
		return destination
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;
		// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
		// implementations can use it. The caller may not replace it.
		options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options)
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options)
		} else {
			return mergeObject(target, source, options)
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, options)
		}, {})
	};

	var deepmerge_1 = deepmerge;

	cjs = deepmerge_1;
	return cjs;
}

var cjsExports = requireCjs();
const merge = /*@__PURE__*/getDefaultExportFromCjs(cjsExports);

/**
 * Make a recursive function that will only run to a given depth
 * and switches to an alternative function at that depth. \
 * No limitation if `n` is `undefined` (Just wraps `f` in that case).
 *
 * @param   { number | undefined } n   Allowed depth of recursion. `undefined` for no limitation.
 * @param   { Function }           f   Function that accepts recursive callback as the first argument.
 * @param   { Function }           [g] Function to run instead, when maximum depth was reached. Do nothing by default.
 * @returns { Function }
 */
function limitedDepthRecursive (n, f, g = () => undefined) {
  if (n === undefined) {
    const f1 = function (...args) { return f(f1, ...args); };
    return f1;
  }
  if (n >= 0) {
    return function (...args) { return f(limitedDepthRecursive(n - 1, f, g), ...args); };
  }
  return g;
}

/**
 * Return the same string or a substring with
 * the given character occurrences removed from each side.
 *
 * @param   { string } str  A string to trim.
 * @param   { string } char A character to be trimmed.
 * @returns { string }
 */
function trimCharacter (str, char) {
  let start = 0;
  let end = str.length;
  while (start < end && str[start] === char) { ++start; }
  while (end > start && str[end - 1] === char) { --end; }
  return (start > 0 || end < str.length)
    ? str.substring(start, end)
    : str;
}

/**
 * Return the same string or a substring with
 * the given character occurrences removed from the end only.
 *
 * @param   { string } str  A string to trim.
 * @param   { string } char A character to be trimmed.
 * @returns { string }
 */
function trimCharacterEnd (str, char) {
  let end = str.length;
  while (end > 0 && str[end - 1] === char) { --end; }
  return (end < str.length)
    ? str.substring(0, end)
    : str;
}

/**
 * Return a new string will all characters replaced with unicode escape sequences.
 * This extreme kind of escaping can used to be safely compose regular expressions.
 *
 * @param { string } str A string to escape.
 * @returns { string } A string of unicode escape sequences.
 */
function unicodeEscape (str) {
  return str.replace(/[\s\S]/g, c => '\\u' + c.charCodeAt().toString(16).padStart(4, '0'));
}

/**
 * Deduplicate an array by a given key callback.
 * Item properties are merged recursively and with the preference for last defined values.
 * Of items with the same key, merged item takes the place of the last item,
 * others are omitted.
 *
 * @param { any[] } items An array to deduplicate.
 * @param { (x: any) => string } getKey Callback to get a value that distinguishes unique items.
 * @returns { any[] }
 */
function mergeDuplicatesPreferLast (items, getKey) {
  const map = new Map();
  for (let i = items.length; i-- > 0;) {
    const item = items[i];
    const key = getKey(item);
    map.set(
      key,
      (map.has(key))
        ? merge(item, map.get(key), { arrayMerge: overwriteMerge$1 })
        : item
    );
  }
  return [...map.values()].reverse();
}

const overwriteMerge$1 = (acc, src, options) => [...src];

/**
 * Get a nested property from an object.
 *
 * @param   { object }   obj  The object to query for the value.
 * @param   { string[] } path The path to the property.
 * @returns { any }
 */
function get (obj, path) {
  for (const key of path) {
    if (!obj) { return undefined; }
    obj = obj[key];
  }
  return obj;
}

/**
 * Convert a number into alphabetic sequence representation (Sequence without zeroes).
 *
 * For example: `a, ..., z, aa, ..., zz, aaa, ...`.
 *
 * @param   { number } num              Number to convert. Must be >= 1.
 * @param   { string } [baseChar = 'a'] Character for 1 in the sequence.
 * @param   { number } [base = 26]      Number of characters in the sequence.
 * @returns { string }
 */
function numberToLetterSequence (num, baseChar = 'a', base = 26) {
  const digits = [];
  do {
    num -= 1;
    digits.push(num % base);
    num = (num / base) >> 0; // quick `floor`
  } while (num > 0);
  const baseCode = baseChar.charCodeAt(0);
  return digits
    .reverse()
    .map(n => String.fromCharCode(baseCode + n))
    .join('');
}

const I$1 = ['I', 'X', 'C', 'M'];
const V$2 = ['V', 'L', 'D'];

/**
 * Convert a number to it's Roman representation. No large numbers extension.
 *
 * @param   { number } num Number to convert. `0 < num <= 3999`.
 * @returns { string }
 */
function numberToRoman (num) {
  return [...(num) + '']
    .map(n => +n)
    .reverse()
    .map((v, i) => ((v % 5 < 4)
      ? (v < 5 ? '' : V$2[i]) + I$1[i].repeat(v % 5)
      : I$1[i] + (v < 5 ? V$2[i] : I$1[i + 1])))
    .reverse()
    .join('');
}

/**
 * Helps to build text from words.
 */
class InlineTextBuilder {
  /**
   * Creates an instance of InlineTextBuilder.
   *
   * If `maxLineLength` is not provided then it is either `options.wordwrap` or unlimited.
   *
   * @param { Options } options           HtmlToText options.
   * @param { number }  [ maxLineLength ] This builder will try to wrap text to fit this line length.
   */
  constructor (options, maxLineLength = undefined) {
    /** @type { string[][] } */
    this.lines = [];
    /** @type { string[] }   */
    this.nextLineWords = [];
    this.maxLineLength = maxLineLength || options.wordwrap || Number.MAX_VALUE;
    this.nextLineAvailableChars = this.maxLineLength;
    this.wrapCharacters = get(options, ['longWordSplit', 'wrapCharacters']) || [];
    this.forceWrapOnLimit = get(options, ['longWordSplit', 'forceWrapOnLimit']) || false;

    this.stashedSpace = false;
    this.wordBreakOpportunity = false;
  }

  /**
   * Add a new word.
   *
   * @param { string } word A word to add.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */
  pushWord (word, noWrap = false) {
    if (this.nextLineAvailableChars <= 0 && !noWrap) {
      this.startNewLine();
    }
    const isLineStart = this.nextLineWords.length === 0;
    const cost = word.length + (isLineStart ? 0 : 1);
    if ((cost <= this.nextLineAvailableChars) || noWrap) { // Fits into available budget

      this.nextLineWords.push(word);
      this.nextLineAvailableChars -= cost;

    } else { // Does not fit - try to split the word

      // The word is moved to a new line - prefer to wrap between words.
      const [first, ...rest] = this.splitLongWord(word);
      if (!isLineStart) { this.startNewLine(); }
      this.nextLineWords.push(first);
      this.nextLineAvailableChars -= first.length;
      for (const part of rest) {
        this.startNewLine();
        this.nextLineWords.push(part);
        this.nextLineAvailableChars -= part.length;
      }

    }
  }

  /**
   * Pop a word from the currently built line.
   * This doesn't affect completed lines.
   *
   * @returns { string }
   */
  popWord () {
    const lastWord = this.nextLineWords.pop();
    if (lastWord !== undefined) {
      const isLineStart = this.nextLineWords.length === 0;
      const cost = lastWord.length + (isLineStart ? 0 : 1);
      this.nextLineAvailableChars += cost;
    }
    return lastWord;
  }

  /**
   * Concat a word to the last word already in the builder.
   * Adds a new word in case there are no words yet in the last line.
   *
   * @param { string } word A word to be concatenated.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */
  concatWord (word, noWrap = false) {
    if (this.wordBreakOpportunity && word.length > this.nextLineAvailableChars) {
      this.pushWord(word, noWrap);
      this.wordBreakOpportunity = false;
    } else {
      const lastWord = this.popWord();
      this.pushWord((lastWord) ? lastWord.concat(word) : word, noWrap);
    }
  }

  /**
   * Add current line (and more empty lines if provided argument > 1) to the list of complete lines and start a new one.
   *
   * @param { number } n Number of line breaks that will be added to the resulting string.
   */
  startNewLine (n = 1) {
    this.lines.push(this.nextLineWords);
    if (n > 1) {
      this.lines.push(...Array.from({ length: n - 1 }, () => []));
    }
    this.nextLineWords = [];
    this.nextLineAvailableChars = this.maxLineLength;
  }

  /**
   * No words in this builder.
   *
   * @returns { boolean }
   */
  isEmpty () {
    return this.lines.length === 0
        && this.nextLineWords.length === 0;
  }

  clear () {
    this.lines.length = 0;
    this.nextLineWords.length = 0;
    this.nextLineAvailableChars = this.maxLineLength;
  }

  /**
   * Join all lines of words inside the InlineTextBuilder into a complete string.
   *
   * @returns { string }
   */
  toString () {
    return [...this.lines, this.nextLineWords]
      .map(words => words.join(' '))
      .join('\n');
  }

  /**
   * Split a long word up to fit within the word wrap limit.
   * Use either a character to split looking back from the word wrap limit,
   * or truncate to the word wrap limit.
   *
   * @param   { string }   word Input word.
   * @returns { string[] }      Parts of the word.
   */
  splitLongWord (word) {
    const parts = [];
    let idx = 0;
    while (word.length > this.maxLineLength) {

      const firstLine = word.substring(0, this.maxLineLength);
      const remainingChars = word.substring(this.maxLineLength);

      const splitIndex = firstLine.lastIndexOf(this.wrapCharacters[idx]);

      if (splitIndex > -1) { // Found a character to split on

        word = firstLine.substring(splitIndex + 1) + remainingChars;
        parts.push(firstLine.substring(0, splitIndex + 1));

      } else { // Not found a character to split on

        idx++;
        if (idx < this.wrapCharacters.length) { // There is next character to try

          word = firstLine + remainingChars;

        } else { // No more characters to try

          if (this.forceWrapOnLimit) {
            parts.push(firstLine);
            word = remainingChars;
            if (word.length > this.maxLineLength) {
              continue;
            }
          } else {
            word = firstLine + remainingChars;
          }
          break;

        }

      }

    }
    parts.push(word); // Add remaining part to array
    return parts;
  }
}

/* eslint-disable max-classes-per-file */


class StackItem {
  constructor (next = null) { this.next = next; }

  getRoot () { return (this.next) ? this.next : this; }
}

class BlockStackItem extends StackItem {
  constructor (options, next = null, leadingLineBreaks = 1, maxLineLength = undefined) {
    super(next);
    this.leadingLineBreaks = leadingLineBreaks;
    this.inlineTextBuilder = new InlineTextBuilder(options, maxLineLength);
    this.rawText = '';
    this.stashedLineBreaks = 0;
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
}

class ListStackItem extends BlockStackItem {
  constructor (
    options,
    next = null,
    {
      interRowLineBreaks = 1,
      leadingLineBreaks = 2,
      maxLineLength = undefined,
      maxPrefixLength = 0,
      prefixAlign = 'left',
    } = {}
  ) {
    super(options, next, leadingLineBreaks, maxLineLength);
    this.maxPrefixLength = maxPrefixLength;
    this.prefixAlign = prefixAlign;
    this.interRowLineBreaks = interRowLineBreaks;
  }
}

class ListItemStackItem extends BlockStackItem {
  constructor (
    options,
    next = null,
    {
      leadingLineBreaks = 1,
      maxLineLength = undefined,
      prefix = '',
    } = {}
  ) {
    super(options, next, leadingLineBreaks, maxLineLength);
    this.prefix = prefix;
  }
}

class TableStackItem extends StackItem {
  constructor (next = null) {
    super(next);
    this.rows = [];
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
}

class TableRowStackItem extends StackItem {
  constructor (next = null) {
    super(next);
    this.cells = [];
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
}

class TableCellStackItem extends StackItem {
  constructor (options, next = null, maxColumnWidth = undefined) {
    super(next);
    this.inlineTextBuilder = new InlineTextBuilder(options, maxColumnWidth);
    this.rawText = '';
    this.stashedLineBreaks = 0;
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
}

class TransformerStackItem extends StackItem {
  constructor (next = null, transform) {
    super(next);
    this.transform = transform;
  }
}

function charactersToCodes (str) {
  return [...str]
    .map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))
    .join('');
}

/**
 * Helps to handle HTML whitespaces.
 *
 * @class WhitespaceProcessor
 */
class WhitespaceProcessor {

  /**
   * Creates an instance of WhitespaceProcessor.
   *
   * @param { Options } options    HtmlToText options.
   * @memberof WhitespaceProcessor
   */
  constructor (options) {
    this.whitespaceChars = (options.preserveNewlines)
      ? options.whitespaceCharacters.replace(/\n/g, '')
      : options.whitespaceCharacters;
    const whitespaceCodes = charactersToCodes(this.whitespaceChars);
    this.leadingWhitespaceRe = new RegExp(`^[${whitespaceCodes}]`);
    this.trailingWhitespaceRe = new RegExp(`[${whitespaceCodes}]$`);
    this.allWhitespaceOrEmptyRe = new RegExp(`^[${whitespaceCodes}]*$`);
    this.newlineOrNonWhitespaceRe = new RegExp(`(\\n|[^\\n${whitespaceCodes}])`, 'g');
    this.newlineOrNonNewlineStringRe = new RegExp(`(\\n|[^\\n]+)`, 'g');

    if (options.preserveNewlines) {

      const wordOrNewlineRe = new RegExp(`\\n|[^\\n${whitespaceCodes}]+`, 'gm');

      /**
       * Shrink whitespaces and wrap text, add to the builder.
       *
       * @param { string }                  text              Input text.
       * @param { InlineTextBuilder }       inlineTextBuilder A builder to receive processed text.
       * @param { (str: string) => string } [ transform ]     A transform to be applied to words.
       * @param { boolean }                 [noWrap] Don't wrap text even if the line is too long.
       */
      this.shrinkWrapAdd = function (text, inlineTextBuilder, transform = (str => str), noWrap = false) {
        if (!text) { return; }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m = wordOrNewlineRe.exec(text);
        if (m) {
          anyMatch = true;
          if (m[0] === '\n') {
            inlineTextBuilder.startNewLine();
          } else if (previouslyStashedSpace || this.testLeadingWhitespace(text)) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          } else {
            inlineTextBuilder.concatWord(transform(m[0]), noWrap);
          }
          while ((m = wordOrNewlineRe.exec(text)) !== null) {
            if (m[0] === '\n') {
              inlineTextBuilder.startNewLine();
            } else {
              inlineTextBuilder.pushWord(transform(m[0]), noWrap);
            }
          }
        }
        inlineTextBuilder.stashedSpace = (previouslyStashedSpace && !anyMatch) || (this.testTrailingWhitespace(text));
        // No need to stash a space in case last added item was a new line,
        // but that won't affect anything later anyway.
      };

    } else {

      const wordRe = new RegExp(`[^${whitespaceCodes}]+`, 'g');

      this.shrinkWrapAdd = function (text, inlineTextBuilder, transform = (str => str), noWrap = false) {
        if (!text) { return; }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m = wordRe.exec(text);
        if (m) {
          anyMatch = true;
          if (previouslyStashedSpace || this.testLeadingWhitespace(text)) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          } else {
            inlineTextBuilder.concatWord(transform(m[0]), noWrap);
          }
          while ((m = wordRe.exec(text)) !== null) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          }
        }
        inlineTextBuilder.stashedSpace = (previouslyStashedSpace && !anyMatch) || this.testTrailingWhitespace(text);
      };

    }
  }

  /**
   * Add text with only minimal processing.
   * Everything between newlines considered a single word.
   * No whitespace is trimmed.
   * Not affected by preserveNewlines option - `\n` always starts a new line.
   *
   * `noWrap` argument is `true` by default - this won't start a new line
   * even if there is not enough space left in the current line.
   *
   * @param { string }            text              Input text.
   * @param { InlineTextBuilder } inlineTextBuilder A builder to receive processed text.
   * @param { boolean }           [noWrap] Don't wrap text even if the line is too long.
   */
  addLiteral (text, inlineTextBuilder, noWrap = true) {
    if (!text) { return; }
    const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
    let anyMatch = false;
    let m = this.newlineOrNonNewlineStringRe.exec(text);
    if (m) {
      anyMatch = true;
      if (m[0] === '\n') {
        inlineTextBuilder.startNewLine();
      } else if (previouslyStashedSpace) {
        inlineTextBuilder.pushWord(m[0], noWrap);
      } else {
        inlineTextBuilder.concatWord(m[0], noWrap);
      }
      while ((m = this.newlineOrNonNewlineStringRe.exec(text)) !== null) {
        if (m[0] === '\n') {
          inlineTextBuilder.startNewLine();
        } else {
          inlineTextBuilder.pushWord(m[0], noWrap);
        }
      }
    }
    inlineTextBuilder.stashedSpace = (previouslyStashedSpace && !anyMatch);
  }

  /**
   * Test whether the given text starts with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testLeadingWhitespace (text) {
    return this.leadingWhitespaceRe.test(text);
  }

  /**
   * Test whether the given text ends with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testTrailingWhitespace (text) {
    return this.trailingWhitespaceRe.test(text);
  }

  /**
   * Test whether the given text contains any non-whitespace characters.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testContainsWords (text) {
    return !this.allWhitespaceOrEmptyRe.test(text);
  }

  /**
   * Return the number of newlines if there are no words.
   *
   * If any word is found then return zero regardless of the actual number of newlines.
   *
   * @param   { string }  text  Input string.
   * @returns { number }
   */
  countNewlinesNoWords (text) {
    this.newlineOrNonWhitespaceRe.lastIndex = 0;
    let counter = 0;
    let match;
    while ((match = this.newlineOrNonWhitespaceRe.exec(text)) !== null) {
      if (match[0] === '\n') {
        counter++;
      } else {
        return 0;
      }
    }
    return counter;
  }

}

/**
 * Helps to build text from inline and block elements.
 *
 * @class BlockTextBuilder
 */
class BlockTextBuilder {

  /**
   * Creates an instance of BlockTextBuilder.
   *
   * @param { Options } options HtmlToText options.
   * @param { import('selderee').Picker<DomNode, TagDefinition> } picker Selectors decision tree picker.
   * @param { any} [metadata] Optional metadata for HTML document, for use in formatters.
   */
  constructor (options, picker, metadata = undefined) {
    this.options = options;
    this.picker = picker;
    this.metadata = metadata;
    this.whitespaceProcessor = new WhitespaceProcessor(options);
    /** @type { StackItem } */
    this._stackItem = new BlockStackItem(options);
    /** @type { TransformerStackItem } */
    this._wordTransformer = undefined;
  }

  /**
   * Put a word-by-word transform function onto the transformations stack.
   *
   * Mainly used for uppercasing. Can be bypassed to add unformatted text such as URLs.
   *
   * Word transformations applied before wrapping.
   *
   * @param { (str: string) => string } wordTransform Word transformation function.
   */
  pushWordTransform (wordTransform) {
    this._wordTransformer = new TransformerStackItem(this._wordTransformer, wordTransform);
  }

  /**
   * Remove a function from the word transformations stack.
   *
   * @returns { (str: string) => string } A function that was removed.
   */
  popWordTransform () {
    if (!this._wordTransformer) { return undefined; }
    const transform = this._wordTransformer.transform;
    this._wordTransformer = this._wordTransformer.next;
    return transform;
  }

  /**
   * Ignore wordwrap option in followup inline additions and disable automatic wrapping.
   */
  startNoWrap () {
    this._stackItem.isNoWrap = true;
  }

  /**
   * Return automatic wrapping to behavior defined by options.
   */
  stopNoWrap () {
    this._stackItem.isNoWrap = false;
  }

  /** @returns { (str: string) => string } */
  _getCombinedWordTransformer () {
    const wt = (this._wordTransformer)
      ? ((str) => applyTransformer(str, this._wordTransformer))
      : undefined;
    const ce = this.options.encodeCharacters;
    return (wt)
      ? ((ce) ? (str) => ce(wt(str)) : wt)
      : ce;
  }

  _popStackItem () {
    const item = this._stackItem;
    this._stackItem = item.next;
    return item;
  }

  /**
   * Add a line break into currently built block.
   */
  addLineBreak () {
    if (!(
      this._stackItem instanceof BlockStackItem
      || this._stackItem instanceof ListItemStackItem
      || this._stackItem instanceof TableCellStackItem
    )) { return; }
    if (this._stackItem.isPre) {
      this._stackItem.rawText += '\n';
    } else {
      this._stackItem.inlineTextBuilder.startNewLine();
    }
  }

  /**
   * Allow to break line in case directly following text will not fit.
   */
  addWordBreakOpportunity () {
    if (
      this._stackItem instanceof BlockStackItem
      || this._stackItem instanceof ListItemStackItem
      || this._stackItem instanceof TableCellStackItem
    ) {
      this._stackItem.inlineTextBuilder.wordBreakOpportunity = true;
    }
  }

  /**
   * Add a node inline into the currently built block.
   *
   * @param { string } str
   * Text content of a node to add.
   *
   * @param { object } [param1]
   * Object holding the parameters of the operation.
   *
   * @param { boolean } [param1.noWordTransform]
   * Ignore word transformers if there are any.
   * Don't encode characters as well.
   * (Use this for things like URL addresses).
   */
  addInline (str, { noWordTransform = false } = {}) {
    if (!(
      this._stackItem instanceof BlockStackItem
      || this._stackItem instanceof ListItemStackItem
      || this._stackItem instanceof TableCellStackItem
    )) { return; }

    if (this._stackItem.isPre) {
      this._stackItem.rawText += str;
      return;
    }

    if (
      str.length === 0 || // empty string
      (
        this._stackItem.stashedLineBreaks && // stashed linebreaks make whitespace irrelevant
        !this.whitespaceProcessor.testContainsWords(str) // no words to add
      )
    ) { return; }

    if (this.options.preserveNewlines) {
      const newlinesNumber = this.whitespaceProcessor.countNewlinesNoWords(str);
      if (newlinesNumber > 0) {
        this._stackItem.inlineTextBuilder.startNewLine(newlinesNumber);
        // keep stashedLineBreaks unchanged
        return;
      }
    }

    if (this._stackItem.stashedLineBreaks) {
      this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
    }
    this.whitespaceProcessor.shrinkWrapAdd(
      str,
      this._stackItem.inlineTextBuilder,
      (noWordTransform) ? undefined : this._getCombinedWordTransformer(),
      this._stackItem.isNoWrap
    );
    this._stackItem.stashedLineBreaks = 0; // inline text doesn't introduce line breaks
  }

  /**
   * Add a string inline into the currently built block.
   *
   * Use this for markup elements that don't have to adhere
   * to text layout rules.
   *
   * @param { string } str Text to add.
   */
  addLiteral (str) {
    if (!(
      this._stackItem instanceof BlockStackItem
      || this._stackItem instanceof ListItemStackItem
      || this._stackItem instanceof TableCellStackItem
    )) { return; }

    if (str.length === 0) { return; }

    if (this._stackItem.isPre) {
      this._stackItem.rawText += str;
      return;
    }

    if (this._stackItem.stashedLineBreaks) {
      this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
    }
    this.whitespaceProcessor.addLiteral(
      str,
      this._stackItem.inlineTextBuilder,
      this._stackItem.isNoWrap
    );
    this._stackItem.stashedLineBreaks = 0;
  }

  /**
   * Start building a new block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any preceding block.
   *
   * @param { number }  [param0.reservedLineLength]
   * Reserve this number of characters on each line for block markup.
   *
   * @param { boolean } [param0.isPre]
   * Should HTML whitespace be preserved inside this block.
   */
  openBlock ({ leadingLineBreaks = 1, reservedLineLength = 0, isPre = false } = {}) {
    const maxLineLength = Math.max(20, this._stackItem.inlineTextBuilder.maxLineLength - reservedLineLength);
    this._stackItem = new BlockStackItem(
      this.options,
      this._stackItem,
      leadingLineBreaks,
      maxLineLength
    );
    if (isPre) { this._stackItem.isPre = true; }
  }

  /**
   * Finalize currently built block, add it's content to the parent block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any following block.
   *
   * @param { (str: string) => string } [param0.blockTransform]
   * A function to transform the block text before adding to the parent block.
   * This happens after word wrap and should be used in combination with reserved line length
   * in order to keep line lengths correct.
   * Used for whole block markup.
   */
  closeBlock ({ trailingLineBreaks = 1, blockTransform = undefined } = {}) {
    const block = this._popStackItem();
    const blockText = (blockTransform) ? blockTransform(getText(block)) : getText(block);
    addText(this._stackItem, blockText, block.leadingLineBreaks, Math.max(block.stashedLineBreaks, trailingLineBreaks));
  }

  /**
   * Start building a new list.
   *
   * @param { object } [param0]
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.maxPrefixLength]
   * Length of the longest list item prefix.
   * If not supplied or too small then list items won't be aligned properly.
   *
   * @param { 'left' | 'right' } [param0.prefixAlign]
   * Specify how prefixes of different lengths have to be aligned
   * within a column.
   *
   * @param { number } [param0.interRowLineBreaks]
   * Minimum number of line breaks between list items.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any preceding block.
   */
  openList ({ maxPrefixLength = 0, prefixAlign = 'left', interRowLineBreaks = 1, leadingLineBreaks = 2 } = {}) {
    this._stackItem = new ListStackItem(this.options, this._stackItem, {
      interRowLineBreaks: interRowLineBreaks,
      leadingLineBreaks: leadingLineBreaks,
      maxLineLength: this._stackItem.inlineTextBuilder.maxLineLength,
      maxPrefixLength: maxPrefixLength,
      prefixAlign: prefixAlign
    });
  }

  /**
   * Start building a new list item.
   *
   * @param {object} param0
   * Object holding the parameters of the list item.
   *
   * @param { string } [param0.prefix]
   * Prefix for this list item (item number, bullet point, etc).
   */
  openListItem ({ prefix = '' } = {}) {
    if (!(this._stackItem instanceof ListStackItem)) {
      throw new Error('Can\'t add a list item to something that is not a list! Check the formatter.');
    }
    const list = this._stackItem;
    const prefixLength = Math.max(prefix.length, list.maxPrefixLength);
    const maxLineLength = Math.max(20, list.inlineTextBuilder.maxLineLength - prefixLength);
    this._stackItem = new ListItemStackItem(this.options, list, {
      prefix: prefix,
      maxLineLength: maxLineLength,
      leadingLineBreaks: list.interRowLineBreaks
    });
  }

  /**
   * Finalize currently built list item, add it's content to the parent list.
   */
  closeListItem () {
    const listItem = this._popStackItem();
    const list = listItem.next;

    const prefixLength = Math.max(listItem.prefix.length, list.maxPrefixLength);
    const spacing = '\n' + ' '.repeat(prefixLength);
    const prefix = (list.prefixAlign === 'right')
      ? listItem.prefix.padStart(prefixLength)
      : listItem.prefix.padEnd(prefixLength);
    const text = prefix + getText(listItem).replace(/\n/g, spacing);

    addText(
      list,
      text,
      listItem.leadingLineBreaks,
      Math.max(listItem.stashedLineBreaks, list.interRowLineBreaks)
    );
  }

  /**
   * Finalize currently built list, add it's content to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any following block.
   */
  closeList ({ trailingLineBreaks = 2 } = {}) {
    const list = this._popStackItem();
    const text = getText(list);
    if (text) {
      addText(this._stackItem, text, list.leadingLineBreaks, trailingLineBreaks);
    }
  }

  /**
   * Start building a table.
   */
  openTable () {
    this._stackItem = new TableStackItem(this._stackItem);
  }

  /**
   * Start building a table row.
   */
  openTableRow () {
    if (!(this._stackItem instanceof TableStackItem)) {
      throw new Error('Can\'t add a table row to something that is not a table! Check the formatter.');
    }
    this._stackItem = new TableRowStackItem(this._stackItem);
  }

  /**
   * Start building a table cell.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.maxColumnWidth]
   * Wrap cell content to this width. Fall back to global wordwrap value if undefined.
   */
  openTableCell ({ maxColumnWidth = undefined } = {}) {
    if (!(this._stackItem instanceof TableRowStackItem)) {
      throw new Error('Can\'t add a table cell to something that is not a table row! Check the formatter.');
    }
    this._stackItem = new TableCellStackItem(this.options, this._stackItem, maxColumnWidth);
  }

  /**
   * Finalize currently built table cell and add it to parent table row's cells.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.colspan] How many columns this cell should occupy.
   * @param { number } [param0.rowspan] How many rows this cell should occupy.
   */
  closeTableCell ({ colspan = 1, rowspan = 1 } = {}) {
    const cell = this._popStackItem();
    const text = trimCharacter(getText(cell), '\n');
    cell.next.cells.push({ colspan: colspan, rowspan: rowspan, text: text });
  }

  /**
   * Finalize currently built table row and add it to parent table's rows.
   */
  closeTableRow () {
    const row = this._popStackItem();
    row.next.rows.push(row.cells);
  }

  /**
   * Finalize currently built table and add the rendered text to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the table.
   *
   * @param { TablePrinter } param0.tableToString
   * A function to convert a table of stringified cells into a complete table.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This table should have at least this number of line breaks to separate if from any preceding block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This table should have at least this number of line breaks to separate it from any following block.
   */
  closeTable ({ tableToString, leadingLineBreaks = 2, trailingLineBreaks = 2 }) {
    const table = this._popStackItem();
    const output = tableToString(table.rows);
    if (output) {
      addText(this._stackItem, output, leadingLineBreaks, trailingLineBreaks);
    }
  }

  /**
   * Return the rendered text content of this builder.
   *
   * @returns { string }
   */
  toString () {
    return getText(this._stackItem.getRoot());
    // There should only be the root item if everything is closed properly.
  }

}

function getText (stackItem) {
  if (!(
    stackItem instanceof BlockStackItem
    || stackItem instanceof ListItemStackItem
    || stackItem instanceof TableCellStackItem
  )) {
    throw new Error('Only blocks, list items and table cells can be requested for text contents.');
  }
  return (stackItem.inlineTextBuilder.isEmpty())
    ? stackItem.rawText
    : stackItem.rawText + stackItem.inlineTextBuilder.toString();
}

function addText (stackItem, text, leadingLineBreaks, trailingLineBreaks) {
  if (!(
    stackItem instanceof BlockStackItem
    || stackItem instanceof ListItemStackItem
    || stackItem instanceof TableCellStackItem
  )) {
    throw new Error('Only blocks, list items and table cells can contain text.');
  }
  const parentText = getText(stackItem);
  const lineBreaks = Math.max(stackItem.stashedLineBreaks, leadingLineBreaks);
  stackItem.inlineTextBuilder.clear();
  if (parentText) {
    stackItem.rawText = parentText + '\n'.repeat(lineBreaks) + text;
  } else {
    stackItem.rawText = text;
    stackItem.leadingLineBreaks = lineBreaks;
  }
  stackItem.stashedLineBreaks = trailingLineBreaks;
}

/**
 * @param { string } str A string to transform.
 * @param { TransformerStackItem } transformer A transformer item (with possible continuation).
 * @returns { string }
 */
function applyTransformer (str, transformer) {
  return ((transformer) ? applyTransformer(transformer.transform(str), transformer.next) : str);
}

/**
 * Compile selectors into a decision tree,
 * return a function intended for batch processing.
 *
 * @param   { Options } [options = {}]   HtmlToText options (defaults, formatters, user options merged, deduplicated).
 * @returns { (html: string, metadata?: any) => string } Pre-configured converter function.
 * @static
 */
function compile$1 (options = {}) {
  const selectorsWithoutFormat = options.selectors.filter(s => !s.format);
  if (selectorsWithoutFormat.length) {
    throw new Error(
      'Following selectors have no specified format: ' +
      selectorsWithoutFormat.map(s => `\`${s.selector}\``).join(', ')
    );
  }
  const picker = new DecisionTree(
    options.selectors.map(s => [s.selector, s])
  ).build(hp2Builder);

  if (typeof options.encodeCharacters !== 'function') {
    options.encodeCharacters = makeReplacerFromDict(options.encodeCharacters);
  }

  const baseSelectorsPicker = new DecisionTree(
    options.baseElements.selectors.map((s, i) => [s, i + 1])
  ).build(hp2Builder);
  function findBaseElements (dom) {
    return findBases(dom, options, baseSelectorsPicker);
  }

  const limitedWalk = limitedDepthRecursive(
    options.limits.maxDepth,
    recursiveWalk,
    function (dom, builder) {
      builder.addInline(options.limits.ellipsis || '');
    }
  );

  return function (html, metadata = undefined) {
    return process$1(html, metadata, options, picker, findBaseElements, limitedWalk);
  };
}


/**
 * Convert given HTML according to preprocessed options.
 *
 * @param { string } html HTML content to convert.
 * @param { any } metadata Optional metadata for HTML document, for use in formatters.
 * @param { Options } options HtmlToText options (preprocessed).
 * @param { import('selderee').Picker<DomNode, TagDefinition> } picker
 * Tag definition picker for DOM nodes processing.
 * @param { (dom: DomNode[]) => DomNode[] } findBaseElements
 * Function to extract elements from HTML DOM
 * that will only be present in the output text.
 * @param { RecursiveCallback } walk Recursive callback.
 * @returns { string }
 */
function process$1 (html, metadata, options, picker, findBaseElements, walk) {
  const maxInputLength = options.limits.maxInputLength;
  if (maxInputLength && html && html.length > maxInputLength) {
    console.warn(
      `Input length ${html.length} is above allowed limit of ${maxInputLength}. Truncating without ellipsis.`
    );
    html = html.substring(0, maxInputLength);
  }

  const document = parseDocument(html, { decodeEntities: options.decodeEntities });
  const bases = findBaseElements(document.children);
  const builder = new BlockTextBuilder(options, picker, metadata);
  walk(bases, builder);
  return builder.toString();
}


function findBases (dom, options, baseSelectorsPicker) {
  const results = [];

  function recursiveWalk (walk, /** @type { DomNode[] } */ dom) {
    dom = dom.slice(0, options.limits.maxChildNodes);
    for (const elem of dom) {
      if (elem.type !== 'tag') {
        continue;
      }
      const pickedSelectorIndex = baseSelectorsPicker.pick1(elem);
      if (pickedSelectorIndex > 0) {
        results.push({ selectorIndex: pickedSelectorIndex, element: elem });
      } else if (elem.children) {
        walk(elem.children);
      }
      if (results.length >= options.limits.maxBaseElements) {
        return;
      }
    }
  }

  const limitedWalk = limitedDepthRecursive(
    options.limits.maxDepth,
    recursiveWalk
  );
  limitedWalk(dom);

  if (options.baseElements.orderBy !== 'occurrence') { // 'selectors'
    results.sort((a, b) => a.selectorIndex - b.selectorIndex);
  }
  return (options.baseElements.returnDomByDefault && results.length === 0)
    ? dom
    : results.map(x => x.element);
}

/**
 * Function to walk through DOM nodes and accumulate their string representations.
 *
 * @param   { RecursiveCallback } walk    Recursive callback.
 * @param   { DomNode[] }         [dom]   Nodes array to process.
 * @param   { BlockTextBuilder }  builder Passed around to accumulate output text.
 * @private
 */
function recursiveWalk (walk, dom, builder) {
  if (!dom) { return; }

  const options = builder.options;

  const tooManyChildNodes = dom.length > options.limits.maxChildNodes;
  if (tooManyChildNodes) {
    dom = dom.slice(0, options.limits.maxChildNodes);
    dom.push({
      data: options.limits.ellipsis,
      type: 'text'
    });
  }

  for (const elem of dom) {
    switch (elem.type) {
      case 'text': {
        builder.addInline(elem.data);
        break;
      }
      case 'tag': {
        const tagDefinition = builder.picker.pick1(elem);
        const format = options.formatters[tagDefinition.format];
        format(elem, walk, builder, tagDefinition.options || {});
        break;
      }
    }
  }

  return;
}

/**
 * @param { Object<string,string | false> } dict
 * A dictionary where keys are characters to replace
 * and values are replacement strings.
 *
 * First code point from dict keys is used.
 * Compound emojis with ZWJ are not supported (not until Node 16).
 *
 * @returns { ((str: string) => string) | undefined }
 */
function makeReplacerFromDict (dict) {
  if (!dict || Object.keys(dict).length === 0) {
    return undefined;
  }
  /** @type { [string, string][] } */
  const entries = Object.entries(dict).filter(([, v]) => v !== false);
  const regex = new RegExp(
    entries
      .map(([c]) => `(${unicodeEscape([...c][0])})`)
      .join('|'),
    'g'
  );
  const values = entries.map(([, v]) => v);
  const replacer = (m, ...cgs) => values[cgs.findIndex(cg => cg)];
  return (str) => str.replace(regex, replacer);
}

/**
 * Dummy formatter that discards the input and does nothing.
 *
 * @type { FormatCallback }
 */
function formatSkip (elem, walk, builder, formatOptions) {
  /* do nothing */
}

/**
 * Insert the given string literal inline instead of a tag.
 *
 * @type { FormatCallback }
 */
function formatInlineString (elem, walk, builder, formatOptions) {
  builder.addLiteral(formatOptions.string || '');
}

/**
 * Insert a block with the given string literal instead of a tag.
 *
 * @type { FormatCallback }
 */
function formatBlockString (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.addLiteral(formatOptions.string || '');
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process an inline-level element.
 *
 * @type { FormatCallback }
 */
function formatInline (elem, walk, builder, formatOptions) {
  walk(elem.children, builder);
}

/**
 * Process a block-level container.
 *
 * @type { FormatCallback }
 */
function formatBlock$1 (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

function renderOpenTag (elem) {
  const attrs = (elem.attribs && elem.attribs.length)
    ? ' ' + Object.entries(elem.attribs)
      .map(([k, v]) => ((v === '') ? k : `${k}=${v.replace(/"/g, '&quot;')}`))
      .join(' ')
    : '';
  return `<${elem.name}${attrs}>`;
}

function renderCloseTag (elem) {
  return `</${elem.name}>`;
}

/**
 * Render an element as inline HTML tag, walk through it's children.
 *
 * @type { FormatCallback }
 */
function formatInlineTag (elem, walk, builder, formatOptions) {
  builder.startNoWrap();
  builder.addLiteral(renderOpenTag(elem));
  builder.stopNoWrap();
  walk(elem.children, builder);
  builder.startNoWrap();
  builder.addLiteral(renderCloseTag(elem));
  builder.stopNoWrap();
}

/**
 * Render an element as HTML block bag, walk through it's children.
 *
 * @type { FormatCallback }
 */
function formatBlockTag (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.startNoWrap();
  builder.addLiteral(renderOpenTag(elem));
  builder.stopNoWrap();
  walk(elem.children, builder);
  builder.startNoWrap();
  builder.addLiteral(renderCloseTag(elem));
  builder.stopNoWrap();
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Render an element with all it's children as inline HTML.
 *
 * @type { FormatCallback }
 */
function formatInlineHtml (elem, walk, builder, formatOptions) {
  builder.startNoWrap();
  builder.addLiteral(
    render$1(elem, { decodeEntities: builder.options.decodeEntities })
  );
  builder.stopNoWrap();
}

/**
 * Render an element with all it's children as HTML block.
 *
 * @type { FormatCallback }
 */
function formatBlockHtml (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.startNoWrap();
  builder.addLiteral(
    render$1(elem, { decodeEntities: builder.options.decodeEntities })
  );
  builder.stopNoWrap();
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Render inline element wrapped with given strings.
 *
 * @type { FormatCallback }
 */
function formatInlineSurround (elem, walk, builder, formatOptions) {
  builder.addLiteral(formatOptions.prefix || '');
  walk(elem.children, builder);
  builder.addLiteral(formatOptions.suffix || '');
}

var genericFormatters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  block: formatBlock$1,
  blockHtml: formatBlockHtml,
  blockString: formatBlockString,
  blockTag: formatBlockTag,
  inline: formatInline,
  inlineHtml: formatInlineHtml,
  inlineString: formatInlineString,
  inlineSurround: formatInlineSurround,
  inlineTag: formatInlineTag,
  skip: formatSkip
});

function getRow (matrix, j) {
  if (!matrix[j]) { matrix[j] = []; }
  return matrix[j];
}

function findFirstVacantIndex (row, x = 0) {
  while (row[x]) { x++; }
  return x;
}

function transposeInPlace (matrix, maxSize) {
  for (let i = 0; i < maxSize; i++) {
    const rowI = getRow(matrix, i);
    for (let j = 0; j < i; j++) {
      const rowJ = getRow(matrix, j);
      if (rowI[j] || rowJ[i]) {
        const temp = rowI[j];
        rowI[j] = rowJ[i];
        rowJ[i] = temp;
      }
    }
  }
}

function putCellIntoLayout (cell, layout, baseRow, baseCol) {
  for (let r = 0; r < cell.rowspan; r++) {
    const layoutRow = getRow(layout, baseRow + r);
    for (let c = 0; c < cell.colspan; c++) {
      layoutRow[baseCol + c] = cell;
    }
  }
}

function getOrInitOffset (offsets, index) {
  if (offsets[index] === undefined) {
    offsets[index] = (index === 0) ? 0 : 1 + getOrInitOffset(offsets, index - 1);
  }
  return offsets[index];
}

function updateOffset (offsets, base, span, value) {
  offsets[base + span] = Math.max(
    getOrInitOffset(offsets, base + span),
    getOrInitOffset(offsets, base) + value
  );
}

/**
 * Render a table into a string.
 * Cells can contain multiline text and span across multiple rows and columns.
 *
 * Modifies cells to add lines array.
 *
 * @param { TablePrinterCell[][] } tableRows Table to render.
 * @param { number } rowSpacing Number of spaces between columns.
 * @param { number } colSpacing Number of empty lines between rows.
 * @returns { string }
 */
function tableToString (tableRows, rowSpacing, colSpacing) {
  const layout = [];
  let colNumber = 0;
  const rowNumber = tableRows.length;
  const rowOffsets = [0];
  // Fill the layout table and row offsets row-by-row.
  for (let j = 0; j < rowNumber; j++) {
    const layoutRow = getRow(layout, j);
    const cells = tableRows[j];
    let x = 0;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      x = findFirstVacantIndex(layoutRow, x);
      putCellIntoLayout(cell, layout, j, x);
      x += cell.colspan;
      cell.lines = cell.text.split('\n');
      const cellHeight = cell.lines.length;
      updateOffset(rowOffsets, j, cell.rowspan, cellHeight + rowSpacing);
    }
    colNumber = (layoutRow.length > colNumber) ? layoutRow.length : colNumber;
  }

  transposeInPlace(layout, (rowNumber > colNumber) ? rowNumber : colNumber);

  const outputLines = [];
  const colOffsets = [0];
  // Fill column offsets and output lines column-by-column.
  for (let x = 0; x < colNumber; x++) {
    let y = 0;
    let cell;
    const rowsInThisColumn = Math.min(rowNumber, layout[x].length);
    while (y < rowsInThisColumn) {
      cell = layout[x][y];
      if (cell) {
        if (!cell.rendered) {
          let cellWidth = 0;
          for (let j = 0; j < cell.lines.length; j++) {
            const line = cell.lines[j];
            const lineOffset = rowOffsets[y] + j;
            outputLines[lineOffset] = (outputLines[lineOffset] || '').padEnd(colOffsets[x]) + line;
            cellWidth = (line.length > cellWidth) ? line.length : cellWidth;
          }
          updateOffset(colOffsets, x, cell.colspan, cellWidth + colSpacing);
          cell.rendered = true;
        }
        y += cell.rowspan;
      } else {
        const lineOffset = rowOffsets[y];
        outputLines[lineOffset] = (outputLines[lineOffset] || '');
        y++;
      }
    }
  }

  return outputLines.join('\n');
}

/**
 * Process a line-break.
 *
 * @type { FormatCallback }
 */
function formatLineBreak (elem, walk, builder, formatOptions) {
  builder.addLineBreak();
}

/**
 * Process a `wbr` tag (word break opportunity).
 *
 * @type { FormatCallback }
 */
function formatWbr (elem, walk, builder, formatOptions) {
  builder.addWordBreakOpportunity();
}

/**
 * Process a horizontal line.
 *
 * @type { FormatCallback }
 */
function formatHorizontalLine (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.addInline('-'.repeat(formatOptions.length || builder.options.wordwrap || 40));
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process a paragraph.
 *
 * @type { FormatCallback }
 */
function formatParagraph (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process a preformatted content.
 *
 * @type { FormatCallback }
 */
function formatPre (elem, walk, builder, formatOptions) {
  builder.openBlock({
    isPre: true,
    leadingLineBreaks: formatOptions.leadingLineBreaks || 2
  });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process a heading.
 *
 * @type { FormatCallback }
 */
function formatHeading (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  if (formatOptions.uppercase !== false) {
    builder.pushWordTransform(str => str.toUpperCase());
    walk(elem.children, builder);
    builder.popWordTransform();
  } else {
    walk(elem.children, builder);
  }
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process a blockquote.
 *
 * @type { FormatCallback }
 */
function formatBlockquote (elem, walk, builder, formatOptions) {
  builder.openBlock({
    leadingLineBreaks: formatOptions.leadingLineBreaks || 2,
    reservedLineLength: 2
  });
  walk(elem.children, builder);
  builder.closeBlock({
    trailingLineBreaks: formatOptions.trailingLineBreaks || 2,
    blockTransform: str => ((formatOptions.trimEmptyLines !== false) ? trimCharacter(str, '\n') : str)
      .split('\n')
      .map(line => '> ' + line)
      .join('\n')
  });
}

function withBrackets (str, brackets) {
  if (!brackets) { return str; }

  const lbr = (typeof brackets[0] === 'string')
    ? brackets[0]
    : '[';
  const rbr = (typeof brackets[1] === 'string')
    ? brackets[1]
    : ']';
  return lbr + str + rbr;
}

function pathRewrite (path, rewriter, baseUrl, metadata, elem) {
  const modifiedPath = (typeof rewriter === 'function')
    ? rewriter(path, metadata, elem)
    : path;
  return (modifiedPath[0] === '/' && baseUrl)
    ? trimCharacterEnd(baseUrl, '/') + modifiedPath
    : modifiedPath;
}

/**
 * Process an image.
 *
 * @type { FormatCallback }
 */
function formatImage (elem, walk, builder, formatOptions) {
  const attribs = elem.attribs || {};
  const alt = (attribs.alt)
    ? attribs.alt
    : '';
  const src = (!attribs.src)
    ? ''
    : pathRewrite(attribs.src, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
  const text = (!src)
    ? alt
    : (!alt)
      ? withBrackets(src, formatOptions.linkBrackets)
      : alt + ' ' + withBrackets(src, formatOptions.linkBrackets);

  builder.addInline(text, { noWordTransform: true });
}

// a img baseUrl
// a img pathRewrite
// a img linkBrackets

// a     ignoreHref: false
//            ignoreText ?
// a     noAnchorUrl: true
//            can be replaced with selector
// a     hideLinkHrefIfSameAsText: false
//            how to compare, what to show (text, href, normalized) ?
// a     mailto protocol removed without options

// a     protocols: mailto, tel, ...
//            can be matched with selector?

// anchors, protocols - only if no pathRewrite fn is provided

// normalize-url ?

// a
// a[href^="#"] - format:skip by default
// a[href^="mailto:"] - ?

/**
 * Process an anchor.
 *
 * @type { FormatCallback }
 */
function formatAnchor (elem, walk, builder, formatOptions) {
  function getHref () {
    if (formatOptions.ignoreHref) { return ''; }
    if (!elem.attribs || !elem.attribs.href) { return ''; }
    let href = elem.attribs.href.replace(/^mailto:/, '');
    if (formatOptions.noAnchorUrl && href[0] === '#') { return ''; }
    href = pathRewrite(href, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
    return href;
  }
  const href = getHref();
  if (!href) {
    walk(elem.children, builder);
  } else {
    let text = '';
    builder.pushWordTransform(
      str => {
        if (str) { text += str; }
        return str;
      }
    );
    walk(elem.children, builder);
    builder.popWordTransform();

    const hideSameLink = formatOptions.hideLinkHrefIfSameAsText && href === text;
    if (!hideSameLink) {
      builder.addInline(
        (!text)
          ? href
          : ' ' + withBrackets(href, formatOptions.linkBrackets),
        { noWordTransform: true }
      );
    }
  }
}

/**
 * @param { DomNode }           elem               List items with their prefixes.
 * @param { RecursiveCallback } walk               Recursive callback to process child nodes.
 * @param { BlockTextBuilder }  builder            Passed around to accumulate output text.
 * @param { FormatOptions }     formatOptions      Options specific to a formatter.
 * @param { () => string }      nextPrefixCallback Function that returns increasing index each time it is called.
 */
function formatList (elem, walk, builder, formatOptions, nextPrefixCallback) {
  const isNestedList = get(elem, ['parent', 'name']) === 'li';

  // With Roman numbers, index length is not as straightforward as with Arabic numbers or letters,
  // so the dumb length comparison is the most robust way to get the correct value.
  let maxPrefixLength = 0;
  const listItems = (elem.children || [])
    // it might be more accurate to check only for html spaces here, but no significant benefit
    .filter(child => child.type !== 'text' || !/^\s*$/.test(child.data))
    .map(function (child) {
      if (child.name !== 'li') {
        return { node: child, prefix: '' };
      }
      const prefix = (isNestedList)
        ? nextPrefixCallback().trimStart()
        : nextPrefixCallback();
      if (prefix.length > maxPrefixLength) { maxPrefixLength = prefix.length; }
      return { node: child, prefix: prefix };
    });
  if (!listItems.length) { return; }

  builder.openList({
    interRowLineBreaks: 1,
    leadingLineBreaks: isNestedList ? 1 : (formatOptions.leadingLineBreaks || 2),
    maxPrefixLength: maxPrefixLength,
    prefixAlign: 'left'
  });

  for (const { node, prefix } of listItems) {
    builder.openListItem({ prefix: prefix });
    walk([node], builder);
    builder.closeListItem();
  }

  builder.closeList({ trailingLineBreaks: isNestedList ? 1 : (formatOptions.trailingLineBreaks || 2) });
}

/**
 * Process an unordered list.
 *
 * @type { FormatCallback }
 */
function formatUnorderedList (elem, walk, builder, formatOptions) {
  const prefix = formatOptions.itemPrefix || ' * ';
  return formatList(elem, walk, builder, formatOptions, () => prefix);
}

/**
 * Process an ordered list.
 *
 * @type { FormatCallback }
 */
function formatOrderedList (elem, walk, builder, formatOptions) {
  let nextIndex = Number(elem.attribs.start || '1');
  const indexFunction = getOrderedListIndexFunction(elem.attribs.type);
  const nextPrefixCallback = () => ' ' + indexFunction(nextIndex++) + '. ';
  return formatList(elem, walk, builder, formatOptions, nextPrefixCallback);
}

/**
 * Return a function that can be used to generate index markers of a specified format.
 *
 * @param   { string } [olType='1'] Marker type.
 * @returns { (i: number) => string }
 */
function getOrderedListIndexFunction (olType = '1') {
  switch (olType) {
    case 'a': return (i) => numberToLetterSequence(i, 'a');
    case 'A': return (i) => numberToLetterSequence(i, 'A');
    case 'i': return (i) => numberToRoman(i).toLowerCase();
    case 'I': return (i) => numberToRoman(i);
    case '1':
    default: return (i) => (i).toString();
  }
}

/**
 * Given a list of class and ID selectors (prefixed with '.' and '#'),
 * return them as separate lists of names without prefixes.
 *
 * @param { string[] } selectors Class and ID selectors (`[".class", "#id"]` etc).
 * @returns { { classes: string[], ids: string[] } }
 */
function splitClassesAndIds (selectors) {
  const classes = [];
  const ids = [];
  for (const selector of selectors) {
    if (selector.startsWith('.')) {
      classes.push(selector.substring(1));
    } else if (selector.startsWith('#')) {
      ids.push(selector.substring(1));
    }
  }
  return { classes: classes, ids: ids };
}

function isDataTable (attr, tables) {
  if (tables === true) { return true; }
  if (!attr) { return false; }

  const { classes, ids } = splitClassesAndIds(tables);
  const attrClasses = (attr['class'] || '').split(' ');
  const attrIds = (attr['id'] || '').split(' ');

  return attrClasses.some(x => classes.includes(x)) || attrIds.some(x => ids.includes(x));
}

/**
 * Process a table (either as a container or as a data table, depending on options).
 *
 * @type { FormatCallback }
 */
function formatTable (elem, walk, builder, formatOptions) {
  return isDataTable(elem.attribs, builder.options.tables)
    ? formatDataTable(elem, walk, builder, formatOptions)
    : formatBlock(elem, walk, builder, formatOptions);
}

function formatBlock (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks });
}

/**
 * Process a data table.
 *
 * @type { FormatCallback }
 */
function formatDataTable (elem, walk, builder, formatOptions) {
  builder.openTable();
  elem.children.forEach(walkTable);
  builder.closeTable({
    tableToString: (rows) => tableToString(rows, formatOptions.rowSpacing ?? 0, formatOptions.colSpacing ?? 3),
    leadingLineBreaks: formatOptions.leadingLineBreaks,
    trailingLineBreaks: formatOptions.trailingLineBreaks
  });

  function formatCell (cellNode) {
    const colspan = +get(cellNode, ['attribs', 'colspan']) || 1;
    const rowspan = +get(cellNode, ['attribs', 'rowspan']) || 1;
    builder.openTableCell({ maxColumnWidth: formatOptions.maxColumnWidth });
    walk(cellNode.children, builder);
    builder.closeTableCell({ colspan: colspan, rowspan: rowspan });
  }

  function walkTable (elem) {
    if (elem.type !== 'tag') { return; }

    const formatHeaderCell = (formatOptions.uppercaseHeaderCells !== false)
      ? (cellNode) => {
        builder.pushWordTransform(str => str.toUpperCase());
        formatCell(cellNode);
        builder.popWordTransform();
      }
      : formatCell;

    switch (elem.name) {
      case 'thead':
      case 'tbody':
      case 'tfoot':
      case 'center':
        elem.children.forEach(walkTable);
        return;

      case 'tr': {
        builder.openTableRow();
        for (const childOfTr of elem.children) {
          if (childOfTr.type !== 'tag') { continue; }
          switch (childOfTr.name) {
            case 'th': {
              formatHeaderCell(childOfTr);
              break;
            }
            case 'td': {
              formatCell(childOfTr);
              break;
            }
              // do nothing
          }
        }
        builder.closeTableRow();
        break;
      }
        // do nothing
    }
  }
}

var textFormatters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  anchor: formatAnchor,
  blockquote: formatBlockquote,
  dataTable: formatDataTable,
  heading: formatHeading,
  horizontalLine: formatHorizontalLine,
  image: formatImage,
  lineBreak: formatLineBreak,
  orderedList: formatOrderedList,
  paragraph: formatParagraph,
  pre: formatPre,
  table: formatTable,
  unorderedList: formatUnorderedList,
  wbr: formatWbr
});

/**
 * Default options.
 *
 * @constant
 * @type { Options }
 * @default
 * @private
 */
const DEFAULT_OPTIONS = {
  baseElements: {
    selectors: [ 'body' ],
    orderBy: 'selectors', // 'selectors' | 'occurrence'
    returnDomByDefault: true
  },
  decodeEntities: true,
  encodeCharacters: {},
  formatters: {},
  limits: {
    ellipsis: '...',
    maxBaseElements: undefined,
    maxChildNodes: undefined,
    maxDepth: undefined,
    maxInputLength: (1 << 24) // 16_777_216
  },
  longWordSplit: {
    forceWrapOnLimit: false,
    wrapCharacters: []
  },
  preserveNewlines: false,
  selectors: [
    { selector: '*', format: 'inline' },
    {
      selector: 'a',
      format: 'anchor',
      options: {
        baseUrl: null,
        hideLinkHrefIfSameAsText: false,
        ignoreHref: false,
        linkBrackets: ['[', ']'],
        noAnchorUrl: true
      }
    },
    { selector: 'article', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'aside', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: 'blockquote',
      format: 'blockquote',
      options: { leadingLineBreaks: 2, trailingLineBreaks: 2, trimEmptyLines: true }
    },
    { selector: 'br', format: 'lineBreak' },
    { selector: 'div', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'footer', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'form', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'h1', format: 'heading', options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h2', format: 'heading', options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h3', format: 'heading', options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h4', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h5', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h6', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'header', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: 'hr',
      format: 'horizontalLine',
      options: { leadingLineBreaks: 2, length: undefined, trailingLineBreaks: 2 }
    },
    {
      selector: 'img',
      format: 'image',
      options: { baseUrl: null, linkBrackets: ['[', ']'] }
    },
    { selector: 'main', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'nav', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: 'ol',
      format: 'orderedList',
      options: { leadingLineBreaks: 2, trailingLineBreaks: 2 }
    },
    { selector: 'p', format: 'paragraph', options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
    { selector: 'pre', format: 'pre', options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
    { selector: 'section', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: 'table',
      format: 'table',
      options: {
        colSpacing: 3,
        leadingLineBreaks: 2,
        maxColumnWidth: 60,
        rowSpacing: 0,
        trailingLineBreaks: 2,
        uppercaseHeaderCells: true
      }
    },
    {
      selector: 'ul',
      format: 'unorderedList',
      options: { itemPrefix: ' * ', leadingLineBreaks: 2, trailingLineBreaks: 2 }
    },
    { selector: 'wbr', format: 'wbr' },
  ],
  tables: [], // deprecated
  whitespaceCharacters: ' \t\r\n\f\u200b',
  wordwrap: 80
};

const concatMerge = (acc, src, options) => [...acc, ...src];
const overwriteMerge = (acc, src, options) => [...src];
const selectorsMerge = (acc, src, options) => (
  (acc.some(s => typeof s === 'object'))
    ? concatMerge(acc, src) // selectors
    : overwriteMerge(acc, src) // baseElements.selectors
);

/**
 * Preprocess options, compile selectors into a decision tree,
 * return a function intended for batch processing.
 *
 * @param   { Options } [options = {}]   HtmlToText options.
 * @returns { (html: string, metadata?: any) => string } Pre-configured converter function.
 * @static
 */
function compile (options = {}) {
  options = merge(
    DEFAULT_OPTIONS,
    options,
    {
      arrayMerge: overwriteMerge,
      customMerge: (key) => ((key === 'selectors') ? selectorsMerge : undefined)
    }
  );
  options.formatters = Object.assign({}, genericFormatters, textFormatters, options.formatters);
  options.selectors = mergeDuplicatesPreferLast(options.selectors, (s => s.selector));

  handleDeprecatedOptions(options);

  return compile$1(options);
}

/**
 * Convert given HTML content to plain text string.
 *
 * @param   { string }  html           HTML content to convert.
 * @param   { Options } [options = {}] HtmlToText options.
 * @param   { any }     [metadata]     Optional metadata for HTML document, for use in formatters.
 * @returns { string }                 Plain text string.
 * @static
 *
 * @example
 * const { convert } = require('html-to-text');
 * const text = convert('<h1>Hello World</h1>', {
 *   wordwrap: 130
 * });
 * console.log(text); // HELLO WORLD
 */
function convert (html, options = {}, metadata = undefined) {
  return compile(options)(html, metadata);
}

/**
 * Map previously existing and now deprecated options to the new options layout.
 * This is a subject for cleanup in major releases.
 *
 * @param { Options } options HtmlToText options.
 */
function handleDeprecatedOptions (options) {
  if (options.tags) {
    const tagDefinitions = Object.entries(options.tags).map(
      ([selector, definition]) => ({ ...definition, selector: selector || '*' })
    );
    options.selectors.push(...tagDefinitions);
    options.selectors = mergeDuplicatesPreferLast(options.selectors, (s => s.selector));
  }

  function set (obj, path, value) {
    const valueKey = path.pop();
    for (const key of path) {
      let nested = obj[key];
      if (!nested) {
        nested = {};
        obj[key] = nested;
      }
      obj = nested;
    }
    obj[valueKey] = value;
  }

  if (options['baseElement']) {
    const baseElement = options['baseElement'];
    set(
      options,
      ['baseElements', 'selectors'],
      (Array.isArray(baseElement) ? baseElement : [baseElement])
    );
  }
  if (options['returnDomByDefault'] !== undefined) {
    set(options, ['baseElements', 'returnDomByDefault'], options['returnDomByDefault']);
  }

  for (const definition of options.selectors) {
    if (definition.format === 'anchor' && get(definition, ['options', 'noLinkBrackets'])) {
      set(definition, ['options', 'linkBrackets'], false);
    }
  }
}

var react = {exports: {}};

var react_production = {};

/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_production;

function requireReact_production () {
	if (hasRequiredReact_production) return react_production;
	hasRequiredReact_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
	  REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	  REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	  REACT_MEMO_TYPE = Symbol.for("react.memo"),
	  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
	  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
	  maybeIterable =
	    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
	    maybeIterable["@@iterator"];
	  return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
	    isMounted: function () {
	      return false;
	    },
	    enqueueForceUpdate: function () {},
	    enqueueReplaceState: function () {},
	    enqueueSetState: function () {}
	  },
	  assign = Object.assign,
	  emptyObject = {};
	function Component(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function (partialState, callback) {
	  if (
	    "object" !== typeof partialState &&
	    "function" !== typeof partialState &&
	    null != partialState
	  )
	    throw Error(
	      "takes an object of state variables to update or a function which returns an object of state variables."
	    );
	  this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = true;
	var isArrayImpl = Array.isArray,
	  ReactSharedInternals = { H: null, A: null, T: null, S: null, V: null },
	  hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, self, source, owner, props) {
	  self = props.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== self ? self : null,
	    props: props
	  };
	}
	function cloneAndReplaceKey(oldElement, newKey) {
	  return ReactElement(
	    oldElement.type,
	    newKey,
	    void 0,
	    void 0,
	    void 0,
	    oldElement.props
	  );
	}
	function isValidElement(object) {
	  return (
	    "object" === typeof object &&
	    null !== object &&
	    object.$$typeof === REACT_ELEMENT_TYPE
	  );
	}
	function escape(key) {
	  var escaperLookup = { "=": "=0", ":": "=2" };
	  return (
	    "$" +
	    key.replace(/[=:]/g, function (match) {
	      return escaperLookup[match];
	    })
	  );
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
	  return "object" === typeof element && null !== element && null != element.key
	    ? escape("" + element.key)
	    : index.toString(36);
	}
	function noop$1() {}
	function resolveThenable(thenable) {
	  switch (thenable.status) {
	    case "fulfilled":
	      return thenable.value;
	    case "rejected":
	      throw thenable.reason;
	    default:
	      switch (
	        ("string" === typeof thenable.status
	          ? thenable.then(noop$1, noop$1)
	          : ((thenable.status = "pending"),
	            thenable.then(
	              function (fulfilledValue) {
	                "pending" === thenable.status &&
	                  ((thenable.status = "fulfilled"),
	                  (thenable.value = fulfilledValue));
	              },
	              function (error) {
	                "pending" === thenable.status &&
	                  ((thenable.status = "rejected"), (thenable.reason = error));
	              }
	            )),
	        thenable.status)
	      ) {
	        case "fulfilled":
	          return thenable.value;
	        case "rejected":
	          throw thenable.reason;
	      }
	  }
	  throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
	  var type = typeof children;
	  if ("undefined" === type || "boolean" === type) children = null;
	  var invokeCallback = false;
	  if (null === children) invokeCallback = true;
	  else
	    switch (type) {
	      case "bigint":
	      case "string":
	      case "number":
	        invokeCallback = true;
	        break;
	      case "object":
	        switch (children.$$typeof) {
	          case REACT_ELEMENT_TYPE:
	          case REACT_PORTAL_TYPE:
	            invokeCallback = true;
	            break;
	          case REACT_LAZY_TYPE:
	            return (
	              (invokeCallback = children._init),
	              mapIntoArray(
	                invokeCallback(children._payload),
	                array,
	                escapedPrefix,
	                nameSoFar,
	                callback
	              )
	            );
	        }
	    }
	  if (invokeCallback)
	    return (
	      (callback = callback(children)),
	      (invokeCallback =
	        "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar),
	      isArrayImpl(callback)
	        ? ((escapedPrefix = ""),
	          null != invokeCallback &&
	            (escapedPrefix =
	              invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
	          mapIntoArray(callback, array, escapedPrefix, "", function (c) {
	            return c;
	          }))
	        : null != callback &&
	          (isValidElement(callback) &&
	            (callback = cloneAndReplaceKey(
	              callback,
	              escapedPrefix +
	                (null == callback.key ||
	                (children && children.key === callback.key)
	                  ? ""
	                  : ("" + callback.key).replace(
	                      userProvidedKeyEscapeRegex,
	                      "$&/"
	                    ) + "/") +
	                invokeCallback
	            )),
	          array.push(callback)),
	      1
	    );
	  invokeCallback = 0;
	  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
	  if (isArrayImpl(children))
	    for (var i = 0; i < children.length; i++)
	      (nameSoFar = children[i]),
	        (type = nextNamePrefix + getElementKey(nameSoFar, i)),
	        (invokeCallback += mapIntoArray(
	          nameSoFar,
	          array,
	          escapedPrefix,
	          type,
	          callback
	        ));
	  else if (((i = getIteratorFn(children)), "function" === typeof i))
	    for (
	      children = i.call(children), i = 0;
	      !(nameSoFar = children.next()).done;

	    )
	      (nameSoFar = nameSoFar.value),
	        (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
	        (invokeCallback += mapIntoArray(
	          nameSoFar,
	          array,
	          escapedPrefix,
	          type,
	          callback
	        ));
	  else if ("object" === type) {
	    if ("function" === typeof children.then)
	      return mapIntoArray(
	        resolveThenable(children),
	        array,
	        escapedPrefix,
	        nameSoFar,
	        callback
	      );
	    array = String(children);
	    throw Error(
	      "Objects are not valid as a React child (found: " +
	        ("[object Object]" === array
	          ? "object with keys {" + Object.keys(children).join(", ") + "}"
	          : array) +
	        "). If you meant to render a collection of children, use an array instead."
	    );
	  }
	  return invokeCallback;
	}
	function mapChildren(children, func, context) {
	  if (null == children) return children;
	  var result = [],
	    count = 0;
	  mapIntoArray(children, result, "", "", function (child) {
	    return func.call(context, child, count++);
	  });
	  return result;
	}
	function lazyInitializer(payload) {
	  if (-1 === payload._status) {
	    var ctor = payload._result;
	    ctor = ctor();
	    ctor.then(
	      function (moduleObject) {
	        if (0 === payload._status || -1 === payload._status)
	          (payload._status = 1), (payload._result = moduleObject);
	      },
	      function (error) {
	        if (0 === payload._status || -1 === payload._status)
	          (payload._status = 2), (payload._result = error);
	      }
	    );
	    -1 === payload._status && ((payload._status = 0), (payload._result = ctor));
	  }
	  if (1 === payload._status) return payload._result.default;
	  throw payload._result;
	}
	var reportGlobalError =
	  "function" === typeof reportError
	    ? reportError
	    : function (error) {
	        if (
	          "object" === typeof window &&
	          "function" === typeof window.ErrorEvent
	        ) {
	          var event = new window.ErrorEvent("error", {
	            bubbles: true,
	            cancelable: true,
	            message:
	              "object" === typeof error &&
	              null !== error &&
	              "string" === typeof error.message
	                ? String(error.message)
	                : String(error),
	            error: error
	          });
	          if (!window.dispatchEvent(event)) return;
	        } else if (
	          "object" === typeof process &&
	          "function" === typeof process.emit
	        ) {
	          process.emit("uncaughtException", error);
	          return;
	        }
	        console.error(error);
	      };
	function noop() {}
	react_production.Children = {
	  map: mapChildren,
	  forEach: function (children, forEachFunc, forEachContext) {
	    mapChildren(
	      children,
	      function () {
	        forEachFunc.apply(this, arguments);
	      },
	      forEachContext
	    );
	  },
	  count: function (children) {
	    var n = 0;
	    mapChildren(children, function () {
	      n++;
	    });
	    return n;
	  },
	  toArray: function (children) {
	    return (
	      mapChildren(children, function (child) {
	        return child;
	      }) || []
	    );
	  },
	  only: function (children) {
	    if (!isValidElement(children))
	      throw Error(
	        "React.Children.only expected to receive a single React element child."
	      );
	    return children;
	  }
	};
	react_production.Component = Component;
	react_production.Fragment = REACT_FRAGMENT_TYPE;
	react_production.Profiler = REACT_PROFILER_TYPE;
	react_production.PureComponent = PureComponent;
	react_production.StrictMode = REACT_STRICT_MODE_TYPE;
	react_production.Suspense = REACT_SUSPENSE_TYPE;
	react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
	  ReactSharedInternals;
	react_production.__COMPILER_RUNTIME = {
	  __proto__: null,
	  c: function (size) {
	    return ReactSharedInternals.H.useMemoCache(size);
	  }
	};
	react_production.cache = function (fn) {
	  return function () {
	    return fn.apply(null, arguments);
	  };
	};
	react_production.cloneElement = function (element, config, children) {
	  if (null === element || void 0 === element)
	    throw Error(
	      "The argument must be a React element, but you passed " + element + "."
	    );
	  var props = assign({}, element.props),
	    key = element.key,
	    owner = void 0;
	  if (null != config)
	    for (propName in (void 0 !== config.ref && (owner = void 0),
	    void 0 !== config.key && (key = "" + config.key),
	    config))
	      !hasOwnProperty.call(config, propName) ||
	        "key" === propName ||
	        "__self" === propName ||
	        "__source" === propName ||
	        ("ref" === propName && void 0 === config.ref) ||
	        (props[propName] = config[propName]);
	  var propName = arguments.length - 2;
	  if (1 === propName) props.children = children;
	  else if (1 < propName) {
	    for (var childArray = Array(propName), i = 0; i < propName; i++)
	      childArray[i] = arguments[i + 2];
	    props.children = childArray;
	  }
	  return ReactElement(element.type, key, void 0, void 0, owner, props);
	};
	react_production.createContext = function (defaultValue) {
	  defaultValue = {
	    $$typeof: REACT_CONTEXT_TYPE,
	    _currentValue: defaultValue,
	    _currentValue2: defaultValue,
	    _threadCount: 0,
	    Provider: null,
	    Consumer: null
	  };
	  defaultValue.Provider = defaultValue;
	  defaultValue.Consumer = {
	    $$typeof: REACT_CONSUMER_TYPE,
	    _context: defaultValue
	  };
	  return defaultValue;
	};
	react_production.createElement = function (type, config, children) {
	  var propName,
	    props = {},
	    key = null;
	  if (null != config)
	    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
	      hasOwnProperty.call(config, propName) &&
	        "key" !== propName &&
	        "__self" !== propName &&
	        "__source" !== propName &&
	        (props[propName] = config[propName]);
	  var childrenLength = arguments.length - 2;
	  if (1 === childrenLength) props.children = children;
	  else if (1 < childrenLength) {
	    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
	      childArray[i] = arguments[i + 2];
	    props.children = childArray;
	  }
	  if (type && type.defaultProps)
	    for (propName in ((childrenLength = type.defaultProps), childrenLength))
	      void 0 === props[propName] &&
	        (props[propName] = childrenLength[propName]);
	  return ReactElement(type, key, void 0, void 0, null, props);
	};
	react_production.createRef = function () {
	  return { current: null };
	};
	react_production.forwardRef = function (render) {
	  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
	};
	react_production.isValidElement = isValidElement;
	react_production.lazy = function (ctor) {
	  return {
	    $$typeof: REACT_LAZY_TYPE,
	    _payload: { _status: -1, _result: ctor },
	    _init: lazyInitializer
	  };
	};
	react_production.memo = function (type, compare) {
	  return {
	    $$typeof: REACT_MEMO_TYPE,
	    type: type,
	    compare: void 0 === compare ? null : compare
	  };
	};
	react_production.startTransition = function (scope) {
	  var prevTransition = ReactSharedInternals.T,
	    currentTransition = {};
	  ReactSharedInternals.T = currentTransition;
	  try {
	    var returnValue = scope(),
	      onStartTransitionFinish = ReactSharedInternals.S;
	    null !== onStartTransitionFinish &&
	      onStartTransitionFinish(currentTransition, returnValue);
	    "object" === typeof returnValue &&
	      null !== returnValue &&
	      "function" === typeof returnValue.then &&
	      returnValue.then(noop, reportGlobalError);
	  } catch (error) {
	    reportGlobalError(error);
	  } finally {
	    ReactSharedInternals.T = prevTransition;
	  }
	};
	react_production.unstable_useCacheRefresh = function () {
	  return ReactSharedInternals.H.useCacheRefresh();
	};
	react_production.use = function (usable) {
	  return ReactSharedInternals.H.use(usable);
	};
	react_production.useActionState = function (action, initialState, permalink) {
	  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	react_production.useCallback = function (callback, deps) {
	  return ReactSharedInternals.H.useCallback(callback, deps);
	};
	react_production.useContext = function (Context) {
	  return ReactSharedInternals.H.useContext(Context);
	};
	react_production.useDebugValue = function () {};
	react_production.useDeferredValue = function (value, initialValue) {
	  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	react_production.useEffect = function (create, createDeps, update) {
	  var dispatcher = ReactSharedInternals.H;
	  if ("function" === typeof update)
	    throw Error(
	      "useEffect CRUD overload is not enabled in this build of React."
	    );
	  return dispatcher.useEffect(create, createDeps);
	};
	react_production.useId = function () {
	  return ReactSharedInternals.H.useId();
	};
	react_production.useImperativeHandle = function (ref, create, deps) {
	  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	react_production.useInsertionEffect = function (create, deps) {
	  return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	react_production.useLayoutEffect = function (create, deps) {
	  return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	react_production.useMemo = function (create, deps) {
	  return ReactSharedInternals.H.useMemo(create, deps);
	};
	react_production.useOptimistic = function (passthrough, reducer) {
	  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	react_production.useReducer = function (reducer, initialArg, init) {
	  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	react_production.useRef = function (initialValue) {
	  return ReactSharedInternals.H.useRef(initialValue);
	};
	react_production.useState = function (initialState) {
	  return ReactSharedInternals.H.useState(initialState);
	};
	react_production.useSyncExternalStore = function (
	  subscribe,
	  getSnapshot,
	  getServerSnapshot
	) {
	  return ReactSharedInternals.H.useSyncExternalStore(
	    subscribe,
	    getSnapshot,
	    getServerSnapshot
	  );
	};
	react_production.useTransition = function () {
	  return ReactSharedInternals.H.useTransition();
	};
	react_production.version = "19.1.0";
	return react_production;
}

var react_development = {exports: {}};

/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
react_development.exports;

var hasRequiredReact_development;

function requireReact_development () {
	if (hasRequiredReact_development) return react_development.exports;
	hasRequiredReact_development = 1;
	(function (module, exports) {
		"production" !== process.env.NODE_ENV &&
		  (function () {
		    function defineDeprecationWarning(methodName, info) {
		      Object.defineProperty(Component.prototype, methodName, {
		        get: function () {
		          console.warn(
		            "%s(...) is deprecated in plain JavaScript React classes. %s",
		            info[0],
		            info[1]
		          );
		        }
		      });
		    }
		    function getIteratorFn(maybeIterable) {
		      if (null === maybeIterable || "object" !== typeof maybeIterable)
		        return null;
		      maybeIterable =
		        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
		        maybeIterable["@@iterator"];
		      return "function" === typeof maybeIterable ? maybeIterable : null;
		    }
		    function warnNoop(publicInstance, callerName) {
		      publicInstance =
		        ((publicInstance = publicInstance.constructor) &&
		          (publicInstance.displayName || publicInstance.name)) ||
		        "ReactClass";
		      var warningKey = publicInstance + "." + callerName;
		      didWarnStateUpdateForUnmountedComponent[warningKey] ||
		        (console.error(
		          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
		          callerName,
		          publicInstance
		        ),
		        (didWarnStateUpdateForUnmountedComponent[warningKey] = true));
		    }
		    function Component(props, context, updater) {
		      this.props = props;
		      this.context = context;
		      this.refs = emptyObject;
		      this.updater = updater || ReactNoopUpdateQueue;
		    }
		    function ComponentDummy() {}
		    function PureComponent(props, context, updater) {
		      this.props = props;
		      this.context = context;
		      this.refs = emptyObject;
		      this.updater = updater || ReactNoopUpdateQueue;
		    }
		    function testStringCoercion(value) {
		      return "" + value;
		    }
		    function checkKeyStringCoercion(value) {
		      try {
		        testStringCoercion(value);
		        var JSCompiler_inline_result = !1;
		      } catch (e) {
		        JSCompiler_inline_result = true;
		      }
		      if (JSCompiler_inline_result) {
		        JSCompiler_inline_result = console;
		        var JSCompiler_temp_const = JSCompiler_inline_result.error;
		        var JSCompiler_inline_result$jscomp$0 =
		          ("function" === typeof Symbol &&
		            Symbol.toStringTag &&
		            value[Symbol.toStringTag]) ||
		          value.constructor.name ||
		          "Object";
		        JSCompiler_temp_const.call(
		          JSCompiler_inline_result,
		          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
		          JSCompiler_inline_result$jscomp$0
		        );
		        return testStringCoercion(value);
		      }
		    }
		    function getComponentNameFromType(type) {
		      if (null == type) return null;
		      if ("function" === typeof type)
		        return type.$$typeof === REACT_CLIENT_REFERENCE
		          ? null
		          : type.displayName || type.name || null;
		      if ("string" === typeof type) return type;
		      switch (type) {
		        case REACT_FRAGMENT_TYPE:
		          return "Fragment";
		        case REACT_PROFILER_TYPE:
		          return "Profiler";
		        case REACT_STRICT_MODE_TYPE:
		          return "StrictMode";
		        case REACT_SUSPENSE_TYPE:
		          return "Suspense";
		        case REACT_SUSPENSE_LIST_TYPE:
		          return "SuspenseList";
		        case REACT_ACTIVITY_TYPE:
		          return "Activity";
		      }
		      if ("object" === typeof type)
		        switch (
		          ("number" === typeof type.tag &&
		            console.error(
		              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
		            ),
		          type.$$typeof)
		        ) {
		          case REACT_PORTAL_TYPE:
		            return "Portal";
		          case REACT_CONTEXT_TYPE:
		            return (type.displayName || "Context") + ".Provider";
		          case REACT_CONSUMER_TYPE:
		            return (type._context.displayName || "Context") + ".Consumer";
		          case REACT_FORWARD_REF_TYPE:
		            var innerType = type.render;
		            type = type.displayName;
		            type ||
		              ((type = innerType.displayName || innerType.name || ""),
		              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
		            return type;
		          case REACT_MEMO_TYPE:
		            return (
		              (innerType = type.displayName || null),
		              null !== innerType
		                ? innerType
		                : getComponentNameFromType(type.type) || "Memo"
		            );
		          case REACT_LAZY_TYPE:
		            innerType = type._payload;
		            type = type._init;
		            try {
		              return getComponentNameFromType(type(innerType));
		            } catch (x) {}
		        }
		      return null;
		    }
		    function getTaskName(type) {
		      if (type === REACT_FRAGMENT_TYPE) return "<>";
		      if (
		        "object" === typeof type &&
		        null !== type &&
		        type.$$typeof === REACT_LAZY_TYPE
		      )
		        return "<...>";
		      try {
		        var name = getComponentNameFromType(type);
		        return name ? "<" + name + ">" : "<...>";
		      } catch (x) {
		        return "<...>";
		      }
		    }
		    function getOwner() {
		      var dispatcher = ReactSharedInternals.A;
		      return null === dispatcher ? null : dispatcher.getOwner();
		    }
		    function UnknownOwner() {
		      return Error("react-stack-top-frame");
		    }
		    function hasValidKey(config) {
		      if (hasOwnProperty.call(config, "key")) {
		        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
		        if (getter && getter.isReactWarning) return false;
		      }
		      return void 0 !== config.key;
		    }
		    function defineKeyPropWarningGetter(props, displayName) {
		      function warnAboutAccessingKey() {
		        specialPropKeyWarningShown ||
		          ((specialPropKeyWarningShown = true),
		          console.error(
		            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
		            displayName
		          ));
		      }
		      warnAboutAccessingKey.isReactWarning = true;
		      Object.defineProperty(props, "key", {
		        get: warnAboutAccessingKey,
		        configurable: true
		      });
		    }
		    function elementRefGetterWithDeprecationWarning() {
		      var componentName = getComponentNameFromType(this.type);
		      didWarnAboutElementRef[componentName] ||
		        ((didWarnAboutElementRef[componentName] = true),
		        console.error(
		          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
		        ));
		      componentName = this.props.ref;
		      return void 0 !== componentName ? componentName : null;
		    }
		    function ReactElement(
		      type,
		      key,
		      self,
		      source,
		      owner,
		      props,
		      debugStack,
		      debugTask
		    ) {
		      self = props.ref;
		      type = {
		        $$typeof: REACT_ELEMENT_TYPE,
		        type: type,
		        key: key,
		        props: props,
		        _owner: owner
		      };
		      null !== (void 0 !== self ? self : null)
		        ? Object.defineProperty(type, "ref", {
		            enumerable: false,
		            get: elementRefGetterWithDeprecationWarning
		          })
		        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
		      type._store = {};
		      Object.defineProperty(type._store, "validated", {
		        configurable: false,
		        enumerable: false,
		        writable: true,
		        value: 0
		      });
		      Object.defineProperty(type, "_debugInfo", {
		        configurable: false,
		        enumerable: false,
		        writable: true,
		        value: null
		      });
		      Object.defineProperty(type, "_debugStack", {
		        configurable: false,
		        enumerable: false,
		        writable: true,
		        value: debugStack
		      });
		      Object.defineProperty(type, "_debugTask", {
		        configurable: false,
		        enumerable: false,
		        writable: true,
		        value: debugTask
		      });
		      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
		      return type;
		    }
		    function cloneAndReplaceKey(oldElement, newKey) {
		      newKey = ReactElement(
		        oldElement.type,
		        newKey,
		        void 0,
		        void 0,
		        oldElement._owner,
		        oldElement.props,
		        oldElement._debugStack,
		        oldElement._debugTask
		      );
		      oldElement._store &&
		        (newKey._store.validated = oldElement._store.validated);
		      return newKey;
		    }
		    function isValidElement(object) {
		      return (
		        "object" === typeof object &&
		        null !== object &&
		        object.$$typeof === REACT_ELEMENT_TYPE
		      );
		    }
		    function escape(key) {
		      var escaperLookup = { "=": "=0", ":": "=2" };
		      return (
		        "$" +
		        key.replace(/[=:]/g, function (match) {
		          return escaperLookup[match];
		        })
		      );
		    }
		    function getElementKey(element, index) {
		      return "object" === typeof element &&
		        null !== element &&
		        null != element.key
		        ? (checkKeyStringCoercion(element.key), escape("" + element.key))
		        : index.toString(36);
		    }
		    function noop$1() {}
		    function resolveThenable(thenable) {
		      switch (thenable.status) {
		        case "fulfilled":
		          return thenable.value;
		        case "rejected":
		          throw thenable.reason;
		        default:
		          switch (
		            ("string" === typeof thenable.status
		              ? thenable.then(noop$1, noop$1)
		              : ((thenable.status = "pending"),
		                thenable.then(
		                  function (fulfilledValue) {
		                    "pending" === thenable.status &&
		                      ((thenable.status = "fulfilled"),
		                      (thenable.value = fulfilledValue));
		                  },
		                  function (error) {
		                    "pending" === thenable.status &&
		                      ((thenable.status = "rejected"),
		                      (thenable.reason = error));
		                  }
		                )),
		            thenable.status)
		          ) {
		            case "fulfilled":
		              return thenable.value;
		            case "rejected":
		              throw thenable.reason;
		          }
		      }
		      throw thenable;
		    }
		    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		      var type = typeof children;
		      if ("undefined" === type || "boolean" === type) children = null;
		      var invokeCallback = false;
		      if (null === children) invokeCallback = true;
		      else
		        switch (type) {
		          case "bigint":
		          case "string":
		          case "number":
		            invokeCallback = true;
		            break;
		          case "object":
		            switch (children.$$typeof) {
		              case REACT_ELEMENT_TYPE:
		              case REACT_PORTAL_TYPE:
		                invokeCallback = true;
		                break;
		              case REACT_LAZY_TYPE:
		                return (
		                  (invokeCallback = children._init),
		                  mapIntoArray(
		                    invokeCallback(children._payload),
		                    array,
		                    escapedPrefix,
		                    nameSoFar,
		                    callback
		                  )
		                );
		            }
		        }
		      if (invokeCallback) {
		        invokeCallback = children;
		        callback = callback(invokeCallback);
		        var childKey =
		          "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
		        isArrayImpl(callback)
		          ? ((escapedPrefix = ""),
		            null != childKey &&
		              (escapedPrefix =
		                childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
		            mapIntoArray(callback, array, escapedPrefix, "", function (c) {
		              return c;
		            }))
		          : null != callback &&
		            (isValidElement(callback) &&
		              (null != callback.key &&
		                ((invokeCallback && invokeCallback.key === callback.key) ||
		                  checkKeyStringCoercion(callback.key)),
		              (escapedPrefix = cloneAndReplaceKey(
		                callback,
		                escapedPrefix +
		                  (null == callback.key ||
		                  (invokeCallback && invokeCallback.key === callback.key)
		                    ? ""
		                    : ("" + callback.key).replace(
		                        userProvidedKeyEscapeRegex,
		                        "$&/"
		                      ) + "/") +
		                  childKey
		              )),
		              "" !== nameSoFar &&
		                null != invokeCallback &&
		                isValidElement(invokeCallback) &&
		                null == invokeCallback.key &&
		                invokeCallback._store &&
		                !invokeCallback._store.validated &&
		                (escapedPrefix._store.validated = 2),
		              (callback = escapedPrefix)),
		            array.push(callback));
		        return 1;
		      }
		      invokeCallback = 0;
		      childKey = "" === nameSoFar ? "." : nameSoFar + ":";
		      if (isArrayImpl(children))
		        for (var i = 0; i < children.length; i++)
		          (nameSoFar = children[i]),
		            (type = childKey + getElementKey(nameSoFar, i)),
		            (invokeCallback += mapIntoArray(
		              nameSoFar,
		              array,
		              escapedPrefix,
		              type,
		              callback
		            ));
		      else if (((i = getIteratorFn(children)), "function" === typeof i))
		        for (
		          i === children.entries &&
		            (didWarnAboutMaps ||
		              console.warn(
		                "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
		              ),
		            (didWarnAboutMaps = true)),
		            children = i.call(children),
		            i = 0;
		          !(nameSoFar = children.next()).done;

		        )
		          (nameSoFar = nameSoFar.value),
		            (type = childKey + getElementKey(nameSoFar, i++)),
		            (invokeCallback += mapIntoArray(
		              nameSoFar,
		              array,
		              escapedPrefix,
		              type,
		              callback
		            ));
		      else if ("object" === type) {
		        if ("function" === typeof children.then)
		          return mapIntoArray(
		            resolveThenable(children),
		            array,
		            escapedPrefix,
		            nameSoFar,
		            callback
		          );
		        array = String(children);
		        throw Error(
		          "Objects are not valid as a React child (found: " +
		            ("[object Object]" === array
		              ? "object with keys {" + Object.keys(children).join(", ") + "}"
		              : array) +
		            "). If you meant to render a collection of children, use an array instead."
		        );
		      }
		      return invokeCallback;
		    }
		    function mapChildren(children, func, context) {
		      if (null == children) return children;
		      var result = [],
		        count = 0;
		      mapIntoArray(children, result, "", "", function (child) {
		        return func.call(context, child, count++);
		      });
		      return result;
		    }
		    function lazyInitializer(payload) {
		      if (-1 === payload._status) {
		        var ctor = payload._result;
		        ctor = ctor();
		        ctor.then(
		          function (moduleObject) {
		            if (0 === payload._status || -1 === payload._status)
		              (payload._status = 1), (payload._result = moduleObject);
		          },
		          function (error) {
		            if (0 === payload._status || -1 === payload._status)
		              (payload._status = 2), (payload._result = error);
		          }
		        );
		        -1 === payload._status &&
		          ((payload._status = 0), (payload._result = ctor));
		      }
		      if (1 === payload._status)
		        return (
		          (ctor = payload._result),
		          void 0 === ctor &&
		            console.error(
		              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
		              ctor
		            ),
		          "default" in ctor ||
		            console.error(
		              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
		              ctor
		            ),
		          ctor.default
		        );
		      throw payload._result;
		    }
		    function resolveDispatcher() {
		      var dispatcher = ReactSharedInternals.H;
		      null === dispatcher &&
		        console.error(
		          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
		        );
		      return dispatcher;
		    }
		    function noop() {}
		    function enqueueTask(task) {
		      if (null === enqueueTaskImpl)
		        try {
		          var requireString = ("require" + Math.random()).slice(0, 7);
		          enqueueTaskImpl = (module && module[requireString]).call(
		            module,
		            "timers"
		          ).setImmediate;
		        } catch (_err) {
		          enqueueTaskImpl = function (callback) {
		            false === didWarnAboutMessageChannel &&
		              ((didWarnAboutMessageChannel = true),
		              "undefined" === typeof MessageChannel &&
		                console.error(
		                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
		                ));
		            var channel = new MessageChannel();
		            channel.port1.onmessage = callback;
		            channel.port2.postMessage(void 0);
		          };
		        }
		      return enqueueTaskImpl(task);
		    }
		    function aggregateErrors(errors) {
		      return 1 < errors.length && "function" === typeof AggregateError
		        ? new AggregateError(errors)
		        : errors[0];
		    }
		    function popActScope(prevActQueue, prevActScopeDepth) {
		      prevActScopeDepth !== actScopeDepth - 1 &&
		        console.error(
		          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
		        );
		      actScopeDepth = prevActScopeDepth;
		    }
		    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
		      var queue = ReactSharedInternals.actQueue;
		      if (null !== queue)
		        if (0 !== queue.length)
		          try {
		            flushActQueue(queue);
		            enqueueTask(function () {
		              return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
		            });
		            return;
		          } catch (error) {
		            ReactSharedInternals.thrownErrors.push(error);
		          }
		        else ReactSharedInternals.actQueue = null;
		      0 < ReactSharedInternals.thrownErrors.length
		        ? ((queue = aggregateErrors(ReactSharedInternals.thrownErrors)),
		          (ReactSharedInternals.thrownErrors.length = 0),
		          reject(queue))
		        : resolve(returnValue);
		    }
		    function flushActQueue(queue) {
		      if (!isFlushing) {
		        isFlushing = true;
		        var i = 0;
		        try {
		          for (; i < queue.length; i++) {
		            var callback = queue[i];
		            do {
		              ReactSharedInternals.didUsePromise = !1;
		              var continuation = callback(!1);
		              if (null !== continuation) {
		                if (ReactSharedInternals.didUsePromise) {
		                  queue[i] = callback;
		                  queue.splice(0, i);
		                  return;
		                }
		                callback = continuation;
		              } else break;
		            } while (1);
		          }
		          queue.length = 0;
		        } catch (error) {
		          queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
		        } finally {
		          isFlushing = false;
		        }
		      }
		    }
		    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
		      "function" ===
		        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
		      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
		      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
		      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
		      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
		      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
		    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
		      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
		      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
		      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
		      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
		      REACT_MEMO_TYPE = Symbol.for("react.memo"),
		      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
		      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
		      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
		      didWarnStateUpdateForUnmountedComponent = {},
		      ReactNoopUpdateQueue = {
		        isMounted: function () {
		          return false;
		        },
		        enqueueForceUpdate: function (publicInstance) {
		          warnNoop(publicInstance, "forceUpdate");
		        },
		        enqueueReplaceState: function (publicInstance) {
		          warnNoop(publicInstance, "replaceState");
		        },
		        enqueueSetState: function (publicInstance) {
		          warnNoop(publicInstance, "setState");
		        }
		      },
		      assign = Object.assign,
		      emptyObject = {};
		    Object.freeze(emptyObject);
		    Component.prototype.isReactComponent = {};
		    Component.prototype.setState = function (partialState, callback) {
		      if (
		        "object" !== typeof partialState &&
		        "function" !== typeof partialState &&
		        null != partialState
		      )
		        throw Error(
		          "takes an object of state variables to update or a function which returns an object of state variables."
		        );
		      this.updater.enqueueSetState(this, partialState, callback, "setState");
		    };
		    Component.prototype.forceUpdate = function (callback) {
		      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
		    };
		    var deprecatedAPIs = {
		        isMounted: [
		          "isMounted",
		          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
		        ],
		        replaceState: [
		          "replaceState",
		          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
		        ]
		      },
		      fnName;
		    for (fnName in deprecatedAPIs)
		      deprecatedAPIs.hasOwnProperty(fnName) &&
		        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		    ComponentDummy.prototype = Component.prototype;
		    deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
		    deprecatedAPIs.constructor = PureComponent;
		    assign(deprecatedAPIs, Component.prototype);
		    deprecatedAPIs.isPureReactComponent = true;
		    var isArrayImpl = Array.isArray,
		      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
		      ReactSharedInternals = {
		        H: null,
		        A: null,
		        T: null,
		        S: null,
		        V: null,
		        actQueue: null,
		        isBatchingLegacy: false,
		        didScheduleLegacyUpdate: false,
		        didUsePromise: false,
		        thrownErrors: [],
		        getCurrentStack: null,
		        recentlyCreatedOwnerStacks: 0
		      },
		      hasOwnProperty = Object.prototype.hasOwnProperty,
		      createTask = console.createTask
		        ? console.createTask
		        : function () {
		            return null;
		          };
		    deprecatedAPIs = {
		      "react-stack-bottom-frame": function (callStackForError) {
		        return callStackForError();
		      }
		    };
		    var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
		    var didWarnAboutElementRef = {};
		    var unknownOwnerDebugStack = deprecatedAPIs[
		      "react-stack-bottom-frame"
		    ].bind(deprecatedAPIs, UnknownOwner)();
		    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		    var didWarnAboutMaps = false,
		      userProvidedKeyEscapeRegex = /\/+/g,
		      reportGlobalError =
		        "function" === typeof reportError
		          ? reportError
		          : function (error) {
		              if (
		                "object" === typeof window &&
		                "function" === typeof window.ErrorEvent
		              ) {
		                var event = new window.ErrorEvent("error", {
		                  bubbles: true,
		                  cancelable: true,
		                  message:
		                    "object" === typeof error &&
		                    null !== error &&
		                    "string" === typeof error.message
		                      ? String(error.message)
		                      : String(error),
		                  error: error
		                });
		                if (!window.dispatchEvent(event)) return;
		              } else if (
		                "object" === typeof process &&
		                "function" === typeof process.emit
		              ) {
		                process.emit("uncaughtException", error);
		                return;
		              }
		              console.error(error);
		            },
		      didWarnAboutMessageChannel = false,
		      enqueueTaskImpl = null,
		      actScopeDepth = 0,
		      didWarnNoAwaitAct = false,
		      isFlushing = false,
		      queueSeveralMicrotasks =
		        "function" === typeof queueMicrotask
		          ? function (callback) {
		              queueMicrotask(function () {
		                return queueMicrotask(callback);
		              });
		            }
		          : enqueueTask;
		    deprecatedAPIs = Object.freeze({
		      __proto__: null,
		      c: function (size) {
		        return resolveDispatcher().useMemoCache(size);
		      }
		    });
		    exports.Children = {
		      map: mapChildren,
		      forEach: function (children, forEachFunc, forEachContext) {
		        mapChildren(
		          children,
		          function () {
		            forEachFunc.apply(this, arguments);
		          },
		          forEachContext
		        );
		      },
		      count: function (children) {
		        var n = 0;
		        mapChildren(children, function () {
		          n++;
		        });
		        return n;
		      },
		      toArray: function (children) {
		        return (
		          mapChildren(children, function (child) {
		            return child;
		          }) || []
		        );
		      },
		      only: function (children) {
		        if (!isValidElement(children))
		          throw Error(
		            "React.Children.only expected to receive a single React element child."
		          );
		        return children;
		      }
		    };
		    exports.Component = Component;
		    exports.Fragment = REACT_FRAGMENT_TYPE;
		    exports.Profiler = REACT_PROFILER_TYPE;
		    exports.PureComponent = PureComponent;
		    exports.StrictMode = REACT_STRICT_MODE_TYPE;
		    exports.Suspense = REACT_SUSPENSE_TYPE;
		    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
		      ReactSharedInternals;
		    exports.__COMPILER_RUNTIME = deprecatedAPIs;
		    exports.act = function (callback) {
		      var prevActQueue = ReactSharedInternals.actQueue,
		        prevActScopeDepth = actScopeDepth;
		      actScopeDepth++;
		      var queue = (ReactSharedInternals.actQueue =
		          null !== prevActQueue ? prevActQueue : []),
		        didAwaitActCall = false;
		      try {
		        var result = callback();
		      } catch (error) {
		        ReactSharedInternals.thrownErrors.push(error);
		      }
		      if (0 < ReactSharedInternals.thrownErrors.length)
		        throw (
		          (popActScope(prevActQueue, prevActScopeDepth),
		          (callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
		          (ReactSharedInternals.thrownErrors.length = 0),
		          callback)
		        );
		      if (
		        null !== result &&
		        "object" === typeof result &&
		        "function" === typeof result.then
		      ) {
		        var thenable = result;
		        queueSeveralMicrotasks(function () {
		          didAwaitActCall ||
		            didWarnNoAwaitAct ||
		            ((didWarnNoAwaitAct = true),
		            console.error(
		              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
		            ));
		        });
		        return {
		          then: function (resolve, reject) {
		            didAwaitActCall = true;
		            thenable.then(
		              function (returnValue) {
		                popActScope(prevActQueue, prevActScopeDepth);
		                if (0 === prevActScopeDepth) {
		                  try {
		                    flushActQueue(queue),
		                      enqueueTask(function () {
		                        return recursivelyFlushAsyncActWork(
		                          returnValue,
		                          resolve,
		                          reject
		                        );
		                      });
		                  } catch (error$0) {
		                    ReactSharedInternals.thrownErrors.push(error$0);
		                  }
		                  if (0 < ReactSharedInternals.thrownErrors.length) {
		                    var _thrownError = aggregateErrors(
		                      ReactSharedInternals.thrownErrors
		                    );
		                    ReactSharedInternals.thrownErrors.length = 0;
		                    reject(_thrownError);
		                  }
		                } else resolve(returnValue);
		              },
		              function (error) {
		                popActScope(prevActQueue, prevActScopeDepth);
		                0 < ReactSharedInternals.thrownErrors.length
		                  ? ((error = aggregateErrors(
		                      ReactSharedInternals.thrownErrors
		                    )),
		                    (ReactSharedInternals.thrownErrors.length = 0),
		                    reject(error))
		                  : reject(error);
		              }
		            );
		          }
		        };
		      }
		      var returnValue$jscomp$0 = result;
		      popActScope(prevActQueue, prevActScopeDepth);
		      0 === prevActScopeDepth &&
		        (flushActQueue(queue),
		        0 !== queue.length &&
		          queueSeveralMicrotasks(function () {
		            didAwaitActCall ||
		              didWarnNoAwaitAct ||
		              ((didWarnNoAwaitAct = true),
		              console.error(
		                "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
		              ));
		          }),
		        (ReactSharedInternals.actQueue = null));
		      if (0 < ReactSharedInternals.thrownErrors.length)
		        throw (
		          ((callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
		          (ReactSharedInternals.thrownErrors.length = 0),
		          callback)
		        );
		      return {
		        then: function (resolve, reject) {
		          didAwaitActCall = true;
		          0 === prevActScopeDepth
		            ? ((ReactSharedInternals.actQueue = queue),
		              enqueueTask(function () {
		                return recursivelyFlushAsyncActWork(
		                  returnValue$jscomp$0,
		                  resolve,
		                  reject
		                );
		              }))
		            : resolve(returnValue$jscomp$0);
		        }
		      };
		    };
		    exports.cache = function (fn) {
		      return function () {
		        return fn.apply(null, arguments);
		      };
		    };
		    exports.captureOwnerStack = function () {
		      var getCurrentStack = ReactSharedInternals.getCurrentStack;
		      return null === getCurrentStack ? null : getCurrentStack();
		    };
		    exports.cloneElement = function (element, config, children) {
		      if (null === element || void 0 === element)
		        throw Error(
		          "The argument must be a React element, but you passed " +
		            element +
		            "."
		        );
		      var props = assign({}, element.props),
		        key = element.key,
		        owner = element._owner;
		      if (null != config) {
		        var JSCompiler_inline_result;
		        a: {
		          if (
		            hasOwnProperty.call(config, "ref") &&
		            (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
		              config,
		              "ref"
		            ).get) &&
		            JSCompiler_inline_result.isReactWarning
		          ) {
		            JSCompiler_inline_result = false;
		            break a;
		          }
		          JSCompiler_inline_result = void 0 !== config.ref;
		        }
		        JSCompiler_inline_result && (owner = getOwner());
		        hasValidKey(config) &&
		          (checkKeyStringCoercion(config.key), (key = "" + config.key));
		        for (propName in config)
		          !hasOwnProperty.call(config, propName) ||
		            "key" === propName ||
		            "__self" === propName ||
		            "__source" === propName ||
		            ("ref" === propName && void 0 === config.ref) ||
		            (props[propName] = config[propName]);
		      }
		      var propName = arguments.length - 2;
		      if (1 === propName) props.children = children;
		      else if (1 < propName) {
		        JSCompiler_inline_result = Array(propName);
		        for (var i = 0; i < propName; i++)
		          JSCompiler_inline_result[i] = arguments[i + 2];
		        props.children = JSCompiler_inline_result;
		      }
		      props = ReactElement(
		        element.type,
		        key,
		        void 0,
		        void 0,
		        owner,
		        props,
		        element._debugStack,
		        element._debugTask
		      );
		      for (key = 2; key < arguments.length; key++)
		        (owner = arguments[key]),
		          isValidElement(owner) && owner._store && (owner._store.validated = 1);
		      return props;
		    };
		    exports.createContext = function (defaultValue) {
		      defaultValue = {
		        $$typeof: REACT_CONTEXT_TYPE,
		        _currentValue: defaultValue,
		        _currentValue2: defaultValue,
		        _threadCount: 0,
		        Provider: null,
		        Consumer: null
		      };
		      defaultValue.Provider = defaultValue;
		      defaultValue.Consumer = {
		        $$typeof: REACT_CONSUMER_TYPE,
		        _context: defaultValue
		      };
		      defaultValue._currentRenderer = null;
		      defaultValue._currentRenderer2 = null;
		      return defaultValue;
		    };
		    exports.createElement = function (type, config, children) {
		      for (var i = 2; i < arguments.length; i++) {
		        var node = arguments[i];
		        isValidElement(node) && node._store && (node._store.validated = 1);
		      }
		      i = {};
		      node = null;
		      if (null != config)
		        for (propName in (didWarnAboutOldJSXRuntime ||
		          !("__self" in config) ||
		          "key" in config ||
		          ((didWarnAboutOldJSXRuntime = true),
		          console.warn(
		            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
		          )),
		        hasValidKey(config) &&
		          (checkKeyStringCoercion(config.key), (node = "" + config.key)),
		        config))
		          hasOwnProperty.call(config, propName) &&
		            "key" !== propName &&
		            "__self" !== propName &&
		            "__source" !== propName &&
		            (i[propName] = config[propName]);
		      var childrenLength = arguments.length - 2;
		      if (1 === childrenLength) i.children = children;
		      else if (1 < childrenLength) {
		        for (
		          var childArray = Array(childrenLength), _i = 0;
		          _i < childrenLength;
		          _i++
		        )
		          childArray[_i] = arguments[_i + 2];
		        Object.freeze && Object.freeze(childArray);
		        i.children = childArray;
		      }
		      if (type && type.defaultProps)
		        for (propName in ((childrenLength = type.defaultProps), childrenLength))
		          void 0 === i[propName] && (i[propName] = childrenLength[propName]);
		      node &&
		        defineKeyPropWarningGetter(
		          i,
		          "function" === typeof type
		            ? type.displayName || type.name || "Unknown"
		            : type
		        );
		      var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
		      return ReactElement(
		        type,
		        node,
		        void 0,
		        void 0,
		        getOwner(),
		        i,
		        propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
		        propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
		      );
		    };
		    exports.createRef = function () {
		      var refObject = { current: null };
		      Object.seal(refObject);
		      return refObject;
		    };
		    exports.forwardRef = function (render) {
		      null != render && render.$$typeof === REACT_MEMO_TYPE
		        ? console.error(
		            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
		          )
		        : "function" !== typeof render
		          ? console.error(
		              "forwardRef requires a render function but was given %s.",
		              null === render ? "null" : typeof render
		            )
		          : 0 !== render.length &&
		            2 !== render.length &&
		            console.error(
		              "forwardRef render functions accept exactly two parameters: props and ref. %s",
		              1 === render.length
		                ? "Did you forget to use the ref parameter?"
		                : "Any additional parameter will be undefined."
		            );
		      null != render &&
		        null != render.defaultProps &&
		        console.error(
		          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
		        );
		      var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render: render },
		        ownName;
		      Object.defineProperty(elementType, "displayName", {
		        enumerable: false,
		        configurable: true,
		        get: function () {
		          return ownName;
		        },
		        set: function (name) {
		          ownName = name;
		          render.name ||
		            render.displayName ||
		            (Object.defineProperty(render, "name", { value: name }),
		            (render.displayName = name));
		        }
		      });
		      return elementType;
		    };
		    exports.isValidElement = isValidElement;
		    exports.lazy = function (ctor) {
		      return {
		        $$typeof: REACT_LAZY_TYPE,
		        _payload: { _status: -1, _result: ctor },
		        _init: lazyInitializer
		      };
		    };
		    exports.memo = function (type, compare) {
		      null == type &&
		        console.error(
		          "memo: The first argument must be a component. Instead received: %s",
		          null === type ? "null" : typeof type
		        );
		      compare = {
		        $$typeof: REACT_MEMO_TYPE,
		        type: type,
		        compare: void 0 === compare ? null : compare
		      };
		      var ownName;
		      Object.defineProperty(compare, "displayName", {
		        enumerable: false,
		        configurable: true,
		        get: function () {
		          return ownName;
		        },
		        set: function (name) {
		          ownName = name;
		          type.name ||
		            type.displayName ||
		            (Object.defineProperty(type, "name", { value: name }),
		            (type.displayName = name));
		        }
		      });
		      return compare;
		    };
		    exports.startTransition = function (scope) {
		      var prevTransition = ReactSharedInternals.T,
		        currentTransition = {};
		      ReactSharedInternals.T = currentTransition;
		      currentTransition._updatedFibers = new Set();
		      try {
		        var returnValue = scope(),
		          onStartTransitionFinish = ReactSharedInternals.S;
		        null !== onStartTransitionFinish &&
		          onStartTransitionFinish(currentTransition, returnValue);
		        "object" === typeof returnValue &&
		          null !== returnValue &&
		          "function" === typeof returnValue.then &&
		          returnValue.then(noop, reportGlobalError);
		      } catch (error) {
		        reportGlobalError(error);
		      } finally {
		        null === prevTransition &&
		          currentTransition._updatedFibers &&
		          ((scope = currentTransition._updatedFibers.size),
		          currentTransition._updatedFibers.clear(),
		          10 < scope &&
		            console.warn(
		              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
		            )),
		          (ReactSharedInternals.T = prevTransition);
		      }
		    };
		    exports.unstable_useCacheRefresh = function () {
		      return resolveDispatcher().useCacheRefresh();
		    };
		    exports.use = function (usable) {
		      return resolveDispatcher().use(usable);
		    };
		    exports.useActionState = function (action, initialState, permalink) {
		      return resolveDispatcher().useActionState(
		        action,
		        initialState,
		        permalink
		      );
		    };
		    exports.useCallback = function (callback, deps) {
		      return resolveDispatcher().useCallback(callback, deps);
		    };
		    exports.useContext = function (Context) {
		      var dispatcher = resolveDispatcher();
		      Context.$$typeof === REACT_CONSUMER_TYPE &&
		        console.error(
		          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
		        );
		      return dispatcher.useContext(Context);
		    };
		    exports.useDebugValue = function (value, formatterFn) {
		      return resolveDispatcher().useDebugValue(value, formatterFn);
		    };
		    exports.useDeferredValue = function (value, initialValue) {
		      return resolveDispatcher().useDeferredValue(value, initialValue);
		    };
		    exports.useEffect = function (create, createDeps, update) {
		      null == create &&
		        console.warn(
		          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
		        );
		      var dispatcher = resolveDispatcher();
		      if ("function" === typeof update)
		        throw Error(
		          "useEffect CRUD overload is not enabled in this build of React."
		        );
		      return dispatcher.useEffect(create, createDeps);
		    };
		    exports.useId = function () {
		      return resolveDispatcher().useId();
		    };
		    exports.useImperativeHandle = function (ref, create, deps) {
		      return resolveDispatcher().useImperativeHandle(ref, create, deps);
		    };
		    exports.useInsertionEffect = function (create, deps) {
		      null == create &&
		        console.warn(
		          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
		        );
		      return resolveDispatcher().useInsertionEffect(create, deps);
		    };
		    exports.useLayoutEffect = function (create, deps) {
		      null == create &&
		        console.warn(
		          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
		        );
		      return resolveDispatcher().useLayoutEffect(create, deps);
		    };
		    exports.useMemo = function (create, deps) {
		      return resolveDispatcher().useMemo(create, deps);
		    };
		    exports.useOptimistic = function (passthrough, reducer) {
		      return resolveDispatcher().useOptimistic(passthrough, reducer);
		    };
		    exports.useReducer = function (reducer, initialArg, init) {
		      return resolveDispatcher().useReducer(reducer, initialArg, init);
		    };
		    exports.useRef = function (initialValue) {
		      return resolveDispatcher().useRef(initialValue);
		    };
		    exports.useState = function (initialState) {
		      return resolveDispatcher().useState(initialState);
		    };
		    exports.useSyncExternalStore = function (
		      subscribe,
		      getSnapshot,
		      getServerSnapshot
		    ) {
		      return resolveDispatcher().useSyncExternalStore(
		        subscribe,
		        getSnapshot,
		        getServerSnapshot
		      );
		    };
		    exports.useTransition = function () {
		      return resolveDispatcher().useTransition();
		    };
		    exports.version = "19.1.0";
		    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
		      "function" ===
		        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
		      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
		  })(); 
	} (react_development, react_development.exports));
	return react_development.exports;
}

var hasRequiredReact;

function requireReact () {
	if (hasRequiredReact) return react.exports;
	hasRequiredReact = 1;

	if (process.env.NODE_ENV === 'production') {
	  react.exports = requireReact_production();
	} else {
	  react.exports = requireReact_development();
	}
	return react.exports;
}

var reactExports = requireReact();

var on$1=Object.defineProperty;var un$1=t=>{throw TypeError(t)};var Ai=(t,e,r)=>e in t?on$1(t,e,{enumerable:true,configurable:true,writable:true,value:r}):t[e]=r;var ln$1=(t,e)=>{for(var r in e)on$1(t,r,{get:e[r],enumerable:true});};var lr$1=(t,e,r)=>Ai(t,typeof e!="symbol"?e+"":e,r),cn$1=(t,e,r)=>e.has(t)||un$1("Cannot "+r);var R$1=(t,e,r)=>(cn$1(t,e,"read from private field"),r?r.call(t):e.get(t)),At$1=(t,e,r)=>e.has(t)?un$1("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),pn$1=(t,e,r,n)=>(cn$1(t,e,"write to private field"),e.set(t,r),r);var rn$1={};ln$1(rn$1,{languages:()=>Hs,options:()=>Us,parsers:()=>tn$1,printers:()=>uu$1});var Di=(t,e,r,n)=>{if(!(t&&e==null))return e.replaceAll?e.replaceAll(r,n):r.global?e.replace(r,n):e.split(r).join(n)},w$1=Di;var we$1="string",ze$1="array",Ye$1="cursor",be$1="indent",Te$1="align",je$1="trim",xe$1="group",ke$1="fill",ce$1="if-break",Be="indent-if-break",Ke$1="line-suffix",Xe$1="line-suffix-boundary",j$1="line",Qe$1="label",Le$1="break-parent",Dt$1=new Set([Ye$1,be$1,Te$1,je$1,xe$1,ke$1,ce$1,Be,Ke$1,Xe$1,j$1,Qe$1,Le$1]);var vi=(t,e,r)=>{if(!(t&&e==null))return Array.isArray(e)||typeof e=="string"?e[r<0?e.length+r:r]:e.at(r)},K=vi;function yi(t){if(typeof t=="string")return we$1;if(Array.isArray(t))return ze$1;if(!t)return;let{type:e}=t;if(Dt$1.has(e))return e}var Fe$1=yi;var wi=t=>new Intl.ListFormat("en-US",{type:"disjunction"}).format(t);function bi(t){let e=t===null?"null":typeof t;if(e!=="string"&&e!=="object")return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;if(Fe$1(t))throw new Error("doc is valid.");let r=Object.prototype.toString.call(t);if(r!=="[object Object]")return `Unexpected doc '${r}'.`;let n=wi([...Dt$1].map(s=>`'${s}'`));return `Unexpected doc.type '${t.type}'.
Expected it to be ${n}.`}var cr$1=class cr extends Error{name="InvalidDocError";constructor(e){super(bi(e)),this.doc=e;}},pr=cr$1;function hr$1(t,e){if(typeof t=="string")return e(t);let r=new Map;return n(t);function n(i){if(r.has(i))return r.get(i);let a=s(i);return r.set(i,a),a}function s(i){switch(Fe$1(i)){case ze$1:return e(i.map(n));case ke$1:return e({...i,parts:i.parts.map(n)});case ce$1:return e({...i,breakContents:n(i.breakContents),flatContents:n(i.flatContents)});case xe$1:{let{expandedStates:a,contents:o}=i;return a?(a=a.map(n),o=a[0]):o=n(o),e({...i,contents:o,expandedStates:a})}case Te$1:case be$1:case Be:case Qe$1:case Ke$1:return e({...i,contents:n(i.contents)});case we$1:case Ye$1:case je$1:case Xe$1:case j$1:case Le$1:return e(i);default:throw new pr(i)}}}function B$1(t,e=hn$1){return hr$1(t,r=>typeof r=="string"?H$1(e,r.split(`
`)):r)}var mr$1=()=>{},fr$1=mr$1;function k$1(t){return {type:be$1,contents:t}}function fn$1(t,e){return {type:Te$1,contents:e,n:t}}function E(t,e={}){return fr$1(e.expandedStates),{type:xe$1,id:e.id,contents:t,break:!!e.shouldBreak,expandedStates:e.expandedStates}}function dn$1(t){return fn$1(Number.NEGATIVE_INFINITY,t)}function gn$1(t){return fn$1({type:"root"},t)}function vt$1(t){return {type:ke$1,parts:t}}function pe$1(t,e="",r={}){return {type:ce$1,breakContents:t,flatContents:e,groupId:r.groupId}}function Cn$1(t,e){return {type:Be,contents:t,groupId:e.groupId,negate:e.negate}}var ne$1={type:Le$1};var xi={type:j$1,hard:true},ki={type:j$1,hard:true,literal:true},_$1={type:j$1},v$1={type:j$1,soft:true},S$1=[xi,ne$1],hn$1=[ki,ne$1];function H$1(t,e){let r=[];for(let n=0;n<e.length;n++)n!==0&&r.push(t),r.push(e[n]);return r}var yt$1="'",Sn$1='"';function Bi(t,e){let r=e===true||e===yt$1?yt$1:Sn$1,n=r===yt$1?Sn$1:yt$1,s=0,i=0;for(let a of t)a===r?s++:a===n&&i++;return s>i?n:r}var _n$1=Bi;function dr$1(t){if(typeof t!="string")throw new TypeError("Expected a string");return t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}var V$1,gr$1=class gr{constructor(e){At$1(this,V$1);pn$1(this,V$1,new Set(e));}getLeadingWhitespaceCount(e){let r=R$1(this,V$1),n=0;for(let s=0;s<e.length&&r.has(e.charAt(s));s++)n++;return n}getTrailingWhitespaceCount(e){let r=R$1(this,V$1),n=0;for(let s=e.length-1;s>=0&&r.has(e.charAt(s));s--)n++;return n}getLeadingWhitespace(e){let r=this.getLeadingWhitespaceCount(e);return e.slice(0,r)}getTrailingWhitespace(e){let r=this.getTrailingWhitespaceCount(e);return e.slice(e.length-r)}hasLeadingWhitespace(e){return R$1(this,V$1).has(e.charAt(0))}hasTrailingWhitespace(e){return R$1(this,V$1).has(K(false,e,-1))}trimStart(e){let r=this.getLeadingWhitespaceCount(e);return e.slice(r)}trimEnd(e){let r=this.getTrailingWhitespaceCount(e);return e.slice(0,e.length-r)}trim(e){return this.trimEnd(this.trimStart(e))}split(e,r=false){let n=`[${dr$1([...R$1(this,V$1)].join(""))}]+`,s=new RegExp(r?`(${n})`:n,"u");return e.split(s)}hasWhitespaceCharacter(e){let r=R$1(this,V$1);return Array.prototype.some.call(e,n=>r.has(n))}hasNonWhitespaceCharacter(e){let r=R$1(this,V$1);return Array.prototype.some.call(e,n=>!r.has(n))}isWhitespaceOnly(e){let r=R$1(this,V$1);return Array.prototype.every.call(e,n=>r.has(n))}};V$1=new WeakMap;var En$1=gr$1;var Li=["	",`
`,"\f","\r"," "],Fi=new En$1(Li),O$1=Fi;var Cr$1=class Cr extends Error{name="UnexpectedNodeError";constructor(e,r,n="type"){super(`Unexpected ${r} node ${n}: ${JSON.stringify(e[n])}.`),this.node=e;}},An$1=Cr$1;function Pi(t){return (t==null?void 0:t.type)==="front-matter"}var Pe$1=Pi;var Ni=new Set(["sourceSpan","startSourceSpan","endSourceSpan","nameSpan","valueSpan","keySpan","tagDefinition","tokens","valueTokens","switchValueSourceSpan","expSourceSpan","valueSourceSpan"]),Ii=new Set(["if","else if","for","switch","case"]);function Dn$1(t,e){var r;if(t.type==="text"||t.type==="comment"||Pe$1(t)||t.type==="yaml"||t.type==="toml")return null;if(t.type==="attribute"&&delete e.value,t.type==="docType"&&delete e.value,t.type==="angularControlFlowBlock"&&((r=t.parameters)!=null&&r.children))for(let n of e.parameters.children)Ii.has(t.name)?delete n.expression:n.expression=n.expression.trim();t.type==="angularIcuExpression"&&(e.switchValue=t.switchValue.trim()),t.type==="angularLetDeclarationInitializer"&&delete e.value;}Dn$1.ignoredProperties=Ni;var vn$1=Dn$1;async function Ri(t,e){if(t.language==="yaml"){let r=t.value.trim(),n=r?await e(r,{parser:"yaml"}):"";return gn$1([t.startDelimiter,t.explicitLanguage,S$1,n,n?S$1:"",t.endDelimiter])}}var yn$1=Ri;function he$1(t,e=true){return [k$1([v$1,t]),e?v$1:""]}function X$1(t,e){let r=t.type==="NGRoot"?t.node.type==="NGMicrosyntax"&&t.node.body.length===1&&t.node.body[0].type==="NGMicrosyntaxExpression"?t.node.body[0].expression:t.node:t.type==="JsExpressionRoot"?t.node:t;return r&&(r.type==="ObjectExpression"||r.type==="ArrayExpression"||(e.parser==="__vue_expression"||e.parser==="__vue_ts_expression")&&(r.type==="TemplateLiteral"||r.type==="StringLiteral"))}async function T$1(t,e,r,n){r={__isInHtmlAttribute:true,__embeddedInHtml:true,...r};let s=true;n&&(r.__onHtmlBindingRoot=(a,o)=>{s=n(a,o);});let i=await e(t,r,e);return s?E(i):he$1(i)}function $i(t,e,r,n){let{node:s}=r,i=n.originalText.slice(s.sourceSpan.start.offset,s.sourceSpan.end.offset);return /^\s*$/u.test(i)?"":T$1(i,t,{parser:"__ng_directive",__isInHtmlAttribute:false},X$1)}var wn$1=$i;var Oi=(t,e)=>{if(!(t&&e==null))return e.toReversed||!Array.isArray(e)?e.toReversed():[...e].reverse()},bn$1=Oi;function Mi(t){return Array.isArray(t)&&t.length>0}var me$1=Mi;var Tn$1,xn$1,kn$1,Bn$1,Ln$1,qi=((Tn$1=globalThis.Deno)==null?void 0:Tn$1.build.os)==="windows"||((kn$1=(xn$1=globalThis.navigator)==null?void 0:xn$1.platform)==null?void 0:kn$1.startsWith("Win"))||((Ln$1=(Bn$1=globalThis.process)==null?void 0:Bn$1.platform)==null?void 0:Ln$1.startsWith("win"))||false;function Fn$1(t){if(t=t instanceof URL?t:new URL(t),t.protocol!=="file:")throw new TypeError(`URL must be a file URL: received "${t.protocol}"`);return t}function Hi(t){return t=Fn$1(t),decodeURIComponent(t.pathname.replace(/%(?![0-9A-Fa-f]{2})/g,"%25"))}function Vi(t){t=Fn$1(t);let e=decodeURIComponent(t.pathname.replace(/\//g,"\\").replace(/%(?![0-9A-Fa-f]{2})/g,"%25")).replace(/^\\*([A-Za-z]:)(\\|$)/,"$1\\");return t.hostname!==""&&(e=`\\\\${t.hostname}${e}`),e}function Pn$1(t){return qi?Vi(t):Hi(t)}var Nn$1=Pn$1;var Ui=t=>String(t).split(/[/\\]/u).pop();function In$1(t,e){if(!e)return;let r=Ui(e).toLowerCase();return t.find(({filenames:n})=>n==null?void 0:n.some(s=>s.toLowerCase()===r))??t.find(({extensions:n})=>n==null?void 0:n.some(s=>r.endsWith(s)))}function Wi(t,e){if(e)return t.find(({name:r})=>r.toLowerCase()===e)??t.find(({aliases:r})=>r==null?void 0:r.includes(e))??t.find(({extensions:r})=>r==null?void 0:r.includes(`.${e}`))}function Rn$1(t,e){if(e){if(String(e).startsWith("file:"))try{e=Nn$1(e);}catch{return}if(typeof e=="string")return t.find(({isSupported:r})=>r==null?void 0:r({filepath:e}))}}function Gi(t,e){let r=bn$1(false,t.plugins).flatMap(s=>s.languages??[]),n=Wi(r,e.language)??In$1(r,e.physicalFile)??In$1(r,e.file)??Rn$1(r,e.physicalFile)??Rn$1(r,e.file)??(e.physicalFile,void 0);return n==null?void 0:n.parsers[0]}var Ne$1=Gi;var $n$1="inline",Sr$1={area:"none",base:"none",basefont:"none",datalist:"none",head:"none",link:"none",meta:"none",noembed:"none",noframes:"none",param:"block",rp:"none",script:"block",style:"none",template:"inline",title:"none",html:"block",body:"block",address:"block",blockquote:"block",center:"block",dialog:"block",div:"block",figure:"block",figcaption:"block",footer:"block",form:"block",header:"block",hr:"block",legend:"block",listing:"block",main:"block",p:"block",plaintext:"block",pre:"block",search:"block",xmp:"block",slot:"contents",ruby:"ruby",rt:"ruby-text",article:"block",aside:"block",h1:"block",h2:"block",h3:"block",h4:"block",h5:"block",h6:"block",hgroup:"block",nav:"block",section:"block",dir:"block",dd:"block",dl:"block",dt:"block",menu:"block",ol:"block",ul:"block",li:"list-item",table:"table",caption:"table-caption",colgroup:"table-column-group",col:"table-column",thead:"table-header-group",tbody:"table-row-group",tfoot:"table-footer-group",tr:"table-row",td:"table-cell",th:"table-cell",input:"inline-block",button:"inline-block",fieldset:"block",details:"block",summary:"block",marquee:"inline-block",source:"block",track:"block",meter:"inline-block",progress:"inline-block",object:"inline-block",video:"inline-block",audio:"inline-block",select:"inline-block",option:"block",optgroup:"block"},On="normal",_r$1={listing:"pre",plaintext:"pre",pre:"pre",xmp:"pre",nobr:"nowrap",table:"initial",textarea:"pre-wrap"};function zi(t){return t.type==="element"&&!t.hasExplicitNamespace&&!["html","svg"].includes(t.namespace)}var fe$1=zi;var Yi=t=>w$1(false,t,/^[\t\f\r ]*\n/gu,""),Er$1=t=>Yi(O$1.trimEnd(t)),Mn$1=t=>{let e=t,r=O$1.getLeadingWhitespace(e);r&&(e=e.slice(r.length));let n=O$1.getTrailingWhitespace(e);return n&&(e=e.slice(0,-n.length)),{leadingWhitespace:r,trailingWhitespace:n,text:e}};function wt$1(t,e){return !!(t.type==="ieConditionalComment"&&t.lastChild&&!t.lastChild.isSelfClosing&&!t.lastChild.endSourceSpan||t.type==="ieConditionalComment"&&!t.complete||de$1(t)&&t.children.some(r=>r.type!=="text"&&r.type!=="interpolation")||xt$1(t,e)&&!W$1(t,e)&&t.type!=="interpolation")}function ge$1(t){return t.type==="attribute"||!t.parent||!t.prev?false:ji(t.prev)}function ji(t){return t.type==="comment"&&t.value.trim()==="prettier-ignore"}function $(t){return t.type==="text"||t.type==="comment"}function W$1(t,e){return t.type==="element"&&(t.fullName==="script"||t.fullName==="style"||t.fullName==="svg:style"||t.fullName==="svg:script"||t.fullName==="mj-style"&&e.parser==="mjml"||fe$1(t)&&(t.name==="script"||t.name==="style"))}function qn$1(t,e){return t.children&&!W$1(t,e)}function Hn$1(t,e){return W$1(t,e)||t.type==="interpolation"||Ar$1(t)}function Ar$1(t){return Jn$1(t).startsWith("pre")}function Vn$1(t,e){var s,i;let r=n();if(r&&!t.prev&&((i=(s=t.parent)==null?void 0:s.tagDefinition)!=null&&i.ignoreFirstLf))return t.type==="interpolation";return r;function n(){return Pe$1(t)||t.type==="angularControlFlowBlock"?false:(t.type==="text"||t.type==="interpolation")&&t.prev&&(t.prev.type==="text"||t.prev.type==="interpolation")?true:!t.parent||t.parent.cssDisplay==="none"?false:de$1(t.parent)?true:!(!t.prev&&(t.parent.type==="root"||de$1(t)&&t.parent||W$1(t.parent,e)||et$1(t.parent,e)||!ea(t.parent.cssDisplay))||t.prev&&!na(t.prev.cssDisplay))}}function Un$1(t,e){return Pe$1(t)||t.type==="angularControlFlowBlock"?false:(t.type==="text"||t.type==="interpolation")&&t.next&&(t.next.type==="text"||t.next.type==="interpolation")?true:!t.parent||t.parent.cssDisplay==="none"?false:de$1(t.parent)?true:!(!t.next&&(t.parent.type==="root"||de$1(t)&&t.parent||W$1(t.parent,e)||et$1(t.parent,e)||!ta(t.parent.cssDisplay))||t.next&&!ra(t.next.cssDisplay))}function Wn$1(t,e){return sa(t.cssDisplay)&&!W$1(t,e)}function Je$1(t){return Pe$1(t)||t.next&&t.sourceSpan.end&&t.sourceSpan.end.line+1<t.next.sourceSpan.start.line}function Gn$1(t){return Dr$1(t)||t.type==="element"&&t.children.length>0&&(["body","script","style"].includes(t.name)||t.children.some(e=>Xi(e)))||t.firstChild&&t.firstChild===t.lastChild&&t.firstChild.type!=="text"&&Yn$1(t.firstChild)&&(!t.lastChild.isTrailingSpaceSensitive||jn$1(t.lastChild))}function Dr$1(t){return t.type==="element"&&t.children.length>0&&(["html","head","ul","ol","select"].includes(t.name)||t.cssDisplay.startsWith("table")&&t.cssDisplay!=="table-cell")}function bt$1(t){return Kn$1(t)||t.prev&&Ki(t.prev)||zn$1(t)}function Ki(t){return Kn$1(t)||t.type==="element"&&t.fullName==="br"||zn$1(t)}function zn$1(t){return Yn$1(t)&&jn$1(t)}function Yn$1(t){return t.hasLeadingSpaces&&(t.prev?t.prev.sourceSpan.end.line<t.sourceSpan.start.line:t.parent.type==="root"||t.parent.startSourceSpan.end.line<t.sourceSpan.start.line)}function jn$1(t){return t.hasTrailingSpaces&&(t.next?t.next.sourceSpan.start.line>t.sourceSpan.end.line:t.parent.type==="root"||t.parent.endSourceSpan&&t.parent.endSourceSpan.start.line>t.sourceSpan.end.line)}function Kn$1(t){switch(t.type){case "ieConditionalComment":case "comment":case "directive":return  true;case "element":return ["script","select"].includes(t.name)}return  false}function Tt$1(t){return t.lastChild?Tt$1(t.lastChild):t}function Xi(t){var e;return (e=t.children)==null?void 0:e.some(r=>r.type!=="text")}function Xn$1(t){if(t)switch(t){case "module":case "text/javascript":case "text/babel":case "text/jsx":case "application/javascript":return "babel";case "application/x-typescript":return "typescript";case "text/markdown":return "markdown";case "text/html":return "html";case "text/x-handlebars-template":return "glimmer";default:if(t.endsWith("json")||t.endsWith("importmap")||t==="speculationrules")return "json"}}function Qi(t,e){let{name:r,attrMap:n}=t;if(r!=="script"||Object.prototype.hasOwnProperty.call(n,"src"))return;let{type:s,lang:i}=t.attrMap;return !i&&!s?"babel":Ne$1(e,{language:i})??Xn$1(s)}function Ji(t,e){if(!xt$1(t,e))return;let{attrMap:r}=t;if(Object.prototype.hasOwnProperty.call(r,"src"))return;let{type:n,lang:s}=r;return Ne$1(e,{language:s})??Xn$1(n)}function Zi(t,e){if(t.name==="style"){let{lang:r}=t.attrMap;return r?Ne$1(e,{language:r}):"css"}if(t.name==="mj-style"&&e.parser==="mjml")return "css"}function vr$1(t,e){return Qi(t,e)??Zi(t,e)??Ji(t,e)}function Ze$1(t){return t==="block"||t==="list-item"||t.startsWith("table")}function ea(t){return !Ze$1(t)&&t!=="inline-block"}function ta(t){return !Ze$1(t)&&t!=="inline-block"}function ra(t){return !Ze$1(t)}function na(t){return !Ze$1(t)}function sa(t){return !Ze$1(t)&&t!=="inline-block"}function de$1(t){return Jn$1(t).startsWith("pre")}function ia(t,e){let r=t;for(;r;){if(e(r))return  true;r=r.parent;}return  false}function Qn$1(t,e){var n;if(Ce$1(t,e))return "block";if(((n=t.prev)==null?void 0:n.type)==="comment"){let s=t.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/u);if(s)return s[1]}let r=false;if(t.type==="element"&&t.namespace==="svg")if(ia(t,s=>s.fullName==="svg:foreignObject"))r=true;else return t.name==="svg"?"inline-block":"block";switch(e.htmlWhitespaceSensitivity){case "strict":return "inline";case "ignore":return "block";default:if(t.type==="element"&&(!t.namespace||r||fe$1(t))&&Object.prototype.hasOwnProperty.call(Sr$1,t.name))return Sr$1[t.name]}return $n$1}function Jn$1(t){return t.type==="element"&&(!t.namespace||fe$1(t))&&Object.prototype.hasOwnProperty.call(_r$1,t.name)?_r$1[t.name]:On}function aa(t){let e=Number.POSITIVE_INFINITY;for(let r of t.split(`
`)){if(r.length===0)continue;let n=O$1.getLeadingWhitespaceCount(r);if(n===0)return 0;r.length!==n&&n<e&&(e=n);}return e===Number.POSITIVE_INFINITY?0:e}function yr$1(t,e=aa(t)){return e===0?t:t.split(`
`).map(r=>r.slice(e)).join(`
`)}function wr$1(t){return w$1(false,w$1(false,t,"&apos;","'"),"&quot;",'"')}function P$1(t){return wr$1(t.value)}var oa=new Set(["template","style","script"]);function et$1(t,e){return Ce$1(t,e)&&!oa.has(t.fullName)}function Ce$1(t,e){return e.parser==="vue"&&t.type==="element"&&t.parent.type==="root"&&t.fullName.toLowerCase()!=="html"}function xt$1(t,e){return Ce$1(t,e)&&(et$1(t,e)||t.attrMap.lang&&t.attrMap.lang!=="html")}function Zn$1(t){let e=t.fullName;return e.charAt(0)==="#"||e==="slot-scope"||e==="v-slot"||e.startsWith("v-slot:")}function es(t,e){let r=t.parent;if(!Ce$1(r,e))return  false;let n=r.fullName,s=t.fullName;return n==="script"&&s==="setup"||n==="style"&&s==="vars"}function kt$1(t,e=t.value){return t.parent.isWhitespaceSensitive?t.parent.isIndentationSensitive?B$1(e):B$1(yr$1(Er$1(e)),S$1):H$1(_$1,O$1.split(e))}function Bt$1(t,e){return Ce$1(t,e)&&t.name==="script"}var br$1=/\{\{(.+?)\}\}/su;async function ts(t,e){let r=[];for(let[n,s]of t.split(br$1).entries())if(n%2===0)r.push(B$1(s));else try{r.push(E(["{{",k$1([_$1,await T$1(s,e,{parser:"__ng_interpolation",__isInHtmlInterpolation:!0})]),_$1,"}}"]));}catch{r.push("{{",B$1(s),"}}");}return r}function Tr$1({parser:t}){return (e,r,n)=>T$1(P$1(n.node),e,{parser:t},X$1)}var ua=Tr$1({parser:"__ng_action"}),la=Tr$1({parser:"__ng_binding"}),ca=Tr$1({parser:"__ng_directive"});function pa(t,e){if(e.parser!=="angular")return;let{node:r}=t,n=r.fullName;if(n.startsWith("(")&&n.endsWith(")")||n.startsWith("on-"))return ua;if(n.startsWith("[")&&n.endsWith("]")||/^bind(?:on)?-/u.test(n)||/^ng-(?:if|show|hide|class|style)$/u.test(n))return la;if(n.startsWith("*"))return ca;let s=P$1(r);if(/^i18n(?:-.+)?$/u.test(n))return ()=>he$1(vt$1(kt$1(r,s.trim())),!s.includes("@@"));if(br$1.test(s))return i=>ts(s,i)}var rs=pa;function ha(t,e){let{node:r}=t,n=P$1(r);if(r.fullName==="class"&&!e.parentParser&&!n.includes("{{"))return ()=>n.trim().split(/\s+/u).join(" ")}var ns=ha;function ss(t){return t==="	"||t===`
`||t==="\f"||t==="\r"||t===" "}var ma=/^[ \t\n\r\u000c]+/,fa=/^[, \t\n\r\u000c]+/,da=/^[^ \t\n\r\u000c]+/,ga=/[,]+$/,is=/^\d+$/,Ca=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;function Sa(t){let e=t.length,r,n,s,i,a,o=0,u;function p(C){let A,D=C.exec(t.substring(o));if(D)return [A]=D,o+=A.length,A}let l=[];for(;;){if(p(fa),o>=e){if(l.length===0)throw new Error("Must contain one or more image candidate strings.");return l}u=o,r=p(da),n=[],r.slice(-1)===","?(r=r.replace(ga,""),f()):m();}function m(){for(p(ma),s="",i="in descriptor";;){if(a=t.charAt(o),i==="in descriptor")if(ss(a))s&&(n.push(s),s="",i="after descriptor");else if(a===","){o+=1,s&&n.push(s),f();return}else if(a==="(")s+=a,i="in parens";else if(a===""){s&&n.push(s),f();return}else s+=a;else if(i==="in parens")if(a===")")s+=a,i="in descriptor";else if(a===""){n.push(s),f();return}else s+=a;else if(i==="after descriptor"&&!ss(a))if(a===""){f();return}else i="in descriptor",o-=1;o+=1;}}function f(){let C=false,A,D,I,F,c={},g,y,q,x,U;for(F=0;F<n.length;F++)g=n[F],y=g[g.length-1],q=g.substring(0,g.length-1),x=parseInt(q,10),U=parseFloat(q),is.test(q)&&y==="w"?((A||D)&&(C=true),x===0?C=true:A=x):Ca.test(q)&&y==="x"?((A||D||I)&&(C=true),U<0?C=true:D=U):is.test(q)&&y==="h"?((I||D)&&(C=true),x===0?C=true:I=x):C=true;if(!C)c.source={value:r,startOffset:u},A&&(c.width={value:A}),D&&(c.density={value:D}),I&&(c.height={value:I}),l.push(c);else throw new Error(`Invalid srcset descriptor found in "${t}" at "${g}".`)}}var as=Sa;function _a(t){if(t.node.fullName==="srcset"&&(t.parent.fullName==="img"||t.parent.fullName==="source"))return ()=>Aa(P$1(t.node))}var os={width:"w",height:"h",density:"x"},Ea=Object.keys(os);function Aa(t){let e=as(t),r=Ea.filter(l=>e.some(m=>Object.prototype.hasOwnProperty.call(m,l)));if(r.length>1)throw new Error("Mixed descriptor in srcset is not supported");let[n]=r,s=os[n],i=e.map(l=>l.source.value),a=Math.max(...i.map(l=>l.length)),o=e.map(l=>l[n]?String(l[n].value):""),u=o.map(l=>{let m=l.indexOf(".");return m===-1?l.length:m}),p=Math.max(...u);return he$1(H$1([",",_$1],i.map((l,m)=>{let f=[l],C=o[m];if(C){let A=a-l.length+1,D=p-u[m],I=" ".repeat(A+D);f.push(pe$1(I," "),C+s);}return f})))}var us=_a;function ls(t,e){let{node:r}=t,n=P$1(t.node).trim();if(r.fullName==="style"&&!e.parentParser&&!n.includes("{{"))return async s=>he$1(await s(n,{parser:"css",__isHTMLStyleAttribute:true}))}var xr$1=new WeakMap;function Da(t,e){let{root:r}=t;return xr$1.has(r)||xr$1.set(r,r.children.some(n=>Bt$1(n,e)&&["ts","typescript"].includes(n.attrMap.lang))),xr$1.get(r)}var Ie$1=Da;function cs(t,e,r){let{node:n}=r,s=P$1(n);return T$1(`type T<${s}> = any`,t,{parser:"babel-ts",__isEmbeddedTypescriptGenericParameters:true},X$1)}function ps(t,e,{parseWithTs:r}){return T$1(`function _(${t}) {}`,e,{parser:r?"babel-ts":"babel",__isVueBindings:true})}async function hs(t,e,r,n){let s=P$1(r.node),{left:i,operator:a,right:o}=va(s),u=Ie$1(r,n);return [E(await T$1(`function _(${i}) {}`,t,{parser:u?"babel-ts":"babel",__isVueForBindingLeft:true}))," ",a," ",await T$1(o,t,{parser:u?"__ts_expression":"__js_expression"})]}function va(t){let e=/(.*?)\s+(in|of)\s+(.*)/su,r=/,([^,\]}]*)(?:,([^,\]}]*))?$/u,n=/^\(|\)$/gu,s=t.match(e);if(!s)return;let i={};if(i.for=s[3].trim(),!i.for)return;let a=w$1(false,s[1].trim(),n,""),o=a.match(r);o?(i.alias=a.replace(r,""),i.iterator1=o[1].trim(),o[2]&&(i.iterator2=o[2].trim())):i.alias=a;let u=[i.alias,i.iterator1,i.iterator2];if(!u.some((p,l)=>!p&&(l===0||u.slice(l+1).some(Boolean))))return {left:u.filter(Boolean).join(","),operator:s[2],right:i.for}}function ya(t,e){if(e.parser!=="vue")return;let{node:r}=t,n=r.fullName;if(n==="v-for")return hs;if(n==="generic"&&Bt$1(r.parent,e))return cs;let s=P$1(r),i=Ie$1(t,e);if(Zn$1(r)||es(r,e))return a=>ps(s,a,{parseWithTs:i});if(n.startsWith("@")||n.startsWith("v-on:"))return a=>wa(s,a,{parseWithTs:i});if(n.startsWith(":")||n.startsWith(".")||n.startsWith("v-bind:"))return a=>ba(s,a,{parseWithTs:i});if(n.startsWith("v-"))return a=>ms(s,a,{parseWithTs:i})}async function wa(t,e,{parseWithTs:r}){var n;try{return await ms(t,e,{parseWithTs:r})}catch(s){if(((n=s.cause)==null?void 0:n.code)!=="BABEL_PARSER_SYNTAX_ERROR")throw s}return T$1(t,e,{parser:r?"__vue_ts_event_binding":"__vue_event_binding"},X$1)}function ba(t,e,{parseWithTs:r}){return T$1(t,e,{parser:r?"__vue_ts_expression":"__vue_expression"},X$1)}function ms(t,e,{parseWithTs:r}){return T$1(t,e,{parser:r?"__ts_expression":"__js_expression"},X$1)}var fs=ya;function Ta(t,e){let{node:r}=t;if(r.value){if(/^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/u.test(e.originalText.slice(r.valueSpan.start.offset,r.valueSpan.end.offset))||e.parser==="lwc"&&r.value.startsWith("{")&&r.value.endsWith("}"))return [r.rawName,"=",r.value];for(let n of [us,ls,ns,fs,rs]){let s=n(t,e);if(s)return xa(s)}}}function xa(t){return async(e,r,n,s)=>{let i=await t(e,r,n,s);if(i)return i=hr$1(i,a=>typeof a=="string"?w$1(false,a,'"',"&quot;"):a),[n.node.rawName,'="',E(i),'"']}}var ds=Ta;var ka=new Proxy(()=>{},{get:()=>ka});function J$1(t){return t.sourceSpan.start.offset}function se$1(t){return t.sourceSpan.end.offset}function tt$1(t,e){return [t.isSelfClosing?"":Ba(t,e),Se$1(t,e)]}function Ba(t,e){return t.lastChild&&Ae$1(t.lastChild)?"":[La(t,e),Lt$1(t,e)]}function Se$1(t,e){return (t.next?Q$1(t.next):Ee$1(t.parent))?"":[_e$1(t,e),G$1(t,e)]}function La(t,e){return Ee$1(t)?_e$1(t.lastChild,e):""}function G$1(t,e){return Ae$1(t)?Lt$1(t.parent,e):rt$1(t)?Ft(t.next,e):""}function Lt$1(t,e){if(Cs(t,e))return "";switch(t.type){case "ieConditionalComment":return "<!";case "element":if(t.hasHtmComponentClosingTag)return "<//";default:return `</${t.rawName}`}}function _e$1(t,e){if(Cs(t,e))return "";switch(t.type){case "ieConditionalComment":case "ieConditionalEndComment":return "[endif]-->";case "ieConditionalStartComment":return "]><!-->";case "interpolation":return "}}";case "angularIcuExpression":return "}";case "element":if(t.isSelfClosing)return "/>";default:return ">"}}function Cs(t,e){return !t.isSelfClosing&&!t.endSourceSpan&&(ge$1(t)||wt$1(t.parent,e))}function Q$1(t){return t.prev&&t.prev.type!=="docType"&&t.type!=="angularControlFlowBlock"&&!$(t.prev)&&t.isLeadingSpaceSensitive&&!t.hasLeadingSpaces}function Ee$1(t){var e;return ((e=t.lastChild)==null?void 0:e.isTrailingSpaceSensitive)&&!t.lastChild.hasTrailingSpaces&&!$(Tt$1(t.lastChild))&&!de$1(t)}function Ae$1(t){return !t.next&&!t.hasTrailingSpaces&&t.isTrailingSpaceSensitive&&$(Tt$1(t))}function rt$1(t){return t.next&&!$(t.next)&&$(t)&&t.isTrailingSpaceSensitive&&!t.hasTrailingSpaces}function Fa(t){let e=t.trim().match(/^prettier-ignore-attribute(?:\s+(.+))?$/su);return e?e[1]?e[1].split(/\s+/u):true:false}function nt$1(t){return !t.prev&&t.isLeadingSpaceSensitive&&!t.hasLeadingSpaces}function Pa(t,e,r){var m;let{node:n}=t;if(!me$1(n.attrs))return n.isSelfClosing?" ":"";let s=((m=n.prev)==null?void 0:m.type)==="comment"&&Fa(n.prev.value),i=typeof s=="boolean"?()=>s:Array.isArray(s)?f=>s.includes(f.rawName):()=>false,a=t.map(({node:f})=>i(f)?B$1(e.originalText.slice(J$1(f),se$1(f))):r(),"attrs"),o=n.type==="element"&&n.fullName==="script"&&n.attrs.length===1&&n.attrs[0].fullName==="src"&&n.children.length===0,p=e.singleAttributePerLine&&n.attrs.length>1&&!Ce$1(n,e)?S$1:_$1,l=[k$1([o?" ":_$1,H$1(p,a)])];return n.firstChild&&nt$1(n.firstChild)||n.isSelfClosing&&Ee$1(n.parent)||o?l.push(n.isSelfClosing?" ":""):l.push(e.bracketSameLine?n.isSelfClosing?" ":"":n.isSelfClosing?_$1:v$1),l}function Na(t){return t.firstChild&&nt$1(t.firstChild)?"":Pt$1(t)}function st$1(t,e,r){let{node:n}=t;return [De$1(n,e),Pa(t,e,r),n.isSelfClosing?"":Na(n)]}function De$1(t,e){return t.prev&&rt$1(t.prev)?"":[z$1(t,e),Ft(t,e)]}function z$1(t,e){return nt$1(t)?Pt$1(t.parent):Q$1(t)?_e$1(t.prev,e):""}var gs="<!doctype";function Ft(t,e){switch(t.type){case "ieConditionalComment":case "ieConditionalStartComment":return `<!--[if ${t.condition}`;case "ieConditionalEndComment":return "<!--<!";case "interpolation":return "{{";case "docType":{if(t.value==="html"){let{filepath:n}=e;if(n&&/\.html?$/u.test(n))return gs}let r=J$1(t);return e.originalText.slice(r,r+gs.length)}case "angularIcuExpression":return "{";case "element":if(t.condition)return `<!--[if ${t.condition}]><!--><${t.rawName}`;default:return `<${t.rawName}`}}function Pt$1(t){switch(t.type){case "ieConditionalComment":return "]>";case "element":if(t.condition)return "><!--<![endif]-->";default:return ">"}}function Ia(t,e){if(!t.endSourceSpan)return "";let r=t.startSourceSpan.end.offset;t.firstChild&&nt$1(t.firstChild)&&(r-=Pt$1(t).length);let n=t.endSourceSpan.start.offset;return t.lastChild&&Ae$1(t.lastChild)?n+=Lt$1(t,e).length:Ee$1(t)&&(n-=_e$1(t.lastChild,e).length),e.originalText.slice(r,n)}var Nt$1=Ia;var Ra=new Set(["if","else if","for","switch","case"]);function $a(t,e){let{node:r}=t;switch(r.type){case "element":if(W$1(r,e)||r.type==="interpolation")return;if(!r.isSelfClosing&&xt$1(r,e)){let n=vr$1(r,e);return n?async(s,i)=>{let a=Nt$1(r,e),o=/^\s*$/u.test(a),u="";return o||(u=await s(Er$1(a),{parser:n,__embeddedInHtml:true}),o=u===""),[z$1(r,e),E(st$1(t,e,i)),o?"":S$1,u,o?"":S$1,tt$1(r,e),G$1(r,e)]}:void 0}break;case "text":if(W$1(r.parent,e)){let n=vr$1(r.parent,e);if(n)return async s=>{let i=n==="markdown"?yr$1(r.value.replace(/^[^\S\n]*\n/u,"")):r.value,a={parser:n,__embeddedInHtml:true};if(e.parser==="html"&&n==="babel"){let o="script",{attrMap:u}=r.parent;u&&(u.type==="module"||(u.type==="text/babel"||u.type==="text/jsx")&&u["data-type"]==="module")&&(o="module"),a.__babelSourceType=o;}return [ne$1,z$1(r,e),await s(i,a),G$1(r,e)]}}else if(r.parent.type==="interpolation")return async n=>{let s={__isInHtmlInterpolation:true,__embeddedInHtml:true};return e.parser==="angular"?s.parser="__ng_interpolation":e.parser==="vue"?s.parser=Ie$1(t,e)?"__vue_ts_expression":"__vue_expression":s.parser="__js_expression",[k$1([_$1,await n(r.value,s)]),r.parent.next&&Q$1(r.parent.next)?" ":_$1]};break;case "attribute":return ds(t,e);case "front-matter":return n=>yn$1(r,n);case "angularControlFlowBlockParameters":return Ra.has(t.parent.name)?wn$1:void 0;case "angularLetDeclarationInitializer":return n=>T$1(r.value,n,{parser:"__ng_binding",__isInHtmlAttribute:false})}}var Ss=$a;var it$1=null;function at$1(t){if(it$1!==null&&typeof it$1.property){let e=it$1;return it$1=at$1.prototype=null,e}return it$1=at$1.prototype=t??Object.create(null),new at$1}var Oa=10;for(let t=0;t<=Oa;t++)at$1();function kr$1(t){return at$1(t)}function Ma(t,e="type"){kr$1(t);function r(n){let s=n[e],i=t[s];if(!Array.isArray(i))throw Object.assign(new Error(`Missing visitor keys for '${s}'.`),{node:n});return i}return r}var _s=Ma;var qa={"front-matter":[],root:["children"],element:["attrs","children"],ieConditionalComment:["children"],ieConditionalStartComment:[],ieConditionalEndComment:[],interpolation:["children"],text:["children"],docType:[],comment:[],attribute:[],cdata:[],angularControlFlowBlock:["children","parameters"],angularControlFlowBlockParameters:["children"],angularControlFlowBlockParameter:[],angularLetDeclaration:["init"],angularLetDeclarationInitializer:[],angularIcuExpression:["cases"],angularIcuCase:["expression"]},Es=qa;var Ha=_s(Es),As=Ha;var Ds="format";var vs=/^\s*<!--\s*@(?:noformat|noprettier)\s*-->/u,ys=/^\s*<!--\s*@(?:format|prettier)\s*-->/u;function ws(t){return ys.test(t)}function bs(t){return vs.test(t)}function Ts(t){return `<!-- @${Ds} -->

${t}`}var xs=new Map([["if",new Set(["else if","else"])],["else if",new Set(["else if","else"])],["for",new Set(["empty"])],["defer",new Set(["placeholder","error","loading"])],["placeholder",new Set(["placeholder","error","loading"])],["error",new Set(["placeholder","error","loading"])],["loading",new Set(["placeholder","error","loading"])]]);function ks(t){let e=se$1(t);return t.type==="element"&&!t.endSourceSpan&&me$1(t.children)?Math.max(e,ks(K(false,t.children,-1))):e}function ot$1(t,e,r){let n=t.node;if(ge$1(n)){let s=ks(n);return [z$1(n,e),B$1(O$1.trimEnd(e.originalText.slice(J$1(n)+(n.prev&&rt$1(n.prev)?Ft(n).length:0),s-(n.next&&Q$1(n.next)?_e$1(n,e).length:0)))),G$1(n,e)]}return r()}function It$1(t,e){return $(t)&&$(e)?t.isTrailingSpaceSensitive?t.hasTrailingSpaces?bt$1(e)?S$1:_$1:"":bt$1(e)?S$1:v$1:rt$1(t)&&(ge$1(e)||e.firstChild||e.isSelfClosing||e.type==="element"&&e.attrs.length>0)||t.type==="element"&&t.isSelfClosing&&Q$1(e)?"":!e.isLeadingSpaceSensitive||bt$1(e)||Q$1(e)&&t.lastChild&&Ae$1(t.lastChild)&&t.lastChild.lastChild&&Ae$1(t.lastChild.lastChild)?S$1:e.hasLeadingSpaces?_$1:v$1}function Re$1(t,e,r){let{node:n}=t;if(Dr$1(n))return [ne$1,...t.map(i=>{let a=i.node,o=a.prev?It$1(a.prev,a):"";return [o?[o,Je$1(a.prev)?S$1:""]:"",ot$1(i,e,r)]},"children")];let s=n.children.map(()=>Symbol(""));return t.map((i,a)=>{let o=i.node;if($(o)){if(o.prev&&$(o.prev)){let A=It$1(o.prev,o);if(A)return Je$1(o.prev)?[S$1,S$1,ot$1(i,e,r)]:[A,ot$1(i,e,r)]}return ot$1(i,e,r)}let u=[],p=[],l=[],m=[],f=o.prev?It$1(o.prev,o):"",C=o.next?It$1(o,o.next):"";return f&&(Je$1(o.prev)?u.push(S$1,S$1):f===S$1?u.push(S$1):$(o.prev)?p.push(f):p.push(pe$1("",v$1,{groupId:s[a-1]}))),C&&(Je$1(o)?$(o.next)&&m.push(S$1,S$1):C===S$1?$(o.next)&&m.push(S$1):l.push(C)),[...u,E([...p,E([ot$1(i,e,r),...l],{id:s[a]})]),...m]},"children")}function Bs(t,e,r){let{node:n}=t,s=[];Va(t)&&s.push("} "),s.push("@",n.name),n.parameters&&s.push(" (",E(r("parameters")),")"),s.push(" {");let i=Ls(n);return n.children.length>0?(n.firstChild.hasLeadingSpaces=true,n.lastChild.hasTrailingSpaces=true,s.push(k$1([S$1,Re$1(t,e,r)])),i&&s.push(S$1,"}")):i&&s.push("}"),E(s,{shouldBreak:true})}function Ls(t){var e,r;return !(((e=t.next)==null?void 0:e.type)==="angularControlFlowBlock"&&((r=xs.get(t.name))!=null&&r.has(t.next.name)))}function Va(t){let{previous:e}=t;return (e==null?void 0:e.type)==="angularControlFlowBlock"&&!ge$1(e)&&!Ls(e)}function Fs(t,e,r){return [k$1([v$1,H$1([";",_$1],t.map(r,"children"))]),v$1]}function Ps(t,e,r){let{node:n}=t;return [De$1(n,e),E([n.switchValue.trim(),", ",n.clause,n.cases.length>0?[",",k$1([_$1,H$1(_$1,t.map(r,"cases"))])]:"",v$1]),Se$1(n,e)]}function Ns(t,e,r){let{node:n}=t;return [n.value," {",E([k$1([v$1,t.map(({node:s,isLast:i})=>{let a=[r()];return s.type==="text"&&(s.hasLeadingSpaces&&a.unshift(_$1),s.hasTrailingSpaces&&!i&&a.push(_$1)),a},"expression")]),v$1]),"}"]}function Is(t,e,r){let{node:n}=t;if(wt$1(n,e))return [z$1(n,e),E(st$1(t,e,r)),B$1(Nt$1(n,e)),...tt$1(n,e),G$1(n,e)];let s=n.children.length===1&&(n.firstChild.type==="interpolation"||n.firstChild.type==="angularIcuExpression")&&n.firstChild.isLeadingSpaceSensitive&&!n.firstChild.hasLeadingSpaces&&n.lastChild.isTrailingSpaceSensitive&&!n.lastChild.hasTrailingSpaces,i=Symbol("element-attr-group-id"),a=l=>E([E(st$1(t,e,r),{id:i}),l,tt$1(n,e)]),o=l=>s?Cn$1(l,{groupId:i}):(W$1(n,e)||et$1(n,e))&&n.parent.type==="root"&&e.parser==="vue"&&!e.vueIndentScriptAndStyle?l:k$1(l),u=()=>s?pe$1(v$1,"",{groupId:i}):n.firstChild.hasLeadingSpaces&&n.firstChild.isLeadingSpaceSensitive?_$1:n.firstChild.type==="text"&&n.isWhitespaceSensitive&&n.isIndentationSensitive?dn$1(v$1):v$1,p=()=>(n.next?Q$1(n.next):Ee$1(n.parent))?n.lastChild.hasTrailingSpaces&&n.lastChild.isTrailingSpaceSensitive?" ":"":s?pe$1(v$1,"",{groupId:i}):n.lastChild.hasTrailingSpaces&&n.lastChild.isTrailingSpaceSensitive?_$1:(n.lastChild.type==="comment"||n.lastChild.type==="text"&&n.isWhitespaceSensitive&&n.isIndentationSensitive)&&new RegExp(`\\n[\\t ]{${e.tabWidth*(t.ancestors.length-1)}}$`,"u").test(n.lastChild.value)?"":v$1;return n.children.length===0?a(n.hasDanglingSpaces&&n.isDanglingSpaceSensitive?_$1:""):a([Gn$1(n)?ne$1:"",o([u(),Re$1(t,e,r)]),p()])}function ut$1(t){return t>=9&&t<=32||t==160}function Rt$1(t){return 48<=t&&t<=57}function lt(t){return t>=97&&t<=122||t>=65&&t<=90}function Rs(t){return t>=97&&t<=102||t>=65&&t<=70||Rt$1(t)}function $t$1(t){return t===10||t===13}function Br$1(t){return 48<=t&&t<=55}function Ot$1(t){return t===39||t===34||t===96}var Ua=/-+([a-z0-9])/g;function Os(t){return t.replace(Ua,(...e)=>e[1].toUpperCase())}var ie$1=class t{constructor(e,r,n,s){this.file=e,this.offset=r,this.line=n,this.col=s;}toString(){return this.offset!=null?`${this.file.url}@${this.line}:${this.col}`:this.file.url}moveBy(e){let r=this.file.content,n=r.length,s=this.offset,i=this.line,a=this.col;for(;s>0&&e<0;)if(s--,e++,r.charCodeAt(s)==10){i--;let u=r.substring(0,s-1).lastIndexOf(String.fromCharCode(10));a=u>0?s-u:s;}else a--;for(;s<n&&e>0;){let o=r.charCodeAt(s);s++,e--,o==10?(i++,a=0):a++;}return new t(this.file,s,i,a)}getContext(e,r){let n=this.file.content,s=this.offset;if(s!=null){s>n.length-1&&(s=n.length-1);let i=s,a=0,o=0;for(;a<e&&s>0&&(s--,a++,!(n[s]==`
`&&++o==r)););for(a=0,o=0;a<e&&i<n.length-1&&(i++,a++,!(n[i]==`
`&&++o==r)););return {before:n.substring(s,this.offset),after:n.substring(this.offset,i+1)}}return null}},ve$1=class ve{constructor(e,r){this.content=e,this.url=r;}},h=class{constructor(e,r,n=e,s=null){this.start=e,this.end=r,this.fullStart=n,this.details=s;}toString(){return this.start.file.content.substring(this.start.offset,this.end.offset)}},Mt;(function(t){t[t.WARNING=0]="WARNING",t[t.ERROR=1]="ERROR";})(Mt||(Mt={}));var Oe$1=class Oe{constructor(e,r,n=Mt.ERROR,s){this.span=e,this.msg=r,this.level=n,this.relatedError=s;}contextualMessage(){let e=this.span.start.getContext(100,3);return e?`${this.msg} ("${e.before}[${Mt[this.level]} ->]${e.after}")`:this.msg}toString(){let e=this.span.details?`, ${this.span.details}`:"";return `${this.contextualMessage()}: ${this.span.start}${e}`}};var Wa=[za,Ya,Ka,Qa,Ja,to$1,Za,eo$1,ro$1,Xa];function Ga(t,e){for(let r of Wa)r(t,e);return t}function za(t){t.walk(e=>{if(e.type==="element"&&e.tagDefinition.ignoreFirstLf&&e.children.length>0&&e.children[0].type==="text"&&e.children[0].value[0]===`
`){let r=e.children[0];r.value.length===1?e.removeChild(r):r.value=r.value.slice(1);}});}function Ya(t){let e=r=>{var n,s;return r.type==="element"&&((n=r.prev)==null?void 0:n.type)==="ieConditionalStartComment"&&r.prev.sourceSpan.end.offset===r.startSourceSpan.start.offset&&((s=r.firstChild)==null?void 0:s.type)==="ieConditionalEndComment"&&r.firstChild.sourceSpan.start.offset===r.startSourceSpan.end.offset};t.walk(r=>{if(r.children)for(let n=0;n<r.children.length;n++){let s=r.children[n];if(!e(s))continue;let i=s.prev,a=s.firstChild;r.removeChild(i),n--;let o=new h(i.sourceSpan.start,a.sourceSpan.end),u=new h(o.start,s.sourceSpan.end);s.condition=i.condition,s.sourceSpan=u,s.startSourceSpan=o,s.removeChild(a);}});}function ja(t,e,r){t.walk(n=>{if(n.children)for(let s=0;s<n.children.length;s++){let i=n.children[s];if(i.type!=="text"&&!e(i))continue;i.type!=="text"&&(i.type="text",i.value=r(i));let a=i.prev;!a||a.type!=="text"||(a.value+=i.value,a.sourceSpan=new h(a.sourceSpan.start,i.sourceSpan.end),n.removeChild(i),s--);}});}function Ka(t){return ja(t,e=>e.type==="cdata",e=>`<![CDATA[${e.value}]]>`)}function Xa(t){let e=r=>{var n,s;return r.type==="element"&&r.attrs.length===0&&r.children.length===1&&r.firstChild.type==="text"&&!O$1.hasWhitespaceCharacter(r.children[0].value)&&!r.firstChild.hasLeadingSpaces&&!r.firstChild.hasTrailingSpaces&&r.isLeadingSpaceSensitive&&!r.hasLeadingSpaces&&r.isTrailingSpaceSensitive&&!r.hasTrailingSpaces&&((n=r.prev)==null?void 0:n.type)==="text"&&((s=r.next)==null?void 0:s.type)==="text"};t.walk(r=>{if(r.children)for(let n=0;n<r.children.length;n++){let s=r.children[n];if(!e(s))continue;let i=s.prev,a=s.next;i.value+=`<${s.rawName}>`+s.firstChild.value+`</${s.rawName}>`+a.value,i.sourceSpan=new h(i.sourceSpan.start,a.sourceSpan.end),i.isTrailingSpaceSensitive=a.isTrailingSpaceSensitive,i.hasTrailingSpaces=a.hasTrailingSpaces,r.removeChild(s),n--,r.removeChild(a);}});}function Qa(t,e){if(e.parser==="html")return;let r=/\{\{(.+?)\}\}/su;t.walk(n=>{if(qn$1(n,e))for(let s of n.children){if(s.type!=="text")continue;let i=s.sourceSpan.start,a=null,o=s.value.split(r);for(let u=0;u<o.length;u++,i=a){let p=o[u];if(u%2===0){a=i.moveBy(p.length),p.length>0&&n.insertChildBefore(s,{type:"text",value:p,sourceSpan:new h(i,a)});continue}a=i.moveBy(p.length+4),n.insertChildBefore(s,{type:"interpolation",sourceSpan:new h(i,a),children:p.length===0?[]:[{type:"text",value:p,sourceSpan:new h(i.moveBy(2),a.moveBy(-2))}]});}n.removeChild(s);}});}function Ja(t,e){t.walk(r=>{let n=r.$children;if(!n)return;if(n.length===0||n.length===1&&n[0].type==="text"&&O$1.trim(n[0].value).length===0){r.hasDanglingSpaces=n.length>0,r.$children=[];return}let s=Hn$1(r,e),i=Ar$1(r);if(!s)for(let a=0;a<n.length;a++){let o=n[a];if(o.type!=="text")continue;let{leadingWhitespace:u,text:p,trailingWhitespace:l}=Mn$1(o.value),m=o.prev,f=o.next;p?(o.value=p,o.sourceSpan=new h(o.sourceSpan.start.moveBy(u.length),o.sourceSpan.end.moveBy(-l.length)),u&&(m&&(m.hasTrailingSpaces=true),o.hasLeadingSpaces=true),l&&(o.hasTrailingSpaces=true,f&&(f.hasLeadingSpaces=true))):(r.removeChild(o),a--,(u||l)&&(m&&(m.hasTrailingSpaces=true),f&&(f.hasLeadingSpaces=true)));}r.isWhitespaceSensitive=s,r.isIndentationSensitive=i;});}function Za(t){t.walk(e=>{e.isSelfClosing=!e.children||e.type==="element"&&(e.tagDefinition.isVoid||e.endSourceSpan&&e.startSourceSpan.start===e.endSourceSpan.start&&e.startSourceSpan.end===e.endSourceSpan.end);});}function eo$1(t,e){t.walk(r=>{r.type==="element"&&(r.hasHtmComponentClosingTag=r.endSourceSpan&&/^<\s*\/\s*\/\s*>$/u.test(e.originalText.slice(r.endSourceSpan.start.offset,r.endSourceSpan.end.offset)));});}function to$1(t,e){t.walk(r=>{r.cssDisplay=Qn$1(r,e);});}function ro$1(t,e){t.walk(r=>{let{children:n}=r;if(n){if(n.length===0){r.isDanglingSpaceSensitive=Wn$1(r,e);return}for(let s of n)s.isLeadingSpaceSensitive=Vn$1(s,e),s.isTrailingSpaceSensitive=Un$1(s,e);for(let s=0;s<n.length;s++){let i=n[s];i.isLeadingSpaceSensitive=(s===0||i.prev.isTrailingSpaceSensitive)&&i.isLeadingSpaceSensitive,i.isTrailingSpaceSensitive=(s===n.length-1||i.next.isLeadingSpaceSensitive)&&i.isTrailingSpaceSensitive;}}});}var Ms=Ga;function no$1(t,e,r){let{node:n}=t;switch(n.type){case "front-matter":return B$1(n.raw);case "root":return e.__onHtmlRoot&&e.__onHtmlRoot(n),[E(Re$1(t,e,r)),S$1];case "element":case "ieConditionalComment":return Is(t,e,r);case "angularControlFlowBlock":return Bs(t,e,r);case "angularControlFlowBlockParameters":return Fs(t,e,r);case "angularControlFlowBlockParameter":return O$1.trim(n.expression);case "angularLetDeclaration":return E(["@let ",E([n.id," =",E(k$1([_$1,r("init")]))]),";"]);case "angularLetDeclarationInitializer":return n.value;case "angularIcuExpression":return Ps(t,e,r);case "angularIcuCase":return Ns(t,e,r);case "ieConditionalStartComment":case "ieConditionalEndComment":return [De$1(n),Se$1(n)];case "interpolation":return [De$1(n,e),...t.map(r,"children"),Se$1(n,e)];case "text":{if(n.parent.type==="interpolation"){let o=/\n[^\S\n]*$/u,u=o.test(n.value),p=u?n.value.replace(o,""):n.value;return [B$1(p),u?S$1:""]}let s=z$1(n,e),i=kt$1(n),a=G$1(n,e);return i[0]=[s,i[0]],i.push([i.pop(),a]),vt$1(i)}case "docType":return [E([De$1(n,e)," ",w$1(false,n.value.replace(/^html\b/iu,"html"),/\s+/gu," ")]),Se$1(n,e)];case "comment":return [z$1(n,e),B$1(e.originalText.slice(J$1(n),se$1(n))),G$1(n,e)];case "attribute":{if(n.value===null)return n.rawName;let s=wr$1(n.value),i=_n$1(s,'"');return [n.rawName,"=",i,B$1(i==='"'?w$1(false,s,'"',"&quot;"):w$1(false,s,"'","&apos;")),i]}case "cdata":default:throw new An$1(n,"HTML")}}var so$1={preprocess:Ms,print:no$1,insertPragma:Ts,massageAstNode:vn$1,embed:Ss,getVisitorKeys:As},qs=so$1;var Hs=[{name:"Angular",type:"markup",extensions:[".component.html"],tmScope:"text.html.basic",aceMode:"html",aliases:["xhtml"],codemirrorMode:"htmlmixed",codemirrorMimeType:"text/html",parsers:["angular"],vscodeLanguageIds:["html"],filenames:[],linguistLanguageId:146},{name:"HTML",type:"markup",extensions:[".html",".hta",".htm",".html.hl",".inc",".xht",".xhtml"],tmScope:"text.html.basic",aceMode:"html",aliases:["xhtml"],codemirrorMode:"htmlmixed",codemirrorMimeType:"text/html",parsers:["html"],vscodeLanguageIds:["html"],linguistLanguageId:146},{name:"Lightning Web Components",type:"markup",extensions:[],tmScope:"text.html.basic",aceMode:"html",aliases:["xhtml"],codemirrorMode:"htmlmixed",codemirrorMimeType:"text/html",parsers:["lwc"],vscodeLanguageIds:["html"],filenames:[],linguistLanguageId:146},{name:"MJML",type:"markup",extensions:[".mjml"],tmScope:"text.mjml.basic",aceMode:"html",aliases:["MJML","mjml"],codemirrorMode:"htmlmixed",codemirrorMimeType:"text/html",parsers:["mjml"],filenames:[],vscodeLanguageIds:["mjml"],linguistLanguageId:146},{name:"Vue",type:"markup",extensions:[".vue"],tmScope:"source.vue",aceMode:"html",parsers:["vue"],vscodeLanguageIds:["vue"],linguistLanguageId:391}];var Lr$1={bracketSameLine:{category:"Common",type:"boolean",default:false,description:"Put > of opening tags on the last line instead of on a new line."},singleAttributePerLine:{category:"Common",type:"boolean",default:false,description:"Enforce single attribute per line in HTML, Vue and JSX."}};var Vs="HTML",io$1={bracketSameLine:Lr$1.bracketSameLine,htmlWhitespaceSensitivity:{category:Vs,type:"choice",default:"css",description:"How to handle whitespaces in HTML.",choices:[{value:"css",description:"Respect the default value of CSS display property."},{value:"strict",description:"Whitespaces are considered sensitive."},{value:"ignore",description:"Whitespaces are considered insensitive."}]},singleAttributePerLine:Lr$1.singleAttributePerLine,vueIndentScriptAndStyle:{category:Vs,type:"boolean",default:false,description:"Indent script and style tags in Vue files."}},Us=io$1;var tn$1={};ln$1(tn$1,{angular:()=>iu$1,html:()=>ru$1,lwc:()=>ou$1,mjml:()=>su$1,vue:()=>au$1});var Ws;(function(t){t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom";})(Ws||(Ws={}));var Gs;(function(t){t[t.OnPush=0]="OnPush",t[t.Default=1]="Default";})(Gs||(Gs={}));var zs;(function(t){t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform";})(zs||(zs={}));var Fr$1={name:"custom-elements"},Pr$1={name:"no-errors-schema"};var Z$1;(function(t){t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL";})(Z$1||(Z$1={}));var Ys;(function(t){t[t.Error=0]="Error",t[t.Warning=1]="Warning",t[t.Ignore=2]="Ignore";})(Ys||(Ys={}));var N$1;(function(t){t[t.RAW_TEXT=0]="RAW_TEXT",t[t.ESCAPABLE_RAW_TEXT=1]="ESCAPABLE_RAW_TEXT",t[t.PARSABLE_DATA=2]="PARSABLE_DATA";})(N$1||(N$1={}));function ct$1(t,e=true){if(t[0]!=":")return [null,t];let r=t.indexOf(":",1);if(r===-1){if(e)throw new Error(`Unsupported format "${t}" expecting ":namespace:name"`);return [null,t]}return [t.slice(1,r),t.slice(r+1)]}function Nr$1(t){return ct$1(t)[1]==="ng-container"}function Ir$1(t){return ct$1(t)[1]==="ng-content"}function Me$1(t){return t===null?null:ct$1(t)[0]}function qe$1(t,e){return t?`:${t}:${e}`:e}var Ht$1;function Rr$1(){return Ht$1||(Ht$1={},qt$1(Z$1.HTML,["iframe|srcdoc","*|innerHTML","*|outerHTML"]),qt$1(Z$1.STYLE,["*|style"]),qt$1(Z$1.URL,["*|formAction","area|href","area|ping","audio|src","a|href","a|ping","blockquote|cite","body|background","del|cite","form|action","img|src","input|src","ins|cite","q|cite","source|src","track|src","video|poster","video|src"]),qt$1(Z$1.RESOURCE_URL,["applet|code","applet|codebase","base|href","embed|src","frame|src","head|profile","html|manifest","iframe|src","link|href","media|src","object|codebase","object|data","script|src"])),Ht$1}function qt$1(t,e){for(let r of e)Ht$1[r.toLowerCase()]=t;}var Vt$1=class Vt{};var ao$1="boolean",oo$1="number",uo$1="string",lo$1="object",co$1=["[Element]|textContent,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColSpan,%ariaCurrent,%ariaDescription,%ariaDisabled,%ariaExpanded,%ariaHasPopup,%ariaHidden,%ariaKeyShortcuts,%ariaLabel,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored","[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,!inert,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy","abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy","media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume",":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex",":svg:graphics^:svg:|",":svg:animation^:svg:|*begin,*end,*repeat",":svg:geometry^:svg:|",":svg:componentTransferFunction^:svg:|",":svg:gradient^:svg:|",":svg:textContent^:svg:graphics|",":svg:textPositioning^:svg:textContent|","a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username","area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username","audio^media|","br^[HTMLElement]|clear","base^[HTMLElement]|href,target","body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink","button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value","canvas^[HTMLElement]|#height,#width","content^[HTMLElement]|select","dl^[HTMLElement]|!compact","data^[HTMLElement]|value","datalist^[HTMLElement]|","details^[HTMLElement]|!open","dialog^[HTMLElement]|!open,returnValue","dir^[HTMLElement]|!compact","div^[HTMLElement]|align","embed^[HTMLElement]|align,height,name,src,type,width","fieldset^[HTMLElement]|!disabled,name","font^[HTMLElement]|color,face,size","form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target","frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src","frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows","hr^[HTMLElement]|align,color,!noShade,size,width","head^[HTMLElement]|","h1,h2,h3,h4,h5,h6^[HTMLElement]|align","html^[HTMLElement]|version","iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width","img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width","input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width","li^[HTMLElement]|type,#value","label^[HTMLElement]|htmlFor","legend^[HTMLElement]|align","link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type","map^[HTMLElement]|name","marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width","menu^[HTMLElement]|!compact","meta^[HTMLElement]|content,httpEquiv,media,name,scheme","meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value","ins,del^[HTMLElement]|cite,dateTime","ol^[HTMLElement]|!compact,!reversed,#start,type","object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width","optgroup^[HTMLElement]|!disabled,label","option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value","output^[HTMLElement]|defaultValue,%htmlFor,name,value","p^[HTMLElement]|align","param^[HTMLElement]|name,type,value,valueType","picture^[HTMLElement]|","pre^[HTMLElement]|#width","progress^[HTMLElement]|#max,#value","q,blockquote,cite^[HTMLElement]|","script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type","select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value","slot^[HTMLElement]|name","source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width","span^[HTMLElement]|","style^[HTMLElement]|!disabled,media,type","caption^[HTMLElement]|align","th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width","col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width","table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width","tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign","tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign","template^[HTMLElement]|","textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap","time^[HTMLElement]|dateTime","title^[HTMLElement]|text","track^[HTMLElement]|!default,kind,label,src,srclang","ul^[HTMLElement]|!compact,type","unknown^[HTMLElement]|","video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width",":svg:a^:svg:graphics|",":svg:animate^:svg:animation|",":svg:animateMotion^:svg:animation|",":svg:animateTransform^:svg:animation|",":svg:circle^:svg:geometry|",":svg:clipPath^:svg:graphics|",":svg:defs^:svg:graphics|",":svg:desc^:svg:|",":svg:discard^:svg:|",":svg:ellipse^:svg:geometry|",":svg:feBlend^:svg:|",":svg:feColorMatrix^:svg:|",":svg:feComponentTransfer^:svg:|",":svg:feComposite^:svg:|",":svg:feConvolveMatrix^:svg:|",":svg:feDiffuseLighting^:svg:|",":svg:feDisplacementMap^:svg:|",":svg:feDistantLight^:svg:|",":svg:feDropShadow^:svg:|",":svg:feFlood^:svg:|",":svg:feFuncA^:svg:componentTransferFunction|",":svg:feFuncB^:svg:componentTransferFunction|",":svg:feFuncG^:svg:componentTransferFunction|",":svg:feFuncR^:svg:componentTransferFunction|",":svg:feGaussianBlur^:svg:|",":svg:feImage^:svg:|",":svg:feMerge^:svg:|",":svg:feMergeNode^:svg:|",":svg:feMorphology^:svg:|",":svg:feOffset^:svg:|",":svg:fePointLight^:svg:|",":svg:feSpecularLighting^:svg:|",":svg:feSpotLight^:svg:|",":svg:feTile^:svg:|",":svg:feTurbulence^:svg:|",":svg:filter^:svg:|",":svg:foreignObject^:svg:graphics|",":svg:g^:svg:graphics|",":svg:image^:svg:graphics|decoding",":svg:line^:svg:geometry|",":svg:linearGradient^:svg:gradient|",":svg:mpath^:svg:|",":svg:marker^:svg:|",":svg:mask^:svg:|",":svg:metadata^:svg:|",":svg:path^:svg:geometry|",":svg:pattern^:svg:|",":svg:polygon^:svg:geometry|",":svg:polyline^:svg:geometry|",":svg:radialGradient^:svg:gradient|",":svg:rect^:svg:geometry|",":svg:svg^:svg:graphics|#currentScale,#zoomAndPan",":svg:script^:svg:|type",":svg:set^:svg:animation|",":svg:stop^:svg:|",":svg:style^:svg:|!disabled,media,title,type",":svg:switch^:svg:graphics|",":svg:symbol^:svg:|",":svg:tspan^:svg:textPositioning|",":svg:text^:svg:textPositioning|",":svg:textPath^:svg:textContent|",":svg:title^:svg:|",":svg:use^:svg:graphics|",":svg:view^:svg:|#zoomAndPan","data^[HTMLElement]|value","keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name","menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default","summary^[HTMLElement]|","time^[HTMLElement]|dateTime",":svg:cursor^:svg:|",":math:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforeinput,*beforematch,*beforetoggle,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contentvisibilityautostatechange,*contextlost,*contextmenu,*contextrestored,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*scrollend,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex",":math:math^:math:|",":math:maction^:math:|",":math:menclose^:math:|",":math:merror^:math:|",":math:mfenced^:math:|",":math:mfrac^:math:|",":math:mi^:math:|",":math:mmultiscripts^:math:|",":math:mn^:math:|",":math:mo^:math:|",":math:mover^:math:|",":math:mpadded^:math:|",":math:mphantom^:math:|",":math:mroot^:math:|",":math:mrow^:math:|",":math:ms^:math:|",":math:mspace^:math:|",":math:msqrt^:math:|",":math:mstyle^:math:|",":math:msub^:math:|",":math:msubsup^:math:|",":math:msup^:math:|",":math:mtable^:math:|",":math:mtd^:math:|",":math:mtext^:math:|",":math:mtr^:math:|",":math:munder^:math:|",":math:munderover^:math:|",":math:semantics^:math:|"],js=new Map(Object.entries({class:"className",for:"htmlFor",formaction:"formAction",innerHtml:"innerHTML",readonly:"readOnly",tabindex:"tabIndex"})),po$1=Array.from(js).reduce((t,[e,r])=>(t.set(e,r),t),new Map),Ut$1=class Ut extends Vt$1{constructor(){super(),this._schema=new Map,this._eventSchema=new Map,co$1.forEach(e=>{let r=new Map,n=new Set,[s,i]=e.split("|"),a=i.split(","),[o,u]=s.split("^");o.split(",").forEach(l=>{this._schema.set(l.toLowerCase(),r),this._eventSchema.set(l.toLowerCase(),n);});let p=u&&this._schema.get(u.toLowerCase());if(p){for(let[l,m]of p)r.set(l,m);for(let l of this._eventSchema.get(u.toLowerCase()))n.add(l);}a.forEach(l=>{if(l.length>0)switch(l[0]){case "*":n.add(l.substring(1));break;case "!":r.set(l.substring(1),ao$1);break;case "#":r.set(l.substring(1),oo$1);break;case "%":r.set(l.substring(1),lo$1);break;default:r.set(l,uo$1);}});});}hasProperty(e,r,n){if(n.some(i=>i.name===Pr$1.name))return  true;if(e.indexOf("-")>-1){if(Nr$1(e)||Ir$1(e))return  false;if(n.some(i=>i.name===Fr$1.name))return  true}return (this._schema.get(e.toLowerCase())||this._schema.get("unknown")).has(r)}hasElement(e,r){return r.some(n=>n.name===Pr$1.name)||e.indexOf("-")>-1&&(Nr$1(e)||Ir$1(e)||r.some(n=>n.name===Fr$1.name))?true:this._schema.has(e.toLowerCase())}securityContext(e,r,n){n&&(r=this.getMappedPropName(r)),e=e.toLowerCase(),r=r.toLowerCase();let s=Rr$1()[e+"|"+r];return s||(s=Rr$1()["*|"+r],s||Z$1.NONE)}getMappedPropName(e){return js.get(e)??e}getDefaultComponentElementName(){return "ng-component"}validateProperty(e){return e.toLowerCase().startsWith("on")?{error:true,msg:`Binding to event property '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...
If '${e}' is a directive input, make sure the directive is imported by the current module.`}:{error:false}}validateAttribute(e){return e.toLowerCase().startsWith("on")?{error:true,msg:`Binding to event attribute '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...`}:{error:false}}allKnownElementNames(){return Array.from(this._schema.keys())}allKnownAttributesOfElement(e){let r=this._schema.get(e.toLowerCase())||this._schema.get("unknown");return Array.from(r.keys()).map(n=>po$1.get(n)??n)}allKnownEventsOfElement(e){return Array.from(this._eventSchema.get(e.toLowerCase())??[])}normalizeAnimationStyleProperty(e){return Os(e)}normalizeAnimationStyleValue(e,r,n){let s="",i=n.toString().trim(),a=null;if(ho(e)&&n!==0&&n!=="0")if(typeof n=="number")s="px";else {let o=n.match(/^[+-]?[\d\.]+([a-z]*)$/);o&&o[1].length==0&&(a=`Please provide a CSS unit value for ${r}:${n}`);}return {error:a,value:i+s}}};function ho(t){switch(t){case "width":case "height":case "minWidth":case "minHeight":case "maxWidth":case "maxHeight":case "left":case "top":case "bottom":case "right":case "fontSize":case "outlineWidth":case "outlineOffset":case "paddingTop":case "paddingLeft":case "paddingBottom":case "paddingRight":case "marginTop":case "marginLeft":case "marginBottom":case "marginRight":case "borderRadius":case "borderWidth":case "borderTopWidth":case "borderLeftWidth":case "borderRightWidth":case "borderBottomWidth":case "textIndent":return  true;default:return  false}}var d=class{constructor({closedByChildren:e,implicitNamespacePrefix:r,contentType:n=N$1.PARSABLE_DATA,closedByParent:s=false,isVoid:i=false,ignoreFirstLf:a=false,preventNamespaceInheritance:o=false,canSelfClose:u=false}={}){this.closedByChildren={},this.closedByParent=false,e&&e.length>0&&e.forEach(p=>this.closedByChildren[p]=true),this.isVoid=i,this.closedByParent=s||i,this.implicitNamespacePrefix=r||null,this.contentType=n,this.ignoreFirstLf=a,this.preventNamespaceInheritance=o,this.canSelfClose=u??i;}isClosedByChild(e){return this.isVoid||e.toLowerCase()in this.closedByChildren}getContentType(e){return typeof this.contentType=="object"?(e===void 0?void 0:this.contentType[e])??this.contentType.default:this.contentType}},Ks,pt$1;function He$1(t){return pt$1||(Ks=new d({canSelfClose:true}),pt$1=Object.assign(Object.create(null),{base:new d({isVoid:true}),meta:new d({isVoid:true}),area:new d({isVoid:true}),embed:new d({isVoid:true}),link:new d({isVoid:true}),img:new d({isVoid:true}),input:new d({isVoid:true}),param:new d({isVoid:true}),hr:new d({isVoid:true}),br:new d({isVoid:true}),source:new d({isVoid:true}),track:new d({isVoid:true}),wbr:new d({isVoid:true}),p:new d({closedByChildren:["address","article","aside","blockquote","div","dl","fieldset","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","main","nav","ol","p","pre","section","table","ul"],closedByParent:true}),thead:new d({closedByChildren:["tbody","tfoot"]}),tbody:new d({closedByChildren:["tbody","tfoot"],closedByParent:true}),tfoot:new d({closedByChildren:["tbody"],closedByParent:true}),tr:new d({closedByChildren:["tr"],closedByParent:true}),td:new d({closedByChildren:["td","th"],closedByParent:true}),th:new d({closedByChildren:["td","th"],closedByParent:true}),col:new d({isVoid:true}),svg:new d({implicitNamespacePrefix:"svg"}),foreignObject:new d({implicitNamespacePrefix:"svg",preventNamespaceInheritance:true}),math:new d({implicitNamespacePrefix:"math"}),li:new d({closedByChildren:["li"],closedByParent:true}),dt:new d({closedByChildren:["dt","dd"]}),dd:new d({closedByChildren:["dt","dd"],closedByParent:true}),rb:new d({closedByChildren:["rb","rt","rtc","rp"],closedByParent:true}),rt:new d({closedByChildren:["rb","rt","rtc","rp"],closedByParent:true}),rtc:new d({closedByChildren:["rb","rtc","rp"],closedByParent:true}),rp:new d({closedByChildren:["rb","rt","rtc","rp"],closedByParent:true}),optgroup:new d({closedByChildren:["optgroup"],closedByParent:true}),option:new d({closedByChildren:["option","optgroup"],closedByParent:true}),pre:new d({ignoreFirstLf:true}),listing:new d({ignoreFirstLf:true}),style:new d({contentType:N$1.RAW_TEXT}),script:new d({contentType:N$1.RAW_TEXT}),title:new d({contentType:{default:N$1.ESCAPABLE_RAW_TEXT,svg:N$1.PARSABLE_DATA}}),textarea:new d({contentType:N$1.ESCAPABLE_RAW_TEXT,ignoreFirstLf:true})}),new Ut$1().allKnownElementNames().forEach(e=>{!pt$1[e]&&Me$1(e)===null&&(pt$1[e]=new d({canSelfClose:false}));})),pt$1[t]??Ks}var ae$1=class ae{constructor(e,r){this.sourceSpan=e,this.i18n=r;}},Wt$1=class Wt extends ae$1{constructor(e,r,n,s){super(r,s),this.value=e,this.tokens=n,this.type="text";}visit(e,r){return e.visitText(this,r)}},Gt$1=class Gt extends ae$1{constructor(e,r,n,s){super(r,s),this.value=e,this.tokens=n,this.type="cdata";}visit(e,r){return e.visitCdata(this,r)}},zt$1=class zt extends ae$1{constructor(e,r,n,s,i,a){super(s,a),this.switchValue=e,this.type=r,this.cases=n,this.switchValueSourceSpan=i;}visit(e,r){return e.visitExpansion(this,r)}},Yt$1=class Yt{constructor(e,r,n,s,i){this.value=e,this.expression=r,this.sourceSpan=n,this.valueSourceSpan=s,this.expSourceSpan=i,this.type="expansionCase";}visit(e,r){return e.visitExpansionCase(this,r)}},jt$1=class jt extends ae$1{constructor(e,r,n,s,i,a,o){super(n,o),this.name=e,this.value=r,this.keySpan=s,this.valueSpan=i,this.valueTokens=a,this.type="attribute";}visit(e,r){return e.visitAttribute(this,r)}get nameSpan(){return this.keySpan}},Y$1=class Y extends ae$1{constructor(e,r,n,s,i,a=null,o=null,u){super(s,u),this.name=e,this.attrs=r,this.children=n,this.startSourceSpan=i,this.endSourceSpan=a,this.nameSpan=o,this.type="element";}visit(e,r){return e.visitElement(this,r)}},Kt$1=class Kt{constructor(e,r){this.value=e,this.sourceSpan=r,this.type="comment";}visit(e,r){return e.visitComment(this,r)}},Xt$1=class Xt{constructor(e,r){this.value=e,this.sourceSpan=r,this.type="docType";}visit(e,r){return e.visitDocType(this,r)}},ee$1=class ee extends ae$1{constructor(e,r,n,s,i,a,o=null,u){super(s,u),this.name=e,this.parameters=r,this.children=n,this.nameSpan=i,this.startSourceSpan=a,this.endSourceSpan=o,this.type="block";}visit(e,r){return e.visitBlock(this,r)}},ht$1=class ht{constructor(e,r){this.expression=e,this.sourceSpan=r,this.type="blockParameter",this.startSourceSpan=null,this.endSourceSpan=null;}visit(e,r){return e.visitBlockParameter(this,r)}},mt$1=class mt{constructor(e,r,n,s,i){this.name=e,this.value=r,this.sourceSpan=n,this.nameSpan=s,this.valueSpan=i,this.type="letDeclaration",this.startSourceSpan=null,this.endSourceSpan=null;}visit(e,r){return e.visitLetDeclaration(this,r)}};function Qt$1(t,e,r=null){let n=[],s=t.visit?i=>t.visit(i,r)||i.visit(t,r):i=>i.visit(t,r);return e.forEach(i=>{let a=s(i);a&&n.push(a);}),n}var ft$1=class ft{constructor(){}visitElement(e,r){this.visitChildren(r,n=>{n(e.attrs),n(e.children);});}visitAttribute(e,r){}visitText(e,r){}visitCdata(e,r){}visitComment(e,r){}visitDocType(e,r){}visitExpansion(e,r){return this.visitChildren(r,n=>{n(e.cases);})}visitExpansionCase(e,r){}visitBlock(e,r){this.visitChildren(r,n=>{n(e.parameters),n(e.children);});}visitBlockParameter(e,r){}visitLetDeclaration(e,r){}visitChildren(e,r){let n=[],s=this;function i(a){a&&n.push(Qt$1(s,a,e));}return r(i),Array.prototype.concat.apply([],n)}};var Ve$1={AElig:"\xC6",AMP:"&",amp:"&",Aacute:"\xC1",Abreve:"\u0102",Acirc:"\xC2",Acy:"\u0410",Afr:"\u{1D504}",Agrave:"\xC0",Alpha:"\u0391",Amacr:"\u0100",And:"\u2A53",Aogon:"\u0104",Aopf:"\u{1D538}",ApplyFunction:"\u2061",af:"\u2061",Aring:"\xC5",angst:"\xC5",Ascr:"\u{1D49C}",Assign:"\u2254",colone:"\u2254",coloneq:"\u2254",Atilde:"\xC3",Auml:"\xC4",Backslash:"\u2216",setminus:"\u2216",setmn:"\u2216",smallsetminus:"\u2216",ssetmn:"\u2216",Barv:"\u2AE7",Barwed:"\u2306",doublebarwedge:"\u2306",Bcy:"\u0411",Because:"\u2235",becaus:"\u2235",because:"\u2235",Bernoullis:"\u212C",Bscr:"\u212C",bernou:"\u212C",Beta:"\u0392",Bfr:"\u{1D505}",Bopf:"\u{1D539}",Breve:"\u02D8",breve:"\u02D8",Bumpeq:"\u224E",HumpDownHump:"\u224E",bump:"\u224E",CHcy:"\u0427",COPY:"\xA9",copy:"\xA9",Cacute:"\u0106",Cap:"\u22D2",CapitalDifferentialD:"\u2145",DD:"\u2145",Cayleys:"\u212D",Cfr:"\u212D",Ccaron:"\u010C",Ccedil:"\xC7",Ccirc:"\u0108",Cconint:"\u2230",Cdot:"\u010A",Cedilla:"\xB8",cedil:"\xB8",CenterDot:"\xB7",centerdot:"\xB7",middot:"\xB7",Chi:"\u03A7",CircleDot:"\u2299",odot:"\u2299",CircleMinus:"\u2296",ominus:"\u2296",CirclePlus:"\u2295",oplus:"\u2295",CircleTimes:"\u2297",otimes:"\u2297",ClockwiseContourIntegral:"\u2232",cwconint:"\u2232",CloseCurlyDoubleQuote:"\u201D",rdquo:"\u201D",rdquor:"\u201D",CloseCurlyQuote:"\u2019",rsquo:"\u2019",rsquor:"\u2019",Colon:"\u2237",Proportion:"\u2237",Colone:"\u2A74",Congruent:"\u2261",equiv:"\u2261",Conint:"\u222F",DoubleContourIntegral:"\u222F",ContourIntegral:"\u222E",conint:"\u222E",oint:"\u222E",Copf:"\u2102",complexes:"\u2102",Coproduct:"\u2210",coprod:"\u2210",CounterClockwiseContourIntegral:"\u2233",awconint:"\u2233",Cross:"\u2A2F",Cscr:"\u{1D49E}",Cup:"\u22D3",CupCap:"\u224D",asympeq:"\u224D",DDotrahd:"\u2911",DJcy:"\u0402",DScy:"\u0405",DZcy:"\u040F",Dagger:"\u2021",ddagger:"\u2021",Darr:"\u21A1",Dashv:"\u2AE4",DoubleLeftTee:"\u2AE4",Dcaron:"\u010E",Dcy:"\u0414",Del:"\u2207",nabla:"\u2207",Delta:"\u0394",Dfr:"\u{1D507}",DiacriticalAcute:"\xB4",acute:"\xB4",DiacriticalDot:"\u02D9",dot:"\u02D9",DiacriticalDoubleAcute:"\u02DD",dblac:"\u02DD",DiacriticalGrave:"`",grave:"`",DiacriticalTilde:"\u02DC",tilde:"\u02DC",Diamond:"\u22C4",diam:"\u22C4",diamond:"\u22C4",DifferentialD:"\u2146",dd:"\u2146",Dopf:"\u{1D53B}",Dot:"\xA8",DoubleDot:"\xA8",die:"\xA8",uml:"\xA8",DotDot:"\u20DC",DotEqual:"\u2250",doteq:"\u2250",esdot:"\u2250",DoubleDownArrow:"\u21D3",Downarrow:"\u21D3",dArr:"\u21D3",DoubleLeftArrow:"\u21D0",Leftarrow:"\u21D0",lArr:"\u21D0",DoubleLeftRightArrow:"\u21D4",Leftrightarrow:"\u21D4",hArr:"\u21D4",iff:"\u21D4",DoubleLongLeftArrow:"\u27F8",Longleftarrow:"\u27F8",xlArr:"\u27F8",DoubleLongLeftRightArrow:"\u27FA",Longleftrightarrow:"\u27FA",xhArr:"\u27FA",DoubleLongRightArrow:"\u27F9",Longrightarrow:"\u27F9",xrArr:"\u27F9",DoubleRightArrow:"\u21D2",Implies:"\u21D2",Rightarrow:"\u21D2",rArr:"\u21D2",DoubleRightTee:"\u22A8",vDash:"\u22A8",DoubleUpArrow:"\u21D1",Uparrow:"\u21D1",uArr:"\u21D1",DoubleUpDownArrow:"\u21D5",Updownarrow:"\u21D5",vArr:"\u21D5",DoubleVerticalBar:"\u2225",par:"\u2225",parallel:"\u2225",shortparallel:"\u2225",spar:"\u2225",DownArrow:"\u2193",ShortDownArrow:"\u2193",darr:"\u2193",downarrow:"\u2193",DownArrowBar:"\u2913",DownArrowUpArrow:"\u21F5",duarr:"\u21F5",DownBreve:"\u0311",DownLeftRightVector:"\u2950",DownLeftTeeVector:"\u295E",DownLeftVector:"\u21BD",leftharpoondown:"\u21BD",lhard:"\u21BD",DownLeftVectorBar:"\u2956",DownRightTeeVector:"\u295F",DownRightVector:"\u21C1",rhard:"\u21C1",rightharpoondown:"\u21C1",DownRightVectorBar:"\u2957",DownTee:"\u22A4",top:"\u22A4",DownTeeArrow:"\u21A7",mapstodown:"\u21A7",Dscr:"\u{1D49F}",Dstrok:"\u0110",ENG:"\u014A",ETH:"\xD0",Eacute:"\xC9",Ecaron:"\u011A",Ecirc:"\xCA",Ecy:"\u042D",Edot:"\u0116",Efr:"\u{1D508}",Egrave:"\xC8",Element:"\u2208",in:"\u2208",isin:"\u2208",isinv:"\u2208",Emacr:"\u0112",EmptySmallSquare:"\u25FB",EmptyVerySmallSquare:"\u25AB",Eogon:"\u0118",Eopf:"\u{1D53C}",Epsilon:"\u0395",Equal:"\u2A75",EqualTilde:"\u2242",eqsim:"\u2242",esim:"\u2242",Equilibrium:"\u21CC",rightleftharpoons:"\u21CC",rlhar:"\u21CC",Escr:"\u2130",expectation:"\u2130",Esim:"\u2A73",Eta:"\u0397",Euml:"\xCB",Exists:"\u2203",exist:"\u2203",ExponentialE:"\u2147",ee:"\u2147",exponentiale:"\u2147",Fcy:"\u0424",Ffr:"\u{1D509}",FilledSmallSquare:"\u25FC",FilledVerySmallSquare:"\u25AA",blacksquare:"\u25AA",squarf:"\u25AA",squf:"\u25AA",Fopf:"\u{1D53D}",ForAll:"\u2200",forall:"\u2200",Fouriertrf:"\u2131",Fscr:"\u2131",GJcy:"\u0403",GT:">",gt:">",Gamma:"\u0393",Gammad:"\u03DC",Gbreve:"\u011E",Gcedil:"\u0122",Gcirc:"\u011C",Gcy:"\u0413",Gdot:"\u0120",Gfr:"\u{1D50A}",Gg:"\u22D9",ggg:"\u22D9",Gopf:"\u{1D53E}",GreaterEqual:"\u2265",ge:"\u2265",geq:"\u2265",GreaterEqualLess:"\u22DB",gel:"\u22DB",gtreqless:"\u22DB",GreaterFullEqual:"\u2267",gE:"\u2267",geqq:"\u2267",GreaterGreater:"\u2AA2",GreaterLess:"\u2277",gl:"\u2277",gtrless:"\u2277",GreaterSlantEqual:"\u2A7E",geqslant:"\u2A7E",ges:"\u2A7E",GreaterTilde:"\u2273",gsim:"\u2273",gtrsim:"\u2273",Gscr:"\u{1D4A2}",Gt:"\u226B",NestedGreaterGreater:"\u226B",gg:"\u226B",HARDcy:"\u042A",Hacek:"\u02C7",caron:"\u02C7",Hat:"^",Hcirc:"\u0124",Hfr:"\u210C",Poincareplane:"\u210C",HilbertSpace:"\u210B",Hscr:"\u210B",hamilt:"\u210B",Hopf:"\u210D",quaternions:"\u210D",HorizontalLine:"\u2500",boxh:"\u2500",Hstrok:"\u0126",HumpEqual:"\u224F",bumpe:"\u224F",bumpeq:"\u224F",IEcy:"\u0415",IJlig:"\u0132",IOcy:"\u0401",Iacute:"\xCD",Icirc:"\xCE",Icy:"\u0418",Idot:"\u0130",Ifr:"\u2111",Im:"\u2111",image:"\u2111",imagpart:"\u2111",Igrave:"\xCC",Imacr:"\u012A",ImaginaryI:"\u2148",ii:"\u2148",Int:"\u222C",Integral:"\u222B",int:"\u222B",Intersection:"\u22C2",bigcap:"\u22C2",xcap:"\u22C2",InvisibleComma:"\u2063",ic:"\u2063",InvisibleTimes:"\u2062",it:"\u2062",Iogon:"\u012E",Iopf:"\u{1D540}",Iota:"\u0399",Iscr:"\u2110",imagline:"\u2110",Itilde:"\u0128",Iukcy:"\u0406",Iuml:"\xCF",Jcirc:"\u0134",Jcy:"\u0419",Jfr:"\u{1D50D}",Jopf:"\u{1D541}",Jscr:"\u{1D4A5}",Jsercy:"\u0408",Jukcy:"\u0404",KHcy:"\u0425",KJcy:"\u040C",Kappa:"\u039A",Kcedil:"\u0136",Kcy:"\u041A",Kfr:"\u{1D50E}",Kopf:"\u{1D542}",Kscr:"\u{1D4A6}",LJcy:"\u0409",LT:"<",lt:"<",Lacute:"\u0139",Lambda:"\u039B",Lang:"\u27EA",Laplacetrf:"\u2112",Lscr:"\u2112",lagran:"\u2112",Larr:"\u219E",twoheadleftarrow:"\u219E",Lcaron:"\u013D",Lcedil:"\u013B",Lcy:"\u041B",LeftAngleBracket:"\u27E8",lang:"\u27E8",langle:"\u27E8",LeftArrow:"\u2190",ShortLeftArrow:"\u2190",larr:"\u2190",leftarrow:"\u2190",slarr:"\u2190",LeftArrowBar:"\u21E4",larrb:"\u21E4",LeftArrowRightArrow:"\u21C6",leftrightarrows:"\u21C6",lrarr:"\u21C6",LeftCeiling:"\u2308",lceil:"\u2308",LeftDoubleBracket:"\u27E6",lobrk:"\u27E6",LeftDownTeeVector:"\u2961",LeftDownVector:"\u21C3",dharl:"\u21C3",downharpoonleft:"\u21C3",LeftDownVectorBar:"\u2959",LeftFloor:"\u230A",lfloor:"\u230A",LeftRightArrow:"\u2194",harr:"\u2194",leftrightarrow:"\u2194",LeftRightVector:"\u294E",LeftTee:"\u22A3",dashv:"\u22A3",LeftTeeArrow:"\u21A4",mapstoleft:"\u21A4",LeftTeeVector:"\u295A",LeftTriangle:"\u22B2",vartriangleleft:"\u22B2",vltri:"\u22B2",LeftTriangleBar:"\u29CF",LeftTriangleEqual:"\u22B4",ltrie:"\u22B4",trianglelefteq:"\u22B4",LeftUpDownVector:"\u2951",LeftUpTeeVector:"\u2960",LeftUpVector:"\u21BF",uharl:"\u21BF",upharpoonleft:"\u21BF",LeftUpVectorBar:"\u2958",LeftVector:"\u21BC",leftharpoonup:"\u21BC",lharu:"\u21BC",LeftVectorBar:"\u2952",LessEqualGreater:"\u22DA",leg:"\u22DA",lesseqgtr:"\u22DA",LessFullEqual:"\u2266",lE:"\u2266",leqq:"\u2266",LessGreater:"\u2276",lessgtr:"\u2276",lg:"\u2276",LessLess:"\u2AA1",LessSlantEqual:"\u2A7D",leqslant:"\u2A7D",les:"\u2A7D",LessTilde:"\u2272",lesssim:"\u2272",lsim:"\u2272",Lfr:"\u{1D50F}",Ll:"\u22D8",Lleftarrow:"\u21DA",lAarr:"\u21DA",Lmidot:"\u013F",LongLeftArrow:"\u27F5",longleftarrow:"\u27F5",xlarr:"\u27F5",LongLeftRightArrow:"\u27F7",longleftrightarrow:"\u27F7",xharr:"\u27F7",LongRightArrow:"\u27F6",longrightarrow:"\u27F6",xrarr:"\u27F6",Lopf:"\u{1D543}",LowerLeftArrow:"\u2199",swarr:"\u2199",swarrow:"\u2199",LowerRightArrow:"\u2198",searr:"\u2198",searrow:"\u2198",Lsh:"\u21B0",lsh:"\u21B0",Lstrok:"\u0141",Lt:"\u226A",NestedLessLess:"\u226A",ll:"\u226A",Map:"\u2905",Mcy:"\u041C",MediumSpace:"\u205F",Mellintrf:"\u2133",Mscr:"\u2133",phmmat:"\u2133",Mfr:"\u{1D510}",MinusPlus:"\u2213",mnplus:"\u2213",mp:"\u2213",Mopf:"\u{1D544}",Mu:"\u039C",NJcy:"\u040A",Nacute:"\u0143",Ncaron:"\u0147",Ncedil:"\u0145",Ncy:"\u041D",NegativeMediumSpace:"\u200B",NegativeThickSpace:"\u200B",NegativeThinSpace:"\u200B",NegativeVeryThinSpace:"\u200B",ZeroWidthSpace:"\u200B",NewLine:`
`,Nfr:"\u{1D511}",NoBreak:"\u2060",NonBreakingSpace:"\xA0",nbsp:"\xA0",Nopf:"\u2115",naturals:"\u2115",Not:"\u2AEC",NotCongruent:"\u2262",nequiv:"\u2262",NotCupCap:"\u226D",NotDoubleVerticalBar:"\u2226",npar:"\u2226",nparallel:"\u2226",nshortparallel:"\u2226",nspar:"\u2226",NotElement:"\u2209",notin:"\u2209",notinva:"\u2209",NotEqual:"\u2260",ne:"\u2260",NotEqualTilde:"\u2242\u0338",nesim:"\u2242\u0338",NotExists:"\u2204",nexist:"\u2204",nexists:"\u2204",NotGreater:"\u226F",ngt:"\u226F",ngtr:"\u226F",NotGreaterEqual:"\u2271",nge:"\u2271",ngeq:"\u2271",NotGreaterFullEqual:"\u2267\u0338",ngE:"\u2267\u0338",ngeqq:"\u2267\u0338",NotGreaterGreater:"\u226B\u0338",nGtv:"\u226B\u0338",NotGreaterLess:"\u2279",ntgl:"\u2279",NotGreaterSlantEqual:"\u2A7E\u0338",ngeqslant:"\u2A7E\u0338",nges:"\u2A7E\u0338",NotGreaterTilde:"\u2275",ngsim:"\u2275",NotHumpDownHump:"\u224E\u0338",nbump:"\u224E\u0338",NotHumpEqual:"\u224F\u0338",nbumpe:"\u224F\u0338",NotLeftTriangle:"\u22EA",nltri:"\u22EA",ntriangleleft:"\u22EA",NotLeftTriangleBar:"\u29CF\u0338",NotLeftTriangleEqual:"\u22EC",nltrie:"\u22EC",ntrianglelefteq:"\u22EC",NotLess:"\u226E",nless:"\u226E",nlt:"\u226E",NotLessEqual:"\u2270",nle:"\u2270",nleq:"\u2270",NotLessGreater:"\u2278",ntlg:"\u2278",NotLessLess:"\u226A\u0338",nLtv:"\u226A\u0338",NotLessSlantEqual:"\u2A7D\u0338",nleqslant:"\u2A7D\u0338",nles:"\u2A7D\u0338",NotLessTilde:"\u2274",nlsim:"\u2274",NotNestedGreaterGreater:"\u2AA2\u0338",NotNestedLessLess:"\u2AA1\u0338",NotPrecedes:"\u2280",npr:"\u2280",nprec:"\u2280",NotPrecedesEqual:"\u2AAF\u0338",npre:"\u2AAF\u0338",npreceq:"\u2AAF\u0338",NotPrecedesSlantEqual:"\u22E0",nprcue:"\u22E0",NotReverseElement:"\u220C",notni:"\u220C",notniva:"\u220C",NotRightTriangle:"\u22EB",nrtri:"\u22EB",ntriangleright:"\u22EB",NotRightTriangleBar:"\u29D0\u0338",NotRightTriangleEqual:"\u22ED",nrtrie:"\u22ED",ntrianglerighteq:"\u22ED",NotSquareSubset:"\u228F\u0338",NotSquareSubsetEqual:"\u22E2",nsqsube:"\u22E2",NotSquareSuperset:"\u2290\u0338",NotSquareSupersetEqual:"\u22E3",nsqsupe:"\u22E3",NotSubset:"\u2282\u20D2",nsubset:"\u2282\u20D2",vnsub:"\u2282\u20D2",NotSubsetEqual:"\u2288",nsube:"\u2288",nsubseteq:"\u2288",NotSucceeds:"\u2281",nsc:"\u2281",nsucc:"\u2281",NotSucceedsEqual:"\u2AB0\u0338",nsce:"\u2AB0\u0338",nsucceq:"\u2AB0\u0338",NotSucceedsSlantEqual:"\u22E1",nsccue:"\u22E1",NotSucceedsTilde:"\u227F\u0338",NotSuperset:"\u2283\u20D2",nsupset:"\u2283\u20D2",vnsup:"\u2283\u20D2",NotSupersetEqual:"\u2289",nsupe:"\u2289",nsupseteq:"\u2289",NotTilde:"\u2241",nsim:"\u2241",NotTildeEqual:"\u2244",nsime:"\u2244",nsimeq:"\u2244",NotTildeFullEqual:"\u2247",ncong:"\u2247",NotTildeTilde:"\u2249",nap:"\u2249",napprox:"\u2249",NotVerticalBar:"\u2224",nmid:"\u2224",nshortmid:"\u2224",nsmid:"\u2224",Nscr:"\u{1D4A9}",Ntilde:"\xD1",Nu:"\u039D",OElig:"\u0152",Oacute:"\xD3",Ocirc:"\xD4",Ocy:"\u041E",Odblac:"\u0150",Ofr:"\u{1D512}",Ograve:"\xD2",Omacr:"\u014C",Omega:"\u03A9",ohm:"\u03A9",Omicron:"\u039F",Oopf:"\u{1D546}",OpenCurlyDoubleQuote:"\u201C",ldquo:"\u201C",OpenCurlyQuote:"\u2018",lsquo:"\u2018",Or:"\u2A54",Oscr:"\u{1D4AA}",Oslash:"\xD8",Otilde:"\xD5",Otimes:"\u2A37",Ouml:"\xD6",OverBar:"\u203E",oline:"\u203E",OverBrace:"\u23DE",OverBracket:"\u23B4",tbrk:"\u23B4",OverParenthesis:"\u23DC",PartialD:"\u2202",part:"\u2202",Pcy:"\u041F",Pfr:"\u{1D513}",Phi:"\u03A6",Pi:"\u03A0",PlusMinus:"\xB1",plusmn:"\xB1",pm:"\xB1",Popf:"\u2119",primes:"\u2119",Pr:"\u2ABB",Precedes:"\u227A",pr:"\u227A",prec:"\u227A",PrecedesEqual:"\u2AAF",pre:"\u2AAF",preceq:"\u2AAF",PrecedesSlantEqual:"\u227C",prcue:"\u227C",preccurlyeq:"\u227C",PrecedesTilde:"\u227E",precsim:"\u227E",prsim:"\u227E",Prime:"\u2033",Product:"\u220F",prod:"\u220F",Proportional:"\u221D",prop:"\u221D",propto:"\u221D",varpropto:"\u221D",vprop:"\u221D",Pscr:"\u{1D4AB}",Psi:"\u03A8",QUOT:'"',quot:'"',Qfr:"\u{1D514}",Qopf:"\u211A",rationals:"\u211A",Qscr:"\u{1D4AC}",RBarr:"\u2910",drbkarow:"\u2910",REG:"\xAE",circledR:"\xAE",reg:"\xAE",Racute:"\u0154",Rang:"\u27EB",Rarr:"\u21A0",twoheadrightarrow:"\u21A0",Rarrtl:"\u2916",Rcaron:"\u0158",Rcedil:"\u0156",Rcy:"\u0420",Re:"\u211C",Rfr:"\u211C",real:"\u211C",realpart:"\u211C",ReverseElement:"\u220B",SuchThat:"\u220B",ni:"\u220B",niv:"\u220B",ReverseEquilibrium:"\u21CB",leftrightharpoons:"\u21CB",lrhar:"\u21CB",ReverseUpEquilibrium:"\u296F",duhar:"\u296F",Rho:"\u03A1",RightAngleBracket:"\u27E9",rang:"\u27E9",rangle:"\u27E9",RightArrow:"\u2192",ShortRightArrow:"\u2192",rarr:"\u2192",rightarrow:"\u2192",srarr:"\u2192",RightArrowBar:"\u21E5",rarrb:"\u21E5",RightArrowLeftArrow:"\u21C4",rightleftarrows:"\u21C4",rlarr:"\u21C4",RightCeiling:"\u2309",rceil:"\u2309",RightDoubleBracket:"\u27E7",robrk:"\u27E7",RightDownTeeVector:"\u295D",RightDownVector:"\u21C2",dharr:"\u21C2",downharpoonright:"\u21C2",RightDownVectorBar:"\u2955",RightFloor:"\u230B",rfloor:"\u230B",RightTee:"\u22A2",vdash:"\u22A2",RightTeeArrow:"\u21A6",map:"\u21A6",mapsto:"\u21A6",RightTeeVector:"\u295B",RightTriangle:"\u22B3",vartriangleright:"\u22B3",vrtri:"\u22B3",RightTriangleBar:"\u29D0",RightTriangleEqual:"\u22B5",rtrie:"\u22B5",trianglerighteq:"\u22B5",RightUpDownVector:"\u294F",RightUpTeeVector:"\u295C",RightUpVector:"\u21BE",uharr:"\u21BE",upharpoonright:"\u21BE",RightUpVectorBar:"\u2954",RightVector:"\u21C0",rharu:"\u21C0",rightharpoonup:"\u21C0",RightVectorBar:"\u2953",Ropf:"\u211D",reals:"\u211D",RoundImplies:"\u2970",Rrightarrow:"\u21DB",rAarr:"\u21DB",Rscr:"\u211B",realine:"\u211B",Rsh:"\u21B1",rsh:"\u21B1",RuleDelayed:"\u29F4",SHCHcy:"\u0429",SHcy:"\u0428",SOFTcy:"\u042C",Sacute:"\u015A",Sc:"\u2ABC",Scaron:"\u0160",Scedil:"\u015E",Scirc:"\u015C",Scy:"\u0421",Sfr:"\u{1D516}",ShortUpArrow:"\u2191",UpArrow:"\u2191",uarr:"\u2191",uparrow:"\u2191",Sigma:"\u03A3",SmallCircle:"\u2218",compfn:"\u2218",Sopf:"\u{1D54A}",Sqrt:"\u221A",radic:"\u221A",Square:"\u25A1",squ:"\u25A1",square:"\u25A1",SquareIntersection:"\u2293",sqcap:"\u2293",SquareSubset:"\u228F",sqsub:"\u228F",sqsubset:"\u228F",SquareSubsetEqual:"\u2291",sqsube:"\u2291",sqsubseteq:"\u2291",SquareSuperset:"\u2290",sqsup:"\u2290",sqsupset:"\u2290",SquareSupersetEqual:"\u2292",sqsupe:"\u2292",sqsupseteq:"\u2292",SquareUnion:"\u2294",sqcup:"\u2294",Sscr:"\u{1D4AE}",Star:"\u22C6",sstarf:"\u22C6",Sub:"\u22D0",Subset:"\u22D0",SubsetEqual:"\u2286",sube:"\u2286",subseteq:"\u2286",Succeeds:"\u227B",sc:"\u227B",succ:"\u227B",SucceedsEqual:"\u2AB0",sce:"\u2AB0",succeq:"\u2AB0",SucceedsSlantEqual:"\u227D",sccue:"\u227D",succcurlyeq:"\u227D",SucceedsTilde:"\u227F",scsim:"\u227F",succsim:"\u227F",Sum:"\u2211",sum:"\u2211",Sup:"\u22D1",Supset:"\u22D1",Superset:"\u2283",sup:"\u2283",supset:"\u2283",SupersetEqual:"\u2287",supe:"\u2287",supseteq:"\u2287",THORN:"\xDE",TRADE:"\u2122",trade:"\u2122",TSHcy:"\u040B",TScy:"\u0426",Tab:"	",Tau:"\u03A4",Tcaron:"\u0164",Tcedil:"\u0162",Tcy:"\u0422",Tfr:"\u{1D517}",Therefore:"\u2234",there4:"\u2234",therefore:"\u2234",Theta:"\u0398",ThickSpace:"\u205F\u200A",ThinSpace:"\u2009",thinsp:"\u2009",Tilde:"\u223C",sim:"\u223C",thicksim:"\u223C",thksim:"\u223C",TildeEqual:"\u2243",sime:"\u2243",simeq:"\u2243",TildeFullEqual:"\u2245",cong:"\u2245",TildeTilde:"\u2248",ap:"\u2248",approx:"\u2248",asymp:"\u2248",thickapprox:"\u2248",thkap:"\u2248",Topf:"\u{1D54B}",TripleDot:"\u20DB",tdot:"\u20DB",Tscr:"\u{1D4AF}",Tstrok:"\u0166",Uacute:"\xDA",Uarr:"\u219F",Uarrocir:"\u2949",Ubrcy:"\u040E",Ubreve:"\u016C",Ucirc:"\xDB",Ucy:"\u0423",Udblac:"\u0170",Ufr:"\u{1D518}",Ugrave:"\xD9",Umacr:"\u016A",UnderBar:"_",lowbar:"_",UnderBrace:"\u23DF",UnderBracket:"\u23B5",bbrk:"\u23B5",UnderParenthesis:"\u23DD",Union:"\u22C3",bigcup:"\u22C3",xcup:"\u22C3",UnionPlus:"\u228E",uplus:"\u228E",Uogon:"\u0172",Uopf:"\u{1D54C}",UpArrowBar:"\u2912",UpArrowDownArrow:"\u21C5",udarr:"\u21C5",UpDownArrow:"\u2195",updownarrow:"\u2195",varr:"\u2195",UpEquilibrium:"\u296E",udhar:"\u296E",UpTee:"\u22A5",bot:"\u22A5",bottom:"\u22A5",perp:"\u22A5",UpTeeArrow:"\u21A5",mapstoup:"\u21A5",UpperLeftArrow:"\u2196",nwarr:"\u2196",nwarrow:"\u2196",UpperRightArrow:"\u2197",nearr:"\u2197",nearrow:"\u2197",Upsi:"\u03D2",upsih:"\u03D2",Upsilon:"\u03A5",Uring:"\u016E",Uscr:"\u{1D4B0}",Utilde:"\u0168",Uuml:"\xDC",VDash:"\u22AB",Vbar:"\u2AEB",Vcy:"\u0412",Vdash:"\u22A9",Vdashl:"\u2AE6",Vee:"\u22C1",bigvee:"\u22C1",xvee:"\u22C1",Verbar:"\u2016",Vert:"\u2016",VerticalBar:"\u2223",mid:"\u2223",shortmid:"\u2223",smid:"\u2223",VerticalLine:"|",verbar:"|",vert:"|",VerticalSeparator:"\u2758",VerticalTilde:"\u2240",wr:"\u2240",wreath:"\u2240",VeryThinSpace:"\u200A",hairsp:"\u200A",Vfr:"\u{1D519}",Vopf:"\u{1D54D}",Vscr:"\u{1D4B1}",Vvdash:"\u22AA",Wcirc:"\u0174",Wedge:"\u22C0",bigwedge:"\u22C0",xwedge:"\u22C0",Wfr:"\u{1D51A}",Wopf:"\u{1D54E}",Wscr:"\u{1D4B2}",Xfr:"\u{1D51B}",Xi:"\u039E",Xopf:"\u{1D54F}",Xscr:"\u{1D4B3}",YAcy:"\u042F",YIcy:"\u0407",YUcy:"\u042E",Yacute:"\xDD",Ycirc:"\u0176",Ycy:"\u042B",Yfr:"\u{1D51C}",Yopf:"\u{1D550}",Yscr:"\u{1D4B4}",Yuml:"\u0178",ZHcy:"\u0416",Zacute:"\u0179",Zcaron:"\u017D",Zcy:"\u0417",Zdot:"\u017B",Zeta:"\u0396",Zfr:"\u2128",zeetrf:"\u2128",Zopf:"\u2124",integers:"\u2124",Zscr:"\u{1D4B5}",aacute:"\xE1",abreve:"\u0103",ac:"\u223E",mstpos:"\u223E",acE:"\u223E\u0333",acd:"\u223F",acirc:"\xE2",acy:"\u0430",aelig:"\xE6",afr:"\u{1D51E}",agrave:"\xE0",alefsym:"\u2135",aleph:"\u2135",alpha:"\u03B1",amacr:"\u0101",amalg:"\u2A3F",and:"\u2227",wedge:"\u2227",andand:"\u2A55",andd:"\u2A5C",andslope:"\u2A58",andv:"\u2A5A",ang:"\u2220",angle:"\u2220",ange:"\u29A4",angmsd:"\u2221",measuredangle:"\u2221",angmsdaa:"\u29A8",angmsdab:"\u29A9",angmsdac:"\u29AA",angmsdad:"\u29AB",angmsdae:"\u29AC",angmsdaf:"\u29AD",angmsdag:"\u29AE",angmsdah:"\u29AF",angrt:"\u221F",angrtvb:"\u22BE",angrtvbd:"\u299D",angsph:"\u2222",angzarr:"\u237C",aogon:"\u0105",aopf:"\u{1D552}",apE:"\u2A70",apacir:"\u2A6F",ape:"\u224A",approxeq:"\u224A",apid:"\u224B",apos:"'",aring:"\xE5",ascr:"\u{1D4B6}",ast:"*",midast:"*",atilde:"\xE3",auml:"\xE4",awint:"\u2A11",bNot:"\u2AED",backcong:"\u224C",bcong:"\u224C",backepsilon:"\u03F6",bepsi:"\u03F6",backprime:"\u2035",bprime:"\u2035",backsim:"\u223D",bsim:"\u223D",backsimeq:"\u22CD",bsime:"\u22CD",barvee:"\u22BD",barwed:"\u2305",barwedge:"\u2305",bbrktbrk:"\u23B6",bcy:"\u0431",bdquo:"\u201E",ldquor:"\u201E",bemptyv:"\u29B0",beta:"\u03B2",beth:"\u2136",between:"\u226C",twixt:"\u226C",bfr:"\u{1D51F}",bigcirc:"\u25EF",xcirc:"\u25EF",bigodot:"\u2A00",xodot:"\u2A00",bigoplus:"\u2A01",xoplus:"\u2A01",bigotimes:"\u2A02",xotime:"\u2A02",bigsqcup:"\u2A06",xsqcup:"\u2A06",bigstar:"\u2605",starf:"\u2605",bigtriangledown:"\u25BD",xdtri:"\u25BD",bigtriangleup:"\u25B3",xutri:"\u25B3",biguplus:"\u2A04",xuplus:"\u2A04",bkarow:"\u290D",rbarr:"\u290D",blacklozenge:"\u29EB",lozf:"\u29EB",blacktriangle:"\u25B4",utrif:"\u25B4",blacktriangledown:"\u25BE",dtrif:"\u25BE",blacktriangleleft:"\u25C2",ltrif:"\u25C2",blacktriangleright:"\u25B8",rtrif:"\u25B8",blank:"\u2423",blk12:"\u2592",blk14:"\u2591",blk34:"\u2593",block:"\u2588",bne:"=\u20E5",bnequiv:"\u2261\u20E5",bnot:"\u2310",bopf:"\u{1D553}",bowtie:"\u22C8",boxDL:"\u2557",boxDR:"\u2554",boxDl:"\u2556",boxDr:"\u2553",boxH:"\u2550",boxHD:"\u2566",boxHU:"\u2569",boxHd:"\u2564",boxHu:"\u2567",boxUL:"\u255D",boxUR:"\u255A",boxUl:"\u255C",boxUr:"\u2559",boxV:"\u2551",boxVH:"\u256C",boxVL:"\u2563",boxVR:"\u2560",boxVh:"\u256B",boxVl:"\u2562",boxVr:"\u255F",boxbox:"\u29C9",boxdL:"\u2555",boxdR:"\u2552",boxdl:"\u2510",boxdr:"\u250C",boxhD:"\u2565",boxhU:"\u2568",boxhd:"\u252C",boxhu:"\u2534",boxminus:"\u229F",minusb:"\u229F",boxplus:"\u229E",plusb:"\u229E",boxtimes:"\u22A0",timesb:"\u22A0",boxuL:"\u255B",boxuR:"\u2558",boxul:"\u2518",boxur:"\u2514",boxv:"\u2502",boxvH:"\u256A",boxvL:"\u2561",boxvR:"\u255E",boxvh:"\u253C",boxvl:"\u2524",boxvr:"\u251C",brvbar:"\xA6",bscr:"\u{1D4B7}",bsemi:"\u204F",bsol:"\\",bsolb:"\u29C5",bsolhsub:"\u27C8",bull:"\u2022",bullet:"\u2022",bumpE:"\u2AAE",cacute:"\u0107",cap:"\u2229",capand:"\u2A44",capbrcup:"\u2A49",capcap:"\u2A4B",capcup:"\u2A47",capdot:"\u2A40",caps:"\u2229\uFE00",caret:"\u2041",ccaps:"\u2A4D",ccaron:"\u010D",ccedil:"\xE7",ccirc:"\u0109",ccups:"\u2A4C",ccupssm:"\u2A50",cdot:"\u010B",cemptyv:"\u29B2",cent:"\xA2",cfr:"\u{1D520}",chcy:"\u0447",check:"\u2713",checkmark:"\u2713",chi:"\u03C7",cir:"\u25CB",cirE:"\u29C3",circ:"\u02C6",circeq:"\u2257",cire:"\u2257",circlearrowleft:"\u21BA",olarr:"\u21BA",circlearrowright:"\u21BB",orarr:"\u21BB",circledS:"\u24C8",oS:"\u24C8",circledast:"\u229B",oast:"\u229B",circledcirc:"\u229A",ocir:"\u229A",circleddash:"\u229D",odash:"\u229D",cirfnint:"\u2A10",cirmid:"\u2AEF",cirscir:"\u29C2",clubs:"\u2663",clubsuit:"\u2663",colon:":",comma:",",commat:"@",comp:"\u2201",complement:"\u2201",congdot:"\u2A6D",copf:"\u{1D554}",copysr:"\u2117",crarr:"\u21B5",cross:"\u2717",cscr:"\u{1D4B8}",csub:"\u2ACF",csube:"\u2AD1",csup:"\u2AD0",csupe:"\u2AD2",ctdot:"\u22EF",cudarrl:"\u2938",cudarrr:"\u2935",cuepr:"\u22DE",curlyeqprec:"\u22DE",cuesc:"\u22DF",curlyeqsucc:"\u22DF",cularr:"\u21B6",curvearrowleft:"\u21B6",cularrp:"\u293D",cup:"\u222A",cupbrcap:"\u2A48",cupcap:"\u2A46",cupcup:"\u2A4A",cupdot:"\u228D",cupor:"\u2A45",cups:"\u222A\uFE00",curarr:"\u21B7",curvearrowright:"\u21B7",curarrm:"\u293C",curlyvee:"\u22CE",cuvee:"\u22CE",curlywedge:"\u22CF",cuwed:"\u22CF",curren:"\xA4",cwint:"\u2231",cylcty:"\u232D",dHar:"\u2965",dagger:"\u2020",daleth:"\u2138",dash:"\u2010",hyphen:"\u2010",dbkarow:"\u290F",rBarr:"\u290F",dcaron:"\u010F",dcy:"\u0434",ddarr:"\u21CA",downdownarrows:"\u21CA",ddotseq:"\u2A77",eDDot:"\u2A77",deg:"\xB0",delta:"\u03B4",demptyv:"\u29B1",dfisht:"\u297F",dfr:"\u{1D521}",diamondsuit:"\u2666",diams:"\u2666",digamma:"\u03DD",gammad:"\u03DD",disin:"\u22F2",div:"\xF7",divide:"\xF7",divideontimes:"\u22C7",divonx:"\u22C7",djcy:"\u0452",dlcorn:"\u231E",llcorner:"\u231E",dlcrop:"\u230D",dollar:"$",dopf:"\u{1D555}",doteqdot:"\u2251",eDot:"\u2251",dotminus:"\u2238",minusd:"\u2238",dotplus:"\u2214",plusdo:"\u2214",dotsquare:"\u22A1",sdotb:"\u22A1",drcorn:"\u231F",lrcorner:"\u231F",drcrop:"\u230C",dscr:"\u{1D4B9}",dscy:"\u0455",dsol:"\u29F6",dstrok:"\u0111",dtdot:"\u22F1",dtri:"\u25BF",triangledown:"\u25BF",dwangle:"\u29A6",dzcy:"\u045F",dzigrarr:"\u27FF",eacute:"\xE9",easter:"\u2A6E",ecaron:"\u011B",ecir:"\u2256",eqcirc:"\u2256",ecirc:"\xEA",ecolon:"\u2255",eqcolon:"\u2255",ecy:"\u044D",edot:"\u0117",efDot:"\u2252",fallingdotseq:"\u2252",efr:"\u{1D522}",eg:"\u2A9A",egrave:"\xE8",egs:"\u2A96",eqslantgtr:"\u2A96",egsdot:"\u2A98",el:"\u2A99",elinters:"\u23E7",ell:"\u2113",els:"\u2A95",eqslantless:"\u2A95",elsdot:"\u2A97",emacr:"\u0113",empty:"\u2205",emptyset:"\u2205",emptyv:"\u2205",varnothing:"\u2205",emsp13:"\u2004",emsp14:"\u2005",emsp:"\u2003",eng:"\u014B",ensp:"\u2002",eogon:"\u0119",eopf:"\u{1D556}",epar:"\u22D5",eparsl:"\u29E3",eplus:"\u2A71",epsi:"\u03B5",epsilon:"\u03B5",epsiv:"\u03F5",straightepsilon:"\u03F5",varepsilon:"\u03F5",equals:"=",equest:"\u225F",questeq:"\u225F",equivDD:"\u2A78",eqvparsl:"\u29E5",erDot:"\u2253",risingdotseq:"\u2253",erarr:"\u2971",escr:"\u212F",eta:"\u03B7",eth:"\xF0",euml:"\xEB",euro:"\u20AC",excl:"!",fcy:"\u0444",female:"\u2640",ffilig:"\uFB03",fflig:"\uFB00",ffllig:"\uFB04",ffr:"\u{1D523}",filig:"\uFB01",fjlig:"fj",flat:"\u266D",fllig:"\uFB02",fltns:"\u25B1",fnof:"\u0192",fopf:"\u{1D557}",fork:"\u22D4",pitchfork:"\u22D4",forkv:"\u2AD9",fpartint:"\u2A0D",frac12:"\xBD",half:"\xBD",frac13:"\u2153",frac14:"\xBC",frac15:"\u2155",frac16:"\u2159",frac18:"\u215B",frac23:"\u2154",frac25:"\u2156",frac34:"\xBE",frac35:"\u2157",frac38:"\u215C",frac45:"\u2158",frac56:"\u215A",frac58:"\u215D",frac78:"\u215E",frasl:"\u2044",frown:"\u2322",sfrown:"\u2322",fscr:"\u{1D4BB}",gEl:"\u2A8C",gtreqqless:"\u2A8C",gacute:"\u01F5",gamma:"\u03B3",gap:"\u2A86",gtrapprox:"\u2A86",gbreve:"\u011F",gcirc:"\u011D",gcy:"\u0433",gdot:"\u0121",gescc:"\u2AA9",gesdot:"\u2A80",gesdoto:"\u2A82",gesdotol:"\u2A84",gesl:"\u22DB\uFE00",gesles:"\u2A94",gfr:"\u{1D524}",gimel:"\u2137",gjcy:"\u0453",glE:"\u2A92",gla:"\u2AA5",glj:"\u2AA4",gnE:"\u2269",gneqq:"\u2269",gnap:"\u2A8A",gnapprox:"\u2A8A",gne:"\u2A88",gneq:"\u2A88",gnsim:"\u22E7",gopf:"\u{1D558}",gscr:"\u210A",gsime:"\u2A8E",gsiml:"\u2A90",gtcc:"\u2AA7",gtcir:"\u2A7A",gtdot:"\u22D7",gtrdot:"\u22D7",gtlPar:"\u2995",gtquest:"\u2A7C",gtrarr:"\u2978",gvertneqq:"\u2269\uFE00",gvnE:"\u2269\uFE00",hardcy:"\u044A",harrcir:"\u2948",harrw:"\u21AD",leftrightsquigarrow:"\u21AD",hbar:"\u210F",hslash:"\u210F",planck:"\u210F",plankv:"\u210F",hcirc:"\u0125",hearts:"\u2665",heartsuit:"\u2665",hellip:"\u2026",mldr:"\u2026",hercon:"\u22B9",hfr:"\u{1D525}",hksearow:"\u2925",searhk:"\u2925",hkswarow:"\u2926",swarhk:"\u2926",hoarr:"\u21FF",homtht:"\u223B",hookleftarrow:"\u21A9",larrhk:"\u21A9",hookrightarrow:"\u21AA",rarrhk:"\u21AA",hopf:"\u{1D559}",horbar:"\u2015",hscr:"\u{1D4BD}",hstrok:"\u0127",hybull:"\u2043",iacute:"\xED",icirc:"\xEE",icy:"\u0438",iecy:"\u0435",iexcl:"\xA1",ifr:"\u{1D526}",igrave:"\xEC",iiiint:"\u2A0C",qint:"\u2A0C",iiint:"\u222D",tint:"\u222D",iinfin:"\u29DC",iiota:"\u2129",ijlig:"\u0133",imacr:"\u012B",imath:"\u0131",inodot:"\u0131",imof:"\u22B7",imped:"\u01B5",incare:"\u2105",infin:"\u221E",infintie:"\u29DD",intcal:"\u22BA",intercal:"\u22BA",intlarhk:"\u2A17",intprod:"\u2A3C",iprod:"\u2A3C",iocy:"\u0451",iogon:"\u012F",iopf:"\u{1D55A}",iota:"\u03B9",iquest:"\xBF",iscr:"\u{1D4BE}",isinE:"\u22F9",isindot:"\u22F5",isins:"\u22F4",isinsv:"\u22F3",itilde:"\u0129",iukcy:"\u0456",iuml:"\xEF",jcirc:"\u0135",jcy:"\u0439",jfr:"\u{1D527}",jmath:"\u0237",jopf:"\u{1D55B}",jscr:"\u{1D4BF}",jsercy:"\u0458",jukcy:"\u0454",kappa:"\u03BA",kappav:"\u03F0",varkappa:"\u03F0",kcedil:"\u0137",kcy:"\u043A",kfr:"\u{1D528}",kgreen:"\u0138",khcy:"\u0445",kjcy:"\u045C",kopf:"\u{1D55C}",kscr:"\u{1D4C0}",lAtail:"\u291B",lBarr:"\u290E",lEg:"\u2A8B",lesseqqgtr:"\u2A8B",lHar:"\u2962",lacute:"\u013A",laemptyv:"\u29B4",lambda:"\u03BB",langd:"\u2991",lap:"\u2A85",lessapprox:"\u2A85",laquo:"\xAB",larrbfs:"\u291F",larrfs:"\u291D",larrlp:"\u21AB",looparrowleft:"\u21AB",larrpl:"\u2939",larrsim:"\u2973",larrtl:"\u21A2",leftarrowtail:"\u21A2",lat:"\u2AAB",latail:"\u2919",late:"\u2AAD",lates:"\u2AAD\uFE00",lbarr:"\u290C",lbbrk:"\u2772",lbrace:"{",lcub:"{",lbrack:"[",lsqb:"[",lbrke:"\u298B",lbrksld:"\u298F",lbrkslu:"\u298D",lcaron:"\u013E",lcedil:"\u013C",lcy:"\u043B",ldca:"\u2936",ldrdhar:"\u2967",ldrushar:"\u294B",ldsh:"\u21B2",le:"\u2264",leq:"\u2264",leftleftarrows:"\u21C7",llarr:"\u21C7",leftthreetimes:"\u22CB",lthree:"\u22CB",lescc:"\u2AA8",lesdot:"\u2A7F",lesdoto:"\u2A81",lesdotor:"\u2A83",lesg:"\u22DA\uFE00",lesges:"\u2A93",lessdot:"\u22D6",ltdot:"\u22D6",lfisht:"\u297C",lfr:"\u{1D529}",lgE:"\u2A91",lharul:"\u296A",lhblk:"\u2584",ljcy:"\u0459",llhard:"\u296B",lltri:"\u25FA",lmidot:"\u0140",lmoust:"\u23B0",lmoustache:"\u23B0",lnE:"\u2268",lneqq:"\u2268",lnap:"\u2A89",lnapprox:"\u2A89",lne:"\u2A87",lneq:"\u2A87",lnsim:"\u22E6",loang:"\u27EC",loarr:"\u21FD",longmapsto:"\u27FC",xmap:"\u27FC",looparrowright:"\u21AC",rarrlp:"\u21AC",lopar:"\u2985",lopf:"\u{1D55D}",loplus:"\u2A2D",lotimes:"\u2A34",lowast:"\u2217",loz:"\u25CA",lozenge:"\u25CA",lpar:"(",lparlt:"\u2993",lrhard:"\u296D",lrm:"\u200E",lrtri:"\u22BF",lsaquo:"\u2039",lscr:"\u{1D4C1}",lsime:"\u2A8D",lsimg:"\u2A8F",lsquor:"\u201A",sbquo:"\u201A",lstrok:"\u0142",ltcc:"\u2AA6",ltcir:"\u2A79",ltimes:"\u22C9",ltlarr:"\u2976",ltquest:"\u2A7B",ltrPar:"\u2996",ltri:"\u25C3",triangleleft:"\u25C3",lurdshar:"\u294A",luruhar:"\u2966",lvertneqq:"\u2268\uFE00",lvnE:"\u2268\uFE00",mDDot:"\u223A",macr:"\xAF",strns:"\xAF",male:"\u2642",malt:"\u2720",maltese:"\u2720",marker:"\u25AE",mcomma:"\u2A29",mcy:"\u043C",mdash:"\u2014",mfr:"\u{1D52A}",mho:"\u2127",micro:"\xB5",midcir:"\u2AF0",minus:"\u2212",minusdu:"\u2A2A",mlcp:"\u2ADB",models:"\u22A7",mopf:"\u{1D55E}",mscr:"\u{1D4C2}",mu:"\u03BC",multimap:"\u22B8",mumap:"\u22B8",nGg:"\u22D9\u0338",nGt:"\u226B\u20D2",nLeftarrow:"\u21CD",nlArr:"\u21CD",nLeftrightarrow:"\u21CE",nhArr:"\u21CE",nLl:"\u22D8\u0338",nLt:"\u226A\u20D2",nRightarrow:"\u21CF",nrArr:"\u21CF",nVDash:"\u22AF",nVdash:"\u22AE",nacute:"\u0144",nang:"\u2220\u20D2",napE:"\u2A70\u0338",napid:"\u224B\u0338",napos:"\u0149",natur:"\u266E",natural:"\u266E",ncap:"\u2A43",ncaron:"\u0148",ncedil:"\u0146",ncongdot:"\u2A6D\u0338",ncup:"\u2A42",ncy:"\u043D",ndash:"\u2013",neArr:"\u21D7",nearhk:"\u2924",nedot:"\u2250\u0338",nesear:"\u2928",toea:"\u2928",nfr:"\u{1D52B}",nharr:"\u21AE",nleftrightarrow:"\u21AE",nhpar:"\u2AF2",nis:"\u22FC",nisd:"\u22FA",njcy:"\u045A",nlE:"\u2266\u0338",nleqq:"\u2266\u0338",nlarr:"\u219A",nleftarrow:"\u219A",nldr:"\u2025",nopf:"\u{1D55F}",not:"\xAC",notinE:"\u22F9\u0338",notindot:"\u22F5\u0338",notinvb:"\u22F7",notinvc:"\u22F6",notnivb:"\u22FE",notnivc:"\u22FD",nparsl:"\u2AFD\u20E5",npart:"\u2202\u0338",npolint:"\u2A14",nrarr:"\u219B",nrightarrow:"\u219B",nrarrc:"\u2933\u0338",nrarrw:"\u219D\u0338",nscr:"\u{1D4C3}",nsub:"\u2284",nsubE:"\u2AC5\u0338",nsubseteqq:"\u2AC5\u0338",nsup:"\u2285",nsupE:"\u2AC6\u0338",nsupseteqq:"\u2AC6\u0338",ntilde:"\xF1",nu:"\u03BD",num:"#",numero:"\u2116",numsp:"\u2007",nvDash:"\u22AD",nvHarr:"\u2904",nvap:"\u224D\u20D2",nvdash:"\u22AC",nvge:"\u2265\u20D2",nvgt:">\u20D2",nvinfin:"\u29DE",nvlArr:"\u2902",nvle:"\u2264\u20D2",nvlt:"<\u20D2",nvltrie:"\u22B4\u20D2",nvrArr:"\u2903",nvrtrie:"\u22B5\u20D2",nvsim:"\u223C\u20D2",nwArr:"\u21D6",nwarhk:"\u2923",nwnear:"\u2927",oacute:"\xF3",ocirc:"\xF4",ocy:"\u043E",odblac:"\u0151",odiv:"\u2A38",odsold:"\u29BC",oelig:"\u0153",ofcir:"\u29BF",ofr:"\u{1D52C}",ogon:"\u02DB",ograve:"\xF2",ogt:"\u29C1",ohbar:"\u29B5",olcir:"\u29BE",olcross:"\u29BB",olt:"\u29C0",omacr:"\u014D",omega:"\u03C9",omicron:"\u03BF",omid:"\u29B6",oopf:"\u{1D560}",opar:"\u29B7",operp:"\u29B9",or:"\u2228",vee:"\u2228",ord:"\u2A5D",order:"\u2134",orderof:"\u2134",oscr:"\u2134",ordf:"\xAA",ordm:"\xBA",origof:"\u22B6",oror:"\u2A56",orslope:"\u2A57",orv:"\u2A5B",oslash:"\xF8",osol:"\u2298",otilde:"\xF5",otimesas:"\u2A36",ouml:"\xF6",ovbar:"\u233D",para:"\xB6",parsim:"\u2AF3",parsl:"\u2AFD",pcy:"\u043F",percnt:"%",period:".",permil:"\u2030",pertenk:"\u2031",pfr:"\u{1D52D}",phi:"\u03C6",phiv:"\u03D5",straightphi:"\u03D5",varphi:"\u03D5",phone:"\u260E",pi:"\u03C0",piv:"\u03D6",varpi:"\u03D6",planckh:"\u210E",plus:"+",plusacir:"\u2A23",pluscir:"\u2A22",plusdu:"\u2A25",pluse:"\u2A72",plussim:"\u2A26",plustwo:"\u2A27",pointint:"\u2A15",popf:"\u{1D561}",pound:"\xA3",prE:"\u2AB3",prap:"\u2AB7",precapprox:"\u2AB7",precnapprox:"\u2AB9",prnap:"\u2AB9",precneqq:"\u2AB5",prnE:"\u2AB5",precnsim:"\u22E8",prnsim:"\u22E8",prime:"\u2032",profalar:"\u232E",profline:"\u2312",profsurf:"\u2313",prurel:"\u22B0",pscr:"\u{1D4C5}",psi:"\u03C8",puncsp:"\u2008",qfr:"\u{1D52E}",qopf:"\u{1D562}",qprime:"\u2057",qscr:"\u{1D4C6}",quatint:"\u2A16",quest:"?",rAtail:"\u291C",rHar:"\u2964",race:"\u223D\u0331",racute:"\u0155",raemptyv:"\u29B3",rangd:"\u2992",range:"\u29A5",raquo:"\xBB",rarrap:"\u2975",rarrbfs:"\u2920",rarrc:"\u2933",rarrfs:"\u291E",rarrpl:"\u2945",rarrsim:"\u2974",rarrtl:"\u21A3",rightarrowtail:"\u21A3",rarrw:"\u219D",rightsquigarrow:"\u219D",ratail:"\u291A",ratio:"\u2236",rbbrk:"\u2773",rbrace:"}",rcub:"}",rbrack:"]",rsqb:"]",rbrke:"\u298C",rbrksld:"\u298E",rbrkslu:"\u2990",rcaron:"\u0159",rcedil:"\u0157",rcy:"\u0440",rdca:"\u2937",rdldhar:"\u2969",rdsh:"\u21B3",rect:"\u25AD",rfisht:"\u297D",rfr:"\u{1D52F}",rharul:"\u296C",rho:"\u03C1",rhov:"\u03F1",varrho:"\u03F1",rightrightarrows:"\u21C9",rrarr:"\u21C9",rightthreetimes:"\u22CC",rthree:"\u22CC",ring:"\u02DA",rlm:"\u200F",rmoust:"\u23B1",rmoustache:"\u23B1",rnmid:"\u2AEE",roang:"\u27ED",roarr:"\u21FE",ropar:"\u2986",ropf:"\u{1D563}",roplus:"\u2A2E",rotimes:"\u2A35",rpar:")",rpargt:"\u2994",rppolint:"\u2A12",rsaquo:"\u203A",rscr:"\u{1D4C7}",rtimes:"\u22CA",rtri:"\u25B9",triangleright:"\u25B9",rtriltri:"\u29CE",ruluhar:"\u2968",rx:"\u211E",sacute:"\u015B",scE:"\u2AB4",scap:"\u2AB8",succapprox:"\u2AB8",scaron:"\u0161",scedil:"\u015F",scirc:"\u015D",scnE:"\u2AB6",succneqq:"\u2AB6",scnap:"\u2ABA",succnapprox:"\u2ABA",scnsim:"\u22E9",succnsim:"\u22E9",scpolint:"\u2A13",scy:"\u0441",sdot:"\u22C5",sdote:"\u2A66",seArr:"\u21D8",sect:"\xA7",semi:";",seswar:"\u2929",tosa:"\u2929",sext:"\u2736",sfr:"\u{1D530}",sharp:"\u266F",shchcy:"\u0449",shcy:"\u0448",shy:"\xAD",sigma:"\u03C3",sigmaf:"\u03C2",sigmav:"\u03C2",varsigma:"\u03C2",simdot:"\u2A6A",simg:"\u2A9E",simgE:"\u2AA0",siml:"\u2A9D",simlE:"\u2A9F",simne:"\u2246",simplus:"\u2A24",simrarr:"\u2972",smashp:"\u2A33",smeparsl:"\u29E4",smile:"\u2323",ssmile:"\u2323",smt:"\u2AAA",smte:"\u2AAC",smtes:"\u2AAC\uFE00",softcy:"\u044C",sol:"/",solb:"\u29C4",solbar:"\u233F",sopf:"\u{1D564}",spades:"\u2660",spadesuit:"\u2660",sqcaps:"\u2293\uFE00",sqcups:"\u2294\uFE00",sscr:"\u{1D4C8}",star:"\u2606",sub:"\u2282",subset:"\u2282",subE:"\u2AC5",subseteqq:"\u2AC5",subdot:"\u2ABD",subedot:"\u2AC3",submult:"\u2AC1",subnE:"\u2ACB",subsetneqq:"\u2ACB",subne:"\u228A",subsetneq:"\u228A",subplus:"\u2ABF",subrarr:"\u2979",subsim:"\u2AC7",subsub:"\u2AD5",subsup:"\u2AD3",sung:"\u266A",sup1:"\xB9",sup2:"\xB2",sup3:"\xB3",supE:"\u2AC6",supseteqq:"\u2AC6",supdot:"\u2ABE",supdsub:"\u2AD8",supedot:"\u2AC4",suphsol:"\u27C9",suphsub:"\u2AD7",suplarr:"\u297B",supmult:"\u2AC2",supnE:"\u2ACC",supsetneqq:"\u2ACC",supne:"\u228B",supsetneq:"\u228B",supplus:"\u2AC0",supsim:"\u2AC8",supsub:"\u2AD4",supsup:"\u2AD6",swArr:"\u21D9",swnwar:"\u292A",szlig:"\xDF",target:"\u2316",tau:"\u03C4",tcaron:"\u0165",tcedil:"\u0163",tcy:"\u0442",telrec:"\u2315",tfr:"\u{1D531}",theta:"\u03B8",thetasym:"\u03D1",thetav:"\u03D1",vartheta:"\u03D1",thorn:"\xFE",times:"\xD7",timesbar:"\u2A31",timesd:"\u2A30",topbot:"\u2336",topcir:"\u2AF1",topf:"\u{1D565}",topfork:"\u2ADA",tprime:"\u2034",triangle:"\u25B5",utri:"\u25B5",triangleq:"\u225C",trie:"\u225C",tridot:"\u25EC",triminus:"\u2A3A",triplus:"\u2A39",trisb:"\u29CD",tritime:"\u2A3B",trpezium:"\u23E2",tscr:"\u{1D4C9}",tscy:"\u0446",tshcy:"\u045B",tstrok:"\u0167",uHar:"\u2963",uacute:"\xFA",ubrcy:"\u045E",ubreve:"\u016D",ucirc:"\xFB",ucy:"\u0443",udblac:"\u0171",ufisht:"\u297E",ufr:"\u{1D532}",ugrave:"\xF9",uhblk:"\u2580",ulcorn:"\u231C",ulcorner:"\u231C",ulcrop:"\u230F",ultri:"\u25F8",umacr:"\u016B",uogon:"\u0173",uopf:"\u{1D566}",upsi:"\u03C5",upsilon:"\u03C5",upuparrows:"\u21C8",uuarr:"\u21C8",urcorn:"\u231D",urcorner:"\u231D",urcrop:"\u230E",uring:"\u016F",urtri:"\u25F9",uscr:"\u{1D4CA}",utdot:"\u22F0",utilde:"\u0169",uuml:"\xFC",uwangle:"\u29A7",vBar:"\u2AE8",vBarv:"\u2AE9",vangrt:"\u299C",varsubsetneq:"\u228A\uFE00",vsubne:"\u228A\uFE00",varsubsetneqq:"\u2ACB\uFE00",vsubnE:"\u2ACB\uFE00",varsupsetneq:"\u228B\uFE00",vsupne:"\u228B\uFE00",varsupsetneqq:"\u2ACC\uFE00",vsupnE:"\u2ACC\uFE00",vcy:"\u0432",veebar:"\u22BB",veeeq:"\u225A",vellip:"\u22EE",vfr:"\u{1D533}",vopf:"\u{1D567}",vscr:"\u{1D4CB}",vzigzag:"\u299A",wcirc:"\u0175",wedbar:"\u2A5F",wedgeq:"\u2259",weierp:"\u2118",wp:"\u2118",wfr:"\u{1D534}",wopf:"\u{1D568}",wscr:"\u{1D4CC}",xfr:"\u{1D535}",xi:"\u03BE",xnis:"\u22FB",xopf:"\u{1D569}",xscr:"\u{1D4CD}",yacute:"\xFD",yacy:"\u044F",ycirc:"\u0177",ycy:"\u044B",yen:"\xA5",yfr:"\u{1D536}",yicy:"\u0457",yopf:"\u{1D56A}",yscr:"\u{1D4CE}",yucy:"\u044E",yuml:"\xFF",zacute:"\u017A",zcaron:"\u017E",zcy:"\u0437",zdot:"\u017C",zeta:"\u03B6",zfr:"\u{1D537}",zhcy:"\u0436",zigrarr:"\u21DD",zopf:"\u{1D56B}",zscr:"\u{1D4CF}",zwj:"\u200D",zwnj:"\u200C"},fo="\uE500";Ve$1.ngsp=fo;var go=[/@/,/^\s*$/,/[<>]/,/^[{}]$/,/&(#|[a-z])/i,/^\/\//];function Xs(t,e){if(e!=null&&!(Array.isArray(e)&&e.length==2))throw new Error(`Expected '${t}' to be an array, [start, end].`);if(e!=null){let r=e[0],n=e[1];go.forEach(s=>{if(s.test(r)||s.test(n))throw new Error(`['${r}', '${n}'] contains unusable interpolation symbol.`)});}}var $r$1=class t{static fromArray(e){return e?(Xs("interpolation",e),new t(e[0],e[1])):Or$1}constructor(e,r){this.start=e,this.end=r;}},Or$1=new $r$1("{{","}}");var gt$1=class gt extends Oe$1{constructor(e,r,n){super(n,e),this.tokenType=r;}},Ur$1=class Ur{constructor(e,r,n){this.tokens=e,this.errors=r,this.nonNormalizedIcuExpressions=n;}};function li(t,e,r,n={}){let s=new Wr$1(new ve$1(t,e),r,n);return s.tokenize(),new Ur$1(Vo$1(s.tokens),s.errors,s.nonNormalizedIcuExpressions)}var Io$1=/\r\n?/g;function Ue$1(t){return `Unexpected character "${t===0?"EOF":String.fromCharCode(t)}"`}function ti$1(t){return `Unknown entity "${t}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`}function Ro$1(t,e){return `Unable to parse entity "${e}" - ${t} character reference entities must end with ";"`}var rr$1;(function(t){t.HEX="hexadecimal",t.DEC="decimal";})(rr$1||(rr$1={}));var Ct$1=class Ct{constructor(e){this.error=e;}},Wr$1=class Wr{constructor(e,r,n){this._getTagContentType=r,this._currentTokenStart=null,this._currentTokenType=null,this._expansionCaseStack=[],this._inInterpolation=false,this._fullNameStack=[],this.tokens=[],this.errors=[],this.nonNormalizedIcuExpressions=[],this._tokenizeIcu=n.tokenizeExpansionForms||false,this._interpolationConfig=n.interpolationConfig||Or$1,this._leadingTriviaCodePoints=n.leadingTriviaChars&&n.leadingTriviaChars.map(i=>i.codePointAt(0)||0),this._canSelfClose=n.canSelfClose||false,this._allowHtmComponentClosingTags=n.allowHtmComponentClosingTags||false;let s=n.range||{endPos:e.content.length,startPos:0,startLine:0,startCol:0};this._cursor=n.escapedString?new Gr$1(e,s):new nr$1(e,s),this._preserveLineEndings=n.preserveLineEndings||false,this._i18nNormalizeLineEndingsInICUs=n.i18nNormalizeLineEndingsInICUs||false,this._tokenizeBlocks=n.tokenizeBlocks??true,this._tokenizeLet=n.tokenizeLet??true;try{this._cursor.init();}catch(i){this.handleError(i);}}_processCarriageReturns(e){return this._preserveLineEndings?e:e.replace(Io$1,`
`)}tokenize(){for(;this._cursor.peek()!==0;){let e=this._cursor.clone();try{if(this._attemptCharCode(60))if(this._attemptCharCode(33))this._attemptStr("[CDATA[")?this._consumeCdata(e):this._attemptStr("--")?this._consumeComment(e):this._attemptStrCaseInsensitive("doctype")?this._consumeDocType(e):this._consumeBogusComment(e);else if(this._attemptCharCode(47))this._consumeTagClose(e);else {let r=this._cursor.clone();this._attemptCharCode(63)?(this._cursor=r,this._consumeBogusComment(e)):this._consumeTagOpen(e);}else this._tokenizeLet&&this._cursor.peek()===64&&!this._inInterpolation&&this._attemptStr("@let")?this._consumeLetDeclaration(e):this._tokenizeBlocks&&this._attemptCharCode(64)?this._consumeBlockStart(e):this._tokenizeBlocks&&!this._inInterpolation&&!this._isInExpansionCase()&&!this._isInExpansionForm()&&this._attemptCharCode(125)?this._consumeBlockEnd(e):this._tokenizeIcu&&this._tokenizeExpansionForm()||this._consumeWithInterpolation(5,8,()=>this._isTextEnd(),()=>this._isTagStart());}catch(r){this.handleError(r);}}this._beginToken(34),this._endToken([]);}_getBlockName(){let e=false,r=this._cursor.clone();return this._attemptCharCodeUntilFn(n=>ut$1(n)?!e:si(n)?(e=true,false):true),this._cursor.getChars(r).trim()}_consumeBlockStart(e){this._beginToken(25,e);let r=this._endToken([this._getBlockName()]);if(this._cursor.peek()===40)if(this._cursor.advance(),this._consumeBlockParameters(),this._attemptCharCodeUntilFn(b$1),this._attemptCharCode(41))this._attemptCharCodeUntilFn(b$1);else {r.type=29;return}this._attemptCharCode(123)?(this._beginToken(26),this._endToken([])):r.type=29;}_consumeBlockEnd(e){this._beginToken(27,e),this._endToken([]);}_consumeBlockParameters(){for(this._attemptCharCodeUntilFn(ii);this._cursor.peek()!==41&&this._cursor.peek()!==0;){this._beginToken(28);let e=this._cursor.clone(),r=null,n=0;for(;this._cursor.peek()!==59&&this._cursor.peek()!==0||r!==null;){let s=this._cursor.peek();if(s===92)this._cursor.advance();else if(s===r)r=null;else if(r===null&&Ot$1(s))r=s;else if(s===40&&r===null)n++;else if(s===41&&r===null){if(n===0)break;n>0&&n--;}this._cursor.advance();}this._endToken([this._cursor.getChars(e)]),this._attemptCharCodeUntilFn(ii);}}_consumeLetDeclaration(e){if(this._beginToken(30,e),ut$1(this._cursor.peek()))this._attemptCharCodeUntilFn(b$1);else {let s=this._endToken([this._cursor.getChars(e)]);s.type=33;return}let r=this._endToken([this._getLetDeclarationName()]);if(this._attemptCharCodeUntilFn(b$1),!this._attemptCharCode(61)){r.type=33;return}this._attemptCharCodeUntilFn(s=>b$1(s)&&!$t$1(s)),this._consumeLetDeclarationValue(),this._cursor.peek()===59?(this._beginToken(32),this._endToken([]),this._cursor.advance()):(r.type=33,r.sourceSpan=this._cursor.getSpan(e));}_getLetDeclarationName(){let e=this._cursor.clone(),r=false;return this._attemptCharCodeUntilFn(n=>lt(n)||n===36||n===95||r&&Rt$1(n)?(r=true,false):true),this._cursor.getChars(e).trim()}_consumeLetDeclarationValue(){let e=this._cursor.clone();for(this._beginToken(31,e);this._cursor.peek()!==0;){let r=this._cursor.peek();if(r===59)break;Ot$1(r)&&(this._cursor.advance(),this._attemptCharCodeUntilFn(n=>n===92?(this._cursor.advance(),false):n===r)),this._cursor.advance();}this._endToken([this._cursor.getChars(e)]);}_tokenizeExpansionForm(){if(this.isExpansionFormStart())return this._consumeExpansionFormStart(),true;if(qo$1(this._cursor.peek())&&this._isInExpansionForm())return this._consumeExpansionCaseStart(),true;if(this._cursor.peek()===125){if(this._isInExpansionCase())return this._consumeExpansionCaseEnd(),true;if(this._isInExpansionForm())return this._consumeExpansionFormEnd(),true}return  false}_beginToken(e,r=this._cursor.clone()){this._currentTokenStart=r,this._currentTokenType=e;}_endToken(e,r){if(this._currentTokenStart===null)throw new gt$1("Programming error - attempted to end a token when there was no start to the token",this._currentTokenType,this._cursor.getSpan(r));if(this._currentTokenType===null)throw new gt$1("Programming error - attempted to end a token which has no token type",null,this._cursor.getSpan(this._currentTokenStart));let n={type:this._currentTokenType,parts:e,sourceSpan:(r??this._cursor).getSpan(this._currentTokenStart,this._leadingTriviaCodePoints)};return this.tokens.push(n),this._currentTokenStart=null,this._currentTokenType=null,n}_createError(e,r){this._isInExpansionForm()&&(e+=` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`);let n=new gt$1(e,this._currentTokenType,r);return this._currentTokenStart=null,this._currentTokenType=null,new Ct$1(n)}handleError(e){if(e instanceof St$1&&(e=this._createError(e.msg,this._cursor.getSpan(e.cursor))),e instanceof Ct$1)this.errors.push(e.error);else throw e}_attemptCharCode(e){return this._cursor.peek()===e?(this._cursor.advance(),true):false}_attemptCharCodeCaseInsensitive(e){return Ho$1(this._cursor.peek(),e)?(this._cursor.advance(),true):false}_requireCharCode(e){let r=this._cursor.clone();if(!this._attemptCharCode(e))throw this._createError(Ue$1(this._cursor.peek()),this._cursor.getSpan(r))}_attemptStr(e){let r=e.length;if(this._cursor.charsLeft()<r)return  false;let n=this._cursor.clone();for(let s=0;s<r;s++)if(!this._attemptCharCode(e.charCodeAt(s)))return this._cursor=n,false;return  true}_attemptStrCaseInsensitive(e){for(let r=0;r<e.length;r++)if(!this._attemptCharCodeCaseInsensitive(e.charCodeAt(r)))return  false;return  true}_requireStr(e){let r=this._cursor.clone();if(!this._attemptStr(e))throw this._createError(Ue$1(this._cursor.peek()),this._cursor.getSpan(r))}_requireStrCaseInsensitive(e){let r=this._cursor.clone();if(!this._attemptStrCaseInsensitive(e))throw this._createError(Ue$1(this._cursor.peek()),this._cursor.getSpan(r))}_attemptCharCodeUntilFn(e){for(;!e(this._cursor.peek());)this._cursor.advance();}_requireCharCodeUntilFn(e,r){let n=this._cursor.clone();if(this._attemptCharCodeUntilFn(e),this._cursor.diff(n)<r)throw this._createError(Ue$1(this._cursor.peek()),this._cursor.getSpan(n))}_attemptUntilChar(e){for(;this._cursor.peek()!==e;)this._cursor.advance();}_readChar(){let e=String.fromCodePoint(this._cursor.peek());return this._cursor.advance(),e}_consumeEntity(e){this._beginToken(9);let r=this._cursor.clone();if(this._cursor.advance(),this._attemptCharCode(35)){let n=this._attemptCharCode(120)||this._attemptCharCode(88),s=this._cursor.clone();if(this._attemptCharCodeUntilFn(Oo$1),this._cursor.peek()!=59){this._cursor.advance();let a=n?rr$1.HEX:rr$1.DEC;throw this._createError(Ro$1(a,this._cursor.getChars(r)),this._cursor.getSpan())}let i=this._cursor.getChars(s);this._cursor.advance();try{let a=parseInt(i,n?16:10);this._endToken([String.fromCharCode(a),this._cursor.getChars(r)]);}catch{throw this._createError(ti$1(this._cursor.getChars(r)),this._cursor.getSpan())}}else {let n=this._cursor.clone();if(this._attemptCharCodeUntilFn(Mo$1),this._cursor.peek()!=59)this._beginToken(e,r),this._cursor=n,this._endToken(["&"]);else {let s=this._cursor.getChars(n);this._cursor.advance();let i=Ve$1[s];if(!i)throw this._createError(ti$1(s),this._cursor.getSpan(r));this._endToken([i,`&${s};`]);}}}_consumeRawText(e,r){this._beginToken(e?6:7);let n=[];for(;;){let s=this._cursor.clone(),i=r();if(this._cursor=s,i)break;e&&this._cursor.peek()===38?(this._endToken([this._processCarriageReturns(n.join(""))]),n.length=0,this._consumeEntity(6),this._beginToken(6)):n.push(this._readChar());}this._endToken([this._processCarriageReturns(n.join(""))]);}_consumeComment(e){this._beginToken(10,e),this._endToken([]),this._consumeRawText(false,()=>this._attemptStr("-->")),this._beginToken(11),this._requireStr("-->"),this._endToken([]);}_consumeBogusComment(e){this._beginToken(10,e),this._endToken([]),this._consumeRawText(false,()=>this._cursor.peek()===62),this._beginToken(11),this._cursor.advance(),this._endToken([]);}_consumeCdata(e){this._beginToken(12,e),this._endToken([]),this._consumeRawText(false,()=>this._attemptStr("]]>")),this._beginToken(13),this._requireStr("]]>"),this._endToken([]);}_consumeDocType(e){this._beginToken(18,e),this._endToken([]),this._consumeRawText(false,()=>this._cursor.peek()===62),this._beginToken(19),this._cursor.advance(),this._endToken([]);}_consumePrefixAndName(){let e=this._cursor.clone(),r="";for(;this._cursor.peek()!==58&&!$o$1(this._cursor.peek());)this._cursor.advance();let n;this._cursor.peek()===58?(r=this._cursor.getChars(e),this._cursor.advance(),n=this._cursor.clone()):n=e,this._requireCharCodeUntilFn(ri$1,r===""?0:1);let s=this._cursor.getChars(n);return [r,s]}_consumeTagOpen(e){let r,n,s,i=[];try{if(!lt(this._cursor.peek()))throw this._createError(Ue$1(this._cursor.peek()),this._cursor.getSpan(e));for(s=this._consumeTagOpenStart(e),n=s.parts[0],r=s.parts[1],this._attemptCharCodeUntilFn(b$1);this._cursor.peek()!==47&&this._cursor.peek()!==62&&this._cursor.peek()!==60&&this._cursor.peek()!==0;){let[o,u]=this._consumeAttributeName();if(this._attemptCharCodeUntilFn(b$1),this._attemptCharCode(61)){this._attemptCharCodeUntilFn(b$1);let p=this._consumeAttributeValue();i.push({prefix:o,name:u,value:p});}else i.push({prefix:o,name:u});this._attemptCharCodeUntilFn(b$1);}this._consumeTagOpenEnd();}catch(o){if(o instanceof Ct$1){s?s.type=4:(this._beginToken(5,e),this._endToken(["<"]));return}throw o}if(this._canSelfClose&&this.tokens[this.tokens.length-1].type===2)return;let a=this._getTagContentType(r,n,this._fullNameStack.length>0,i);this._handleFullNameStackForTagOpen(n,r),a===N$1.RAW_TEXT?this._consumeRawTextWithTagClose(n,r,false):a===N$1.ESCAPABLE_RAW_TEXT&&this._consumeRawTextWithTagClose(n,r,true);}_consumeRawTextWithTagClose(e,r,n){this._consumeRawText(n,()=>!this._attemptCharCode(60)||!this._attemptCharCode(47)||(this._attemptCharCodeUntilFn(b$1),!this._attemptStrCaseInsensitive(e?`${e}:${r}`:r))?false:(this._attemptCharCodeUntilFn(b$1),this._attemptCharCode(62))),this._beginToken(3),this._requireCharCodeUntilFn(s=>s===62,3),this._cursor.advance(),this._endToken([e,r]),this._handleFullNameStackForTagClose(e,r);}_consumeTagOpenStart(e){this._beginToken(0,e);let r=this._consumePrefixAndName();return this._endToken(r)}_consumeAttributeName(){let e=this._cursor.peek();if(e===39||e===34)throw this._createError(Ue$1(e),this._cursor.getSpan());this._beginToken(14);let r=this._consumePrefixAndName();return this._endToken(r),r}_consumeAttributeValue(){let e;if(this._cursor.peek()===39||this._cursor.peek()===34){let r=this._cursor.peek();this._consumeQuote(r);let n=()=>this._cursor.peek()===r;e=this._consumeWithInterpolation(16,17,n,n),this._consumeQuote(r);}else {let r=()=>ri$1(this._cursor.peek());e=this._consumeWithInterpolation(16,17,r,r);}return e}_consumeQuote(e){this._beginToken(15),this._requireCharCode(e),this._endToken([String.fromCodePoint(e)]);}_consumeTagOpenEnd(){let e=this._attemptCharCode(47)?2:1;this._beginToken(e),this._requireCharCode(62),this._endToken([]);}_consumeTagClose(e){if(this._beginToken(3,e),this._attemptCharCodeUntilFn(b$1),this._allowHtmComponentClosingTags&&this._attemptCharCode(47))this._attemptCharCodeUntilFn(b$1),this._requireCharCode(62),this._endToken([]);else {let[r,n]=this._consumePrefixAndName();this._attemptCharCodeUntilFn(b$1),this._requireCharCode(62),this._endToken([r,n]),this._handleFullNameStackForTagClose(r,n);}}_consumeExpansionFormStart(){this._beginToken(20),this._requireCharCode(123),this._endToken([]),this._expansionCaseStack.push(20),this._beginToken(7);let e=this._readUntil(44),r=this._processCarriageReturns(e);if(this._i18nNormalizeLineEndingsInICUs)this._endToken([r]);else {let s=this._endToken([e]);r!==e&&this.nonNormalizedIcuExpressions.push(s);}this._requireCharCode(44),this._attemptCharCodeUntilFn(b$1),this._beginToken(7);let n=this._readUntil(44);this._endToken([n]),this._requireCharCode(44),this._attemptCharCodeUntilFn(b$1);}_consumeExpansionCaseStart(){this._beginToken(21);let e=this._readUntil(123).trim();this._endToken([e]),this._attemptCharCodeUntilFn(b$1),this._beginToken(22),this._requireCharCode(123),this._endToken([]),this._attemptCharCodeUntilFn(b$1),this._expansionCaseStack.push(22);}_consumeExpansionCaseEnd(){this._beginToken(23),this._requireCharCode(125),this._endToken([]),this._attemptCharCodeUntilFn(b$1),this._expansionCaseStack.pop();}_consumeExpansionFormEnd(){this._beginToken(24),this._requireCharCode(125),this._endToken([]),this._expansionCaseStack.pop();}_consumeWithInterpolation(e,r,n,s){this._beginToken(e);let i=[];for(;!n();){let o=this._cursor.clone();this._interpolationConfig&&this._attemptStr(this._interpolationConfig.start)?(this._endToken([this._processCarriageReturns(i.join(""))],o),i.length=0,this._consumeInterpolation(r,o,s),this._beginToken(e)):this._cursor.peek()===38?(this._endToken([this._processCarriageReturns(i.join(""))]),i.length=0,this._consumeEntity(e),this._beginToken(e)):i.push(this._readChar());}this._inInterpolation=false;let a=this._processCarriageReturns(i.join(""));return this._endToken([a]),a}_consumeInterpolation(e,r,n){let s=[];this._beginToken(e,r),s.push(this._interpolationConfig.start);let i=this._cursor.clone(),a=null,o=false;for(;this._cursor.peek()!==0&&(n===null||!n());){let u=this._cursor.clone();if(this._isTagStart()){this._cursor=u,s.push(this._getProcessedChars(i,u)),this._endToken(s);return}if(a===null)if(this._attemptStr(this._interpolationConfig.end)){s.push(this._getProcessedChars(i,u)),s.push(this._interpolationConfig.end),this._endToken(s);return}else this._attemptStr("//")&&(o=true);let p=this._cursor.peek();this._cursor.advance(),p===92?this._cursor.advance():p===a?a=null:!o&&a===null&&Ot$1(p)&&(a=p);}s.push(this._getProcessedChars(i,this._cursor)),this._endToken(s);}_getProcessedChars(e,r){return this._processCarriageReturns(r.getChars(e))}_isTextEnd(){return !!(this._isTagStart()||this._cursor.peek()===0||this._tokenizeIcu&&!this._inInterpolation&&(this.isExpansionFormStart()||this._cursor.peek()===125&&this._isInExpansionCase())||this._tokenizeBlocks&&!this._inInterpolation&&!this._isInExpansion()&&(this._isBlockStart()||this._cursor.peek()===64||this._cursor.peek()===125))}_isTagStart(){if(this._cursor.peek()===60){let e=this._cursor.clone();e.advance();let r=e.peek();if(97<=r&&r<=122||65<=r&&r<=90||r===47||r===33)return  true}return  false}_isBlockStart(){if(this._tokenizeBlocks&&this._cursor.peek()===64){let e=this._cursor.clone();if(e.advance(),si(e.peek()))return  true}return  false}_readUntil(e){let r=this._cursor.clone();return this._attemptUntilChar(e),this._cursor.getChars(r)}_isInExpansion(){return this._isInExpansionCase()||this._isInExpansionForm()}_isInExpansionCase(){return this._expansionCaseStack.length>0&&this._expansionCaseStack[this._expansionCaseStack.length-1]===22}_isInExpansionForm(){return this._expansionCaseStack.length>0&&this._expansionCaseStack[this._expansionCaseStack.length-1]===20}isExpansionFormStart(){if(this._cursor.peek()!==123)return  false;if(this._interpolationConfig){let e=this._cursor.clone(),r=this._attemptStr(this._interpolationConfig.start);return this._cursor=e,!r}return  true}_handleFullNameStackForTagOpen(e,r){let n=qe$1(e,r);(this._fullNameStack.length===0||this._fullNameStack[this._fullNameStack.length-1]===n)&&this._fullNameStack.push(n);}_handleFullNameStackForTagClose(e,r){let n=qe$1(e,r);this._fullNameStack.length!==0&&this._fullNameStack[this._fullNameStack.length-1]===n&&this._fullNameStack.pop();}};function b$1(t){return !ut$1(t)||t===0}function ri$1(t){return ut$1(t)||t===62||t===60||t===47||t===39||t===34||t===61||t===0}function $o$1(t){return (t<97||122<t)&&(t<65||90<t)&&(t<48||t>57)}function Oo$1(t){return t===59||t===0||!Rs(t)}function Mo$1(t){return t===59||t===0||!lt(t)}function qo$1(t){return t!==125}function Ho$1(t,e){return ni$1(t)===ni$1(e)}function ni$1(t){return t>=97&&t<=122?t-97+65:t}function si(t){return lt(t)||Rt$1(t)||t===95}function ii(t){return t!==59&&b$1(t)}function Vo$1(t){let e=[],r;for(let n=0;n<t.length;n++){let s=t[n];r&&r.type===5&&s.type===5||r&&r.type===16&&s.type===16?(r.parts[0]+=s.parts[0],r.sourceSpan.end=s.sourceSpan.end):(r=s,e.push(r));}return e}var nr$1=class t{constructor(e,r){if(e instanceof t){this.file=e.file,this.input=e.input,this.end=e.end;let n=e.state;this.state={peek:n.peek,offset:n.offset,line:n.line,column:n.column};}else {if(!r)throw new Error("Programming error: the range argument must be provided with a file argument.");this.file=e,this.input=e.content,this.end=r.endPos,this.state={peek:-1,offset:r.startPos,line:r.startLine,column:r.startCol};}}clone(){return new t(this)}peek(){return this.state.peek}charsLeft(){return this.end-this.state.offset}diff(e){return this.state.offset-e.state.offset}advance(){this.advanceState(this.state);}init(){this.updatePeek(this.state);}getSpan(e,r){e=e||this;let n=e;if(r)for(;this.diff(e)>0&&r.indexOf(e.peek())!==-1;)n===e&&(e=e.clone()),e.advance();let s=this.locationFromCursor(e),i=this.locationFromCursor(this),a=n!==e?this.locationFromCursor(n):s;return new h(s,i,a)}getChars(e){return this.input.substring(e.state.offset,this.state.offset)}charAt(e){return this.input.charCodeAt(e)}advanceState(e){if(e.offset>=this.end)throw this.state=e,new St$1('Unexpected character "EOF"',this);let r=this.charAt(e.offset);r===10?(e.line++,e.column=0):$t$1(r)||e.column++,e.offset++,this.updatePeek(e);}updatePeek(e){e.peek=e.offset>=this.end?0:this.charAt(e.offset);}locationFromCursor(e){return new ie$1(e.file,e.state.offset,e.state.line,e.state.column)}},Gr$1=class t extends nr$1{constructor(e,r){e instanceof t?(super(e),this.internalState={...e.internalState}):(super(e,r),this.internalState=this.state);}advance(){this.state=this.internalState,super.advance(),this.processEscapeSequence();}init(){super.init(),this.processEscapeSequence();}clone(){return new t(this)}getChars(e){let r=e.clone(),n="";for(;r.internalState.offset<this.internalState.offset;)n+=String.fromCodePoint(r.peek()),r.advance();return n}processEscapeSequence(){let e=()=>this.internalState.peek;if(e()===92)if(this.internalState={...this.state},this.advanceState(this.internalState),e()===110)this.state.peek=10;else if(e()===114)this.state.peek=13;else if(e()===118)this.state.peek=11;else if(e()===116)this.state.peek=9;else if(e()===98)this.state.peek=8;else if(e()===102)this.state.peek=12;else if(e()===117)if(this.advanceState(this.internalState),e()===123){this.advanceState(this.internalState);let r=this.clone(),n=0;for(;e()!==125;)this.advanceState(this.internalState),n++;this.state.peek=this.decodeHexDigits(r,n);}else {let r=this.clone();this.advanceState(this.internalState),this.advanceState(this.internalState),this.advanceState(this.internalState),this.state.peek=this.decodeHexDigits(r,4);}else if(e()===120){this.advanceState(this.internalState);let r=this.clone();this.advanceState(this.internalState),this.state.peek=this.decodeHexDigits(r,2);}else if(Br$1(e())){let r="",n=0,s=this.clone();for(;Br$1(e())&&n<3;)s=this.clone(),r+=String.fromCodePoint(e()),this.advanceState(this.internalState),n++;this.state.peek=parseInt(r,8),this.internalState=s.internalState;}else $t$1(this.internalState.peek)?(this.advanceState(this.internalState),this.state=this.internalState):this.state.peek=this.internalState.peek;}decodeHexDigits(e,r){let n=this.input.slice(e.internalState.offset,e.internalState.offset+r),s=parseInt(n,16);if(isNaN(s))throw e.state=e.internalState,new St$1("Invalid hexadecimal escape sequence",e);return s}},St$1=class St{constructor(e,r){this.msg=e,this.cursor=r;}};var L$1=class t extends Oe$1{static create(e,r,n){return new t(e,r,n)}constructor(e,r,n){super(r,n),this.elementName=e;}},jr$1=class jr{constructor(e,r){this.rootNodes=e,this.errors=r;}},sr$1=class sr{constructor(e){this.getTagDefinition=e;}parse(e,r,n,s=false,i){let a=D=>(I,...F)=>D(I.toLowerCase(),...F),o=s?this.getTagDefinition:a(this.getTagDefinition),u=D=>o(D).getContentType(),p=s?i:a(i),m=li(e,r,i?(D,I,F,c)=>{let g=p(D,I,F,c);return g!==void 0?g:u(D)}:u,n),f=n&&n.canSelfClose||false,C=n&&n.allowHtmComponentClosingTags||false,A=new Kr(m.tokens,o,f,C,s);return A.build(),new jr$1(A.rootNodes,m.errors.concat(A.errors))}},Kr=class t{constructor(e,r,n,s,i){this.tokens=e,this.getTagDefinition=r,this.canSelfClose=n,this.allowHtmComponentClosingTags=s,this.isTagNameCaseSensitive=i,this._index=-1,this._containerStack=[],this.rootNodes=[],this.errors=[],this._advance();}build(){for(;this._peek.type!==34;)this._peek.type===0||this._peek.type===4?this._consumeStartTag(this._advance()):this._peek.type===3?(this._closeVoidElement(),this._consumeEndTag(this._advance())):this._peek.type===12?(this._closeVoidElement(),this._consumeCdata(this._advance())):this._peek.type===10?(this._closeVoidElement(),this._consumeComment(this._advance())):this._peek.type===5||this._peek.type===7||this._peek.type===6?(this._closeVoidElement(),this._consumeText(this._advance())):this._peek.type===20?this._consumeExpansion(this._advance()):this._peek.type===25?(this._closeVoidElement(),this._consumeBlockOpen(this._advance())):this._peek.type===27?(this._closeVoidElement(),this._consumeBlockClose(this._advance())):this._peek.type===29?(this._closeVoidElement(),this._consumeIncompleteBlock(this._advance())):this._peek.type===30?(this._closeVoidElement(),this._consumeLet(this._advance())):this._peek.type===18?this._consumeDocType(this._advance()):this._peek.type===33?(this._closeVoidElement(),this._consumeIncompleteLet(this._advance())):this._advance();for(let e of this._containerStack)e instanceof ee$1&&this.errors.push(L$1.create(e.name,e.sourceSpan,`Unclosed block "${e.name}"`));}_advance(){let e=this._peek;return this._index<this.tokens.length-1&&this._index++,this._peek=this.tokens[this._index],e}_advanceIf(e){return this._peek.type===e?this._advance():null}_consumeCdata(e){let r=this._advance(),n=this._getText(r),s=this._advanceIf(13);this._addToParent(new Gt$1(n,new h(e.sourceSpan.start,(s||r).sourceSpan.end),[r]));}_consumeComment(e){let r=this._advanceIf(7),n=this._advanceIf(11),s=r!=null?r.parts[0].trim():null,i=n==null?e.sourceSpan:new h(e.sourceSpan.start,n.sourceSpan.end,e.sourceSpan.fullStart);this._addToParent(new Kt$1(s,i));}_consumeDocType(e){let r=this._advanceIf(7),n=this._advanceIf(19),s=r!=null?r.parts[0].trim():null,i=new h(e.sourceSpan.start,(n||r||e).sourceSpan.end);this._addToParent(new Xt$1(s,i));}_consumeExpansion(e){let r=this._advance(),n=this._advance(),s=[];for(;this._peek.type===21;){let a=this._parseExpansionCase();if(!a)return;s.push(a);}if(this._peek.type!==24){this.errors.push(L$1.create(null,this._peek.sourceSpan,"Invalid ICU message. Missing '}'."));return}let i=new h(e.sourceSpan.start,this._peek.sourceSpan.end,e.sourceSpan.fullStart);this._addToParent(new zt$1(r.parts[0],n.parts[0],s,i,r.sourceSpan)),this._advance();}_parseExpansionCase(){let e=this._advance();if(this._peek.type!==22)return this.errors.push(L$1.create(null,this._peek.sourceSpan,"Invalid ICU message. Missing '{'.")),null;let r=this._advance(),n=this._collectExpansionExpTokens(r);if(!n)return null;let s=this._advance();n.push({type:34,parts:[],sourceSpan:s.sourceSpan});let i=new t(n,this.getTagDefinition,this.canSelfClose,this.allowHtmComponentClosingTags,this.isTagNameCaseSensitive);if(i.build(),i.errors.length>0)return this.errors=this.errors.concat(i.errors),null;let a=new h(e.sourceSpan.start,s.sourceSpan.end,e.sourceSpan.fullStart),o=new h(r.sourceSpan.start,s.sourceSpan.end,r.sourceSpan.fullStart);return new Yt$1(e.parts[0],i.rootNodes,a,e.sourceSpan,o)}_collectExpansionExpTokens(e){let r=[],n=[22];for(;;){if((this._peek.type===20||this._peek.type===22)&&n.push(this._peek.type),this._peek.type===23)if(ci(n,22)){if(n.pop(),n.length===0)return r}else return this.errors.push(L$1.create(null,e.sourceSpan,"Invalid ICU message. Missing '}'.")),null;if(this._peek.type===24)if(ci(n,20))n.pop();else return this.errors.push(L$1.create(null,e.sourceSpan,"Invalid ICU message. Missing '}'.")),null;if(this._peek.type===34)return this.errors.push(L$1.create(null,e.sourceSpan,"Invalid ICU message. Missing '}'.")),null;r.push(this._advance());}}_getText(e){let r=e.parts[0];if(r.length>0&&r[0]==`
`){let n=this._getClosestParentElement();n!=null&&n.children.length==0&&this.getTagDefinition(n.name).ignoreFirstLf&&(r=r.substring(1));}return r}_consumeText(e){let r=[e],n=e.sourceSpan,s=e.parts[0];if(s.length>0&&s[0]===`
`){let i=this._getContainer();i!=null&&i.children.length===0&&this.getTagDefinition(i.name).ignoreFirstLf&&(s=s.substring(1),r[0]={type:e.type,sourceSpan:e.sourceSpan,parts:[s]});}for(;this._peek.type===8||this._peek.type===5||this._peek.type===9;)e=this._advance(),r.push(e),e.type===8?s+=e.parts.join("").replace(/&([^;]+);/g,pi):e.type===9?s+=e.parts[0]:s+=e.parts.join("");if(s.length>0){let i=e.sourceSpan;this._addToParent(new Wt$1(s,new h(n.start,i.end,n.fullStart,n.details),r));}}_closeVoidElement(){let e=this._getContainer();e instanceof Y$1&&this.getTagDefinition(e.name).isVoid&&this._containerStack.pop();}_consumeStartTag(e){let[r,n]=e.parts,s=[];for(;this._peek.type===14;)s.push(this._consumeAttr(this._advance()));let i=this._getElementFullName(r,n,this._getClosestParentElement()),a=false;if(this._peek.type===2){this._advance(),a=true;let C=this.getTagDefinition(i);this.canSelfClose||C.canSelfClose||Me$1(i)!==null||C.isVoid||this.errors.push(L$1.create(i,e.sourceSpan,`Only void, custom and foreign elements can be self closed "${e.parts[1]}"`));}else this._peek.type===1&&(this._advance(),a=false);let o=this._peek.sourceSpan.fullStart,u=new h(e.sourceSpan.start,o,e.sourceSpan.fullStart),p=new h(e.sourceSpan.start,o,e.sourceSpan.fullStart),l=new h(e.sourceSpan.start.moveBy(1),e.sourceSpan.end),m=new Y$1(i,s,[],u,p,void 0,l),f=this._getContainer();this._pushContainer(m,f instanceof Y$1&&this.getTagDefinition(f.name).isClosedByChild(m.name)),a?this._popContainer(i,Y$1,u):e.type===4&&(this._popContainer(i,Y$1,null),this.errors.push(L$1.create(i,u,`Opening tag "${i}" not terminated.`)));}_pushContainer(e,r){r&&this._containerStack.pop(),this._addToParent(e),this._containerStack.push(e);}_consumeEndTag(e){let r=this.allowHtmComponentClosingTags&&e.parts.length===0?null:this._getElementFullName(e.parts[0],e.parts[1],this._getClosestParentElement());if(r&&this.getTagDefinition(r).isVoid)this.errors.push(L$1.create(r,e.sourceSpan,`Void elements do not have end tags "${e.parts[1]}"`));else if(!this._popContainer(r,Y$1,e.sourceSpan)){let n=`Unexpected closing tag "${r}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;this.errors.push(L$1.create(r,e.sourceSpan,n));}}_popContainer(e,r,n){let s=false;for(let i=this._containerStack.length-1;i>=0;i--){let a=this._containerStack[i];if(Me$1(a.name)?a.name===e:(e==null||a.name.toLowerCase()===e.toLowerCase())&&a instanceof r)return a.endSourceSpan=n,a.sourceSpan.end=n!==null?n.end:a.sourceSpan.end,this._containerStack.splice(i,this._containerStack.length-i),!s;(a instanceof ee$1||a instanceof Y$1&&!this.getTagDefinition(a.name).closedByParent)&&(s=true);}return  false}_consumeAttr(e){let r=qe$1(e.parts[0],e.parts[1]),n=e.sourceSpan.end,s;this._peek.type===15&&(s=this._advance());let i="",a=[],o,u;if(this._peek.type===16)for(o=this._peek.sourceSpan,u=this._peek.sourceSpan.end;this._peek.type===16||this._peek.type===17||this._peek.type===9;){let m=this._advance();a.push(m),m.type===17?i+=m.parts.join("").replace(/&([^;]+);/g,pi):m.type===9?i+=m.parts[0]:i+=m.parts.join(""),u=n=m.sourceSpan.end;}this._peek.type===15&&(u=n=this._advance().sourceSpan.end);let l=o&&u&&new h((s==null?void 0:s.sourceSpan.start)??o.start,u,(s==null?void 0:s.sourceSpan.fullStart)??o.fullStart);return new jt$1(r,i,new h(e.sourceSpan.start,n,e.sourceSpan.fullStart),e.sourceSpan,l,a.length>0?a:void 0,void 0)}_consumeBlockOpen(e){let r=[];for(;this._peek.type===28;){let o=this._advance();r.push(new ht$1(o.parts[0],o.sourceSpan));}this._peek.type===26&&this._advance();let n=this._peek.sourceSpan.fullStart,s=new h(e.sourceSpan.start,n,e.sourceSpan.fullStart),i=new h(e.sourceSpan.start,n,e.sourceSpan.fullStart),a=new ee$1(e.parts[0],r,[],s,e.sourceSpan,i);this._pushContainer(a,false);}_consumeBlockClose(e){this._popContainer(null,ee$1,e.sourceSpan)||this.errors.push(L$1.create(null,e.sourceSpan,'Unexpected closing block. The block may have been closed earlier. If you meant to write the } character, you should use the "&#125;" HTML entity instead.'));}_consumeIncompleteBlock(e){let r=[];for(;this._peek.type===28;){let o=this._advance();r.push(new ht$1(o.parts[0],o.sourceSpan));}let n=this._peek.sourceSpan.fullStart,s=new h(e.sourceSpan.start,n,e.sourceSpan.fullStart),i=new h(e.sourceSpan.start,n,e.sourceSpan.fullStart),a=new ee$1(e.parts[0],r,[],s,e.sourceSpan,i);this._pushContainer(a,false),this._popContainer(null,ee$1,null),this.errors.push(L$1.create(e.parts[0],s,`Incomplete block "${e.parts[0]}". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.`));}_consumeLet(e){let r=e.parts[0],n,s;if(this._peek.type!==31){this.errors.push(L$1.create(e.parts[0],e.sourceSpan,`Invalid @let declaration "${r}". Declaration must have a value.`));return}else n=this._advance();if(this._peek.type!==32){this.errors.push(L$1.create(e.parts[0],e.sourceSpan,`Unterminated @let declaration "${r}". Declaration must be terminated with a semicolon.`));return}else s=this._advance();let i=s.sourceSpan.fullStart,a=new h(e.sourceSpan.start,i,e.sourceSpan.fullStart),o=e.sourceSpan.toString().lastIndexOf(r),u=e.sourceSpan.start.moveBy(o),p=new h(u,e.sourceSpan.end),l=new mt$1(r,n.parts[0],a,p,n.sourceSpan);this._addToParent(l);}_consumeIncompleteLet(e){let r=e.parts[0]??"",n=r?` "${r}"`:"";if(r.length>0){let s=e.sourceSpan.toString().lastIndexOf(r),i=e.sourceSpan.start.moveBy(s),a=new h(i,e.sourceSpan.end),o=new h(e.sourceSpan.start,e.sourceSpan.start.moveBy(0)),u=new mt$1(r,"",e.sourceSpan,a,o);this._addToParent(u);}this.errors.push(L$1.create(e.parts[0],e.sourceSpan,`Incomplete @let declaration${n}. @let declarations must be written as \`@let <name> = <value>;\``));}_getContainer(){return this._containerStack.length>0?this._containerStack[this._containerStack.length-1]:null}_getClosestParentElement(){for(let e=this._containerStack.length-1;e>-1;e--)if(this._containerStack[e]instanceof Y$1)return this._containerStack[e];return null}_addToParent(e){let r=this._getContainer();r===null?this.rootNodes.push(e):r.children.push(e);}_getElementFullName(e,r,n){if(e===""&&(e=this.getTagDefinition(r).implicitNamespacePrefix||"",e===""&&n!=null)){let s=ct$1(n.name)[1];this.getTagDefinition(s).preventNamespaceInheritance||(e=Me$1(n.name));}return qe$1(e,r)}};function ci(t,e){return t.length>0&&t[t.length-1]===e}function pi(t,e){return Ve$1[e]!==void 0?Ve$1[e]||t:/^#x[a-f0-9]+$/i.test(e)?String.fromCodePoint(parseInt(e.slice(2),16)):/^#\d+$/.test(e)?String.fromCodePoint(parseInt(e.slice(1),10)):t}var ir$1=class ir extends sr$1{constructor(){super(He$1);}parse(e,r,n,s=false,i){return super.parse(e,r,n,s,i)}};var Xr$1=null,Uo$1=()=>(Xr$1||(Xr$1=new ir$1),Xr$1);function Qr$1(t,e={}){let{canSelfClose:r=false,allowHtmComponentClosingTags:n=false,isTagNameCaseSensitive:s=false,getTagContentType:i,tokenizeAngularBlocks:a=false,tokenizeAngularLetDeclaration:o=false}=e;return Uo$1().parse(t,"angular-html-parser",{tokenizeExpansionForms:a,interpolationConfig:void 0,canSelfClose:r,allowHtmComponentClosingTags:n,tokenizeBlocks:a,tokenizeLet:o},s,i)}function Wo$1(t,e){let r=new SyntaxError(t+" ("+e.loc.start.line+":"+e.loc.start.column+")");return Object.assign(r,e)}var hi=Wo$1;var _t$1=3;function Go$1(t){let e=t.slice(0,_t$1);if(e!=="---"&&e!=="+++")return;let r=t.indexOf(`
`,_t$1);if(r===-1)return;let n=t.slice(_t$1,r).trim(),s=t.indexOf(`
${e}`,r),i=n;if(i||(i=e==="+++"?"toml":"yaml"),s===-1&&e==="---"&&i==="yaml"&&(s=t.indexOf(`
...`,r)),s===-1)return;let a=s+1+_t$1,o=t.charAt(a+1);if(!/\s?/u.test(o))return;let u=t.slice(0,a);return {type:"front-matter",language:i,explicitLanguage:n,value:t.slice(r+1,s),startDelimiter:e,endDelimiter:u.slice(-_t$1),raw:u}}function zo$1(t){let e=Go$1(t);if(!e)return {content:t};let{raw:r}=e;return {frontMatter:e,content:w$1(false,r,/[^\n]/gu," ")+t.slice(r.length)}}var mi=zo$1;var ar$1={attrs:true,children:true,cases:true,expression:true},fi=new Set(["parent"]),le$1,Jr$1,Zr$1,Ge$1=class Ge{constructor(e={}){At$1(this,le$1);lr$1(this,"type");lr$1(this,"parent");for(let r of new Set([...fi,...Object.keys(e)]))this.setProperty(r,e[r]);}setProperty(e,r){if(this[e]!==r){if(e in ar$1&&(r=r.map(n=>this.createChild(n))),!fi.has(e)){this[e]=r;return}Object.defineProperty(this,e,{value:r,enumerable:false,configurable:true});}}map(e){let r;for(let n in ar$1){let s=this[n];if(s){let i=Yo$1(s,a=>a.map(e));r!==s&&(r||(r=new Ge({parent:this.parent})),r.setProperty(n,i));}}if(r)for(let n in this)n in ar$1||(r[n]=this[n]);return e(r||this)}walk(e){for(let r in ar$1){let n=this[r];if(n)for(let s=0;s<n.length;s++)n[s].walk(e);}e(this);}createChild(e){let r=e instanceof Ge?e.clone():new Ge(e);return r.setProperty("parent",this),r}insertChildBefore(e,r){let n=this.$children;n.splice(n.indexOf(e),0,this.createChild(r));}removeChild(e){let r=this.$children;r.splice(r.indexOf(e),1);}replaceChild(e,r){let n=this.$children;n[n.indexOf(e)]=this.createChild(r);}clone(){return new Ge(this)}get $children(){return this[R$1(this,le$1,Jr$1)]}set $children(e){this[R$1(this,le$1,Jr$1)]=e;}get firstChild(){var e;return (e=this.$children)==null?void 0:e[0]}get lastChild(){return K(true,this.$children,-1)}get prev(){let e=R$1(this,le$1,Zr$1);return e[e.indexOf(this)-1]}get next(){let e=R$1(this,le$1,Zr$1);return e[e.indexOf(this)+1]}get rawName(){return this.hasExplicitNamespace?this.fullName:this.name}get fullName(){return this.namespace?this.namespace+":"+this.name:this.name}get attrMap(){return Object.fromEntries(this.attrs.map(e=>[e.fullName,e.value]))}};le$1=new WeakSet,Jr$1=function(){return this.type==="angularIcuCase"?"expression":this.type==="angularIcuExpression"?"cases":"children"},Zr$1=function(){var e;return ((e=this.parent)==null?void 0:e.$children)??[]};var or$1=Ge$1;function Yo$1(t,e){let r=t.map(e);return r.some((n,s)=>n!==t[s])?r:t}var jo$1=[{regex:/^(\[if([^\]]*)\]>)(.*?)<!\s*\[endif\]$/su,parse:Ko$1},{regex:/^\[if([^\]]*)\]><!$/u,parse:Xo$1},{regex:/^<!\s*\[endif\]$/u,parse:Qo$1}];function di(t,e){if(t.value)for(let{regex:r,parse:n}of jo$1){let s=t.value.match(r);if(s)return n(t,e,s)}return null}function Ko$1(t,e,r){let[,n,s,i]=r,a=4+n.length,o=t.sourceSpan.start.moveBy(a),u=o.moveBy(i.length),[p,l]=(()=>{try{return [!0,e(i,o).children]}catch{return [false,[{type:"text",value:i,sourceSpan:new h(o,u)}]]}})();return {type:"ieConditionalComment",complete:p,children:l,condition:w$1(false,s.trim(),/\s+/gu," "),sourceSpan:t.sourceSpan,startSourceSpan:new h(t.sourceSpan.start,o),endSourceSpan:new h(u,t.sourceSpan.end)}}function Xo$1(t,e,r){let[,n]=r;return {type:"ieConditionalStartComment",condition:w$1(false,n.trim(),/\s+/gu," "),sourceSpan:t.sourceSpan}}function Qo$1(t){return {type:"ieConditionalEndComment",sourceSpan:t.sourceSpan}}var ur$1=new Map([["*",new Set(["accesskey","autocapitalize","autofocus","class","contenteditable","dir","draggable","enterkeyhint","hidden","id","inert","inputmode","is","itemid","itemprop","itemref","itemscope","itemtype","lang","nonce","popover","slot","spellcheck","style","tabindex","title","translate","writingsuggestions"])],["a",new Set(["charset","coords","download","href","hreflang","name","ping","referrerpolicy","rel","rev","shape","target","type"])],["applet",new Set(["align","alt","archive","code","codebase","height","hspace","name","object","vspace","width"])],["area",new Set(["alt","coords","download","href","hreflang","nohref","ping","referrerpolicy","rel","shape","target","type"])],["audio",new Set(["autoplay","controls","crossorigin","loop","muted","preload","src"])],["base",new Set(["href","target"])],["basefont",new Set(["color","face","size"])],["blockquote",new Set(["cite"])],["body",new Set(["alink","background","bgcolor","link","text","vlink"])],["br",new Set(["clear"])],["button",new Set(["disabled","form","formaction","formenctype","formmethod","formnovalidate","formtarget","name","popovertarget","popovertargetaction","type","value"])],["canvas",new Set(["height","width"])],["caption",new Set(["align"])],["col",new Set(["align","char","charoff","span","valign","width"])],["colgroup",new Set(["align","char","charoff","span","valign","width"])],["data",new Set(["value"])],["del",new Set(["cite","datetime"])],["details",new Set(["name","open"])],["dialog",new Set(["open"])],["dir",new Set(["compact"])],["div",new Set(["align"])],["dl",new Set(["compact"])],["embed",new Set(["height","src","type","width"])],["fieldset",new Set(["disabled","form","name"])],["font",new Set(["color","face","size"])],["form",new Set(["accept","accept-charset","action","autocomplete","enctype","method","name","novalidate","target"])],["frame",new Set(["frameborder","longdesc","marginheight","marginwidth","name","noresize","scrolling","src"])],["frameset",new Set(["cols","rows"])],["h1",new Set(["align"])],["h2",new Set(["align"])],["h3",new Set(["align"])],["h4",new Set(["align"])],["h5",new Set(["align"])],["h6",new Set(["align"])],["head",new Set(["profile"])],["hr",new Set(["align","noshade","size","width"])],["html",new Set(["manifest","version"])],["iframe",new Set(["align","allow","allowfullscreen","allowpaymentrequest","allowusermedia","frameborder","height","loading","longdesc","marginheight","marginwidth","name","referrerpolicy","sandbox","scrolling","src","srcdoc","width"])],["img",new Set(["align","alt","border","crossorigin","decoding","fetchpriority","height","hspace","ismap","loading","longdesc","name","referrerpolicy","sizes","src","srcset","usemap","vspace","width"])],["input",new Set(["accept","align","alt","autocomplete","checked","dirname","disabled","form","formaction","formenctype","formmethod","formnovalidate","formtarget","height","ismap","list","max","maxlength","min","minlength","multiple","name","pattern","placeholder","popovertarget","popovertargetaction","readonly","required","size","src","step","type","usemap","value","width"])],["ins",new Set(["cite","datetime"])],["isindex",new Set(["prompt"])],["label",new Set(["for","form"])],["legend",new Set(["align"])],["li",new Set(["type","value"])],["link",new Set(["as","blocking","charset","color","crossorigin","disabled","fetchpriority","href","hreflang","imagesizes","imagesrcset","integrity","media","referrerpolicy","rel","rev","sizes","target","type"])],["map",new Set(["name"])],["menu",new Set(["compact"])],["meta",new Set(["charset","content","http-equiv","media","name","scheme"])],["meter",new Set(["high","low","max","min","optimum","value"])],["object",new Set(["align","archive","border","classid","codebase","codetype","data","declare","form","height","hspace","name","standby","type","typemustmatch","usemap","vspace","width"])],["ol",new Set(["compact","reversed","start","type"])],["optgroup",new Set(["disabled","label"])],["option",new Set(["disabled","label","selected","value"])],["output",new Set(["for","form","name"])],["p",new Set(["align"])],["param",new Set(["name","type","value","valuetype"])],["pre",new Set(["width"])],["progress",new Set(["max","value"])],["q",new Set(["cite"])],["script",new Set(["async","blocking","charset","crossorigin","defer","fetchpriority","integrity","language","nomodule","referrerpolicy","src","type"])],["select",new Set(["autocomplete","disabled","form","multiple","name","required","size"])],["slot",new Set(["name"])],["source",new Set(["height","media","sizes","src","srcset","type","width"])],["style",new Set(["blocking","media","type"])],["table",new Set(["align","bgcolor","border","cellpadding","cellspacing","frame","rules","summary","width"])],["tbody",new Set(["align","char","charoff","valign"])],["td",new Set(["abbr","align","axis","bgcolor","char","charoff","colspan","headers","height","nowrap","rowspan","scope","valign","width"])],["template",new Set(["shadowrootclonable","shadowrootdelegatesfocus","shadowrootmode"])],["textarea",new Set(["autocomplete","cols","dirname","disabled","form","maxlength","minlength","name","placeholder","readonly","required","rows","wrap"])],["tfoot",new Set(["align","char","charoff","valign"])],["th",new Set(["abbr","align","axis","bgcolor","char","charoff","colspan","headers","height","nowrap","rowspan","scope","valign","width"])],["thead",new Set(["align","char","charoff","valign"])],["time",new Set(["datetime"])],["tr",new Set(["align","bgcolor","char","charoff","valign"])],["track",new Set(["default","kind","label","src","srclang"])],["ul",new Set(["compact","type"])],["video",new Set(["autoplay","controls","crossorigin","height","loop","muted","playsinline","poster","preload","src","width"])]]);var gi=new Set(["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","bgsound","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","command","content","data","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","image","img","input","ins","isindex","kbd","keygen","label","legend","li","link","listing","main","map","mark","marquee","math","menu","menuitem","meta","meter","multicol","nav","nextid","nobr","noembed","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","plaintext","pre","progress","q","rb","rbc","rp","rt","rtc","ruby","s","samp","script","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr","xmp"]);function Jo$1(t){if(t.type==="block"){if(t.name=w$1(false,t.name.toLowerCase(),/\s+/gu," ").trim(),t.type="angularControlFlowBlock",!me$1(t.parameters)){delete t.parameters;return}for(let e of t.parameters)e.type="angularControlFlowBlockParameter";t.parameters={type:"angularControlFlowBlockParameters",children:t.parameters,sourceSpan:new h(t.parameters[0].sourceSpan.start,K(false,t.parameters,-1).sourceSpan.end)};}}function Zo$1(t){t.type==="letDeclaration"&&(t.type="angularLetDeclaration",t.id=t.name,t.init={type:"angularLetDeclarationInitializer",sourceSpan:new h(t.valueSpan.start,t.valueSpan.end),value:t.value},delete t.name,delete t.value);}function eu$1(t){(t.type==="plural"||t.type==="select")&&(t.clause=t.type,t.type="angularIcuExpression"),t.type==="expansionCase"&&(t.type="angularIcuCase");}function Si(t,e,r){let{name:n,canSelfClose:s=true,normalizeTagName:i=false,normalizeAttributeName:a=false,allowHtmComponentClosingTags:o=false,isTagNameCaseSensitive:u=false,shouldParseAsRawText:p}=e,{rootNodes:l,errors:m}=Qr$1(t,{canSelfClose:s,allowHtmComponentClosingTags:o,isTagNameCaseSensitive:u,getTagContentType:p?(...c)=>p(...c)?N$1.RAW_TEXT:void 0:void 0,tokenizeAngularBlocks:n==="angular"?true:void 0,tokenizeAngularLetDeclaration:n==="angular"?true:void 0});if(n==="vue"){if(l.some(x=>x.type==="docType"&&x.value==="html"||x.type==="element"&&x.name.toLowerCase()==="html"))return Si(t,en$1,r);let g,y=()=>g??(g=Qr$1(t,{canSelfClose:s,allowHtmComponentClosingTags:o,isTagNameCaseSensitive:u})),q=x=>y().rootNodes.find(({startSourceSpan:U})=>U&&U.start.offset===x.startSourceSpan.start.offset)??x;for(let[x,U]of l.entries()){let{endSourceSpan:nn,startSourceSpan:Ei}=U;if(nn===null)m=y().errors,l[x]=q(U);else if(tu$1(U,r)){let sn=y().errors.find(an=>an.span.start.offset>Ei.start.offset&&an.span.start.offset<nn.end.offset);sn&&Ci(sn),l[x]=q(U);}}}m.length>0&&Ci(m[0]);let f=c=>{let g=c.name.startsWith(":")?c.name.slice(1).split(":")[0]:null,y=c.nameSpan.toString(),q=g!==null&&y.startsWith(`${g}:`),x=q?y.slice(g.length+1):y;c.name=x,c.namespace=g,c.hasExplicitNamespace=q;},C=c=>{switch(c.type){case "element":f(c);for(let g of c.attrs)f(g),g.valueSpan?(g.value=g.valueSpan.toString(),/["']/u.test(g.value[0])&&(g.value=g.value.slice(1,-1))):g.value=null;break;case "comment":c.value=c.sourceSpan.toString().slice(4,-3);break;case "text":c.value=c.sourceSpan.toString();break}},A=(c,g)=>{let y=c.toLowerCase();return g(y)?y:c},D=c=>{if(c.type==="element"&&(i&&(!c.namespace||c.namespace===c.tagDefinition.implicitNamespacePrefix||fe$1(c))&&(c.name=A(c.name,g=>gi.has(g))),a))for(let g of c.attrs)g.namespace||(g.name=A(g.name,y=>ur$1.has(c.name)&&(ur$1.get("*").has(y)||ur$1.get(c.name).has(y))));},I=c=>{c.sourceSpan&&c.endSourceSpan&&(c.sourceSpan=new h(c.sourceSpan.start,c.endSourceSpan.end));},F=c=>{if(c.type==="element"){let g=He$1(u?c.name:c.name.toLowerCase());!c.namespace||c.namespace===g.implicitNamespacePrefix||fe$1(c)?c.tagDefinition=g:c.tagDefinition=He$1("");}};return Qt$1(new class extends ft$1{visitExpansionCase(c,g){n==="angular"&&this.visitChildren(g,y=>{y(c.expression);});}visit(c){C(c),F(c),D(c),I(c);}},l),l}function tu$1(t,e){var n;if(t.type!=="element"||t.name!=="template")return  false;let r=(n=t.attrs.find(s=>s.name==="lang"))==null?void 0:n.value;return !r||Ne$1(e,{language:r})==="html"}function Ci(t){let{msg:e,span:{start:r,end:n}}=t;throw hi(e,{loc:{start:{line:r.line+1,column:r.col+1},end:{line:n.line+1,column:n.col+1}},cause:t})}function _i(t,e,r={},n=true){let{frontMatter:s,content:i}=n?mi(t):{frontMatter:null,content:t},a=new ve$1(t,r.filepath),o=new ie$1(a,0,0,0),u=o.moveBy(t.length),p={type:"root",sourceSpan:new h(o,u),children:Si(i,e,r)};if(s){let f=new ie$1(a,0,0,0),C=f.moveBy(s.raw.length);s.sourceSpan=new h(f,C),p.children.unshift(s);}let l=new or$1(p),m=(f,C)=>{let{offset:A}=C,D=w$1(false,t.slice(0,A),/[^\n\r]/gu," "),F=_i(D+f,e,r,false);F.sourceSpan=new h(C,K(false,F.children,-1).sourceSpan.end);let c=F.children[0];return c.length===A?F.children.shift():(c.sourceSpan=new h(c.sourceSpan.start.moveBy(A),c.sourceSpan.end),c.value=c.value.slice(A)),F};return l.walk(f=>{if(f.type==="comment"){let C=di(f,m);C&&f.parent.replaceChild(f,C);}Jo$1(f),Zo$1(f),eu$1(f);}),l}function Et$1(t){return {parse:(e,r)=>_i(e,t,r),hasPragma:ws,hasIgnorePragma:bs,astFormat:"html",locStart:J$1,locEnd:se$1}}var en$1={name:"html",normalizeTagName:true,normalizeAttributeName:true,allowHtmComponentClosingTags:true},ru$1=Et$1(en$1),nu$1=new Set(["mj-style","mj-raw"]),su$1=Et$1({...en$1,name:"mjml",shouldParseAsRawText:t=>nu$1.has(t)}),iu$1=Et$1({name:"angular"}),au$1=Et$1({name:"vue",isTagNameCaseSensitive:true,shouldParseAsRawText(t,e,r,n){return t.toLowerCase()!=="html"&&!r&&(t!=="template"||n.some(({name:s,value:i})=>s==="lang"&&i!=="html"&&i!==""&&i!==void 0))}}),ou$1=Et$1({name:"lwc",canSelfClose:false});var uu$1={html:qs};var ym=rn$1;

const html = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: ym,
    languages: Hs,
    options: Us,
    parsers: tn$1,
    printers: uu$1
}, Symbol.toStringTag, { value: 'Module' }));

var Fu=Object.create;var pt=Object.defineProperty;var pu=Object.getOwnPropertyDescriptor;var du=Object.getOwnPropertyNames;var mu=Object.getPrototypeOf,Eu=Object.prototype.hasOwnProperty;var er=e=>{throw TypeError(e)};var Cu=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),dt=(e,t)=>{for(var r in t)pt(e,r,{get:t[r],enumerable:true});},hu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of du(t))!Eu.call(e,u)&&u!==r&&pt(e,u,{get:()=>t[u],enumerable:!(n=pu(t,u))||n.enumerable});return e};var gu=(e,t,r)=>(r=e!=null?Fu(mu(e)):{},hu(pt(r,"default",{value:e,enumerable:true}),e));var yu=(e,t,r)=>t.has(e)||er("Cannot "+r);var tr=(e,t,r)=>t.has(e)?er("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r);var fe=(e,t,r)=>(yu(e,t,"access private method"),r);var Pn=Cu(Mt=>{Object.defineProperty(Mt,"__esModule",{value:true});function Co(){return new Proxy({},{get:()=>e=>e})}var On=/\r\n|[\n\r\u2028\u2029]/;function ho(e,t,r){let n=Object.assign({column:0,line:-1},e.start),u=Object.assign({},n,e.end),{linesAbove:o=2,linesBelow:i=3}=r||{},s=n.line,a=n.column,c=u.line,D=u.column,p=Math.max(s-(o+1),0),l=Math.min(t.length,c+i);s===-1&&(p=0),c===-1&&(l=t.length);let F=c-s,f={};if(F)for(let d=0;d<=F;d++){let m=d+s;if(!a)f[m]=true;else if(d===0){let C=t[m-1].length;f[m]=[a,C-a+1];}else if(d===F)f[m]=[0,D];else {let C=t[m-d].length;f[m]=[0,C];}}else a===D?a?f[s]=[a,0]:f[s]=true:f[s]=[a,D-a];return {start:p,end:l,markerLines:f}}function go(e,t,r={}){let u=Co(),o=e.split(On),{start:i,end:s,markerLines:a}=ho(t,o,r),c=t.start&&typeof t.start.column=="number",D=String(s).length,l=e.split(On,s).slice(i,s).map((F,f)=>{let d=i+1+f,C=` ${` ${d}`.slice(-D)} |`,E=a[d],h=!a[d+1];if(E){let x="";if(Array.isArray(E)){let A=F.slice(0,Math.max(E[0]-1,0)).replace(/[^\t]/g," "),$=E[1]||1;x=[`
 `,u.gutter(C.replace(/\d/g," "))," ",A,u.marker("^").repeat($)].join(""),h&&r.message&&(x+=" "+u.message(r.message));}return [u.marker(">"),u.gutter(C),F.length>0?` ${F}`:"",x].join("")}else return ` ${u.gutter(C)}${F.length>0?` ${F}`:""}`}).join(`
`);return r.message&&!c&&(l=`${" ".repeat(D+1)}${r.message}
${l}`),l}Mt.codeFrameColumns=go;});var Zt={};dt(Zt,{__debug:()=>ui,check:()=>ri,doc:()=>qt,format:()=>fu,formatWithCursor:()=>cu,getSupportInfo:()=>ni,util:()=>Qt,version:()=>tu});var Au=(e,t,r,n)=>{if(!(e&&t==null))return t.replaceAll?t.replaceAll(r,n):r.global?t.replace(r,n):t.split(r).join(n)},te=Au;var _e=class{diff(t,r,n={}){let u;typeof n=="function"?(u=n,n={}):"callback"in n&&(u=n.callback);let o=this.castInput(t,n),i=this.castInput(r,n),s=this.removeEmpty(this.tokenize(o,n)),a=this.removeEmpty(this.tokenize(i,n));return this.diffWithOptionsObj(s,a,n,u)}diffWithOptionsObj(t,r,n,u){var o;let i=E=>{if(E=this.postProcess(E,n),u){setTimeout(function(){u(E);},0);return}else return E},s=r.length,a=t.length,c=1,D=s+a;n.maxEditLength!=null&&(D=Math.min(D,n.maxEditLength));let p=(o=n.timeout)!==null&&o!==void 0?o:1/0,l=Date.now()+p,F=[{oldPos:-1,lastComponent:void 0}],f=this.extractCommon(F[0],r,t,0,n);if(F[0].oldPos+1>=a&&f+1>=s)return i(this.buildValues(F[0].lastComponent,r,t));let d=-1/0,m=1/0,C=()=>{for(let E=Math.max(d,-c);E<=Math.min(m,c);E+=2){let h,x=F[E-1],A=F[E+1];x&&(F[E-1]=void 0);let $=false;if(A){let Be=A.oldPos-E;$=A&&0<=Be&&Be<s;}let ue=x&&x.oldPos+1<a;if(!$&&!ue){F[E]=void 0;continue}if(!ue||$&&x.oldPos<A.oldPos?h=this.addToPath(A,true,false,0,n):h=this.addToPath(x,false,true,1,n),f=this.extractCommon(h,r,t,E,n),h.oldPos+1>=a&&f+1>=s)return i(this.buildValues(h.lastComponent,r,t))||true;F[E]=h,h.oldPos+1>=a&&(m=Math.min(m,E-1)),f+1>=s&&(d=Math.max(d,E+1));}c++;};if(u)(function E(){setTimeout(function(){if(c>D||Date.now()>l)return u(void 0);C()||E();},0);})();else for(;c<=D&&Date.now()<=l;){let E=C();if(E)return E}}addToPath(t,r,n,u,o){let i=t.lastComponent;return i&&!o.oneChangePerToken&&i.added===r&&i.removed===n?{oldPos:t.oldPos+u,lastComponent:{count:i.count+1,added:r,removed:n,previousComponent:i.previousComponent}}:{oldPos:t.oldPos+u,lastComponent:{count:1,added:r,removed:n,previousComponent:i}}}extractCommon(t,r,n,u,o){let i=r.length,s=n.length,a=t.oldPos,c=a-u,D=0;for(;c+1<i&&a+1<s&&this.equals(n[a+1],r[c+1],o);)c++,a++,D++,o.oneChangePerToken&&(t.lastComponent={count:1,previousComponent:t.lastComponent,added:false,removed:false});return D&&!o.oneChangePerToken&&(t.lastComponent={count:D,previousComponent:t.lastComponent,added:false,removed:false}),t.oldPos=a,c}equals(t,r,n){return n.comparator?n.comparator(t,r):t===r||!!n.ignoreCase&&t.toLowerCase()===r.toLowerCase()}removeEmpty(t){let r=[];for(let n=0;n<t.length;n++)t[n]&&r.push(t[n]);return r}castInput(t,r){return t}tokenize(t,r){return Array.from(t)}join(t){return t.join("")}postProcess(t,r){return t}get useLongestToken(){return  false}buildValues(t,r,n){let u=[],o;for(;t;)u.push(t),o=t.previousComponent,delete t.previousComponent,t=o;u.reverse();let i=u.length,s=0,a=0,c=0;for(;s<i;s++){let D=u[s];if(D.removed)D.value=this.join(n.slice(c,c+D.count)),c+=D.count;else {if(!D.added&&this.useLongestToken){let p=r.slice(a,a+D.count);p=p.map(function(l,F){let f=n[c+F];return f.length>l.length?f:l}),D.value=this.join(p);}else D.value=this.join(r.slice(a,a+D.count));a+=D.count,D.added||(c+=D.count);}}return u}};var mt=class extends _e{tokenize(t){return t.slice()}join(t){return t}removeEmpty(t){return t}},rr=new mt;function Et(e,t,r){return rr.diff(e,t,r)}function nr(e){let t=e.indexOf("\r");return t!==-1?e.charAt(t+1)===`
`?"crlf":"cr":"lf"}function xe(e){switch(e){case "cr":return "\r";case "crlf":return `\r
`;default:return `
`}}function Ct(e,t){let r;switch(t){case `
`:r=/\n/gu;break;case "\r":r=/\r/gu;break;case `\r
`:r=/\r\n/gu;break;default:throw new Error(`Unexpected "eol" ${JSON.stringify(t)}.`)}let n=e.match(r);return n?n.length:0}function ur(e){return te(false,e,/\r\n?/gu,`
`)}var W="string",Y="array",j="cursor",N="indent",O="align",P="trim",B="group",k="fill",_="if-break",v="indent-if-break",L="line-suffix",I="line-suffix-boundary",g="line",S="label",w="break-parent",Ue=new Set([j,N,O,P,B,k,_,v,L,I,g,S,w]);var Bu=(e,t,r)=>{if(!(e&&t==null))return Array.isArray(t)||typeof t=="string"?t[r<0?t.length+r:r]:t.at(r)},y=Bu;function or(e){let t=e.length;for(;t>0&&(e[t-1]==="\r"||e[t-1]===`
`);)t--;return t<e.length?e.slice(0,t):e}function _u(e){if(typeof e=="string")return W;if(Array.isArray(e))return Y;if(!e)return;let{type:t}=e;if(Ue.has(t))return t}var M=_u;var xu=e=>new Intl.ListFormat("en-US",{type:"disjunction"}).format(e);function wu(e){let t=e===null?"null":typeof e;if(t!=="string"&&t!=="object")return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;if(M(e))throw new Error("doc is valid.");let r=Object.prototype.toString.call(e);if(r!=="[object Object]")return `Unexpected doc '${r}'.`;let n=xu([...Ue].map(u=>`'${u}'`));return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`}var ht=class extends Error{name="InvalidDocError";constructor(t){super(wu(t)),this.doc=t;}},q=ht;var ir={};function bu(e,t,r,n){let u=[e];for(;u.length>0;){let o=u.pop();if(o===ir){r(u.pop());continue}r&&u.push(o,ir);let i=M(o);if(!i)throw new q(o);if((t==null?void 0:t(o))!==false)switch(i){case Y:case k:{let s=i===Y?o:o.parts;for(let a=s.length,c=a-1;c>=0;--c)u.push(s[c]);break}case _:u.push(o.flatContents,o.breakContents);break;case B:if(n&&o.expandedStates)for(let s=o.expandedStates.length,a=s-1;a>=0;--a)u.push(o.expandedStates[a]);else u.push(o.contents);break;case O:case N:case v:case S:case L:u.push(o.contents);break;case W:case j:case P:case I:case g:case w:break;default:throw new q(o)}}}var le=bu;function be(e,t){if(typeof e=="string")return t(e);let r=new Map;return n(e);function n(o){if(r.has(o))return r.get(o);let i=u(o);return r.set(o,i),i}function u(o){switch(M(o)){case Y:return t(o.map(n));case k:return t({...o,parts:o.parts.map(n)});case _:return t({...o,breakContents:n(o.breakContents),flatContents:n(o.flatContents)});case B:{let{expandedStates:i,contents:s}=o;return i?(i=i.map(n),s=i[0]):s=n(s),t({...o,contents:s,expandedStates:i})}case O:case N:case v:case S:case L:return t({...o,contents:n(o.contents)});case W:case j:case P:case I:case g:case w:return t(o);default:throw new q(o)}}}function Ve(e,t,r){let n=r,u=false;function o(i){if(u)return  false;let s=t(i);s!==void 0&&(u=true,n=s);}return le(e,o),n}function ku(e){if(e.type===B&&e.break||e.type===g&&e.hard||e.type===w)return  true}function Dr(e){return Ve(e,ku,false)}function sr(e){if(e.length>0){let t=y(false,e,-1);!t.expandedStates&&!t.break&&(t.break="propagated");}return null}function cr(e){let t=new Set,r=[];function n(o){if(o.type===w&&sr(r),o.type===B){if(r.push(o),t.has(o))return  false;t.add(o);}}function u(o){o.type===B&&r.pop().break&&sr(r);}le(e,n,u,true);}function Su(e){return e.type===g&&!e.hard?e.soft?"":" ":e.type===_?e.flatContents:e}function fr(e){return be(e,Su)}function ar(e){for(e=[...e];e.length>=2&&y(false,e,-2).type===g&&y(false,e,-1).type===w;)e.length-=2;if(e.length>0){let t=we(y(false,e,-1));e[e.length-1]=t;}return e}function we(e){switch(M(e)){case N:case v:case B:case L:case S:{let t=we(e.contents);return {...e,contents:t}}case _:return {...e,breakContents:we(e.breakContents),flatContents:we(e.flatContents)};case k:return {...e,parts:ar(e.parts)};case Y:return ar(e);case W:return or(e);case O:case j:case P:case I:case g:case w:break;default:throw new q(e)}return e}function $e(e){return we(Nu(e))}function Tu(e){switch(M(e)){case k:if(e.parts.every(t=>t===""))return "";break;case B:if(!e.contents&&!e.id&&!e.break&&!e.expandedStates)return "";if(e.contents.type===B&&e.contents.id===e.id&&e.contents.break===e.break&&e.contents.expandedStates===e.expandedStates)return e.contents;break;case O:case N:case v:case L:if(!e.contents)return "";break;case _:if(!e.flatContents&&!e.breakContents)return "";break;case Y:{let t=[];for(let r of e){if(!r)continue;let[n,...u]=Array.isArray(r)?r:[r];typeof n=="string"&&typeof y(false,t,-1)=="string"?t[t.length-1]+=n:t.push(n),t.push(...u);}return t.length===0?"":t.length===1?t[0]:t}case W:case j:case P:case I:case g:case S:case w:break;default:throw new q(e)}return e}function Nu(e){return be(e,t=>Tu(t))}function lr(e,t=We){return be(e,r=>typeof r=="string"?ke(t,r.split(`
`)):r)}function Ou(e){if(e.type===g)return  true}function Fr(e){return Ve(e,Ou,false)}function Fe(e,t){return e.type===S?{...e,contents:t(e.contents)}:t(e)}var gt=()=>{},yt=gt;function ie(e){return {type:N,contents:e}}function oe(e,t){return {type:O,contents:t,n:e}}function At(e,t={}){return yt(t.expandedStates),{type:B,id:t.id,contents:e,break:!!t.shouldBreak,expandedStates:t.expandedStates}}function dr(e){return oe(Number.NEGATIVE_INFINITY,e)}function mr(e){return oe({type:"root"},e)}function Er(e){return oe(-1,e)}function Cr(e,t){return At(e[0],{...t,expandedStates:e})}function hr(e){return {type:k,parts:e}}function gr(e,t="",r={}){return {type:_,breakContents:e,flatContents:t,groupId:r.groupId}}function yr(e,t){return {type:v,contents:e,groupId:t.groupId,negate:t.negate}}function Se(e){return {type:L,contents:e}}var Ar={type:I},pe={type:w},Br={type:P},Te={type:g,hard:true},Bt={type:g,hard:true,literal:true},Me={type:g},_r={type:g,soft:true},z=[Te,pe],We=[Bt,pe],X={type:j};function ke(e,t){let r=[];for(let n=0;n<t.length;n++)n!==0&&r.push(e),r.push(t[n]);return r}function Ge(e,t,r){let n=e;if(t>0){for(let u=0;u<Math.floor(t/r);++u)n=ie(n);n=oe(t%r,n),n=oe(Number.NEGATIVE_INFINITY,n);}return n}function xr(e,t){return e?{type:S,label:e,contents:t}:t}function Q(e){var t;if(!e)return "";if(Array.isArray(e)){let r=[];for(let n of e)if(Array.isArray(n))r.push(...Q(n));else {let u=Q(n);u!==""&&r.push(u);}return r}return e.type===_?{...e,breakContents:Q(e.breakContents),flatContents:Q(e.flatContents)}:e.type===B?{...e,contents:Q(e.contents),expandedStates:(t=e.expandedStates)==null?void 0:t.map(Q)}:e.type===k?{type:"fill",parts:e.parts.map(Q)}:e.contents?{...e,contents:Q(e.contents)}:e}function wr(e){let t=Object.create(null),r=new Set;return n(Q(e));function n(o,i,s){var a,c;if(typeof o=="string")return JSON.stringify(o);if(Array.isArray(o)){let D=o.map(n).filter(Boolean);return D.length===1?D[0]:`[${D.join(", ")}]`}if(o.type===g){let D=((a=s==null?void 0:s[i+1])==null?void 0:a.type)===w;return o.literal?D?"literalline":"literallineWithoutBreakParent":o.hard?D?"hardline":"hardlineWithoutBreakParent":o.soft?"softline":"line"}if(o.type===w)return ((c=s==null?void 0:s[i-1])==null?void 0:c.type)===g&&s[i-1].hard?void 0:"breakParent";if(o.type===P)return "trim";if(o.type===N)return "indent("+n(o.contents)+")";if(o.type===O)return o.n===Number.NEGATIVE_INFINITY?"dedentToRoot("+n(o.contents)+")":o.n<0?"dedent("+n(o.contents)+")":o.n.type==="root"?"markAsRoot("+n(o.contents)+")":"align("+JSON.stringify(o.n)+", "+n(o.contents)+")";if(o.type===_)return "ifBreak("+n(o.breakContents)+(o.flatContents?", "+n(o.flatContents):"")+(o.groupId?(o.flatContents?"":', ""')+`, { groupId: ${u(o.groupId)} }`:"")+")";if(o.type===v){let D=[];o.negate&&D.push("negate: true"),o.groupId&&D.push(`groupId: ${u(o.groupId)}`);let p=D.length>0?`, { ${D.join(", ")} }`:"";return `indentIfBreak(${n(o.contents)}${p})`}if(o.type===B){let D=[];o.break&&o.break!=="propagated"&&D.push("shouldBreak: true"),o.id&&D.push(`id: ${u(o.id)}`);let p=D.length>0?`, { ${D.join(", ")} }`:"";return o.expandedStates?`conditionalGroup([${o.expandedStates.map(l=>n(l)).join(",")}]${p})`:`group(${n(o.contents)}${p})`}if(o.type===k)return `fill([${o.parts.map(D=>n(D)).join(", ")}])`;if(o.type===L)return "lineSuffix("+n(o.contents)+")";if(o.type===I)return "lineSuffixBoundary";if(o.type===S)return `label(${JSON.stringify(o.label)}, ${n(o.contents)})`;if(o.type===j)return "cursor";throw new Error("Unknown doc type "+o.type)}function u(o){if(typeof o!="symbol")return JSON.stringify(String(o));if(o in t)return t[o];let i=o.description||"symbol";for(let s=0;;s++){let a=i+(s>0?` #${s}`:"");if(!r.has(a))return r.add(a),t[o]=`Symbol.for(${JSON.stringify(a)})`}}}var br=()=>/[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;function kr(e){return e===12288||e>=65281&&e<=65376||e>=65504&&e<=65510}function Sr(e){return e>=4352&&e<=4447||e===8986||e===8987||e===9001||e===9002||e>=9193&&e<=9196||e===9200||e===9203||e===9725||e===9726||e===9748||e===9749||e>=9776&&e<=9783||e>=9800&&e<=9811||e===9855||e>=9866&&e<=9871||e===9875||e===9889||e===9898||e===9899||e===9917||e===9918||e===9924||e===9925||e===9934||e===9940||e===9962||e===9970||e===9971||e===9973||e===9978||e===9981||e===9989||e===9994||e===9995||e===10024||e===10060||e===10062||e>=10067&&e<=10069||e===10071||e>=10133&&e<=10135||e===10160||e===10175||e===11035||e===11036||e===11088||e===11093||e>=11904&&e<=11929||e>=11931&&e<=12019||e>=12032&&e<=12245||e>=12272&&e<=12287||e>=12289&&e<=12350||e>=12353&&e<=12438||e>=12441&&e<=12543||e>=12549&&e<=12591||e>=12593&&e<=12686||e>=12688&&e<=12773||e>=12783&&e<=12830||e>=12832&&e<=12871||e>=12880&&e<=42124||e>=42128&&e<=42182||e>=43360&&e<=43388||e>=44032&&e<=55203||e>=63744&&e<=64255||e>=65040&&e<=65049||e>=65072&&e<=65106||e>=65108&&e<=65126||e>=65128&&e<=65131||e>=94176&&e<=94180||e===94192||e===94193||e>=94208&&e<=100343||e>=100352&&e<=101589||e>=101631&&e<=101640||e>=110576&&e<=110579||e>=110581&&e<=110587||e===110589||e===110590||e>=110592&&e<=110882||e===110898||e>=110928&&e<=110930||e===110933||e>=110948&&e<=110951||e>=110960&&e<=111355||e>=119552&&e<=119638||e>=119648&&e<=119670||e===126980||e===127183||e===127374||e>=127377&&e<=127386||e>=127488&&e<=127490||e>=127504&&e<=127547||e>=127552&&e<=127560||e===127568||e===127569||e>=127584&&e<=127589||e>=127744&&e<=127776||e>=127789&&e<=127797||e>=127799&&e<=127868||e>=127870&&e<=127891||e>=127904&&e<=127946||e>=127951&&e<=127955||e>=127968&&e<=127984||e===127988||e>=127992&&e<=128062||e===128064||e>=128066&&e<=128252||e>=128255&&e<=128317||e>=128331&&e<=128334||e>=128336&&e<=128359||e===128378||e===128405||e===128406||e===128420||e>=128507&&e<=128591||e>=128640&&e<=128709||e===128716||e>=128720&&e<=128722||e>=128725&&e<=128727||e>=128732&&e<=128735||e===128747||e===128748||e>=128756&&e<=128764||e>=128992&&e<=129003||e===129008||e>=129292&&e<=129338||e>=129340&&e<=129349||e>=129351&&e<=129535||e>=129648&&e<=129660||e>=129664&&e<=129673||e>=129679&&e<=129734||e>=129742&&e<=129756||e>=129759&&e<=129769||e>=129776&&e<=129784||e>=131072&&e<=196605||e>=196608&&e<=262141}var Tr=e=>!(kr(e)||Sr(e));var Pu=/[^\x20-\x7F]/u;function vu(e){if(!e)return 0;if(!Pu.test(e))return e.length;e=e.replace(br(),"  ");let t=0;for(let r of e){let n=r.codePointAt(0);n<=31||n>=127&&n<=159||n>=768&&n<=879||(t+=Tr(n)?1:2);}return t}var Ne=vu;var R=Symbol("MODE_BREAK"),H=Symbol("MODE_FLAT"),de=Symbol("cursor"),_t=Symbol("DOC_FILL_PRINTED_LENGTH");function Nr(){return {value:"",length:0,queue:[]}}function Lu(e,t){return xt(e,{type:"indent"},t)}function Iu(e,t,r){return t===Number.NEGATIVE_INFINITY?e.root||Nr():t<0?xt(e,{type:"dedent"},r):t?t.type==="root"?{...e,root:e}:xt(e,{type:typeof t=="string"?"stringAlign":"numberAlign",n:t},r):e}function xt(e,t,r){let n=t.type==="dedent"?e.queue.slice(0,-1):[...e.queue,t],u="",o=0,i=0,s=0;for(let f of n)switch(f.type){case "indent":D(),r.useTabs?a(1):c(r.tabWidth);break;case "stringAlign":D(),u+=f.n,o+=f.n.length;break;case "numberAlign":i+=1,s+=f.n;break;default:throw new Error(`Unexpected type '${f.type}'`)}return l(),{...e,value:u,length:o,queue:n};function a(f){u+="	".repeat(f),o+=r.tabWidth*f;}function c(f){u+=" ".repeat(f),o+=f;}function D(){r.useTabs?p():l();}function p(){i>0&&a(i),F();}function l(){s>0&&c(s),F();}function F(){i=0,s=0;}}function wt(e){let t=0,r=0,n=e.length;e:for(;n--;){let u=e[n];if(u===de){r++;continue}for(let o=u.length-1;o>=0;o--){let i=u[o];if(i===" "||i==="	")t++;else {e[n]=u.slice(0,o+1);break e}}}if(t>0||r>0)for(e.length=n+1;r-- >0;)e.push(de);return t}function Ke(e,t,r,n,u,o){if(r===Number.POSITIVE_INFINITY)return  true;let i=t.length,s=[e],a=[];for(;r>=0;){if(s.length===0){if(i===0)return  true;s.push(t[--i]);continue}let{mode:c,doc:D}=s.pop(),p=M(D);switch(p){case W:a.push(D),r-=Ne(D);break;case Y:case k:{let l=p===Y?D:D.parts,F=D[_t]??0;for(let f=l.length-1;f>=F;f--)s.push({mode:c,doc:l[f]});break}case N:case O:case v:case S:s.push({mode:c,doc:D.contents});break;case P:r+=wt(a);break;case B:{if(o&&D.break)return  false;let l=D.break?R:c,F=D.expandedStates&&l===R?y(false,D.expandedStates,-1):D.contents;s.push({mode:l,doc:F});break}case _:{let F=(D.groupId?u[D.groupId]||H:c)===R?D.breakContents:D.flatContents;F&&s.push({mode:c,doc:F});break}case g:if(c===R||D.hard)return  true;D.soft||(a.push(" "),r--);break;case L:n=true;break;case I:if(n)return  false;break}}return  false}function me(e,t){let r={},n=t.printWidth,u=xe(t.endOfLine),o=0,i=[{ind:Nr(),mode:R,doc:e}],s=[],a=false,c=[],D=0;for(cr(e);i.length>0;){let{ind:l,mode:F,doc:f}=i.pop();switch(M(f)){case W:{let d=u!==`
`?te(false,f,`
`,u):f;s.push(d),i.length>0&&(o+=Ne(d));break}case Y:for(let d=f.length-1;d>=0;d--)i.push({ind:l,mode:F,doc:f[d]});break;case j:if(D>=2)throw new Error("There are too many 'cursor' in doc.");s.push(de),D++;break;case N:i.push({ind:Lu(l,t),mode:F,doc:f.contents});break;case O:i.push({ind:Iu(l,f.n,t),mode:F,doc:f.contents});break;case P:o-=wt(s);break;case B:switch(F){case H:if(!a){i.push({ind:l,mode:f.break?R:H,doc:f.contents});break}case R:{a=false;let d={ind:l,mode:H,doc:f.contents},m=n-o,C=c.length>0;if(!f.break&&Ke(d,i,m,C,r))i.push(d);else if(f.expandedStates){let E=y(false,f.expandedStates,-1);if(f.break){i.push({ind:l,mode:R,doc:E});break}else for(let h=1;h<f.expandedStates.length+1;h++)if(h>=f.expandedStates.length){i.push({ind:l,mode:R,doc:E});break}else {let x=f.expandedStates[h],A={ind:l,mode:H,doc:x};if(Ke(A,i,m,C,r)){i.push(A);break}}}else i.push({ind:l,mode:R,doc:f.contents});break}}f.id&&(r[f.id]=y(false,i,-1).mode);break;case k:{let d=n-o,m=f[_t]??0,{parts:C}=f,E=C.length-m;if(E===0)break;let h=C[m+0],x=C[m+1],A={ind:l,mode:H,doc:h},$={ind:l,mode:R,doc:h},ue=Ke(A,[],d,c.length>0,r,true);if(E===1){ue?i.push(A):i.push($);break}let Be={ind:l,mode:H,doc:x},lt={ind:l,mode:R,doc:x};if(E===2){ue?i.push(Be,A):i.push(lt,$);break}let lu=C[m+2],Ft={ind:l,mode:F,doc:{...f,[_t]:m+2}};Ke({ind:l,mode:H,doc:[h,x,lu]},[],d,c.length>0,r,true)?i.push(Ft,Be,A):ue?i.push(Ft,lt,A):i.push(Ft,lt,$);break}case _:case v:{let d=f.groupId?r[f.groupId]:F;if(d===R){let m=f.type===_?f.breakContents:f.negate?f.contents:ie(f.contents);m&&i.push({ind:l,mode:F,doc:m});}if(d===H){let m=f.type===_?f.flatContents:f.negate?ie(f.contents):f.contents;m&&i.push({ind:l,mode:F,doc:m});}break}case L:c.push({ind:l,mode:F,doc:f.contents});break;case I:c.length>0&&i.push({ind:l,mode:F,doc:Te});break;case g:switch(F){case H:if(f.hard)a=true;else {f.soft||(s.push(" "),o+=1);break}case R:if(c.length>0){i.push({ind:l,mode:F,doc:f},...c.reverse()),c.length=0;break}f.literal?l.root?(s.push(u,l.root.value),o=l.root.length):(s.push(u),o=0):(o-=wt(s),s.push(u+l.value),o=l.length);break}break;case S:i.push({ind:l,mode:F,doc:f.contents});break;case w:break;default:throw new q(f)}i.length===0&&c.length>0&&(i.push(...c.reverse()),c.length=0);}let p=s.indexOf(de);if(p!==-1){let l=s.indexOf(de,p+1);if(l===-1)return {formatted:s.filter(m=>m!==de).join("")};let F=s.slice(0,p).join(""),f=s.slice(p+1,l).join(""),d=s.slice(l+1).join("");return {formatted:F+f+d,cursorNodeStart:F.length,cursorNodeText:f}}return {formatted:s.join("")}}function Ru(e,t,r=0){let n=0;for(let u=r;u<e.length;++u)e[u]==="	"?n=n+t-n%t:n++;return n}var Ee=Ru;var Z,kt,ze,bt=class{constructor(t){tr(this,Z);this.stack=[t];}get key(){let{stack:t,siblings:r}=this;return y(false,t,r===null?-2:-4)??null}get index(){return this.siblings===null?null:y(false,this.stack,-2)}get node(){return y(false,this.stack,-1)}get parent(){return this.getNode(1)}get grandparent(){return this.getNode(2)}get isInArray(){return this.siblings!==null}get siblings(){let{stack:t}=this,r=y(false,t,-3);return Array.isArray(r)?r:null}get next(){let{siblings:t}=this;return t===null?null:t[this.index+1]}get previous(){let{siblings:t}=this;return t===null?null:t[this.index-1]}get isFirst(){return this.index===0}get isLast(){let{siblings:t,index:r}=this;return t!==null&&r===t.length-1}get isRoot(){return this.stack.length===1}get root(){return this.stack[0]}get ancestors(){return [...fe(this,Z,ze).call(this)]}getName(){let{stack:t}=this,{length:r}=t;return r>1?y(false,t,-2):null}getValue(){return y(false,this.stack,-1)}getNode(t=0){let r=fe(this,Z,kt).call(this,t);return r===-1?null:this.stack[r]}getParentNode(t=0){return this.getNode(t+1)}call(t,...r){let{stack:n}=this,{length:u}=n,o=y(false,n,-1);for(let i of r)o=o[i],n.push(i,o);try{return t(this)}finally{n.length=u;}}callParent(t,r=0){let n=fe(this,Z,kt).call(this,r+1),u=this.stack.splice(n+1);try{return t(this)}finally{this.stack.push(...u);}}each(t,...r){let{stack:n}=this,{length:u}=n,o=y(false,n,-1);for(let i of r)o=o[i],n.push(i,o);try{for(let i=0;i<o.length;++i)n.push(i,o[i]),t(this,i,o),n.length-=2;}finally{n.length=u;}}map(t,...r){let n=[];return this.each((u,o,i)=>{n[o]=t(u,o,i);},...r),n}match(...t){let r=this.stack.length-1,n=null,u=this.stack[r--];for(let o of t){if(u===void 0)return  false;let i=null;if(typeof n=="number"&&(i=n,n=this.stack[r--],u=this.stack[r--]),o&&!o(u,n,i))return  false;n=this.stack[r--],u=this.stack[r--];}return  true}findAncestor(t){for(let r of fe(this,Z,ze).call(this))if(t(r))return r}hasAncestor(t){for(let r of fe(this,Z,ze).call(this))if(t(r))return  true;return  false}};Z=new WeakSet,kt=function(t){let{stack:r}=this;for(let n=r.length-1;n>=0;n-=2)if(!Array.isArray(r[n])&&--t<0)return n;return  -1},ze=function*(){let{stack:t}=this;for(let r=t.length-3;r>=0;r-=2){let n=t[r];Array.isArray(n)||(yield n);}};var Or=bt;var Pr=new Proxy(()=>{},{get:()=>Pr}),Oe=Pr;function Yu(e){return e!==null&&typeof e=="object"}var vr=Yu;function*Ce(e,t){let{getVisitorKeys:r,filter:n=()=>true}=t,u=o=>vr(o)&&n(o);for(let o of r(e)){let i=e[o];if(Array.isArray(i))for(let s of i)u(s)&&(yield s);else u(i)&&(yield i);}}function*Lr(e,t){let r=[e];for(let n=0;n<r.length;n++){let u=r[n];for(let o of Ce(u,t))yield o,r.push(o);}}function Ir(e,t){return Ce(e,t).next().done}function he(e){return (t,r,n)=>{let u=!!(n!=null&&n.backwards);if(r===false)return  false;let{length:o}=t,i=r;for(;i>=0&&i<o;){let s=t.charAt(i);if(e instanceof RegExp){if(!e.test(s))return i}else if(!e.includes(s))return i;u?i--:i++;}return i===-1||i===o?i:false}}var Rr=he(/\s/u),T=he(" 	"),He=he(",; 	"),Je=he(/[^\n\r]/u);function ju(e,t,r){let n=!!(r!=null&&r.backwards);if(t===false)return  false;let u=e.charAt(t);if(n){if(e.charAt(t-1)==="\r"&&u===`
`)return t-2;if(u===`
`||u==="\r"||u==="\u2028"||u==="\u2029")return t-1}else {if(u==="\r"&&e.charAt(t+1)===`
`)return t+2;if(u===`
`||u==="\r"||u==="\u2028"||u==="\u2029")return t+1}return t}var U=ju;function Uu(e,t,r={}){let n=T(e,r.backwards?t-1:t,r),u=U(e,n,r);return n!==u}var G=Uu;function Vu(e){return Array.isArray(e)&&e.length>0}var qe=Vu;var Yr=new Set(["tokens","comments","parent","enclosingNode","precedingNode","followingNode"]),$u=e=>Object.keys(e).filter(t=>!Yr.has(t));function Wu(e){return e?t=>e(t,Yr):$u}var J=Wu;function Mu(e){let t=e.type||e.kind||"(unknown type)",r=String(e.name||e.id&&(typeof e.id=="object"?e.id.name:e.id)||e.key&&(typeof e.key=="object"?e.key.name:e.key)||e.value&&(typeof e.value=="object"?"":String(e.value))||e.operator||"");return r.length>20&&(r=r.slice(0,19)+"\u2026"),t+(r?" "+r:"")}function St(e,t){(e.comments??(e.comments=[])).push(t),t.printed=false,t.nodeDescription=Mu(e);}function se(e,t){t.leading=true,t.trailing=false,St(e,t);}function ee(e,t,r){t.leading=false,t.trailing=false,r&&(t.marker=r),St(e,t);}function ae(e,t){t.leading=false,t.trailing=true,St(e,t);}var Tt=new WeakMap;function Xe(e,t){if(Tt.has(e))return Tt.get(e);let{printer:{getCommentChildNodes:r,canAttachComment:n,getVisitorKeys:u},locStart:o,locEnd:i}=t;if(!n)return [];let s=((r==null?void 0:r(e,t))??[...Ce(e,{getVisitorKeys:J(u)})]).flatMap(a=>n(a)?[a]:Xe(a,t));return s.sort((a,c)=>o(a)-o(c)||i(a)-i(c)),Tt.set(e,s),s}function Ur(e,t,r,n){let{locStart:u,locEnd:o}=r,i=u(t),s=o(t),a=Xe(e,r),c,D,p=0,l=a.length;for(;p<l;){let F=p+l>>1,f=a[F],d=u(f),m=o(f);if(d<=i&&s<=m)return Ur(f,t,r,f);if(m<=i){c=f,p=F+1;continue}if(s<=d){D=f,l=F;continue}throw new Error("Comment location overlaps with node location")}if((n==null?void 0:n.type)==="TemplateLiteral"){let{quasis:F}=n,f=Ot(F,t,r);c&&Ot(F,c,r)!==f&&(c=null),D&&Ot(F,D,r)!==f&&(D=null);}return {enclosingNode:n,precedingNode:c,followingNode:D}}var Nt=()=>false;function Vr(e,t){let{comments:r}=e;if(delete e.comments,!qe(r)||!t.printer.canAttachComment)return;let n=[],{printer:{experimentalFeatures:{avoidAstMutation:u=false}={},handleComments:o={}},originalText:i}=t,{ownLine:s=Nt,endOfLine:a=Nt,remaining:c=Nt}=o,D=r.map((p,l)=>({...Ur(e,p,t),comment:p,text:i,options:t,ast:e,isLastComment:r.length-1===l}));for(let[p,l]of D.entries()){let{comment:F,precedingNode:f,enclosingNode:d,followingNode:m,text:C,options:E,ast:h,isLastComment:x}=l,A;if(u?A=[l]:(F.enclosingNode=d,F.precedingNode=f,F.followingNode=m,A=[F,C,E,h,x]),Gu(C,E,D,p))F.placement="ownLine",s(...A)||(m?se(m,F):f?ae(f,F):d?ee(d,F):ee(h,F));else if(Ku(C,E,D,p))F.placement="endOfLine",a(...A)||(f?ae(f,F):m?se(m,F):d?ee(d,F):ee(h,F));else if(F.placement="remaining",!c(...A))if(f&&m){let $=n.length;$>0&&n[$-1].followingNode!==m&&jr(n,E),n.push(l);}else f?ae(f,F):m?se(m,F):d?ee(d,F):ee(h,F);}if(jr(n,t),!u)for(let p of r)delete p.precedingNode,delete p.enclosingNode,delete p.followingNode;}var $r=e=>!/[\S\n\u2028\u2029]/u.test(e);function Gu(e,t,r,n){let{comment:u,precedingNode:o}=r[n],{locStart:i,locEnd:s}=t,a=i(u);if(o)for(let c=n-1;c>=0;c--){let{comment:D,precedingNode:p}=r[c];if(p!==o||!$r(e.slice(s(D),a)))break;a=i(D);}return G(e,a,{backwards:true})}function Ku(e,t,r,n){let{comment:u,followingNode:o}=r[n],{locStart:i,locEnd:s}=t,a=s(u);if(o)for(let c=n+1;c<r.length;c++){let{comment:D,followingNode:p}=r[c];if(p!==o||!$r(e.slice(a,i(D))))break;a=s(D);}return G(e,a)}function jr(e,t){var s,a;let r=e.length;if(r===0)return;let{precedingNode:n,followingNode:u}=e[0],o=t.locStart(u),i;for(i=r;i>0;--i){let{comment:c,precedingNode:D,followingNode:p}=e[i-1];Oe.strictEqual(D,n),Oe.strictEqual(p,u);let l=t.originalText.slice(t.locEnd(c),o);if(((a=(s=t.printer).isGap)==null?void 0:a.call(s,l,t))??/^[\s(]*$/u.test(l))o=t.locStart(c);else break}for(let[c,{comment:D}]of e.entries())c<i?ae(n,D):se(u,D);for(let c of [n,u])c.comments&&c.comments.length>1&&c.comments.sort((D,p)=>t.locStart(D)-t.locStart(p));e.length=0;}function Ot(e,t,r){let n=r.locStart(t)-1;for(let u=1;u<e.length;++u)if(n<r.locStart(e[u]))return u-1;return 0}function zu(e,t){let r=t-1;r=T(e,r,{backwards:true}),r=U(e,r,{backwards:true}),r=T(e,r,{backwards:true});let n=U(e,r,{backwards:true});return r!==n}var Pe=zu;function Wr(e,t){let r=e.node;return r.printed=true,t.printer.printComment(e,t)}function Hu(e,t){var D;let r=e.node,n=[Wr(e,t)],{printer:u,originalText:o,locStart:i,locEnd:s}=t;if((D=u.isBlockComment)==null?void 0:D.call(u,r)){let p=G(o,s(r))?G(o,i(r),{backwards:true})?z:Me:" ";n.push(p);}else n.push(z);let c=U(o,T(o,s(r)));return c!==false&&G(o,c)&&n.push(z),n}function Ju(e,t,r){var c;let n=e.node,u=Wr(e,t),{printer:o,originalText:i,locStart:s}=t,a=(c=o.isBlockComment)==null?void 0:c.call(o,n);if(r!=null&&r.hasLineSuffix&&!(r!=null&&r.isBlock)||G(i,s(n),{backwards:true})){let D=Pe(i,s(n));return {doc:Se([z,D?z:"",u]),isBlock:a,hasLineSuffix:true}}return !a||r!=null&&r.hasLineSuffix?{doc:[Se([" ",u]),pe],isBlock:a,hasLineSuffix:true}:{doc:[" ",u],isBlock:a,hasLineSuffix:false}}function qu(e,t){let r=e.node;if(!r)return {};let n=t[Symbol.for("printedComments")];if((r.comments||[]).filter(a=>!n.has(a)).length===0)return {leading:"",trailing:""};let o=[],i=[],s;return e.each(()=>{let a=e.node;if(n!=null&&n.has(a))return;let{leading:c,trailing:D}=a;c?o.push(Hu(e,t)):D&&(s=Ju(e,t,s),i.push(s.doc));},"comments"),{leading:o,trailing:i}}function Mr(e,t,r){let{leading:n,trailing:u}=qu(e,r);return !n&&!u?t:Fe(t,o=>[n,o,u])}function Gr(e){let{[Symbol.for("comments")]:t,[Symbol.for("printedComments")]:r}=e;for(let n of t){if(!n.printed&&!r.has(n))throw new Error('Comment "'+n.value.trim()+'" was not printed. Please report this error!');delete n.printed;}}var ve=class extends Error{name="ConfigError"},Le=class extends Error{name="UndefinedParserError"};var zr={checkIgnorePragma:{category:"Special",type:"boolean",default:false,description:"Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.",cliCategory:"Other"},cursorOffset:{category:"Special",type:"int",default:-1,range:{start:-1,end:1/0,step:1},description:"Print (to stderr) where a cursor at the given position would move to after formatting.",cliCategory:"Editor"},endOfLine:{category:"Global",type:"choice",default:"lf",description:"Which end of line characters to apply.",choices:[{value:"lf",description:"Line Feed only (\\n), common on Linux and macOS as well as inside git repos"},{value:"crlf",description:"Carriage Return + Line Feed characters (\\r\\n), common on Windows"},{value:"cr",description:"Carriage Return character only (\\r), used very rarely"},{value:"auto",description:`Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)`}]},filepath:{category:"Special",type:"path",description:"Specify the input filepath. This will be used to do parser inference.",cliName:"stdin-filepath",cliCategory:"Other",cliDescription:"Path to the file to pretend that stdin comes from."},insertPragma:{category:"Special",type:"boolean",default:false,description:"Insert @format pragma into file's first docblock comment.",cliCategory:"Other"},parser:{category:"Global",type:"choice",default:void 0,description:"Which parser to use.",exception:e=>typeof e=="string"||typeof e=="function",choices:[{value:"flow",description:"Flow"},{value:"babel",description:"JavaScript"},{value:"babel-flow",description:"Flow"},{value:"babel-ts",description:"TypeScript"},{value:"typescript",description:"TypeScript"},{value:"acorn",description:"JavaScript"},{value:"espree",description:"JavaScript"},{value:"meriyah",description:"JavaScript"},{value:"css",description:"CSS"},{value:"less",description:"Less"},{value:"scss",description:"SCSS"},{value:"json",description:"JSON"},{value:"json5",description:"JSON5"},{value:"jsonc",description:"JSON with Comments"},{value:"json-stringify",description:"JSON.stringify"},{value:"graphql",description:"GraphQL"},{value:"markdown",description:"Markdown"},{value:"mdx",description:"MDX"},{value:"vue",description:"Vue"},{value:"yaml",description:"YAML"},{value:"glimmer",description:"Ember / Handlebars"},{value:"html",description:"HTML"},{value:"angular",description:"Angular"},{value:"lwc",description:"Lightning Web Components"},{value:"mjml",description:"MJML"}]},plugins:{type:"path",array:true,default:[{value:[]}],category:"Global",description:"Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",exception:e=>typeof e=="string"||typeof e=="object",cliName:"plugin",cliCategory:"Config"},printWidth:{category:"Global",type:"int",default:80,description:"The line length where Prettier will try wrap.",range:{start:0,end:1/0,step:1}},rangeEnd:{category:"Special",type:"int",default:1/0,range:{start:0,end:1/0,step:1},description:`Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`,cliCategory:"Editor"},rangeStart:{category:"Special",type:"int",default:0,range:{start:0,end:1/0,step:1},description:`Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`,cliCategory:"Editor"},requirePragma:{category:"Special",type:"boolean",default:false,description:"Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.",cliCategory:"Other"},tabWidth:{type:"int",category:"Global",default:2,description:"Number of spaces per indentation level.",range:{start:0,end:1/0,step:1}},useTabs:{category:"Global",type:"boolean",default:false,description:"Indent with tabs instead of spaces."},embeddedLanguageFormatting:{category:"Global",type:"choice",default:"auto",description:"Control how Prettier formats quoted code embedded in the file.",choices:[{value:"auto",description:"Format embedded code if Prettier can automatically identify it."},{value:"off",description:"Never automatically format embedded code."}]}};function Qe({plugins:e=[],showDeprecated:t=false}={}){let r=e.flatMap(u=>u.languages??[]),n=[];for(let u of Zu(Object.assign({},...e.map(({options:o})=>o),zr)))!t&&u.deprecated||(Array.isArray(u.choices)&&(t||(u.choices=u.choices.filter(o=>!o.deprecated)),u.name==="parser"&&(u.choices=[...u.choices,...Qu(u.choices,r,e)])),u.pluginDefaults=Object.fromEntries(e.filter(o=>{var i;return ((i=o.defaultOptions)==null?void 0:i[u.name])!==void 0}).map(o=>[o.name,o.defaultOptions[u.name]])),n.push(u));return {languages:r,options:n}}function*Qu(e,t,r){let n=new Set(e.map(u=>u.value));for(let u of t)if(u.parsers){for(let o of u.parsers)if(!n.has(o)){n.add(o);let i=r.find(a=>a.parsers&&Object.prototype.hasOwnProperty.call(a.parsers,o)),s=u.name;i!=null&&i.name&&(s+=` (plugin: ${i.name})`),yield {value:o,description:s};}}}function Zu(e){let t=[];for(let[r,n]of Object.entries(e)){let u={name:r,...n};Array.isArray(u.default)&&(u.default=y(false,u.default,-1).value),t.push(u);}return t}var eo=(e,t)=>{if(!(e&&t==null))return t.toReversed||!Array.isArray(t)?t.toReversed():[...t].reverse()},Hr=eo;var Jr,qr,Xr,Qr,Zr,to=((Jr=globalThis.Deno)==null?void 0:Jr.build.os)==="windows"||((Xr=(qr=globalThis.navigator)==null?void 0:qr.platform)==null?void 0:Xr.startsWith("Win"))||((Zr=(Qr=globalThis.process)==null?void 0:Qr.platform)==null?void 0:Zr.startsWith("win"))||false;function en(e){if(e=e instanceof URL?e:new URL(e),e.protocol!=="file:")throw new TypeError(`URL must be a file URL: received "${e.protocol}"`);return e}function ro(e){return e=en(e),decodeURIComponent(e.pathname.replace(/%(?![0-9A-Fa-f]{2})/g,"%25"))}function no(e){e=en(e);let t=decodeURIComponent(e.pathname.replace(/\//g,"\\").replace(/%(?![0-9A-Fa-f]{2})/g,"%25")).replace(/^\\*([A-Za-z]:)(\\|$)/,"$1\\");return e.hostname!==""&&(t=`\\\\${e.hostname}${t}`),t}function tn(e){return to?no(e):ro(e)}var rn=tn;var uo=e=>String(e).split(/[/\\]/u).pop();function nn(e,t){if(!t)return;let r=uo(t).toLowerCase();return e.find(({filenames:n})=>n==null?void 0:n.some(u=>u.toLowerCase()===r))??e.find(({extensions:n})=>n==null?void 0:n.some(u=>r.endsWith(u)))}function oo(e,t){if(t)return e.find(({name:r})=>r.toLowerCase()===t)??e.find(({aliases:r})=>r==null?void 0:r.includes(t))??e.find(({extensions:r})=>r==null?void 0:r.includes(`.${t}`))}function un(e,t){if(t){if(String(t).startsWith("file:"))try{t=rn(t);}catch{return}if(typeof t=="string")return e.find(({isSupported:r})=>r==null?void 0:r({filepath:t}))}}function io(e,t){let r=Hr(false,e.plugins).flatMap(u=>u.languages??[]),n=oo(r,t.language)??nn(r,t.physicalFile)??nn(r,t.file)??un(r,t.physicalFile)??un(r,t.file)??(t.physicalFile,void 0);return n==null?void 0:n.parsers[0]}var on=io;var re={key:e=>/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e)?e:JSON.stringify(e),value(e){if(e===null||typeof e!="object")return JSON.stringify(e);if(Array.isArray(e))return `[${e.map(r=>re.value(r)).join(", ")}]`;let t=Object.keys(e);return t.length===0?"{}":`{ ${t.map(r=>`${re.key(r)}: ${re.value(e[r])}`).join(", ")} }`},pair:({key:e,value:t})=>re.value({[e]:t})};var sn=new Proxy(String,{get:()=>sn}),V=sn;var an=(e,t,{descriptor:r})=>{let n=[`${V.yellow(typeof e=="string"?r.key(e):r.pair(e))} is deprecated`];return t&&n.push(`we now treat it as ${V.blue(typeof t=="string"?r.key(t):r.pair(t))}`),n.join("; ")+"."};var Ze=Symbol.for("vnopts.VALUE_NOT_EXIST"),ge=Symbol.for("vnopts.VALUE_UNCHANGED");var Dn=" ".repeat(2),fn=(e,t,r)=>{let{text:n,list:u}=r.normalizeExpectedResult(r.schemas[e].expected(r)),o=[];return n&&o.push(cn(e,t,n,r.descriptor)),u&&o.push([cn(e,t,u.title,r.descriptor)].concat(u.values.map(i=>ln(i,r.loggerPrintWidth))).join(`
`)),Fn(o,r.loggerPrintWidth)};function cn(e,t,r,n){return [`Invalid ${V.red(n.key(e))} value.`,`Expected ${V.blue(r)},`,`but received ${t===Ze?V.gray("nothing"):V.red(n.value(t))}.`].join(" ")}function ln({text:e,list:t},r){let n=[];return e&&n.push(`- ${V.blue(e)}`),t&&n.push([`- ${V.blue(t.title)}:`].concat(t.values.map(u=>ln(u,r-Dn.length).replace(/^|\n/g,`$&${Dn}`))).join(`
`)),Fn(n,r)}function Fn(e,t){if(e.length===1)return e[0];let[r,n]=e,[u,o]=e.map(i=>i.split(`
`,1)[0].length);return u>t&&u>o?n:r}var Pt=[],pn=[];function vt(e,t){if(e===t)return 0;let r=e;e.length>t.length&&(e=t,t=r);let n=e.length,u=t.length;for(;n>0&&e.charCodeAt(~-n)===t.charCodeAt(~-u);)n--,u--;let o=0;for(;o<n&&e.charCodeAt(o)===t.charCodeAt(o);)o++;if(n-=o,u-=o,n===0)return u;let i,s,a,c,D=0,p=0;for(;D<n;)pn[D]=e.charCodeAt(o+D),Pt[D]=++D;for(;p<u;)for(i=t.charCodeAt(o+p),a=p++,s=p,D=0;D<n;D++)c=i===pn[D]?a:a+1,a=Pt[D],s=Pt[D]=a>s?c>s?s+1:c:c>a?a+1:c;return s}var et=(e,t,{descriptor:r,logger:n,schemas:u})=>{let o=[`Ignored unknown option ${V.yellow(r.pair({key:e,value:t}))}.`],i=Object.keys(u).sort().find(s=>vt(e,s)<3);i&&o.push(`Did you mean ${V.blue(r.key(i))}?`),n.warn(o.join(" "));};var so=["default","expected","validate","deprecated","forward","redirect","overlap","preprocess","postprocess"];function ao(e,t){let r=new e(t),n=Object.create(r);for(let u of so)u in t&&(n[u]=Do(t[u],r,b.prototype[u].length));return n}var b=class{static create(t){return ao(this,t)}constructor(t){this.name=t.name;}default(t){}expected(t){return "nothing"}validate(t,r){return  false}deprecated(t,r){return  false}forward(t,r){}redirect(t,r){}overlap(t,r,n){return t}preprocess(t,r){return t}postprocess(t,r){return ge}};function Do(e,t,r){return typeof e=="function"?(...n)=>e(...n.slice(0,r-1),t,...n.slice(r-1)):()=>e}var tt=class extends b{constructor(t){super(t),this._sourceName=t.sourceName;}expected(t){return t.schemas[this._sourceName].expected(t)}validate(t,r){return r.schemas[this._sourceName].validate(t,r)}redirect(t,r){return this._sourceName}};var rt=class extends b{expected(){return "anything"}validate(){return  true}};var nt=class extends b{constructor({valueSchema:t,name:r=t.name,...n}){super({...n,name:r}),this._valueSchema=t;}expected(t){let{text:r,list:n}=t.normalizeExpectedResult(this._valueSchema.expected(t));return {text:r&&`an array of ${r}`,list:n&&{title:"an array of the following values",values:[{list:n}]}}}validate(t,r){if(!Array.isArray(t))return  false;let n=[];for(let u of t){let o=r.normalizeValidateResult(this._valueSchema.validate(u,r),u);o!==true&&n.push(o.value);}return n.length===0?true:{value:n}}deprecated(t,r){let n=[];for(let u of t){let o=r.normalizeDeprecatedResult(this._valueSchema.deprecated(u,r),u);o!==false&&n.push(...o.map(({value:i})=>({value:[i]})));}return n}forward(t,r){let n=[];for(let u of t){let o=r.normalizeForwardResult(this._valueSchema.forward(u,r),u);n.push(...o.map(dn));}return n}redirect(t,r){let n=[],u=[];for(let o of t){let i=r.normalizeRedirectResult(this._valueSchema.redirect(o,r),o);"remain"in i&&n.push(i.remain),u.push(...i.redirect.map(dn));}return n.length===0?{redirect:u}:{redirect:u,remain:n}}overlap(t,r){return t.concat(r)}};function dn({from:e,to:t}){return {from:[e],to:t}}var ut=class extends b{expected(){return "true or false"}validate(t){return typeof t=="boolean"}};function En(e,t){let r=Object.create(null);for(let n of e){let u=n[t];if(r[u])throw new Error(`Duplicate ${t} ${JSON.stringify(u)}`);r[u]=n;}return r}function Cn(e,t){let r=new Map;for(let n of e){let u=n[t];if(r.has(u))throw new Error(`Duplicate ${t} ${JSON.stringify(u)}`);r.set(u,n);}return r}function hn(){let e=Object.create(null);return t=>{let r=JSON.stringify(t);return e[r]?true:(e[r]=true,false)}}function gn(e,t){let r=[],n=[];for(let u of e)t(u)?r.push(u):n.push(u);return [r,n]}function yn(e){return e===Math.floor(e)}function An(e,t){if(e===t)return 0;let r=typeof e,n=typeof t,u=["undefined","object","boolean","number","string"];return r!==n?u.indexOf(r)-u.indexOf(n):r!=="string"?Number(e)-Number(t):e.localeCompare(t)}function Bn(e){return (...t)=>{let r=e(...t);return typeof r=="string"?new Error(r):r}}function Lt(e){return e===void 0?{}:e}function It(e){if(typeof e=="string")return {text:e};let{text:t,list:r}=e;return co((t||r)!==void 0,"Unexpected `expected` result, there should be at least one field."),r?{text:t,list:{title:r.title,values:r.values.map(It)}}:{text:t}}function Rt(e,t){return e===true?true:e===false?{value:t}:e}function Yt(e,t,r=false){return e===false?false:e===true?r?true:[{value:t}]:"value"in e?[e]:e.length===0?false:e}function mn(e,t){return typeof e=="string"||"key"in e?{from:t,to:e}:"from"in e?{from:e.from,to:e.to}:{from:t,to:e.to}}function ot(e,t){return e===void 0?[]:Array.isArray(e)?e.map(r=>mn(r,t)):[mn(e,t)]}function jt(e,t){let r=ot(typeof e=="object"&&"redirect"in e?e.redirect:e,t);return r.length===0?{remain:t,redirect:r}:typeof e=="object"&&"remain"in e?{remain:e.remain,redirect:r}:{redirect:r}}function co(e,t){if(!e)throw new Error(t)}var it=class extends b{constructor(t){super(t),this._choices=Cn(t.choices.map(r=>r&&typeof r=="object"?r:{value:r}),"value");}expected({descriptor:t}){let r=Array.from(this._choices.keys()).map(i=>this._choices.get(i)).filter(({hidden:i})=>!i).map(i=>i.value).sort(An).map(t.value),n=r.slice(0,-2),u=r.slice(-2);return {text:n.concat(u.join(" or ")).join(", "),list:{title:"one of the following values",values:r}}}validate(t){return this._choices.has(t)}deprecated(t){let r=this._choices.get(t);return r&&r.deprecated?{value:t}:false}forward(t){let r=this._choices.get(t);return r?r.forward:void 0}redirect(t){let r=this._choices.get(t);return r?r.redirect:void 0}};var st=class extends b{expected(){return "a number"}validate(t,r){return typeof t=="number"}};var at=class extends st{expected(){return "an integer"}validate(t,r){return r.normalizeValidateResult(super.validate(t,r),t)===true&&yn(t)}};var Ie=class extends b{expected(){return "a string"}validate(t){return typeof t=="string"}};var _n=re,xn=et,wn=fn,bn=an;var Dt=class{constructor(t,r){let{logger:n=console,loggerPrintWidth:u=80,descriptor:o=_n,unknown:i=xn,invalid:s=wn,deprecated:a=bn,missing:c=()=>false,required:D=()=>false,preprocess:p=F=>F,postprocess:l=()=>ge}=r||{};this._utils={descriptor:o,logger:n||{warn:()=>{}},loggerPrintWidth:u,schemas:En(t,"name"),normalizeDefaultResult:Lt,normalizeExpectedResult:It,normalizeDeprecatedResult:Yt,normalizeForwardResult:ot,normalizeRedirectResult:jt,normalizeValidateResult:Rt},this._unknownHandler=i,this._invalidHandler=Bn(s),this._deprecatedHandler=a,this._identifyMissing=(F,f)=>!(F in f)||c(F,f),this._identifyRequired=D,this._preprocess=p,this._postprocess=l,this.cleanHistory();}cleanHistory(){this._hasDeprecationWarned=hn();}normalize(t){let r={},u=[this._preprocess(t,this._utils)],o=()=>{for(;u.length!==0;){let i=u.shift(),s=this._applyNormalization(i,r);u.push(...s);}};o();for(let i of Object.keys(this._utils.schemas)){let s=this._utils.schemas[i];if(!(i in r)){let a=Lt(s.default(this._utils));"value"in a&&u.push({[i]:a.value});}}o();for(let i of Object.keys(this._utils.schemas)){if(!(i in r))continue;let s=this._utils.schemas[i],a=r[i],c=s.postprocess(a,this._utils);c!==ge&&(this._applyValidation(c,i,s),r[i]=c);}return this._applyPostprocess(r),this._applyRequiredCheck(r),r}_applyNormalization(t,r){let n=[],{knownKeys:u,unknownKeys:o}=this._partitionOptionKeys(t);for(let i of u){let s=this._utils.schemas[i],a=s.preprocess(t[i],this._utils);this._applyValidation(a,i,s);let c=({from:F,to:f})=>{n.push(typeof f=="string"?{[f]:F}:{[f.key]:f.value});},D=({value:F,redirectTo:f})=>{let d=Yt(s.deprecated(F,this._utils),a,true);if(d!==false)if(d===true)this._hasDeprecationWarned(i)||this._utils.logger.warn(this._deprecatedHandler(i,f,this._utils));else for(let{value:m}of d){let C={key:i,value:m};if(!this._hasDeprecationWarned(C)){let E=typeof f=="string"?{key:f,value:m}:f;this._utils.logger.warn(this._deprecatedHandler(C,E,this._utils));}}};ot(s.forward(a,this._utils),a).forEach(c);let l=jt(s.redirect(a,this._utils),a);if(l.redirect.forEach(c),"remain"in l){let F=l.remain;r[i]=i in r?s.overlap(r[i],F,this._utils):F,D({value:F});}for(let{from:F,to:f}of l.redirect)D({value:F,redirectTo:f});}for(let i of o){let s=t[i];this._applyUnknownHandler(i,s,r,(a,c)=>{n.push({[a]:c});});}return n}_applyRequiredCheck(t){for(let r of Object.keys(this._utils.schemas))if(this._identifyMissing(r,t)&&this._identifyRequired(r))throw this._invalidHandler(r,Ze,this._utils)}_partitionOptionKeys(t){let[r,n]=gn(Object.keys(t).filter(u=>!this._identifyMissing(u,t)),u=>u in this._utils.schemas);return {knownKeys:r,unknownKeys:n}}_applyValidation(t,r,n){let u=Rt(n.validate(t,this._utils),t);if(u!==true)throw this._invalidHandler(r,u.value,this._utils)}_applyUnknownHandler(t,r,n,u){let o=this._unknownHandler(t,r,this._utils);if(o)for(let i of Object.keys(o)){if(this._identifyMissing(i,o))continue;let s=o[i];i in this._utils.schemas?u(i,s):n[i]=s;}}_applyPostprocess(t){let r=this._postprocess(t,this._utils);if(r!==ge){if(r.delete)for(let n of r.delete)delete t[n];if(r.override){let{knownKeys:n,unknownKeys:u}=this._partitionOptionKeys(r.override);for(let o of n){let i=r.override[o];this._applyValidation(i,o,this._utils.schemas[o]),t[o]=i;}for(let o of u){let i=r.override[o];this._applyUnknownHandler(o,i,t,(s,a)=>{let c=this._utils.schemas[s];this._applyValidation(a,s,c),t[s]=a;});}}}}};var Ut;function lo(e,t,{logger:r=false,isCLI:n=false,passThrough:u=false,FlagSchema:o,descriptor:i}={}){if(n){if(!o)throw new Error("'FlagSchema' option is required.");if(!i)throw new Error("'descriptor' option is required.")}else i=re;let s=u?Array.isArray(u)?(l,F)=>u.includes(l)?{[l]:F}:void 0:(l,F)=>({[l]:F}):(l,F,f)=>{let{_:d,...m}=f.schemas;return et(l,F,{...f,schemas:m})},a=Fo(t,{isCLI:n,FlagSchema:o}),c=new Dt(a,{logger:r,unknown:s,descriptor:i}),D=r!==false;D&&Ut&&(c._hasDeprecationWarned=Ut);let p=c.normalize(e);return D&&(Ut=c._hasDeprecationWarned),p}function Fo(e,{isCLI:t,FlagSchema:r}){let n=[];t&&n.push(rt.create({name:"_"}));for(let u of e)n.push(po(u,{isCLI:t,optionInfos:e,FlagSchema:r})),u.alias&&t&&n.push(tt.create({name:u.alias,sourceName:u.name}));return n}function po(e,{isCLI:t,optionInfos:r,FlagSchema:n}){let{name:u}=e,o={name:u},i,s={};switch(e.type){case "int":i=at,t&&(o.preprocess=Number);break;case "string":i=Ie;break;case "choice":i=it,o.choices=e.choices.map(a=>a!=null&&a.redirect?{...a,redirect:{to:{key:e.name,value:a.redirect}}}:a);break;case "boolean":i=ut;break;case "flag":i=n,o.flags=r.flatMap(a=>[a.alias,a.description&&a.name,a.oppositeDescription&&`no-${a.name}`].filter(Boolean));break;case "path":i=Ie;break;default:throw new Error(`Unexpected type ${e.type}`)}if(e.exception?o.validate=(a,c,D)=>e.exception(a)||c.validate(a,D):o.validate=(a,c,D)=>a===void 0||c.validate(a,D),e.redirect&&(s.redirect=a=>a?{to:typeof e.redirect=="string"?e.redirect:{key:e.redirect.option,value:e.redirect.value}}:void 0),e.deprecated&&(s.deprecated=true),t&&!e.array){let a=o.preprocess||(c=>c);o.preprocess=(c,D,p)=>D.preprocess(a(Array.isArray(c)?y(false,c,-1):c),p);}return e.array?nt.create({...t?{preprocess:a=>Array.isArray(a)?a:[a]}:{},...s,valueSchema:i.create(o)}):i.create({...o,...s})}var kn=lo;var mo=(e,t,r)=>{if(!(e&&t==null)){if(t.findLast)return t.findLast(r);for(let n=t.length-1;n>=0;n--){let u=t[n];if(r(u,n,t))return u}}},Vt=mo;function $t(e,t){if(!t)throw new Error("parserName is required.");let r=Vt(false,e,u=>u.parsers&&Object.prototype.hasOwnProperty.call(u.parsers,t));if(r)return r;let n=`Couldn't resolve parser "${t}".`;throw n+=" Plugins must be explicitly added to the standalone bundle.",new ve(n)}function Sn(e,t){if(!t)throw new Error("astFormat is required.");let r=Vt(false,e,u=>u.printers&&Object.prototype.hasOwnProperty.call(u.printers,t));if(r)return r;let n=`Couldn't find plugin for AST format "${t}".`;throw n+=" Plugins must be explicitly added to the standalone bundle.",new ve(n)}function Re({plugins:e,parser:t}){let r=$t(e,t);return Wt(r,t)}function Wt(e,t){let r=e.parsers[t];return typeof r=="function"?r():r}function Tn(e,t){let r=e.printers[t];return typeof r=="function"?r():r}var Nn={astFormat:"estree",printer:{},originalText:void 0,locStart:null,locEnd:null};async function Eo(e,t={}){var p;let r={...e};if(!r.parser)if(r.filepath){if(r.parser=on(r,{physicalFile:r.filepath}),!r.parser)throw new Le(`No parser could be inferred for file "${r.filepath}".`)}else throw new Le("No parser and no file path given, couldn't infer a parser.");let n=Qe({plugins:e.plugins,showDeprecated:true}).options,u={...Nn,...Object.fromEntries(n.filter(l=>l.default!==void 0).map(l=>[l.name,l.default]))},o=$t(r.plugins,r.parser),i=await Wt(o,r.parser);r.astFormat=i.astFormat,r.locEnd=i.locEnd,r.locStart=i.locStart;let s=(p=o.printers)!=null&&p[i.astFormat]?o:Sn(r.plugins,i.astFormat),a=await Tn(s,i.astFormat);r.printer=a;let c=s.defaultOptions?Object.fromEntries(Object.entries(s.defaultOptions).filter(([,l])=>l!==void 0)):{},D={...u,...c};for(let[l,F]of Object.entries(D))(r[l]===null||r[l]===void 0)&&(r[l]=F);return r.parser==="json"&&(r.trailingComma="none"),kn(r,n,{passThrough:Object.keys(Nn),...t})}var ne=Eo;var vn=gu(Pn());async function yo(e,t){let r=await Re(t),n=r.preprocess?r.preprocess(e,t):e;t.originalText=n;let u;try{u=await r.parse(n,t,t);}catch(o){Ao(o,e);}return {text:n,ast:u}}function Ao(e,t){let{loc:r}=e;if(r){let n=(0, vn.codeFrameColumns)(t,r,{highlightCode:true});throw e.message+=`
`+n,e.codeFrame=n,e}throw e}var De=yo;async function Ln(e,t,r,n,u){let{embeddedLanguageFormatting:o,printer:{embed:i,hasPrettierIgnore:s=()=>false,getVisitorKeys:a}}=r;if(!i||o!=="auto")return;if(i.length>2)throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/plugins#optional-embed");let c=J(i.getVisitorKeys??a),D=[];F();let p=e.stack;for(let{print:f,node:d,pathStack:m}of D)try{e.stack=m;let C=await f(l,t,e,r);C&&u.set(d,C);}catch(C){if(globalThis.PRETTIER_DEBUG)throw C}e.stack=p;function l(f,d){return Bo(f,d,r,n)}function F(){let{node:f}=e;if(f===null||typeof f!="object"||s(e))return;for(let m of c(f))Array.isArray(f[m])?e.each(F,m):e.call(F,m);let d=i(e,r);if(d){if(typeof d=="function"){D.push({print:d,node:f,pathStack:[...e.stack]});return}u.set(f,d);}}}async function Bo(e,t,r,n){let u=await ne({...r,...t,parentParser:r.parser,originalText:e,cursorOffset:void 0,rangeStart:void 0,rangeEnd:void 0},{passThrough:true}),{ast:o}=await De(e,u),i=await n(o,u);return $e(i)}function _o(e,t){let{originalText:r,[Symbol.for("comments")]:n,locStart:u,locEnd:o,[Symbol.for("printedComments")]:i}=t,{node:s}=e,a=u(s),c=o(s);for(let D of n)u(D)>=a&&o(D)<=c&&i.add(D);return r.slice(a,c)}var In=_o;async function Ye(e,t){({ast:e}=await Gt(e,t));let r=new Map,n=new Or(e),o=new Map;await Ln(n,s,t,Ye,o);let i=await Rn(n,t,s,void 0,o);if(Gr(t),t.cursorOffset>=0){if(t.nodeAfterCursor&&!t.nodeBeforeCursor)return [X,i];if(t.nodeBeforeCursor&&!t.nodeAfterCursor)return [i,X]}return i;function s(c,D){return c===void 0||c===n?a(D):Array.isArray(c)?n.call(()=>a(D),...c):n.call(()=>a(D),c)}function a(c){let D=n.node;if(D==null)return "";let p=D&&typeof D=="object"&&c===void 0;if(p&&r.has(D))return r.get(D);let l=Rn(n,t,s,c,o);return p&&r.set(D,l),l}}function Rn(e,t,r,n,u){var a;let{node:o}=e,{printer:i}=t,s;switch((a=i.hasPrettierIgnore)!=null&&a.call(i,e)?s=In(e,t):u.has(o)?s=u.get(o):s=i.print(e,t,r,n),o){case t.cursorNode:s=Fe(s,c=>[X,c,X]);break;case t.nodeBeforeCursor:s=Fe(s,c=>[c,X]);break;case t.nodeAfterCursor:s=Fe(s,c=>[X,c]);break}return i.printComment&&(!i.willPrintOwnComments||!i.willPrintOwnComments(e,t))&&(s=Mr(e,s,t)),s}async function Gt(e,t){let r=e.comments??[];t[Symbol.for("comments")]=r,t[Symbol.for("printedComments")]=new Set,Vr(e,t);let{printer:{preprocess:n}}=t;return e=n?await n(e,t):e,{ast:e,comments:r}}function xo(e,t){let{cursorOffset:r,locStart:n,locEnd:u}=t,o=J(t.printer.getVisitorKeys),i=F=>n(F)<=r&&u(F)>=r,s=e,a=[e];for(let F of Lr(e,{getVisitorKeys:o,filter:i}))a.push(F),s=F;if(Ir(s,{getVisitorKeys:o}))return {cursorNode:s};let c,D,p=-1,l=Number.POSITIVE_INFINITY;for(;a.length>0&&(c===void 0||D===void 0);){s=a.pop();let F=c!==void 0,f=D!==void 0;for(let d of Ce(s,{getVisitorKeys:o})){if(!F){let m=u(d);m<=r&&m>p&&(c=d,p=m);}if(!f){let m=n(d);m>=r&&m<l&&(D=d,l=m);}}}return {nodeBeforeCursor:c,nodeAfterCursor:D}}var Kt=xo;function wo(e,t){let{printer:{massageAstNode:r,getVisitorKeys:n}}=t;if(!r)return e;let u=J(n),o=r.ignoredProperties??new Set;return i(e);function i(s,a){if(!(s!==null&&typeof s=="object"))return s;if(Array.isArray(s))return s.map(l=>i(l,a)).filter(Boolean);let c={},D=new Set(u(s));for(let l in s)!Object.prototype.hasOwnProperty.call(s,l)||o.has(l)||(D.has(l)?c[l]=i(s[l],s):c[l]=s[l]);let p=r(s,c,a);if(p!==null)return p??c}}var Yn=wo;var bo=(e,t,r)=>{if(!(e&&t==null)){if(t.findLastIndex)return t.findLastIndex(r);for(let n=t.length-1;n>=0;n--){let u=t[n];if(r(u,n,t))return n}return  -1}},jn=bo;var ko=({parser:e})=>e==="json"||e==="json5"||e==="jsonc"||e==="json-stringify";function So(e,t){let r=[e.node,...e.parentNodes],n=new Set([t.node,...t.parentNodes]);return r.find(u=>$n.has(u.type)&&n.has(u))}function Un(e){let t=jn(false,e,r=>r.type!=="Program"&&r.type!=="File");return t===-1?e:e.slice(0,t+1)}function To(e,t,{locStart:r,locEnd:n}){let u=e.node,o=t.node;if(u===o)return {startNode:u,endNode:o};let i=r(e.node);for(let a of Un(t.parentNodes))if(r(a)>=i)o=a;else break;let s=n(t.node);for(let a of Un(e.parentNodes)){if(n(a)<=s)u=a;else break;if(u===o)break}return {startNode:u,endNode:o}}function zt(e,t,r,n,u=[],o){let{locStart:i,locEnd:s}=r,a=i(e),c=s(e);if(!(t>c||t<a||o==="rangeEnd"&&t===a||o==="rangeStart"&&t===c)){for(let D of Xe(e,r)){let p=zt(D,t,r,n,[e,...u],o);if(p)return p}if(!n||n(e,u[0]))return {node:e,parentNodes:u}}}function No(e,t){return t!=="DeclareExportDeclaration"&&e!=="TypeParameterDeclaration"&&(e==="Directive"||e==="TypeAlias"||e==="TSExportAssignment"||e.startsWith("Declare")||e.startsWith("TSDeclare")||e.endsWith("Statement")||e.endsWith("Declaration"))}var $n=new Set(["JsonRoot","ObjectExpression","ArrayExpression","StringLiteral","NumericLiteral","BooleanLiteral","NullLiteral","UnaryExpression","TemplateLiteral"]),Oo=new Set(["OperationDefinition","FragmentDefinition","VariableDefinition","TypeExtensionDefinition","ObjectTypeDefinition","FieldDefinition","DirectiveDefinition","EnumTypeDefinition","EnumValueDefinition","InputValueDefinition","InputObjectTypeDefinition","SchemaDefinition","OperationTypeDefinition","InterfaceTypeDefinition","UnionTypeDefinition","ScalarTypeDefinition"]);function Vn(e,t,r){if(!t)return  false;switch(e.parser){case "flow":case "hermes":case "babel":case "babel-flow":case "babel-ts":case "typescript":case "acorn":case "espree":case "meriyah":case "oxc":case "oxc-ts":case "__babel_estree":return No(t.type,r==null?void 0:r.type);case "json":case "json5":case "jsonc":case "json-stringify":return $n.has(t.type);case "graphql":return Oo.has(t.kind);case "vue":return t.tag!=="root"}return  false}function Wn(e,t,r){let{rangeStart:n,rangeEnd:u,locStart:o,locEnd:i}=t;Oe.ok(u>n);let s=e.slice(n,u).search(/\S/u),a=s===-1;if(!a)for(n+=s;u>n&&!/\S/u.test(e[u-1]);--u);let c=zt(r,n,t,(F,f)=>Vn(t,F,f),[],"rangeStart"),D=a?c:zt(r,u,t,F=>Vn(t,F),[],"rangeEnd");if(!c||!D)return {rangeStart:0,rangeEnd:0};let p,l;if(ko(t)){let F=So(c,D);p=F,l=F;}else ({startNode:p,endNode:l}=To(c,D,t));return {rangeStart:Math.min(o(p),o(l)),rangeEnd:Math.max(i(p),i(l))}}var zn="\uFEFF",Mn=Symbol("cursor");async function Hn(e,t,r=0){if(!e||e.trim().length===0)return {formatted:"",cursorOffset:-1,comments:[]};let{ast:n,text:u}=await De(e,t);t.cursorOffset>=0&&(t={...t,...Kt(n,t)});let o=await Ye(n,t);r>0&&(o=Ge([z,o],r,t.tabWidth));let i=me(o,t);if(r>0){let a=i.formatted.trim();i.cursorNodeStart!==void 0&&(i.cursorNodeStart-=i.formatted.indexOf(a),i.cursorNodeStart<0&&(i.cursorNodeStart=0,i.cursorNodeText=i.cursorNodeText.trimStart()),i.cursorNodeStart+i.cursorNodeText.length>a.length&&(i.cursorNodeText=i.cursorNodeText.trimEnd())),i.formatted=a+xe(t.endOfLine);}let s=t[Symbol.for("comments")];if(t.cursorOffset>=0){let a,c,D,p;if((t.cursorNode||t.nodeBeforeCursor||t.nodeAfterCursor)&&i.cursorNodeText)if(D=i.cursorNodeStart,p=i.cursorNodeText,t.cursorNode)a=t.locStart(t.cursorNode),c=u.slice(a,t.locEnd(t.cursorNode));else {if(!t.nodeBeforeCursor&&!t.nodeAfterCursor)throw new Error("Cursor location must contain at least one of cursorNode, nodeBeforeCursor, nodeAfterCursor");a=t.nodeBeforeCursor?t.locEnd(t.nodeBeforeCursor):0;let C=t.nodeAfterCursor?t.locStart(t.nodeAfterCursor):u.length;c=u.slice(a,C);}else a=0,c=u,D=0,p=i.formatted;let l=t.cursorOffset-a;if(c===p)return {formatted:i.formatted,cursorOffset:D+l,comments:s};let F=c.split("");F.splice(l,0,Mn);let f=p.split(""),d=Et(F,f),m=D;for(let C of d)if(C.removed){if(C.value.includes(Mn))break}else m+=C.count;return {formatted:i.formatted,cursorOffset:m,comments:s}}return {formatted:i.formatted,cursorOffset:-1,comments:s}}async function Po(e,t){let{ast:r,text:n}=await De(e,t),{rangeStart:u,rangeEnd:o}=Wn(n,t,r),i=n.slice(u,o),s=Math.min(u,n.lastIndexOf(`
`,u)+1),a=n.slice(s,u).match(/^\s*/u)[0],c=Ee(a,t.tabWidth),D=await Hn(i,{...t,rangeStart:0,rangeEnd:Number.POSITIVE_INFINITY,cursorOffset:t.cursorOffset>u&&t.cursorOffset<=o?t.cursorOffset-u:-1,endOfLine:"lf"},c),p=D.formatted.trimEnd(),{cursorOffset:l}=t;l>o?l+=p.length-i.length:D.cursorOffset>=0&&(l=D.cursorOffset+u);let F=n.slice(0,u)+p+n.slice(o);if(t.endOfLine!=="lf"){let f=xe(t.endOfLine);l>=0&&f===`\r
`&&(l+=Ct(F.slice(0,l),`
`)),F=te(false,F,`
`,f);}return {formatted:F,cursorOffset:l,comments:D.comments}}function Ht(e,t,r){return typeof t!="number"||Number.isNaN(t)||t<0||t>e.length?r:t}function Gn(e,t){let{cursorOffset:r,rangeStart:n,rangeEnd:u}=t;return r=Ht(e,r,-1),n=Ht(e,n,0),u=Ht(e,u,e.length),{...t,cursorOffset:r,rangeStart:n,rangeEnd:u}}function Jn(e,t){let{cursorOffset:r,rangeStart:n,rangeEnd:u,endOfLine:o}=Gn(e,t),i=e.charAt(0)===zn;if(i&&(e=e.slice(1),r--,n--,u--),o==="auto"&&(o=nr(e)),e.includes("\r")){let s=a=>Ct(e.slice(0,Math.max(a,0)),`\r
`);r-=s(r),n-=s(n),u-=s(u),e=ur(e);}return {hasBOM:i,text:e,options:Gn(e,{...t,cursorOffset:r,rangeStart:n,rangeEnd:u,endOfLine:o})}}async function Kn(e,t){let r=await Re(t);return !r.hasPragma||r.hasPragma(e)}async function vo(e,t){var n;let r=await Re(t);return (n=r.hasIgnorePragma)==null?void 0:n.call(r,e)}async function Jt(e,t){let{hasBOM:r,text:n,options:u}=Jn(e,await ne(t));if(u.rangeStart>=u.rangeEnd&&n!==""||u.requirePragma&&!await Kn(n,u)||u.checkIgnorePragma&&await vo(n,u))return {formatted:e,cursorOffset:t.cursorOffset,comments:[]};let o;return u.rangeStart>0||u.rangeEnd<n.length?o=await Po(n,u):(!u.requirePragma&&u.insertPragma&&u.printer.insertPragma&&!await Kn(n,u)&&(n=u.printer.insertPragma(n)),o=await Hn(n,u)),r&&(o.formatted=zn+o.formatted,o.cursorOffset>=0&&o.cursorOffset++),o}async function qn(e,t,r){let{text:n,options:u}=Jn(e,await ne(t)),o=await De(n,u);return r&&(r.preprocessForPrint&&(o.ast=await Gt(o.ast,u)),r.massage&&(o.ast=Yn(o.ast,u))),o}async function Xn(e,t){t=await ne(t);let r=await Ye(e,t);return me(r,t)}async function Qn(e,t){let r=wr(e),{formatted:n}=await Jt(r,{...t,parser:"__js_expression"});return n}async function Zn(e,t){t=await ne(t);let{ast:r}=await De(e,t);return t.cursorOffset>=0&&(t={...t,...Kt(r,t)}),Ye(r,t)}async function eu(e,t){return me(e,await ne(t))}var qt={};dt(qt,{builders:()=>Io,printer:()=>Ro,utils:()=>Yo});var Io={join:ke,line:Me,softline:_r,hardline:z,literalline:We,group:At,conditionalGroup:Cr,fill:hr,lineSuffix:Se,lineSuffixBoundary:Ar,cursor:X,breakParent:pe,ifBreak:gr,trim:Br,indent:ie,indentIfBreak:yr,align:oe,addAlignmentToDoc:Ge,markAsRoot:mr,dedentToRoot:dr,dedent:Er,hardlineWithoutBreakParent:Te,literallineWithoutBreakParent:Bt,label:xr,concat:e=>e},Ro={printDocToString:me},Yo={willBreak:Dr,traverseDoc:le,findInDoc:Ve,mapDoc:be,removeLines:fr,stripTrailingHardline:$e,replaceEndOfLine:lr,canBreak:Fr};var tu="3.6.0";var Qt={};dt(Qt,{addDanglingComment:()=>ee,addLeadingComment:()=>se,addTrailingComment:()=>ae,getAlignmentSize:()=>Ee,getIndentSize:()=>ru,getMaxContinuousCount:()=>nu,getNextNonSpaceNonCommentCharacter:()=>uu,getNextNonSpaceNonCommentCharacterIndex:()=>Xo,getPreferredQuote:()=>iu,getStringWidth:()=>Ne,hasNewline:()=>G,hasNewlineInRange:()=>su,hasSpaces:()=>au,isNextLineEmpty:()=>ti,isNextLineEmptyAfterIndex:()=>ct,isPreviousLineEmpty:()=>Zo,makeString:()=>Du,skip:()=>he,skipEverythingButNewLine:()=>Je,skipInlineComment:()=>ye,skipNewline:()=>U,skipSpaces:()=>T,skipToLineEnd:()=>He,skipTrailingComment:()=>Ae,skipWhitespace:()=>Rr});function jo(e,t){if(t===false)return  false;if(e.charAt(t)==="/"&&e.charAt(t+1)==="*"){for(let r=t+2;r<e.length;++r)if(e.charAt(r)==="*"&&e.charAt(r+1)==="/")return r+2}return t}var ye=jo;function Uo(e,t){return t===false?false:e.charAt(t)==="/"&&e.charAt(t+1)==="/"?Je(e,t):t}var Ae=Uo;function Vo(e,t){let r=null,n=t;for(;n!==r;)r=n,n=T(e,n),n=ye(e,n),n=Ae(e,n),n=U(e,n);return n}var je=Vo;function $o(e,t){let r=null,n=t;for(;n!==r;)r=n,n=He(e,n),n=ye(e,n),n=T(e,n);return n=Ae(e,n),n=U(e,n),n!==false&&G(e,n)}var ct=$o;function Wo(e,t){let r=e.lastIndexOf(`
`);return r===-1?0:Ee(e.slice(r+1).match(/^[\t ]*/u)[0],t)}var ru=Wo;function Xt(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function Mo(e,t){let r=e.match(new RegExp(`(${Xt(t)})+`,"gu"));return r===null?0:r.reduce((n,u)=>Math.max(n,u.length/t.length),0)}var nu=Mo;function Go(e,t){let r=je(e,t);return r===false?"":e.charAt(r)}var uu=Go;var ft="'",ou='"';function Ko(e,t){let r=t===true||t===ft?ft:ou,n=r===ft?ou:ft,u=0,o=0;for(let i of e)i===r?u++:i===n&&o++;return u>o?n:r}var iu=Ko;function zo(e,t,r){for(let n=t;n<r;++n)if(e.charAt(n)===`
`)return  true;return  false}var su=zo;function Ho(e,t,r={}){return T(e,r.backwards?t-1:t,r)!==t}var au=Ho;function Jo(e,t,r){let n=t==='"'?"'":'"',o=te(false,e,/\\(.)|(["'])/gsu,(i,s,a)=>s===n?s:a===t?"\\"+a:a||(r&&/^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/u.test(s)?s:"\\"+s));return t+o+t}var Du=Jo;function qo(e,t,r){return je(e,r(t))}function Xo(e,t){return arguments.length===2||typeof t=="number"?je(e,t):qo(...arguments)}function Qo(e,t,r){return Pe(e,r(t))}function Zo(e,t){return arguments.length===2||typeof t=="number"?Pe(e,t):Qo(...arguments)}function ei(e,t,r){return ct(e,r(t))}function ti(e,t){return arguments.length===2||typeof t=="number"?ct(e,t):ei(...arguments)}function ce(e,t=1){return async(...r)=>{let n=r[t]??{},u=n.plugins??[];return r[t]={...n,plugins:Array.isArray(u)?u:Object.values(u)},e(...r)}}var cu=ce(Jt);async function fu(e,t){let{formatted:r}=await cu(e,{...t,cursorOffset:-1});return r}async function ri(e,t){return await fu(e,t)===e}var ni=ce(Qe,0),ui={parse:ce(qn),formatAST:ce(Xn),formatDoc:ce(Qn),printToDoc:ce(Zn),printDocToString:ce(eu)};

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React = requireReact(),
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React = {
	      "react-stack-bottom-frame": function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(
	      React,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        false,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        true,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;

	if (process.env.NODE_ENV === 'production') {
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	} else {
	  jsxRuntime.exports = requireReactJsxRuntime_development();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/shared/plain-text-selectors.ts
var plainTextSelectors = [
  { selector: "img", format: "skip" },
  { selector: "[data-skip-in-text=true]", format: "skip" },
  {
    selector: "a",
    options: { linkBrackets: false }
  }
];
function recursivelyMapDoc(doc, callback) {
  if (Array.isArray(doc)) {
    return doc.map((innerDoc) => recursivelyMapDoc(innerDoc, callback));
  }
  if (typeof doc === "object") {
    if (doc.type === "group") {
      return __spreadProps(__spreadValues({}, doc), {
        contents: recursivelyMapDoc(doc.contents, callback),
        expandedStates: recursivelyMapDoc(
          doc.expandedStates,
          callback
        )
      });
    }
    if ("contents" in doc) {
      return __spreadProps(__spreadValues({}, doc), {
        contents: recursivelyMapDoc(doc.contents, callback)
      });
    }
    if ("parts" in doc) {
      return __spreadProps(__spreadValues({}, doc), {
        parts: recursivelyMapDoc(doc.parts, callback)
      });
    }
    if (doc.type === "if-break") {
      return __spreadProps(__spreadValues({}, doc), {
        breakContents: recursivelyMapDoc(doc.breakContents, callback),
        flatContents: recursivelyMapDoc(doc.flatContents, callback)
      });
    }
  }
  return callback(doc);
}
var modifiedHtml = __spreadValues({}, html);
if (modifiedHtml.printers) {
  const previousPrint = modifiedHtml.printers.html.print;
  modifiedHtml.printers.html.print = (path, options, print, args) => {
    const node = path.getNode();
    const rawPrintingResult = previousPrint(path, options, print, args);
    if (node.type === "ieConditionalComment") {
      const printingResult = recursivelyMapDoc(rawPrintingResult, (doc) => {
        if (typeof doc === "object" && doc.type === "line") {
          return doc.soft ? "" : " ";
        }
        return doc;
      });
      return printingResult;
    }
    return rawPrintingResult;
  };
}
var defaults = {
  endOfLine: "lf",
  tabWidth: 2,
  plugins: [modifiedHtml],
  bracketSameLine: true,
  parser: "html"
};
var pretty = (str, options = {}) => {
  return fu(str.replaceAll("\0", ""), __spreadValues(__spreadValues({}, defaults), options));
};
var decoder = new TextDecoder("utf-8");
var readStream = (stream) => __async(void 0, null, function* () {
  let result = "";
  if ("pipeTo" in stream) {
    const writableStream = new WritableStream({
      write(chunk) {
        result += decoder.decode(chunk);
      }
    });
    yield stream.pipeTo(writableStream);
  } else {
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        result += decoder.decode(chunk);
        callback();
      }
    });
    stream.pipe(writable);
    yield new Promise((resolve, reject) => {
      writable.on("error", reject);
      writable.on("close", () => {
        resolve();
      });
    });
  }
  return result;
});
var render = (node, options) => __async(void 0, null, function* () {
  const suspendedElement = /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { children: node });
  const reactDOMServer = yield import('./server.node_CfbuYylm.mjs').then(n => n.s).then(
    // This is beacuse react-dom/server is CJS
    (m) => m.default
  );
  let html2;
  if (Object.hasOwn(reactDOMServer, "renderToReadableStream")) {
    html2 = yield readStream(
      yield reactDOMServer.renderToReadableStream(suspendedElement)
    );
  } else {
    yield new Promise((resolve, reject) => {
      const stream = reactDOMServer.renderToPipeableStream(suspendedElement, {
        onAllReady() {
          return __async(this, null, function* () {
            html2 = yield readStream(stream);
            resolve();
          });
        },
        onError(error) {
          reject(error);
        }
      });
    });
  }
  if (options == null ? void 0 : options.plainText) {
    return convert(html2, __spreadValues({
      selectors: plainTextSelectors
    }, options.htmlToTextOptions));
  }
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const document = `${doctype}${html2.replace(/<!DOCTYPE.*?>/, "")}`;
  if (options == null ? void 0 : options.pretty) {
    return pretty(document);
  }
  return document;
});

// src/node/index.ts
var renderAsync = (element, options) => {
  return render(element, options);
};

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    plainTextSelectors,
    pretty,
    render,
    renderAsync
}, Symbol.toStringTag, { value: 'Module' }));

export { index as i, requireReact as r };
