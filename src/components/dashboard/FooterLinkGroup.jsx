import { Box } from '@blockstack/ui';
import React from 'react';

import './FooterLinkGroup.css';

const FooterLinkGroup = props => {
  return (
    <Box
      className="footer_linkgroup"
      flex={['0 0 100%', '0 0 50%', '0 0 33.33%', '0 0 16.66%']}
      maxWidth={['100%', '50%', '33.33%', '16.66%']}
      textAlign="center"
      {...props}
    />
  );
};

export default FooterLinkGroup;
