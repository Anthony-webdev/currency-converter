import React from 'react';
import { render } from 'react-dom';

import Converter from 'src/components/Converter';

const rootReactElement = <Converter />;

const target = document.getElementById('root');

render(rootReactElement, target);
