export const VALIDATION = {
  EMAIL: {
    LENGTH: {
      MIN: 3,
      MAX: 50,
    },
  },
  PHONE: {
    LENGTH: {
      MIN: 10,
      MAX: 15,
    },
    REGEXP: `^\+[1-9]\d{7,14}$`,
  },
  USERNAME: {
    LENGTH: {
      MIN: 3,
      MAX: 36,
    },
    REGEXP: `^[a-zA-Z0-9_-]*[a-zA-Z]+[a-zA-Z0-9_-]*$`,
  },
  PASSWORD: {
    LENGTH: {
      MIN: 5,
      MAX: 100,
    },
    REGEXP: `^(?=.*[a-zA-Z])(?=.*[~!?@#$%^&*_\\-+()\\[\\]{}<>\\/\\\\|"'.,:])[a-zA-Z0-9~!?@#$%^&*_\\-+()\\[\\]{}<>\\/\\\\|"'.,:]*$`,
  },
};
