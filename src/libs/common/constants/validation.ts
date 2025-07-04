export const VALIDATION = {
  EMAIL: {
    LENGTH: {
      MIN: 3,
      MAX: 50,
    },
    MESSAGE: 'Email должен быть в формате name@example.com',
  },
  USERNAME: {
    LENGTH: {
      MIN: 3,
      MAX: 36,
    },
    REGEXP: `^[a-zA-Z0-9_-]*[a-zA-Z]+[a-zA-Z0-9_-]*$`,
    MESSAGE:
      'Имя пользователя должно быть от 3 до 36 символов и содержать минимум одну латинскую букву (a-z, A-Z), может содержать цифру (0-9) и символ ("_" или "-”)',
  },
  PASSWORD: {
    LENGTH: {
      MIN: 8,
      MAX: 100,
    },
    REGEXP: `^(?=.*[a-zA-Z])(?=.*[~!?@#$%^&*_\\-+()\\[\\]{}<>\\/\\\\|"'.,:])[a-zA-Z0-9~!?@#$%^&*_\\-+()\\[\\]{}<>\\/\\\\|"'.,:]*$`,
    MESSAGE:
      'Пароль должен быть от 8 до 100 символов, содержать только латинские буквы, цифры от (0-9) и хотя бы один специальный символ.',
    CONFIRM_MESSAGE:
      'Подтверждение пароля должно быть от 8 до 100 символов, содержать только латинские буквы, цифры от (0-9) и хотя бы один специальный символ.',
  },
};
