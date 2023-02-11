import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class CustomizedDocument extends Document {
  render() {
    return (
      <Html lang="en" className="min-h-full font-inter text-blackish antialiased">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomizedDocument;
