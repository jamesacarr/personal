type MockTargetFunction = (...args: any[]) => any;

/** Streamline some of the function mocking noise */
const mock = <T extends MockTargetFunction>(target: T) => target as jest.MockedFunction<typeof target>;

export default mock;
