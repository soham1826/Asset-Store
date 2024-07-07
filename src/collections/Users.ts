import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
        generateEmailHTML: ({ token }) => {
          return `
            <h1>Verify your email</h1>
            <p>Click the link below to verify your email:</p>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify Email</a>
          `
        },
    }
    // verify: {
    //   generateEmailHTML: ({ token }) => {
    //     return `
    //       <h1>Welcome to AssetStore!</h1>
    //       <p>Please click the link below to verify your email:</p>
    //       <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">
    //         Verify Email
    //       </a>
    //     `;
    //   },
    //   generateEmailSubject: () => 'Verify Your Email for AssetStore',
    // }
  },
  access: {
    read: () => true,
    create: () => true
  },
  fields: [
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      admin: {
        condition: () => true
      },
      type: 'select',
      options: [
        { label: "Admin", value: 'admin' },
        { label: "User", value: 'user' }
      ]
    },
    // {
    //   name: 'isVerified',
    //   type: 'checkbox',
    //   defaultValue: false,
    //   admin: {
    //     position: 'sidebar',
    //   },
    // },
    // {
    //     name: 'verificationToken',
    //     type: 'text',
    //     hidden: true,
    // },
  ]
};