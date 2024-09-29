export const responses = {
  auth: {
    USER_EXISTS: {
      code: 'USER_EXISTS',
      message: 'User exists',
      success: false,
    },
    USER_NOT_EXISTS: {
      code: 'USER_NOT_EXISTS',
      message: 'User not exists',
      success: false,
    },
    INVALID_PASSWORD: {
      code: 'INVALID_PASSWORD',
      message: 'Invalid password',
      success: false,
    },
  },

  userOnboarding: {
    STEP_ALREADY_PASSED: {
      code: 'STEP_ALREADY_PASSED',
      message: 'Step already passed',
      success: false,
    },

    INVALID_VERIFICATION_CODE: {
      code: 'INVALID_VERIFICATION_CODE',
      message: 'Invalid verification code',
      success: false,
    },

    VERIFICATION_CODE_PASSED: {
      code: 'VERIFICATION_CODE_PASSED',
      message: 'Verification_code_passed',
      success: true,
    },

    INFO_PASSED: {
      code: 'INFO_PASSED',
      message: 'Info passed',
      seccess: true,
    },

    VERIFICATION_CODE_MUST_BE_PROVIDED_FIRST: {
      code: 'VERIFICATION_CODE_MUST_BE_PROVIDED_FIRST',
      message: 'Verification code must be provided first',
      seccess: false,
    },
  },

  jwtToken: {
    MISSING_AUTHORIZATION_TOKEN: {
      code: 'MISSING_AUTHORIZATION_TOKEN',
      message: 'Missing authorization token',
      success: false,
    },
    INVALID_TOKEN: {
      code: 'INVALID_AUTHORIZATION_TOKEN',
      message: 'Invalid authorization token',
      success: false,
    },
  },
};
