//
// component.ts
// figures
// 
// Author: Wess Cope (me@wess.io)
// Created: 06/17/2021
// 
// Copywrite (c) 2021 Wess.io
//


function _bind(target, key, descriptor)  {
  let fn = descriptor.value;

	if (typeof fn !== 'function') {
		throw new TypeError(`@component decorator failed attempting to to apply to methods not: ${typeof fn}`);
	}

	let definingProperty = false;

	return {
		configurable: true,
		get() {
			if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
				return fn;
			}

			const bound = fn.bind(this);
			definingProperty = true;

			Object.defineProperty(this, key, {
				configurable: true,
				get() {
					return bound;
				},
				set(value) {
					fn = value;
					delete this[key];
				}
			});
			definingProperty = false;
			return bound;
		},
		set(value) {
			fn = value;
		}
	};
}

export default function Component(target) {
	let keys;
	
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
		keys = Reflect.ownKeys(target.prototype);
	} else {
		keys = Object.getOwnPropertyNames(target.prototype);
		// Use symbols if support is provided
		if (typeof Object.getOwnPropertySymbols === 'function') {
			keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
		}
	}

  
	keys
  .filter(key => key !== 'constructor')
  .forEach(key => {
		const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

		// Only methods need binding
		if (typeof descriptor.value === 'function') {
			Object.defineProperty(target.prototype, key, _bind(target, key, descriptor));
		}
	});
	return target;
}
