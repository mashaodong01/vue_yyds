const Vue = (function() {
    function Vue(options) {
        var recycles = {
            beforeCreate: options.beforeCreate.bind(this),
            created: options.created.bind(this),
            beforeMount: options.beforeMount.bind(this),
            mounted: options.mounted.bind(this)
        }
        recycles.beforeCreate();

        this.$el = document.querySelector(options.el);
        this.$data = options.data();
        this._init(this, options.template, options.methods, recycles);
    }
    Vue.prototype._init = function(vm, template, methods, recycles) {
        recycles.created();
        var container = document.createElement('div');
        container.innerHTML = template;
        var showPool = new Map();
        var eventPool = new Map();

        initData(vm, showPool);
        initPool(container, methods, showPool, eventPool);
        bindEvent(vm, eventPool);
        render(vm, showPool, container, recycles);
    }
    function initData(vm, showPool) {
        var _data = vm.$data;
        for (let key in _data) {
            (function(key) {
                if (_data.hasOwnProperty(key)) {
                    Object.defineProperty(vm, key, {
                        get() {
                            return _data[key]
                        },
                        set(val) {
                            _data[key] = val;
                            update(vm, key, showPool);
                        }
                    })
                }
            })(key)
        }
    }
    function initPool(container, methods, showPool, eventPool) {
        var _allNodes = container.getElementsByTagName('*');
        var dom = null;

        for (let i = 0; i < _allNodes.length; i++) {
            dom = _allNodes[i];

            var vIfData = dom.getAttribute('v-if');
            var vShowData = dom.getAttribute('v-show');
            var vEvent = dom.getAttribute('@click');

            if (vIfData) {
                showPool.set(
                    dom,
                    {
                        type: 'if',
                        prop: vIfData
                    }
                );
                dom.removeAttribute('v-if');
            } else if (vShowData) {
                showPool.set(
                    dom, 
                    {
                        type: 'show',
                        prop: vShowData
                    }
                )
                dom.removeAttribute('v-show');
            }
            if (vEvent) {
                eventPool.set(
                    dom,
                    methods[vEvent]
                );
                dom.removeAttribute('@click')
            }
        }
    }
    function bindEvent(vm, eventPool) {
        for (var [ dom, handler ] of eventPool) {
            vm[handler.name] = handler;
            dom.addEventListener('click', vm[handler.name].bind(vm), false)
        }
    }
    function render(vm, showPool, container, recycles) {
        var _data = vm.$data;
        var _el = vm.$el;

        for (let [dom, info] of showPool) {
            switch (info.type) {
                case 'if':
                    info.comment = document.createComment(['v-if']);
                    !_data[info.prop] && dom.parentNode.replaceChild(info.comment, dom);
                    break;
                case 'show':
                    !_data[info.prop] && (dom.style.display = 'none');
                    break;
                default:
                    break;
            }
        }
        recycles.beforeMount();
        _el.appendChild(container);
        recycles.mounted();
    }
    function update(vm, key, showPool) {
        var _data = vm.$data;
        for (let [dom, info] of showPool) {
            if (info.prop === key) {
                switch (info.type) {
                    case 'if':
                        !_data[key] ? dom.parentNode.replaceChild(info.comment, dom)
                                   : info.comment.parentNode.replaceChild(dom, info.comment) 
                        break;
                    case 'show':
                        !_data[key] ? (dom.style.display = 'none')
                                    : (dom.removeAttribute('style'));
                        break;
                    default:
                        break;
                }
            }
        }
    }
    return Vue;
})()

export default Vue;