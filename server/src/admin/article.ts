import { ResourceOptions } from 'adminjs';

const options: ResourceOptions = {
  properties: {
    id: {
      isVisible: {
        list: false,
        show: true,
        edit: false,
      },
    },
    title: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
      },
      isTitle: true,
    },
    content: {
      isVisible: {
        list: false,
        show: true,
        edit: true,
      },
      type: 'textarea',
    },
    keyworkText: {
      isVisible: {
        list: false,
        show: true,
        edit: true,
      },
      type: 'textarea',
    },
    brief: {
      isVisible: {
        list: false,
        show: true,
        edit: true,
      },
      type: 'textarea',
    },
    createdAt: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
      },
      type: 'datetime',
    },
    author: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
      },
    },
    readingTimeInMinutes: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
      },
      type: 'number',
    },
  },
} as ResourceOptions;

export default options;
