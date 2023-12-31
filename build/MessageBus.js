var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MessageBus_receivers;
export var Message;
(function (Message) {
    Message[Message["LanguageChanged"] = 0] = "LanguageChanged";
    Message[Message["TagChanged"] = 1] = "TagChanged";
    Message[Message["TranslationChanged"] = 2] = "TranslationChanged";
    Message[Message["VerseViewChanged"] = 3] = "VerseViewChanged";
})(Message || (Message = {}));
export class MessageBus {
    constructor() {
        _MessageBus_receivers.set(this, void 0);
        __classPrivateFieldSet(this, _MessageBus_receivers, [], "f");
    }
    add(receiver) {
        __classPrivateFieldGet(this, _MessageBus_receivers, "f").push(receiver);
    }
    send(message) {
        for (let receiver of __classPrivateFieldGet(this, _MessageBus_receivers, "f")) {
            receiver(message);
        }
    }
}
_MessageBus_receivers = new WeakMap();
//# sourceMappingURL=MessageBus.js.map