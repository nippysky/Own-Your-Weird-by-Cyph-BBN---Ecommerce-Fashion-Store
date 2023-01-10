export default {
  name: 'female',
  type: 'document',
  title: 'Female',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'longName',
      type: 'string',
      title: 'Long Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'color',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Color',
    },
    {
      name: 'size',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Size',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
  ],
}
