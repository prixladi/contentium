import { ResourceOptions } from 'adminjs';

const options: ResourceOptions = {
  properties: {
    id: {
      isVisible: false
    },
    title: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
        filter: true,
      },
      isTitle: true,
    },
    content: {
      isVisible: {
        list: false,
        show: true,
        edit: true,
        filter: true,
      },
      type: 'textarea',
    },
    highlighted: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
        filter: true,
      },
      isRequired: false,
      type: 'boolean'
    },
    keyworkText: {
      isVisible: {
        list: false,
        show: true,
        edit: true,
        filter: true,
      },
      type: 'textarea',
    },
    brief: {
      isVisible: {
        list: false,
        show: true,
        edit: true,
        filter: true,
      },
      type: 'textarea',
    },
    createdAt: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
        filter: true,
      },
      type: 'datetime',
    },
    author: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
        filter: true,
      },
    },
    readingTimeInMinutes: {
      isVisible: {
        list: true,
        show: true,
        edit: true,
        filter: true,
      },
      type: 'float',
    },
  },
} as ResourceOptions;

export default options;
