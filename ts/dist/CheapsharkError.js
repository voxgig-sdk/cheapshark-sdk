"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheapsharkError = void 0;
class CheapsharkError extends Error {
    isCheapsharkError = true;
    sdk = 'Cheapshark';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CheapsharkError = CheapsharkError;
//# sourceMappingURL=CheapsharkError.js.map