import './App.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'

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
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}

export default App
