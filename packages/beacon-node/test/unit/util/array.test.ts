import {expect} from "chai";

import {findLastIndex, LinkedList} from "../../../src/util/array.js";

describe("findLastIndex", () => {
  it("should return the last index that matches a predicate", () => {
    expect(findLastIndex([1, 2, 3, 4], (n) => n % 2 == 0)).to.eql(3);
    expect(findLastIndex([1, 2, 3, 4, 5], (n) => n % 2 == 0)).to.eql(3);
    expect(findLastIndex([1, 2, 3, 4, 5], () => true)).to.eql(4);
  });

  it("should return -1 if there are no matches", () => {
    expect(findLastIndex([1, 3, 5], (n) => n % 2 == 0)).to.eql(-1);
    expect(findLastIndex([1, 2, 3, 4, 5], () => false)).to.eql(-1);
  });
});

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  it("pop", () => {
    expect(list.pop()).to.be.null;
    expect(list.length).to.be.equal(0);
    let count = 100;
    for (let i = 0; i < count; i++) list.push(i + 1);

    while (count > 0) {
      expect(list.length).to.be.equal(count);
      expect(list.pop()).to.be.equal(count);
      count--;
    }

    expect(list.pop()).to.be.null;
    expect(list.length).to.be.equal(0);
  });

  it("shift", () => {
    expect(list.shift()).to.be.null;
    expect(list.length).to.be.equal(0);
    const count = 100;
    for (let i = 0; i < count; i++) list.push(i);

    for (let i = 0; i < count; i++) {
      expect(list.length).to.be.equal(count - i);
      expect(list.shift()).to.be.equal(i);
    }

    expect(list.shift()).to.be.null;
    expect(list.length).to.be.equal(0);
  });

  describe("push", () => {
    const count = 100;
    beforeEach(() => {
      list = new LinkedList<number>();
      expect(list.length).to.be.equal(0);
      for (let i = 0; i < count; i++) list.push(i);
      expect(list.length).to.be.equal(count);
      expect(list.toArray()).to.be.deep.equal(Array.from({length: count}, (_, i) => i));
    });

    it("push then pop", () => {
      for (let i = 0; i < count; i++) {
        expect(list.pop()).to.be.equal(count - i - 1);
      }
      expect(list.length).to.be.equal(0);
    });

    it("push then shift", () => {
      for (let i = 0; i < count; i++) {
        expect(list.shift()).to.be.equal(i);
      }
      expect(list.length).to.be.equal(0);
    });
  });

  describe("unshift", () => {
    const count = 100;
    beforeEach(() => {
      list = new LinkedList<number>();
      expect(list.length).to.be.equal(0);
      for (let i = 0; i < count; i++) list.unshift(i);
      expect(list.length).to.be.equal(count);
      expect(list.toArray()).to.be.deep.equal(Array.from({length: count}, (_, i) => count - i - 1));
    });

    it("unshift then pop", () => {
      for (let i = 0; i < count; i++) {
        expect(list.pop()).to.be.equal(i);
      }
      expect(list.length).to.be.equal(0);
    });

    it("unshift then shift", () => {
      for (let i = 0; i < count; i++) {
        expect(list.shift()).to.be.equal(count - i - 1);
      }

      expect(list.length).to.be.equal(0);
    });
  });

  it("toArray", () => {
    expect(list.toArray()).to.be.deep.equal([]);

    const count = 100;
    for (let i = 0; i < count; i++) list.push(i);

    expect(list.length).to.be.equal(count);
    expect(list.toArray()).to.be.deep.equal(Array.from({length: count}, (_, i) => i));
  });

  it("prune", () => {
    const count = 100;
    for (let i = 0; i < count; i++) list.push(i);

    list.clear();

    expect(list.toArray()).to.be.deep.equal([]);
    expect(list.length).to.be.equal(0);
  });

  describe("iterator", () => {
    const testCases: {count: number}[] = [{count: 0}, {count: 10}, {count: 100}];

    for (const {count} of testCases) {
      it(`should iterate over ${count} items`, () => {
        for (let i = 0; i < count; i++) {
          list.push(i);
        }

        let i = 0;
        for (const item of list) {
          expect(item).to.be.equal(i);
          i++;
        }

        // make sure the list is the same
        expect(list.toArray()).to.be.deep.equal(Array.from({length: count}, (_, i) => i));
      });
    }
  });
});
