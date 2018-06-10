import { Service } from '../service';

export function Autoregister() {
    // @todo specify the correct types `return function<T extends typeof Service>(target: T): T`
    return function(target: any): any {
        // save a reference to the original constructor
        var original = target;

        // the new constructor behaviour
        var f: any = function(...args) {
            let instance = original.apply(this, args);
            instance.register();
            return instance;
        };

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
    };
}
