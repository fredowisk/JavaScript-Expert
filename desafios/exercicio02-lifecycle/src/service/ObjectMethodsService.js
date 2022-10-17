class ObjectMethodsService {
  getEnhancedObject(rawObject) {
    return {
      valueOf() {
        return rawObject.age;
      },
    };
  }

  getEnhancedObject2(rawObject) {
    return {
      toString() {
        return `[name="${rawObject.name}",age=${rawObject.age}]`;
      },
    };
  }

  getEnhancedObjectWithoutValueOfOrToString(rawObject) {
    const { name, age } = rawObject;
    return {
      [Symbol.toPrimitive](coercionType) {
        const types = {
          string: `[name="${name}",age=${age}]`,
          number: age,
        };

        return types[coercionType] || types.string;
      },
    };
  }
}

module.exports = ObjectMethodsService;
