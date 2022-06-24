import React, { useRef } from 'react';
import { Box, Flex, Text } from '@blockstack/ui';

import sortTable from '../tableFunction';

const Net = ({ TableContents }) => {
  const netTable = useRef(null);

  return (
    <Box mt="30px">
      <Box mb="20px">
        <Text fontSize={['20px', '24px']} fontWeight="500">
          Net Calculation
        </Text>
      </Box>
      <Box overflowX="auto">
        <Box
          as="table"
          ref={netTable}
          className="token_table"
          fontSize={['10px', '12px']}
          minWidth="100%"
        >
          <thead>
            <tr>
              {[
                'Token',
                'Tokens',
                'Tokens',
                'Net tokens Poet Transfer',
                'Trading Pair',
                'Trading Pair Price',
                'Net BNB',
                'Token for 1 BNB',
                'Tokens',
                'Increase/Decrease',
              ].map((elem, key) => {
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
                          onClick={() => sortTable('asc', key, netTable.current)}
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
                          onClick={() => sortTable('desc', key, netTable.current)}
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
                  <Text>{row[0][0]}</Text>
                  <Text color="#999">/{row[0][1]}</Text>
                </td>
                <td>
                  <Box as="input" width="50px" height="20px" placeholder="100.00" mb="5px" />
                  &nbsp;
                  <Box
                    as="button"
                    color="white"
                    backgroundColor="#2dce89"
                    cursor="pointer"
                    width="50px"
                    height="20px"
                    border="none"
                    _focus={{ outline: 'none' }}
                  >
                    GO
                  </Box>
                </td>
                <td>{row[2]}%</td>
                <td>{row[3]}%</td>
                <td>{row[4]}%</td>
                <td>{row[5]}%</td>
                <td>{row[6]}</td>
                <td>{row[7]}</td>
                <td>{row[8]}</td>
                <td>{row[9]}</td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

export default Net;
