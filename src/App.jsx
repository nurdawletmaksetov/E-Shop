import './App.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import { FilterProvider } from './context/Filter/FilterContext.jsx'

function App() {
  const theme = createTheme({
    breakpoints: {
      xs: '400px',
      sm: '600px',
      md: '1024px',
    },
  });

  return (
    <>
      <FilterProvider>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <RouterProvider router={router} />
          </ModalsProvider>
        </MantineProvider>
      </FilterProvider>
    </>
  )
}

export default App
