class ReferencesService {
  getCounterCopyingReferences(object) {
    return object;
  }

  getCounterWithoutCopyingReferences(object) {
    return { ...object };
  }

  getCounterWithoutDeepCopyingReferences(object) {
    return {
      object: {
        ...object.object,
      },
    };
  }
}

module.exports = ReferencesService;
