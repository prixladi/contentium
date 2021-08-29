import { ResourceOptions } from 'adminjs';

const options: ResourceOptions = {
  properties: {
    id: {
      isVisible: {
        list: false,
        show: true
      }
    },
    content: {
      isVisible: {
        list: false,
        show: true
      }
    },
    title: {
      isTitle: true,
    },
  },
} as ResourceOptions;

export default options;
