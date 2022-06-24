/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import { Box, Text, Flex } from '@blockstack/ui';
import React from 'react';

import FooterLinkGroup from './FooterLinkGroup';

const Footer = () => {
  return (
    <Box my={['30px']}>
      <Box backgroundColor="#f5f5f5" textAlign="center" p="30px" mb={['30px']}>
        <Box fontSize={['24px']} fontWeight="500" mb="20px">
          Start Trading Now
        </Box>
        <Box
          as="button"
          backgroundColor="#efc35c"
          border="none"
          outline="none"
          cursor="pointer"
          fontSize={['14px', '16px']}
          fontWeight="500"
          height="40px"
          width="150px"
          borderRadius="50px"
          _focus={{ outline: 'none' }}
          m="10px"
        >
          Register Now
        </Box>
        <Box
          as="button"
          backgroundColor="white"
          border="none"
          outline="none"
          cursor="pointer"
          fontSize={['14px', '16px']}
          fontWeight="500"
          height="40px"
          width="150px"
          borderRadius="50px"
          _focus={{ outline: 'none' }}
          m="10px"
        >
          Trade Now
        </Box>
      </Box>
      <Flex flexWrap="wrap">
        <FooterLinkGroup>
          <Text fontSize={['20px', '24px']} fontWeight="500">
            About Us
          </Text>
          <br />
          <a href="/">About</a>
          <br />
          <a href="/">Careers</a>
          <br />
          <a href="/">Business</a>
          <br />
          <a href="/">Contacts</a>
          <br />
          <a href="/">Community</a>
          <br />
          <a href="/">Binance Blog</a>
          <br />
          <a href="/">Terms</a>
          <br />
          <a href="/">Privacy</a>
          <br />
          <a href="/">Announcements</a>
          <br />
          <a href="/">News</a>
        </FooterLinkGroup>
        <FooterLinkGroup>
          <Text fontSize={['20px', '24px']} fontWeight="500">
            Products
          </Text>
          <br />
          <a href="/">Exchange</a>
          <br />
          <a href="/">Academy</a>
          <br />
          <a href="/">BCG</a>
          <br />
          <a href="/">Card</a>
          <br />
          <a href="/">Labs</a>
          <br />
          <a href="/">Launchpad</a>
          <br />
          <a href="/">Rearch</a>
          <br />
          <a href="/">Trust Wallet</a>
        </FooterLinkGroup>
        <FooterLinkGroup>
          <Text fontSize={['20px', '24px']} fontWeight="500">
            Service
          </Text>
          <br />
          <a href="/">Downloads</a>
          <br />
          <a href="/">Buy Crypto</a>
          <br />
          <a href="/">Fees</a>
          <br />
          <a href="/">Key Client</a>
          <br />
          <a href="/">Privileges</a>
          <br />
          <a href="/">Referal</a>
          <br />
          <a href="/">BNB</a>
          <br />
          <a href="/">Buy BUSD</a>
          <br />
          <a href="/">OTC Trading</a>
          <br />
          <a href="/">Listing</a>
          <br />
          <a href="/">Application</a>
          <br />
          <a href="/">Trading Rules</a>
          <br />
          <a href="/">Fiat Gateway</a>
          <br />
          <a href="/">Application</a>
          <br />
          <a href="/">P2P Merchant</a>
          <br />
          <a href="/">Application</a>
          <br />
          <a href="/">Historical</a>
          <br />
          <a href="/">Market Data</a>
        </FooterLinkGroup>
        <FooterLinkGroup>
          <Text fontSize={['20px', '24px']} fontWeight="500">
            About Us
          </Text>
          <br />
          <a href="/">Give Us</a>
          <br />
          <a href="/">Feedback</a>
          <br />
          <a href="/">Support Center</a>
          <br />
          <a href="/">Submit request</a>
          <br />
          <a href="/">API</a>
          <br />
          <a href="/">Documentation</a>
          <br />
          <a href="/">Binance Verify</a>
        </FooterLinkGroup>
        <FooterLinkGroup>
          <Text fontSize={['20px', '24px']} fontWeight="500">
            Learn
          </Text>
          <br />
          <a href="/">Buy BNB</a>
          <br />
          <a href="/">Buy Bitcoin</a>
          <br />
          <a href="/">Buy Etherium</a>
          <br />
          <a href="/">Buy Litecoin</a>
          <br />
          <a href="/">Buy Ripple</a>
          <br />
          <a href="/">Buy Bitcoin</a>
          <br />
          <a href="/">Cache</a>
          <br />
          <a href="/">Buy Dogecoin</a>
          <br />
          <a href="/">Buy DeFi</a>
        </FooterLinkGroup>
        <FooterLinkGroup>
          <Text fontSize={['20px', '24px']} fontWeight="500">
            Community
          </Text>
          <br />
          <a href="/" className="fa fa-telegram">
            &nbsp;Telegram
          </a>
          <br />
          <a href="/" className="fa fa-facebook">
            &nbsp;Facebook
          </a>
          <br />
          <a href="/" className="fa fa-twitter">
            &nbsp;Twitter
          </a>
          <br />
          <a href="/" className="fa fa-twitch">
            &nbsp;Twitch
          </a>
          <br />
          <a href="/" className="fa fa-instagram">
            &nbsp;Instagram
          </a>
          <br />
          <a href="/" className="fa fa-linkedin">
            &nbsp;Linkedin
          </a>
        </FooterLinkGroup>
      </Flex>
    </Box>

    //     </div>
    //   </div>
    // </div>
  );
};

export default Footer;
