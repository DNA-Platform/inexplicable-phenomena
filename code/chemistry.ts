import React, { ReactNode, ReactElement, useState, useRef, useEffect } from 'react';

// Symbol for tracking reactified objects
const reactivated = Symbol('reactivated');
const backingFields = Symbol('backingFields');
const originalValues = Symbol('originalValues');
const deactivated = Symbol('deactivated');
const comparerSymbol = Symbol('comparer');

// Near the top of the file, with other symbols and constants
const componentUpdaters = new WeakMap<object, () => void>();

/**
 * Base class for Chemical components
 */
export class Chemical {
    // Static identifier to recognize Chemical components
    static readonly chemical: boolean = true;

    // Set by the render function to trigger updates
    private _chemicalUpdate?: () => void;

    // Children property for React child components
    children?: ReactNode;

    /**
     * Helper to get Chemical components from children
     * @returns Map of child elements to their Chemical instances
     */
    get childChemicals(): Map<ReactElement, Chemical> {
        const result = new Map<ReactElement, Chemical>();

        if (!this.children) return result;

        // Convert to array if not already
        const childrenArray = React.Children.toArray(this.children);

        childrenArray.forEach(child => {
            // Check if this is a valid React element representing a Chemical component
            if (React.isValidElement(child) &&
                child.type &&
                (child.type as any).isChemical) {

                // Try to extract the Chemical instance from the element
                const componentInstance = (child as any)._owner?.stateNode?.__chemicalInstance;

                if (componentInstance && componentInstance instanceof Chemical) {
                    result.set(child as ReactElement, componentInstance);
                }
            }
        });

        return result;
    }

    /**
     * Static method to convert a Chemical instance into a React component
     */
    render(): React.FC<any> {
        const self = this;
        // Return a React component function
        const ChemicalComponent: React.FC<any> = (props: any) => {
            // Create a new object with the instance as its prototype
            const componentInstance = Object.create(self);

            // Create a React hook for forcing updates
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [, forceUpdate] = useState({});

            // Make this instance available for parent components
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const instanceRef = useRef(componentInstance);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                // Store the instance for potential parent access
                (instanceRef as any).__chemicalInstance = componentInstance;
            }, []);

            // Set up update mechanism
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                // Store update function in the WeakMap instead of on the instance
                componentUpdaters.set(componentInstance, () => forceUpdate({}));

                // Reactivate on mount
                Chemical.reactivate(componentInstance);

                // Run catalyst methods after rendering
                if (componentInstance.constructor.prototype.catalystMethods) {
                    for (const methodName of componentInstance.constructor.prototype.catalystMethods) {
                        if (typeof componentInstance[methodName] === 'function') {
                            componentInstance[methodName]();
                        }
                    }
                }

                // Clean up
                return () => {
                    componentUpdaters.delete(componentInstance);
                };
            }, []);

            // Handle children first so they can be overridden by explicit props if needed
            if (props && 'children' in props) {
                componentInstance.children = props.children;
            }

            // Apply other props to instance
            if (props) {
                for (const key in props) {
                    if (props.hasOwnProperty(key) && key !== 'children') {
                        // Apply transformers if available
                        if (componentInstance.constructor.prototype.transformers &&
                            componentInstance.constructor.prototype.transformers.has(key)) {
                            const transformer = componentInstance.constructor.prototype.transformers.get(key);
                            (componentInstance as any)[key] = transformer((props as any)[key]);
                        } else {
                            (componentInstance as any)[key] = (props as any)[key];
                        }
                    }
                }
            }
    
            // Get the above, main, and below components
            const aboveNode = componentInstance.above();
            const mainNode = componentInstance.component();
            const belowNode = componentInstance.below();
            
            // If neither above nor below are defined, just return the main component
            if (!aboveNode && !belowNode) {
                return mainNode;
            }
            
            // Using React.createElement to create fragment with children
            const children: ReactNode[] = [];
            
            // Add each node if it exists
            if (aboveNode) children.push(aboveNode);
            children.push(mainNode);
            if (belowNode) children.push(belowNode);
            
            // Create fragment with children array
            return React.createElement(React.Fragment, null, ...children);
        };

        // Add isChemical identifier to the function component
        (ChemicalComponent as any).isChemical = true;

        return ChemicalComponent;
    }

    /**
     * Creates a React component from this Chemical instance
     */
    component(): ReactNode {
        throw Error("Not implemented");
    }

    /**
     * Adds a react node above the component when specified
     */
    above(): ReactNode | undefined {
        return undefined;
    }

    /**
     * Adds a react node below the component when specified
     */
    below(): ReactNode | undefined {
        return undefined;
    }

    /**
     * Static method to reactivate an object, making it reactive
     */
    static reactivate<T extends object>(instance: T): T {
        return reactivate(instance);
    }

    /**
     * Reactifies a nested data object in an object or field 
     */
    static reactivateData(obj: any, owner: any) {
        return reactivateData(obj, owner);
    }

    /**
     * Static method to deactivate an object, preventing it from triggering updates
     */
    static deactivate<T extends object>(instance: T): T {
        return deactivate(instance);
    }

    /**
     * Utility method to identify if an object is a Chemical component
     */
    static isComponent(value: any): boolean {
        return value && typeof value === 'function' && (value as any).isChemical === true;
    }

    /**
     * Utility method to identify if an object is a Chemical instance
     */
    static isInstance(value: any): boolean {
        return value instanceof Chemical;
    }
}

/**
 * Reactivates an object, making its properties reactive
 * This is exported for advanced usage but generally should be used via Chemical.reactivate
 */
/**
 * Reactivates an object, making its properties reactive
 * This is exported for advanced usage but generally should be used via Chemical.reactivate
 */
function reactivate<T extends object>(instance: T, owner?: any): T {
    // Skip if already reactivated and not deactivated
    if ((instance as any)[reactivated] && !(instance as any)[deactivated]) {
      return instance;
    }
    
    // Remove deactivated flag if present
    if ((instance as any)[deactivated]) {
      delete (instance as any)[deactivated];
    }
    
    // The update function that will be called when properties change
    const triggerUpdate = owner ? 
      () => { 
        const updateFn = componentUpdaters.get(owner);
        if (updateFn) updateFn(); 
      } : 
      () => { 
        const updateFn = componentUpdaters.get(instance);
        if (updateFn) updateFn(); 
      };
    
    decorate(instance, {
      after: (
        className: string,
        memberName: string,
        memberType: MemberType,
        method: Function,
        args: any[],
        result: any
      ) => {
        // Only trigger updates for field changes
        if (memberType === 'field') {
          triggerUpdate();
        }
        return result;
      }
    });
    
    // Deep reactify all object properties (not just ones in backingFields)
    for (const key in instance) {
      if (key !== 'constructor' && !key.startsWith('_')) {
        const value = (instance as any)[key];
        if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
          reactivateData(value, owner || instance);
        }
      }
    }
    
    // Also reactify any in backingFields that might not be enumerable on the instance
    if ((instance as any)[backingFields]) {
      for (const key in (instance as any)[backingFields]) {
        const value = (instance as any)[backingFields][key];
        if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
          reactivateData(value, owner || instance);
        }
      }
    }
    
    return instance;
}

/**
 * Reactivates a nested data object in an object or field 
 */
function reactivateData(obj: any, owner: any) {
    if (!obj || typeof obj !== 'object' || (obj as any)[reactivated] || obj instanceof Chemical) {
        return;
    }

    reactivate(obj, owner);
}

/**
 * Deactivates an object, preventing it from triggering updates
 * This is exported for advanced usage but generally should be used via Chemical.deactivate
 */
function deactivate<T extends object>(instance: T): T {
    // Mark as deactivated
    (instance as any)[deactivated] = true;
    return instance;
}

/**
 * Decorator to mark a field as inert (non-reactive)
 */
export function inert() {
    return function (target: any, propertyKey: string) {
        // Create or get the inert properties set
        if (!target[deactivated as any]) {
            target[deactivated as any] = new Set<string>();
        }

        // Add this property to the inert set
        target[deactivated as any].add(propertyKey);
    };
}

/**
 * Decorator to specify a custom equality comparison for a field
 */
export function equate(comparer: (a: any, b: any) => boolean) {
    return function (target: any, propertyKey: string) {
        // Create or get the property comparers map
        if (!target[comparerSymbol as any]) {
            target[comparerSymbol as any] = new Map<string, (a: any, b: any) => boolean>();
        }

        // Add the custom comparer for this property
        target[comparerSymbol as any].set(propertyKey, comparer);
    };
}

/**
 * Decorator for properties that should use deep equality comparison
 * Useful for arrays, collections, and complex objects
 */
export function dynamic() {
    return function (target: any, propertyKey: string) {
        // Create or get the property comparers map
        if (!target[comparerSymbol as any]) {
            target[comparerSymbol as any] = new Map<string, (a: any, b: any) => boolean>();
        }

        // Add a JSON-based deep comparer for this property
        target[comparerSymbol as any].set(propertyKey, (a: any, b: any) => {
            try {
                return JSON.stringify(a) === JSON.stringify(b);
            } catch (e) {
                // If stringify fails (circular refs, etc.), fall back to reference equality
                return a === b;
            }
        });
    };
}

/**
 * Decorator for methods that should run after component rendering
 */
export function entail() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        // Create or get the catalysts methods set
        if (!target.catalystMethods) {
            target.catalystMethods = new Set<string>();
        }

        // Add this method to the catalysts set
        target.catalystMethods.add(propertyKey);

        // Return the original descriptor
        return descriptor;
    };
}

/**
 * Decorator for properties that should run the value through a transformation function
 */
export function transform(transformer: (value: any) => any) {
    return function (target: any, propertyKey: string) {
        // Create or get the transformers map
        if (!target.transformers) {
            target.transformers = new Map<string, (value: any) => any>();
        }

        // Add the transformer for this property
        target.transformers.set(propertyKey, transformer);
    };
}


// Type definitions for decorator configuration
type MemberType = 'method' | 'property' | 'field';
type DecoratorConfig = {
    before?: (
        className: string,
        memberName: string,
        memberType: MemberType,
        method: Function,
        args: any[]
    ) => [Function, any[]] | undefined;
    after?: (
        className: string,
        memberName: string,
        memberType: MemberType,
        method: Function,
        args: any[],
        result: any
    ) => any | undefined;
    error?: (
        className: string,
        memberName: string,
        memberType: MemberType,
        method: Function,
        args: any[],
        error: any
    ) => any | undefined;
};

/**
 * Decorates an object's methods and properties with interceptors
 */
function decorate<T extends object>(instance: T, config: DecoratorConfig): T {
    // Skip if already decorated
    if ((instance as any)[reactivated]) {
        return instance;
    }

    const className: string = instance?.constructor?.name ?? "<UNKNOWN>";

    // Store original values
    (instance as any)[backingFields] = {};
    (instance as any)[originalValues] = {};
    
    // Process properties and fields
    decorateProperties(instance, className, config);

    // Mark as reactified
    (instance as any)[reactivated] = true;

    return instance;
}

/**
 * Decorates properties of an object with interceptors
 */
function decorateProperties(instance: any, className: string, config: DecoratorConfig): void {
    const properties = getAllProperties(instance);
    
    for (const key of properties) {
        // Skip internal properties and methods we've already processed
        if (key === 'constructor' ||
            key === String(reactivated) ||
            key === String(backingFields) ||
            key === String(originalValues) ||
            key === 'state' || key === 'props' ||
            typeof instance[key] === 'function' ||
            Chemical.prototype.hasOwnProperty(key) ||    // Skip Chemical base class properties
            instance[key] instanceof Chemical) {         // Skip Chemical instances
            continue;
        }

        // Check if this is already an accessor property
        const descriptor = Object.getOwnPropertyDescriptor(instance, key) || 
                          Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), key);

        if (descriptor && (descriptor.get || descriptor.set)) {
            // Handle accessor property
            decorateAccessorProperty(instance, key, descriptor, className, config);
            continue;
        }

        // Handle regular data property
        // Store original value
        instance[backingFields][key] = instance[key];

        // Replace with getter/setter for regular properties
        Object.defineProperty(instance, key, {
            get: function () {
                const value = this[backingFields][key];

                if (config.after) {
                    const afterResult = config.after(className, key, 'property', () => { }, [], value);
                    return afterResult ?? value;
                }

                return value;
            },
            set: function (newValue) {
                const oldValue = this[backingFields][key];

                // Skip update if values are equal
                if (oldValue === newValue) {
                    return;
                }

                // Check for custom comparer
                const proto = Object.getPrototypeOf(this);
                const hasCustomComparer = proto && 
                                         proto[comparerSymbol as any] && 
                                         proto[comparerSymbol as any].has(key);
                
                if (hasCustomComparer) {
                    const customComparer = proto[comparerSymbol as any].get(key);
                    if (customComparer(oldValue, newValue)) {
                        return; // Skip update if custom comparer says they're equal
                    }
                }

                let valueToSet = newValue;

                // Apply before logic if available
                if (config.before) {
                    const beforeResult = config.before(className, key, 'field', () => { }, [newValue]);
                    if (beforeResult && beforeResult[1]) {
                        valueToSet = beforeResult[1][0];
                    }
                }

                // Handle frozen/sealed objects
                if (valueToSet && typeof valueToSet === 'object') {
                    // Skip reactification for frozen/sealed objects and Chemical instances
                    if (!Object.isFrozen(valueToSet) && 
                        !Object.isSealed(valueToSet) && 
                        Object.isExtensible(valueToSet) && 
                        !(valueToSet instanceof Chemical)) {
                        // Deep reactify complex objects
                        if (!Array.isArray(valueToSet) && !(valueToSet instanceof Date)) {
                            reactivateData(valueToSet, this);
                        }
                    }
                }

                // Set the new value
                this[backingFields][key] = valueToSet;

                // Apply after logic
                if (config.after) {
                    config.after(className, key, 'field', () => { }, [valueToSet], undefined);
                }
            },
            enumerable: true,
            configurable: true
        });
    }
}

/**
 * Decorates an accessor property (getter/setter)
 */
function decorateAccessorProperty(
    instance: any, 
    key: string, 
    descriptor: PropertyDescriptor, 
    className: string, 
    config: DecoratorConfig
): void {
    const originalGet = descriptor.get;
    const originalSet = descriptor.set;
    
    Object.defineProperty(instance, key, {
        get: function() {
            // Preserve original getter behavior
            const value = originalGet?.call(this);
            
            if (config.after) {
                const afterResult = config.after(className, key, 'property', () => {}, [], value);
                return afterResult ?? value;
            }
            
            return value;
        },
        set: function(newValue) {
            if (!originalSet) return; // Read-only property
            
            const oldValue = originalGet?.call(this);
            
            // Skip update if values are equal
            if (oldValue === newValue) {
                return;
            }
            
            // Check for custom comparer
            const proto = Object.getPrototypeOf(this);
            const hasCustomComparer = proto && 
                                    proto[comparerSymbol as any] && 
                                    proto[comparerSymbol as any].has(key);
            
            if (hasCustomComparer) {
                const customComparer = proto[comparerSymbol as any].get(key);
                if (customComparer(oldValue, newValue)) {
                    return; // Skip update if custom comparer says they're equal
                }
            }
            
            // Call original setter
            originalSet.call(this, newValue);
            
            // Apply after logic to trigger updates
            if (config.after) {
                config.after(className, key, 'field', () => {}, [newValue], undefined);
            }
        },
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable
    });
}

/**
 * Checks if an object is a base object method
 */
function isBaseObjectMethod(methodName: string): boolean {
    return Object.prototype.hasOwnProperty.call(Object.prototype, methodName);
}

/**
 * Gets all methods from an object and its prototype chain
 */
function getAllMethods(obj: any): { [key: string]: Function } {
    const methods: { [key: string]: Function } = {};
    let proto = obj;

    while (proto && proto !== Object.prototype) {
        for (const key in proto) {
            if (methods[key]) continue;
            if (
                typeof proto[key] === "function" &&
                !key.startsWith("_") && // Skip private methods
                !isBaseObjectMethod(key)
            ) {
                methods[key] = proto[key];
            }
        }
        proto = proto.__proto__;
    }

    return methods;
}

/**
 * Gets all properties from an object
 */
function getAllProperties(obj: any): string[] {
    const properties = new Set<string>();

    // Get own properties
    Object.getOwnPropertyNames(obj).forEach(prop => {
        properties.add(prop);
    });

    // Get properties from prototype chain
    let proto = Object.getPrototypeOf(obj);
    while (proto && proto !== Object.prototype) {
        Object.getOwnPropertyNames(proto).forEach(prop => {
            if (!prop.startsWith('_') && prop !== 'constructor') {
                properties.add(prop);
            }
        });
        proto = Object.getPrototypeOf(proto);
    }

    return Array.from(properties);
}