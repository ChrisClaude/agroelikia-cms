module.exports = ({env}) => ({
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
    actionOptions: {
      upload: {
        folder: env('CLOUDINARY_FOLDER'),
      },
      delete: {},
    },
    email: {
      config: {
        provider: 'sendmail',
        // provider: 'nodemailer',
        /*providerOptions: {
          host: env('SMTP_HOST', 'smtp.example.com'),
          port: env('SMTP_PORT', 587),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
        },*/
        settings: {
          defaultFrom: 'christ.tchambila@gmail.com',
          defaultReplyTo: 'christ.tchambila@gmail.com',     },
      },
    },
  },
});
