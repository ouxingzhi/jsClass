/**
 * 类系统
 * 当为基类时，可省略supClass，直接定义subProperty
 * @param supClass {Function|Object} 要继承的类
 * @param subProperty {Object} 子类的定义
 */
function Class(supClass, subProperty) {
    if (typeof supClass === 'object') {
        subProperty = supClass;
        supClass = function () {};
    }
    var slice = Array.prototype.slice,
    supProto = supClass.prototype,
    emptyClass = function () {},
    newClass = function () {
        this.initialize.apply(this, arguments);
    },
    supInitialize,
    subInitialize,
    i;
    emptyClass.prototype = supProto;
    newClass.prototype = new emptyClass();
    newClass.prototype.constructor = supClass;
    supInitialize = newClass.prototype.initialize || function () {};
    subInitialize = subProperty.initialize || function () {};
    var argslist = /function\s*\(([^\(\)]*?)\)\{/i.exec(subInitialize.toString())[1].replace(/\s/i, '').split(',');
    for (i in subProperty) {
        subProperty.hasOwnProperty(i) && (newClass.prototype[i] = subProperty[i]);
    }
    if (argslist[0] === '$super') {
        newClass.prototype.initialize = function () {
            var self = this,
            args = [function () {
                    supInitialize.apply(self, arguments);
                }
            ];
            subInitialize.apply(this, args.concat(slice.call(arguments)));
        }
    }
    return newClass;
}
