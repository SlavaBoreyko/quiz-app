import React, { FC, memo } from 'react';
import { Box } from '@mui/material';
import styles from './BloggerNoTest.module.scss';

const BloggerNoTest: FC = () => (<Box className={styles.blogerNoTest}>Скоро анонс</Box>);

export default memo(BloggerNoTest);