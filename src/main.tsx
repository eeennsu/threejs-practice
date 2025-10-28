import '@configs/setup/dayjs.ts';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
