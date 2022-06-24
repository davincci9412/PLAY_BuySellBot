import React, { useRef } from 'react';
import { Box, Flex, Text } from '@blockstack/ui';

import sortTable from '../tableFunction';

const TransctionLog = ({ TableContents }) => {
  const transactionTable = useRef(null);

  return (
    <Box mt="30px">
      <Box mb="20px" overflowX="auto">
        <Text fontSize={['20px', '24px']} fontWeight="500">
          Transaction Log for Wallets Tracked
        </Text>
      </Box>
      <Box overflowX="auto">
        <Box
          as="table"
          ref={transactionTable}
          className="token_table"
          fontSize={['10px', '12px']}
          minWidth="700px"
        >
          <thead>
            <tr>
              {['Wallet', 'Crypto', 'Date', 'QTY', 'Amount'].map((elem, key) => {
                return (
                  <th key={key}>
                    <Flex alignItems="center" fontWeight="bold">
                      {elem}
                      &nbsp;
                      <Box>
                        <Box
                          as="button"
                          display="block"
                          cursor="pointer"
                          backgroundColor="black"
                          width="12px"
                          height="12px"
                          border="none"
                          transition="all ease .2s"
                          style={{ clipPath: 'polygon(50% 0, 0 86.6%, 100% 86.6%)' }}
                          _focus={{ outline: 'none' }}
                          _hover={{ backgroundColor: '#999' }}
                          onClick={() => sortTable('asc', key, transactionTable.current)}
                        />
                        <Box
                          as="button"
                          display="block"
                          cursor="pointer"
                          backgroundColor="black"
                          width="12px"
                          height="12px"
                          border="none"
                          transition="all ease .2s"
                          style={{ clipPath: 'polygon(50% 100%, 0 13.4%, 100% 13.4%)' }}
                          _focus={{ outline: 'none' }}
                          _hover={{ backgroundColor: '#999' }}
                          onClick={() => sortTable('desc', key, transactionTable.current)}
                        />
                      </Box>
                    </Flex>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TableContents.map((row, key) => (
              <tr key={key}>
                <td>
                  <Text>{row[0]}</Text>
                </td>
                <td>
                  <Box
                    as="button"
                    backgroundColor="transparent"
                    cursor="pointer"
                    border="none"
                    _focus={{ outline: 'none' }}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {row[1]}
                  </Box>
                </td>
                <td>{row[2]}</td>
                <td style={row[3] > 0 ? { color: 'black' } : { color: 'red' }}>{row[3]}</td>
                <td>${row[4].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

export default TransctionLog;
