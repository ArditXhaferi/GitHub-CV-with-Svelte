
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/Contributions.svelte generated by Svelte v3.55.1 */

    const file$6 = "src/components/Contributions.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (13:4) {#each contribution_list as contribution}
    function create_each_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_style(div, "background-color", /*colors*/ ctx[1][/*contribution*/ ctx[2].intensity]);
    			attr_dev(div, "class", "contribution svelte-1m2xmwa");
    			add_location(div, file$6, 13, 8, 255);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*contribution_list*/ 1) {
    				set_style(div, "background-color", /*colors*/ ctx[1][/*contribution*/ ctx[2].intensity]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(13:4) {#each contribution_list as contribution}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let each_value = /*contribution_list*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "contributions svelte-1m2xmwa");
    			add_location(div, file$6, 11, 0, 173);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*colors, contribution_list*/ 3) {
    				each_value = /*contribution_list*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contributions', slots, []);
    	let { contribution_list } = $$props;
    	let colors = ["#f1eef4", "#c5bbd4", "#9a87b4", "#6e5494", "#584376"];

    	$$self.$$.on_mount.push(function () {
    		if (contribution_list === undefined && !('contribution_list' in $$props || $$self.$$.bound[$$self.$$.props['contribution_list']])) {
    			console.warn("<Contributions> was created without expected prop 'contribution_list'");
    		}
    	});

    	const writable_props = ['contribution_list'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contributions> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('contribution_list' in $$props) $$invalidate(0, contribution_list = $$props.contribution_list);
    	};

    	$$self.$capture_state = () => ({ contribution_list, colors });

    	$$self.$inject_state = $$props => {
    		if ('contribution_list' in $$props) $$invalidate(0, contribution_list = $$props.contribution_list);
    		if ('colors' in $$props) $$invalidate(1, colors = $$props.colors);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [contribution_list, colors];
    }

    class Contributions extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { contribution_list: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contributions",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get contribution_list() {
    		throw new Error("<Contributions>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contribution_list(value) {
    		throw new Error("<Contributions>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Rating.svelte generated by Svelte v3.55.1 */

    const file$5 = "src/components/Rating.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let div_aria_label_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "stars svelte-tpw5ek");
    			set_style(div, "--rating", /*rating*/ ctx[0] || 0);
    			attr_dev(div, "aria-label", div_aria_label_value = "Rating of this product is " + (/*rating*/ ctx[0] || 0) + " out of 5.");
    			add_location(div, file$5, 4, 0, 43);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rating*/ 1) {
    				set_style(div, "--rating", /*rating*/ ctx[0] || 0);
    			}

    			if (dirty & /*rating*/ 1 && div_aria_label_value !== (div_aria_label_value = "Rating of this product is " + (/*rating*/ ctx[0] || 0) + " out of 5.")) {
    				attr_dev(div, "aria-label", div_aria_label_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Rating', slots, []);
    	let { rating } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (rating === undefined && !('rating' in $$props || $$self.$$.bound[$$self.$$.props['rating']])) {
    			console.warn("<Rating> was created without expected prop 'rating'");
    		}
    	});

    	const writable_props = ['rating'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Rating> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('rating' in $$props) $$invalidate(0, rating = $$props.rating);
    	};

    	$$self.$capture_state = () => ({ rating });

    	$$self.$inject_state = $$props => {
    		if ('rating' in $$props) $$invalidate(0, rating = $$props.rating);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rating];
    }

    class Rating extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { rating: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rating",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get rating() {
    		throw new Error("<Rating>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rating(value) {
    		throw new Error("<Rating>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Repos.svelte generated by Svelte v3.55.1 */
    const file$4 = "src/components/Repos.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (9:4) {#each repos_list as repo}
    function create_each_block$1(ctx) {
    	let div;
    	let t0_value = /*repo*/ ctx[1].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*repo*/ ctx[1].stargazers_count + "";
    	let t2;
    	let t3;
    	let rating;
    	let current;

    	rating = new Rating({
    			props: {
    				rating: /*repo*/ ctx[1].stargazers_count / (/*repos_list*/ ctx[0][0].stargazers_count / 5)
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text("-");
    			t2 = text(t2_value);
    			t3 = space();
    			create_component(rating.$$.fragment);
    			attr_dev(div, "class", "repo");
    			add_location(div, file$4, 9, 8, 248);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			insert_dev(target, t3, anchor);
    			mount_component(rating, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*repos_list*/ 1) && t0_value !== (t0_value = /*repo*/ ctx[1].name + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*repos_list*/ 1) && t2_value !== (t2_value = /*repo*/ ctx[1].stargazers_count + "")) set_data_dev(t2, t2_value);
    			const rating_changes = {};
    			if (dirty & /*repos_list*/ 1) rating_changes.rating = /*repo*/ ctx[1].stargazers_count / (/*repos_list*/ ctx[0][0].stargazers_count / 5);
    			rating.$set(rating_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rating.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rating.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t3);
    			destroy_component(rating, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(9:4) {#each repos_list as repo}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let t0;

    	let t1_value = (/*repos_list*/ ctx[0].length == 0
    	? 1
    	: /*repos_list*/ ctx[0][0].stargazers_count / 5) + "";

    	let t1;
    	let t2;
    	let current;
    	let each_value = /*repos_list*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Repo stars (");
    			t1 = text(t1_value);
    			t2 = text(" stars by real)\n    ");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "repos");
    			add_location(div, file$4, 6, 0, 90);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*repos_list*/ 1) && t1_value !== (t1_value = (/*repos_list*/ ctx[0].length == 0
    			? 1
    			: /*repos_list*/ ctx[0][0].stargazers_count / 5) + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*repos_list*/ 1) {
    				each_value = /*repos_list*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Repos', slots, []);
    	let { repos_list } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (repos_list === undefined && !('repos_list' in $$props || $$self.$$.bound[$$self.$$.props['repos_list']])) {
    			console.warn("<Repos> was created without expected prop 'repos_list'");
    		}
    	});

    	const writable_props = ['repos_list'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Repos> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('repos_list' in $$props) $$invalidate(0, repos_list = $$props.repos_list);
    	};

    	$$self.$capture_state = () => ({ Rating, repos_list });

    	$$self.$inject_state = $$props => {
    		if ('repos_list' in $$props) $$invalidate(0, repos_list = $$props.repos_list);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [repos_list];
    }

    class Repos extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { repos_list: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Repos",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get repos_list() {
    		throw new Error("<Repos>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set repos_list(value) {
    		throw new Error("<Repos>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Languages.svelte generated by Svelte v3.55.1 */

    const file$3 = "src/components/Languages.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (6:4) {#each languages as language}
    function create_each_block(ctx) {
    	let div;
    	let t0_value = /*language*/ ctx[1][0] + ": " + /*language*/ ctx[1][1] + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(div, "class", "language");
    			add_location(div, file$3, 6, 8, 112);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*languages*/ 1 && t0_value !== (t0_value = /*language*/ ctx[1][0] + ": " + /*language*/ ctx[1][1] + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(6:4) {#each languages as language}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let each_value = /*languages*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "languages svelte-nyf7da");
    			add_location(div, file$3, 4, 0, 46);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*languages*/ 1) {
    				each_value = /*languages*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Languages', slots, []);
    	let { languages } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (languages === undefined && !('languages' in $$props || $$self.$$.bound[$$self.$$.props['languages']])) {
    			console.warn("<Languages> was created without expected prop 'languages'");
    		}
    	});

    	const writable_props = ['languages'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Languages> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('languages' in $$props) $$invalidate(0, languages = $$props.languages);
    	};

    	$$self.$capture_state = () => ({ languages });

    	$$self.$inject_state = $$props => {
    		if ('languages' in $$props) $$invalidate(0, languages = $$props.languages);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [languages];
    }

    class Languages extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { languages: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Languages",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get languages() {
    		throw new Error("<Languages>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set languages(value) {
    		throw new Error("<Languages>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Input.svelte generated by Svelte v3.55.1 */

    const file$2 = "src/components/Input.svelte";

    function create_fragment$2(ctx) {
    	let div2;
    	let div0;
    	let input;
    	let t0;
    	let div1;
    	let button;
    	let t1;
    	let i;
    	let svg;
    	let path;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			input = element("input");
    			t0 = space();
    			div1 = element("div");
    			button = element("button");
    			t1 = text("Check urself\n            ");
    			i = element("i");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(input, "class", "searchInpt svelte-13f0zz6");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "Github Username");
    			add_location(input, file$2, 7, 8, 129);
    			attr_dev(div0, "class", "item svelte-13f0zz6");
    			add_location(div0, file$2, 6, 4, 102);
    			attr_dev(path, "d", "M0 3.76172H10.6172L7.94531 1.05469L9 0L13.5 4.5L9 9L7.94531 7.94531L10.6172 5.23828H0V3.76172Z");
    			attr_dev(path, "fill", "white");
    			add_location(path, file$2, 27, 20, 689);
    			attr_dev(svg, "width", "14");
    			attr_dev(svg, "height", "9");
    			attr_dev(svg, "viewBox", "0 0 14 9");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$2, 20, 16, 458);
    			attr_dev(i, "class", "icon svelte-13f0zz6");
    			add_location(i, file$2, 19, 12, 425);
    			attr_dev(button, "class", "btnSearch svelte-13f0zz6");
    			add_location(button, file$2, 15, 8, 316);
    			attr_dev(div1, "class", "item svelte-13f0zz6");
    			add_location(div1, file$2, 14, 4, 289);
    			attr_dev(div2, "class", "inputWithButton svelte-13f0zz6");
    			add_location(div2, file$2, 5, 0, 68);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, input);
    			set_input_value(input, /*name*/ ctx[0]);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, button);
    			append_dev(button, t1);
    			append_dev(button, i);
    			append_dev(i, svg);
    			append_dev(svg, path);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[2]),
    					listen_dev(
    						button,
    						"click",
    						function () {
    							if (is_function(/*create*/ ctx[1]())) /*create*/ ctx[1]().apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*name*/ 1 && input.value !== /*name*/ ctx[0]) {
    				set_input_value(input, /*name*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Input', slots, []);
    	let { name = '' } = $$props;
    	let { create } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (create === undefined && !('create' in $$props || $$self.$$.bound[$$self.$$.props['create']])) {
    			console.warn("<Input> was created without expected prop 'create'");
    		}
    	});

    	const writable_props = ['name', 'create'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Input> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		name = this.value;
    		$$invalidate(0, name);
    	}

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('create' in $$props) $$invalidate(1, create = $$props.create);
    	};

    	$$self.$capture_state = () => ({ name, create });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('create' in $$props) $$invalidate(1, create = $$props.create);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, create, input_input_handler];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { name: 0, create: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get name() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get create() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set create(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/Entry.svelte generated by Svelte v3.55.1 */
    const file$1 = "src/pages/Entry.svelte";

    function create_fragment$1(ctx) {
    	let div3;
    	let div1;
    	let img;
    	let img_src_value;
    	let t0;
    	let div0;
    	let h1;
    	let t2;
    	let h4;
    	let t4;
    	let div2;
    	let p;
    	let t5;
    	let span;
    	let t6;
    	let t7_value = (/*name*/ ctx[0] || "stranger") + "";
    	let t7;
    	let t8;
    	let t9;
    	let t10;
    	let input;
    	let updating_name;
    	let div3_class_value;
    	let current;

    	function input_name_binding(value) {
    		/*input_name_binding*/ ctx[3](value);
    	}

    	let input_props = { create: /*create*/ ctx[1] };

    	if (/*name*/ ctx[0] !== void 0) {
    		input_props.name = /*name*/ ctx[0];
    	}

    	input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, 'name', input_name_binding));

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div1 = element("div");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "How Bad Is Your GitHub Profile?";
    			t2 = space();
    			h4 = element("h4");
    			h4.textContent = "Check urself before you wreck urself in those FAANG interviews";
    			t4 = space();
    			div2 = element("div");
    			p = element("p");
    			t5 = text("Hello ");
    			span = element("span");
    			t6 = text("\"");
    			t7 = text(t7_value);
    			t8 = text("\"");
    			t9 = text(" !");
    			t10 = space();
    			create_component(input.$$.fragment);
    			if (!src_url_equal(img.src, img_src_value = "./github.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "svelte-1bz84ab");
    			add_location(img, file$1, 12, 8, 192);
    			attr_dev(h1, "class", "svelte-1bz84ab");
    			add_location(h1, file$1, 14, 12, 243);
    			attr_dev(h4, "class", "svelte-1bz84ab");
    			add_location(h4, file$1, 15, 12, 296);
    			add_location(div0, file$1, 13, 8, 225);
    			add_location(div1, file$1, 11, 4, 178);
    			attr_dev(span, "class", "i svelte-1bz84ab");
    			add_location(span, file$1, 19, 17, 421);
    			attr_dev(p, "class", "svelte-1bz84ab");
    			add_location(p, file$1, 19, 8, 412);
    			add_location(div2, file$1, 18, 4, 398);
    			attr_dev(div3, "class", div3_class_value = "entry " + /*className*/ ctx[2] + " svelte-1bz84ab");
    			add_location(div3, file$1, 10, 0, 142);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div1, img);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t2);
    			append_dev(div0, h4);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, p);
    			append_dev(p, t5);
    			append_dev(p, span);
    			append_dev(span, t6);
    			append_dev(span, t7);
    			append_dev(span, t8);
    			append_dev(p, t9);
    			append_dev(div2, t10);
    			mount_component(input, div2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*name*/ 1) && t7_value !== (t7_value = (/*name*/ ctx[0] || "stranger") + "")) set_data_dev(t7, t7_value);
    			const input_changes = {};
    			if (dirty & /*create*/ 2) input_changes.create = /*create*/ ctx[1];

    			if (!updating_name && dirty & /*name*/ 1) {
    				updating_name = true;
    				input_changes.name = /*name*/ ctx[0];
    				add_flush_callback(() => updating_name = false);
    			}

    			input.$set(input_changes);

    			if (!current || dirty & /*className*/ 4 && div3_class_value !== (div3_class_value = "entry " + /*className*/ ctx[2] + " svelte-1bz84ab")) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(input);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Entry', slots, []);
    	let { name } = $$props;
    	let { create } = $$props;
    	let { className } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
    			console.warn("<Entry> was created without expected prop 'name'");
    		}

    		if (create === undefined && !('create' in $$props || $$self.$$.bound[$$self.$$.props['create']])) {
    			console.warn("<Entry> was created without expected prop 'create'");
    		}

    		if (className === undefined && !('className' in $$props || $$self.$$.bound[$$self.$$.props['className']])) {
    			console.warn("<Entry> was created without expected prop 'className'");
    		}
    	});

    	const writable_props = ['name', 'create', 'className'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Entry> was created with unknown prop '${key}'`);
    	});

    	function input_name_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('create' in $$props) $$invalidate(1, create = $$props.create);
    		if ('className' in $$props) $$invalidate(2, className = $$props.className);
    	};

    	$$self.$capture_state = () => ({ Input, name, create, className });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('create' in $$props) $$invalidate(1, create = $$props.create);
    		if ('className' in $$props) $$invalidate(2, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, create, className, input_name_binding];
    }

    class Entry extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { name: 0, create: 1, className: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Entry",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get name() {
    		throw new Error("<Entry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Entry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get create() {
    		throw new Error("<Entry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set create(value) {
    		throw new Error("<Entry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get className() {
    		throw new Error("<Entry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<Entry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var core = createCommonjsModule(function (module, exports) {
    !function(e,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,(()=>(()=>{var e={75:function(e){(function(){var t,n,r,o,a,s;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(e.exports=function(){return (t()-a)/1e6},n=process.hrtime,o=(t=function(){var e;return 1e9*(e=n())[0]+e[1]})(),s=1e9*process.uptime(),a=o-s):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return (new Date).getTime()-r},r=(new Date).getTime());}).call(this);},4087:(e,t,n)=>{for(var r=n(75),o="undefined"==typeof window?n.g:window,a=["moz","webkit"],s="AnimationFrame",i=o["request"+s],u=o["cancel"+s]||o["cancelRequest"+s],l=0;!i&&l<a.length;l++)i=o[a[l]+"Request"+s],u=o[a[l]+"Cancel"+s]||o[a[l]+"CancelRequest"+s];if(!i||!u){var c=0,p=0,d=[];i=function(e){if(0===d.length){var t=r(),n=Math.max(0,16.666666666666668-(t-c));c=n+t,setTimeout((function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c);}catch(e){setTimeout((function(){throw e}),0);}}),Math.round(n));}return d.push({handle:++p,callback:e,cancelled:!1}),p},u=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0);};}e.exports=function(e){return i.call(o,e)},e.exports.cancel=function(){u.apply(o,arguments);},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=i,e.cancelAnimationFrame=u;};}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]});},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return (()=>{n.d(r,{default:()=>S});var e=n(4087),t=n.n(e);const o=function(e){return new RegExp(/<[a-z][\s\S]*>/i).test(e)},a=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes},s=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};var i="TYPE_CHARACTER",u="REMOVE_CHARACTER",l="REMOVE_ALL",c="REMOVE_LAST_VISIBLE_NODE",p="PAUSE_FOR",d="CALL_FUNCTION",f="ADD_HTML_TAG_ELEMENT",v="CHANGE_DELETE_SPEED",h="CHANGE_DELAY",m="CHANGE_CURSOR",y="PASTE_STRING",g="HTML_TAG";function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r);}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){N(e,t,n[t]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t));}));}return e}function T(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return "Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const S=function(){function n(r,E){var b=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),N(this,"state",{cursorAnimation:null,lastFrameTime:null,pauseUntil:null,eventQueue:[],eventLoop:null,eventLoopPaused:!1,reverseCalledEvents:[],calledEvents:[],visibleNodes:[],initialOptions:null,elements:{container:null,wrapper:document.createElement("span"),cursor:document.createElement("span")}}),N(this,"options",{strings:null,cursor:"|",delay:"natural",pauseFor:1500,deleteSpeed:"natural",loop:!1,autoStart:!1,devMode:!1,skipAddStyles:!1,wrapperClassName:"Typewriter__wrapper",cursorClassName:"Typewriter__cursor",stringSplitter:null,onCreateTextNode:null,onRemoveNode:null}),N(this,"setupWrapperElement",(function(){b.state.elements.container&&(b.state.elements.wrapper.className=b.options.wrapperClassName,b.state.elements.cursor.className=b.options.cursorClassName,b.state.elements.cursor.innerHTML=b.options.cursor,b.state.elements.container.innerHTML="",b.state.elements.container.appendChild(b.state.elements.wrapper),b.state.elements.container.appendChild(b.state.elements.cursor));})),N(this,"start",(function(){return b.state.eventLoopPaused=!1,b.runEventLoop(),b})),N(this,"pause",(function(){return b.state.eventLoopPaused=!0,b})),N(this,"stop",(function(){return b.state.eventLoop&&((0, e.cancel)(b.state.eventLoop),b.state.eventLoop=null),b})),N(this,"pauseFor",(function(e){return b.addEventToQueue(p,{ms:e}),b})),N(this,"typeOutAllStrings",(function(){return "string"==typeof b.options.strings?(b.typeString(b.options.strings).pauseFor(b.options.pauseFor),b):(b.options.strings.forEach((function(e){b.typeString(e).pauseFor(b.options.pauseFor).deleteAll(b.options.deleteSpeed);})),b)})),N(this,"typeString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(o(e))return b.typeOutHTMLString(e,t);if(e){var n=b.options||{},r=n.stringSplitter,a="function"==typeof r?r(e):e.split("");b.typeCharacters(a,t);}return b})),N(this,"pasteString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return o(e)?b.typeOutHTMLString(e,t,!0):(e&&b.addEventToQueue(y,{character:e,node:t}),b)})),N(this,"typeOutHTMLString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=a(e);if(r.length>0)for(var o=0;o<r.length;o++){var s=r[o],i=s.innerHTML;s&&3!==s.nodeType?(s.innerHTML="",b.addEventToQueue(f,{node:s,parentNode:t}),n?b.pasteString(i,s):b.typeString(i,s)):s.textContent&&(n?b.pasteString(s.textContent,t):b.typeString(s.textContent,t));}return b})),N(this,"deleteAll",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"natural";return b.addEventToQueue(l,{speed:e}),b})),N(this,"changeDeleteSpeed",(function(e){if(!e)throw new Error("Must provide new delete speed");return b.addEventToQueue(v,{speed:e}),b})),N(this,"changeDelay",(function(e){if(!e)throw new Error("Must provide new delay");return b.addEventToQueue(h,{delay:e}),b})),N(this,"changeCursor",(function(e){if(!e)throw new Error("Must provide new cursor");return b.addEventToQueue(m,{cursor:e}),b})),N(this,"deleteChars",(function(e){if(!e)throw new Error("Must provide amount of characters to delete");for(var t=0;t<e;t++)b.addEventToQueue(u);return b})),N(this,"callFunction",(function(e,t){if(!e||"function"!=typeof e)throw new Error("Callbak must be a function");return b.addEventToQueue(d,{cb:e,thisArg:t}),b})),N(this,"typeCharacters",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(e){b.addEventToQueue(i,{character:e,node:t});})),b})),N(this,"removeCharacters",(function(e){if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(){b.addEventToQueue(u);})),b})),N(this,"addEventToQueue",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return b.addEventToStateProperty(e,t,n,"eventQueue")})),N(this,"addReverseCalledEvent",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=b.options.loop;return r?b.addEventToStateProperty(e,t,n,"reverseCalledEvents"):b})),N(this,"addEventToStateProperty",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3?arguments[3]:void 0,o={eventName:e,eventArgs:t||{}};return b.state[r]=n?[o].concat(T(b.state[r])):[].concat(T(b.state[r]),[o]),b})),N(this,"runEventLoop",(function(){b.state.lastFrameTime||(b.state.lastFrameTime=Date.now());var e=Date.now(),n=e-b.state.lastFrameTime;if(!b.state.eventQueue.length){if(!b.options.loop)return;b.state.eventQueue=T(b.state.calledEvents),b.state.calledEvents=[],b.options=w({},b.state.initialOptions);}if(b.state.eventLoop=t()(b.runEventLoop),!b.state.eventLoopPaused){if(b.state.pauseUntil){if(e<b.state.pauseUntil)return;b.state.pauseUntil=null;}var r,o=T(b.state.eventQueue),a=o.shift();if(!(n<=(r=a.eventName===c||a.eventName===u?"natural"===b.options.deleteSpeed?s(40,80):b.options.deleteSpeed:"natural"===b.options.delay?s(120,160):b.options.delay))){var E=a.eventName,A=a.eventArgs;switch(b.logInDevMode({currentEvent:a,state:b.state,delay:r}),E){case y:case i:var N=A.character,S=A.node,C=document.createTextNode(N),_=C;b.options.onCreateTextNode&&"function"==typeof b.options.onCreateTextNode&&(_=b.options.onCreateTextNode(N,C)),_&&(S?S.appendChild(_):b.state.elements.wrapper.appendChild(_)),b.state.visibleNodes=[].concat(T(b.state.visibleNodes),[{type:"TEXT_NODE",character:N,node:_}]);break;case u:o.unshift({eventName:c,eventArgs:{removingCharacterNode:!0}});break;case p:var O=a.eventArgs.ms;b.state.pauseUntil=Date.now()+parseInt(O);break;case d:var L=a.eventArgs,D=L.cb,M=L.thisArg;D.call(M,{elements:b.state.elements});break;case f:var x=a.eventArgs,P=x.node,j=x.parentNode;j?j.appendChild(P):b.state.elements.wrapper.appendChild(P),b.state.visibleNodes=[].concat(T(b.state.visibleNodes),[{type:g,node:P,parentNode:j||b.state.elements.wrapper}]);break;case l:var R=b.state.visibleNodes,k=A.speed,Q=[];k&&Q.push({eventName:v,eventArgs:{speed:k,temp:!0}});for(var F=0,H=R.length;F<H;F++)Q.push({eventName:c,eventArgs:{removingCharacterNode:!1}});k&&Q.push({eventName:v,eventArgs:{speed:b.options.deleteSpeed,temp:!0}}),o.unshift.apply(o,Q);break;case c:var I=a.eventArgs.removingCharacterNode;if(b.state.visibleNodes.length){var U=b.state.visibleNodes.pop(),q=U.type,G=U.node,Y=U.character;b.options.onRemoveNode&&"function"==typeof b.options.onRemoveNode&&b.options.onRemoveNode({node:G,character:Y}),G&&G.parentNode.removeChild(G),q===g&&I&&o.unshift({eventName:c,eventArgs:{}});}break;case v:b.options.deleteSpeed=a.eventArgs.speed;break;case h:b.options.delay=a.eventArgs.delay;break;case m:b.options.cursor=a.eventArgs.cursor,b.state.elements.cursor.innerHTML=a.eventArgs.cursor;}b.options.loop&&(a.eventName===c||a.eventArgs&&a.eventArgs.temp||(b.state.calledEvents=[].concat(T(b.state.calledEvents),[a]))),b.state.eventQueue=o,b.state.lastFrameTime=e;}}})),r)if("string"==typeof r){var A=document.querySelector(r);if(!A)throw new Error("Could not find container element");this.state.elements.container=A;}else this.state.elements.container=r;E&&(this.options=w(w({},this.options),E)),this.state.initialOptions=w({},this.options),this.init();}var r,E;return r=n,(E=[{key:"init",value:function(){var e,t;this.setupWrapperElement(),this.addEventToQueue(m,{cursor:this.options.cursor},!0),this.addEventToQueue(l,null,!0),!window||window.___TYPEWRITER_JS_STYLES_ADDED___||this.options.skipAddStyles||(e=".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}",(t=document.createElement("style")).appendChild(document.createTextNode(e)),document.head.appendChild(t),window.___TYPEWRITER_JS_STYLES_ADDED___=!0),!0===this.options.autoStart&&this.options.strings&&this.typeOutAllStrings().start();}},{key:"logInDevMode",value:function(e){this.options.devMode&&console.log(e);}}])&&A(r.prototype,E),Object.defineProperty(r,"prototype",{writable:!1}),n}();})(),r.default})()));
    });

    var Typewriter = /*@__PURE__*/getDefaultExportFromCjs(core);

    /* src/App.svelte generated by Svelte v3.55.1 */

    const { Object: Object_1, console: console_1 } = globals;
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let entry;
    	let updating_name;
    	let t0;
    	let div4;
    	let div0;
    	let t1;
    	let img0;
    	let img0_src_value;
    	let t2;
    	let div3;
    	let div2;
    	let img1;
    	let img1_src_value;
    	let t3;
    	let div1;
    	let h2;
    	let t4;
    	let t5;
    	let contributions_1;
    	let t6;
    	let repos_1;
    	let t7;
    	let languages_1;
    	let div4_class_value;
    	let current;

    	function entry_name_binding(value) {
    		/*entry_name_binding*/ ctx[8](value);
    	}

    	let entry_props = {
    		className: /*entry_style*/ ctx[1],
    		create: /*createCV*/ ctx[7]
    	};

    	if (/*name*/ ctx[0] !== void 0) {
    		entry_props.name = /*name*/ ctx[0];
    	}

    	entry = new Entry({ props: entry_props, $$inline: true });
    	binding_callbacks.push(() => bind(entry, 'name', entry_name_binding));

    	contributions_1 = new Contributions({
    			props: {
    				contribution_list: /*contributions*/ ctx[6]
    			},
    			$$inline: true
    		});

    	repos_1 = new Repos({
    			props: { repos_list: /*repos_sorted*/ ctx[4] },
    			$$inline: true
    		});

    	languages_1 = new Languages({
    			props: { languages: /*languages*/ ctx[5] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(entry.$$.fragment);
    			t0 = space();
    			div4 = element("div");
    			div0 = element("div");
    			t1 = space();
    			img0 = element("img");
    			t2 = space();
    			div3 = element("div");
    			div2 = element("div");
    			img1 = element("img");
    			t3 = space();
    			div1 = element("div");
    			h2 = element("h2");
    			t4 = text(/*username*/ ctx[3]);
    			t5 = space();
    			create_component(contributions_1.$$.fragment);
    			t6 = space();
    			create_component(repos_1.$$.fragment);
    			t7 = space();
    			create_component(languages_1.$$.fragment);
    			attr_dev(div0, "id", "type");
    			add_location(div0, file, 176, 2, 6585);
    			if (!src_url_equal(img0.src, img0_src_value = "./icons.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "icons svelte-xzvqe8");
    			attr_dev(img0, "alt", "Icons");
    			attr_dev(img0, "width", "35");
    			add_location(img0, file, 178, 2, 6612);
    			if (!src_url_equal(img1.src, img1_src_value = /*src*/ ctx[2])) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "profile");
    			attr_dev(img1, "class", "profile svelte-xzvqe8");
    			add_location(img1, file, 181, 4, 6735);
    			attr_dev(h2, "class", "svelte-xzvqe8");
    			add_location(h2, file, 183, 5, 6826);
    			attr_dev(div1, "class", "contributions_container svelte-xzvqe8");
    			add_location(div1, file, 182, 4, 6783);
    			attr_dev(div2, "class", "profile_container svelte-xzvqe8");
    			add_location(div2, file, 180, 3, 6699);
    			attr_dev(div3, "class", "export svelte-xzvqe8");
    			add_location(div3, file, 179, 2, 6675);
    			attr_dev(div4, "class", div4_class_value = "container " + /*entry_style*/ ctx[1] + " svelte-xzvqe8");
    			add_location(div4, file, 175, 1, 6545);
    			attr_dev(main, "class", "svelte-xzvqe8");
    			add_location(main, file, 173, 0, 6463);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(entry, main, null);
    			append_dev(main, t0);
    			append_dev(main, div4);
    			append_dev(div4, div0);
    			append_dev(div4, t1);
    			append_dev(div4, img0);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, img1);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, h2);
    			append_dev(h2, t4);
    			append_dev(div1, t5);
    			mount_component(contributions_1, div1, null);
    			append_dev(div3, t6);
    			mount_component(repos_1, div3, null);
    			append_dev(div3, t7);
    			mount_component(languages_1, div3, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const entry_changes = {};
    			if (dirty & /*entry_style*/ 2) entry_changes.className = /*entry_style*/ ctx[1];

    			if (!updating_name && dirty & /*name*/ 1) {
    				updating_name = true;
    				entry_changes.name = /*name*/ ctx[0];
    				add_flush_callback(() => updating_name = false);
    			}

    			entry.$set(entry_changes);

    			if (!current || dirty & /*src*/ 4 && !src_url_equal(img1.src, img1_src_value = /*src*/ ctx[2])) {
    				attr_dev(img1, "src", img1_src_value);
    			}

    			if (!current || dirty & /*username*/ 8) set_data_dev(t4, /*username*/ ctx[3]);
    			const repos_1_changes = {};
    			if (dirty & /*repos_sorted*/ 16) repos_1_changes.repos_list = /*repos_sorted*/ ctx[4];
    			repos_1.$set(repos_1_changes);
    			const languages_1_changes = {};
    			if (dirty & /*languages*/ 32) languages_1_changes.languages = /*languages*/ ctx[5];
    			languages_1.$set(languages_1_changes);

    			if (!current || dirty & /*entry_style*/ 2 && div4_class_value !== (div4_class_value = "container " + /*entry_style*/ ctx[1] + " svelte-xzvqe8")) {
    				attr_dev(div4, "class", div4_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(entry.$$.fragment, local);
    			transition_in(contributions_1.$$.fragment, local);
    			transition_in(repos_1.$$.fragment, local);
    			transition_in(languages_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(entry.$$.fragment, local);
    			transition_out(contributions_1.$$.fragment, local);
    			transition_out(repos_1.$$.fragment, local);
    			transition_out(languages_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(entry);
    			destroy_component(contributions_1);
    			destroy_component(repos_1);
    			destroy_component(languages_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let name = "";
    	let entry_style = "";
    	let src = "favicon.png";
    	let username = "John Doe";
    	let contributions = [];
    	let repos_sorted = [];
    	let languages_list = {};
    	let languages = [];
    	let sorted_languages = {};
    	let repos;

    	let jokes = {
    		JavaScript: "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings.",
    		Python: "What do you call a snake that works in a programming team? A Python developer.",
    		Java: "Why was the Java developer sad? They didn't have any closures.",
    		Ruby: "Why do Ruby developers wear glasses? Because they can't C#.",
    		PHP: "Why was the PHP developer sad? Because they didn't know what the 'else' statement was for.",
    		"C++": "Why do C++ developers wear glasses? Because they can't C#.",
    		"C#": "Why do C# developers wear glasses? Because they can't C#.",
    		TypeScript: "Why was the TypeScript developer sad? Because they didn't know how to 'null' their feelings.",
    		Shell: "Why do Shell developers wear glasses? Because they can't C#.",
    		Go: "Why was the Go developer sad? They didn't have any closures.",
    		Swift: "Why do Swift developers wear glasses? Because they can't C#.",
    		Kotlin: "Why was the Kotlin developer sad? They didn't have any closures.",
    		Scala: "Why was the Scala developer sad? They didn't have any closures.",
    		CSS: "Why was the CSS developer sad? They didn't know how to 'null' their feelings.",
    		C: "Why do C developers wear glasses? Because they can't C#.",
    		"Objective-C": "Why do Objective-C developers wear glasses? Because they can't C#.",
    		Rust: "Why was the Rust developer sad? They didn't have any closures.",
    		Dart: "Why do Dart developers wear glasses? Because they can't C#.",
    		Elixir: "Why was the Elixir developer sad? They didn't have any closures.",
    		Perl: "Why was the Perl developer sad? They didn't know what the 'else' statement was for.",
    		Groovy: "Why was the Groovy developer sad? They didn't know what the 'else' statement was for.",
    		"F#": "Why do F# developers wear glasses? Because they can't C#.",
    		CoffeeScript: "Why do CoffeeScript developers wear glasses? Because they can't C#.",
    		R: "Why was the R developer sad? They didn't have any closures.",
    		Vue: "Why do Vue developers wear glasses? Because they can't C#.",
    		Sass: "Why was the Sass developer sad? They didn't know how to 'null' their feelings.",
    		Erlang: "Why was the Erlang developer sad? They didn't have any closures.",
    		Julia: "Why was the Julia developer sad? They didn't have any closures.",
    		HTML: "Why was the HTML developer sad? They didn't know what the 'else' statement was for."
    	};

    	const githubRequest = (url, name) => {
    		return new Promise((resolve, reject) => {
    				fetch(url.replace("$name$", name)).then(response => response.json()).then(data => {
    					resolve(data);
    				}).catch(error => {
    					reject(error);
    				});
    			});
    	};

    	const createCV = async () => {
    		handleProfile();
    		handleContributions();
    	}; // handleLanguages()

    	const handleProfile = async () => {
    		repos = await githubRequest(`https://api.github.com/users/$name$/repos?per_page=100`, name);

    		$$invalidate(4, repos_sorted = repos.sort(function (a, b) {
    			return b.stargazers_count - a.stargazers_count;
    		}).slice(0, 3));

    		if (repos.length != 0) {
    			$$invalidate(2, src = repos[0]["owner"]["avatar_url"]);
    			$$invalidate(3, username = repos[0]["owner"]["login"]);
    		}

    		typeProfile();
    	};

    	const typeProfile = () => {
    		let app = document.getElementById('type');
    		let typewriter = new Typewriter(app, { delay: 75 });
    		console.log(reposAmountText());
    		typewriter.pauseFor(2000).typeString('Hello fuckface').pauseFor(100).deleteAll().typeString(`I mean hello ${name}, let's see if you actualy #code haha.`).pauseFor(500).typeString('<br><br> ' + reposAmountText()).start();
    	};

    	const reposAmountText = () => {
    		let hcolor = "a699bc";

    		switch (true) {
    			case repos.length == 0:
    				return `wow you have <b style='color: #${hcolor};'> 0 public repos </b> you either hate open source or ur my mom checking out this project I shared (hi mom)`;
    			case repos.length > 0 && repos.length < 10:
    				return `cool you have <b style='color: #${hcolor};'> ${repos.length} repositories </b> really that's all? bump that up to atleast second digits. disgraceful.`;
    			case repos.length > 9 && repos.length < 50:
    				return `Wow in the second digits impressive, you have <b style='color: #${hcolor};'> ${repos.length} public repositories. </b> Though I wonder what kind of person needs that many projects to hide their insecurities and inadequacies.`;
    			case repos.length > 49 && repos.length < 100:
    				return `It's clear that you've put in some work with over 50 public repos, it's quite a number huh <b style='color: #${hcolor};'> (to be exact ${repos.length})</b>, but this is not enough, you need to keep pushing, don't be satisfied with mediocrity.`;
    			case repos.length > 99:
    				return `You have an impressive number of <b style='color: #${hcolor};'>${repos.length} public repositories </b> in the hundreds, but I can't help but wonder if it's a way to compensate for something deeper and more profound that's missing in your life.`;
    		}
    	};

    	const handleContributions = async () => {
    		fetch("http://localhost:3000/" + name).then(response => response.json()).then(data => {
    			console.log(data);
    			$$invalidate(1, entry_style = "fade-out");
    		}).catch(error => {
    			console.log(error);
    		});
    	};

    	const handleLanguages = async () => {
    		let top_repos = await githubRequest(`https://api.github.com/users/$name$/repos?per_page=100`, name);

    		top_repos = top_repos.sort(function (a, b) {
    			return b.stargazers_count - a.stargazers_count;
    		}).slice(0, 3);

    		for (const repo of top_repos) {
    			let languages = await githubRequest(`https://api.github.com/repos/$name$/` + repo.name + `/languages`, name);

    			for (const [key, value] of Object.entries(languages)) {
    				if (languages_list[key] == undefined) {
    					languages_list[key] = value;
    				} else {
    					languages_list[key] += value;
    				}
    			}
    		}

    		$$invalidate(5, languages = Object.entries(languages_list).sort(function (a, b) {
    			return b[1] - a[1];
    		}));
    	};

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function entry_name_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	$$self.$capture_state = () => ({
    		Contributions,
    		Repos,
    		Languages,
    		Entry,
    		Typewriter,
    		name,
    		entry_style,
    		src,
    		username,
    		contributions,
    		repos_sorted,
    		languages_list,
    		languages,
    		sorted_languages,
    		repos,
    		jokes,
    		githubRequest,
    		createCV,
    		handleProfile,
    		typeProfile,
    		reposAmountText,
    		handleContributions,
    		handleLanguages
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('entry_style' in $$props) $$invalidate(1, entry_style = $$props.entry_style);
    		if ('src' in $$props) $$invalidate(2, src = $$props.src);
    		if ('username' in $$props) $$invalidate(3, username = $$props.username);
    		if ('contributions' in $$props) $$invalidate(6, contributions = $$props.contributions);
    		if ('repos_sorted' in $$props) $$invalidate(4, repos_sorted = $$props.repos_sorted);
    		if ('languages_list' in $$props) languages_list = $$props.languages_list;
    		if ('languages' in $$props) $$invalidate(5, languages = $$props.languages);
    		if ('sorted_languages' in $$props) sorted_languages = $$props.sorted_languages;
    		if ('repos' in $$props) repos = $$props.repos;
    		if ('jokes' in $$props) jokes = $$props.jokes;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		entry_style,
    		src,
    		username,
    		repos_sorted,
    		languages,
    		contributions,
    		createCV,
    		entry_name_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
