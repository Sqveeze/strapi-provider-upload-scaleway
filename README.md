# strapi-provider-upload-scaleway

## Configurations

Your configuration is passed down to the provider. (e.g: `new AWS.S3(config)`). You can see the complete list of options [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property)

See the [using a provider](https://strapi.io/documentation/v3.x/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/v3.x/concepts/configurations.html#environment-variables) for setting and using environment variables in your configs.

## Usage

To install this provider run:

```
npm install strapi-provider-upload-scaleway
```

or

(recommended)
```
yarn add strapi-provider-upload-scaleway
```

**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'scaleway',
    providerOptions: {
      accessKeyId: env('SCALEWAY_ACCESS_KEY_ID'),
      secretAccessKey: env('SCALEWAY_ACCESS_SECRET'),
      endpoint: env('SCALEWAY_ENDPOINT'),
      sslEnabled: env.bool('SCALEWAY_SSL', true),
      params: {
        Bucket: env('SCALEWAY_BUCKET')
      }
    }
  },
  // ...
});
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [npm](https://www.npmjs.com/package/strapi-provider-upload-scaleway)
- [Strapi website](https://strapi.io)
- [Strapi community on Slack](https://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
