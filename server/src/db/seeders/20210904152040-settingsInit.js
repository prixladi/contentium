'use strict';

module.exports = {
  up: async (queryInterface) => {
    const exist = await queryInterface.rawSelect(
      'settings',
      {
        where: {},
      },
      ['id'],
    );

    if (exist) {
      return;
    }

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
          value:
            'This is personal blog of **Ladislav Prix** where you can read about his life hobbies and so on. This site was created using [Contentium](https://github.com/prixladi/contentium) (*Server side rendered markdown pages with easy content management*).',
        },
        {
          key: 'mainFooter',
          description: 'Footer on main page (markdown).',
          value: 'Copyright 2021 © [Ladislav Prix](mailto:contact@ladislavprix.cz)',
        },
        {
          key: 'metaDescription',
          description: 'Text that will be put to description on main page.',
          value: 'This is personal blog of Ladislav Prix where you can read about his life hobbies and so on',
        },
        {
          key: 'autosearchTresholdCount',
          description: 'After exceeding this treshold autosearch on articles stops working and is necessary to click on search button.',
          value: '100',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('settings', null, {});
  },
};
