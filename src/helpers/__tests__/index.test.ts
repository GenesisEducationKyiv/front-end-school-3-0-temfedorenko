import { setDebounce, createGenreOptions } from '@/helpers';
///////////////////////////////////////////////////////

describe('createGenreOptions', () => {
  test('should return empty array if there are no genres', () => {
    expect(createGenreOptions()).toEqual([]);
    expect(createGenreOptions([])).toEqual([]);
  });

  test('should return genres options with valid genres', () => {
    expect(createGenreOptions(['Pop', 'Indie'])).toEqual([
      { label: 'Pop', value: 'Pop' },
      { label: 'Indie', value: 'Indie' },
    ]);
  });

  test('should return genres without invalid genres', () => {
    expect(createGenreOptions(['  ', undefined, 'Indie'])).toEqual([
      { label: 'Indie', value: 'Indie' },
    ]);
  });

  test('should return empty array if all genres are invalid', () => {
    expect(createGenreOptions([null, 123, '', false, {}])).toEqual([]);
  });
});

describe('setDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  test('should call the function after the specified delay', () => {
    const mockFunction = vi.fn();

    const debouncedFunction = setDebounce(mockFunction, 1000);

    debouncedFunction();

    vi.advanceTimersByTime(300);

    expect(mockFunction).not.toHaveBeenCalled();

    vi.advanceTimersByTime(700);

    expect(mockFunction).toHaveBeenCalledOnce();
    expect(mockFunction).toHaveBeenCalledWith();
  });

  test('should call the function only once after the specified delay if called multiple times', () => {
    const mockFunction = vi.fn();

    const debouncedFunction = setDebounce(mockFunction, 800);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction(3);

    expect(mockFunction).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    debouncedFunction();
    
    expect(mockFunction).toHaveBeenCalledOnce();
    expect(mockFunction).toHaveBeenCalledWith(3);
  });

  test('should debounce multiple calls and call only the last one', () => {
    const mockFunction = vi.fn();

    const debouncedFunction = setDebounce(mockFunction, 1000);

    debouncedFunction('A');

    vi.advanceTimersByTime(500);

    debouncedFunction('B');

    vi.advanceTimersByTime(600);

    debouncedFunction('C');

    vi.advanceTimersByTime(1000);

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith('C');
  });

  test('should pass correct arguments to the original function', () => {
    const mockFunction = vi.fn();

    const debouncedFunction = setDebounce(mockFunction, 400);

    debouncedFunction('Done!');

    vi.advanceTimersByTime(400);

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith('Done!');
  });

  test('should call the function twice if the delay is less than the time between calls', () => {
    const mockFunction = vi.fn();

    const debouncedFunction = setDebounce(mockFunction, 800);

    debouncedFunction();

    vi.advanceTimersByTime(300);

    expect(mockFunction).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    expect(mockFunction).toHaveBeenCalledOnce();

    debouncedFunction();

    vi.advanceTimersByTime(900);

    expect(mockFunction).toHaveBeenCalledTimes(2);
  });
});
