'use strict';

describe('Service: getDistances', function () {

  // load the service's module
  beforeEach(module('leftfieldlabsApp'));

  // instantiate service
  var getDistances;
  beforeEach(inject(function (_getDistances_) {
    getDistances = _getDistances_;
  }));

  it('should do something', function () {
    expect(!!getDistances).toBe(true);
  });

});
