import { BrowserRouter, Route, Routes } from 'react-router'
import NotFound from '~/components/shared/NotFound'
import Root from '~/Root'
import About from '~/routes/About'
import Contract from '~/routes/Contract'
import Home from '~/routes/Home'
import Preview from '~/routes/Preview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contract" element={<Contract />} />
          <Route path="preview" element={<Preview />} />
          <Route
            path="*"
            element={
              <NotFound
                message="404"
                details="The requested page could not be found."
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
