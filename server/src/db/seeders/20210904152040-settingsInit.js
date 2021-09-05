'use strict';

module.exports = {
  up: async (queryInterface) => {
    console.log('aaa');
    await queryInterface.bulkInsert(
      'settings',
      [
        {
          key: 'mainTitle',
          description: 'Title of main page (string).',
          value: 'My blog',
        },
        {
          key: 'mainDescription',
          description: 'Description on main page (markdown).',
          value: 'This is personal blog of **Ladislav Prix** where you can read about his life hobbies and so on.',
        },
        {
          key: 'mainFooter',
          description: 'Footer on main page (markdown).',
          value: 'Created by [Ladislav Prix](mailto:contact@ladislavprix.cz).',
        },
        {
          key: 'metaDescription',
          description: 'Text that will be put to description on main page.',
          value: 'This is personal blog of Ladislav Prix where you can read about his life hobbies and so on',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('settings', null, {});
  },
};
