import { classNames } from './utils';

describe('classNames', () => {
  it('should concatenate non-empty classes with a space separator', () => {
    const result = classNames('class1', 'class2', 'class3');
    expect(result).toEqual('class1 class2 class3');
  });

  it('should skip empty classes', () => {
    const result = classNames('class1', '', 'class2', undefined, 'class3');
    expect(result).toEqual('class1 class2 class3');
  });

  it('should handle no classes', () => {
    const result = classNames();
    expect(result).toEqual('');
  });
});

