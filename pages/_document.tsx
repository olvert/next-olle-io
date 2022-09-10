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
      <Html lang="en" className="min-h-full bg-gray-900 text-gray-100 font-victor-mono antialiased">
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
