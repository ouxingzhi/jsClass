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
			this.__propertys__();
			this.initialize.apply(this, arguments);
		},
		sup__propertys__,
		sub__propertys__,
		supInitialize,
		subInitialize,
		i;
    emptyClass.prototype = supProto;
    newClass.prototype = new emptyClass();
    newClass.prototype.constructor = supClass;
    supInitialize = newClass.prototype.initialize || function () {};
    subInitialize = subProperty.initialize || function () {};
    sup__propertys__ = newClass.prototype.__propertys__ || function () {};
    sub__propertys__ = subProperty.__propertys__ || function () {};
    var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(subInitialize.toString())[1].replace(/\s/i, '').split(',');
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
        };
    }
    //预设成员定义区
    newClass.prototype.__propertys__ = function () {
        sup__propertys__.call(this);
        sub__propertys__.call(this);
    };
    return newClass;
}
