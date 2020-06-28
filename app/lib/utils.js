import { __ } from './I18n';

const defaultPicture = 'https://www.dclick.com.br/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
exports.defaultPicture = defaultPicture;

const serviceCategories = () => [
  { category: 'cleaning', name: __('Cleaning') },
  { category: 'gardening', name: __('Gardening') },
  { category: 'pumbling', name: __('Pumbling') },
  { category: 'electricity', name: __('Electricity') },
  { category: 'painting', name: __('Painting') },
];
exports.serviceCategories = serviceCategories;
