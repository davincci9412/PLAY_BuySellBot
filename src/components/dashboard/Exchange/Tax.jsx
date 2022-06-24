import React, { useRef } from 'react';
import { Box, Flex, Text } from '@blockstack/ui';

import sortTable from '../tableFunction';

const Tax = ({ TableContents }) => {
  const taxTable = useRef(null);

  return (
    <Box mt="30px">
      <Box mb="20px">
        <Text fontSize={['20px', '24px']} fontWeight="500">
          Tax Calculation
        </Text>
      </Box>
      <Box overflowX="auto">
        <Box
          as="table"
          ref={taxTable}
          className="token_table"
          fontSize={['10px', '12px']}
          minWidth="700px"
        >
          <thead>
            <tr>
              {['Token', 'Buy', 'Transfer', 'Sell', 'Buffer', 'Total'].map((elem, key) => {
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
                          onClick={() => sortTable('asc', key, taxTable.current)}
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
                          onClick={() => sortTable('desc', key, taxTable.current)}
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
                  <Text className="fa fa-star" color="#999" />
                  &nbsp;
                  <Text>{row[0]}</Text>
                  <Text color="#999">/{row[0]}</Text>
                </td>
                <td>{row[1]}%</td>
                <td>{row[2]}%</td>
                <td>{row[3]}%</td>
                <td>{row[4]}%</td>
                <td>{row[5]}%</td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

export default Tax;
